/**
 * 全局npm包的一些知识
 */

/**
三、写全局npm包，,命令执行包(如http-serve的hs命令)

1.新建目录【aaa】
    npm init

2.新建文件【aaa/index.js】
    #! /usr/bin/env node
    console.log(123123)

3.配置package.json
    "name"："aaa", // 命令的名称
    "bin": "index.js", // aaa命令默认执行该文件
    // "bin": {xx:"index.js"， xxx:"index.js"}, // 多命令

4.将包软列到全局npm包里
    npm link
    npm unlink // 移除

5.即可在命令行使用该命令
    >aaa

6.如果依赖不是全局安装,而是安装在项目内，那么可以在项目内调用该命令
    // 1.命令会存在node_module/.bin
    // 2.修改package.json, 添加script命令, 如"dev": "aaa"
    // 3.执行npm run dev (会添加一次环境变量, 执行完后删除)
    // 4.也可以在当前项目下使用npx aaa来执行aaa命令 (会添加一次环境变量)


其他知识点
package.lock.js 锁定包的依赖的版本和下载地址
package.json
xxx: "^1.22.2" -- 版本1以上
xxx: "~1.22.2" -- 版本1.22以上
xxx: ">=1.22.2"
xxx: "=<1.22.2"
发布测试版本,但不想用户无意装上,加上后缀,如: vue@3.0.0-alpha0.1
 */
