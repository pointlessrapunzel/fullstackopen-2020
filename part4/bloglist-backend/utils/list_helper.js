const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) return null
  
  return blogs.reduce((mostLikedBlog, blog) => 
    blog.likes > mostLikedBlog.likes ? blog : mostLikedBlog
  )
}

module.exports = { dummy, totalLikes, favoriteBlog }