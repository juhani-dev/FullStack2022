import { useState, useEffect } from 'react'
import axios from 'axios'
const Weather=({country})=>{
    const[latlong,setlatlong]=useState([])
    const [temp,settemp]=useState("0")
    const [wind,setwind]=useState("0")
    const [icon,seticon]=useState("0")
    const api_key = process.env.REACT_APP_API_KEY
    const lat=country.line.capitalInfo.latlng[0]
    const long=country.line.capitalInfo.latlng[1]

     
    useEffect(() => {
        console.log({lat})
        axios
          .get('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid='+api_key+'&units=metric')
          .then(response => {
            console.log('promise fulfilled')
            setlatlong(response.data)
            settemp(response.data.main.temp)
            setwind(response.data.wind.speed)
            seticon('http://openweathermap.org/img/wn/'+response.data.weather[0].icon+'@2x.png')
            
          })
      }, [])
      return(
        <div>
           <p> temp: {temp} celsius</p>
           <p> wind: {wind} m/s</p>
           <img src={icon} alt="Flag" ></img>
        </div>
      )
}
const CountryInfo=(country)=>{
    
    return(
        <div>
        <h2> {country.line.name.common}</h2>
        <li>area: {country.line.area}</li>
        <li>capital: {country.line.capital}</li>
        
        <h3>languages:</h3>
        
        <div>{Object.values(country.line.languages).map(language =>
            <li key={language}>{language}</li>)}</div>
            <br></br>
        <img src={country.line.flags.png} alt="Flag" ></img>
            
        <h2>Weather report:</h2>
        <Weather country={country} /> 
        </div>
    )
}

const ListCountries=({countries,search,show,setShow})=>{
    const [one,newone]=useState("h")
    
    
    const filterCountries =countries.filter(line => line.name.common.includes(search))
    
    const countriesShown = show
     ?filterCountries
    :countries.filter(line =>line.name.common==one)

    if(countriesShown.length ==1){
        
        return(
            <ul>
            {countriesShown.map(line => 
              <CountryInfo key={line.name.common} line={line} />
                )}
          </ul>
        )
    }

    else if (countriesShown.length < 10){
    return(
        
        <div>
        {countriesShown.map(line => 
        <div   key={line.name.common} >{line.name.common} 
          <button value={line.name.common }  onClick={e=>HandleClick(e.target.value,{newone,one,setShow})}>show</button>
           </div>
             )}
            </div>

    )}
    else {
        return(
            <>too much</>
        )
    }
}
const HandleClick =(event,{newone,one,setShow})=>{
console.log(event)
newone(event)
setShow(false)
console.log(one)
}

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

function Apps (){
    const [countries, setCountries] = useState([])
    const [search, setNewSearch] = useState("")
    const [show,setShow]=useState(true)
    
    const handleSearch=(event)=>{
        setNewSearch(event.target.value)
        setShow(true)
      }
    
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
      
      return( 
        <div>
            <Searchfield search={search} onChange={handleSearch}/>
           <div>
            <ListCountries countries={countries} search={search}setShow={setShow}show={show} />
           </div>

        </div>
      )
}


export default Apps;