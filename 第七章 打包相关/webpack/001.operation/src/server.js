let express = require('express');
const app = express();

app.get('/api/home', (req, res) => {
    res.json([{app:1}, {app:2}])
});

app.listen(3000,(err) => {
    if(!err) console.log('服务器启动成功···')
    else console.log(err)
});