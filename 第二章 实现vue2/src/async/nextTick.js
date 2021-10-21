let queue = []
let free = true

export function nextTick(fn) {
    queue.push(fn)
    if (free) {
        Promise.resolve().then(flushSchedulerQueue)
        free = false
    }
}
function flushSchedulerQueue() {
    queue.forEach(fn => fn())
    queue = []
    free = true
}