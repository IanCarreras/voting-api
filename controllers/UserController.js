const User = require('../models/User')

//create a user profile
exports.newUser = (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  },
  (err, user) => {
    if (err) return res.status(500).send('There was a problem adding information to the database')
    res.status(200).send(user)
  })
}

//get single user
exports.findUser = (req, res) => {
  User.findById( req.params.id, (err, user) => {
  if (err) return res.status(500).send('There was a problem finding the user')
  if (!user) return res.status(404).send('User not found')
    res.status(200).send(user)
  })
}

//get all users
exports.getUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send('There was a problem finding the users')
    res.status(200).send(users)
  })
}

//delete single user
exports.deleteUser = (req, res) => {
  User.findByIdAndRemove( req.params.id, (err, user) => {
    if (err) return res.status(500).send('There was a problem deleting the user')
    res.status(200).send('User ' + user.name + ' was deleted.')
  })
}

//delete everything
exports.deleteEverything = (req, res) => {
  User.remove({}, err => {
    if (err) return res.send({ msg: 'error deleting DB', success: flase })
    res.send({ success: true, msg: 'deleted everything!' })
  })
}

//updates a single user
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate( req.params.id, req.body, {new: true}, (err, user) => {
    if (err) return res.status(500).send('There was a problem updating the user')
    res.status(200).send(user)
  })
}
