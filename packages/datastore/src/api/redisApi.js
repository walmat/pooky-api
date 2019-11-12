import uuidv4 from 'uuid/v4';

import Api from './api';
import promisifyClient from '../utils/promisifyRedisClient';

class RedisApi extends Api {
  static _validateId(id) {
    if (!id) {
      throw new Error('no id given');
    }
    if (typeof id !== 'string') {
      throw new Error('invalid id format');
    }
  }

  static _validatePayload(payload) {
    if (!payload) {
      throw new Error('no data given');
    }
    if (typeof payload !== 'object') {
      throw new Error('invalid data format');
    }
  }

  constructor(type, client) {
    super(type);
    // Setup client if it hasn't been setup already
    if (!client.__promisified) {
      this._client = promisifyClient(client);
    } else {
      this._client = client;
    }
  }

  async browse() {
    // get ids for the key
    try {
      const ids = await this._client.smembersAsync(`ids:${this._type}`);
      if (ids.length === 0) {
        return [];
      }
      const gets = ids.map(id => ['get', `data:${this._type}:${id}`]);
      const payloads = await this._client.multiExecAsync(gets);
      if (payloads.find(p => p === null) === null) {
        throw new Error('could not get all ids');
      }
      return payloads.map(JSON.parse);
    } catch (err) {
      throw new Error(`Unable to browse: ${err.message}`);
    }
  }

  async read(id) {
    try {
      RedisApi._validateId(id);
      const payload = await this._client.getAsync(`data:${this._type}:${id}`);
      if (!payload) {
        throw new Error('no data exists for id');
      }
      return JSON.parse(payload);
    } catch (err) {
      throw new Error(`Unable to read: ${err.message}`);
    }
  }

  async edit(id, payload) {
    try {
      RedisApi._validateId(id);
      RedisApi._validatePayload(payload);
      // Check for existing value
      const old = await this._client.getAsync(`data:${this._type}:${id}`);
      if (!old) {
        // No payload at the id -- add payload as a new one
        return this.add(payload);
      }
      const payloadStr = JSON.stringify({ ...payload, id });
      const reply = await this._client.setAsync(`data:${this._type}:${id}`, payloadStr);
      if (!reply) {
        throw new Error('updating data failed');
      }
      // Setup cloned payload
      const clone = JSON.parse(payloadStr);
      return clone;
    } catch (err) {
      throw new Error(`Unable to edit: ${err.message}`);
    }
  }

  async add(payload) {
    let newId = uuidv4();
    let verified = false;
    try {
      RedisApi._validatePayload(payload);
      while (!verified) {
        // eslint-disable-next-line no-await-in-loop
        const reply = await this._client.existsAsync(`data:${this._type}:${newId}`);
        if (!reply) {
          verified = true;
        } else {
          newId = uuidv4();
        }
      }
      const clone = JSON.parse(JSON.stringify(payload));
      clone.id = newId;
      const replies = await this._client.multiExecAsync([
        ['sadd', `ids:${this._type}`, newId],
        ['set', `data:${this._type}:${newId}`, JSON.stringify(clone)],
      ]);
      if (replies.find(r => r === null) === null) {
        throw new Error('could not complete');
      }
      return clone;
    } catch (err) {
      throw new Error(`Unable to add: ${err.message}`);
    }
  }

  async delete(id) {
    try {
      RedisApi._validateId(id);
      const reply = await this._client.getAsync(`data:${this._type}:${id}`);
      if (!reply) {
        // id doesn't exist, return nothing
        return null;
      }
      const replies = await this._client.multiExecAsync([
        ['srem', `ids:${this._type}`, id],
        ['del', `data:${this._type}:${id}`],
      ]);
      if (replies[0] === null || replies[1] === null) {
        throw new Error('could not complete');
      }
      return JSON.parse(reply);
    } catch (err) {
      throw new Error(`Unable to delete: ${err.message}`);
    }
  }
}

export default RedisApi;
