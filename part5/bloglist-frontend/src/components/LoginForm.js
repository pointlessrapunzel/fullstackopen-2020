import React, { useState } from 'react'

const LoginForm = ({ handleLogin, credentials }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  credentials.username = username
  credentials.password = password

  return (
    <form onSubmit={e => {
      e.preventDefault()
      handleLogin()
    }}>
      <div>
        username: <input value={username} onChange={({target}) => setUsername(target.value)} />
      </div>
      <div>
        password: 
        <input 
          value={password} 
          type='password'
          onChange={({target}) => setPassword(target.value)} 
         />
      </div>
      <button type='submit'>log in</button>
    </form>
  )
}

export default LoginForm