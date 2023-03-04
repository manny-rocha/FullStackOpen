const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Big dogs love cheese',
    author: 'Jeremy Irons',
    url: 'www.ironsblog.com',
  },
  {
    title: 'Diplomatic relations between humans and non-human intelligent life-forms',
    author: 'Picard',
    url: 'www.jeanLucPicard.com',
  }
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
}, 100000)

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const authors = response.body.map(r => r.author)
  expect(authors).toContain('Jeremy Irons')
})

afterAll(async () => {
  await mongoose.connection.close()
})