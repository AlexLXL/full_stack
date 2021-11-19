let methods = require('methods')
let Layer = require('./layer')
function Route() {
    this.stack = []
    this.methods ={}
}
Route.prototype.dispatch = function (req, res, out) {
    let i = 0
    let next = () => {
        if (i === this.stack.length) return out()
        let layer = this.stack[i++]
        if (layer.matchMethod(req.method.toLowerCase())) {
            layer.handler_request(req, res, next)
        }else {
            next()
        }
    }
    next()
}

methods.forEach(method => {
    Route.prototype[method] = function (handlers) {
        handlers.forEach(handler => {
            let layer = new Layer('/', handler)
            layer.method = method
            this.methods[method] = method
            this.stack.push(layer)
        })
    }
})


module.exports = Route