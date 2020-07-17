import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  // BLOGS LOGIC
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()

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
    blogFormRef.current.toggleVisible()
    setBlogs(blogs.concat(savedBlog))
    flashSuccessMessage(`a new blog ${savedBlog.title} by ${savedBlog.author} added`)
  }

  const sortedBlogs = blogs.sort((b1, b2) => b2.likes - b1.likes)

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

  // LIKE LOGIC
  const handleLikeBlog = async blog => {
    try {
      const likedBlog = await blogService.likeBlog(blog.id, blog)
      setBlogs(blogs.map(b => b.id === likedBlog.id ? likedBlog : b))
    } catch(e) {
      console.error(e)
    }
  }


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
      <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
        <BlogForm saveBlog={handleSaveBlog} />
      </Togglable>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={() => handleLikeBlog(blog)} />
      )}
    </div>
  )
}

export default App