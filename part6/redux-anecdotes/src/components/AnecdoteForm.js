import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAddAnecdote = e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    if (!content) {
      return
    }
    e.target.anecdote.value = ''
    dispatch(newAnecdote(content))
    dispatch(setNotification(`Added '${content}'`, 5))
  }

  return (
    <div className='AnecdoteForm'>
      <h2>create new</h2>
      <form className='AnecdoteForm__form' onSubmit={handleAddAnecdote}>
        <div>
          <input 
            className='AnecdoteForm__input'
            name='anecdote'
          ></input>
        </div>
        <button 
          className='AnecdoteForm__btn-submit'
          type='submit' 
         >create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm