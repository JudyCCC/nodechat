const express = require('express')
const mongoose = require('mongoose')

// 链接mongo 并且使用nodechat这个集合
const DB_URL = 'mongodb://localhost:27017/nodechat'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function(){
  console.log('mongo connect success2')
})

// 类似于mysql的表 mongo里有文档／字段的概念
const User = mongoose.model('user', new mongoose.Schema({
  user: {type: String, require: true},
  age:{ type: Number, require: true }
}))

// 新建数据
// User.create({
//   user: 'xiaohua',
//   age: 12
// }, function(err, doc){
//   if(!err){
//     console.log(doc)
//   }else{
//     console.log(err)
//   }
// })

// 删除数据
// User.remove({user: 'xiaohua'}, function(err, doc){
//   if(!err){
//     console.log('delete success')
//     User.find({}, function(e,d){
//       console.log(d)
//     })
//   }
// })

// 更改数据
User.update({'user': 'xiaoming'}, {'$set':{age:26}}, function(err, doc){
  console.log(doc)
})

// 新建app
const app = express()

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>')
})

app.get('/data', function(req, res){
  User.find({user: 'xiaoming'}, function(err, doc){
    res.json(doc)
  })
})

app.listen(9093, function(){
  console.log('Node app start at port 9093')
})