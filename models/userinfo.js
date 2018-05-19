// @flow
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserInfoSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  description: {
    type: String
  },
  birthday: {
    type: String
  },
  location: {
    type: String
  }
})

module.exports = mongoose.model('UserInfo', UserInfoSchema)
