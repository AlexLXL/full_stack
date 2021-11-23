let Article = require('./057_02.mongo聚合查询/article');
let User = require('./057_02.mongo聚合查询/user');
const mongoose = require('mongoose');

/**
 * 关联查询
 */
(async () => {
    /**
     * 先关联
     */
    /*let user = await User.create({username:'jw',password:'jw',gender:1});
    let article = await Article.create({title:'mongo课程',content:'今天各种报错',user_id:user._id});*/


    /**
     * 查询方式一: populate(不推荐)
     */
    /*let article = await Article.findById('60f190b08f14152a3c26a0cf', {title: 1})
        .populate('user_id', {
        hobby: 1,
        gender: 1,
        _id: 0
    });*/
    // 0 表示 不显示 其他的显示  1表示显示 其他的不显示
    // let user = await User.findOne({_id: article.user_id})


    /**
     * 查询方式二: aggregate(推荐)
     * 这个是原生的mongo方法
     */
    // let articles = await Article.aggregate([ // pipeline 管道一个个来过滤
    //     {
    //         $project:{
    //             createdAt:0,
    //             updatedAt:0
    //         }
    //     },
    //     {
    //         $lookup:{
    //             from:'user',
    //             localField:'user_id',
    //             foreignField:'_id',
    //             as:'user'
    //         }
    //     },
    //     {
    //         $match:{
    //             _id: mongoose.Types.ObjectId('60f190b08f14152a3c26a0cf')
    //         }
    //     }
    // ]);

    let users = await User.aggregate([ // pipeline 管道一个个来过滤
        // {
        //     $project:{
        //
        //     }
        // },
        // { // 我想找某一类的人
        //     $lookup:{
        //         from:'user',
        //         localField:'user_id',
        //         foreignField:'_id',
        //         as:'user'
        //     }
        // },
        {
            $group: { // 查出来的结果叫name
                _id: "$username", age: {$sum: '$age'}
            }
        },
        {
            $match: {
                _id: "zf"
            }
        }
    ]);
    console.log(users)
    mongoose.disconnect();
})();