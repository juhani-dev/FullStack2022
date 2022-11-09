import { useSelector, useDispatch } from 'react-redux'
import  Notification  from './Notification'
import { addVote,addVotes } from '../reducers/anecdoteReducer'
import { newMessage,zeroMessage} from '../reducers/messageReducer'
import anecdoteService from '../services/Anecdotes'
import { setNotification ,timer} from '../reducers/messageReducer'
const AnecdoteList = () => {
    const filterLine = useSelector(state => state.filter)
    const anecdotes = useSelector(state => {
        
        if ( state.filter === 'zero' ) {
          return state.anecdotes
        }   
            return state.anecdotes.filter(line => line.content.includes(filterLine))
        })
    
    console.log(anecdotes,'map this')
    const dispatch = useDispatch()
    const vote = (anecdote) => {
      dispatch(addVotes(anecdote))
      //anecdoteService.addVote(anecdote)
       // dispatch(addVote(anecdote.id))
       dispatch(timer(`you voted '${anecdote.content}'`, 5))
       //dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
       /* dispatch(newMessage(anecdote.content))
        setTimeout(() => {
            dispatch(zeroMessage(null))
    
          }, 2000)*/
    
    
        
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