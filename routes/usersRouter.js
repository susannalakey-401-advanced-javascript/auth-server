const express = require('express');
const basicAuth = require('../middleware/basic-auth')
const bearerAuth = require('../middleware/bearer-auth')
const acl = require('../middleware/accessControlList')
const Role = require('../models/roles')
const User = require('../models/user');
const router = express.Router();

// expects a username and password
// takes the user and password and creates a new user
router.post('/signup', async (req, res, next) => {
  req.body.role = await Role.findOne({ name: req.body.role })
  const newUser = new User(req.body)
  newUser.save()
    .then(user => {
      const token = user.generateToken();
      res.status(201).json({ token });
    })
    .catch(next);
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



router.get('/secret', bearerAuth, acl('read'), (req, res, next) => {
  // horses.push(req.body) 
  // res.json(req.body)
})


router.post('/secret', bearerAuth, acl('create'), (req, res, next) => {
  const { username } = req.user;
  res.status(200).json({ username });
})




module.exports = router;