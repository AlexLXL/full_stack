export function patchAttr(el, key, newValue) {
    if (newValue === null) {
        el.removeAttribute(key)
    }else {
        el.setAttribute(key, newValue)
    }
}