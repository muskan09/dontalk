const express = require('express')
const User = require('./model')

const router = express.Router()

router.post('/', (req, res) => {
  User.create(req.body.user, (err, user) => {
    if (err) res.send(err)
    res.status(200).send(user)
  })
})

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.send(err)
    res.status(200).send(users)
  })
})

module.exports = router