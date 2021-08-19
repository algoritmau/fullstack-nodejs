const http = require('http')
const port = process.env.PORT || 1337
const server = http.createServer((_, res) => {
  res.end('Hello World!')
})

server.listen(port)
console.log(`Server listening on port ${port}`)
