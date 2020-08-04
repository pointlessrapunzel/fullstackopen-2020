import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNew = async anecdote => {
  const res = await axios.post(baseUrl, anecdote)
  return res.data
}

const vote = async id => {
  const anecToVote = await axios.get(`${baseUrl}/${id}`)
  const votedAnec = { ...anecToVote.data, votes: anecToVote.data.votes + 1}
  const res = await axios.put(`${baseUrl}/${id}`, votedAnec)
  return res.data
}

export default {
  getAll,
  createNew,
  vote,
}