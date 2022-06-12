const twilio = require("twilio")

const accountSid = process.env.TWILIO_ACCOUNT_SID // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN // Your Auth Token from www.twilio.com/console

const client = new twilio(accountSid, authToken)

client.messages
  .create({
    body: "Hello from Node!",
    to: process.env.MY_PHONE_NUMBER, // Text this number
    from: process.env.TWILIO_PHONE_NUMBER, // From a valid Twilio number
  })
  .then((message) => console.log(message.sid))
