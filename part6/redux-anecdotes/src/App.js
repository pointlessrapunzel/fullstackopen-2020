import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newAnecdote, vote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  anecdotes.sort((a, b) => b.votes - a.votes)

  const handleAddAnecdote = e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    if (!content) {
      console.log('empty anecdote!')
      return
    }
    e.target.anecdote.value = ''
    dispatch(newAnecdote(content))
  }

  const handleVote = id => {
    dispatch(vote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App