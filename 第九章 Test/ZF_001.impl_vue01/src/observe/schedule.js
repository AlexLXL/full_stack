import {nextTick} from "../utils";

let has = {};
let queue = [];
let pending = false;

export function queueWatcher(watcher) {
    let id = watcher.id;
    if (has[id] == null) {
        has[id] = true;
        queue.push(watcher);
    }
    if (!pending) {
        nextTick(flushSchedulerQueue); // 修改值的也是放到微任务队列里
        pending = true;
    }
}

function flushSchedulerQueue() {
    queue.forEach(watcher => watcher.run());
    queue = [];
    has = {};
    pending = false;
}