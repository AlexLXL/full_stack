/**
 * global
 *  ○ Buffer
 *  ○ process: 进程
 *          - platform  识别系统window/mac
 *          - cwd       当前工作目录
 *          - env       电脑环境变量【window命令设置: set xxx=xxx 、 mac设置: export xxx=xxx】【插件cross-env抹平差异】
 *          - argv      命令行参数【插件commander配置参数, 如: vue --help, vue --version】
 *          - nextTick  微任务,不属于事件环(node中有自己的事件环  ),本轮任务执行完后执行
 *          -
 *  ○ __dirname: 文件所在目录路径
 *  ○ __filename: 文件路径
 *  ○ exports
 *  ○ module
 *  ○ require
 */
// console.log(process.platform)   // win32
// console.log(process.cwd())      // D:\full_stack\第五章 实战Node
// console.log(process.env)        // 打印环境变量
// console.log(process.argv.slice(2))  // 拿到命令行传参(>node 012.常用api.js -p 3000, 拿到[ '-p', '3000' ])

/**
 * ○ fs: 文件读写
 *      - readFileSync: 同步读文件
 *      - existsSync: 文件是否存在
 * ○ path
 *      - join: 拼接路径(返回相对路径)
 *      - resolve: 拼接路径(返回绝对路径)(参数如果有/，会解析成根目录)
 *      - basename: 获取前缀
 *      - extname: 获取后缀
 *      - relative: 相对路径, b相对a
 *      - dirname: 获取文件路径
 * ○ vm
 *      - runInThisContext: 字符串转代码
 * ○ util
 *      - inherits: 实现原型链继承
 */
let fs = require('fs')
console.log(fs.existsSync('./test.md')) // true
console.log(fs.readFileSync('./test.md', 'utf8'))   // 读取文件

let path = require('path')
console.log(path.join('a', 'b'))                    // a\b
console.log(path.resolve('a', 'b'))    // D:\full_stack\第五章 实战Node\a\b
console.log(path.basename('./abc.js', '.js'))   // abc
console.log(path.extname('./abc.js'))               // .js
console.log(path.relative('./a/b/c', './c'))    // ..\..\..\c
console.log(path.dirname(__filename))           // D:\full_stack\第五章 实战Node



/**
 * node事件轮询
 * 定时器：本阶段执行已经被 setTimeout() 和 setInterval() 的调 度回调函数。
 * 待定回调：执行延迟到下一个循环迭代的 I/O 回调。
 * idle, prepare：仅系统内部使用。
 * 轮询：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，
 *      那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
 * 检测：setImmediate() 回调函数在这里执行。
 * 关闭的回调函数：一些关闭的回调函数，如：socket.on('close', ...)。
 *
    ┌───────────────────────────┐
 ┌─>│           timers          │
 │  └─────────────┬─────────────┘
 │  ┌─────────────┴─────────────┐
 │  │     pending callbacks     │
 │  └─────────────┬─────────────┘
 │  ┌─────────────┴─────────────┐
 │  │       idle, prepare       │
 │  └─────────────┬─────────────┘      ┌───────────────┐
 │  ┌─────────────┴─────────────┐      │   incoming:   │
 │  │           poll            │<─────┤  connections, │
 │  └─────────────┬─────────────┘      │   data, etc.  │
 │  ┌─────────────┴─────────────┐      └───────────────┘
 │  │           check           │
 │  └─────────────┬─────────────┘
 │  ┌─────────────┴─────────────┐
 └──┤      close callbacks      │
    └───────────────────────────┘
 */




