/**
 * 测试在 "016_01.核心模块events.js" 进行
 */
function myEvent() {
    this.events = {}
}
myEvent.prototype.on = function(name, cb) {
    if (!this.events) this.events = {}
    this.events[name] ? this.events[name].push(cb) : (this.events[name] = [cb])
}
myEvent.prototype.emit = function(name, data) {
    if (!this.events) this.events = {}
    if (this.events[name]) {
        this.events[name].forEach(fn => fn(data))
    }
}
myEvent.prototype.off = function(name, fn) {
    if (!this.events) this.events = {}
    if (this.events[name]) {
        this.events[name] = this.events[name].filter(innFn => ((innFn !== fn) && (innFn.raw !== fn)))
    }
}
myEvent.prototype.once = function(name, fn) {
    if (!this.events) this.events = {}
    let one = (...args) => {
        fn(...args)
        this.off(name, one)
    }
    one.raw = fn
    this.on(name, one)
}


module.exports = myEvent