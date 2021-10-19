let id = 0;

export class Dep {
    constructor() {
        this.subs = [];
        this.id = id++;
    }

    depend() {
        Dep.target.addDep(this); // watcher添加dep
    }
    addSub(watcher) {
        this.subs.push(watcher);
    }
    notify() {
        this.subs.forEach(watcher => watcher.update())
    }
}
Dep.target = null;