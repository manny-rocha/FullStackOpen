import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (total === 0) {    
    return (      
    <div>
      <h2>Statistics</h2>        
      No feedback given      
    </div>
    )  
  }  
  return (
    <div>
      
      <h2>Statistics</h2>
      
      <StatisticLine text="Good:" value={ good } />
      <StatisticLine text="Neutral:" value={ neutral } />
      <StatisticLine text="Bad:" value={ bad } />
      <StatisticLine text="Total:" value={ total } />
      <StatisticLine text="Average:" value={ average } />
      <StatisticLine text="Positive:" value={ positive } />
      
    </div>
  )
}

const StatisticLine = ({ text, value }) => (
  <table>
    <tbody>  
      <tr>
        <td>{ text }</td>
        <td>{ value }</td>
      </tr>
    </tbody>
  </table>  
)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleGoodClick = () => {
    console.log('value before', good)
    setGood(good + 1);
    setAll(allClicks.concat('good'))
  }
  const handleNeutralClick = () => {
    console.log('value before', neutral)
    setNeutral(neutral + 1);
    setAll(allClicks.concat('neutral'))
  }
  const handleBadClick = () => {
    console.log('value before', bad)
    setBad(bad + 1);
    setAll(allClicks.concat('bad'))
  }

  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good * 100) / total;

  return (
    <div>
      
      <h1>Give Feedback</h1>

      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <>
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          average={average}
          positive={positive}
        />
      </>
    </div>
  )
}

export default App