/**
 * @description error 404 路由
 * @author 学浪
 */

const router = require('koa-router')()

router.get('/error', async (ctx, next) => {
    await ctx.render('error')
})

// 故意制造一个错误
router.get('/get-an-error', async (ctx, next) => {
    console.error('发生错误2')
    throw new Error('发生错误1')
    ctx.body = {
        msg: 'xxx'
    }
})

router.get('*', async (ctx, next) => {
    await ctx.render('404')
})

module.exports = router