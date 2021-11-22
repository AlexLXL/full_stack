const express = require('express');
// const express = require('./043_02.express路由实现');

const app = express();

app.get('/user/:id/:name/xxx', (req, res, next) => {
    res.end(JSON.stringify(req.params))
})
// path-to-regexp 把路径转正则，和请求的路径做匹配，获得对象

// 原理
// let reg = /\user\/([^\/]+)\/([^\/]+)\/xxx/
// let url = 'user/1/zj/xxx'
// console.log(url.match(reg))

// 实现
// function pathToRegExp(str,keys){
//     str = str.replace(/:([^\/]+)/g,function(){
//         keys.push(arguments[1])
//         return '([^\/]+)'
//     });
//     return new RegExp(str);
// }
// let p = '/user/:id/:name/xxx/:xxx';
// let keys = []
// let reg = pathToRegExp(p,keys);
// let url = '/user/1/zf/xxx/abc';
// console.log(url.match(reg).slice(1),keys);

app.listen(3000,(err) => {
    if(err) console.log(err)
    else console.log('server start 3000')
});