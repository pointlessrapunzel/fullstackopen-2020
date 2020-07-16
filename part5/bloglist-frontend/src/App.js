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

const BlogForm = ({saveBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const setInput = (setter) => ({target}) => setter(target.value) 
  const submitForm = e => {
    e.preventDefault()
    saveBlog(title, author, url)
      .then(() => {
        setTitle('')
        setAuthor('')
        setUrl('')
      })
  }

  return (
    <form onSubmit={submitForm}>
      <div>
        title:
        <input 
          value={title}
          onChange={setInput(setTitle)}
        ></input>
      </div>
      <div>
        author:
        <input 
          value={author}
          onChange={setInput(setAuthor)}
        ></input>
      </div>
      <div>
        url:
        <input 
          value={url}
          onChange={setInput(setUrl)}
        ></input>
      </div>
      <button type='submit'>save</button>
    </form>
  )
}

const Notification = ({ notification }) => {
  if (!notification) return null
  const { message, type } = notification
  let typeClass = `notification--${type}`

  return (
    <div className={`notification ${typeClass}`}>
      {message}
    </div>
  )
}

const App = () => {

  // BLOGS LOGIC
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleSaveBlog = async (title, author, url) => {
    const blogData = {
      title, author, url
    }

    const savedBlog = await blogService.saveBlog(blogData)
    setBlogs(blogs.concat(savedBlog))
    flashSuccessMessage(`a new blog ${savedBlog.title} by ${savedBlog.author} added`)
  }

  // LOGIN LOGIC
  const [user, setUser] = useState(null)
  let credentials = {}

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async e => {
    const loginResponse = await loginService.login(credentials)
      .catch(e => {
        console.error(e)
        flashErrorMessage('wrong username or password')
      })

    if (!loginResponse) return
    blogService.setToken(loginResponse.token)
    window.localStorage.setItem('loggedUser', JSON.stringify(loginResponse))
    setUser(loginResponse)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  // NOTIFICATION LOGIC
  const [notification, setNotification] = useState(null)

  const flashNotification = (message, type) => {
    setNotification({message, type})
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  const flashErrorMessage = msg => flashNotification(msg, 'error')
  const flashSuccessMessage = msg => flashNotification(msg, 'success')


  // RENDERING LOGIC

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification notification={notification} />
        <LoginForm 
          handleLogin={handleLogin}
          credentials={credentials}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>{ user.name } logged in 
        <button onClick={handleLogout}>log out</button>
      </p>
      <h2>create new</h2>
      <BlogForm
        saveBlog={handleSaveBlog}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App