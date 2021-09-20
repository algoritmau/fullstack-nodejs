let count = 0
setInterval(() => {
  console.log(`${++count} mississippi`)
}, 1000)

setTimeoutSync(5500)
console.log('Hello from the past!')
process.exit(0)

function setTimeoutSync(ms) {
  const t0 = Date.now()
  while (Date.now() - t0 < ms) {}
}
