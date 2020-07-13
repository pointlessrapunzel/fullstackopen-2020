const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: { 
    type: String,
    minlength: 3,
    unique: true,
    match: /^([^_])\w*([^_])$/
  },
  name: String,
  passwordHash: String
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, returnedObj) => {
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)