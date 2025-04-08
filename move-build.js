const fs = require("fs-extra");
const path = require("path");

const buildDir = "build";
const targetDir = process.env.BUILD_DIR;
const target = process.env.TARGET;
async function cleanBuildFolder() {
  try {
    const filesToRemove = [path.join(buildDir, "manifest.chrome.json"), path.join(buildDir, "manifest.firefox.json")];

    if (target === "chrome") {
      filesToRemove.push(path.join(buildDir, "browser-polyfill.min.js"));
    }

    for (const filePath of filesToRemove) {
      if (await fs.pathExists(filePath)) {
        await fs.remove(filePath);
        console.log(`✅ Removed ${filePath}`);
      }
    }
  } catch (error) {
    console.error("❌ Error cleaning build folder:", error);
    process.exit(1);
  }
}

async function moveBuildFolder() {
  try {
    await fs.remove(targetDir);
    await fs.move(buildDir, targetDir);
    console.log(`✅ Moved build/ to ${targetDir}/`);
  } catch (error) {
    console.error("❌ Error moving build folder:", error);
    process.exit(1);
  }
}

async function main() {
  await cleanBuildFolder();
  await moveBuildFolder();
}

main();
