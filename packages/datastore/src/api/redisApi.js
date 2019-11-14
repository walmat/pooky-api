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
      const payload = await this._client.lpop('cookies');
      console.log(payload);
      return JSON.parse(payload);
    } catch (err) {
      throw new Error(`Unable to pop: ${err.message}`);
    }
  }

  async flush() {
    try {
      const payload = await this._client.flushdb();
      console.log(payload);
      return JSON.parse(payload);
    } catch (err) {
      throw new Error(`Unable to pop: ${err.message}`);
    }
  }

  async push(payload) {
    console.log(JSON.stringify(payload, null, 2), payload.values);
    try {
      const reply = await this._client.rpush('cookies', JSON.stringify(payload.values));

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
