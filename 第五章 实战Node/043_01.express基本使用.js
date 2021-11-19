// const express = require('express');
const express = require('./043_02.express基础实现');
const app = express();

app.get('/', (req, res) => {
    res.end('hello');
});
app.get('/home', (req, res) => {
    res.setHeader('Content-Type', `application/json;charset=utf8`)
    res.end('home页面');
});

app.all('*', (req, res) => {
    res.end('Not Found Router');
});


app.listen(3000,(err) => {
    if(err) console.log(err)
    else console.log('server start 3000')
});