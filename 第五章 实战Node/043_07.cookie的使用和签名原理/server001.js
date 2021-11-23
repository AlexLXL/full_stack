const Koa = require('koa');
const Router = require('@koa/router');
const querystring = require('querystring');
const crypto = require('crypto');   // express用sha256, koa用sha1

const app = new Koa();
const router = new Router();
const secret = 'zfsecret'
// app.keys = [secret] // koa的cookie签名基础使用1

const toBase64URL = (str)=>{
    return str.replace(/\=/g,'').replace(/\+/g,'-').replace(/\//,'_');
}

// cookie的签名只是防止用户去篡改数据，如果用户篡改过了，我就丢弃掉，并不是为了安全
// 通过复制其它人的cooke和签名, 就绕过了签名的问题, 如复制一个更高的金额的cookie, 明显不安全
app.use(async (ctx, next) => {
    const cookies = [];
    ctx.my = {
        set(key, value, options = {}) {
            let optsArr = [];
            if (options.domain) {
                optsArr.push(`domain=${options.domain}`)
            }
            if (options.httpOnly) {
                optsArr.push(`httpOnly=${options.httpOnly}`)
            }
            if (options.maxAge) {
                optsArr.push(`max-age=${options.maxAge}`)
            }
            // 为了数据安全, 对数据进行签名
            if (options.signed) {
                // base64 在是网络传输的时候 会对 + / = 做特殊处理
                let sign = toBase64URL(crypto.createHmac('sha1',secret).update([key, value].join('=')).digest('base64'));
                cookies.push(`agesign=${sign}`)
            }
            cookies.push(`${key}=${value}; ${optsArr.join('; ')}`)
            ctx.res.setHeader('Set-Cookie', cookies);
        },
        get(key,options) {
            let cookieObj = querystring.parse(ctx.req.headers['cookie'], '; ');
            if(options.signed){
                if(cookieObj[`${key}sign`]  == toBase64URL(crypto.createHmac('sha1',secret).update(`${key}=${cookieObj[key]}`).digest('base64'))){
                    return cookieObj[key]
                }else{
                    return 'error';
                }
            }
            return cookieObj[key] || '';
        }
    }
    return next()
})

/*
- 为什么用cdn, cdn是一个特殊域名，不会发送cookie
- 浏览器修改cookie: document.cookie

key     cookie的key
value   cookie的值
domain  域名(父域: .jd.com  子域: .cart.jd.com  子域是可以拿父域的cookie的)
path    路径
exipres/max-age 存活时间
httpOnly        勾选的话浏览器访问不了

xsrf 诱导用户点击一个图片，发请求通过url把你本地cookie传递给他自己的服务器 document.cookie
*/
router.get('/write', async function(ctx) {
    ctx.my.set('name', 'zf', {
        domain: '.zf.cn',
        httpOnly: true,
    })
    ctx.my.set('age', '12', { signed: true })   // koa的cookie签名基础使用2
    ctx.body = 'write ok';
})
router.get('/read', async function(ctx) {
    ctx.body = ctx.my.get('age',{signed:true})
})
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, function() {
    console.log(`server start 3000`)
})