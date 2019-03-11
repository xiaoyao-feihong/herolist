const mysql = require('mysql')

// 建立连接对象
const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'heros'
})

module.exports = con