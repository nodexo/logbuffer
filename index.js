
'use strict';

/**
 * Creates a new instance.
 * @class
 */
class LogBuffer {

  /**
    * @constructs instance
    * @param {Number} capacity - Sets the size of the circular buffer.
    * @param {Object} options - Sets additional config options.
    * @return {Object}
    */
  constructor(capacity, options) {
    if (Number.isInteger(capacity) === false || capacity > 0 === false) {
      throw new Error("The capacity has to be an integer bigger than zero!");
    }
    this._cap = capacity;
    this._pos = 0;
    this._buf = [];
    this._tmr = null;

    if (options instanceof Object) {
      const af = options.autoflush || null;
      if (af && af.enabled === true && af.callback instanceof Function) {
        this._af = af.enabled;
        this._cb = af.callback;
        if (af.interval && Number.isInteger(af.interval) && af.interval > 0) {
          this._ms = af.interval;
          this._setFlushTimer();
        }
      }
    }
  }

  /**
   * Sets the flush timer
   * @param {Number} ms
   */
  _setFlushTimer(ms) {
    clearTimeout(this._tmr);
    if (Number.isInteger(ms) === false) {
      if (!this._ms) {
        return;
      }
      ms = this._ms;
    }
    if (this._af && this._cb) {
      this._tmr = setTimeout(() => { this.flush(this._cb) }, ms);
    }
  }

  /**
    * Returns the capacity of the buffer
    * @return {Number}
    */
  capacity() {
    return this._cap;
  }

  /**
    * Returns the size of the buffer
    * @return {Number}
    */
  size() {
    return this._buf.length;
  }

  /**
    * Adds an entry to the buffer
    * @param {String} or {Object} entry
    */
  add(entry) {
    this._buf[this._pos] = entry;
    this._pos++;
    if (this._pos >= this._cap) {
      if (this._af) {
        this._setFlushTimer(0);
      } else {
        this._pos = 0;
      }
    }
    return 'OK';
  }

  /**
   * Flushes the buffer
   * @param {Function} callback
   * @return {Array}
   */
  flush(cb) {
    clearTimeout(this._tmr);
    const data = [].concat(this._buf.slice(this._pos), this._buf.slice(0, this._pos));
    this._buf = [];
    this._pos = 0;
    this._setFlushTimer();

    if (data.length > 0) {
      if (cb) {
        return cb(data);
      }
      return data;
    }
  }
}

module.exports = LogBuffer;
