const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const {SECRET} = require('../conf/constants')
const util = require('util')
const verify = util.promisify(jwt.verify)

router.prefix('/users')

router.post('/login', async (ctx, next) => {
    let {userName, password} = ctx.request.body

    let userInfo
    if (userName === 'lisi' && password === '123') {
        userInfo = {
            id: 1,
            userName: 'lisi',
            nickName: '李四',
            phone: '13511132356'
        }

        let token = jwt.sign(userInfo, SECRET, { expiresIn: '1h'})

        ctx.body = {
            error: 0,
            data: token
        }
    } else {
        ctx.body = {
            error: -1,
            meg: '登录失败'
        }
    }
})

router.get('/getUserInfo', async (ctx, next) => {
    let token = ctx.header.authorization
    try {
        const payload = await verify(token.split(' ')[1], SECRET)
        ctx.body = {
            error: 0,
            userInfo: payload
        }
    }catch (err) {
        console.log(err)
        ctx.body = {
            error: -1,
            msg: 'verify token failed'
        }
    }
})

module.exports = router
