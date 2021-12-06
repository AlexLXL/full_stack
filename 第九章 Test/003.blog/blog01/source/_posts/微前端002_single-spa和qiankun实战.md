---
title: 微前端002_single-spa和qiankun实战
date: 2021-12-06 09:54:59
categories:  
- [window, 前端, 微前端, sing-spa, qiankun]  
tags:  
- window
- 前端
- 微前端
- sing-spa
- qiankun
---

实战代码github：https://github.com/AlexLXL/ZF_002.weiQianDuan

## 一、微前端知识

### 一) 为什么需要微前端
#### 1.什么是微前端？

- 微前端就是将不同的功能按照不同的维度拆分成多个子应用，通过主应用来加载这些子应用
- 微前端的核心在于'拆', 拆完后再'合'
- 微前端不限制框架

#### 2.为什么使用微前端

- 不同团队使用不同技术栈
- 每个团队能独立开发，独立部署
- 项目中需要老的应用代码，但重构需要花费更多时间，同时可能引起其它问题

将一个应用划分为多个子应用，将子应用打包成一个个lib。路径切换的时候加载不同子应用。这样每个子应用都是独立的，技术栈也不需要做限制！从而解决前端协同开发问题

#### 3.微前端涵盖什么
- lifeycycles - bootstrap、mount、unmount、update
- shadow dom
- scoped css
- Proxy sandbox
- html-loader
- global store

#### 4.落地

![1](https://lixuelang.com/test//weiqianduan/1.png)

2018年Single-SPA延生了， `single-spa`  是一个用于前端微服务化的  `javascript`  前端解决方案（本身没有处理样式隔离，js执行隔离，没有js沙箱的机制，需要手动加载js）实现了 `路由劫持和应用加载`

2019年  `qiankun`  基于Single-SPA、提供了更加开箱即用的  API （`single-spa` + `sandbox`  + `import-html-entry`）做到了，技术栈无关、并且接入简单（像  `iframe`  一样简单）

> 总结：子应用可以独立构建，运行时动态加载，子应用完全解耦，技术栈无关，靠的是协议接入（子应用必须导出bootstrap、mount、unmount方法）
> 
> 基座: 主应用
> 协议接入: 子应用需要统一规则，每个子应用(lib)都需要导出特定方法给基座加载

iframe废弃原因: 
> https://www.yuque.com/kuitos/gky7yw/gesexv
> 为什么不用 iframe，这几乎是所有微前端方案第一个会被  `challenge`  的问题。但是大部分微前端方案又不约而同放弃了 iframe 方案，自然是有原因的，并不是为了 "炫技" 或者刻意追求 "特立独行"。
> 
> 如果不考虑体验问题，iframe 几乎是最完美的微前端解决方案了。
> 
> iframe 最大的特性就是提供了浏览器原生的硬隔离方案，不论是样式隔离、js 隔离这类问题统统都能被完美解决。但他的最大问题也在于他的隔离性无法被突破， `导致应用间上下文无法被共享` ，随之带来的开发体验、产品体验的问题。
> 
> 其实这个问题之前这篇也提到过，这里再单独拿出来回顾一下好了。
> 
> 1.url 不同步。浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用。
> 2.UI 不同步，DOM 结构不共享。想象一下屏幕右下角 1/4 的 iframe 里来一个带遮罩层的弹框，同时我们要求这个弹框要浏览器居中显示，还要浏览器 resize 时自动居中..
> 3.全局上下文完全隔离，内存变量不共享。iframe 内外系统的通信、数据同步等需求，主应用的 cookie 要透传到根域名都不同的子应用中实现免登效果。
> 4.慢。每次子应用进入都是一次浏览器上下文重建、资源重新加载的过程。
> 
> 其中有的问题比较好解决(问题1)，有的问题我们可以睁一只眼闭一只眼(问题4)，但有的问题我们则很难解决(问题3)甚至无法解决(问题2)，而这些无法解决的问题恰恰又会给产品带来非常严重的体验问题， 最终导致我们舍弃了 iframe 方案。

应用通信:

- 基于URL传参，但传递消息能力弱（长度受限，明文，受限太多）
- 基于自定义事件 `CustomEvent` 实现通信（window原生API）
- 基于props主子应用通信
- 使用全局变量、vuex进行通信

公共依赖（主应用和子应用共用依赖；父调子模块，子打包父里的）:
- `CDN`  - externals  
- `webpack5`  联邦模块

## 二、single-spa / single-spa-vue / single-spa-react实战

- 创建基应用和子应用
- 基座应用: npm install single-spa
- 子应用: npm install single-spa-vue

#### 子应用

1. 添加挂载配置  
2. 生成接入协议  
3. 暴露接入协议  
4. 修改webpack配置，让当前应用的方法挂载到window  
5. 修改路由基准  
6. 修改webpack配置，添加公共路径  
7. 配置子应用独立运行  

![2](https://lixuelang.com/test//weiqianduan/2.png)

![3](https://lixuelang.com/test//weiqianduan/3.png)

![4](https://lixuelang.com/test//weiqianduan/4.png)

#### 基座应用

1. 注册应用
2. 启动single-spa
![5](https://lixuelang.com/test//weiqianduan/5.png)


以上即singe-spa基础使用

#### 缺点及解决方案

缺点: 样式不隔离、js不隔离、没有js沙箱机制、不能动态加载js文件

解决:

a) `css`  隔离方案

a1. 子应用之间样式隔离:
- `Dynamic Stylesheet`  动态样式表，当应用切换是移出老应用样式，添加新应用样式

a2. 主应用和子应用之间的样式隔离

- `BEM` 约定在项目前缀（约定仅是约定，可能有人不遵守就会出很大问题）
- `css-Modules`  打包时申城不冲突的选择器名（主流）
- `Shadow DOM`  真正意义上的隔离 （qiankun）
- `css-in-js`  不推荐(增删减都不好控制)

![6](https://lixuelang.com/test//weiqianduan/6.png)


b) `js`  隔离方案

- es6的proxy


## 三、qiankun实战

qiankun会把整个子应用html拿过来加载，css和js部分会注释掉，用fetch重新请求

#### 基座应用:

1. html引入element-ui
2. 添加基础页面的导航
3. 注册应用
4. 启动

![7](https://lixuelang.com/test//weiqianduan/7.png)

![8](https://lixuelang.com/test//weiqianduan/8.png)

#### 子应用:
1. 添加挂载配置
2. 生成接入协议
3. 暴露接入协议
4. 修改webpack配置，让当前应用的方法挂载到window
5. 修改路由基准
6. 修改webpack配置，添加公共路径
7. 配置子应用独立运行

![9](https://lixuelang.com/test//weiqianduan/9.png)

![10](https://lixuelang.com/test//weiqianduan/10.png)

#### react子应用

1.安装插件yarn add react-app-rewired
2.修改package.json

![11](https://lixuelang.com/test//weiqianduan/11.png)

3.添加webpack配置(含环境变量)

![12](https://lixuelang.com/test//weiqianduan/12.png)

![13](https://lixuelang.com/test//weiqianduan/13.png)

4.修改index.js

![14](https://lixuelang.com/test//weiqianduan/14.png)

5.添加路由yarn add react-router-dom

App.js
![15](https://lixuelang.com/test//weiqianduan/15.png)

...


名词解释:  
沙箱: 应用在运行从开始到结束，不会影响全局；可以理解为网吧的沙箱系统，开机->卸载安装了N个应用->关机->开机->恢复以前样子









































