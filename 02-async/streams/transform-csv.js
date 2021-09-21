const fs = require('fs')
const csv = require('csv-parser')
const { Transform } = require('stream')

const YEARS_MS = 1000 * 60 * 60 * 24 * 365

fs.createReadStream('people.csv')
  .pipe(csv())
  .pipe(sanitize())
  .on('data', (row) => console.log(JSON.stringify(row)))

function sanitize() {
  return new Transform({
    objectMode: true,
    transform(row, enconding, callback) {
      const [firstName, lastName] = row.name.split(' ')
      const age = Math.floor((Date.now() - new Date(row.dob)) / YEARS_MS)
      callback(null, { firstName, lastName, age })
    }
  })
}
