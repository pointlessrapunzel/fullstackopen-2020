import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [shown, setShown] = useState(false)

  const toggleShown = () => setShown(!shown)
  const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
  const loggedUsername = loggedUser ? loggedUser.username : null


  const renderDetails = () => (
    <div>
      {blog.url}
      <br />
      likes {blog.likes}
      <button onClick={handleLike}>like</button>
      <br />
      {blog.user.name}
      <br />
      {
        blog.user.username === loggedUsername &&
        <button onClick={handleDelete}>delete</button>
      }
    </div>
  )

  return (
    <div className='blog'>
      {blog.title} {blog.author}
      <button onClick={toggleShown}>{shown ? 'hide' : 'view'}</button>
      {shown && renderDetails()}
    </div>
  )}

export default Blog
