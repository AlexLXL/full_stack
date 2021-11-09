export function patchStyle(el, oldValue, newValue) {
    const style = el.style
    if (newValue === null) {
        el.removeAttribute('style')
    }else {
        if (oldValue) {
            for (let k in oldValue) {
                if (newValue[k] === null) {
                    style[k] = ''
                }
            }
        }
        for (let k in newValue) {
            style[k] = newValue[k]
        }
    }
}