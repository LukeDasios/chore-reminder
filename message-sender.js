require("dotenv").config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const messagingServiceSid = process.env.MESSAGING_SERVICE_SID
const client = require("twilio")(accountSid, authToken)
const ONE_WEEK = 604800000

let garbageWeek = true
const theBoys = ["Luke", "Duncan", "Sam", "Jp"]
const numbers = ["+16479385063", "+14168261333", "+14168447692", "+14166169331"]
let iter = 3



// Sent on Sunday Morning @10am
const sundayMessages = (date) => {
  client.messages
    .create({
      messagingServiceSid: messagingServiceSid,
      body: garbageWeek
        ? `Good Evening ${theBoys[iter]}! In case you haven't already done so already, friendly reminder that the Recycling, Compost, and Garbage need to be taken to the curb by tonight. Cheers.`
        : `Good Evening ${theBoys[iter]}! In case you haven't already done so already, friendly reminder that the Recycling and Compost need to be taken to the curb by tonight. Cheers.`,
      sendAt: date,
      scheduleType: "fixed",
      statusCallback: null,
      to: "+16479385063", //numbers[iter]
    })
    .then((message) => {
      date1 = calculateNextDate()
      setTimeout(sundayMessages, ONE_WEEK, date1)
    })
}

// Sent on Tuesday Night @8pm
const tuesdayMessage = (date) => {
  client.messages
    .create({
      messagingServiceSid: messagingServiceSid,
      body: "This is a scheduled message",
      sendAt: date,
      scheduleType: "fixed",
      statusCallback: "https://abc1234.free.beeceptor.com",
      to: "+16479385063", //numbers[iter]
    })
    .then((message) => {
      if (iter + 1 === theBoys.length) {
        iter = 0
      } else {
        iter++
      }
      garbageWeek = !garbageWeek
      date = calculateNextDate()
      setTimeout(tuesdayMessage, ONE_WEEK, date)
    })
}

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

tuesdayMessage(date1)
sundayMessages(date2)
