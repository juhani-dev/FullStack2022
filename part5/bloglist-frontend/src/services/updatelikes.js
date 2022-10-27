import axios from 'axios'


const baseUrl = 'http://localhost:3003/api/blogs'

const update = async (likes,id) => {

  const blogUrl =baseUrl+"/"+id
  let newLikes=likes+1
  let bodyLikes ={ likes:newLikes }
  const response = await axios.put(blogUrl,bodyLikes,{ new:true })
  console.log(response.data,'datares')
  return response.data
}
export default { update }