const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken')

const { info, error } = require('./utils/logger')
const { MONGODB_URI } = require('./utils/config')

const blogsRouter = require('./controllers/blogs')
// const userRouter = require('./controller/users')
// const loginRouter = require('./controller/login')

// const User = require('./models/user')

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
// app.use(middleware)

app.use('/api/blogs', blogsRouter)
// app.use('/api/users', usersRouter)
// app.use('/api/login', loginRouter)

module.exports = app