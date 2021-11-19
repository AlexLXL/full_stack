const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('hello');
});
app.get('/home', (req, res) => {
    res.send('home页面');
});

app.all('*', (req, res) => {
    res.send('Not Found Router');
});


app.listen(3000,(err) => {
    if(err) console.log(err)
    else console.log('server start 3000')
});