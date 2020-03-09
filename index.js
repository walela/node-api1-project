// implement your API here
const express = require('express')
const db = require('./data/db')

const PORT = 3000

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  console.log(req.headers)
  res.send('Hello, World')
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})
