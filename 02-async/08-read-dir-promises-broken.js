const fs = require('fs').promises

fs.readdir('./')
  .catch((err) => console.err(err))
  .then((files) => {
    files.forEach((file) => {
      fs.readFile(file)
        .catch((err) => console.err(err))
        .then((data) => console.log(`${file}: ${data.length}`))
    })

    console.log('Done')
  })
