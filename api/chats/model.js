const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
  title: { type: String, unique: true }
})

module.exports = mongoose.model('Chat', ChatSchema)