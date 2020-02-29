function accessControlList(permission) {
  // currying, a function that returns another function
  return function (req, res, next) {
    try {
      if (req.user.role.permissions.includes(permission)) {
        next()
      } else {
        // when you call next with anything other than a request object as the first parameter, 
        // express treats it as an error and shunts it to whichever middleware handles the error 
        // first by having (err, req, res, next)
        // this will drop into errorHandler.js
        // we could call this as next('You shall not pass')
        // or next(new Error('You shall not pass'));
        next(new Error('You shall not pass'));
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = accessControlList;