const mongoose = require('mongoose');

mongoose.connect('mongodb://blog:123@localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        return console.log('数据库链接失败')
    }
    console.log('数据链接成功')
});

module.exports = mongoose;