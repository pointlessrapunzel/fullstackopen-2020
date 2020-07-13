const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')

beforeAll(async () => {
  await helper.createInitialUsersInDb()
})

describe('login', () => {
  test('successful with correct username and password', async () => {
    const reqBody = {
      username: helper.initialUsers[0].username,
      password: helper.initialUsers[0].password
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