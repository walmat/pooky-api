import uuidv4 from 'uuid/v4';

import { MemoryStore, RedisStore, Datasources } from '@pooky/datastore';
import { initialStates } from '@pooky/structures';

const { settingsState } = initialStates;

class Resolver {
  constructor() {
    this._settingsId = null;
    if (process.env.MONITOR_DATASOURCE === Datasources.redis) {
      let connectArgs = [];
      // heroku defined .env variable
      if (process.env.REDIS_URL) {
        connectArgs = [process.env.REDIS_URL];
      } else {
        connectArgs = [
          {
            host: process.env.MONITOR_REDIS_HOST || '127.0.0.1',
            port: process.env.MONITOR_REDIS_PORT || '6379',
          },
        ];
      }
      this.store = new RedisStore(...connectArgs);
    } else {
      this.store = new MemoryStore();
    }
  }

  async getCookies() {
    return this.store.cookies.browse();
  }

  async addCookies(data) {
    return this.store.cookies.add(data);
  }

  async editCookies(id, data) {
    return this.store.products.edit(id, data);
  }

  async getSettings() {
    // Check if we can get the settings by id, or if we
    // need to deduce the settings id
    if (this._settingsId) {
      // get the settings and delete the id so graphql doesn't complain
      const settings = await this.store.settings.read(this._settingsId);
      delete settings.id;
      return settings;
    }

    const settingsList = await this.store.settings.browse();
    if (!settingsList.length) {
      // No settings stored, return default settings
      return { ...settingsState };
    }
    // Settings exist, get them, but remove the id value so graphql doesn't complain
    const settings = settingsList[0];
    this._settingsId = settings.id;
    delete settings.id;
    return settings;
  }

  async updateSettings(data) {
    // Supplement missing data with initial state until
    // partial settings objects are supported
    const settingsData = {
      ...settingsState,
      ...data,
    };

    // Check if we should update the settings or add new settings
    let settings;
    if (this._settingsId) {
      settingsData.id = this._settingsId;
      settings = await this.store.settings.edit(this._settingsId, settingsData);
    } else {
      settings = await this.store.settings.add(settingsData);
    }

    // store the id for future reference, then delete
    // the id from the return object so graphql doesn't complain,
    this._settingsId = settings.id;
    delete settings.id;
    return settings;
  }
}

export default Resolver;
