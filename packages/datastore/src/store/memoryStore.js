import MemoryApi from '../api/memoryApi';
import Datasources from '../utils/datasources';

import Store from './store';

class MemoryStore extends Store {
  constructor() {
    super(Datasources.memory);
    this._cookiesApi = new MemoryApi('cookies');
    this._settingsApi = new MemoryApi('settings');
  }

  get cookies() {
    return this._cookiesApi;
  }

  get settings() {
    return this._settingsApi;
  }
}

export default MemoryStore;
