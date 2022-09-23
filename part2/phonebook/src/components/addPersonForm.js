export const Button =(props)=>(
    <button onClick={props.onClick} type ={props.type} value={props.value}>
      {props.text}
    
    </button>
  )

  export const AddForm=(props)=>(
    <form onSubmit={props.onSubmit}>
       number: <input value={props.newNumber}
       onChange={props.onNumberChange} />
        name: <input value ={props.newName}
        onChange={props.onNameChange}   />
         <Button type="submit" text="add"/>
    </form>
  )

export const PersonsShowTwo=({persons,search,setPersons,HandleDelete})=>{
    const personToShow =  persons.filter(person => person.name.includes(search))
  
  return (
    <ul>
        {personToShow.map(note => <li key ={note.name}>
          {note.name} {note.number}  {" "}
          <Button text="delete" value={note.id} onClick={e=>HandleDelete(e.target.value,note.name,{setPersons,persons})}/>
          </li>)}
      </ul>
  )
}


  