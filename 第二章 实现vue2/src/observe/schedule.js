import {nextTick} from "../async/nextTick";

let ids = new Set()
let queue = []
let free = true

/**
 * 和防抖有些不同,
 * 这里是把render放到微任务,等同步代码执行完, 然后就会执行render
 */
export function queueWatcher(watcher) {
    let id = watcher.id
    if (!ids.has(id)) {
        ids.add(id)
        queue.push(watcher)
    }
    if (free) {
        nextTick(flushSchedulerQueue)
        free = false
    }
}
function flushSchedulerQueue() {
    queue.forEach(watcher => watcher.run())
    ids.clear()
    queue = []
    free = true
}