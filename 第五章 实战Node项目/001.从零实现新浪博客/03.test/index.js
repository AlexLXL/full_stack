// node连接mysql
const mysql = require('mysql2')

const con = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'myblog'
})

con.connect()

const sql = 'select * from users'
// const sql = `update users set realname = '李四2' where username = 'lisi'`
// const sql = `insert into users (username, \`password\`, realname) values ('xiaoming', '123', '小明');`

con.query(sql, (err, result) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(result)
})

con.end()