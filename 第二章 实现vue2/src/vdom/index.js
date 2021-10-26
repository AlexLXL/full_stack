export function createVnodeEle(vm, tag, data = {}, ...children) {
    return vnode(vm, tag, data, children, data.key, undefined)
}
export function createVnodeText(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text)
}

function vnode(vm, tag, data = {}, children, key, text) {
    return {
        vm,
        tag,
        data,
        children,
        key,
        text
    }
}

export function isSameNode(oldVnode, newVnode) {
    return (oldVnode.tag === newVnode.tag) && (oldVnode.key == newVnode.key)
}