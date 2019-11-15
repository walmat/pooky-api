import Redis from 'ioredis';

import RedisApi from '../api/redisApi';
import Defns from '../defns';
import Store from './store';

class RedisStore extends Store {
  constructor(redisClientOptions = null) {
    super(Defns.REDIS);

    if (redisClientOptions) {
      this._client = new Redis(redisClientOptions);
    } else {
      this._client = new Redis();
    }
    this._cookiesApi = new RedisApi('cookies', this._client);
  }

  get cookies() {
    return this._cookiesApi;
  }
}

export default RedisStore;
