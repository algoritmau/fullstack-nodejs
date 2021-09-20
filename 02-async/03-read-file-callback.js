const fs = require('fs')

const filename = '03-read-file-callback.js'

fs.readFile(filename, 'utf8', (err, data) => {
  if (err) throw err

  console.log(`${filename}: ${data.length}`)
})
