// When /sse route sends messages, add them to #messages.
new window.EventSource('/sse').onmessage = function (event) {
  window.messages.innerHTML += `<p>${event.data}</p>`
}

window.form.addEventListener('submit', function (event) {
  event.preventDefault()

  // Send request to server with inputted text.
  window.fetch(`/chat?message=${window.input.value}`)
  window.input.value = ''
})
