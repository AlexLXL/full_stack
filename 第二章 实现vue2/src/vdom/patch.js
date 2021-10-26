/**
 * vnode => real dom
 */
import {isObject} from "../utils/utils";
import {isSameNode} from "./index";

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
    // 头头、尾尾、头尾、尾头、乱序
    while((oldStartIndex <= oldEndIndex) && (newStartIndex <= newEndIndex)) {
        if (isSameNode(oldStartVnode,newStartVnode)) {
            patch(oldStartVnode, newStartVnode) // 递归对比子元素
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
            el.removeChild(child.el)
        }
    }
}