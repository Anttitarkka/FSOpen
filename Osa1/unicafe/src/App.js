import React, { useState } from 'react'

const Headline = (props) => (
  <h1>{props.text}</h1>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}

const Statistics = ({good, neutral, bad, all , getAvg, getPos}) => {
  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <table>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="all" value ={all} />
          <StatisticLine text="average" value ={getAvg()} />
          <StatisticLine text="positive" value ={getPos()} />
      </table>
    </div>
    )
  }

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad

  const getAvg = () => {
    if (all !== 0) {
      return (good - bad) / all
    } else {
      return 0
    }
  }
  
  const getPos = () => {
    if (all !== 0) {
      return `${(good / all) * 100} %`
    } else {
      return 0
    }
  }

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Headline text={"give feedback"}/>
      <Button handleClick={handleGoodClick} text={'good'}/>
      <Button handleClick={handleNeutralClick} text={'neutral'}/>
      <Button handleClick={handleBadClick} text={'bad'}/>
      <Headline text={"statistics"}/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} getAvg={getAvg} getPos={getPos}/>
    </div>
  )
}

export default App
