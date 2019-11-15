import Api from './api';

class RedisApi extends Api {
  constructor(type, client) {
    super(type);
    this._client = client;
  }

  /**
   * @returns the first existing cookie dataset
   * @throws when an error occurs in retrieving the data
   */
  async pop() {
    try {
      const reply = await this._client.lpop(`data:${this._type}`);
      if (!reply) {
        throw new Error('No cookies!');
      }
      return JSON.parse(reply);
    } catch (err) {
      throw new Error(`Unable to pop: ${err.message}`);
    }
  }

  async flush() {
    try {
      const reply = await this._client.flushdb();

      if (!reply) {
        throw new Error('Technical error!');
      }
      return;
    } catch (err) {
      throw new Error(`Unable to flush: ${err.message}`);
    }
  }

  async push(payload) {
    try {
      const reply = await this._client.rpush(`data:${this._type}`, JSON.stringify(payload));
      if (!reply) {
        throw new Error("Wasn't set");
      }
      return payload;
    } catch (err) {
      throw new Error(`Unable to add: ${err.message}`);
    }
  }
}

export default RedisApi;
