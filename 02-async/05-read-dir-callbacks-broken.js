const fs = require('fs')

fs.readdir('./', (err, files) => {
  if (err) return console.error(err)

  files.forEach((file) => {
    fs.readFile(file, (err, content) => {
      if (err) return console.error(err)

      console.log(`${file}: ${content.length}`)
    })
  })

  console.log('Done.')
})
