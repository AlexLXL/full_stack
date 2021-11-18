/**
 * 1.通过高阶函数返回中间件
 * 2.外部会先app.use该中间件, 获取以后需要的值
 * @returns {function(...[*]=)}
 */
let querystring = require('querystring'); // 解析url的参数

function bodyParser() {
    return async (ctx, next) => {
        ctx.request.body = await new Promise((resolve, reject) => {
            let arr = []
            ctx.req.on('data', function (chunk) {
                arr.push(chunk)
            })
            ctx.req.on('end', function () {
                // 用户提交的格式: 1.json 2.表格格式 3.普通字符 3.文件格式
                let type = ctx.get('Content-Type');
                let body = Buffer.concat(arr);
                if (type === 'application/x-www-form-urlencoded') {
                    resolve(querystring.parse(body.toString()))
                } else if (type.startsWith('text/plain')) {
                    resolve(body.toString());
                } else if (type.startsWith('application/json')) {
                    resolve(JSON.parse(body.toString()));
                } else if(type.startsWith('multipart/form-data')) {

                }else{
                    resolve({})
                }
            })
        })
        await next()
    }
}

module.exports = bodyParser