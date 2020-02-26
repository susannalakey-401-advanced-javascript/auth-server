const express = require('express');
const basicAuth = require('../middleware/basic-auth')

const Users = require('../models/users');
const router = express.Router();



router.post('/signup', async (req, res) => {
  const newUser = new Users(req.body)
  newUser.save() // write a save() function in your User model
    .then(user => {
      const token = user.generateToken()
      res.status(200).json({ token })
    })
    .catch(err => res.status(403).json({ error: err.message }))
})


router.post('/signin', basicAuth, (req, res) => {
  res.json({ message: 'success' })
})

router.get('/users', (req, res) => {
  const users = new Users();
  users.list();
})



module.exports = router;