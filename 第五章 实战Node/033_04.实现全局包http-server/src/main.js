let path = require('path')
let fs = require('fs').promises
let {createReadStream, readFileSync} = require('fs')
let http = require('http')
let url = require('url')
let os = require('os')  // 获取ip
let mime = require('mime')
let chalk = require('chalk')    // 修改打印颜色
let {renderFileStr} = require('./render')

let interfaces = os.networkInterfaces()
let address = Object.values(interfaces).flat().find(item => item.family === 'IPv4').address
let template = readFileSync(path.resolve(__dirname, 'templateDirs.html'), 'utf8')

class LangHttpServer {
    constructor(opts) {
        this.port = opts.port
        this.directory = opts.directory
        this.address = address
        this.template = template
    }
    handleRequest = async (req, res) => {
        let {pathname} = url.parse(req.url, true)
        pathname = decodeURIComponent(pathname)
        let filePath = path.join(this.directory, pathname)
        try {
            let statObj = await fs.stat(filePath)
            if (statObj.isDirectory()) {
                // 1.使用模板引擎输出html (该html就是列出文件列表)
                let dirs = await fs.readdir(filePath)
                dirs = dirs.map(dir => ({
                    url: path.join(pathname,dir),
                    dir
                }))
                let content = await renderFileStr(this.template, {
                    dirs,
                    pathname: pathname
                })
                res.setHeader('Content-Type', `text/html;charset=utf8`)
                res.end(content)
            }else {
                this.sendFile(req, res, statObj, filePath)
            }
        }catch (e) {
            this.sendError(e, res)
        }
    }
    sendFile(req, res, statObj, filePath) {
        res.setHeader('Content-Type', `${mime.getType(filePath)};charset=utf8`)
        createReadStream(filePath).pipe(res)
    }
    sendError(e, res) {
        console.error(`ERROR: ${e}`)
        res.statusCode = 404
        res.end('404 Not Found File !')
    }
    start() {
        let server = http.createServer(this.handleRequest)
        server.listen(this.port, () => {
            console.log(
`${chalk.yellow('Starting up http-server, serving ./')}
${chalk.yellow('Available on:')}
  http://${this.address}:${this.port}
  http://127.0.0.1:${this.port}
${chalk.yellow('Hit CTRL-C to stop the server')}`
            )
        })
    }
}

module.exports = LangHttpServer