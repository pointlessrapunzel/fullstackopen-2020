import React, { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Stat = ({ value, text }) => {
  return (
    <p>{text} {value}</p>
  )
}

const Stats = ({ stats }) => {
  return (
    <>
      {stats.map((stat, i) => 
        <Stat key={i} value={stat.value} text={stat.text} /> 
      )}
    </>
  )
}

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

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
  }]

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
