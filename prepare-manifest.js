const fs = require("fs-extra");

async function prepareManifest() {
  const target = process.argv[2];

  if (!target) {
    console.error("Specify target: chrome or ff");
    process.exit(1);
  }

  const manifestSource = target === "chrome" ? "public/manifest.chrome.json" : "public/manifest.firefox.json";
  const manifestDestination = "public/manifest.json";

  try {
    await fs.copy(manifestSource, manifestDestination);
    console.log(`✅ Copied ${manifestSource} to ${manifestDestination}`);
  } catch (error) {
    console.error("Failed to copy manifest:", error);
    process.exit(1);
  }
}

prepareManifest();
