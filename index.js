require('dotenv').config();
const mongoose = require('mongoose');

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,  // fixed an issue that was crashing the server
};

const { MONGODB_URI, PORT } = process.env;


// used an immediately executing function to allow for a try/catch 
(async () => {
  try {
    await mongoose.connect(MONGODB_URI, mongooseOptions);

    const server = require('./app');

    server.start(PORT);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
