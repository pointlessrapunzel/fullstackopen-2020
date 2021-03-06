import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form
      id='form--login'
      onSubmit={e => {
        e.preventDefault()
        handleLogin({ username, password })
      }
      }>
      <div id='form__username'>
        username:
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div id='form__password'>
        password:
        <input
          value={password}
          type='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>log in</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm