import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',number:'ddd' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
    number: newNumber
  }
setPersons(persons.concat(person))
  

}
else {alert(JSON.stringify(newName+" is already added to the phonebook"))}
setNewName('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      
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
        {persons.map(note => <li key ={note.name}>
          {note.name} {note.number}</li>)}
      </ul>
      
      
    </div>
    
  )
}


export default App