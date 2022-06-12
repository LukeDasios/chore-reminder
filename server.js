require("dotenv").config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const me
const client = require("twilio")(accountSid, authToken)

let garbageWeek = true
const theBoys = ["Luke", "Duncan", "Sam", "Jp"]
const numbers = ["+16479385063", "+14168261333", "+14168447692", "+14166169331"]
let iter = 3

// // Sent on Sunday Morning @10am
// client.messages
//   .create({
//     body: `Good Morning ${theBoys[iter]}! Friendly reminder that you're on garbage duty this week.`,
//     from: process.env.TWILIO_PHONE_NUMBER,
//     to: numbers[iter],
//   })
//   .then((message) => {
//     console.log(message.sid)
//   })

// // Sent on Tuesday Night @8pm
// client.messages
//   .create({
//     body: garbageWeek
//       ? `Good Afternoon ${theBoys[iter]}! In case you haven't already done so already, friendly reminder that the Recycling, Compost, and Garbage need to be taken to the curb by tonight. Cheers.`
//       : `Good Afternoon ${theBoys[iter]}! In case you haven't already done so already, friendly reminder that the Recycling and Compost need to be taken to the curb by tonight. Cheers.`,
//     from: process.env.TWILIO_PHONE_NUMBER,
//     to: numbers[iter],
//   })
//   .then((message) => {
//     console.log(message.sid)
//     if (iter + 1 === theBoys.length) {
//       iter = 0
//     } else {
//       iter++
//     }
//     garbageWeek = !garbageWeek
//   })


// TEST
client.messages
  .create({
    messagingServiceSid: process.env.MESSAGING_SERVICE_SID,
    body: "This is a scheduled message",
    // Date.UTC(year, month, day, hour, minute)
    from: process.env.TWILIO_PHONE_NUMBER,
    sendAt: new Date(Date.UTC(2022, 6, 11, 21, 333)),
    scheduleType: "fixed",
    statusCallback: null,
    to: "+16479385063",
  })
  .then((message) => {
    console.log(message.sid)
  })


  // *** EXAMPLE JSON RESPONSE ***
  // {
  //   "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  //   "api_version": "2010-04-01",
  //   "body": "This is a scheduled message",
  //   "date_created": "Mon, 29 Nov 2021 22:40:10 +0000",
  //   "date_sent": null,
  //   "date_updated": "Mon, 29 Nov 2021 22:40:10 +0000",
  //   "direction": "outbound-api",
  //   "error_code": null,
  //   "error_message": null,
  //   "from": null,
  //   "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  //   "num_media": "0",
  //   "num_segments": "0",
  //   "price": null,
  //   "price_unit": null,
  //   "sid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  //   "status": "scheduled",
  //   "subresource_uris": {
  //     "media": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Media.json"
  //   },
  //   "to": "+15558675310",
  //   "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json"
  // }
