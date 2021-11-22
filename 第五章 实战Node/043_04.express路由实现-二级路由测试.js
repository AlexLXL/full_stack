// const express = require('./043_03.express路由实现-正则');
const express = require('express');
let user = require('./043_04.user.js')

const app = express();

/*app.get('/user/add', (req, res, next) => {
    res.end('/user/add')
})
app.get('/user/delete', (req, res, next) => {
    res.end('/user/delete')
})*/
app.use('/use', user)

app.listen(3000,(err) => {
    if(err) console.log(err)
    else console.log('server start 3000')
});