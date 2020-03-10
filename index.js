const express = require('express')
const cors = require('cors')
const db = require('./data/db')

const PORT = 4040

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello, World')
})

const logError = err => console.log('💩:', err)

const validateUser = (user, res) => {
  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user' })
    return false
  }
  return true
}

app.get('/api/users', async (_, res) => {
  try {
    const users = await db.find()
    res.status(200).json(users)
  } catch (err) {
    logError(err)
    res.status(500).json({
      errorMessage: "The users' information could not be retrieved."
    })
  }
})

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await db.findById(id)
    if (!user) {
      res.status(404).json({ message: `No user with id ${id} found` })
    }
    res.status(200).json(user)
  } catch (err) {
    logError(err)
    res.status(500).send(err)
  }
})

app.post('/api/users', async (req, res) => {
  const newUser = req.body
  const validUser = validateUser(newUser, res)

  if (validUser) {
    try {
      const { id } = await db.insert(newUser)
      const createdUser = await db.findById(id)
      res.status(201).json(createdUser)
    } catch (err) {
      logError(err)
      res.status(500).json({
        errorMessage: 'There was an error while saving the user to the database'
      })
    }
  }
})

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await db.findById(id)
    if (!user) {
      res.status(404).json({ message: `No user with id ${id} found` })
      return
    }
    res.status(200).json(user)
    await db.remove(id)
  } catch (err) {
    logError(err)
    res.status(500).json({ errorMessage: 'The user could not be removed' })
  }
})

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params
  const update = req.body

  const user = await db.findById(id)
  if (!user) {
    res.status(404).json({ message: `No user with id ${id} found` })
    return
  }

  const validUpdate = validateUser(update, res)
  if (validUpdate) {
    try {
      await db.update(id, update)
      const updatedUser = await db.findById(id)
      res.status(200).json(updatedUser)
    } catch (err) {
      logError(err)
      res
        .status(500)
        .json({ errorMessage: 'The user information could not be modified.' })
    }
  }
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})
