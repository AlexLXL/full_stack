let Layer = require('./layer')
function Route() {
    this.stack = []
}
Route.prototype.dispatch = function (req, res, out) {
    let i = 0
    let next = () => {
        if (i === this.stack.length) return out()
        let layer = this.stack[i++]
        if (layer.method === req.method.toLowerCase()) {
            layer.handler(req, res, next)
        }else {
            next()
        }
    }
    next()
}
Route.prototype.get = function (handlers) {
    handlers.forEach(handler => {
        let layer = new Layer('/', handler)
        layer.method = 'get'
        this.stack.push(layer)
    })
}

module.exports = Route