---
title: node+mysql8.x基础使用
date: 2022-01-14 11:45:04
categories:
- [window, node, mysql]
tags:
- window
- node
- mysql
---

## 介绍mysql

### 1. 下载、安装

mysql下载: https://dev.mysql.com/downloads/mysql/  
workbench可视化下载: https://dev.mysql.com/downloads/workbench/

安裝mysql教程: http://c.biancheng.net/view/7135.html

woekbench连接数据库:

![woekbench连接数据库](https://lixuelang.com/test/koa2+mysql/009.jpg)

![woekbench查询数据库](https://lixuelang.com/test/koa2+mysql/010.jpg)

### 2. 建库

#### 2.1 图形化:

![建库1](https://lixuelang.com/test/koa2+mysql/011.jpg)

![建库2](https://lixuelang.com/test/koa2+mysql/012.jpg)

#### 2.2 命令:

```
CREATE SCHEMA `myblog` ;
```

### 3. 建表

#### 3.1 图形化:

![users表](https://lixuelang.com/test/koa2+mysql/015.jpg)

![blogs表](https://lixuelang.com/test/koa2+mysql/016.jpg)

#### 3.2 命令:

```
CREATE TABLE `myblog`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `realame` VARCHAR(45) NOT NULL,
  `userscol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `myblog`.`blogs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `createtime` BIGINT(20) NOT NULL DEFAULT 0,
  `author` VARCHAR(20) NOT NULL,
  `new_tablecol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
```

#### 3.3 总结:

![users表](https://lixuelang.com/test/koa2+mysql/013.jpg)

![blogs表](https://lixuelang.com/test/koa2+mysql/014.jpg)

类型: `数字用int`, `超大数字用bigint(20)`, `字符串用varchar(20)`, `长文本用longtext`

### 4. 基本的sql语句

#### 4.1 增删改查

```
-- 使用数据库
use myblog;

-- 增
-- insert into users (username, `password`, realname) values ('lisi', '123', '李四');

-- 删(真删/软删)
-- delete from users where username = 'lisi';
-- update users set state = 1 where username = 'lisi'

-- 改
-- SET SQL_SAFE_UPDATES = 0
-- update users set realname='李四2' where username = 'lisi'

-- 查
-- select * from users;
-- select id, username from users;
-- select * from users where username = 'lisi' and `password` = '123';
-- select * from users where password like '%1%'
-- select * from users where password like '%1%' order by id desc; -- order表示排序、desc表示逆序
-- select * from users where state <> '0'; -- <>表示不等于
select count(id) as `count` from blogs -- 统计数量
select * from blogs order by id limit 2 -- 限制返回两条
select * from blogs order by id limit 2 offset 2 -- 第二页（每页两条）
```

注释: sql语句前加`--`

### 5. 外键&连表查询

#### 5.1 创建外键

![blogs表添加外键](https://lixuelang.com/test/koa2+mysql/017.jpg)

![blogs表查看外键](https://lixuelang.com/test/koa2+mysql/018.jpg)

#### 5.2 更新限制 & 删除级联 (添加外键的效果)

```
// 更新限制
insert into blogs (title, content, createtime, userid) values ('标题F', '内容F', 111111111111, 4);

// 报错: Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`koa2_weibo_db`.`blogs`, CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE)
```
```
// 删除级联
delete from users where id = 4;

// 会自动删除级联blogs表相应数据
```

#### 5.3 连表查询

```
select * from blogs inner join users on users.id = blogs.userid;
select blogs.*, users.realname from blogs inner join users on users.id = blogs.userid;

select blogs.*, users.realname 
from blogs inner join users on users.id = blogs.userid
where users.realname = '小明';
```

![连表查询](https://lixuelang.com/test/koa2+mysql/019.jpg)

### 6. nodejs操作mysql

#### 6.1 示例: 用demo演示, 不考虑使用

新建文件夹
```
npm init -y
npm i mysql2
```

新建index.js
```
const mysql = require('mysql2')

const con = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'myblog'
})

con.connect()

const sql = 'select * from users'
// const sql = `update users set realname = '李四2' where username = 'lisi'`
// const sql = `insert into users (username, \`password\`, realname) values ('xiaoming', '123', '小明');`

con.query(sql, (err, result) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(result)
})

con.end()
```

运行即可操作数据库。

#### 6.2 将示例封装

src/conf/db.js

```
let MYSQL_CONFS = {
    dev: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'myblog'
    },
    prd: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'myblog'
    },
}

module.exports = {
    MYSQL_CONF: MYSQL_CONFS[process.env.NODE_ENV]
}
```

src/db/mysql.js

```
const mysql = require('mysql')
const {MYSQL_CONF} = require(../conf/db.js)

const mysql = require('mysql2')

const con = mysql.createConnection(MYSQL_CONF)
con.connect()

function exec(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                resolve(err)
                return
            }
            reject(result)
        })
    })
    
}

