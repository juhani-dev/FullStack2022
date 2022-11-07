import { useDispatch } from 'react-redux'
import anecdoteService from '../services/Anecdotes'
import { createAnecdote,addCreateObject } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const create = async (event) => {
        event.preventDefault()
       
        //anecdoteService.addAnecdote(addObject(event.target.newAnecdote.value))
        dispatch(addCreateObject(event.target.newAnecdote.value))
        
      }
    return(
    <div>
      
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input 
        name='newAnecdote'
        
        /></div>
        <button type='submit'>create</button>
      </form>
      </div>
    )
}
export default AnecdoteForm