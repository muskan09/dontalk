const express = require('express')
const Message = require('./model')

const router = express.Router()

router.post('/', (req, res) => {
  Message.create(req.body.message, (err, message) => {
    if (err) res.send(err)
    res.status(200).send(message)
  })
})

router.get('/:chat', (req, res) => {
  Message.find({ chat: req.params['chat'] }, (err, messages) => {
    if (err) res.send(err)
    res.status(200).send(messages)
  })
})

module.exports = router