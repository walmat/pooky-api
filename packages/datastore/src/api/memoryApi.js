import uuidv4 from 'uuid/v4';

import Api from './api';

class MemoryApi extends Api {
  constructor(type) {
    super(type);
    this._data = {};
  }

  _genNewId() {
    let newId = uuidv4();
    while (this._data[newId]) {
      newId = uuidv4();
    }
    return newId;
  }

  async browse() {
    return Object.values(this._data);
  }

  async read(id) {
    const payload = this._data[id];
    if (!payload) {
      throw new Error('Payload with that id does not exist!');
    }
    return payload;
  }

  async edit(id, payload) {
    const old = this._data[id];
    if (!old) {
      // fallback to add if old doesn't exist
      return this.add(payload);
    }
    const clone = JSON.parse(JSON.stringify(payload));
    clone.id = id;
    this._data[id] = clone;
    return clone;
  }

  async add(payload) {
    const clone = JSON.parse(JSON.stringify(payload));
    const newId = this._genNewId();
    clone.id = newId;
    this._data[newId] = clone;
    return clone;
  }

  async delete(id) {
    const payload = this._data[id];
    delete this._data[id];
    return payload;
  }
}

export default MemoryApi;
