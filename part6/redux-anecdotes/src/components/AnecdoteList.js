import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  let { anecdotes, filter } = state
  anecdotes.sort((a, b) => b.votes - a.votes)
  if (filter) {
    anecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter))
  }

  const handleVote = anecdote => () => {
    dispatch(vote(anecdote.id))
    const removalTimeout = setTimeout(() => dispatch(removeNotification()), 5000)
    dispatch(setNotification(`you voted '${anecdote.content}'`, removalTimeout))
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
              onClick={handleVote(anecdote)}
            >vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList