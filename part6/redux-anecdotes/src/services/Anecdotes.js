import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
const addAnecdote = async (content) => {
    const response = await axios.post(baseUrl,content)
    return response.data
}
const addVote = async (anecdote) => {
    
    let url = baseUrl+'/'+anecdote.id 
    let vote = anecdote.votes+1
    const response = await axios.put(url,{content:anecdote.content, votes:vote },{new:true})
   
    return response.data
}
export default { getAll,addAnecdote,addVote }