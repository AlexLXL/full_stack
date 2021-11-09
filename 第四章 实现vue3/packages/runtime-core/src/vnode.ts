import {isArray, isObject, isString, ShapeFlags} from "@vue/shared";

export function createVnode(type, props, children = null) {
    let shapeFlag = isString(type) ? ShapeFlags.ELEMENT :
                        isObject(type) ? ShapeFlags.STATEFUL_COMPONENT :
                            0;
    let vnode = {
        __v_isVnode: true,
        type,
        props,
        children,
        el: null,   // 真实节点
        key: props && props.key,
        shapeFlag
    }
    normalizeChildren(vnode, children)
    return vnode
}

function normalizeChildren(vnode, children) {
    if (children === null) {

    }else if (isArray(children)) {
        vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
    }else {
        vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
    }
}