// @flows
const express = require('express')
const Like = require('../models/like')
const router = express.Router()

// 添加评论
router.post('/add', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: '未登录' })
  } else {
    var newComment = {
      post: req.body.postId,
      author: req.body.username
    }
    // 存储
    Like.update(newComment, { upsert: true }, (err) => {
      if (err) {
        return res.json({ success: false, message: '点赞失败!' })
      }
      res.json({ success: true, message: '点赞成功!' })
    })
  }
})
// 获取用户点赞
router.get('/getByUser', (req, res) => {
  Like.Post.find({ 'author': req.query.username }).sort({ _id: -1 }).exec().then((like) => {
    return res.json(like)
  })
})
// 获取文章点赞
router.get('/getByPost', (req, res) => {
  Like.Post.find({ 'post': req.query.postId }).sort({ _id: -1 }).exec().then((like) => {
    return res.json(like)
  })
})

module.exports = router
