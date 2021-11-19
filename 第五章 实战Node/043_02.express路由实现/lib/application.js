let http = require('http')
let Router = require('../router/index')

function Application() {
    this.router = new Router()
}
Application.prototype.get = function(path, handler) {
    this.router.get(path, handler)
}
Application.prototype.listen = function(...args) {
    let server = http.createServer(function (req, res) {
        function done() {
            res.end(`Not Found Router`)
        }
        this.router.handle(req, res, done)
    })
    server.listen(...args)
}
Application.prototype.all = function() {}

module.exports = Application