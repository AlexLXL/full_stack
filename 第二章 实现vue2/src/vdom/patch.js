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
        // 对比不同
        if (!isSameNode(oldVnode, newVnode)) {
            oldVnode.el.parentNode.replaceChild(createElm(newVnode), oldVnode.el)
        }

        // 对比相同
        let el = newVnode.el = oldVnode.el
        if (!oldVnode.tag) {
            if (oldVnode.text !== newVnode.text) {
                return el.textContent = newVnode.text
            }
        }

        createElmProp(newVnode, oldVnode.data)
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