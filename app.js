const accountSid = "ACc2ed636bb7d6baade93ff415e3c221b1"
const authToken = "c78229c27d15242385b5a802a79444f4"
const TWILIO_PHONE_NUMBER = "+19033213550"

const client = require("twilio")(accountSid, authToken)

const express = require("express")
const app = express()
const port = 3000

app.get("/", (req, res) => {
  sendFirstMessage()
  res.send("Hello World!")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const sendFirstMessage = () => {
  client.messages
    .create({
      body: "First Message!",
      from: TWILIO_PHONE_NUMBER,
      to: "+16479385063",
    })
    .then((message) => {
      console.log(message.body)
      setTimeout(sendSecondMessage, 5000)
    })
}

const sendSecondMessage = () => {
  client.messages
    .create({
      body: "Second Message!",
      from: TWILIO_PHONE_NUMBER,
      to: "+16479385063",
    })
    .then((message) => {
      console.log(message.body)
      setTimeout(sendFirstMessage, 5000)
    })
}

// const sendThirdMessage = () => {
//   client.messages
//     .create({
//       body: "Third Message!",
//       from: TWILIO_PHONE_NUMBER,
//       to: "+16479385063",
//     })
//     .then((message) => {
//       console.log(message.body)
//       setTimeout(sendFirstMessage, 5000)
//     })
// }
