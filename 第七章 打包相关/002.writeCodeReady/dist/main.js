// 定义一个变量modules, key为模块相对根目录路径, value为函数
var modules = ({
    "./src/title.js":
        ((module, module.exports, require) => {
            module.exports = 'title'
        })
});

// 定义一个缓存
var cache = {};

// 定义一个require函数
function require(moduleId) {
    // 以前require过久读缓存
    var cachedModule = cache[moduleId];
    if (cachedModule !== undefined) {
        return cachedModule.exports;
    }

    // 没缓存过久走这里
    var module = cache[moduleId] = {
        exports: {}
    };
    modules[moduleId](module, module.exports, require);
    return module.exports;
}

// 定义一个exports变量
var exports = {};

// 立即执行函数
(() => {
    let title = require("./src/title.js")
    console.log(title)
})();
