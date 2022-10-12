const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const testUserList =[
    {
        name: "simpsons",
        username: "homer",
        password: "qwery"
      },
      {
        name: "star wrs",
        username: "solo",
        password: "space",
        
      },
]
beforeEach(async () => {
  await User.deleteMany({})
  let userObject = new User(testUserList[0])
  await userObject.save()
  userObject = new User(testUserList[1])
  await userObject.save()
})
describe("test user function",() =>{

test("username exists", async () => {
  const user ={
    name: "mike",
    password: "qwery"
  }
    const result =await api
    .post('/api/users')
    .send(user)
    .expect(400)
    
   expect(result.body.error).toContain("Password or username missing") 
})

test("password exists", async () => {
  const user ={
    name: "mike",
    username: "qwery"
  }
    const result =await api
    .post('/api/users')
    .send(user)
    .expect(400)
    
   expect(result.body.error).toContain("Password or username missing") 
})
test("username over 3 characters", async () => {
  const user ={
    name: "mike",
    username:"as",
    password: "qwery"
  }
    const result =await api
    .post('/api/users')
    .send(user)
    .expect(400)
    
   expect(result.body.error).toContain("password or username too short") 
})
test("password over 3 characters", async () => {
  const user ={
    name: "mike",
    username:"asdfg",
    password: "qw"
  }
    const result =await api
    .post('/api/users')
    .send(user)
    .expect(400)
    
   expect(result.body.error).toContain("password or username too short") 
})
test("username is unique", async () => {
  const user ={
    name: "mike",
    username:"solo",
    password: "qwert"
  }
    const result =await api
    .post('/api/users')
    .send(user)
    .expect(400)
    
   expect(result.body.error).toContain("user name is already taken") 
})
}) 
afterAll(() => {
  mongoose.connection.close()
})