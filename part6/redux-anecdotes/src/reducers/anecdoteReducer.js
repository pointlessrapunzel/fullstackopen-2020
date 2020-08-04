import anecdoteService from '../services/anecdotes'

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES':
      const anecs = action.data
      return anecs
    case 'VOTE':
      const votedAnecId = action.data.id
      return state.map(a => a.id === votedAnecId ? action.data : a)
    case 'NEW_ANECDOTE':
      const newAnecdote = action.data
      return [ ...state, newAnecdote ]
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const newAnecdote = content => {
  return async dispatch => {
    const addedAnecdote = await anecdoteService.createNew(asObject(content))
    dispatch({
      type: 'NEW_ANECDOTE',
      data: addedAnecdote
    })
  }
}

export const vote = id => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(id)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export default reducer