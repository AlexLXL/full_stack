const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs')

// express的内置中间件
app.use((req, res, next) => {
    res.send = function(data) {
        if (typeof data === 'object') {
            res.end(JSON.stringify(data))
        }else if (typeof data === 'string') {
            res.end(data)
        }
    }
    res.sendFile = function(pathname) {
        fs.createReadStream(pathname).pipe(res)
    }
    next()
})

app.get('/user/:id/:name/xxx', function(req, res) {
    // res.send({a:1})
    res.sendFile(path.resolve(__dirname, 'package.json'))
})
app.listen(3000, function() {
    console.log(`server start 3000`);
})