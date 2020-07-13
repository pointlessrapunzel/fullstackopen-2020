const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const test_helper = require('./test_helper')

describe('when there is initially one user saved', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('Supersekret', 10)

    const newUser = new User({
      username: 'root',
      name: 'Superuser',
      passwordHash
    })

    await newUser.save()
  })

  test('a valid user can be added', async () => {
    const usersAtStart = await test_helper.getUsersFromDb()

    const newUser = {
      username: 'newuser1',
      name: 'New User 1',
      password: 'sekkret'
    }

    const savedUser = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await test_helper.getUsersFromDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    expect(usersAtEnd.map(u => u.username)).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})