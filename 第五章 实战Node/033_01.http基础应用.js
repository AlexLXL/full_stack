/**
 * 使用http (启动http服务)
 * - 内部使用net模块解析
 */

let http = require('http')
let port = 9091
let server = http.createServer((req, res) => {
    // ------------请求行、请求头、请求体------------
    /*console.log(req.method, req.url, req.httpVersion)   // 请求行
    
    console.log(req.headers)    // 请求头

    // 请求体
    // 使用命令行测试 > curl -X POST --data abc=1 -v localhost:9091
    let arr = []
    req.on('data', (data) => {
        arr.push(data)
    })
    req.on('end', (data) => {
        console.log(Buffer.concat(arr).toString())
    })*/

    // ------------响应行、响应头、响应体------------
    /*res.statusCode = 200
    res.setHeader('token', 'ok')
    res.write('1')
    res.end('2')*/
})
server.on('request', (req, res) => {
    // console.log(`request~`)
})
server.on('error', (err) => {
    if (err) {
        server.listen(++port)
    }
})
server.listen(port, () => {
    console.log(`server listen ${port}`)
})

/**
 * 每次修改代码都需要重启服务, 可以使用nodemon插件来热重启
 */
