const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors') // for removing try catch

const mongoose = require('mongoose')
const config = require('./utils/config')
const { requestLogger, errorHandler, unknownEndpoint, tokenExtractor } = require('./utils/middleware')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')
const { response } = require('express')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(tokenExtractor)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(requestLogger)
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app