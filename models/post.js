// @flow
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  author: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  adNum: {
    type: Number,
    default: 0
  },
  comNum: {
    type: Number,
    default: 0
  },
  postTime: {
    type: Date,
    default: Date.now()
  },
  tag: {
    type: Number,
    require: true
  }
})

module.exports = mongoose.model('Post', PostSchema)
