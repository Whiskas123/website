#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const imagesDir = path.join(process.cwd(), "public/images");
const outputDir = path.join(process.cwd(), "public/images/optimized");

// Create optimized directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Check if ImageMagick is installed
try {
  execSync("convert --version", { stdio: "ignore" });
} catch (error) {
  console.error("ImageMagick is not installed. Please install it first:");
  console.error("macOS: brew install imagemagick");
  console.error("Ubuntu/Debian: sudo apt-get install imagemagick");
  console.error("Windows: Download from https://imagemagick.org/");
  process.exit(1);
}

// Large images that need optimization
const largeImages = [
  "joana_neto.jpg", // 22MB
  "formacao.jpg", // 28MB
  "domestico.png", // 12MB
  "zenha_martins.jpg", // 7.8MB
  "ct1.jpg", // 2.5MB
  "dr_1.jpeg", // 2.0MB
  "ssd0.png", // 1.6MB
  "ssd1.png", // 2.8MB
  "ssd2.png", // 2.2MB
  "ssd3.png", // 1.0MB
  "ssd4.png", // 3.2MB
];

console.log("Starting image optimization...");

largeImages.forEach((imageName) => {
  const inputPath = path.join(imagesDir, imageName);
  const outputName = imageName.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  const outputPath = path.join(outputDir, outputName);

  if (fs.existsSync(inputPath)) {
    try {
      console.log(`Optimizing ${imageName}...`);

      // Convert to WebP with quality optimization
      execSync(
        `convert "${inputPath}" -quality 85 -resize 1200x1200\\> "${outputPath}"`,
        { stdio: "inherit" }
      );

      const originalSize = fs.statSync(inputPath).size;
      const optimizedSize = fs.statSync(outputPath).size;
      const savings = (
        ((originalSize - optimizedSize) / originalSize) *
        100
      ).toFixed(1);

      console.log(
        `✅ ${imageName}: ${(originalSize / 1024 / 1024).toFixed(1)}MB → ${(
          optimizedSize /
          1024 /
          1024
        ).toFixed(1)}MB (${savings}% smaller)`
      );
    } catch (error) {
      console.error(`❌ Failed to optimize ${imageName}:`, error.message);
    }
  } else {
    console.log(`⚠️  ${imageName} not found, skipping...`);
  }
});

console.log("\nImage optimization complete!");
console.log("Optimized images are saved in:", outputDir);
console.log("\nNext steps:");
console.log(
  "1. Update image paths in your components to use the optimized versions"
);
console.log(
  "2. Consider using the optimized images as fallbacks for older browsers"
);
console.log("3. Test the website to ensure images load faster");
