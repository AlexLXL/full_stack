let http = require('http')
let url = require('url')
let Router = require('../router/index')

function Application() {
    this.router = new Router()
}
Application.prototype.get = function(path, ...handlers) {
    this.router.get(path, handlers)
}
Application.prototype.listen = function(...args) {
    let server = http.createServer( (req, res) => {
        let {query} = url.parse(req.url, true)
        req.query = query

        function done() {
            res.end(`Not Found Router`)
        }
        this.router.handle(req, res, done)
    })
    server.listen(...args)
}
Application.prototype.all = function() {}

module.exports = Application