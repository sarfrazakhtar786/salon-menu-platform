import fs from "fs";
import path from "path";

const root = path.resolve(".");

function extractBetween(html, start, end) {
  const i = html.indexOf(start);
  const j = html.indexOf(end, i);
  if (i === -1 || j === -1) throw new Error(`marker not found: ${start}`);
  return html.slice(i + start.length, j).trim();
}

const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const salon = fs.readFileSync(path.join(root, "salon.html"), "utf8");

const indexCss = extractBetween(index, "<style>", "</style>");
const salonCss = extractBetween(salon, "<style>", "</style>");

const indexJs = "const state" + extractBetween(index, "<script>\n    const state", "</script>");
const salonJs = "let currentSalon" + extractBetween(salon, "<script>\n    let currentSalon", "</script>");

const dedent = (text) => text.replace(/^ {4}/gm, "");

const rootBlock = indexCss.match(/:root\s*\{[\s\S]*?\}/)[0];
const stripRoot = (css) => css.replace(/:root\s*\{[\s\S]*?\}\s*/, "").trim();

fs.mkdirSync(path.join(root, "assets/css"), { recursive: true });
fs.writeFileSync(path.join(root, "assets/css/tokens.css"), `${rootBlock}\n`);
fs.writeFileSync(path.join(root, "assets/css/home.css"), stripRoot(indexCss));
fs.writeFileSync(
  path.join(root, "assets/css/salon.css"),
  `:root { --shadow: 0 24px 60px rgba(132, 80, 81, 0.13); }\n\n${stripRoot(salonCss)}`
);

const utils = `window.SalonMenu = window.SalonMenu || {};

SalonMenu.escapeHtml = function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

SalonMenu.escapeAttr = function escapeAttr(value) {
  return SalonMenu.escapeHtml(value);
};

SalonMenu.money = function money(amount) {
  return \`Rs. \${Number(amount || 0).toLocaleString()}\`;
};

SalonMenu.xmlEscape = function xmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};
`;

fs.writeFileSync(path.join(root, "assets/js/utils.js"), utils);

const stripHelpers = (js) =>
  js
    .replace(/function escapeHtml[\s\S]*?function escapeAttr[\s\S]*?\}\n\n/, "")
    .replace(/function money\(amount\) \{[\s\S]*?\}\n\n/, "")
    .replace(/function xmlEscape\(value\) \{[\s\S]*?\}\n\n/, "")
    .replace(/\bescapeHtml\b/g, "SalonMenu.escapeHtml")
    .replace(/\bescapeAttr\b/g, "SalonMenu.escapeAttr")
    .replace(/\bmoney\b/g, "SalonMenu.money")
    .replace(/\bxmlEscape\b/g, "SalonMenu.xmlEscape");

fs.writeFileSync(path.join(root, "assets/js/home.js"), dedent(stripHelpers(indexJs)));
fs.writeFileSync(path.join(root, "assets/js/salon.js"), dedent(stripHelpers(salonJs)));

console.log("Assets extracted.");
