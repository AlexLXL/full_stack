// const express = require('express');
// const express = require('./043_02.express基础实现');
const express = require('./043_02.express路由实现');

const app = express();

/*app.get('/', (req, res) => {
    res.end('hello');
});
app.get('/home', (req, res) => {
    res.setHeader('Content-Type', `application/json;charset=utf8`)
    res.end('home页面');
});
app.all('*', (req, res) => {
    res.end('Not Found Router');
});*/

/**
 * express的中间件
 *      - 访问http://localhost:3000/          // HTML-OUTPUT: 该用户还没进行权限验证
 *      - 访问http://localhost:3000/?auth=1   // HTML-OUTPUT: ok
 */
function verify(req, res, next) {
    // if (req.query.auth) {
    //     next()
    // }else {
    //     res.setHeader('Content-Type', `application/json;charset=utf8`)
    //     res.end(`该用户还没进行权限验证`)
    // }
    console.log("uuu")
    next()
}
// app.get('/', verify, (req, res, next) => {
//     console.log(1)
//     next()
// })
// 中间件的写法一般用use的写法, 更加通用
app.use('/user', verify)
app.get('/', (req, res, next) => {
    console.log(2)
    res.end('ok')
    next()
})
app.get('/user/a', (req, res, next) => {
    console.log(2)
    res.end('ok /user/a')
    next()
})
app.post('/', (req, res, next) => {
    console.log(3)
    res.end('ok post')
    next()
})
app.delete('/', (req, res, next) => {   // 测试:　curl -X DELETE -v http://localhost:3000?auth=1
    console.log(4)
    res.end('ok delete')
    next()
})

app.listen(3000,(err) => {
    if(err) console.log(err)
    else console.log('server start 3000')
});