/**
 * 文件流:
 * 一般分为四种: 可读流、可写流、双工流、转换流
 */

let zlib = require('zlib')
let path = require('path')
let fs = require('fs')
let {Transform} = require('stream')

/*class MyTransform extends Transform{
    // 重写继承的方法
    _transform(chunk, encoding, clearBuffer) {
        this.push(chunk.toString().toLocaleLowerCase())
        clearBuffer()
    }
}
let transform = new MyTransform()

process.stdin.pipe(transform).pipe(process.stdout)
// AAA
// aaa*/


/**
 * gzip: 一般用于压缩重复性较高文件, 像data.js都是1,就可以压缩成一个数字来传输
 */
// process.stdin.pipe(zlib.createGzip()).pipe(process.stdout)