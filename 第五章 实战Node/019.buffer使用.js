/**
 * Buffer: node中用16进制表示, 内存中是二进制
 *
 * Buffer代表的是内存, 声明好后不能改变大小,
 *                      如果需要改小, 可以通过截取到一个新内存
 *                      如果需要改大, 可以通过拷贝到一个更大的新内存
 *
 *  ○ Buffer: 在node是16进制, 【ArrayBuffer读缓冲区数组,可理解为二进制】
 *          - alloc             生成Buff 【参数(字节数量, 内容string|Buffer, 是否解析)】
 *          - from              生成buffer,根据 二进制数组/字符串 【参数(string|Array)】 【可用于魔改代码提速】
 *          - concat            合并两个buffer
 *          - 实例.toString()    转字符串
 *          - 实例.slice         截取
 *          - 实例.copy          复制到另一个buffer
 */
let buf1 = Buffer.alloc(12) // 3字节, 填充值string | Buffer, 需要解码?
console.log(buf1)               // <Buffer 00 00 00>
let buf2 = Buffer.from([0xff, 0xf0, 100])
let buf3 = Buffer.from('学浪')
console.log(buf2)               // <Buffer ff f0 64>
console.log(buf3)               // <Buffer e6 b5 aa>

console.log(buf3.toString('utf8'))              // Buffer转字符串
console.log(buf3.slice(0, 3).toString("utf-8")) // 截取第一个字
buf3.copy(buf1, 0, 0, 6)  // buf3拷贝一部分到buf1
console.log(Buffer.concat([buf2, buf3]))            // 合并两个buffer


let fs = require('fs')
let path = require('path')
let r = fs.readFileSync(path.resolve(__dirname, './test.md'))
console.log(r)  // 默认返回Buffer