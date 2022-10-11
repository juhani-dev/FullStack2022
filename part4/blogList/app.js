
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter =require('./controllers/blogs')
const userRouter =require('./controllers/users')


const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use('/api/blogs',blogsRouter)
app.use('/api/users', userRouter)


module.exports = app