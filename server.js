require("dotenv").config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require("twilio")(accountSid, authToken)

let garbageWeek = true
const theBoys = ["Luke", "Duncan", "Sam", "Jp"]
const numbers = ["+16479385063", "+14168261333", "+14168447692", "+14166169331"]
let iter = 3

// Sent on Sunday Morning @10am
client.messages
  .create({
    body: `Hi ${theBoys[iter]}! Friendly reminder that you're on garbage duty this week.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: numbers[iter],
  })
  .then((message) => {
    console.log(message.sid)
  })

// Sent on Tuesday Night @8pm
client.messages
  .create({
    body: garbageWeek
      ? `Hi ${theBoys[iter]}! Friendly reminder that the Recycling, Compost, and Garbage need to be taken to the curb by tonight. Cheers.`
      : `Hi ${theBoys[iter]}! Friendly reminder that the Recycling and Compost need to be taken to the curb by tonight. Cheers.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: numbers[iter],
  })
  .then((message) => {
    console.log(message.sid)
    if (iter + 1 === theBoys.length) {
      iter = 0
    } else {
      iter++
    }
    garbageWeek = !garbageWeek
  })
