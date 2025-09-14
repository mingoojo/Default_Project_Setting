import express from "express"

const port = 3000

const app = express()

app.get("/", (req, res) => {
  res.send("hello express")
})

app.listen(port, () => {
  console.log(`server is running at ${port}`)
})