const mongoose = require('mongoose')

const PollSchema = new mongoose.Schema({
  user: String,
  question: {
    type: String
  },
  answers: {
    type: Object
  },
  voter: {
    type: Array,
    default: []
  }
})

module.exports = mongoose.model('Poll', PollSchema)
