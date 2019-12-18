const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header('Access-Control-Allow-Credentials','true');   // 新增
  next();
});

// work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)
// const io = require('socket.io').listen(server)
io.on('connection', function(socket){
  console.log('user login')
  socket.on('sendmsg', function(data){
    io.emit('recvmsg', data)
  })
})

const userRouter = require('./user')

// 新建app
app.use(cookieParser())
app.use(bodyParser.json())

// 开启一个中间件
app.use('/user', userRouter)

server.listen(9093, function(){
  console.log('Node app start at port 9093')
})