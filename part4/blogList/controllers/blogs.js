const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
blogsRouter.get('/',async (request,response) => {
  const blogs = await Blog.find({}).populate('user',{name:1,username:1,id:1})
        response.json(blogs)
      
  })
  
  blogsRouter.post('/',async (request, response) => {
    const body = request.body
    const getFirst = await User.find({})
    const getFirstUser = getFirst[0]
    const user =getFirstUser.id

    console.log(getFirstUser,"this")
    console.log(user,"user")
    const blog= new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,

    })
    
    await blog.save()
    
      if(!blog.url || !blog.title){
        
        response.status(400).end()
      }else if (!blog.likes){
        console.log(blog,"blogid")
       
        
       let savedBlogFinal= await Blog.findByIdAndUpdate(blog._id,{likes: 0},{new:true})
      
        
       getFirstUser.blogs = getFirstUser.blogs.concat(savedBlogFinal._id.toString())
        response.status(201).json(savedBlogFinal)
      }
      
        else{
          console.log(getFirstUser.blogs,"look here")
          const savedBlog = await blog.save()
          getFirstUser.blogs = getFirstUser.blogs.concat(savedBlog._id.toString())
          await getFirstUser.save()
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