const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/',async (request,response) => {
  const blogs = await Blog.find({})
        response.json(blogs)
      
  })
  
  blogsRouter.post('/',async (request, response) => {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
      if(!blog.url || !blog.title){
        
        response.status(400).end()
      }
      else if (!blog.likes){
            await Blog.findByIdAndUpdate(blog.id,{likes: 0})
            const savedBlogFinal = await blog.save()
            response.status(201).json(savedBlogFinal)
        } 
        else{
        response.status(201).json(savedBlog)}
      
  })

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
blogsRouter.put('/:id', async (request, response) => {
  const newLikes =await request.body.likes
  await Blog.findByIdAndUpdate(request.params.id,{likes: newLikes})
  response.status(201).end()
})


  module.exports = blogsRouter