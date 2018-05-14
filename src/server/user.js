import Express from 'express'
import User from '../models/user'
import { responseClient } from '../method/util'
const router = Express.Router()

// 登录后端
router.post('/user/login', (req, res) => {
  let { password, phoneNum } = req.body
  if (!password) {
    responseClient(res, 400, 2, '密码不可为空')
    return
  }
  if (!phoneNum) {
    responseClient(res, 400, 2, '手机号不可为空')
    return
  }
  User.findOne({
    phoneNum,
    password
  }).then(userInfo => {
    if (userInfo) {
      // 登录成功
      let data = {}
      data.username = userInfo.username
      data.phoneNum = userInfo.phoneNum
      data.userId = userInfo._id
      // 本地session存储用户信息
      req.session.userInfo = data

      responseClient(res, 200, 0, '登录成功', data)
      return
    }
    responseClient(res, 400, 1, '用户名密码错误')
  }).catch(err => {
    responseClient(res)
  })
})
// 注册后端
router.post('/user/register', (req, res) => {
  let { username, password, confirmPassword, phoneNum } = req.body
  if (!username) {
    responseClient(res, 400, 2, '用户名不可为空')
    return
  }
  if (!phoneNum) {
    responseClient(res, 400, 2, '手机号不可为空')
    return
  }
  if (!password) {
    responseClient(res, 400, 2, '密码不可为空')
    return
  }
  if (password !== confirmPassword) {
    responseClient(res, 400, 2, '两次密码不一致')
    return
  }
  // 验证手机号是否存在
  User.findOne({ phoneNum })
      .then(data => {
        if (data) {
          responseClient(res, 200, 1, '手机号已存在')
          return
        }
        // 保存到数据库
        let user = new User({
          username,
          password,
          phoneNum
        })
        user.save()
            .then(function () {
              User.findOne({ phoneNum })
                  .then(userInfo => {
                    let data = {}
                    data.username = userInfo.username
                    data.phoneNum = userInfo.phoneNum
                    data.userId = userInfo._id
                    responseClient(res, 200, 0, '注册成功', data)
                  })
            })
      }).catch(err => {
        responseClient(res)
      })
})

// 用户验证
router.get('/user/userInfo', function (req, res) {
  if (req.session.userInfo) {
    responseClient(res, 200, 0, '', req.session.userInfo)
  } else {
    responseClient(res, 200, 1, '请重新登录', req.session.userInfo)
  }
})
// 退出登录
router.get('/user/logout', function (req, res) {
  req.session.destroy()
  res.redirect('/')
  console.log(1)
})

module.exports = router
