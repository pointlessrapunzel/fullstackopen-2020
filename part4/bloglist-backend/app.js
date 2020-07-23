const express = require('express')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

logger.info(`connecting to database at ${config.MONGODB_URI}`)
mongoose.connect(config.MONGODB_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useFindAndModify: true,
    useCreateIndex: true 
  })
  .then(() => {
    logger.info(`successfully connected to the database at ${config.MONGODB_URI}`)
  })
  .catch(e => logger.error('Error connecting to the database:', e))

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testRouter = require('./controllers/testing')
  app.use('/api/testing', testRouter)
}

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app