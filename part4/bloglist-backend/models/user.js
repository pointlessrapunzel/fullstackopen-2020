const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String
})

userSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, returnedObj) => {
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)