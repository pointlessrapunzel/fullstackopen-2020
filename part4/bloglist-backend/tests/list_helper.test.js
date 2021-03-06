const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const blogs = [ 
  { _id: "5a422a851b54a676234d17f7", 
    title: "React patterns", 
    author: "Michael Chan", 
    url: "https://reactpatterns.com/", 
    likes: 7, __v: 0 
  },
  { _id: "5a422aa71b54a676234d17f8", 
    title: "Go To Statement Considered Harmful", 
    author: "Edsger W. Dijkstra", 
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
    likes: 5, __v: 0 
  },
  { _id: "5a422b3a1b54a676234d17f9", 
    title: "Canonical string reduction", 
    author: "Edsger W. Dijkstra", 
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 
  },
  { _id: "5a422b891b54a676234d17fa", 
    title: "First class tests", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
    likes: 10, __v: 0 
  },
  { _id: "5a422ba71b54a676234d17fb", 
    title: "TDD harms architecture", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
    likes: 0, __v: 0 
  },
  { _id: "5a422bc61b54a676234d17fc", 
    title: "Type wars", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 
  } 
]

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
  })

  test('when list has several blogs result is correct', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })

  test('when list is empty the likes are 0', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
})

describe('favorite blog', () => {
  test('when only one blog, it is the favorite', () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0])
  })

  test('when list has several blogs', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2])
  })

  test('when list has no blogs return null', () => {
    expect(listHelper.favoriteBlog([])).toEqual(null)
  })
})

describe('most blogs', () => {
  test('when only one blog, return its author', () => {
    expect(listHelper.mostBlogs(listWithOneBlog))
      .toEqual({ author: listWithOneBlog[0].author, blogs: 1 })
  })

  test('when list has several blogs', () => {
    expect(listHelper.mostBlogs(blogs))
      .toEqual({ author: 'Robert C. Martin', blogs: 3})
  })

  test('when list is empty', () => {
    expect(listHelper.mostBlogs([])).toEqual(null)
  })
})

describe('most likes', () => {
  test('when only one blog', () => {
    expect(listHelper.mostLikes(listWithOneBlog))
      .toEqual({ author: listWithOneBlog[0].author, likes: 5 })
  })

  test('when list has several blogs', () => {
    expect(listHelper.mostLikes(blogs))
      .toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })

  test('when list is empty', () => {
    expect(listHelper.mostLikes([]))
      .toBe(null)
  })
})