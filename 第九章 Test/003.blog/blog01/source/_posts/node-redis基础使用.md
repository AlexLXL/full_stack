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

同时redis也可以作为缓存数据库使用

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
/**
 * @description 存储配置
 * @author 学浪
 */
const {NODE_ENV, ENVS} = require('../utils/env')

let REDIS_CONF = {
    [ENVS.DEV]: {
        host: '127.0.0.1',
        port: 6379
    },
    [ENVS.PRD]: {
        host: '127.0.0.1',
        port: 6379
    },
    [ENVS.TEST]: {
        host: '127.0.0.1',
        port: 6379
    },
}

module.exports = {
    REDIS_CONF: REDIS_CONF[NODE_ENV]
}
```

src/cache/_redis.js

```
/**
 * @description 连接 redis 的方法 get set
 * @author 学浪
 */

const {createClient} = require('redis')
const {REDIS_CONF} = require('../conf/db')

// 创建客户端
const client = createClient(REDIS_CONF.port, REDIS_CONF.host)
client.on('error', (err) => console.log('Redis Client Error', err))
client.connect().then(() => {
    console.log('连接redis成功')
}).catch((err) => {
    console.log('连接redis失败:', err)
})

/**
 * @description 获取
 * @param key 键
 */
async function get(key) {
    const value = await client.get(key)
    try {
        return JSON.parse(value)
    } catch(err) {
        return value
    }
}

/**
 * 设置
 * @param key 键
 * @param val 值
 * @param timeout 过期时间, 单位 s
 */
async function set(key, val, timeout = 60 * 60) {
    if(typeof val === 'object') val = JSON.stringify(val)
    await client.set(key, val)
    await client.expire(key, timeout)
}

module.exports = {
    get,
    set
}

```

src/utils/env.js

```
/**
 * @description 环境变量
 * @author 学浪
 */

const NODE_ENV = process.env.NODE_ENV
const ENVS = {
    'DEV': 'dev',
    'PRD': 'prd',
    'TEST': 'test',
}

module.exports = {
    NODE_ENV,
    ENVS,
    isDev: NODE_ENV === ENVS.DEV,
    notDev: NODE_ENV !== ENVS.DEV,
    isPrd: NODE_ENV === ENVS.PRD,
    notPrd: NODE_ENV !== ENVS.PRD,
    isTest: NODE_ENV === ENVS.TEST,
    notTest: NODE_ENV !== ENVS.TEST,
}
```

### 3 koa2项目使用redis2

cookie: 存储session的key
session: 存储用户信息

#### 3.1 koa2使用session,并存到redis

```
npm i koa-redis koa-generic-session -S
```

src/app.js

```
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const {REDIS_CONF} = require('./conf/db')

// session配置
app.keys = ['UIsda_8967#$']
app.use(session({
    key: 'weibo.sid', //cookie的name
    prefix: 'weibo:sess:', //redis key的前缀, 默认`koa:sess:`
    cookie: {
        path: '/',
        httpOnly: true, //只能服务端修改cookie
        maxAge: 24 * 60 * 60 * 1000, //ms
    },
    // ttl: 24 * 60 * 60 * 1000,
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))
```

src/routes/users.js (需要使用一下session, 中间件才会生效)

```
router.get('/session', function (ctx, next) {
    let session = ctx.session
    if(session.viewCount == null) {
        session.viewCount = 0
    }else {
        session.viewCount++
    }
    ctx.body = {
        title: '测试redis session',
        viewCount: session.viewCount
    }
})
```

浏览器访问: http://localhost:3000/users/session,  
服务端操作session(中间件的,已经指向redis),   
中间件返回session的key给前端的cookie  
