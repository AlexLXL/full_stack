let  mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (err) return console.log(`数据库连接失败`)
    console.log(`数据库连接成功`)
})

// Schema骨架, 定义存储的方式(type:类型, require: 是否必填)
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
    }
}, {
    timestamps: {
        createAt: 'created',
        updatedAt: 'updated'
    }
})

// 默认集合的名是小写参数1+s, 也可以第三个参数指定
let User = mongoose.model('User', UserSchema, 'users');

(async () => {
    let user = await User.create({username: 'slrc', password: 'slrc123456'});
})()