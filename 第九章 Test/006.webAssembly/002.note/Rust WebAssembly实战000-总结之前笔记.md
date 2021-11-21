### 一、备用链接

> 应用场景: 读取音视频、图像、大文件、加解密、视频编辑、游戏、CAD建模、三维地图(Google Earth)、3D渲染、AR/VR直播应用、多人实时协作工具、人像分割技术在RTC领域的应用、图像识别、平台仿真、虚拟专用网
  
> 下载wasm-pack: https://rustwasm.github.io/wasm-pack/installer/  
> 应用: https://imweb.io/topic/5c06b8b0611a25cc7bf1d7d5  
> 报错: https://www.manongdao.com/article-2268301.html  
> 加载: https://segmentfault.com/a/1190000008402872  
> 加载2: https://juejin.cn/post/6844903661982728200  
> js编译webassembly: Walt  
  
> Rust和WebAssembly: https://rustwasm.github.io/docs/book/  
> wasm-bindgen指南: https://rustwasm.github.io/docs/wasm-bindgen/examples/index.html

### 二、初探Rust WebAssembly使用(网上教程)

#### 1.安装 WASM 工具链

1.1) 安装 `cargo install wasm-pack` , linux通过命令安装, window使用 [wasm-pack-init.exe](https://rustwasm.github.io/wasm-pack/installer/) 安装

2.2) 安装 `cargo install cargo-generate` , 用于快速生成脚手架

#### 2.创建脚手架

```shell
cargo generate --git https://github.com/rustwasm/wasm-pack-template
```

#### 3.添加内容

lib.rs

```rust
use wasm_bindgen::prelude::*;  

#[wasm_bindgen]
pub fn fib(i: u32) -> u32 {
    match i {
        0 => 0,
        1 => 1,
        _ => fib(i-1) + fib(i-2)
    }
}
```

Cargo.toml

```
[dev-dependencies]
wasm-bindgen-test = "0.3.13"
cfg-if = "0.1"
wasm-bindgen = "0.2.74"
```

#### 4.编译WASM模块

```shell
wasm-pack build
```

#### 5.JS运行WASM

5.1) 拷贝*.wasm文件

5.2) 项目引入*.wasm文件, 执行wasm内部方法

- 引入方式一: 

```javascript
function loadWebAssembly (path, imports = {}) {
    return fetch(path)
        .then(response => response.arrayBuffer())
        .then(buffer => WebAssembly.compile(buffer))
        .then(module => {
            imports.env = imports.env || {}

            // 开辟内存空间
            imports.env.memoryBase = imports.env.memoryBase || 0
            if (!imports.env.memory) {
                imports.env.memory = new WebAssembly.Memory({ initial: 256 })
            }

            // 创建变量映射表
            imports.env.tableBase = imports.env.tableBase || 0
            if (!imports.env.table) {
                // 在 MVP 版本中 element 只能是 "anyfunc"
                imports.env.table = new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
            }

            // 创建 WebAssembly 实例
            return new WebAssembly.Instance(module, imports)
        })
}
```

---

```javascript

loadWebAssembly('./utils/wams_demo_bg.wasm')
    .then(instance => {
        console.time('wasm');
        console.log(instance.exports.fib(45));
        console.timeEnd('wasm');    // 10088.003173828125 ms
    })

function fib(i) {
    if (i === 0)  return 0;
    if (i === 1)  return 1;
    return fib(i - 1) + fib(i - 2);
}

console.time('js');
console.log(fib(45));
console.timeEnd('js'); // 21470.55810546875 ms
```


- 引入方式二: 

```javascript
function loadWebAssembly_02(path) {
    return fetch(path)
        .then(res => res.arrayBuffer())
        .then(buffer => WebAssembly.compile(buffer))
        .then ( module => {
            var imports = {env: {}};
            Object.assign(imports.env, {
                memoryBase:0,
                tableBase:0,
                memory:new WebAssembly.Memory({ initial: 256, maximum: 256}),
                table: new WebAssembly.Table({ initial: 0, maximum:0, element:'anyfunc' })
            })
            return new WebAssembly.Instance(module, imports);
        })
}
```


### 三、问题
1.前端不需要插件来解析wasm

2.不使用相对路径时，加一下webpack配置

```
rules: [
    {
        test: /\.wasm$/,
        use: "url-loader"
    },
]
```

3.fetch不允许请求本地文件（file://），不能直接跑html，需要用服务器启动(cmd -> http-server)

4.报错

```
Uncaught (in promise) TypeError: Incorrect response MIME type. Expected 'application/wasm'.
    at <anonymous>
 
解决方式: 
由于MIME-TYPE不对，期望.wasm 文件的响应头的Content-Type字段值为"application/wasm"，而不是"application/octet-stream; charset=UTF-8"。服务端必须对.wasm文件做正确的MIME类型的配置，发送Content-Type: application/wasm 头。

链接: https://blog.csdn.net/weixin_30527143/article/details/96297791
```

5.打包问题

通过上面整合到项目的wasm, 直接打包就好(配置一下静态文件夹的打包)

如果不想多一个wasm文件, 可以直接将wasm转二进制/base64写死在代码里