// implement your API here
const express = require('express')
const db = require('./data/db')

const PORT = 3000

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello, World')
})

app.get('/api/users', (req, res) => {
  db.find().then(data => {
    res.status(200).json(data)
  })
})

app.get('/api/users/:id', (req, res) => {
  const id = req.params.id
  db.findById(id).then(data => {
    res.status(200).json(data)
  })
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})
