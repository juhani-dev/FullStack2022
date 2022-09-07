import { useState } from 'react'

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

       
      good {good}
      <br></br>
      neutral {neutral}
      <br></br>
      bad {bad}
      <br></br>
      all {all}
      <br></br>
      average {(good-bad)/all}
      <br></br>
      positive {good/all} %
      
       
    </div>
  )
}

export default App