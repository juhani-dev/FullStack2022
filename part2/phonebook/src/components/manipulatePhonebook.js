import { CheckName,CheckNumber,FindId } from "../services/searchPersons"
import personService from '../services/persons'

export const AddPersonNew=(event,persons,newName,newNumber,setPersons,setNewName)=>{
    event.preventDefault()
  
    if ( CheckName(persons,newName) ){
      let id =FindId(persons,newName)
      HandleNumberUpdate(id,newName,newNumber,setPersons,persons)
      
    }else if (CheckNumber(persons,newNumber)){
      alert("this number is already in the phonebook")
      
    }else{
      HandleNewPerson(newName,newNumber,setNewName,setPersons,persons)
      
    }
  
  
  }
  
export const HandleNewPerson =(newName,newNumber,setNewName,setPersons,persons)=>{
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
      setNewName('')
      
  
  }
export const HandleNumberUpdate=(id,name,number,setPersons,persons)=>{
    
    if (window.confirm("update "+name+" number?")) {
    personService
    .update(id,name,number)
    .then(responseData =>{
      setPersons(persons.map(line => line.id !==id ?line:responseData  ))
    })
    .catch(error => {
      alert("This person is deleted\n"+error.name)
      
    })
    }
  
  }
export const HandleDelete=(e,name,{persons,setPersons})=>{
    
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
