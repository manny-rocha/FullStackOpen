require('dotenv').config();
const http = require('http')
const express = require('express')
const app = express()

const PORT = process.env.PORT
const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`) 
})