const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

function deleteIfExists(filePath) {
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`🗑️ Removed existing archive: ${filePath}`);
    } catch (err) {
      console.error(`❌ Error deleting ${filePath}:`, err);
      throw err;
    }
  }
}

function zipDirectory(sourceDir, outPath) {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on("error", (err) => reject(err))
      .pipe(stream);

    stream.on("close", () => resolve());
    archive.finalize();
  });
}

async function main() {
  try {
    const chromeZipPath = path.join(__dirname, "VK Tools.zip");
    const firefoxZipPath = path.join(__dirname, "VK Tools FireFox.zip");

    deleteIfExists(chromeZipPath);
    await zipDirectory("build_chrome", chromeZipPath);
    console.log("✅ Created VK Tools.zip");

    deleteIfExists(firefoxZipPath);
    await zipDirectory("build_ff", firefoxZipPath);
    console.log("✅ Created VK Tools FireFox.zip");
  } catch (error) {
    console.error("❌ Error creating zip:", error);
    process.exit(1);
  }
}

main();
