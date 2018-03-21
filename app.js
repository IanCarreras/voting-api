const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/polling')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use('/', require('./routes'))

const port = process.env.PORT || 3030
app.listen(port, () => {
  console.log('Server running on port', port)
})
