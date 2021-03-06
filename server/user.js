const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {'pwd':0, '__v':0}

// 清空聊天
// Chat.remove({}, function(e,d){})

// get 用req.query获取
// post 用req.body获取

// 查看数据库数据接口 
Router.get('/list', function(req, res){
  const { type } = req.query
  User.find({type}, function(err, doc){
    return res.json({code: 0,data: doc})
  })
})

// 获取消息列表
Router.get('/getmsglist', function(req, res){
  const user = req.cookies.userid
  User.find({}, function(e, userdoc){
    let users = {}
    userdoc.forEach(v => {
      users[v._id] = { name: v.user, avatar: v.avatar }
    })
    // $or 查询多个条件
    Chat.find({'$or': [{from: user}, {to: user}]}, function(err, doc){
      if(!err){
        return res.json({code:0, msgs:doc, users: users})
      }
    })
  })
})

// 完善个人信息接口
Router.post('/update', function(req, res){
  const userid = req.cookies.userid
  if(!userid){
    return res.json.dumps({code: 1})
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, function(err, doc){
    const data = Object.assign({},{
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({code:0, data})
  })
})

// 登录接口
Router.post('/login', function(req, res){
  const { user, pwd } = req.body
  User.findOne({ user, pwd: md5Pwd(pwd)}, _filter, function(err, doc){
    if(!doc){
      return res.json({code: 1, msg: '用户名或者密码错误'})
    }
    res.cookie('userid', doc._id)
    return res.json({code: 0, data: doc})
  })
})

// 注册接口
Router.post('/register', function(req, res){
  const { user, pwd, type } = req.body
  User.findOne({user: user}, function(err, doc){
    if(doc){
      return res.json({ code: 1, msg: '用户名重复'})
    }
    // 由于要在存储后获取id，所以不能直接用create， 要用save
    const userModal = new User({user, type, pwd: md5Pwd(pwd)})
    userModal.save(function(e, d){
      if(e){
        return res.json({code: 1, msg: '后端出错了'})
      }
      const {user, type, _id} = d
      res.cookie('userid', _id)
      return res.json({code: 0, data: {user, type, _id}})
    })
    // User.create({ user, pwd: md5Pwd(pwd), type}, function(e, d){
    //   if(e){
    //     return res.json({code: 1, msg: '后端出错了'})
    //   }
    //   return res.json({ code: 0 })
    // })
  })
})

// 获取用户信息接口
Router.get('/info', function(req, res){
  // 用户有没有cookie
  const {userid} = req.cookies
  if(!userid){
    return res.json({code: 1})
  }
  User.findOne({_id: userid}, _filter, function(err, doc){
    if(err){
      return res.json({code: 1, msg: '后端出错了'})
    }
    if(doc){
      return res.json({code: 0, data: doc})
    }
  })
})

// 将消息置为已读
Router.post('/readmsg', function(req, res){
  const userid = req.cookies.userid
  const { from } = req.body
  Chat.update(
    { from, to: userid }, 
    {'$set': {read: true}},
    {'multi': true},
    function(err, doc) {
      // console.log(doc) => {n: 0, nModified: 1, ok: 1}
      // n: 找到几条数据, nModified: 影响了几条, ok: 修改成功没有
      if(!err){
        return res.json({code: 0, num: doc.nModified})
      }
      return res.json({code: 1, msg: '修改失败'})
    }
  )
})

// 密码加密
function md5Pwd(pwd){
  const salt = 'JudyC_fighting!!!!!!!!'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router