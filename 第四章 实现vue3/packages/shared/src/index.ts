export const isObject = (v) => typeof v === 'object' && v !== null
export const isArray = Array.isArray

export const extend = Object.assign
export const hasChange = (oldValue, newValue) => oldValue !== newValue
export const isInteger = (key) => parseInt(key) + '' === key   // 数组的下标
export const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key)