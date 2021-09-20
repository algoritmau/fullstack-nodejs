const fs = require('fs')

const filename = '07-read-file-promises.js'

fs.readFile(filename, 'utf8')
  .then((data) => console.log(`${filename}: ${data.length}`))
  .catch((err) => console.error(err))
