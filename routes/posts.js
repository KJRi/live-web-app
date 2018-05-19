// @flows
const express = require('express')
const Post = require('../models/post')
const router = express.Router()

// 发帖
router.post('/create', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: '未登录' })
  } else {
    var newPost = new Post({
      author: req.body.username,
      title: req.body.title,
      content: req.body.content,
      tag: req.body.tag
    })
    newPost.save((err) => {
      if (err) {
        return res.json({ success: false, message: '发帖失败!' })
      }
      res.json({ success: true, message: '发帖成功!' })
    })
  }
})
// 获取all帖子
router.get('/all', (req, res) => {
  Post.find({}).sort({ _id: -1 }).exec().then((posts) => {
    return res.json(posts)
  }
)
})

module.exports = router
