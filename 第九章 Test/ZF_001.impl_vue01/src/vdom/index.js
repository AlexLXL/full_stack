export function createElement(vm, tag, data={},...children) {
    return vnode(vm, tag, data, children, data.key, undefined);
}

export function createText(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text);
}

function vnode(vm, tag, data, children, key, text) { // key用于之后做diff
    return {
        vm,
        tag,
        data,
        children,
        key,
        text
    }
}