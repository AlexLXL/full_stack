const express = require('./043_04.express路由实现-二级路由');
// let express = require('express')
let router = express.Router()

router.get('/add1', (req, res, next) => {
    res.end('/user/add')
})

router.get('/delete1', (req, res, next) => {
    res.end('/user/delete')
})

module.exports = router