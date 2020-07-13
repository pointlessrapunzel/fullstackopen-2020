const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const tokenExtractor = (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (authHeader && authHeader.match(/^bearer/i)) {
    req.token = authHeader.substring(7)
  }
  next()
}

const errorHandler = (e, req, res, next) => {
  logger.error(e.message)

  if (e.name === 'ValidationError') {
    return res.status(400).json({
      error: e.message
    })
  } else if (e.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: e.message
    })
  }

  next(e)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

module.exports = { requestLogger, errorHandler, unknownEndpoint, tokenExtractor }