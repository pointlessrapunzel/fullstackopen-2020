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
    const blog = new Blog(req.body)
    if (!blog.likes) blog.likes = 0
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
  } catch(e) { next(e) }
})

module.exports = blogsRouter