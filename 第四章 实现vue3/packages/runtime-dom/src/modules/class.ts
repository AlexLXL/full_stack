export function patchClass(el, newValue) {
    if (newValue === null) {
        newValue = ''
    }
    el.className = newValue
}