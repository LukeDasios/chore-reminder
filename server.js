// const http = require("http")
// const express = require("express")
// const bodyParser = require("body-parser")

// const app = express()

// app.use(bodyParser.urlencoded({ extended: true }))

// app.post("/MessageStatus", (req, res) => {
//   const messageSid = req.body.MessageSid
//   const messageStatus = req.body.MessageStatus

//   console.log(`SID: ${messageSid}, Status: ${messageStatus}`)

//   res.sendStatus(200)
// })

// http.createServer(app).listen(1337, () => {
//   console.log("Express server listening on port 1337...")
// })

const express = require("express")
const app = express()
const port = 3000

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.get("/home", (req, res) => {
  res.send("This it the home page!")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
