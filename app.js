// Third-party resources
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan');
const app = express()

// update paths
const productsRouter = require('./routes/productsRouter.js');
const categoriesRouter = require('./routes/categoriesRouter.js');

// App-level middleware
app.use(express.json())
app.use(morgan('dev'));
app.use(cors());

// Routes
const usersRouter = require('./routes/usersRouter')
app.use(usersRouter)
const rolesRouter = require('./routes/rolesRouter');
app.use(rolesRouter);
app.use(productsRouter);
app.use(categoriesRouter);

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