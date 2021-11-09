export const isObject = (v) => typeof v === 'object' && v !== null
export const isArray = Array.isArray
export const isString = v => typeof v === 'string'

export const extend = Object.assign
export const hasChange = (oldValue, newValue) => oldValue !== newValue
export const isInteger = (key) => parseInt(key) + '' === key   // 数组的下标
export const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key)

export const enum ShapeFlags {
    ELEMENT = 1,
    FUNCTIONAL_COMPONENT = 1 << 1,
    STATEFUL_COMPONENT = 1 << 2,
    TEXT_CHILDREN = 1 << 3,
    ARRAY_CHILDREN = 1 << 4,
    SLOTS_CHILDREN = 1 << 5,
    TELEPORT = 1 << 6,
    SUSPENSE = 1 << 7,
    COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
    COMPONENT_KEPT_ALIVE = 1 << 9,
    COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT
}
