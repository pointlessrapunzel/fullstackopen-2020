const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const mongoose = require('mongoose')

const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    const newBlog = new Blog(blog)
    await newBlog.save()
  }

})

describe('when there are initially blogs in the db', () => {
  test('all blogs are returned as json', async () => {
    const response = 
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the unique identifier of the blogs is named id, not _id', async () => {
    const response = 
      await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).toBeUndefined()
  })
})

describe('a new blog', () => {

  test('when valid, is successfully added', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'New Author',
      url: 'new url',
      likes: 1,
    }

    const savedBlog = await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.getBlogsFromDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd.map(b => b.title)).toContain('New Blog')
  })

  test('is added, but if the likes property is missing, defaults it to 0', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'New Author',
      url: 'new url',
    }

    const savedBlog = await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.getBlogsFromDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    expect(blogsAtEnd.find(b => b.title === 'New Blog').likes).toBe(0)
  })

  test('is not added, when invalid (no title or url), server responds with 400', async () => {
    const newBlog = {
      author: 'New Author'
    }

    const savedBlog = await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)
    
    const blogsAtEnd = await helper.getBlogsFromDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})