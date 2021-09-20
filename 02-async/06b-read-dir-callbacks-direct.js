const fs = require('fs')

fs.readdir('./', (err, files) => {
  if (err) return console.error(err)

  asyncMap(files, fs.readFile, (err, results) => {
    if (err) return console.error(err)

    results.forEach((data, index) =>
      console.log(`${files[index]}: ${data.length}`)
    )

    console.log('Done!')
  })
})

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
