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
