import React, { useState } from 'react'
import {
  Switch, Route, useRouteMatch, useHistory
} from 'react-router-dom'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import About from './components/About'
import Footer from './components/Footer'
import Notification from './components/Notification'
import CreateNew from './components/CreateNew'
 
const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')
  let notificationTimeoutId = null
  const showNotification = (message) => {
    if (notificationTimeoutId) {
      clearTimeout(notificationTimeoutId)
    }
    setNotification(message)
    notificationTimeoutId = setTimeout(() => {
      setNotification(null)
      notificationTimeoutId = null
    }, 10000)
  }
  const history = useHistory()

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    showNotification(`a new anecdote ${anecdote.content} created!`)
    history.push('/')
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const anecdoteMatch = useRouteMatch('/anecdotes/:id')
  const anecdote = anecdoteMatch 
    ? anecdoteById(anecdoteMatch.params.id) : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification} />
      <Switch>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path='/create'>
          <CreateNew addNew={addNew} />
        </Route>
        <Route path='/'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App;
