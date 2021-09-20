const fs = require('fs')
const path = require('path')

const targetDirectory = process.argv[2] || './'

getFileLengths(targetDirectory, (err, fileLengths) => {
  if (err) {
    console.error(err)
    return
  }

  fileLengths.forEach(([file, length]) => {
    console.log(`${file}: ${length}`)
  })

  console.log('Done')
})

function getFileLengths(dir, callback) {
  fs.readdir(dir, (err, files) => {
    if (err) return callback(err)

    const filePaths = files.map((file) => path.join(dir, file))

    asyncMap(filePaths, readFile, callback)
  })
}

function readFile(file, cb) {
  fs.readFile(file, 'utf8', (err, fileData) => {
    if (err) {
      if (err.code === 'EISDIR') return cb(null, [file, 0])

      return cb(err)
    }

    cb(null, [file, fileData.length])
  })
}

function asyncMap(arr, fn, onFinish) {
  let prevError
  let nRemaining = arr.length
  const results = []

  arr.forEach((item, index) => {
    fn(item, (err, data) => {
      if (prevError) return

      if (err) {
        prevError = err
        return onFinish(err)
      }

      results[index] = data

      nRemaining--
      if (!nRemaining) onFinish(null, results)
    })
  })
}
