
import { useState, useEffect } from 'react'
import axios from 'axios'
const Searchfield=({search, onChange}) => {
  return(
      <div>
        
      find countries:
      <input value={search}
      onChange={onChange}
      />
      </div>
  )
}

const CountryList=( {countries,search})=>{
  
  const list = countries.map(element=>(element.name.common ))
  const result = list.filter(line => line.includes(search));
  
  if (result.length > 10){
    return <div>too many results, be more specific</div>
  }
  else if (result.length ==1){
    const oneResult = countries.filter(line => line.name.common.includes(search))
  console.log(oneResult,"THIS")

  const list2 =  oneResult.map((element)=>({
    capital: element?.capital ?? ['not'],
  name: element.name.common,
  area: element?.area ?? 0,
  languages : element?.languages ?? 'not',
  flag : element.flags.png 
  }))
    let langues = ""
    const lan = oneResult.map((e)=>{
      Object.entries(e.languages).forEach(([key, value]) => langues+=( `${value}`+" ") )
      
    })
   console.log({langues})
    return(
        <div>      
           {list2.map(e => (
        <div key={e.name} ><h2>{e.name} </h2> 
        <img src={e.flag} alt="Flag" ></img>
        <br></br>
        capital: {e.capital}
        <br></br> area: {e.area} 
        

        </div>
      
           ))}
           <div>languages: {langues}</div> 
           
        </div>
           )
  }
  else{
    return(
      <div>
        {result.map(country => (
        <li key={country}>{country}</li>
      ))}
     
      </div>
    )
  }
  
}

function App() {
  const [search,setNewSearch] =useState("")
  const [countries, setCountries] = useState([])

  

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const handleSearch=(event)=>{
    setNewSearch(event.target.value)
  }
  

  return (
   <div>
    <Searchfield search={search} onChange={handleSearch} />
    <CountryList countries={countries} search={search}/>
    
    
   </div>
  );
}

export default App;
