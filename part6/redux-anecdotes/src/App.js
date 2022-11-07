import { useSelector, useDispatch } from 'react-redux'
import {createAnecdote,addVote} from './reducers/anecdoteReducer.js'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList.js'
import FilterForm  from './components/FilterForm.js'
const App = () => {
 
  return (
    
    <div>
      <FilterForm/>
      <AnecdoteList/>
      <AnecdoteForm/>
      
    </div>
  )
}

export default App