import {Dep} from "./dep";
import {queueWatcher} from "./schedule";

let id = 0
export class Watcher {
    constructor(vm, updateCpmponent, cb) {
        this.id = id++;
        this.vm = vm;
        this.getter = updateCpmponent;
        this.cb = cb;
        this.depIds = new Set();
        this.deps = [];

        this.get();
    }
    get() {
        Dep.target = this
        this.getter()
        Dep.target = null
    }
    addDep(dep) {
        let depId = dep.id
        if (!this.depIds.has(depId)) {
            this.depIds.add(depId)
            this.deps.push(dep)
            dep.addWatcher(this)
        }
    }
    update() {
        // 快速修改多次值会导致render多次
        // this.get()
        queueWatcher(this)
    }
    run() {
        this.get()
        // FIXME: 会再出发一次依赖收集, 有优化空间?
    }
}