module.exports = { exec }
```

### 7. sequelize的使用 (ORM)

常用的ORM(Object Relational Mapping):
- sequelize（稳定，几乎能解决所有场景）
- typeorm（较新, 但也受欢迎）
- knex

---
sequelize通过操作对象的方式操作数据库, 可以减少成本, 减少sql的安全问题。

![ORM知识点](https://lixuelang.com/test/koa2+mysql/020.jpg)

#### 7.1 sequelize安装

```
// 1.新建文件夹
npm init -y
npm i mysql2
npm i sequelize
```

#### 7.2 建模（外键） & 同步到数据库

1.创建实例 (/seq.js)

```
const Sequelize = require('sequelize')

let conf = {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    timezone: '+08:00',
    // 线下用简单连接. 线上用连接池
    // pool: {
    //     max: 5,
    //     min: 0,
    //     idle: 10000 // 如果一个连接池 10s 之内没有被使用， 则释放
    // },
}

const seq = new Sequelize('koa2_weibo_db', 'root', 'root', conf)

// // 测试连接
// seq.authenticate().then(() => {
//     console.log('auth ok')
// }).catch(() => {
//     console.log('auth error')
// })

module.exports = seq
```

2.建模(其实就是建表和建外键) (/model.js)

```
const Sequelize = require('sequelize')
const seq = require('./seq')

/**
 * 创建User模型 (建表)
 * 数据表的名字会自动改为users
 */
const User = seq.define('user', {
    // 自动创建: id, 并设为主键、自增
    // 自动创建: createAt 和 updateAt
    userName: {
        type: Sequelize.STRING, // varchar(255)
        allowNull: false
    },
    password: {
        type: Sequelize.STRING, // varchar(255)
        allowNull: false
    },
    nickName: {
        type: Sequelize.STRING, // varchar(255),
        comment: '昵称'
    }
})

/**
 * 创建Blog模型 (建表)
 * 数据表的名字会自动改为blogs
 */
const Blog = seq.define('blog', {
    // 自动创建: id, 并设为主键、自增
    // 自动创建: createAt 和 updateAt
    title: {
        type: Sequelize.STRING, // varchar(255)
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT, // varchar(255)
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER, // varchar(255),
        allowNull: false
    }
})

/**
 * 创建外键 Blog.userId -> User.id
 * 默认关联的就是id
 * 如果查Blog,会自动去查User
 * 如果查User,会自动去查Blog
 */
Blog.belongsTo(User, {
    foreignKey: 'userId'
})
User.hasMany(Blog, {
    foreignKey: 'userId'
})

module.exports = {
    User,
    Blog
}
```

3.同步`建模`到数据库 (/sync.js)

```
const seq = require('./seq')
require('./model')

// 创建连接
seq.authenticate().then(() => {
    console.log('auth ok')
}).catch(() => {
    console.log('auth error')
})

seq.sync({ force: true }).then(() => {
    console.log('sync ok')
    process.exit()
}).catch((err) => {
    console.log(err)
    process.exit()
})
```

执行 `node sync.js` 就可以在数据库看到表

#### 7.3 增删改查 & 连表查询

##### 1.增 (/create.js)

```
const {Blog, User} = require('./model');

(async function () {
    /**
     * 新增用户
     * insert into users (...) values (...)
     */
    const zhangsan = await User.create({
        userName: 'zhangsan',
        password: '123',
        nickName: '张三'
    })
    let zhangsanId = zhangsan.dataValues.id

    const lisi = await User.create({
        userName: 'lisi',
        password: '123',
        nickName: '李四'
    })
    let lisiId = lisi.dataValues.id

    /**
     * 新增博客
     * insert into users (...) values (...)
     */
    const blog1 = await Blog.create({
        title: '标题1',
        content: '内容1',
        userId: zhangsanId
    })
    const blog2 = await Blog.create({
        title: '标题2',
        content: '内容2',
        userId: zhangsanId
    })
    const blog3 = await Blog.create({
        title: '标题3',
        content: '内容3',
        userId: lisiId
    })
    const blog4 = await Blog.create({
        title: '标题4',
        content: '内容4',
        userId: lisiId
    })
})()
```

##### 2.删 (/delete.js)

```
const {Blog, User} = require('./model');

(async function () {
    /**
     * 删除博客
     * DELETE FROM `blogs` WHERE `id` = 4
     */
    /*const delBlogRes = await Blog.destroy({
        where: {
            id: 4
        }
    })
    console.log('delBlogRes:', delBlogRes[0] > 0 ? '删除成功': '删除失败')*/

    /**
     * 删除用户
     * DELETE FROM `blogs` WHERE `id` = 4
     * 报错的时候用try catch包裹一下, 看具体报错原因。可能是外键使用了严格模式(RESTRICT),改成连级(CASCADE)就好
     */
    try {
        const delUserRes = await User.destroy({
            where: {
                id: 1
            }
        })
        console.log('delUserRes', delUserRes)
    }catch (err) {
        console.log(err)
    }
})()
```

##### 3.改 (/update.js)

```
const {Blog, User} = require('./model');

