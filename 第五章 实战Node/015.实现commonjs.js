/**
 * 模块化
 * es6: "静态"导入, 如果不编译通过http请求方式获取文件, 在编译的时候可以知道使用了那些变量所以支持tree-shaking
 * commonjs: "动态"导入, 如果不编译通过读取文件方式获取文件, 不支持tree-shaking
 *      -规范
 *      - 1.require(‘文件名’),文件名后缀可以省略,默认找.js、.json
 *      - 2.暴露模块通过更改module.exports这个变量
 *      - 3.node中.js、.json都是一个模块; 而包就是含package.json文件的目录,包中含有多个模块
 *
 *      -原理
 *      - 1.实现一个require方法
 *      - 2.Module.load 实现模块的加载
 *      - 3.实现缓存
 *      - 5.判断是否原生模块(通过相对路径、绝对路径判断)
 *      - 6.创建一个模块实例, 包含属性id、path、exports
 *      - 7.模块的加载
 *      - 8.构建paths属性, 不断向根目录查找node_modules
 *      - 9.取文件后缀,Module.extensions调用对应策略
 *      - 10.读取文件
 *      - 11.包裹函数
 *      - 12.require拿到module.exports的结果
 */

let path = require('path')
let fs = require('fs')
let vm = require('vm')

function Module(id) {
    this.id = id
    this.exports = {}
}
Module._resolveFilename = function (filename) {
    let filePath = path.resolve(__dirname, filename)
    let keys = Reflect.ownKeys(Module._extensions)
    for (let i = 0; i < keys.length; i++) {
        let joinFilePath = filePath + keys[i]
        if (fs.existsSync(joinFilePath)) return joinFilePath
    }
    throw new Error("没有找到该文件")
}
Module._extensions = {
    '.js'(module) {
        let fileString = fs.readFileSync(module.id, 'utf8')
        let template = `(function(exports, module, require, __filename, __dirname){${fileString}})`
        let compiledFunctions = vm.runInThisContext(template)
        let exports = module.exports
        let thisValue = exports
        compiledFunctions.call(thisValue, exports, module, myRequire, module.id, path.dirname(module.id))
    },
    '.json'(module) {
        let fileJSON = fs.readFileSync(module.id, 'utf8')
        module.exports = JSON.parse(fileJSON)
    }
}
Module._cache = {}
Module.prototype._load = function () {
    let extension = path.extname(this.id)
    Module._extensions[extension] && Module._extensions[extension](this)
}
function myRequire(filename) {
    // a) 拿真实名字
    let filePath = Module._resolveFilename(filename)
    // b) 创建实例并缓存
    let module = Module._cache[filePath]
    if (module) {
        return module.exports
    }
    module = new Module(filePath)
    Module._cache[filePath] = module
    // c) 加载(读取文件、转函数、执行函数就会给module.exports赋值)
    module._load()
    return module.exports
}

let test = myRequire("./013.test")
console.log(test)   // { a: 1 }
