import React, { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Stat = ({ value, text }) => {
  return (
    <li>{text} {value}</li>
  )
}

const Statistics = ({ stats }) => {
  if (stats.all === 0) {
    return ( <p>No feedback given</p>)
  }
  
  return (
    <ul style={{'listStyle': 'none', 'padding': 0}}>
      {Object.entries(stats).map((stat, i) => 
        <Stat key={i} value={stat[1]} text={stat[0]} /> 
      )}
    </ul>
  )
}

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)
  let all = good + neutral + bad
  let avg = (good - bad) / all || 0
  let positive = ((good / all) * 100 || 0) + '%'

  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    avg: avg,
    positive: positive
  }

  return (
    <div className="App">
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <h2>statistics</h2>
      <Statistics stats={stats} />
    </div>
  );
}

export default App;
