const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, url: 1, author: 1 })
  res.json(users)
})

usersRouter.post('/', async (req, res, next) => {
  const body = req.body

  const password = body.password

  try {
    if (password.length < 3) {
      return res.status(400).json({
        error: 'invalid password'
      })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch(e) { next(e) }
})

module.exports = usersRouter