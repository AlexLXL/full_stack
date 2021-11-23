const express = require('./043_05.express路由实现-路由参数');
const app = express();
const path = require('path');


app.get('/user/:id/:name/xxx', function(req, res) {
    // res.send({a:1})
    res.sendFile(path.resolve(__dirname, 'package.json'))
})
app.listen(3000, function() {
    console.log(`server start 3000`);
})