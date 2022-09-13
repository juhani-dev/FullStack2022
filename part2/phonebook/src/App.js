import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',number:'ddd',id:1 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search,setNewSearch]= useState('')

 
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
  const addPerson = (event) => {
    event.preventDefault()
    let check = false
    persons.forEach((element) =>{      

      if (JSON.stringify(element.name)===JSON.stringify(newName))   {
  
       check =true
    }
      
  })
  if (!check){
  const person ={
    name: newName,
    number: newNumber,
    id:persons.length+1
  }
setPersons(persons.concat(person))
  

}
else {alert(JSON.stringify(newName+" is already added to the phonebook"))}
setNewName('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        
        filter list: <input value={search} onChange={handleSearchChange}/>
      </div>
      <h2>add new</h2>
      <form  onSubmit={addPerson}>
        <div>
        number :<input value={newNumber} onChange={handleNumberChange}
        />
        <br></br>
        name :<input value={newName} 

        onChange={handleNameChange}
        />
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
     
        <ul>
        {personToShow.map(note => <li key ={note.name}>
          {note.name} {note.number} </li>)}
      </ul>
      
      
    </div>
    
  )
}


export default App