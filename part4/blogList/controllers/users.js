const userRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')


userRouter.get('/', async (request,response) => {
    const users = await User.find({}).populate('blogs',{author:1,title:1,likes:1})
    response.json(users)
})
userRouter.post('/',async (request,response) => {
    
    const { username, name, password } = request.body
    const users =await User.findOne({username})
   
    if (!username || !password){
        response.status(400).send({error:"Password or username missing"})
    }
    else if (username.length < 4 || password.length < 4){
        response.status(400).send({error:"password or username too short"})
    }
    else if (users){
        response.status(400).send({error: "user name is already taken"})
    }
    else{
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      username,
      name,
      passwordHash,
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
}
})


module.exports = userRouter