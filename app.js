// Third-party resources
require('dotenv').config()
const express = require('express')
const usersRouter = require('./api/usersRouter')


const app = express()

// App-level middleware
app.use(express.json())


// Routes
app.use(usersRouter)


module.exports = {
  server: app,
  start: function (port) {
    app.listen(port, () => {
      console.log(`Listening to port at ${port}`);
    });
  },
};