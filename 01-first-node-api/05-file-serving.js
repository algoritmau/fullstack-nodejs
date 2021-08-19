const http = require('http')
const querystring = require('querystring')
const fs = require('fs')

const port = process.env.PORT || 1337

const server = http.createServer((req, res) => {
  if (req.url === '/') return respondText(req, res)
  if (req.url === '/json') return respondJson(req, res)
  if (req.url.match(/^\/echo/)) return respondEcho(req, res)
  if (req.url.match(/^\/static/)) return respondStatic(req, res)

  respond404(req, res)
})

server.listen(port)
console.log(`Server listening on port ${port}`)

function respondText(_, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World\n')
}

function respondJson(_, res) {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ message: 'Hello World' }))
}

function respondEcho(req, res) {
  const { input = '' } = querystring.parse(req.url.split('?').slice(1).join(''))

  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      normal: input,
      shouty: input.toUpperCase(),
      whispery: input.toLowerCase(),
      characterCount: input.length,
      backwards: input.split('').reverse().join('')
    })
  )
}

function respondStatic(req, res) {
  const filename = `${__dirname}/public/${req.url.split('static')[1]}`

  fs.createReadStream(filename)
    .on('error', () => respond404(req, res))
    .pipe(res)
}

function respond404(_, res) {
  res.statusCode = 404
  res.end('Not found')
}
