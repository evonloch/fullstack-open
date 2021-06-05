const blogsRouter = require('express').Router()
const { response, request } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  
})

blogsRouter.get('/:id', async(request, response, next) => {
  
  try{const blog = await Blog.findById(request.params.id)
    
      if(blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    }catch(error) {next(error)}
  
    
})



blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!request.token || !decodedToken) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id 
  })

  if(blog.title === undefined || blog.url === undefined){
    response.status(400).end()
  }

  try{const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
  } catch(error) {next(error)}
})

blogsRouter.delete('/:id', async (request, response, next) => {
  
    //await Blog.findByIdAndRemove(request.params.id)

    const blog = await Blog.findById(request.params.id)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!request.token || !decodedToken) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }
    const user = await User.findById(decodedToken.id)
    const userid = user._id
    
    if ( blog.user.toString() !== userid.toString() ) {
      return response.status(401).json({
        error: 'please log in as a correct user'
      })
    }
 
    await Blog.findByIdAndRemove(request.params.id)
    response.status(200).end()
    
    
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.author,
    likes: body.likes
  }

  try {const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    
  response.json(updatedBlog)
    
 }catch(error ) { next(error)}
})

module.exports = blogsRouter