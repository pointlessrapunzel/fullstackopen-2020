import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [shown, setShown] = useState(false)

  const toggleShown = () => setShown(!shown)
  const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
  const loggedUsername = loggedUser ? loggedUser.username : null


  const details = () => (
    <div className='Blog__details'>
      {blog.url}
      <br />
      likes <span className='Blog__likes'>{blog.likes}</span>
      <button className='Blog__btn-like' onClick={handleLike}>like</button>
      <br />
      {blog.user.name}
      <br />
      {
        blog.user.username === loggedUsername &&
        <button className='Blog__btn-delete' onClick={handleDelete}>delete</button>
      }
    </div>
  )

  return (
    <div className='Blog'>
      {blog.title} {blog.author}
      <button onClick={toggleShown}>{shown ? 'hide' : 'view'}</button>
      {shown && details()}
    </div>
  )}

export default Blog
