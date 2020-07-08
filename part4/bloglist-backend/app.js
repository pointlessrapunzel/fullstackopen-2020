const express = require('express')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

logger.info(`connecting to database at ${config.MONGODB_URI}`)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
logger.info(`connected to database at ${config.MONGODB_URI}`)

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)

module.exports = app