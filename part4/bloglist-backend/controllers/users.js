const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, url: 1, likes: 1, author: 1 })
  res.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (req, res, next) => {
  const { password, name, username } = req.body

  try {
    if (!password || password.length < 3) {
      return res.status(400).json({
        error: 'password must be at least 3 characters'
      })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({
      username, name,
      passwordHash
    })

    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch(e) { next(e) }
})

module.exports = usersRouter