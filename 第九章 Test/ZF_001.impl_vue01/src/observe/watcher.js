import {Dep} from "./dep";
import {queueWatcher} from "./schedule";

let id = 0;

export class Watcher {
    constructor(vm, fn, cb, options) {
        this.vm = vm;
        this.fm = fn;
        this.cb = cb;
        this.options = options; // 是否渲染watcher
        this.id = id++;
        this.depIds = new Set();
        this.deps = [];
        this.getter = fn;

        this.get();
    }

    get() {     // 初始化
        Dep.target = this; // window.target = watcher
        this.getter();
        Dep.target = null;
    }
    run() {  // 真正更新
        // console.log("run执行次数");
        this.get();
    }
    update() { // 更新
        // this.get();
        queueWatcher(this); // 缓存更新，调度watcher
    }
    addDep(dep) {
        let did = dep.id;
        if(!this.depIds.has(did)) { // 这里实现dep.ids的去重和watcher.deps去重
            this.depIds.add(did);
            this.deps.push(dep); // 保存id并让watcher记住dep
            dep.addSub(this);
        }
    }
}