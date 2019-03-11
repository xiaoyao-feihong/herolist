// 业务处理模块
const connect = require('./db.js')

module.exports = {
    testAPI: (req, res) => {
        res.send({ status: 200, msg: 'ok', data: '' })
    },
    getAllHero: (req, res) => {
        const sql = 'select * from heros'
        connect.query(sql, (err, result) => {
            if (err) return res.send({ status: 500, msg: err.message, data: null })
            res.send({ status: 200, msg: 'ok', data: result })
        })
    },
    addHero: (req, res) => {
        // body-parser会自动将post请求转化为对象形式
        const hero = req.body
        const date = new Date()
        const y = date.getFullYear()
        const m = (date.getMonth() + 1).toString().padStart(2, '0')
        const d = date.getDate().toString().padStart(2, '0')
        const hour = date.getHours().toString().padStart(2, '0')
        const min = date.getMinutes().toString().padStart(2, '0')
        const sec = date.getSeconds().toString().padStart(2, '0')
        hero.ctime = y + '-' + m + '-' + d + ' ' + hour + ':' + min + ':' + sec
        const addSql = 'insert into heros set ?'
        connect.query(addSql, hero, (err, result) => {
            if (err) return res.send({ status: 500, msg: err.message, data: null })
            res.send({ status: 200, msg: 'ok', data: null })
        })
    },
    deleteHero: (req,res) => {
        // 软删除英雄
        const id = req.params.id
        const sql = 'update heros set isdel=1 where id=?'
        connect.query(sql,id,(err,result) => {
            if(err) return res.send({status: 500,msg: err.message,data: null})
            res.send({status: 200,msg: 'ok',data: null})
        })
    },
    updateHero: (req,res) => {
        const id  = req.params.id
        const newInfo = req.body
        const sql = 'update heros set ? where id=?'
        connect.query(sql,[newInfo,id],(err,result) => {
            if(err) return res.send({status: 500,msg: err.message,data: null})
            res.send({status: 200,msg: 'ok',data: null})
        })
    }
}