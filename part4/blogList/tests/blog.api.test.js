const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

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
    let blogObject = new Blog(testBlogsList[0])
    await blogObject.save()
    blogObject = new Blog(testBlogsList[1])
    await blogObject.save()
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
    expect(response.body).toHaveLength(2)
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
            likes: 4
    }
    await api
        .post('/api/blogs')
        .send(blogPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const finalDb = await api.get('/api/blogs')
   
    expect(finalDb.body).toHaveLength(initialDb.body.length+1)
    expect(finalDb.body[2].title).toBe("indiana")

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
            .expect(201)
            .expect('Content-Type', /application\/json/)

        
            
        const responseFinal = await api.get('/api/blogs')    
        expect(responseFinal.body[2].likes).toBe(0)
})

test('no url or no title returns 400 Bad Request', async () =>  {
    const blogPost = {
        author: "jones",
        likes: 34       ,
        url:"mobis" 
}
        await api
            .post('/api/blogs')
            .send(blogPost)
            .expect(400)
            
})
test('test delete works', async () => {
    const blogs = await api.get('/api/blogs')
    const blogId =blogs.body[0].id
    await api
        .delete(`/api/blogs/${blogId}`)
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
        .send(blogPost)
        .expect(201)

    const blogsFinal = await api.get('/api/blogs')
    const updateBlogFinal = blogsFinal.body[0]
    const finalLikes = updateBlogFinal.likes
    expect(finalLikes).toBe(1001)
        
    
})

afterAll(() => {
  mongoose.connection.close()
})