/**
 * jwt(JSON WEB TOKEN): 通过令牌识别身份, 解决session共享不方便
 * 主流方案都是token、非常像cookie的签名, 服务只存一个密钥
 *
 * 生产环境使用: jsonwebtoken包(支持token过期等)
 *
 * token可以在url、header、请求体
 */

const Koa = require('koa');
const Router = require('@koa/router');
const querystring = require('querystring');
const uuid = require('uuid');
const crypto = require('crypto');
// const jwt = require('jwt-simple') // 为了鉴别身份 不考虑安全


const app = new Koa();
const router = new Router();
const secret = 'zf'// 通过openssl 生成一个1k大的秘钥

const jwt = {
    sign(content, secret) {
        return this.toBase64URL(crypto.createHmac('sha256', secret).update(content).digest('base64'))
    },
    toBase64URL: (str) => {
        return str.replace(/\=/g, '').replace(/\+/g, '-').replace(/\//, '_');
    },
    base64urlUnescape(str) {
        str += new Array(5 - str.length % 4).join('=');
        return str.replace(/-/g, '+').replace(/_/g, '/');
    },
    toBase64(content) {
        return this.toBase64URL(Buffer.from(JSON.stringify(content)).toString('base64'));
    },
    encode(info, secret) {
        // console.log(secret, 22)
        // console.log(info, secret)
        const head = this.toBase64({ typ: 'JWT', alg: 'HS256' });
        const content = this.toBase64(info);
        const sign = this.sign([head, '.', content].join(''), secret);
        return head + '.' + content + '.' + sign
    },
    decode(token, secret) {
        let [head, content, sign] = token.split('.');
        let newSign = this.sign([head, content].join('.'), secret);
        if (newSign == sign) {
            return JSON.parse( Buffer.from(this.base64urlUnescape(content),'base64').toString())
        } else {
            throw new Error('用户更改了信息')
        }
    }
}
// console.log(jwt.encode({ id: '110', username: 'zs' }, secret))

router.get('/login', async (ctx, next) => {
    let user = {
        id: '110',
        username: 'zs'
        // 令牌的过期时间
    }
    // 生成令牌的数据不要太多，一般情况下用用户的id就可以了
    let token = jwt.encode(user, secret);
    ctx.body = {
        err: 0,
        data: { token, user }
    }
})
router.get('/validate', async (ctx, next) => {
    // ctx.get('Authorization')  jwt 的规范是 Authorization:Beares里存token
    try {
        let user = jwt.decode(ctx.get('Authorization').split(' ')[1], secret);
        ctx.body = { err: 0, data: { user } }
    } catch (e) {
        ctx.body = { err: 1 }
    }
})


app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, function() {
    console.log(`server start 3000`)
})