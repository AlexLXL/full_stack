let Koa = require('koa');
let app = new Koa();
let path = require('path')
let fs = require('fs')

app.use(async (ctx, next) => {
    if (ctx.path === '/form' && ctx.method == 'GET') {
        ctx.set('Content-Type', 'text/html')
        ctx.body = fs.createReadStream(path.resolve(__dirname, '039_03.koa请求处理.html'))
    }else {
        await next()
    }
})

app.use(async (ctx, next) => {
    if (ctx.path === '/login' && ctx.method == 'POST') {
        ctx.body = await new Promise((resolve, reject) => {
            let arr = []
            ctx.req.on('data', function (chunk) {
                arr.push(chunk)
            })
            ctx.req.on('end', function () {
                resolve(Buffer.concat(arr).toString())
            })
        })
    }else {
        await next()
    }
})

app.listen(3000, function() {
    console.log(`server start 3000 `)
})