const Poll = require('../models/Polls')

exports.addNewPoll = (req, res) => {
  const { question, answers, user } = req.body

  const answerObj = answers.reduce((acc, answer) => {
    acc[answer] = 0
    return acc
  }, {})

  const record = new Poll({
    user,
    question,
    answers: answerObj
  })
  record.save((err) => {
    if (err) return res.status(500).send({success: false})
    res.send(record)
  })
}

exports.getPolls = (req, res) => {
  Poll.find({}, (err, result) => {
    if (err) return res.status(500).send({success: false})
    res.status(200).send(result)
  })
}

exports.getOnePoll = (req, res) => {
  const { id } = req.params

  Poll.findById(id, (err, poll) => {
    if (err) return res.status(500).send({success: false})
    if (!poll) return res.status(404).send({success: false, msg: "no such poll"})
    res.status(200).send(poll)
  });
}

exports.pollVote = (req, res) => {
  // check for userID, if null, get req.ip
  // store either userID or req.ip in a variable called voter  or something

  const { userId, answer } = req.body
  const pollId = req.params.id
  console.log(userId, answer, req.ip)
  const voter = userId || req.ip
  const update = { $inc: { [`answers.${answer}`]: 1}, $push: { voter }}
  const config = { new: true }

  Poll.findOne({ _id: pollId, voter: { $elemMatch: { $in: [voter] } } }, function(err, doc) {
    if (err) return res.send(err)
    if (doc) {
      // userId or IP address hal already voted
      // send an error back to the client
    } else if (doc === null) {
      Poll.findByIdAndUpdate(pollId, update, config, (err, poll) => {
        if (err) return next(err)
        if(!poll) return res.status(404).send({ success: false, msg: 'poll id not found'})
        res.send({ success: true, poll })
      })
    }
  })
}

exports.addAnswerToPoll = (req, res) => {
  const { answer } = req.body
  const { id } = req.params
  const update = { $set: { [`answers.${answer}`]: 0 } }
  const config = { new: true }

  Poll.findByIdAndUpdate(id, update, config, (err, poll) => {
    if (err) return next(err)
    if(!poll) return res.status(404).send({ success: false, msg: 'poll id not found'})
    res.send({ success: true, poll })
  })
}

exports.deletePoll = (req, res) => {
  Poll.findByIdAndRemove(req.params.id, (err, poll) => {
    if (err) return res.status(500).send({success: false})
    res.status(200).send(poll)
  })
}
