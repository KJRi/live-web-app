// @flows
const express = require('express')
const UserInfo = require('../models/userinfo')
const project = require('../config/project.config')
const router = express.Router()

// 存储、更改资料
router.post('/editInfo', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: '未登录' })
  } else {
    var newUserInfo = new UserInfo({
      username: req.body.username,
      description: req.body.description,
      birthday: req.body.birthday,
      location: req.body.location
    })
    // 存储用户信息
    newUserInfo.save((err) => {
      if (err) {
        return res.json({ success: false, message: '储存信息失败!' })
      }
      res.json({ success: true, message: '成功存储信息!' })
    })
  }
})

module.exports = router
