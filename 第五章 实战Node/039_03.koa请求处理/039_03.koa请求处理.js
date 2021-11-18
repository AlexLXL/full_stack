let Koa = require('koa');
let path = require('path');
let login = require('./page/login')
let bodyParser = require('./middles/bodyParser')
// let bodyParser = require('koa-bodyparser')   // koa第三方模块

let app = new Koa();
app.use(bodyParser({dir:path.resolve(__dirname,'upload')}))
login(app)

app.listen(3000, function() {
    console.log(`server start 3000 `)
})

