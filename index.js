const express = require('express')
const db = require('./data/db')

const PORT = 3000

const app = express()

app.use(express.json())

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

// app.delete('/api/users/:id', (req, res) => {
//   const userId = req.params.id

//   db.findById(userId).then(data => {
//     if (data === undefined) {
//       res.status(404).json({ message: `No user with id ${userId} found` })
//       return
//     }
//     res.status(200).json(data)
//     db.remove(userId)
//       .then(delCount => console.log(`${delCount} records deleted`))
//       .catch(() => {
//         res.status(500).json({ errorMessage: 'The user could not be removed' })
//       })
//   })
// })

app.put('/api/users:id', (req, res) => {
  const userId = req.params.id
  const update = req.body

  db.findById(userId).then(data => {
    if (data === undefined) {
      res.status(404).json({ message: `No user with id ${userId} found` })
      return
    }
  })

  if (!update.name || !update.bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user' })
    return
  } else {
    db.update(userId, update)
      .then(() => {
        db.findById(userId).then(data => {
          res.status(200).json(data)
        })
      })
      .catch(err => {
        res
          .status(500)
          .json({ errorMessage: 'The user information could not be modified.' })
      })
  }
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})
