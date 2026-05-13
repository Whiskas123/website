#!/usr/bin/env node

/**
 * Image optimization script
 * Resizes and compresses images in public/images to web-friendly sizes.
 * 
 * Requirements: ImageMagick (`brew install imagemagick` on macOS)
 * 
 * Usage: node scripts/optimize-images.js
 *   --dry-run    Show what would be done without modifying files
 *   --max-width  Max width in pixels (default: 1600)
 *   --quality    JPEG quality 1-100 (default: 82)
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const maxWidth = parseInt(args.find((a) => a.startsWith("--max-width="))?.split("=")[1] || "1600");
const quality = parseInt(args.find((a) => a.startsWith("--quality="))?.split("=")[1] || "82");

const imagesDir = path.join(process.cwd(), "public/images");
const MIN_SIZE_BYTES = 500 * 1024; // Only optimize files > 500KB

// Check if ImageMagick is installed
try {
  execSync("magick --version", { stdio: "ignore" });
} catch {
  try {
    execSync("convert --version", { stdio: "ignore" });
  } catch {
    console.error("ImageMagick is not installed. Install it with:");
    console.error("  macOS: brew install imagemagick");
    console.error("  Ubuntu: sudo apt-get install imagemagick");
    process.exit(1);
  }
}

const imageFiles = fs.readdirSync(imagesDir).filter((f) => {
  const ext = path.extname(f).toLowerCase();
  return [".jpg", ".jpeg", ".png"].includes(ext);
});

console.log(`Found ${imageFiles.length} images in ${imagesDir}`);
console.log(`Settings: max-width=${maxWidth}px, quality=${quality}, min-size=${MIN_SIZE_BYTES / 1024}KB`);
if (dryRun) console.log("DRY RUN — no files will be modified\n");

let totalSaved = 0;
let optimizedCount = 0;

for (const file of imageFiles) {
  const filePath = path.join(imagesDir, file);
  const stat = fs.statSync(filePath);

  if (stat.size < MIN_SIZE_BYTES) continue;

  const sizeMB = (stat.size / 1024 / 1024).toFixed(1);
  const ext = path.extname(file).toLowerCase();
  const isJpeg = ext === ".jpg" || ext === ".jpeg";

  // Build ImageMagick command
  const qualityFlag = isJpeg ? `-quality ${quality}` : `-quality ${quality}`;
  const cmd = `magick "${filePath}" -resize ${maxWidth}x${maxWidth}\\> -strip ${qualityFlag} "${filePath}"`;

  if (dryRun) {
    console.log(`Would optimize: ${file} (${sizeMB} MB)`);
    optimizedCount++;
    continue;
  }

  try {
    // Create backup
    const backupPath = filePath + ".bak";
    fs.copyFileSync(filePath, backupPath);

    execSync(cmd, { stdio: "pipe" });

    const newStat = fs.statSync(filePath);
    const saved = stat.size - newStat.size;

    if (saved > 0) {
      totalSaved += saved;
      optimizedCount++;
      const newSizeMB = (newStat.size / 1024 / 1024).toFixed(1);
      const pct = ((saved / stat.size) * 100).toFixed(0);
      console.log(`✅ ${file}: ${sizeMB}MB → ${newSizeMB}MB (-${pct}%)`);
      // Remove backup on success
      fs.unlinkSync(backupPath);
    } else {
      // Restore backup if no improvement
      fs.copyFileSync(backupPath, filePath);
      fs.unlinkSync(backupPath);
      console.log(`⏭️  ${file}: already optimal`);
    }
  } catch (error) {
    // Restore backup on error
    const backupPath = filePath + ".bak";
    if (fs.existsSync(backupPath)) {
      fs.copyFileSync(backupPath, filePath);
      fs.unlinkSync(backupPath);
    }
    console.error(`❌ ${file}: ${error.message}`);
  }
}

console.log(`\nDone! Optimized ${optimizedCount} images.`);
if (!dryRun && totalSaved > 0) {
  console.log(`Total saved: ${(totalSaved / 1024 / 1024).toFixed(1)} MB`);
}
