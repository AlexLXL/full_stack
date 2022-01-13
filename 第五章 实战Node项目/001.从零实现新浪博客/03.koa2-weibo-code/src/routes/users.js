const router = require('koa-router')()

/**
 * 前缀
 * 通过 localhost:3000/users 访问该路由
 */
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

//post获取参数
router.post('/login', async (ctx, next) => {
  const {userName, password} = ctx.request.body
  ctx.body = {
    id: 100,
    userName,
    password
  }
})

module.exports = router
