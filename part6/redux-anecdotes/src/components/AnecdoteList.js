import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)
  anecdotes.sort((a, b) => b.votes - a.votes)

  const handleVote = id => () => {
    dispatch(vote(id))
  }

  return (
    <div className='AnecdoteList'>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button 
              onClick={handleVote(anecdote.id)}
            >vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList