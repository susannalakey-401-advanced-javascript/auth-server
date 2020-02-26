const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// has the plain text password before saving to database
const usersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  email: { type: String },
  role: { type: String, required: true, default: 'user', enum: ['admin', 'user'] }
})

usersSchema.methods.generateToken = () => {
  return jwt.sign({ username: this.username, email: this.email }, process.env.SECRET)
}
mongoose.model('User', usersSchema);

usersSchema.statics.authenticateBasic = async (username, password) => {
  const user = this.model('User').find({ username });
  if (!user) {
    return Promise.reject(new Error('That user does not exist. Please try again.'))
  } else {
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return user;
    } else {
      return Promise.reject(new Error('Incorrect password'));
    }
  }
}


usersSchema.statics.save = async (record) => {
  const { username, email, password } = record
  if (this.model('User').find({ username })) {
    return Promise.reject(new Error(`The username ${username} is already taken.`));
  } else {
    const cryptedPassword = await bcrypt.hash(password, 5);
    usersSchema.save({ username, email, password: cryptedPassword });
    return record;

  }
}


usersSchema.statics.list = async () => {
  return this.model('User').find({});
}


module.exports = mongoose.model('User', usersSchema)

