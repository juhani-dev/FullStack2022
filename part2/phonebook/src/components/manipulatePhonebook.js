import { CheckName,CheckNumber,FindId } from "../services/searchPersons"
import personService from '../services/persons'

export const AddPersonNew=(event,persons,newName,newNumber,setPersons,setNewName,setMessage,setErrorMessage)=>{
    event.preventDefault()
    
    
    if ( CheckName(persons,newName) ){
      let id =FindId(persons,newName)
      HandleNumberUpdate(id,newName,newNumber,setPersons,persons,setMessage,setErrorMessage)
      
    }else if (CheckNumber(persons,newNumber)){
      
      alert("this number is already in the phonebook")
      
    }else{
      HandleNewPerson(newName,newNumber,setNewName,setPersons,persons,setMessage,setErrorMessage) 
    }
  }
  
export const HandleNewPerson =(newName,newNumber,setNewName,setPersons,persons,setMessage,setErrorMessage)=>{
    const personObject ={
      name: newName,
      number: newNumber,
      
      }
      personService
      .create(personObject)
      .then(responseNotes => {
        setPersons(persons.concat(responseNotes))
       setNewName('')
      
      
      setMessage(
        `${newName} was added to the phonebook`
      )
      
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })  
    .catch(error => {
      console.log(error.response.data.error)
      setErrorMessage(error.response.data.error)
      setTimeout(()=>{
          setErrorMessage(null)
      },5000
      )
    })
      
  
  }
export const HandleNumberUpdate=(id,name,number,setPersons,persons,setMessage,setErrorMessage)=>{
  const person = persons.find(n => n.id === id)
    const changedPerson = { ...person, number: number}

  
    if (window.confirm("update "+name+" number?")) {
      
    personService
    .update(id,number)
    .then(() =>{     
      setPersons(persons.map(line => line.id !== id ? line:changedPerson))
      setMessage(
        `${name}'s number was updated to ${number}`
      )
      
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
    .catch(error => {
      setErrorMessage(error.response.data.error)
      setTimeout(()=>{
          setErrorMessage(null)
      },5000
      )
    })
    
   
    }
   
  
  }
export const HandleDelete=(e,name,{persons,setPersons,setErrorMessage,setMessage})=>{
  
    if (window.confirm("Delete "+name+"?")){
      console.log(e);
      personService
      .remove(e)
      .then(() =>{
        setPersons(persons.filter(person =>person.id != e))
        setMessage(
            `deletion success`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(person =>person.id != e))
      })
   
       
    }  
    }
