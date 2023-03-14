const app = require('./app')
const http = require('http')
require('dotenv').config()
const info = require('./utils/logger').info

const server = http.createServer(app)
const PORT = process.env.PORT || 3003
server.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})