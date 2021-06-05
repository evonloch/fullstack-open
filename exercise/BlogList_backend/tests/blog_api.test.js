const { TestScheduler } = require('@jest/core')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const  initialBlogs =  [
    {
      
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      
    },
    {
      
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
     
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('the first blog is about react', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
        'React patterns'
    )
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Reactjs is cool',
        author: 'Mehedi Hasan Palash',
        url: 'fb.com',
        likes: 12
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain(
        'Reactjs is cool'
    )
})


test('missing likes property will be 0', async () => {
    const newBlog = {
        title: 'Reactjs is cool',
        author: 'Mehedi Hasan Palash',
        url: 'fb.com'
        
    }

    const savedBlog =   await api
                            .post('/api/blogs')
                            .send(newBlog)
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
    
    
    //console.log(savedBlog.body.likes, 'yes')
    expect(savedBlog.body.likes).toBe(0)
})

test('missing title, url property will give 400', async () => {
    const newBlog = {
        
        author: 'Mehedi Hasan Palash',
        
        likes: 10
        
    }

    const savedBlog =   await api
                            .post('/api/blogs')
                            .send(newBlog)
                            .expect(400)
                            
    
    
    
})

test('unique id', async () => {
    const response = await api.get('/api/blogs')

    const blogs = response.body
    console.log(blogs)
    const set = new Set()
    blogs.forEach(
        blog => {
            expect(blog.id).toBeDefined()
            expect(blog._id).not.toBeDefined()
            set.add(blog.id)
        }
    )

    expect(set.size).toBe(blogs.length)
})




afterAll(() => {
    mongoose.connection.close()
})