let Koa = require('koa');
let path = require('path');
let login = require('./page/login')
let bodyParser = require('./middles/bodyParser')
// let bodyParser = require('koa-bodyparser')   // 解析body
let static = require('koa-static')   // 静态服务

let app = new Koa();
app.use(bodyParser({dir:path.resolve(__dirname,'upload')}))
app.use(static(__dirname))
app.use(static(path.resolve(__dirname, 'middles')))
login(app)

app.listen(3000, function() {
    console.log(`server start 3000 `)
})

