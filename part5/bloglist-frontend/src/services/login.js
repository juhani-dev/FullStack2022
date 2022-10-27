import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const getLogin = async (username,password) => {
  console.log(username,password,"what bout thi")
  const response = await axios.post(baseUrl,username,password)
  return (response.data)
}

export default { getLogin }