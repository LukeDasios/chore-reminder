require("dotenv").config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const messagingServiceSid = process.env.MESSAGING_SERVICE_SID
const client = require("twilio")(accountSid, authToken)

let garbageWeek = true
const theBoys = ["Luke", "Duncan", "Sam", "Jp"]
const numbers = ["+16479385063", "+14168261333", "+14168447692", "+14166169331"]
let iter = 3

const daysInMonth = new Map()
daysInMonth.set(1, 31)
daysInMonth.set(2, 28)
daysInMonth.set(3, 31)
daysInMonth.set(4, 30)
daysInMonth.set(5, 31)
daysInMonth.set(6, 30)
daysInMonth.set(7, 31)
daysInMonth.set(8, 31)
daysInMonth.set(9, 30)
daysInMonth.set(10, 31)
daysInMonth.set(11, 30)
daysInMonth.set(12, 31)

// Sent on Sunday Morning @10am
client.messages
  .create({
    messagingServiceSid: messagingServiceSid,
    body: garbageWeek
      ? `Good Evening ${theBoys[iter]}! In case you haven't already done so already, friendly reminder that the Recycling, Compost, and Garbage need to be taken to the curb by tonight. Cheers.`
      : `Good Evening ${theBoys[iter]}! In case you haven't already done so already, friendly reminder that the Recycling and Compost need to be taken to the curb by tonight. Cheers.`,
    sendAt: new Date(Date.UTC(2022, 6, 12, 11, 35)),
    scheduleType: "fixed",
    statusCallback: "https://abc1234.free.beeceptor.com",
    to: "+16479385063", //numbers[iter]
  })
  .then((message) => {
    console.log(message)
    console.log(message.body)
  })

// Sent on Tuesday Night @8pm
// client.messages
//   .create({
//     messagingServiceSid: messagingServiceSid,
//     body: "This is a scheduled message",
//     sendAt: calculateNextDate(),
//     scheduleType: "fixed",
//     statusCallback: "https://abc1234.free.beeceptor.com",
//     to: "+16479385063", //numbers[iter]
//   })
//   .then((message) => {
//     if (iter + 1 === theBoys.length) {
//       iter = 0
//     } else {
//       iter++
//     }
//     garbageWeek = !garbageWeek
//   })

function calculateNextDate() {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  let hour = date.getHours()

  if (day + 7 > daysInMonth[month]) {
    day = day + 7 - daysInMonth[month]
    if (month === 12) {
      month = 0
    }
  } else {
    day += 7
  }

  return new Date(Date.UTC(year, month, day, hour))
}

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
