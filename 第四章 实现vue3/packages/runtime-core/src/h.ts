import {isArray, isObject} from "@vue/shared";
import {createVnode} from "./vnode";

/**
 * h(标签, 属性)
 * h(标签, 属性, 值)
 * h(标签, 值)
 * h(标签, [值, 值])
 * h(标签, 属性, 值, 值)
 * @param type
 * @param propsOrChildren
 * @param children
 */
export function h(type, propsOrChildren, children) {
    let len = arguments.length
    if (len === 2) {
        if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
            return createVnode(type, propsOrChildren)
        }else {
            return createVnode(type, null, propsOrChildren)
        }
    }else if (len == 3) {
        return createVnode(type, propsOrChildren, children)
    }else if (len > 3) {
        return createVnode(type, propsOrChildren, Array.from(arguments).slice(2))
    }
}