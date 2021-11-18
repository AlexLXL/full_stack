/**
 * 静态服务器实现 (读取路径返回对应文件)
 * http://localhost:9092/public/index.html -> 返回html文件
 */
let path = require('path')
let fs = require('fs')
let http = require('http')
let url = require('url')
let mime = require('mime')  // .html/.js/.css要给不同的Content-Type

let port = 9092
let server = http.createServer((req, res) => {
    let {pathname} = url.parse(req.url, true)
    let filePath = path.join(__dirname, pathname)
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 404
            return res.end('Not Found')
        }else {
            res.setHeader('Content-Type', `${mime.getType(filePath)};charset=utf8`)
            res.end(data)
        }
    })
})
server.listen(port, () => {
    console.log(`启动服务器${port}`)
})