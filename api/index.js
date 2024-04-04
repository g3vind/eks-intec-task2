import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import User from "./models/user.model.js"
const app = express()
app.use(cors())
app.use(express.json())

mongoose
  .connect(
    "mongodb+srv://g3vind:bMQkcvRFNHlm7iNe@cluster0.pcbyuhm.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("CONNECTED TO DATABASE")
  })
  .catch((error) => {
    console.error("ERROR IN CONNECTING TO DB:", error)
  })

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
  res.send("<h1>Server is running</h1>")
})

app.get("/getUsers", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err))
})

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})
