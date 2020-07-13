const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  { _id: "5a422b3a1b54a676234d17f9", 
    title: "Canonical string reduction", 
    author: "Edsger W. Dijkstra", 
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 
  },
  { _id: "5a422ba71b54a676234d17fb", 
    title: "TDD harms architecture", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
    likes: 0, __v: 0 
  }
]

const getBlogsFromDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const getUsersFromDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = { initialBlogs, getBlogsFromDb, getUsersFromDb }