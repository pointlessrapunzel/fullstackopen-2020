const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

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

const initialUsers = [
  {
    username: 'root',
    name: 'Superuser',
    password: 'Supersekkret'
  },
  {
    username: 'dummy',
    name: 'Dummy User',
    password: 'Dummypassword'
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

const createUserObject = async user => {
  user.passwordHash = await bcrypt.hash(user.password, 10)
  return new User(user)
}

const createInitialUsersInDb = async () => {
  await User.deleteMany({})

  const userObjects = await Promise.all(
    initialUsers.map(u => createUserObject(u))
  )
  
  await Promise.all(userObjects.map(u => u.save()))
}

const initDbForTest = async () => {
  await Blog.deleteMany({})

  const user = await User.findOne({ username: initialUsers[1].username })

  for (let blog of initialBlogs) {
    const newBlog = new Blog({
      ...blog,
      user: user._id
    })
    await newBlog.save()
  }
}

const loginDummyUser = async (api) => {
  return await api
    .post('/api/login')
    .send({
      username: initialUsers[1].username,
      password: initialUsers[1].password
    })
}

module.exports = { 
  initialBlogs, 
  getBlogsFromDb, 
  getUsersFromDb, 
  initialUsers,
  createInitialUsersInDb,
  initDbForTest,
  loginDummyUser
}