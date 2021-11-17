let path = require('path')
let fs = require('fs').promises
let {createReadStream, readFileSync} = require('fs')
let http = require('http')
let url = require('url')
let os = require('os')  // 获取ip
let zlib = require('zlib')
let mime = require('mime')
let chalk = require('chalk')    // 修改打印颜色
let crypto = require('crypto')
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
        if (this.allowCache(req, res, statObj, filePath)) {
            res.statusCode = 304
            return res.end()
        }
        console.log(filePath)
        // 压缩
        let zip = this.allowGzip(req, res)
        if (zip) {
            createReadStream(filePath).pipe(zip).pipe(res)
        }else {
            createReadStream(filePath).pipe(res)
        }
    }
    // 配置服务器压缩
    allowGzip(req, res) {
        let encoding = req.headers['accept-encoding']
        let zip
        if (encoding) {
            let ways = encoding.split(',')
            for (let i = 0; i < ways.length; i++) {
                let lib = ways[i]
                switch (lib) {
                    case 'gzip':
                        res.setHeader('content-encoding', 'gzip')
                        zip = zlib.createGzip()
                        break;
                    case 'deflate':
                        res.setHeader('content-encoding', 'deflate')
                        zip = zlib.createDeflate()
                        break;
                }
            }
        }
        return zip
        // 发现了一个坑, 改成return false, 响应头加了content-encoding, 但实际传输的内容没压缩, 浏览器会白屏!
    }
    allowCache(req, res, statObj, filePath) {
        res.setHeader('Cache-Control', 'no-cache')
        // no-cache--浏览器缓存中还是会有值
        // no-store--浏览器缓存中没有值
        /**
         * 方式一: 利用强制缓存和过期时间惊醒缓存
         * 方式一缺点: 被写死了, 文件修改了也读缓存, 不够精准
         * */
        // // 强制缓存2s  [强制缓存不会缓存当前刷新的文件]
        // res.setHeader('Cache-Control', 'max-age=2')
        // // 设置资源过期时间  [和强制缓存同时出现, 以强制缓存时间为准]
        // res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toGMTString())

        /**
         * 方式二: 利用修改时间缓存
         * 方式二缺点: 改动了文件, 但实际内容没变时, 不走缓存
         * */
        // let ctime = statObj.ctime.toGMTString()
        // res.setHeader('last-modified', ctime)
        // let ifModifiedSince = req.headers['if-modified-since']
        // if (ifModifiedSince === ctime) {
        //     return true
        // }

        /**
         * 方式三: 根据内容生成Etag
         * 可以使用摘要[长度 + 时间戳]生成etag, 但不同人定的规则不同。MD5就是一种etag
         * */
        let ifNoneMatch = req.headers['if-none-match']
        let fileStr = readFileSync(filePath, 'utf8') // 实际项目不会读整个文件, 这里只是为了方便
        let etag = crypto.createHash('md5').update(fileStr).digest('base64');
        res.setHeader('Etag', etag)
        if (ifNoneMatch === etag) {
            return true
        }
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