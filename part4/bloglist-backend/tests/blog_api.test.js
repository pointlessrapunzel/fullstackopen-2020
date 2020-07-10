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

afterAll(() => {
  mongoose.connection.close()
})