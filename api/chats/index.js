const express = require('express')
const Chat = require('./model')

const router = express.Router()

router.post('/', (req, res) => {
  Chat.create(req.body.chat, (err, chat) => {
    if (err) res.send(err)
    res.status(200).send(chat)
  })
})

router.get('/:chat', (req, res) => {
  Chat.findOne({ title: req.params['chat'] }, (err, chat) => {
    if (err) res.send(err)
    res.status(200).send(chat)
  })
})

module.exports = router