(async function () {
    /**
     * 修改用户
     * UPDATE `users` SET `nickName` = '张三3' WHERE `userName` = 'zhangsan'
     */
    const zhangsanUpdate = await User.update({
        nickName: '张三3'
    }, {
        where: {
            userName: 'zhangsan'
        }
    })
    console.log('zhangsanUpdate:', zhangsanUpdate[0] > 0 ? '修改成功': '修改失败')
})()
```

##### 4.查 (/select.js)

```
const {Blog, User} = require('./model');

(async function () {
    /**
     * 查询用户
     * select * from users where id = 1;
     */

    /**
     * 查询一条
     * select * from user where userName = 'zhangsan' limit 1;
     */
    /*const zhangsan = await User.findOne({
        where: {
            userName: 'zhangsan'
        }
    })*/

    /**
     * 查询所有
     * select * from blogs where userId = 1 order by id desc;
     */
    /*const zhangsanBlogList = await Blog.findAll({
        where: {
            userId: 1
        },
        order: [
            ['id', 'desc']
        ]
    })
    console.log('zhangsanBlogList', zhangsanBlogList.map(blog => blog.dataValues))*/

    /**
     * 查询特定列
     * select userName, nickName from user where userName = 'zhangsan' limit 1;
     */
    /*const zhangsanName = await User.findOne({
        attributes: ['userName', 'nickName'],
        where: {
            userName: 'zhangsan'
        }
    })
    console.log('zhangsanName', zhangsanName.dataValues)*/

    /**
     * 分页
     * select * from blogs order by id limit 2 offset 2
     * 第二页两条
     */
    /*const blogPageList = await Blog.findAll({
        limit: 2,
        offset: 2,
        order: [
            ['id', 'desc']
        ]
    })
    console.log('blogPageList', blogPageList.map(blog => blog.dataValues))*/

    /**
     * 查询总数
     * SELECT * FROM `blogs` ORDER BY `id` DESC LIMIT 2 OFFSET 2;
     */
    /*const blogListAndCount = await Blog.findAndCountAll({
        limit: 2,
        offset: 2,
        order: [
            ['id', 'desc']
        ]
    })
    console.log('blogListAndCount', blogListAndCount.count) // 总数, 不考虑分页
    console.log('blogListAndCount', blogListAndCount.rows.map(blog => blog.dataValues)) // 当前页的数据*/

    /**
     * 连表查询1
     * SELECT blogs.*, users.userName, users.userName
     * FROM blogs INNER JOIN users ON `blog`.`userId` = `user`.`id` AND `user`.`userName` = 'zhangsan'
     * ORDER BY `blog`.`id` DESC;
     *
     * 需定义:
     * Blog.belongsTo(User, {
     *      foreignKey: 'userId'
     * })
     */
    /*const blogListWithUser = await Blog.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName'],
                where: {
                    userName: 'zhangsan'
                }
            }
        ]
    })
    console.log('blogListWithUser', blogListWithUser.count) // 总数, 不考虑分页
    console.log('blogListWithUser', blogListWithUser.rows.map(blog => {
        const blogVal = blog.dataValues
        blogVal.user = blogVal.user.dataValues
        return blogVal
    })) // 当前页的数据*/

    /**
     * 连表查询1
     * SELECT blogs.*, users.userName, users.userName
     * FROM blogs INNER JOIN users ON `blog`.`userId` = `user`.`id` AND `user`.`userName` = 'zhangsan'
     * ORDER BY `blog`.`id` DESC;
     *
     * 需定义:
     * Blog.belongsTo(User, {
     *      foreignKey: 'userId'
     * })
     */
    const userListWithBlog = await User.findAndCountAll({
        attributes: ['userName', 'nickName'],
        include: [
            {
                model: Blog,
            }
        ]
    })
    console.log('userListWithBlog', userListWithBlog.count) // 总数, 不考虑分页
    console.log('userListWithBlog', userListWithBlog.rows.map(user => {
        const userVal = user.dataValues
        userVal.blogs = userVal.blogs.map((blog) => blog.dataValues)
        return userVal
    })) // 当前页的数据
})()
```

#### 7.4 连接池

![连接池](https://lixuelang.com/test/koa2+mysql/021.jpg)

/seq.js

```
const Sequelize = require('sequelize')

let conf = {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    timezone: '+08:00',
    // 线下用简单连接. 线上用连接池
+    pool: {
+        max: 5,
+        min: 0,
+        idle: 10000 // 如果一个连接池 10s 之内没有被使用， 则释放
+    },
}

const seq = new Sequelize('koa2_weibo_db', 'root', 'root', conf)

module.exports = seq
```

#### 7.5 ER图

![ER图](https://lixuelang.com/test/koa2+mysql/022.jpg)

#### 7.6 问题

> 问题1: 添加外键报错  
> 解决: 两张表类型对不上  
> 链接: https://www.cnblogs.com/jardeng/p/12899019.html  




