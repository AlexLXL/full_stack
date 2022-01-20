/**
 * @description 微博 view 路由
 * @author 学浪
 */

const router = require('koa-router')()
const {loginRedirect} = require('../../middlewares/loginChecks')
const {getProfileBlogList} = require('../../controller/blog-profile')
const { isExist } = require('../../controller/user')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getFans } = require('../../controller/user-relation')

router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {})
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName
    const { userName: curUserName } = ctx.params

    let curUserInfo
    const isMe = myUserName === curUserName
    if (isMe) {
        // 是当前登录用户
        curUserInfo = myUserInfo
    } else {
        // 不是当前登录用户
        const existResult = await isExist(curUserName)
        if (existResult.errno !== 0) return
        // 用户名存在
        curUserInfo = existResult.data
    }

    // 获取微博第一页数据
    const result = await getProfileBlogList(curUserName, 0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    // 获取粉丝
    const fansResult = await getFans(curUserInfo.id)
    const { count: fansCount, fansList } = fansResult.data

    // 我是否关注了此人？
    const amIFollowed = fansList.some(item => {
        return item.userName === myUserName
    })

    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        userData: {
            userInfo: curUserInfo,
            isMe: isMe,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followersData: {
                count: 0,
                list: []
            },
            amIFollowed,
            atCount: 0
        }
    })
})

// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
    // 获取微博数据，第一页
    const result = await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}

    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})

module.exports = router