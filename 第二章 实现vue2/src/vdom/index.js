import {isObject} from "../utils/utils";

export function createVnodeEle(vm, tag, data = {}, ...children) {
    if (!isReservedTag(tag)) {
        let Ctor = vm.$options.components[tag]
        return createComponent(vm, tag, data = {}, children, data.key, Ctor)
    }
    return vnode(vm, tag, data, children, data.key, undefined)
}
export function createVnodeText(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text)
}

function vnode(vm, tag, data = {}, children, key, text, componentOptions) {
    return {
        vm,
        tag,
        data,
        children,
        key,
        text,
        componentOptions
    }
}

export function isSameNode(oldVnode, newVnode) {
    return (oldVnode.tag === newVnode.tag) && (oldVnode.key == newVnode.key)
}

export const isReservedTag = makeMap(
    'template,script,style,element,content,slot,link,meta,svg,view,' +
    'a,div,img,image,text,span,input,switch,textarea,spinner,select,' +
    'slider,slider-neighbor,indicator,canvas,' +
    'list,cell,header,loading,loading-indicator,refresh,scrollable,scroller,' +
    'video,web,embed,tabbar,tabheader,datepicker,timepicker,marquee,countdown'
)

function makeMap(str) {
    let tagList = str.split(',')
    return function (tagName) {
        return tagList.includes(tagName)
    }
}

/**
 * @param vm
 * @param tag
 * @param data
 * @param children
 * @param Ctor 构造函数
 */
function createComponent(vm, tag, data = {}, children, key, Ctor) {
    if (isObject(Ctor)) {
        Ctor = vm.$options._base.extend(Ctor)
    }
    // 组件的初始化、更新、插入、销毁
    data.hook = {
        init() {},
        prepatch() {},
        insert() {},
        destroy() {},
    }
    let vNode = vnode(vm, tag, data = {}, undefined, key, undefined, {Ctor, children, tag})
    return vNode
}