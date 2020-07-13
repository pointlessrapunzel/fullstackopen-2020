const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

usersRouter.post('/', async (req, res, next) => {
  const body = req.body

  const passwordHash = await bcrypt.hash(body.password, 10)
  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  try {
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch(e) { next(e) }

})

module.exports = usersRouter