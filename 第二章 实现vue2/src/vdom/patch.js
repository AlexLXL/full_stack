/**
 * vnode => real dom
 */
import {isObject} from "../utils/utils";

export function patch(oldVnode, newVnode) {
    let parentNode = oldVnode.parentNode
    let realDom = createElm(newVnode)
    parentNode.insertBefore(realDom, oldVnode.nextSibing);
    parentNode.removeChild(oldVnode);
    return realDom
}
function createElm(vnode) {
    let {vm, tag, data, children, text} = vnode
    if (tag) {
        // 在vnode.el都存了真实dom
        vnode.el = document.createElement(tag)
        createElmProp(vnode.el, data)
        children.forEach(child => {
            vnode.el.appendChild(createElm(child))
        })
    }else {
        vnode.el = document.createTextNode(text)
    }
    return vnode.el
}
function createElmProp(el, props={}) {
    for (let [k,v] of Object.entries(props)) {
        let result = ""
        if(isObject(v)) {
            for (let [key,value] of Object.entries(v)) {
                result += `${key}:${value};`
            }
        }else {
            result = v
        }
        el.setAttribute(k, result);
    }
}