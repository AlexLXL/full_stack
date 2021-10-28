const cors = require('cors')
const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, 'image'), {maxAge: '2h'}))
const list = require('./data.json')
app.get('/api/list', (req, res) => {
    res.json(list)
})
app.listen(9002, () => {
    console.log(`启动服务器: localhost:9002`)
})