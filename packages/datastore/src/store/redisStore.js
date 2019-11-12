import { createClient } from 'redis';

import RedisApi from '../api/redisApi';
import Datasources from '../utils/datasources';

import Store from './store';

class RedisStore extends Store {
  constructor(redisClientOptions = {}) {
    super(Datasources.redis);
    this._client = createClient(redisClientOptions);
    this._cookiesApi = new RedisApi('cookies', this._client);
    this._settingsApi = new RedisApi('settings', this._client);
  }

  get cookies() {
    return this._cookiesApi;
  }

  get settings() {
    return this._settingsApi;
  }
}

export default RedisStore;
