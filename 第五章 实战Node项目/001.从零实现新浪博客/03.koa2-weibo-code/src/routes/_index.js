const router = require('koa-router')()
const {loginRedirect, loginCheck} = require('../middlewares/loginChecks')

router.get('/', loginRedirect, async (ctx, next) => {
    // 返回ejs页面
    await ctx.render('index', {
        title: 'Hello Koa 2!',
        msg: '你好',
        isMe: false
    })
})

router.get('/json', loginCheck, async (ctx, next) => {
    // 返回json
    ctx.body = {
        title: 'koa2 json'
    }
})

router.post('/postjson', async (ctx, next) => {
    const {message} = ctx.request.body
    ctx.body = {
        title: message
    }
})

// get动态参数
router.get('/profile/:username', async (ctx, next) => {
    const { username } = ctx.params
    ctx.body = {
        title: 'this is profile page',
        username
    }
})

router.get('/loadMore/:username/:pageIndex', (ctx, next) => {
    const { username, pageIndex } = ctx.params
    ctx.body = {
        title: 'this is profile page',
        username,
        pageIndex
    }
})

module.exports = router
