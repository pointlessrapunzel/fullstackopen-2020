import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({
      type: 'VOTE',
      data: {
        id
      }
    })
  }

  const handleAddAnecdote = e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    if (!content) {
      console.log('empty anecdote!')
      return
    }
    e.target.anecdote.value = ''
    addAnecdote(content)
  }

  const addAnecdote = content => {
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content
      }
    })
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
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