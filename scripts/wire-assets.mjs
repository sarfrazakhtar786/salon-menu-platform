import fs from "fs";
import path from "path";

const root = path.resolve(".");

function replaceBlock(html, start, end, replacement) {
  const i = html.indexOf(start);
  const j = html.indexOf(end, i);
  if (i === -1 || j === -1) throw new Error(`Block not found: ${start}`);
  return html.slice(0, i) + replacement + html.slice(j + end.length);
}

let index = fs.readFileSync(path.join(root, "index.html"), "utf8");
index = replaceBlock(
  index,
  "  <style>",
  "  </style>",
  `  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/home.css">`
);
index = replaceBlock(
  index,
  "  <script>\n    const state",
  "  </script>",
  `  <script src="/assets/js/utils.js" defer></script>
  <script src="/assets/js/home.js" defer></script>`
);
fs.writeFileSync(path.join(root, "index.html"), index);

let salon = fs.readFileSync(path.join(root, "salon.html"), "utf8");
salon = replaceBlock(
  salon,
  "  <style>",
  "  </style>",
  `  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/salon.css">`
);
salon = replaceBlock(
  salon,
  "  <script src=\"/assets/js/qrcode.min.js\"></script>\n  <script>\n    let currentSalon",
  "  </script>",
  `  <script src="/assets/js/qrcode.min.js"></script>
  <script src="/assets/js/utils.js"></script>
  <script src="/assets/js/salon.js"></script>`
);
fs.writeFileSync(path.join(root, "salon.html"), salon);

console.log("HTML updated.");
