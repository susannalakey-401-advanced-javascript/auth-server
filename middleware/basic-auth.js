const base64 = require('base-64')
const User = require('../models/user')
// const users = new Users();


function basicAuth(req, res, next) {
  if (!req.headers.authorization) {
    next(new Error('No Authorization Header Found'));
  }

  // split gives you ["basic", "awefewaf"]
  // pop gives you "awefewaf"
  const basic = req.headers.authorization.split(' ').pop()
  const decoded = base64.decode(basic); // gives us "username:password"
  const [username, password] = decoded.split(':'); // split on ':' 


  User.authenticateBasic(username, password)
    .then(user => _validate(user))
    .catch(err => {
      next(err);
    })

  function _validate(user) {
    if (user) {
      req.user = user;
      req.token = user.generateToken();
      next();
    } else {
      next(new Error('Something broke'))
    }
  }
}

module.exports = basicAuth;