import RedisStore from '@pooky/datastore';

class Resolver {
  constructor() {
    this._settingsId = null;
    const connectArgs = [
      {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || '6379',
      },
    ];
    this.store = new RedisStore(...connectArgs);
  }

  async getCookies() {
    return this.store.cookies.pop();
  }

  async addCookies(payload) {
    return this.store.cookies.push(payload);
  }

  async flushCookies() {
    return this.store.cookies.flush();
  }
}

export default Resolver;
