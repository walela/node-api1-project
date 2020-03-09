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
  db.find()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: "The users' information could not be retrieved."
      })
    })
})

app.get('/api/users/:id', (req, res) => {
  const id = req.params.id
  db.findById(id)
    .then(data => {
      if (res.data === undefined) {
        res.status(404).json({ message: `No user with id ${id} found` })
      }
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})
