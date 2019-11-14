/* eslint class-methods-use-this: ["error", { "exceptMethods": ["pop", "flush", "add"] }] */
/* eslint no-unused-vars: "off" */
// Standard BREAD api
class Api {
  constructor(type) {
    if (new.target === Api) {
      throw new TypeError('Cannot construct instances of this abstract class!');
    }
    this._type = type;
  }

  get type() {
    return this._type;
  }

  /**
   * Removes the first index of a dataset
   *
   * @returns {Object} payload
   * @throws when operation could not be performed
   */
  async pop() {
    throw new Error('This needs to be overwritten in subclass!');
  }

  /**
   * Removes all keys in a database
   *
   * @returns {Object} payload
   * @throws when operation could not be performed
   */
  async flush() {
    throw new Error('This needs to be overwritten in subclass!');
  }

  /**
   * Add the given payload with a new id
   *
   * @param {Object} payload the new payload to add
   * @returns {Object} payload that has been added with a new id
   * @throws when operation could not be performed
   */
  async push(payload) {
    throw new Error('This needs to be overwritten in subclass!');
  }
}

export default Api;
