---
layout: rust
title: WebAssembly实战001-初体验
date: 2021-11-21 11:43:55
categories:  
- [window, Rust, WebAssembly]  
tags:  
- window
- Rust
- WebAssembly
---

### 一、为何是Rust和WebAssembly？

- 低水平控制与高水平的人体工程学 JavaScript Web应用程序很难获得和保持可靠的性能。Rust为程序员提供了低级别的控制和可靠的性能。

- 较小的.wasm 代码大小非常重要，因为 .wasm必须通过网络下载。Rust没有运行时，因此支持较小的.Wasm。

- 不用全部重写 使用Rust并不是将现有的代码扔掉，我们可以将部分js函数转换成Rust代码。

- 和其它的和善相处 Rust和WebAssembly与现有JavaScript工具集成，支持ECMAScript模块，你可以继续使用之前的工具，如npm、Webpack。

- 便利的基础设施 Rust中拥有开发者所期望的便利的工具，如：Cargo、零成本抽象、开放热情的社区。

### 二、WebAssembly是什么？

WebAssembly（wasm）是一种简单的机器模型和具有广泛规范的可执行格式。它被设计成可移植的、紧凑的，并且以或接近本机速度执行。

WebAssembly有两种表示相同结构的格式：

- wat 文本格式（WebAssembly Text）使用S表达式，和Lisp家族的语言有些类似；

- wasm二进制格式，级别较低，直接供wasm虚拟机使用，它在概念上类似于ELF和Mach-O。

#### 2.1 线性存储器

WebAssembly有一个非常简单的内存模型。wasm模块可以访问单个的线性内存（本质就是数组），此内存可以按照页大小（64K）的倍数增长，但是不能缩小。

#### 2.2 WebAssembly是不是只为Web使用

wasm并没有对其宿主环境做出任何假设，但是到目前为止，主要还是与js相关。

### 三、初体验

#### 1.安装Rust

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### 2.安装wasm-pack

```shell
cargo install wasm-pack
```

linux通过命令安装, window通过 [wasm-pack-init.exe](https://rustwasm.github.io/wasm-pack/installer/) 安装

#### 3.创建工程

```shell
cargo new --lib mywasm
```

#### 4.编写代码

在src/lib.rs中添加如下代码：

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}
```

#### 5.修改Cargo.toml配置文件，添加如下：


```Cargo.toml
[lib]
crate-type = ["cdylib", "rlib"]
# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
wasm-bindgen = "0.2.63"
```

#### 6.编译package

```shell
wasm-pack build --target web
```

#### 7.使用package

在mywasm根目录下创建index.html

>  注意是根目录, 如果在根目录新增文件夹放index.hmml, 使用../pck会无法获取到文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test Rust WebAssembly</title>
</head>
<body>
<script type="module">
    import init, {greet} from "./pkg/mywasm.js";
    init()
        .then(() => {
            greet("WebAssembly")
        });
</script>
</body>
</html>
```

#### 8.运行server

安装http-server, 用于启动服务方式运行index.html

```shell
npm install http-server
```

在根目录执行命令

```
http-server
```

#### 9.测试

在浏览器中输入： http://localhost:端口号

![理解图](https://lixuelang.com/test/Rust/pic/001//1.jpg)

> 原文链接: 公众号"令狐一冲"  
> https://mp.weixin.qq.com/s?src=11&timestamp=1637460087&ver=3449&signature=imXNueDAOPdCNXqIo7Zwe*UtnLWqe5KkNECzSj30EJY6NBEFMY46t7j0SrZld5QREKFYJhU6SUEXk6kG3e0DOeizlmZdjLD*35XQjyHQc7c-*Rm5mChbd-Lkqccfz362&new=1
