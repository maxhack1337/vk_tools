const fs = require("fs");
const path = require("path");

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp);
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}

const manifestPath = path.join(__dirname, "public", "manifest.json");

if (fs.existsSync(manifestPath)) {
  fs.unlinkSync(manifestPath);
  console.log("🧹 Removed public/manifest.json after build");
  console.log("🕒 Build time: " + timeConverter(Date.now()));
} else {
  console.log("ℹ️ No public/manifest.json to remove");
}
