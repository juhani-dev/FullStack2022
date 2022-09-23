
import { useState, useEffect } from 'react'


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
  
  let id = 0
  event.preventDefault()
  let check = false
  
  persons.forEach((element) =>{      
   console.log(element.name)
    if (element.name===newName)   {
     check =true
     id = element.id
  }
  })
  if (!check){
    
    const personObject ={
      name: newName,
      number: newNumber,
      
      }
      personService
      .create(personObject)
      .then(responseNotes => {
        setPersons(persons.concat(responseNotes))
       setNewName('')
        console.log(responseNotes,"this")
      })
      
    }
    else {
    HandleNumberUpdate(id,newName,newNumber,setPersons,persons)
      
  }   setNewName('')

}
const HandleNumberUpdate=(id,name,number,setPersons,persons)=>{
  
  if (window.confirm("update "+name+" number?")) {
  personService
  .update(id,name,number)
  .then(responseData =>{
    console.log(responseData)
    setPersons(persons.map(line => line.id !==id ?line:responseData  ))
  })
  .catch(error => {
    alert("This person is deleted\n"+error.name)
    
  })
  }

}
const HandleDelete=(e,name,{persons,setPersons})=>{
  
  if (window.confirm("Delete "+name+"?")){
    personService
    .remove(e)
    .then(() =>{
      setPersons(persons.filter(person =>person.id != e))
    })
    .catch(error => {
      alert("This person is already deleted\n"+error.name)
      setPersons(persons.filter(person =>person.id != e))
    })
        
  }
  
  }



const PersonsShow =({persons,search,setPersons})=>{
  const personToShow =  persons.filter(person => person.name.includes(search))
  
  return (
    <ul>
        {personToShow.map(note => <li key ={note.name}>
          {note.name} {note.number}  {" "}
          <button value={note.id} onClick={e=>HandleDelete(e.target.value,note.name,{setPersons,persons})}>delete</button>
          </li>)}
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
      .then(responseNotes=> {
        console.log('promise fulfilled')
        setPersons(responseNotes)
      })
  }, [])
  console.log('render', persons.length, 'persons')
 
  


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
     <PersonsShow persons={persons} search={search} setPersons={setPersons} />
              
    </div>
    
  )
}


export default App