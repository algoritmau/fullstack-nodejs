const fs = require('fs')
const express = require('express')
const EventEmitter = require('events')

const chatEmitter = new EventEmitter()
const port = process.env.PORT || 1337

const app = express()

app.get('/', respondText)
app.get('/json', respondJson)
app.get('/echo', respondEcho)
app.get('/static/*', respondStatic)
app.get('/chat', respondChat)
// send messages to our chat clients once they connect with the new window.EventSource('/sse')
app.get('/sse', respondSSE)

app.listen(port, () => console.log(`🚀 Server listening on port ${port}`))

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

function respondChat(req, res) {
  const { message } = req.query

  chatEmitter.emit('message', message)
  res.end('')
}

function respondSSE(_, res) {
  // Establish a connection to the server
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive'
  })

  // We listen for message events from our chatEmitter object, and when we receive them,
  // we write them to the response body using res.write().
  const onMessage = (message) => {
    res.write(`data: ${message}\n\n`)
    saveChatLog(message)
  }
  chatEmitter.on('message', onMessage)

  // We listen for when the connection to the client has been closed,
  // and when it happens we disconnect our onMessage() function from our chatEmitter object.
  res.on('close', () => {
    chatEmitter.off('message', onMessage)
  })
}

function saveChatLog(chatLogPayload) {
  const chatLogPath = `${__dirname}/public/chat-log.txt`

  try {
    fs.readFileSync(chatLogPath)
  } catch (error) {
    fs.writeFileSync(chatLogPath, '')
  }

  fs.appendFileSync(chatLogPath, `${chatLogPayload}\n`)
}

function respond404(_, res) {
  res.statusCode = 404
  res.end('Not found')
}
