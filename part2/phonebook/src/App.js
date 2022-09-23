
import { useState, useEffect } from 'react'


import personService from './services/persons'
import {Button} from './components/addPersonForm'
import {AddForm} from './components/addPersonForm'
import { PersonsShowTwo } from './components/addPersonForm'
import {CheckName, CheckNumber, FindId} from'./services/searchPersons'
import {AddPersonNew,HandleDelete,HandleNewPerson,HandleNumberUpdate}from './components/manipulatePhonebook'



const FilterList =({search,onChange})=>{
  return(
      <div>
      filter numbers: 
      <input
      value={search}
      onChange={onChange}/>
      </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search,setNewSearch]= useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(responseNotes=> {
        console.log('promise fulfilled')
        setPersons(responseNotes)
      })
  }, [])

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
    
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterList
          filter={search} 
          onChange={handleSearchChange}/>
       
      <h2>Numbers</h2>
    
     <PersonsShowTwo 
     persons={persons} 
     search={search} 
     setPersons={setPersons}  
     HandleDelete={HandleDelete}/>

    <h2>Add new number</h2>
    <AddForm
    onSubmit={(event)=>AddPersonNew(event,persons,newName, newNumber,setPersons,setNewName)}
    newNumber={newNumber}
    onNumberChange={handleNumberChange}
    newName={newName}
    onNameChange={handleNameChange}
    />   
     
    
    </div>
    
  )
}


export default App