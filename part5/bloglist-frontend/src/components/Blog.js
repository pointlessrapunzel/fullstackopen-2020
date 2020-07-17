import React, { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
  const [shown, setShown] = useState(false)

  const toggleShown = () => setShown(!shown)

  const renderDetails = () => (
    <div>
      {blog.url}
      <br />
      likes {blog.likes}
      <button onClick={handleLike}>like</button>
      <br />
      {blog.user.name}
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
