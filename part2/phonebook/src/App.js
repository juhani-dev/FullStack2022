
import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
const AddPersonForm =({newNumber,handleNumberChange,handleNameChange,newName,setNewName,setPersons,persons})=>{
  
  return(
    <form onSubmit={(event)=>AddPerson(event,persons,newName, newNumber,setPersons,setNewName)} >
      <div>
        number :<input value={newNumber} 
        onChange={handleNumberChange}
        />
        <br></br>
        name :<input value={newName} 
        onChange={handleNameChange}
        />
          <button type="submit">add</button>
        </div>
      </form>
  )
}
const AddPerson = (event,persons,newName, newNumber,setPersons,setNewName) => {
  
  event.preventDefault()
  let check = false
  persons.forEach((element) =>{      
    if (JSON.stringify(element.name)===JSON.stringify(newName))   {
     check =true
  }
  })
  if (!check){
    const personObject ={
      name: newName,
      number: newNumber,
      
      }
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
       setNewName('')
        console.log(response)
      })

    }
    else {alert(JSON.stringify(newName+" is already added to the phonebook"))}
      setNewName('')

}


const PersonsShow =({personToShow})=>{
  return (
    <ul>
        {personToShow.map(note => <li key ={note.name}>
          {note.name} {note.number} </li>)}
      </ul>
  )
}
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
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')
 
  const personToShow =  persons.filter(person => person.name.includes(search))


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
          filter={search} onChange={handleSearchChange}/>
      
      <h2>add new</h2>
     < AddPersonForm  newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}persons={persons} setPersons={setPersons}setNewName={setNewName}/>
      
      <h2>Numbers</h2>
     <PersonsShow personToShow={personToShow} />
              
    </div>
    
  )
}


export default App