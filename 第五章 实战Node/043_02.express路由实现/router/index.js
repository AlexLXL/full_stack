let url = require('url')
let Layer = require('./layer')
let Route = require('./route')

function Router() {
    this.stack = []
}
Router.prototype.get = function (path, handlers) {
    let route = this.route(path)
    route.get(handlers)
    // this.stack.push({
    //     method: 'get',
    //     path,
    //     handler
    // })
}
Router.prototype.handle = function (req, res, done) {
    // let {pathname, query} = url.parse(req.url, true)
    // let requestMethod = req.method.toLocaleLowerCase()
    // for (let i = 0; i < this.stack.length; i++) {
    //     let  {method, path, handler} = this.stack[i]
    //     if (path === pathname && method === requestMethod) {
    //         return handler(req, res)
    //     }
    // }
    // return done()
}
Router.prototype.route = function (path) {
    let route = new Route()
    let layer = new Layer(path, route.dispatch.bind(route))
    layer.route = route
    this.stack.push(layer)
    return route
}

module.exports = Router