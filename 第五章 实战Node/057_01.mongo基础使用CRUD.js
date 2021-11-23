let  mongoose = require('mongoose')

let connect = mongoose.connect('mongodb://127.0.0.1:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (err) return console.log(`数据库连接失败`)
    console.log(`数据库连接成功`)
})

/**
 * Schema骨架, 定义存储的方式(type:类型, require: 是否必填)
 */
let UserSchema = mongoose.Schema({
    time: {
        type: Date,
        default: new Date
    },
    username: {
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    hobby: {
        type: Array,
        default: []
    }
}, {
    timestamps: {
        createAt: 'created',
        updatedAt: 'updated'
    }
})
/**
 * mongoose.model,默认集合的名是小写参数1+s, 也可以第三个参数指定
 */
let User = mongoose.model('User', UserSchema, 'users')

/**
 * 增
 * User.create(对象), 插入一个
 * User.create(数组), 插入多个
 */
/*;(async () => {
    let i = 10
    let result = []
    while (i--) {
        result.push({username: 'king', password: 'king123456'})
    }
    let user = await User.create(result);
    mongoose.disconnect()
})()*/

/**
 * 删
 *
 * deleteOne    删匹配的第一个
 * delete       匹配的都删
 */
/*;(async () => {
    let user = await User.deleteOne({username:'slrc'});
})()*/

/**
 * 改
 *
 * updateOne    更新一个
 *      - $set  设置值
 *      - $push 数组添加
 *      - $pop  数组减少
 *      - $inc  数字增加
 */
/*;(async () => {
    // let user1 = await User.updateOne({_id: '619ce06a3627071e93680d81'}, {$set: {hobby: ['a']}});
    // let user2 = await User.updateOne({_id: '619ce06a3627071e93680d81'}, {$push: {hobby: 'cc'}});
    // let user3 = await User.updateOne({_id: '619ce06a3627071e93680d81'}, {'hobby.0': 'kk'});
    // let user4 = await User.updateOne({_id: '619ce06a3627071e93680d81'}, {$inc: {gender: 11}});
    mongoose.disconnect()
})()*/

/**
 * 查
 *
 * find     查匹配的, 返回数组
 * findOne  查匹配的, 返回对象
 * findById 查id
 *
 * $gt  数字大于
 * $lt  数字小于
 * $or
 */
/*;(async () => {
    // let user1 = await User.find({_id: '619ce06a3627071e93680d81'});
    // let user2 = await User.find({gender: {$gt: 3, $lt: 8}});
    let user2 = await User.find({$or: [{gender: 1}, {gender: 3}]});
    console.log(user2)
    mongoose.disconnect()
})()*/

/**
 * 分页查
 */
let PageNumber = 2
let pageSize = 10
;(async () => {
    // API的执行顺序都是: 先查找, 再倒序, 再跳过, 再限制
    let user1 = await User.find({}).limit(pageSize).skip((PageNumber - 1) * pageSize).sort({'createdAt':-1});
    console.log(user1)
    mongoose.disconnect()
})()
