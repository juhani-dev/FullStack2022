import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const addPerson = (event) => {
    event.preventDefault()
    const person ={
      name: newName

    }
    setPersons(persons.concat(person))
    setNewName('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form  onSubmit={addPerson}>
        <div>
          
        </div>
        <div>
        
        name :<input value={newName} 
        onChange={handleNoteChange}
        />
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
     
        <ul>
        {persons.map(note => <li key ={note.name}>
          {note.name}</li>)}
      </ul>
      
      
    </div>
    
  )
}

export default App