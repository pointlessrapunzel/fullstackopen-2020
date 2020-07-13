const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })
    res.json(blogs)
  } catch(e) { next(e) }
})

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body

  if (!body.title || !body.url) {
    return res.status(400).json({ error: 'Missing title or url' })
  }

  const token = req.token

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!(token && decodedToken.id)) {
      throw new jwt.JsonWebTokenError('Token is invalid')
    }

    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      ...body,
      user: user._id
    })

    user.blogs = user.blogs.concat(blog._id)

    if (!blog.likes) blog.likes = 0
    const savedBlog = await blog.save()
    await user.save()
    res.status(201).json(savedBlog)
  } catch(e) { next(e) }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch(e) { next(e) }
})

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedBlog)
  } catch(e) { 
    console.error(e)
    next(e) }
})

module.exports = blogsRouter