import uuidv4 from 'uuid/v4';

import { RedisStore } from '@pooky/datastore';

class Resolver {
  constructor() {
    this._settingsId = null;
    const connectArgs = [
      {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    ];
    this.store = new RedisStore(...connectArgs);
  }

  async getCookies() {
    return this.store.cookies.pop();
  }

  async addCookies(payload) {
    return this.store.cookies.add(payload);
  }

  async flushCookies() {
    return this.store.cookies.flush();
  }
}

export default Resolver;
