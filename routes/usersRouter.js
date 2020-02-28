const express = require('express');
const basicAuth = require('../middleware/basic-auth')
const bearerAuth = require('../middleware/bearer-auth')
const User = require('../models/user');
const router = express.Router();


// expects a username and password
// takes the user and password and creates a new user
router.post('/signup', (req, res, next) => {
  const newUser = new User(req.body)
  newUser.save()
    .then(user => {
      const token = user.generateToken()
      res.status(200).json({ token })
    })
    .catch(next)
})

router.post('/signin', basicAuth, (req, res, next) => {
  res.status(200).json({ token: req.token })
})

router.get('/users', async (req, res, next) => {
  const allUsers = await User.list();
  res.status(200).json(allUsers);
})

router.get('/', (req, res) => {
  res.send('Welcome to the home page');
})

router.post('/secret', bearerAuth, (req, res, next) => {
  const { username } = req.user;
  res.status(200).json({ username });
})

module.exports = router;