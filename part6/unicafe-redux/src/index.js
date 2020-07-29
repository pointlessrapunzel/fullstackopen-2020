import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const sendAction = type => {
    type = type.toUpperCase()
    store.dispatch({
      type: type
    })
  }
  const addToGood = () => sendAction('good')
  const addToNeutral = () => sendAction('ok')
  const addToBad = () => sendAction('bad')
  const resetStore = () => sendAction('zero')

  return (
    <div>
      <button onClick={addToGood}>good</button> 
      <button onClick={addToNeutral}>neutral</button> 
      <button onClick={addToBad}>bad</button>
      <button onClick={resetStore}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
