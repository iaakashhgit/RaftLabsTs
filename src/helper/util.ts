/**
 * Create an object composed of the picked object properties
 * @param {T} object
 * @param {K[]} keys
 * @returns {Partial<T>}
 */
const pick = <T, K extends keyof T>(object: T, keys: K[]): Partial<T> =>
  keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {} as Partial<T>);

export default pick
