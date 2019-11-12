/* eslint class-methods-use-this: ["error", { "exceptMethods": ["cookies", "settings"] }] */

class Store {
  constructor(source) {
    if (new.target === Store) {
      throw new TypeError('Cannot contruct instances of this abstract class!');
    }
    this._source = source;
  }

  /**
   * Source of data for the store
   */
  get source() {
    return this._source;
  }

  /**
   * Api instance to manage cookies
   */
  get cookies() {
    throw new Error('This needs to be overwritten in subclass!');
  }

  /**
   * Api instance to manage settings
   */
  get settings() {
    throw new Error('This needs to be overwritten in subclass!');
  }
}

export default Store;
