const express = require('express');
const basicAuth = require('../middleware/basic-auth')

const Users = require('../models/users');
const users = new Users();


const { listAll, listOne, updateItems, createItems, deleteItems } = require('./generalRouter');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const newUser = new User(req.body)
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

router.get('/users', listAll(users));



module.exports = router;