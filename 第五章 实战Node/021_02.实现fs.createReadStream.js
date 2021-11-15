/**
 * 文件可读流的实现
 */
let EventEmitter = require('events')
let path = require('path')
let fs = require('fs')

class ReadStream extends EventEmitter {
    constructor(path, options = {}) {
        super();
        this.path = path
        this.flags = options.flags || 'r'
        this.encoding = options.encoding || null
        this.autoClose = options.autoClose || true
        this.emitClose = options.emitClose || true
        this.start = options.start || 0
        this.end = options.end || undefined
        this.highWaterMark = options.highWaterMark || 64 * 1024
        this.position = options.position || 0
        this.flowing = true    // 用于暂停
        this.open()
        
        this.on('newListener', type => {
            if (type === 'data') this.read()
        })
    }
    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) return this.destroy(err)
            this.fd = fd
            this.emit('open', fd)
        })
    }
    destroy(err) {
        if (err) this.emit('err', error)
        if (this.autoClose) {
            fs.close(this.fd, () => {
                if (this.emitClose) this.emit('close')
            })
        }
    }
    resume() {
        if (!this.flowing) {
            this.flowing = true
            this.read()
        }
    }
    pause() {
        this.flowing = false
    }
    read() {
        if (typeof this.fd !== 'number') {
            return this.once('open', () => {
                this.read()
            })
        }
        let buf = Buffer.alloc(this.highWaterMark)
        let nextPosition = this.end ? Math.min(this.highWaterMark, this.end - this, position + 1) : this.position
        fs.read(this.fd, buf, 0, this.highWaterMark, nextPosition, (err, bytesRead, buffer) => {
            if (bytesRead) {
                this.position += bytesRead
                this.emit('data', buf)
                if(this.flowing) {
                    this.read()
                }
            }else {
                this.emit('end')
                this.destroy()
            }
        })
    }
    // 读一些写一点
    pipe(ws) {
        let rs = this
        rs.on('data', (chunk) => {
            let flag = ws.write(chunk)
            if (!flag) {
                rs.pause()
            }
        })
        ws.on('drain', () => {
            rs.resume()
        })
    }
}

module.exports = ReadStream