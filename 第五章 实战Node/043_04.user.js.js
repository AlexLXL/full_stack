let express = require('express')
let router = express.Router()

router.get('/add', (req, res, next) => {
    res.end('/user/add')
})

router.get('/delete', (req, res, next) => {
    res.end('/user/delete')
})

module.exports = router