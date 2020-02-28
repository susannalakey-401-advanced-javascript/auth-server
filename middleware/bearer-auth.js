const User = require('../models/user');

function bearerAuth(req, res, next) {
  if (!req.headers.authorization) {
    next(new Error('No authorization header'))
  } else {
    const token = req.headers.authorization.split(' ').pop();

    User.authenticateToken(token)
      .then(validUser => {
        req.user = validUser;
        req.token = user.generateToken();
        next()
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = bearerAuth;