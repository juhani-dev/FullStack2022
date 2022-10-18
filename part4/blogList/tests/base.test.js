const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({
      username: 'testuser',
      name: 'testuser',
      passwordHash
    })
    await user.save()
    const token = { username: user.username, id:user.id }
    auth = jwt.sign(token, process.env.SECRET)
   

    const newBlog = {
        title: 'blog to be added',
        author: 'Kim',
        url: 'http://www.tobeadded.com/',
        likes: 1
      }
  
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${auth}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  

  })

describe("api tests",() => {
test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('post adds blog to db', async () => {
    const initialDb = await api.get('/api/blogs')
    
    const blogPost = {
        
            title: "indiana",
            author: "jones",
            url: "movies",
            likes: 4,
        
    }
    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${auth}`)
        .send(blogPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const finalDb = await api.get('/api/blogs')
   
    expect(finalDb.body).toHaveLength(initialDb.body.length+1)
    expect(finalDb.body[1].title).toBe("indiana")

})
test('id is there', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    
})
})
