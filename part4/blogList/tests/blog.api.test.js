const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')
const testBlogsList =[
    {
        title: "simpsons",
        author: "homer",
        url: "televison",
        likes: 3
      },
      {
        title: "star wrs",
        author: "solo",
        url: "space",
        likes:6

      },
]
beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    const testUser = {
        name: "test",
        username: "test",
        password: "test"
        }
    await api
        .post('/api/users')
        .send(testUser)
    
    const result = await api
    .post('/api/login')
    .send(testUser)

     auth = result.body.token
    

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${auth}`)
        .send(testBlogsList[0])
   

  })

describe("api tests",() => {
test('notes are returned as json', async () => {

  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('length of notes', async () => {
    
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(1)
})
})
test('id is there', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    
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
test('likes is there', async () => {
    
    const blogPost = {
        
        title: "indiana",
        author: "jones",
        url: "movies",
        
         
}
        await api
            .post('/api/blogs')
            .send(blogPost)
            .set('Authorization', `Bearer ${auth}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        
            
        const responseFinal = await api.get('/api/blogs')    
        expect(responseFinal.body[1].likes).toBe(0)
})

test('no url or no title returns 400 Bad Request', async () =>  {
    const blogPost = {
        author: "jones",
        likes: 34       ,
        url:"mobis" 
}
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${auth}`)
            .send(blogPost)
            .expect(400)
            
})
test('test delete works', async () => {
    const blogs = await api.get('/api/blogs')
    const blogId =blogs.body[0].id
    await api
        .delete(`/api/blogs/${blogId}`)
        .set('Authorization', `Bearer ${auth}`)
        .expect(204)
}) 

test('test updating likes works', async () => {
    const blogs = await api.get('/api/blogs')
    const blogId = blogs.body[0].id
    const blogPost ={
        title: "simpsons",
        author: "homer",
        url: "televison",
        likes: 1001
    }
    await api
        .put(`/api/blogs/${blogId}`)
        .set('Authorization', `Bearer ${auth}`)
        .send(blogPost)
        .expect(201)

    const blogsFinal = await api.get('/api/blogs')
    const updateBlogFinal = blogsFinal.body[0]
    const finalLikes = updateBlogFinal.likes
    expect(finalLikes).toBe(1001)
        
    
})

test('posting new blog fails with 401 if no token', async () => {
    
    const blogPost = {
        
            title: "indiana",
            author: "jones",
            url: "movies",
            likes: 4,
        
    }
    await api
        .post('/api/blogs')
        .send(blogPost)
        .expect(401)
        .expect('Content-Type', /application\/json/)


})
afterAll(() => {
  mongoose.connection.close()
})