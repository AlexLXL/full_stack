---
title: node+redis基础使用
date: 2022-01-14 17:31:20
categories:
- [window, node, redis]
tags:
- window
- node
- redis
---

# redis介绍

## 一、为什么选择redis内存数据库

`操作系统` 会限制系统 `进程` 的最大内存, `node进程`在`x32系统为0.7G`, 在
`x64为1.4G`内存。而node项目上线后会跑多个`nodejs进程`, 如下图。这和pm2的负载均衡有关。

![项目上线,多个nodejs进程](https://lixuelang.com/test/koa2+mysql/023.jpg)

此时就会出现问题:
- 进程内的session对象随着高并发越来越大, 内存就可能爆了
- 进程间的session不共享, 这次登录用进程A, 下次进来用了进程B, 因为进程B没session，
  服务器就告诉你还没登录

为了解决上面问题:

- 使用redis内存数据库存储session的方案

![使用redis原因1](https://lixuelang.com/test/koa2+mysql/024.jpg)

![使用redis原因2](https://lixuelang.com/test/koa2+mysql/025.jpg)

![使用redis原因3](https://lixuelang.com/test/koa2+mysql/026.jpg)

![使用redis原因4](https://lixuelang.com/test/koa2+mysql/027.jpg)

![使用redis原因5](https://lixuelang.com/test/koa2+mysql/028.jpg)

## 二、安装redis

`window`: https://www.runoob.com/redis/redis-install.html

`Mac` 使用 `brew install redis`

redis基础使用:

```
// 启动redis (在redis文件夹下)
redis-server.exe redis.windows.conf

// 连接redis服务器 (在redis文件夹下)
redis-cli.exe -h 127.0.0.1 -p 6379
set myname alexlang
get myname
del myname
keys *
```

## 三、nodejs连接redis

### 1.nodejs连接redis的demo, 不考虑使用

```
// 1.新建文件夹
npm init -y
npm i redis
```

/index.js

```
const {createClient} = require('redis');

(async () => {
    // 创建客户端
    const client = createClient(6379, '127.0.0.1');
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();

    // 设置值
    await client.set('myname2', 'boom');
    const value = await client.get('myname2');
    client.disconnect()
})();
```

### 2.封装成工具函数

src/conf/db.js

```
REDIS_CONFS = {
    dev: {host: '127.0.0.1', port: 6379},
    prd: {host: '127.0.0.1', port: 6379},
}

module.exports = {
    REDIS_CONF: REDIS_CONFS[process.env.NODE_ENV]
}
```

src/db/redis.js

```
const {createClient} = require('redis');
const {REDIS_CONF} = require('../conf/db')

// 创建客户端
const client = createClient(REDIS_CONF.port, REDIS_CONF.host);
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect().then(() => {
    console.log('连接redis成功')
}).catch((err) => {
    console.log('连接redis失败:', err)
})

async function get(key) {
    const value = await client.get(key)
    try {
        return JOSN.parse(value)
    } catch() {
        return value
    }
}

async function set(key, val) {
    if(typeof val === 'object') val = JSON.stringify(val)
    await client.set(key, val)
}

module.exports = {
    get,
    set
}
```
