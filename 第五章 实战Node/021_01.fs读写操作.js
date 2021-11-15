/**
 * 直接读写会有潜在危险(一个超大文件一次读完可能会内存不足)
 * 因此可使用流
 */
let path = require('path')
let fs = require('fs')
/*let result = fs.readFile(path.resolve(__dirname, 'test.md'), 'utf8', (error, data) => {
    fs.writeFile(path.resolve(__dirname, './test1.md'), data, (err, data) => {
        // console.log(err)
    })
})*/

/**
 * 流的原理: 流的使用都必须先open文件再做读写操作
 * @param path  路径
 * @param flags 权限(r - 读、w - 写、a - 追加、r+ - 读写,没文件报错、w+ - 读写,没文件就创建)
 * @param mode  三个用户组权限累加值(1-执行、2-写入、4-读取)
 * @param cb    回调
 *
 * fs.read参数
 * fd <integer>
 * buffer <Buffer> | <TypedArray> | <DataView> 数据将写入的缓冲区。
 * offset <integer> 要写入数据的 buffer 中的位置。
 * length <integer> 读取的字节数。
 * position <integer> | <bigint> 指定从文件中开始读取的位置。 如果 position 为 null 或 -1 ，则将从当前文件位置读取数据，并更新文件位置。 如果 position 是整数，则文件位置将保持不变。
 * callback <Function>
 *      err <Error>
 *      bytesRead <integer>
 *      buffer <Buffer>
 *
 * 嵌套太深,通过发布订阅拆分并封装成fs.createReadStream
 */
/*let buf = Buffer.alloc(3)
fs.open(path.resolve(__dirname, 'test.md'), 'r', 438, (err, fd) => {
    fs.open(path.resolve(__dirname, 'test1.md'), 'w', (err, wfd) => {
        function close() {
            fs.close(fd, () => {})
            fs.close(wfd, () => {})
        }
        function next(position) {
            fs.read(fd, buf, 0, 3, position, (err, readByte, buffer) => {
                console.log(`readByte: ${readByte}`)
                if (readByte === 0) {
                    return close()
                }
                fs.write(wfd, buf, 0, 3, position, (err, writeByte, buffer) => {
                    console.log(`writeByte: ${writeByte}`)
                    next(position + 3)
                })
            })
        }
        next(0)
    })
})*/


/**
 * 可读流的使用
 */
// let ReadStream = require('./021_02.实现fs.createReadStream')
// let rs = new ReadStream(path.resolve(__dirname, 'test.md'), {

/*let rs = fs.createReadStream(path.resolve(__dirname, 'test.md'), {
    flags: 'r',         // 权限,和上面的是一致的
    encoding: null,     // 默认读取出来的是Buffer
    autoClose: true,    // 读取完自动关闭 [fs.close()]
    emitClose: true,    // 读取完触发close事件 [emit('close')]
    start: 0,
    end: 2,
    highWaterMark: 2    // 每次读取两个字节
})
rs.on("open", (fd) => {
    console.log(`打开文件`)
})
let arr = []
rs.on("data", (data) => {     // 读取过程中的数据
    console.log(`读取文件中: ${data}`)
    arr.push(data)
})
rs.on("end", () => {
    console.log(`读取结束`)
    console.log(Buffer.concat(arr).toString())
})
rs.on("close", () => {
    console.log(`关闭fs`)
})
rs.on("error", () => {
    console.log(`error`)
})*/


/**
 * 可写流的使用
 */
// let WriteStream = require('./021_03.实现fs.createWriteStream')
// let ws = new WriteStream(path.resolve(__dirname, 'test1.md'), {
/*let ws = fs.createWriteStream(path.resolve(__dirname, 'test1.md'), {
    flags: 'w',
    encoding: null,     // 默认读取出来的是Buffer
    autoClose: true,    // 读取完自动关闭 [fs.close()]
    emitClose: true,    // 读取完触发close事件 [emit('close')]
    start: 0,
    highWaterMark: 2,   // 每次写入两个字节(水位线)
    mode: 0o666
})
ws.on("open", (fd) => {
    console.log(`打开文件`)
})
ws.on("drain", () => {
    console.log(`写完一次,缓存区清空完后触发`)
})
let flag = ws.write('1', 'utf8', () => {})  // flag = true, 表示还能就加内容, 写入的内容比highWaterMark短, 缓存区还有空间
console.log(flag)
flag = ws.write('2', 'utf8', () => {})      // flag = false
console.log(flag)

// ws.end()    // 结束, 这行是同步的可能会让drain不触发
setTimeout(() => {
    ws.end("我是谁")
},1000)*/

/**
 * 可读流/可写流通过管道使用
 */
let rs = fs.createReadStream(path.resolve(__dirname, 'test.md'))
let ws = fs.createWriteStream(path.resolve(__dirname, 'test1.md'))
rs.pipe(ws)
