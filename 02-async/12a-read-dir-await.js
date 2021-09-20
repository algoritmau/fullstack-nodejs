const fs = require('fs').promises

printLengths('./')

async function printLengths(dir) {
  const fileList = await fs.readdir(dir)

  const results = await Promise.all(
    fileList.map((file) =>
      fs.readFile(file, 'utf8').then((data) => [file, data.length])
    )
  )

  results.forEach(([file, length]) => {
    console.log(`${file}: ${length}`)
  })

  console.log('Done!')
}
