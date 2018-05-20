// @flow
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserFollowSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  follows: {
    type: Array,
    default: []
  }
})

module.exports = mongoose.model('UserFollow', UserFollowSchema)
