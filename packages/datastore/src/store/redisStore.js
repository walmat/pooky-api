import Redis from 'ioredis';

import RedisApi from '../api/redisApi';
import Defns from '../defns';
import Store from './store';

class RedisStore extends Store {
  constructor(redisClientOptions = {}) {
    super(Defns.REDIS);
    this._client = new Redis(redisClientOptions);
    this._cookiesApi = new RedisApi('cookies', this._client);
  }

  get cookies() {
    return this._cookiesApi;
  }
}

export default RedisStore;
