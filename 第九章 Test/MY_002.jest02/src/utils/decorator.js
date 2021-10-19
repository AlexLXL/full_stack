function debounce01(fn,delay){
    let timer = null
    return function() {
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(fn,delay)
    }
}

function throttle01(fn, delay){
    let valid = true
    return function() {
        if(!valid){
            return false
        }
        valid = false
        setTimeout(() => {
            fn()
            valid = true;
        }, delay)
    }
}

export let debounce = function(wait, options = {}) {
    return function(target, name, descriptor) {
        descriptor.value = debounce01(descriptor.value, wait, options)
    }
}

export let throttle =  function(wait, options = {}) {
    return function(target, name, descriptor) {
        descriptor.value = throttle01(descriptor.value, wait, options)
    }
}