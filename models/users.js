const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// hash the plain text password before saving to database
const usersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  email: { type: String },
  role: { type: String, required: true, default: 'user', enum: ['admin', 'user'] }
})

usersSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5)
  }
})

// never put password in the token
usersSchema.methods.generateToken = function () {
  // jwt.sign(token data, secret);
  const SECRET = process.env.SECRET || 'othersecret';
  return jwt.sign({ username: this.username, email: this.email }, SECRET)
}


usersSchema.statics.authenticateBasic = function (username, password) {
  this.findOne({ username })
    .then(result => result && result.comparePassword(password))
    .catch(console.error);
}



// if it matches return the user instance, otherwise return null
usersSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
}



usersSchema.statics.save = async function (record) {
  const { username, email, password } = record
  if (this.model('User').find({ username })) {
    return Promise.reject(new Error(`The username ${username} is already taken.`));
  } else {
    const cryptedPassword = await bcrypt.hash(password, 5);
    usersSchema.save({ username, email, password: cryptedPassword });
    return record;

  }
}

usersSchema.statics.list = async function () {
  const allUsers = this.model('User').find({});
  res.status(200).json(allUsers)
}

// methods are for an instance of user
// statics are for User
// keeps database logic in database models
// keep application logic in applications

module.exports = mongoose.model('User', usersSchema)

