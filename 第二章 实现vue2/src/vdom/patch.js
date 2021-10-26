/**
 * vnode => real dom
 */
import {isObject} from "../utils/utils";
import {isSameNode} from "./index";

/**
 * 节点比对、属性比对、递归对比子元素
 * @param oldVnode
 * @param newVnode
 * @returns {*}
 */
export function patch(oldVnode, newVnode) {
    if (oldVnode.nodeType) {
        let parentNode = oldVnode.parentNode
        let realDom = createElm(newVnode)
        parentNode.insertBefore(realDom, oldVnode.nextSibing);
        parentNode.removeChild(oldVnode);
        return realDom
    }else {
        // 节点不同
        if (!isSameNode(oldVnode, newVnode)) {
            oldVnode.el.parentNode.replaceChild(createElm(newVnode), oldVnode.el)
        }

        // 节点相同
        let el = newVnode.el = oldVnode.el
        if (!oldVnode.tag) {
            if (oldVnode.text !== newVnode.text) {
                return el.textContent = newVnode.text
            }
        }
        createElmProp(newVnode, oldVnode.data)
        let oldChildren = oldVnode.children || []   // 比较儿子
        let newChildren = newVnode.children || []
        if (oldChildren.length && !newChildren.length) {
            el.innerHTML = ''
        }else if (!oldChildren.length && newChildren.length) {
            newChildren.forEach(child => el.appendChild(createElm(child)))
        }else {
            updateChildren(el, oldChildren, newChildren)
        }
        return el
    }
}
export function createElm(vnode) {
    let {vm, tag, data, children, text} = vnode
    if (tag) {
        // 在vnode.el都存了真实dom
        vnode.el = document.createElement(tag)
        createElmProp(vnode, data)
        children.forEach(child => {
            vnode.el.appendChild(createElm(child))
        })
    }else {
        vnode.el = document.createTextNode(text)
    }
    return vnode.el
}
function createElmProp(newVnode, oldProps={}) {
    let el = newVnode.el
    let newProps = newVnode.data || {}

    let newStyle = newProps.style || {}
    let oldStyle = oldProps.style || {}
    for (let key in oldStyle) {
        if (!newStyle[key]) {
            el.style[key] = ""
        }
    }

    for (let key in newProps) {
        if (key === 'style') {
            for (let s in newStyle) {
                el.style[s] = newStyle[s]
            }
        }else {
            el.setAttribute(key, newProps[key])
        }
    }
    for (let key in oldProps) {
        if (!newProps[key]) {
            el.removeAttribute(key)
        }
    }
}
function updateChildren(el, oldChildren, newChildren) {
    let oldStartIndex = 0
    let oldStartVnode = oldChildren[0]
    let oldEndIndex = oldChildren.length - 1
    let oldEndVnode = oldChildren[oldEndIndex]
    let newStartIndex = 0
    let newStartVnode = newChildren[0]
    let newEndIndex = newChildren.length - 1
    let newEndVnode = newChildren[newEndIndex]
    let mapping = makeKeyByIndex(oldChildren)
    // 头头、尾尾、头尾、尾头、乱序
    while((oldStartIndex <= oldEndIndex) && (newStartIndex <= newEndIndex)) {
        if (!oldStartVnode) {
            oldStartVnode = oldChildren[++oldStartIndex]
        }else if (!oldEndVnode) {
            oldEndVnode = oldChildren[--oldEndIndex]
        }else if (isSameNode(oldStartVnode,newStartVnode)) {
            patch(oldStartVnode, newStartVnode)
            oldStartVnode = oldChildren[++oldStartIndex]
            newStartVnode = newChildren[++newStartIndex]
        }else if (isSameNode(oldEndVnode, newEndVnode)) {
            patch(oldEndVnode, newEndVnode)
            oldEndVnode = oldChildren[--oldEndIndex]
            newEndVnode = newChildren[--newEndIndex]
        }else if (isSameNode(oldStartVnode, newEndVnode)) {
            patch(oldStartVnode, newEndVnode)
            el.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling)
            oldStartVnode = oldChildren[++oldStartIndex]
            newEndVnode = oldChildren[--newEndIndex]
        }else if (isSameNode(oldEndVnode, newStartVnode)) {
            patch(oldEndVnode, newStartVnode)
            el.insertBefore(oldEndVnode.el, newStartVnode.el)
            oldEndVnode = oldChildren[--oldEndIndex]
            newStartVnode = newChildren[++newStartIndex]
        }else {
            let moveIndex = mapping[newStartVnode.key]
            if (moveIndex === undefined) {
                el.insertBefore(createElm(newStartVnode), oldStartVnode.el)
            }else {
                let moveVnode = oldChildren[moveIndex]
                patch(moveVnode, newStartVnode)
                el.insertBefore(moveVnode.el, oldStartVnode.el)
                oldChildren[moveIndex] = undefined
            }
            newStartVnode = newChildren[++newStartIndex]
        }
    }
    if (newStartIndex <= newEndIndex) {
        for (let i = newStartIndex; i <= newEndIndex; i++) {
            let anchor = newChildren[newEndIndex + 1] ? newChildren[newEndIndex + 1].el : null
            el.insertBefore(createElm(newChildren[i]), anchor)
        }
    }
    if (oldStartIndex <= oldEndIndex) {
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
            let child = oldChildren[i]
            child && el.removeChild(child.el)
        }
    }
}
function makeKeyByIndex(children) {
    let map = {}
    children.forEach((item, index) => {
        map[item.key] = index
    })
    return map
}