const http = require('http')
const port = process.env.PORT || 1337
const server = http.createServer((_, res) => {
  // res.end('Hello World!')
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ message: 'Hello World!', numbers: [1, 2, 3] }))
})

server.listen(port)
console.log(`Server listening on port ${port}`)
