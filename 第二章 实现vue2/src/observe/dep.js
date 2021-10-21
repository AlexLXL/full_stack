let id = 0
export class Dep {
    constructor() {
        this.id = id++
        this.watchers = []
    }
    depend() {
        Dep.target.addDep(this)
    }
    // addSub方法,改一下名好辨识
    addWatcher(watcher) {
        this.watchers.push(watcher)
    }
    notify() {
        this.watchers.forEach(watcher => watcher.update())
    }
}
Dep.target = null