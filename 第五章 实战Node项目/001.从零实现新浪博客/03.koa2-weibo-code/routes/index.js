const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  // 返回页面
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  // 返回字符串
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  // 返回json
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
