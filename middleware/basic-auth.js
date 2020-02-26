const base64 = require('base-64')
const Users = require('../models/users')
// const users = new Users();





function basicAuth(req, res, next) {
  // check if we have an authorization header
  if (!req.headers.authorization) {
    next(new Error('No Authorization Header Found'));
  }


  // split gives you ["basic", "awefewaf"]
  // pop gives you "awefewaf"
  const basic = req.headers.authorization.split(' ').pop()
  const decoded = base64.decode(basic); // gives us "username:password"
  const [username, password] = decoded.split(':'); // split on ':' 


  Users.authenticateBasic(username, password)
    .then(_validate)

  function _validate(username) {
    if (username) {
      req.user = username;
      req.token = username.generateToken()
      next()
    } else {
      next(new Error('SOmething broke'))
    }
  }
}

module.exports = basicAuth;