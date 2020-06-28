import React, { useState } from 'react';

const Anecdote = ({ text, votes }) => {
  return (
    <div>
      <p>{text}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [ selected, setSelected ] = useState(0)
  const [ votes, setVotes ] = useState(anecdotes.map(a => 0))

  let maxVoted = votes.reduce((max, cur, i) => {
    return votes[max] >= votes[i] ? max : i
  }, 0)

  const pickRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleUpvote = () => {
    setVotes(votes.map((v, i) => i === selected ? v + 1 : v))
  }

  return (
    <div className="App">
      <h2>Anecdote of the day</h2>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button 
        handleClick={handleUpvote} 
        text={'vote'} 
       />
      <Button 
        handleClick={pickRandomAnecdote} 
        text={'next anecdote'} 
       />
       <h2>Anecdote with most votes</h2>
       <Anecdote 
        text={anecdotes[maxVoted]} 
        votes={votes[maxVoted]}
       />
    </div>
  );
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

export default App;
