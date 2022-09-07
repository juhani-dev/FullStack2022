import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) =>{
  return(
    <tr>
      <td>
    {props.text} {props.value}
      </td>
    </tr>
  )
}
const Statistics = (props) =>{

  if (props.all === 0){
    return (
      <div>
        no feedback given
      </div>
    )
  }

  return (
    <table>
      <tbody>
      <StatisticLine text = "good" value={props.good}/>
      <StatisticLine text = "bad" value={props.bad}/>
      <StatisticLine text = "neutral" value={props.neutral}/>
      <StatisticLine text = "all" value={props.all}/>
      <StatisticLine text = "average" value={(props.good-props.bad)/props.all}/>
      <StatisticLine text = "positive" value={props.good/props.all}/>
      </tbody>
    </table>
  )

}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)


  return (
    <div>
      <h1>Give feedback</h1>

      <Button handleClick={() => { setGood(good + 1) ; setAll(all +1)}} text="good" />
      <Button handleClick={() => { setNeutral(neutral + 1) ; setAll(all +1)}} text="neutral" />
      <Button handleClick={() => { setBad(bad + 1) ; setAll(all +1)}} text="bad" />
      
      

      <h1>statistics</h1>
      
      <br></br>
      <Statistics good={good} bad={bad} neutral={neutral} all={all}/>
      
       
    </div>
  )
}

export default App