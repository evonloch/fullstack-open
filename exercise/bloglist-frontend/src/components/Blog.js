import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, setUpdate, user }) => {
  const [visible, setVisible] = useState(false)
  const [removeVisible, setRemoveVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const hideWhenNotOwned = { display: removeVisible? 'none' : '' }
  const rules = () => {
    setVisible(true)
    if(blog.user.username !== user.username) {
      setRemoveVisible(true)
    }
  }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = async event => {
    event.preventDefault()
    const likes = blog.likes + 1
    const newBlog = { ...blog, likes }
    await blogService.update(blog.id, newBlog)
    setUpdate(Math.floor(Math.random() * 100))

  }
  const remove = async event => {
    event.preventDefault()

    if(window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      blogService.setToken(user.token)
      blogService.remove(blog.id, user.token)
      setUpdate(Math.floor(Math.random() * 100))

    }
  }



  return (
    <div className = "blog">
      <div onClick={rules} className="titleauthor">
        {blog.title} {blog.author}
      </div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div style = {blogStyle}>
          <p>https://{blog.url}</p>
          <p>likes {blog.likes}<button onClick = {like}>like</button></p>
        </div>
        <div onClick={remove} style={hideWhenNotOwned}>
          added by {blog.author}
          <button type="submit">remove</button>
        </div>
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  )}

export default Blog