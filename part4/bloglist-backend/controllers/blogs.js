const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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
  const user = await User.findOne({})
  try {
    if (!body.title || !body.url) {
      return res.status(400).send({ error: 'Missing title or url' })
    }

    const blog = new Blog({
      ...body,
      user: user._id
    })

    if (!blog.likes) blog.likes = 0
    const savedBlog = await blog.save()
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