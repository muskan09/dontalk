const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const MessageController = require('./api/messages')

const app = express()
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/dontalk'
const port = process.env.PORT || 1234

mongoose.connect(mongoUri)

app.use(cors())
app.use(bodyParser.json())
app.use('/api/messages', MessageController)
app.use(express.static("public"))

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
