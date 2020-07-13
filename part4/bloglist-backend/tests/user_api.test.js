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

  test('a valid user is created', async () => {
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

  describe('a user with a username that', () => {
    test('already exists in the db is not created', async () => {
      const usersAtStart = await test_helper.getUsersFromDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'Supersekkret'
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      
      expect(response.body.error).toContain('`username` to be unique')

      const usersAtEnd = await test_helper.getUsersFromDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('is too short is not created', async () => {
      const usersAtStart = await test_helper.getUsersFromDb()

      const newUser = {
        username: 'ro',
        name: 'Short name user',
        password: 'bad_pass'
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      
      expect(response.body.error).toContain('shorter')

      const usersAtEnd = await test_helper.getUsersFromDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('that has invalid characters is not created', async () => {
      const usersAtStart = await test_helper.getUsersFromDb()

      const newUser = {
        username: '_roo$',
        name: 'Invalid username user',
        password: 'bad_pass'
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      
      expect(response.body.error).toContain('invalid')

      const usersAtEnd = await test_helper.getUsersFromDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })

  describe('a user with a password that', () => {
    test('is too short is not created', async () => {
      const usersAtStart = await test_helper.getUsersFromDb()

      const newUser = {
        username: 'newuser1',
        password: '12'
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(response.body.error).toContain('invalid')

      const usersAtEnd = await test_helper.getUsersFromDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})