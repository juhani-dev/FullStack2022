const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/',  async (request,response) => {
  const blogs = await Blog.find({}).populate('user',{name:1,username:1,id:1})
        response.json(blogs)
      
  })
  
  blogsRouter.post('/', middleware.tokenExtractor,middleware.userExtractor, async (request, response) => {
    const body = request.body

  const getFirstUser = request.user
    const blog= new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user:getFirstUser._id
    })
    await blog.save()
      if(!blog.url || !blog.title){
        response.status(400).end()

      }else if (!blog.likes){
       let savedBlogFinal= await Blog.findByIdAndUpdate(blog._id,{likes: 0},{new:true})
       getFirstUser.blogs = getFirstUser.blogs.concat(savedBlogFinal._id.toString())
        response.status(201).json(savedBlogFinal)
      }
      
        else{  
          const savedBlog = await blog.save()
          getFirstUser.blogs = getFirstUser.blogs.concat(savedBlog.id)
          await getFirstUser.save()
        response.status(201).json(savedBlog)}
      
  })

blogsRouter.delete('/:id',middleware.tokenExtractor,middleware.userExtractor, async (request, response) => {  
  
  const BlogUser = await Blog.findById(request.params.id)
  if (!request.user.id || !request.token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  if ( request.user.id === BlogUser.user.toString()){

  response.status(204).end()}
  else{return response.status(401).json({ error: 'this user does not have authority' })}
})

blogsRouter.put('/:id', async (request, response) => {
  const newLikes =await request.body.likes
  await Blog.findByIdAndUpdate(request.params.id,{likes: newLikes})
  response.status(201).end()
})


  module.exports = blogsRouter