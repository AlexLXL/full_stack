let http = require('http')
let url = require('url')

let routers = [
    {
        method: 'all',
        path: '*',
        handler(req, res) {
            res.end('Not Found Router')
        }
    }
]
function createApplication() {
    return {
        all() {},
        get(path, handler) {
            routers.push({
                method: 'get',
                path,
                handler
            })
        },
        listen(...args) {
            let server = http.createServer(function (req, res) {
                let {pathname, query} = url.parse(req.url, true)
                let requestMethod = req.method.toLocaleLowerCase()
                for (let i = 0; i < routers.length; i++) {
                    let  {method, path, handler} = routers[i]
                    if (path === pathname && method === requestMethod) {
                        return handler(req, res)
                    }
                }
                return routers[0].handler(req, res)
            })
            server.listen(...args)
        }
    }
}

module.exports = createApplication