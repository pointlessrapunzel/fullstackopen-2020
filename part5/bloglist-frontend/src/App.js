import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

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
      <BlogForm saveBlog={handleSaveBlog} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App