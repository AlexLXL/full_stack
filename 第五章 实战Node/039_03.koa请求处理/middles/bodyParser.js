/**
 * 通过高阶函数返回中间件
 * 把之后要使用的变量变成中间件放到前面, 并保存到ctx里面
 * @returns {function(...[*]=)}
 */
function bodyParser() {
    return async (ctx, next) => {
        ctx.request.body = await new Promise((resolve, reject) => {
            let arr = []
            ctx.req.on('data', function (chunk) {
                arr.push(chunk)
            })
            ctx.req.on('end', function () {
                resolve(Buffer.concat(arr).toString())
            })
        })
        await next()
    }
}

module.exports = bodyParser