const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res, next) => {

  try {
    const blogs = await Blog.find({})
    res.json(blogs)
  } catch(e) { next(e) }
})

blogsRouter.post('/', async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.url) {
      return res.status(400).send({ error: 'Missing title or url' })
    }
    const blog = new Blog(req.body)
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

module.exports = blogsRouter