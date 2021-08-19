const http = require('http')

const port = process.env.PORT || 1337

function respondText(_, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World\n')
}

function respondJson(_, res) {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ message: 'Hello World' }))
}

function respond404(_, res) {
  res.statusCode = 404
  res.end('Not found')
}

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      return respondText(req, res)

    case '/json':
      return respondJson(req, res)

    default:
      return respond404(req, res)
  }
})

server.listen(port)

console.log(`Server listening on port ${port}`)
