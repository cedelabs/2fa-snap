totp = require("totp-generator", {period: 30});
console.log(totp("ETHLISBON"));

let timestamp = Date.now()
console.log(Math.round(timestamp))
