import RedisStore from '@pooky/datastore';

class Resolver {
  constructor() {
    this._settingsId = null;
    this.store = new RedisStore(process.env.REDIS_URL);
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
