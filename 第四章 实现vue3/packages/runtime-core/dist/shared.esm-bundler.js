const isObject = (v) => typeof v === 'object' && v !== null;
const isArray = Array.isArray;
const hasChange = (oldValue, newValue) => oldValue !== newValue;
const isInteger = (key) => parseInt(key) + '' === key; // 数组的下标
const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key);

export { hasChange, hasOwn, isArray, isInteger, isObject };
//# sourceMappingURL=shared.esm-bundler.js.map
