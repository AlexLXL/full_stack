let express = require('express');
const app = express();

app.get('/login', (req, res) => {
    res.send({id: req.query.id, name: "123"});
    // res.json({name: 1})
});


app.listen(9000,(error) => {
    if(!error) console.log('服务器启动成功···')
    else console.log(error)
});