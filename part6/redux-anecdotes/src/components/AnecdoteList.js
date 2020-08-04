import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  let anecdotes = props.anecdotes
  anecdotes.sort((a, b) => b.votes - a.votes)

  const handleVote = anecdote => () => {
    props.vote(anecdote.id)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
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

const mapStateToProps = state => {
  const anecdotes = state.anecdotes.filter(a => {
    return a.content.toLowerCase().includes(state.filter)
  })
  console.log(state)
  return {
    anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  vote,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)