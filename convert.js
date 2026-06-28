const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const assetsDir = path.join(__dirname, 'assets');

async function convertImages() {
  try {
    const files = fs.readdirSync(assetsDir);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        const inputPath = path.join(assetsDir, file);
        const baseName = path.basename(file, ext);
        const outputPath = path.join(assetsDir, `${baseName}.webp`);
        
        console.log(`Converting ${file} to ${baseName}.webp...`);
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        // Delete original file to save space and keep it clean
        fs.unlinkSync(inputPath);
      }
    }
    console.log("All images converted to .webp successfully.");
  } catch (error) {
    console.error("Error converting images:", error);
  }
}

convertImages();
