let Koa = require('koa');
let login = require('./page/login')
let bodyParser = require('./middles/bodyParser')
// let bodyParser = require('koa-bodyparser')   // koa第三方模块

let app = new Koa();
app.use(bodyParser())
login(app)

app.listen(3000, function() {
    console.log(`server start 3000 `)
})

