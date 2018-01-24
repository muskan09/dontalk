const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const MessageSchema = new mongoose.Schema({
  chat: String,
  author: String,
  content: String
})

MessageSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Message', MessageSchema)