const express = require('express')
const router = express.Router()

const userController = require('./controllers/UserController')
const pollController = require('./controllers/PollsController')

router.post('/user', userController.newUser)
router.get('/user/:id/one', userController.findUser)
router.get('/users', userController.getUsers)
router.delete('/user/:id/one', userController.deleteUser)
router.delete('/users', userController.deleteEverything)
router.post('/user/:id/update', userController.updateUser)

router.post('/poll', pollController.addNewPoll)
router.get('/polls', pollController.getPolls)
router.get('/poll/:id/one', pollController.getOnePoll)
router.put('/poll/:id/vote', pollController.pollVote)
router.put('/poll/:id/answer', pollController.addAnswerToPoll)
router.delete('/poll/:id', pollController.deletePoll)

module.exports = router
