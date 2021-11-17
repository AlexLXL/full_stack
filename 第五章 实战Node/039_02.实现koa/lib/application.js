let EventEmitter = require('events')
let http = require('http')

class Koa extends EventEmitter {
    use(fn) {
        this.fn = fn
    }
    handleRequest = (req, res) => {
        this.fn()
    }
    listen(...args) {
        let server = http.createServer(this.handleRequest)
        server.listen(...args)
    }
}