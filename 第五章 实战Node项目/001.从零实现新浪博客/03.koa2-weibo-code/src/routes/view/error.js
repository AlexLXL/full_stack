/**
 * @description error 404 路由
 * @author 学浪
 */

const router = require('koa-router')()

router.get('/error', async (ctx, next) => {
    await ctx.render('error')
})

router.get('*', async (ctx, next) => {
    await ctx.render('404')
})

module.exports = router