
import {connect} from 'react-redux'

import { addCreateObject } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    
    const create = async (event) => {
        event.preventDefault()
        props.addCreateObject(event.target.newAnecdote.value)
        event.target.newAnecdote.value = ''
        
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
const mapDispatchToProps =  {

    addCreateObject,
    
  
}
const ConnectedAnecdoteForm = connect(null,mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
