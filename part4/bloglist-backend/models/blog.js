const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, obj) => {
    delete obj._id
    delete obj.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)