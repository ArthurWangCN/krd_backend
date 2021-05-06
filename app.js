const express = require('express')
const router = require('./router/index.js')
const bodyParser = require('body-parser')

// // 创建 express 应用
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', router)

const fs = require('fs')
const https = require('https')

// ssl证书
const privateKey = fs.readFileSync('./ssl/5500931_krd.kmanage.cn.key', 'utf8')
const certificate = fs.readFileSync('./ssl/5500931_krd.kmanage.cn.pem', 'utf8')
const credentials = { key: privateKey, cert: certificate }

const httpsServer = https.createServer(credentials, app)
const SSLPORT = 18082
httpsServer.listen(SSLPORT, function() {
  console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT)
})
