// @flows
const express = require('express')
const Post = require('../models/post')
const router = express.Router()

// 存储、更改资料
router.post('/create', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: '未登录' })
  } else {
    var newPost = new Post({
      author: req.body.username,
      title: req.body.title,
      content: req.body.content,
      postTime: req.body.postTime,
      tag: req.body.tag
    })
    // 存储用户信息
    newPost.save((err) => {
      if (err) {
        return res.json({ success: false, message: '发帖失败!' })
      }
      res.json({ success: true, message: '发帖成功!' })
    })
  }
})

module.exports = router
