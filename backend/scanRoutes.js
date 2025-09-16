// scanRoutes.js
import fs from "fs";
import path from "path";

const ROUTES_DIR = path.join(process.cwd(),"src", "Routes"); // adjust if your folder name is different

function checkRouteLine(line, filePath, lineNumber) {
  const paramPattern = /\/:([^\s/]+)/g;
  let match;
  while ((match = paramPattern.exec(line)) !== null) {
    const paramName = match[1];
    if (!paramName || /[^a-zA-Z0-9_]/.test(paramName)) {
      console.log(`❌ Invalid route parameter in ${filePath} at line ${lineNumber}: "${line.trim()}"`);
    }
  }

  // Check for bare colon
  if (line.includes("/:") && !line.match(/\/:[a-zA-Z0-9_]+/)) {
    console.log(`❌ Possible missing parameter name in ${filePath} at line ${lineNumber}: "${line.trim()}"`);
  }
}

function scanFiles(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanFiles(fullPath);
    } else if (file.endsWith(".js")) {
      const content = fs.readFileSync(fullPath, "utf-8");
      content.split("\n").forEach((line, idx) => {
        if (line.includes("/:")) {
          checkRouteLine(line, fullPath, idx + 1);
        }
      });
    }
  });
}

scanFiles(ROUTES_DIR);
console.log("✅ Route scan completed!");
