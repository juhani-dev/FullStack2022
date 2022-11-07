import { createSlice ,current} from '@reduxjs/toolkit'
import anecdoteService from '../services/Anecdotes'






const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

//const initialState = anecdotesAtStart.map(asObject)

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
      
    }/*,addFilter(state,action) {

     state.filter(line => line.content.includes(action.payload))
  
     // state.filter(line => line.includes(action.payload))
      
      console.log(current(state))
      return state
      
    }*/
  
  }
})

export const {createAnecdote,addVote,addFilter,addObject} =anecdoteSlice.actions
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


/*const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type){
    case 'VOTE':
      
      const findAnecdote = state.find(n => n.id === action.data.id)
      const plus = findAnecdote.votes+=1
      const votePlus = {...findAnecdote,votes:plus}
      const lista = state.map(line => line.id !== action.data.id ? line : votePlus)
      
      lista.sort(function(a, b){return b.votes - a.votes})
      state = lista
      return state
    case 'NEW':
      const newLine =asObject(action.data.content)
      state = state.concat(newLine)
      return state.sort(function(a, b){return b.votes - a.votes})
  default: return state

  }
 
}
export const createAnecdote = (content) => {
  console.log( content,"content")
  return {
    type:'NEW',
    data: {
      content
    }
  }
}

export const addVote = (id) => {
  console.log(id)
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}
export default reducer*/