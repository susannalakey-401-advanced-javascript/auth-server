function errorHandler(err, req, res, next) {
  console.error('SERVER ERROR', err)
  res.status(500).send('Something went wrong!')
}

module.exports = errorHandler;