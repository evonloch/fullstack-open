const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
    return blogs.reduce((a, b) => (a.likes > b.likes ? a : b))
  }

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}