const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
  chat: String,
  author: String,
  content: String
})

module.exports = mongoose.model('Message', MessageSchema)