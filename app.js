require("dotenv").config()
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const TWILIO_PHONE_NUMBER = process.env.PHONE_NUMBER

const client = require("twilio")(accountSid, authToken)

const express = require("express")
const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  sendFirstMessage()
})

app.get("/", (req, res) => {
  res.send("Plz work!")
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
