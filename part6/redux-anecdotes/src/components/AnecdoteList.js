import { useSelector, useDispatch } from 'react-redux'
import  Notification  from './Notification'
import { addVotes } from '../reducers/anecdoteReducer'

import { setNotification } from '../reducers/messageReducer'
const AnecdoteList = () => {
    const filterLine = useSelector(state => state.filter)
    const anecdotes = useSelector(state => {
        
        if ( state.filter === 'zero' ) {
          return state.anecdotes
        }   
            return state.anecdotes.filter(line => line.content.includes(filterLine))
        })
    
  
    const dispatch = useDispatch()
    const vote = (anecdote) => {
      dispatch(addVotes(anecdote))
     
       dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
        
      }
    return (
        <div>
        
        <h2>Anecdotes</h2>
        <Notification/>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
        </div>
    )
}
export default AnecdoteList