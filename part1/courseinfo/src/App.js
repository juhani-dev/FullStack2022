import { useState } from 'react'
const Statistics = (props) =>{

  return (
    <div>
      good {props.good}
      <br></br>
      bad {props.bad}
      <br></br>
      neutral {props.neutral}
      <br></br>
      average {(props.good-props.bad)/props.all}
      <br></br>
      positive {props.good/props.all} %
    </div>
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

      <button onClick={() => { setGood(good + 1) ; setAll(all +1)}} >
        good
      </button>
      <button onClick={() =>{ setNeutral(neutral + 1) ; setAll(all +1)}} >
        neutral
      </button>
      <button onClick={() => { setBad(bad + 1); setAll(all +1)}}>
        bad
      </button>

      <h1>statistics</h1>
      
      <br></br>
      <Statistics good={good} bad={bad} neutral={neutral} all={all}/>
      
       
    </div>
  )
}

export default App