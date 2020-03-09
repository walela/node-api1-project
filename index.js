// implement your API here
const db = require("./data/db.js")
const express = require("express")

const app = express()
const PORT = 4001

app.use(express.json())

app.get("/", (req, res) => {
  res.status(200).json({ message: "You're at the root endpoint" })
})

app.get("/hello", (req, res) => {
  res.status(200).json({ name: "Austin Walela" })
})

app.get("/api/friends", (req, res) => {
  console.log(req)
  res.status(200).json({})
})

app.listen(PORT, () => {
  console.log("Server running on port 4001")
})
