


export const CheckName=(persons,newName)=>(
persons.find(element => element.name === newName)
    )
export const CheckNumber=(persons,newNumber)=>(
    persons.find(element => element.number === newNumber)
  )
export const FindId=(persons,newName)=>(
    persons.find(element =>element.name === newName).id
        
)