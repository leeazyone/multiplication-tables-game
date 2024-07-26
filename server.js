// server.js
const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static('public'))

app.get('/generate-problem', (req, res) => {
  const multiplicand = Math.floor(Math.random() * 9) + 1
  const multiplier = Math.floor(Math.random() * 9) + 1
  res.json({ multiplicand, multiplier })
})

app.post('/check-answer', (req, res) => {
  const { multiplicand, multiplier, answer } = req.body
  const correct = multiplicand * multiplier === parseInt(answer, 10)
  res.json({ correct })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
