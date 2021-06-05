import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Message from './components/Message'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [update, setUpdate] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)


    }
    fetchData()
  }, [update])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken('')

  }

  const addBlog = async (blogObject) => {

    const returnedBlog = await blogService.create(blogObject)
    console.log(returnedBlog)
    setBlogs(blogs.concat(returnedBlog))

    setMessage(`${blogObject.title} is added by ${blogObject.author}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)

  }

  const addBlogRef = useRef()
  const loginRef = useRef()



  if (user === null) {
    return (
      <Togglable buttonLabel = 'log in' ref = {loginRef}>
        <div>
          <Notification message={errorMessage} />
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
            <div>
            username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
            password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      </Togglable>
    )
  }

  return (
    <div>
      <Message message={message} />
      <h2>blogs</h2>
      <p>{user.name} logged in</p> <button onClick={logOut}>Log Out</button>
      <Togglable buttonLabel = "Create new blog" ref = {addBlogRef}>
        <BlogForm createBlog = {addBlog} />
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} setUpdate = {setUpdate} user = {user}/>
        )}
    </div>
  )
}

export default App