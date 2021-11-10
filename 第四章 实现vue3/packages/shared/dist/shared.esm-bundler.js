const isObject = v => typeof v === 'object' && v !== null;
const isString = v => typeof v === 'string';
const isFunction = v => typeof v === 'function';
const isArray = Array.isArray;
const extend = Object.assign;
const hasChange = (oldValue, newValue) => oldValue !== newValue;
const isInteger = (key) => parseInt(key) + '' === key; // 数组的下标
const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key);

export { extend, hasChange, hasOwn, isArray, isFunction, isInteger, isObject, isString };
//# sourceMappingURL=shared.esm-bundler.js.map
