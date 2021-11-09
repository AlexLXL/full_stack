export function patchEvent(el, key, newValue) {
    const invokers = el._vei || (el._vei = {})  // 缓存起来
    const exists = invokers[key]
    if (exists && newValue) {
        exists.value = newValue
    }else {
        const eventName = key.slice(2).toLowerCase()
        if (newValue) {
            const fn = invokers[key] = createInvoker(newValue)
            el.addEventListener(eventName, fn)
        } else {
            el.removeEventListener(eventName, exists)
        }
    }
}

function createInvoker(fn) {
    const invoker = (e) => { invoker.value(e) }
    invoker.value = fn
    return invoker
}