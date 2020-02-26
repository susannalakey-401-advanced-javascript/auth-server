const express = require('express');
const basicAuth = require('../middleware/basic-auth')

const Users = require('../models/users');
const router = express.Router();


// expects a username and password
// takes the user and password and creates a new user
router.post('/signup', (req, res, next) => {
  const newUser = new Users(req.body)
  newUser.save() // write a save() function in your User model
    .then(result => {
      const token = result.generateToken()
      res.status(200).json({ token })
    })
    .catch(next)
})

router.post('/signin', basicAuth, (req, res, next) => {

  res.json({ message: 'success' })
})

router.get('/users', async (req, res, next) => {
  const allUsers = await Users.find({});
  res.status(200).json(allUsers);
})

router.get('/', (req, res) => {
  res.send('Welcome to the home page');
})

module.exports = router;