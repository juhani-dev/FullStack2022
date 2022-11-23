import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList.js'
import FilterForm  from './components/FilterForm.js'
import { useEffect } from 'react'
import { initAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initAnecdotes()) 
  }, [dispatch]) 
  
  return (
    
    <div>
      <FilterForm/>
      <AnecdoteList/>
      <AnecdoteForm/>
      
    </div>
  )
}

export default App