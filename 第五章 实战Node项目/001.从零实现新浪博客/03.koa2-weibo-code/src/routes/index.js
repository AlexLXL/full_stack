const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  // 返回ejs页面
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    msg: '你好',
    isMe: false
  })
})

router.get('/json', async (ctx, next) => {
  // 返回json
  ctx.body = {
    title: 'koa2 json'
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
