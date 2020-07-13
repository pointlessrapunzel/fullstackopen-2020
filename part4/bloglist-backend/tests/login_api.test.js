const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')

beforeAll(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({
    username: 'root',
    name: 'Superuser',
    passwordHash
  })
  await user.save()
})

describe('login', () => {
  test('successful with correct username and password', async () => {
    const reqBody = {
      username: 'root',
      password: 'sekret'
    }

    const response = await api
      .post('/api/login')
      .send(reqBody)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.token).toBeDefined()
  })
  
  test('unsuccessful with incorrect username', async () => {
    const reqBody = {
      username: 'root1',
      password: 'sekret'
    }

    const response = await api
      .post('/api/login')
      .send(reqBody)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('Invalid username')
  })

  test('unsuccessful with invalid password', async () => {
    const reqBody = {
      username: 'root',
      password: 'sekkret'
    }

    const response = await api
      .post('/api/login')
      .send(reqBody)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('password')
  })
})


afterAll(() => {
  mongoose.connection.close()
})