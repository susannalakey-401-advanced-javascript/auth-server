const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const SECRET = process.env.SECRET || 'othersecret';
// hash the plain text password before saving to database
const usersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  role: { type: mongoose.Schema.Types.ObjectID, ref: 'Role', autopopulate: true }
})

usersSchema.plugin(require('mongoose-autopopulate'))

usersSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5)
  }
})

// const variable = foo && foo.bar;

// never put password in the token
usersSchema.methods.generateToken = function () {
  const tokenData = {
    id: this._id,
    username: this.username,
    // email: this.email,
    permissions: (this.role && this.role.permissions) || [],
  }
  const expiresIn = 60 * 15;

  return jwt.sign(tokenData, SECRET, { expiresIn })
}

usersSchema.statics.authenticateBasic = function (username, password) {
  return this.findOne({ username }).populate('role') // sticks roles object into the query
    .then(user => user && user.comparePassword(password));
}

// if it matches return the user instance, otherwise return null
usersSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
}

usersSchema.statics.save = async function (record) {
  const { username, email, password, token } = record
  if (this.model('User').find({ username })) {
    return Promise.reject(new Error(`The username ${username} is already taken.`));
  } else {
    const cryptedPassword = await bcrypt.hash(password, 5);
    usersSchema.save({ username, email, password: cryptedPassword, token });
    return record;

  }
}

usersSchema.statics.list = function () {
  return this.model('User').find({});
}

usersSchema.statics.authenticateToken = function (token) {
  const tokenObject = jwt.verify(token, SECRET)
  if (!tokenObject.username) {
    return Promise.reject(new Error('Token does not compute'));
  }
  return this.findOne({ username: tokenObject.username });
}

// methods are for an instance of user
// statics are for User
// keeps database logic in database models
// keep application logic in applications

module.exports = mongoose.model('User', usersSchema)

