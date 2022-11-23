import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/Anecdotes'


const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}



const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:[],
  reducers: {
    createAnecdote(state, action) {
      const content = asObject(action.payload)
      state.push(content)
       
    },
    addObject(state,action) {
      state.push(action.payload)

    },
    addVote(state,action) {
      const findAnecdote = state.find(n => n.id === action.payload)
      const plus = findAnecdote.votes+=1
      const votePlus = {...findAnecdote,votes:plus}
      state.map(line => line.id !== action.payload ? line : votePlus)
      state.sort(function(a, b){return b.votes - a.votes})
      
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  
  }
})

export const {createAnecdote,addVote,addFilter,addObject,setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const addCreateObject = (content) => {
  const fullLine = asObject(content)
  return async dispatch => {
    const line = await anecdoteService.addAnecdote(fullLine)
    dispatch(addObject(line))
  }
  
}
export const addVotes = (content) => {
  return async dispatch => {
    const line = await anecdoteService.addVote(content)
    dispatch(addVote(line.id))
  }
}
export const initAnecdotes = () => {
  return async dispatch => {
    const line = await anecdoteService.getAll()
    dispatch(setAnecdotes(line)) 
  }
}


