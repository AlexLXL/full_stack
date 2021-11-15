/**
 * 文件可写流的实现
 */
let EventEmitter = require('events')
let path = require('path')
let fs = require('fs')

class WriteStream extends EventEmitter {
    constructor(path, options = {}) {
        super();
        this.path = path
        this.flags = options.flags || 'w'
        this.encoding = options.encoding || null
        this.autoClose = options.autoClose || true
        this.emitClose = options.emitClose || true
        this.start = options.start || 0
        this.highWaterMark = options.highWaterMark || 16 * 1024
        this.open()

        this.len = 0 // 字节数
        this.offset = this.start    // 偏移量
        this.cache = []         // 缓存区
        this.needDrain = false  // 触发drain事件
        this.writing = false

        this.on('newListener', type => {
            if (type === 'data') this.read()
        })
    }

    write(chunk, encoding = null, cb = () => {
    }) {
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
        this.len += chunk.length
        this.needDrain = this.len >= this.highWaterMark

        let oldCallback = cb
        cb = () => {
            oldCallback()
            this.clearBuffer()
        }

        if (this.writing) {
            this.cache.push({chunk, encoding, cb})
        } else {
            this.writing = true
            this._write(chunk, encoding, cb)
        }

        return !this.needDrain
    }

    _write(chunk, encoding, cb) {
        if (typeof this.fd !== 'number') {
            return this.on('open', () => this._write(chunk, encoding, cb))
        }

        fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, writeByte) => {
            this.offset += writeByte
            this.len -= writeByte
            cb()
        })
    }

    clearBuffer() {
        let obj = this.cache.shift()
        if (obj) {
            let {chunk, encoding, cb} = obj
            this._write(chunk, encoding, cb)
        } else {
            this.writing = false
            if (this.needDrain) {
                this.needDrain = false
                this.emit('drain')
            }
        }
    }

    end(chunk, encoding, cb) {
        this.write(chunk, encoding, cb)
        this.needDrain = false
        this.destroy()
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
}

module.exports = WriteStream