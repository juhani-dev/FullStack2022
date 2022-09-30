import axios from "axios";

const baseUrl = "https://blooming-meadow-81882.herokuapp.com/api/persons"

const getAll = () => {
    const request= axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const create = newObject => {
    const request= axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }

  const remove = id => {
    const request= axios.delete(baseUrl+"/"+id)
    
    return request.then(response=>response.data)
  }
  const update = (id,name,number)=> {
    
    const request =axios.put(baseUrl+"/"+id,{
        name,number
    })
    
    return request.then(response=>response.data)
  }
    export default {getAll,create,remove,update}
  