require("dotenv").config()
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const TWILIO_PHONE_NUMBER = process.env.PHONE_NUMBER

const client = require("twilio")(accountSid, authToken)

let garbageWeek = true
const theBoys = ["Luke", "Duncan", "Sam", "Jp"]
const numbers = ["+16479385063", "+14168261333", "+14168447692", "+14166169331"]
let iter = 3

const express = require("express")
const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => {
  client.messages.create({
    body: "App is live!",
    from: TWILIO_PHONE_NUMBER,
    to: "+16479385063",
  })
  setTimeout(tuesdayMessage, 85800000)
})

app.get("/", (req, res) => {
  res.send("Plz work!")
})

// Tuesday @8pm
const tuesdayMessage = () => {
  client.messages
    .create({
      body: garbageWeek
        ? `Good Evening ${theBoys[iter]}! In case you haven't done so already, the Recycling, Compost, and Garbage need to be taken to the curb by tonight. Cheers.`
        : `Good Evening ${theBoys[iter]}! In case you haven't done so already, the Recycling and Compost need to be taken to the curb by tonight. Cheers.`,
      from: TWILIO_PHONE_NUMBER,
      to: numbers[iter],
    })
    .then((message) => {
      garbage = !garbage
      setTimeout(sundayMessage1, 396000000)
    })
}

// Sunday @10am
const sundayMessage1 = () => {
  client.messages
    .create({
      body: `Good Morning ${
        theBoys[iter]
      }! Please empty the Recycling, Green bin, and Garbage one last time so that ${whoIsNext()} may start their week with a clean slate. After that, you are free!`,
      from: TWILIO_PHONE_NUMBER,
      to: numbers[iter],
    })
    .then((message) => {
      if (iter === 3) {
        iter = 0
      } else {
        iter++
      }
      setTimeout(sundayMessage2, 28800000)
    })
}

// Sunday @6pm
const sundayMessage2 = () => {
  client.messages
    .create({
      body: `Good Evening ${theBoys[iter]}! Heads up, You're on garbage this week.`,
      from: TWILIO_PHONE_NUMBER,
      to: numbers[iter],
    })
    .then((message) => {
      console.log(message.body)
      setTimeout(tuesdayMessage, 180000000)
    })
}

function whoIsNext(num) {
  if (num === 3) {
    return "Luke"
  } else {
    return theBoys[num + 1]
  }
}


