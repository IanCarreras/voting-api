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
  const { voter, answer } = req.body
  const { id } = req.params
  const update = { $inc: { [`answers.${answer}`]: 1}, $push: { voter }}
  const config = { new: true }

  Poll.findByIdAndUpdate(id, update, config, (err, poll) => {
    if (err) return next(err)
    if(!poll) return res.status(404).send({ success: false, msg: 'poll id not found'})
    res.send({ success: true, poll })
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
