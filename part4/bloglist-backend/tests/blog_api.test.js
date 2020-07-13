const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const User = require('../models/user')

beforeAll(async () => {
  await helper.createInitialUsersInDb()
})

beforeEach(async () => {
  await helper.initDbForTest()
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

describe('addition of a new blog', () => {

  test('is successful when it is valid and the user is authorized', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'New Author',
      url: 'new url',
      likes: 1,
    }

    const loginResponse = await helper.loginDummyUser(api)
    const token = loginResponse.body.token

    const savedBlog = await api.post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
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

    const loginResponse = await helper.loginDummyUser(api)
    const token = loginResponse.body.token

    const savedBlog = await api.post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)

    const blogsAtEnd = await helper.getBlogsFromDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    expect(blogsAtEnd.find(b => b.title === 'New Blog').likes).toBe(0)
  })

  test('is unsuccessful, when it does not have a title or url, server responds with 400', async () => {
    const newBlog = {
      author: 'New Author'
    }

    const token = await api
      .post('/api/login')
      .send({
        username: 'root',
        password: 'Supersekkret'
      })

    const savedBlog = await api.post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
    
    const blogsAtEnd = await helper.getBlogsFromDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('is unsuccessful when unauthorized', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'New Author',
      url: 'new url',
      likes: 1,
    }

    const savedBlog = await api.post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.getBlogsFromDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('is successful with status code 204, if id is valid', async () => {
    const blogsAtStart = await helper.getBlogsFromDb()
    const blogToDelete = blogsAtStart[0]

    const loginResponse = await helper.loginDummyUser(api)
    const token = loginResponse.body.token

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.getBlogsFromDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    expect(blogsAtEnd.map(b => b.title)).not.toContain(blogToDelete.title)
  })

  test('is unsuccessful with status code 401 when user is not authorized', async () => {
    const blogsAtStart = await helper.getBlogsFromDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)

    const blogsAtEnd = await helper.getBlogsFromDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    expect(blogsAtEnd.map(b => b.title)).toContain(blogToDelete.title)
  })
})

describe('updating a blog', () => {
  test('is successful with a valid id and data, when updating likes', async () => {
    const blogsAtStart = await helper.getBlogsFromDb()
    const blogToLike = blogsAtStart[0]

    blogToLike.likes++

    const response = await api
      .put(`/api/blogs/${blogToLike.id}`)
      .send(blogToLike)
      .expect(200)

    expect(response.body.likes).toBe(blogToLike.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})