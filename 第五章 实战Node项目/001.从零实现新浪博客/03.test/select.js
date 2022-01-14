const {Blog, User} = require('./model');

(async function () {
    /**
     * 查询用户
     * select * from users where id = 1;
     */

    /**
     * 查询一条
     * select * from user where userName = 'zhangsan' limit 1;
     */
    /*const zhangsan = await User.findOne({
        where: {
            userName: 'zhangsan'
        }
    })*/

    /**
     * 查询所有
     * select * from blogs where userId = 1 order by id desc;
     */
    /*const zhangsanBlogList = await Blog.findAll({
        where: {
            userId: 1
        },
        order: [
            ['id', 'desc']
        ]
    })
    console.log('zhangsanBlogList', zhangsanBlogList.map(blog => blog.dataValues))*/

    /**
     * 查询特定列
     * select userName, nickName from user where userName = 'zhangsan' limit 1;
     */
    /*const zhangsanName = await User.findOne({
        attributes: ['userName', 'nickName'],
        where: {
            userName: 'zhangsan'
        }
    })
    console.log('zhangsanName', zhangsanName.dataValues)*/

    /**
     * 分页
     * select * from blogs order by id limit 2 offset 2
     * 第二页两条
     */
    /*const blogPageList = await Blog.findAll({
        limit: 2,
        offset: 2,
        order: [
            ['id', 'desc']
        ]
    })
    console.log('blogPageList', blogPageList.map(blog => blog.dataValues))*/

    /**
     * 查询总数
     * SELECT * FROM `blogs` ORDER BY `id` DESC LIMIT 2 OFFSET 2;
     */
    /*const blogListAndCount = await Blog.findAndCountAll({
        limit: 2,
        offset: 2,
        order: [
            ['id', 'desc']
        ]
    })
    console.log('blogListAndCount', blogListAndCount.count) // 总数, 不考虑分页
    console.log('blogListAndCount', blogListAndCount.rows.map(blog => blog.dataValues)) // 当前页的数据*/

    /**
     * 连表查询1
     * SELECT blogs.*, users.userName, users.userName
     * FROM blogs INNER JOIN users ON `blog`.`userId` = `user`.`id` AND `user`.`userName` = 'zhangsan'
     * ORDER BY `blog`.`id` DESC;
     *
     * 需定义:
     * Blog.belongsTo(User, {
     *      foreignKey: 'userId'
     * })
     */
    /*const blogListWithUser = await Blog.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName'],
                where: {
                    userName: 'zhangsan'
                }
            }
        ]
    })
    console.log('blogListWithUser', blogListWithUser.count) // 总数, 不考虑分页
    console.log('blogListWithUser', blogListWithUser.rows.map(blog => {
        const blogVal = blog.dataValues
        blogVal.user = blogVal.user.dataValues
        return blogVal
    })) // 当前页的数据*/

    /**
     * 连表查询1
     * SELECT blogs.*, users.userName, users.userName
     * FROM blogs INNER JOIN users ON `blog`.`userId` = `user`.`id` AND `user`.`userName` = 'zhangsan'
     * ORDER BY `blog`.`id` DESC;
     *
     * 需定义:
     * Blog.belongsTo(User, {
     *      foreignKey: 'userId'
     * })
     */
    const userListWithBlog = await User.findAndCountAll({
        attributes: ['userName', 'nickName'],
        include: [
            {
                model: Blog,
            }
        ]
    })
    console.log('userListWithBlog', userListWithBlog.count) // 总数, 不考虑分页
    console.log('userListWithBlog', userListWithBlog.rows.map(user => {
        const userVal = user.dataValues
        userVal.blogs = userVal.blogs.map((blog) => blog.dataValues)
        return userVal
    })) // 当前页的数据
})()