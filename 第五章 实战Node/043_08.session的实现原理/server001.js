const Koa = require('koa');
const Router = require('@koa/router');
const querystring = require('querystring');
const uuid = require('uuid');
const session = require('koa-session');
const crypto = require('crypto');

const app = new Koa();
const router = new Router();
const secret = 'zfsecret'
app.keys = [secret];
app.use(session({}, app));


// koa-session使用
let cardName = 'zhufeng';
router.get('/wash', async function(ctx) {
    let hasVisit = ctx.session[cardName];
    if (hasVisit) {
        ctx.session[cardName].mny -= 100;
        ctx.body = '恭喜你消费了 ' + ctx.session[cardName].mny
    } else {
        ctx.session[cardName] = { mny: 500 };
        ctx.body = '恭喜你已经是本店会员了 有500元'
    }
})

/*
// session实现原理
let cardName = 'zhufeng'; // 店铺名字
let session = {}; // session就是一个服务器记账的本子，为了稍后能通过这个本找到具体信息
router.get('/wash', async function(ctx) {
    let hasVisit = ctx.cookies.get(cardName,{signed:true});
    if(hasVisit && session[hasVisit]){ // 必须保证你的卡是我的店的
        session[hasVisit].mny -= 100;
        ctx.body = '恭喜你消费了 ' + session[hasVisit].mny
    }else{
        const id = uuid.v4();
        session[id] = {mny:500};                         // 服务器存储金额
        ctx.cookies.set(cardName, id, {signed:true});    // 客户端存储服务端session的key
        ctx.body = '恭喜你已经是本店会员了 有500元'
    }
})*/

// SSR 前后端同构的时候, 用session来实现用户鉴别是最方便的
app.use(router.routes()).use(router.allowedMethods()); // 405

app.listen(3000, function() {
    console.log(`server start 3000`)
})