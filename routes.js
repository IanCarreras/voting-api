const express = require('express')
const router = express.Router()

const pollController = require('./controllers/PollsController')

router.post('/poll', pollController.addNewPoll)
router.get('/poll', pollController.getPolls)
router.get('/poll/:id/one', pollController.getOnePoll)
router.put('/poll/:id/vote', pollController.pollVote)
router.put('/poll/:id/answer', pollController.addAnswerToPoll)
router.delete('/poll/:id', pollController.deletePoll)

module.exports = router
