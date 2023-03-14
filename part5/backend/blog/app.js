const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
// const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const jwt = require('jsonwebtoken')

const info = require('./utils/logger').info
const error = require('./utils/logger').error
const MONGODB_URI = require('./utils/config').MONGODB_URI

const blogsRouter = require('./controllers/blogs.js')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const User = require('./models/user')

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    if (result) {
      info('Connected to MongoDB')
    } else {
      error('Failed to connect to MongoDB')
    }
  })

app.use(cors())
app.use(express.json())


const tokenExtractor = (request, response, next) => {
  if (!request.headers['authorization']) return next()

  const authorization = request.get('Authorization')
  const token = authorization.substring(7)
  request.token = token

  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token
  if (!token) return next()

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Invalid token' })
  }

  const tokenUserId = decodedToken.id

  const user = await User.findById(tokenUserId)

  request.user = user

  // console.log(user);

  next()
}

app.use(tokenExtractor)
app.use(userExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', userExtractor, blogsRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

module.exports = app