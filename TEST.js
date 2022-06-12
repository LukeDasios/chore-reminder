require("dotenv").config()
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require("twilio")(accountSid, authToken)
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER

client.messages
  .create({
    body: "This is just for us to test the webhook.",
    from: TWILIO_PHONE_NUMBER,
    statusCallback: "https://abc1234.free.beeceptor.com",
    to: "+16479385063", // My phone number
  })
  .then((message) => console.log(message))
