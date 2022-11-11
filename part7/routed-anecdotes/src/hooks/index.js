import { useState } from 'react'

export const useField = (type) => {
   
  const [value, setValue] = useState('')
  
   const reset = () => {
    console.log('here we are at reset')
    setValue('')
  }
  const onChange = (event) => {
    console.log(event,'veeret')
    setValue(event.target.value)
  }
return { type,value,onChange,reset}
  
  
}
