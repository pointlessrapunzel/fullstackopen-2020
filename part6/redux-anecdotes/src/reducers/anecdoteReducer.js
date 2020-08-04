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
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const upvotedAnecdote = {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
      return state.map(a => a.id === id ? upvotedAnecdote : a)
    case 'NEW_ANECDOTE':
      const newAnecdote = asObject(action.data.content)
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

export const newAnecdote = content => ({
  type: 'NEW_ANECDOTE',
  data: {
    content
  }
})

export const vote = id => ({
  type: 'VOTE',
  data: {
    id
  }
})

export default reducer