const fs = require("fs");
const path = require("path");

const manifestPath = path.join(__dirname, "public", "manifest.json");

if (fs.existsSync(manifestPath)) {
  fs.unlinkSync(manifestPath);
  console.log("🧹 Removed public/manifest.json after build");
} else {
  console.log("ℹ️ No public/manifest.json to remove");
}
