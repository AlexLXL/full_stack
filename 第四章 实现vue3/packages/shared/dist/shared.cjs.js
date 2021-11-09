'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const isObject = (v) => typeof v === 'object' && v !== null;
const isArray = Array.isArray;
const isString = v => typeof v === 'string';
const extend = Object.assign;
const hasChange = (oldValue, newValue) => oldValue !== newValue;
const isInteger = (key) => parseInt(key) + '' === key; // 数组的下标
const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key);

exports.extend = extend;
exports.hasChange = hasChange;
exports.hasOwn = hasOwn;
exports.isArray = isArray;
exports.isInteger = isInteger;
exports.isObject = isObject;
exports.isString = isString;
//# sourceMappingURL=shared.cjs.js.map
