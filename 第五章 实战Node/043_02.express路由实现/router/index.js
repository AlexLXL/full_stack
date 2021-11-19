let methods = require('methods')
let url = require('url')
let Layer = require('./layer')
let Route = require('./route')

function Router() {
    this.stack = []
}

methods.forEach(method => {
    Router.prototype[method] = function (path, handlers) {
        let route = this.route(path)
        route[method](handlers)
        // this.stack.push({
        //     method: 'get',
        //     path,
        //     handler
        // })
    }
})
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

    let {pathname} = url.parse(req.url, true)
    let method = req.method.toLocaleLowerCase()
    let i = 0
    let next = () => {
        if (i === this.stack.length) return done()
        let layer = this.stack[i++]
        if (layer.matchPath(pathname)) {
            if (layer.route.methods[method]) {
                layer.handler_request(req, res, next)     // route.dispatch
            }
        }else {
            next()
        }
    }
    next()
}
Router.prototype.route = function (path) {
    let route = new Route()
    let layer = new Layer(path, route.dispatch.bind(route))
    layer.route = route
    this.stack.push(layer)
    return route
}

module.exports = Router