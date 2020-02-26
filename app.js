// Third-party resources
require('dotenv').config()
const express = require('express')
const usersRouter = require('./routes/usersRouter')
const cors = require('cors')
const morgan = require('morgan');

const app = express()

// App-level middleware
app.use(express.json())
app.use(morgan('dev'));
app.use(cors());

// Routes
app.use(usersRouter)

// Catch-Alls
const notFound = require('./middleware/notFound');
app.use(notFound)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = {
  server: app,
  start: function (port) {
    app.listen(port, () => {
      console.log(`Listening to port at ${port}`);
    });
  },
};