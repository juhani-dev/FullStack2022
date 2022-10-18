const { response } = require('../app')
const { findById } = require('../models/blog')
const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
const errorHandler = async (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  next(error)
} 

const tokenExtractor = (request,response,next) => {
    const authorization = request.get('authorization')
if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token =authorization.substring(7)
    response.set("authorization",request.token) 
  }
  next()
  
}
const userExtractor = async (request,response,next) => {
  try {
    
  const token = request.token
  tokenDecoded = jwt.verify(token, process.env.SECRET)
    if (!token || !tokenDecoded){
      return response.status(401).json({
        error: 'invalid token'
      })
    }
    else {
  request.user = await User.findById(tokenDecoded.id)
    }
  next()
  } catch(error){
    return next(error)
  }
}
  
module.exports = {
    requestLogger,
    tokenExtractor,
    userExtractor,
    errorHandler,
    unknownEndpoint
}
