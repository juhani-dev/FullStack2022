import axios from "axios"
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newBlog => {
  const auth = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl,newBlog,auth,{ new:true })
  console.log(response.data,"OVERHERE DATA")
  return response.data
}
const remove = async (id) => {
  const auth = {
    headers: { Authorization: token },
  }
  const blogUrl =baseUrl+"/"+id
  console.log(blogUrl)
  const response = await axios.delete(blogUrl,auth)

  return response
}
export default { setToken,create,remove }