const fs = require('fs')
const express = require('express')

const port = process.env.PORT || 1337

const app = express()

app.get('/', respondText)
app.get('/json', respondJson)
app.get('/echo', respondEcho)
app.get('/static/*', respondStatic)

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`)
})

function respondText(_, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello, world.\n')
}

function respondJson(_, res) {
  res.json({ message: 'Hello, world.', numbers: [1, 2, 3] })
}

function respondEcho(req, res) {
  const { input = '' } = req.query

  res.json({
    normal: input,
    shouty: input.toUpperCase(),
    whispery: input.toLowerCase(),
    characterCount: input.length,
    backwards: input.split('').reverse().join('')
  })
}

function respondStatic(req, res) {
  const filename = `${__dirname}/public/${req.params[0]}`

  fs.createReadStream(filename)
    .on('error', () => respond404(req, res))
    .pipe(res)
}

function respond404(_, res) {
  res.statusCode = 404
  res.end('Not found')
}
