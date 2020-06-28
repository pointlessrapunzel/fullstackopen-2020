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

const Stats = ({ stats }) => {
  return (
    <ul style={{'listStyle': 'none', 'padding': 0}}>
      {stats.map((stat, i) => 
        <Stat key={i} value={stat.value} text={stat.text} /> 
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
  let positive = (good / all) * 100 || 0

  const stats = [ 
  {
    text: 'good',
    value: good
  }, 
  {
    text: 'neutral',
    value: neutral
  },
  {
    text: 'bad',
    value: bad
  },
  {
    text: 'all',
    value: all
  },
  {
    text: 'average',
    value: avg
  },
  {
    text: 'positive',
    value: positive + '%'
  }
  ]

  return (
    <div className="App">
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <h2>statistics</h2>
      <Stats stats={stats} />
    </div>
  );
}

export default App;
