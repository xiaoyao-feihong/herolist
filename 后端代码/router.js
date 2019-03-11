// 路由模块
const express = require('express')

const router = express.Router()

const ctrl = require('./controller.js')
// padStart是字符串方法，padStart(字符串规定长度，不足补的字符)
// 1.插入新英雄
router.post('/addhero',ctrl.addHero)

// 2.更新英雄数据
router.post('/updatehero/:id',ctrl.updateHero)

//3.删除英雄数据
router.get('/deletehero/:id',ctrl.deleteHero)

// 测试
router.get('/',ctrl.testAPI)

// 对外暴露getAllHero接口
router.get('/getallhero',ctrl.getAllHero)

module.exports = router
