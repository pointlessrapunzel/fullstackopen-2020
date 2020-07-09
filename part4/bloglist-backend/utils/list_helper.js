const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  return blogs.reduce((mostLikedBlog, blog) =>
    blog.likes > mostLikedBlog.likes ? blog : mostLikedBlog
  )
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  let mostBlogsAuthor = blogs[0].author

  const blogsByAuthor = blogs.reduce((blogsByAuthor, blog) => {
    // for each blog, add one to the total for its author
    blogsByAuthor[blog.author] = blogsByAuthor[blog.author] + 1 || 1

    // update the max author if the current author has more blogs
    if (blogsByAuthor[blog.author] > blogsByAuthor[mostBlogsAuthor]) {
      mostBlogsAuthor = blog.author
    }
    return blogsByAuthor
  }, {})

  return { author: mostBlogsAuthor, blogs: blogsByAuthor[mostBlogsAuthor] }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
