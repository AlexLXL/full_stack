const router = require('koa-router')()
const {loginRedirect} = require('../../middlewares/loginChecks')
const {getProfileBlogList} = require('../../controller/blog-profile')

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
    const { userName: curUserName } = ctx.params

    // 获取微博第一页数据
    const result = await getProfileBlogList(curUserName, 0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        // userData: {
        //     userInfo: curUserInfo,
        //     isMe,
        //     fansData: {
        //         count: fansCount,
        //         list: fansList
        //     },
        //     followersData: {
        //         count: followersCount,
        //         list: followersList
        //     },
        //     amIFollowed,
        //     atCount
        // },
        userData: {
            userInfo: myUserInfo,
            isMe: true,
            fansData: {
                count: 0,
                list: []
            },
            followersData: {
                count: 0,
                list: []
            },
            amIFollowed: false,
            atCount: 0
        }
    })
})

module.exports = router