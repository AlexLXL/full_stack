/**
 * 5.正向代理和反向代理
 * 【 我 -> 代理服务器 】-> chrome服务器   // 正向代理, 内网访问外网
 * 我 -> 【 Nginx -> chrome服务器 】      // 反向代理
 */

let httpProxy = require("http-proxy")
let http = require("http")
let proxy = httpProxy.createProxyServer()
let server = http.createServer((req, res)    => {
    proxy.web(req, res, {
        target: "http://127.0.0.1:9001"
    })
})
server.listen(9000, () => {console.log(`9000端口`)})




