// 导入express模块
const express = require('express')
// 创建一个服务器
const app = express()

// 导入body-parser模块
const bodyParser = require('body-parser')
// 注册中间件
app.use(bodyParser.urlencoded({extended: false}))

// 导入路由模块
const router = require('./router.js')

// 在API服务端启用CORS
const cors = require('cors')

app.use(cors())

// 注册路由模块
app.use(router)

//让后端项目运行在5001端口
app.listen(5001, () => {
    console.log('server running at http://127.0.0.1:5001')
})