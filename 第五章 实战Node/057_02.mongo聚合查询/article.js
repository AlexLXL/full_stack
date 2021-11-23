let mongoose = require('./index');


const ArticleSchema = mongoose.Schema({ // 权限 和 用户 是多对多的关系  (简历第三个表)
    title: String,
    content: String,
    user_id : mongoose.SchemaTypes.ObjectId,
    // user_id: { ref: 'User', type: mongoose.SchemaTypes.ObjectId },
    price: Number,
    // 引用User
}, {
    timestamps: {
        createAt: 'created',
        updateAt: 'updated'
    }
})
// 一个文章 对应一个用户  一个用户有多个文章  一对多

module.exports = mongoose.model('Article', ArticleSchema, 'article');