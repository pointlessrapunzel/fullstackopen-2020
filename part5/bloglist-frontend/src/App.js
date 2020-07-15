import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  let credentials = {}

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  const handleLogin = async e => {
    const loginResponse = await loginService.login(credentials)
      .catch(e => console.error(e))

    window.localStorage.setItem('loggedUser', JSON.stringify(loginResponse))
    setUser(loginResponse)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  if (!user) {
    return (
      <LoginForm 
        handleLogin={handleLogin}
        credentials={credentials}
      />
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{ user.name } logged in 
        <button onClick={handleLogout}>log out</button>
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App