let mongoose = require('./index')
const UserSchema = mongoose.Schema({
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
        required: true,
    },
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    age: {
        type: Number
    },
    hobby: {
        type: Array,
        default: []
    }
}, {
    timestamps: { // 可以用于记录插入数据的时间
        createAt: 'created',
        updatedAt: 'updated'
    }
})
// User 就是集合
module.exports = mongoose.model('User', UserSchema, 'user');