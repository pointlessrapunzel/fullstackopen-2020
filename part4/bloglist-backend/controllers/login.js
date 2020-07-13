const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRouter.post('/', async (req, res, next) => {
  const body = req.body

  const user = await User.findOne({ username: body.username })
  const isPasswordCorrect = !user
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && isPasswordCorrect)) {
    return res.status(401).json({
      error: 'Invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res.status(200).json({
    token, username: user.username, name: user.name
  })
})

module.exports = loginRouter