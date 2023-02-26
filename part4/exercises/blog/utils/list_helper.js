const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let maxLikes = 0
  let mostLikes = null
  
  blogs.forEach(blog => {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes
      mostLikes = blog
    }
  })

  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes
}