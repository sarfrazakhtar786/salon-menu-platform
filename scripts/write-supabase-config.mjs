/**
 * Writes assets/js/supabase-config.js from environment variables.
 * Used on Vercel (build) and optionally locally via .env / .env.local.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outPath = path.join(root, "assets", "js", "supabase-config.js");

function loadEnvFile(filename) {
  const filePath = path.join(root, filename);
  if (!fs.existsSync(filePath)) return;
  const text = fs.readFileSync(filePath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");

const url = (process.env.SUPABASE_URL || "").trim();
const anonKey = (process.env.SUPABASE_ANON_KEY || "").trim();
const enabledFlag = (process.env.SUPABASE_ENABLED || "").trim().toLowerCase();
const onVercel = process.env.VERCEL === "1";
const hasEnvInput =
  Boolean(url || anonKey) ||
  enabledFlag === "true" ||
  enabledFlag === "1" ||
  enabledFlag === "false" ||
  enabledFlag === "0";

if (fs.existsSync(outPath) && !onVercel && !hasEnvInput) {
  console.log(
    "supabase-config.js unchanged (file exists; set SUPABASE_* in .env.local or pass env to overwrite)."
  );
  process.exit(0);
}

let enabled = false;
if (enabledFlag === "true" || enabledFlag === "1") {
  enabled = Boolean(url && anonKey);
} else if (enabledFlag === "false" || enabledFlag === "0") {
  enabled = false;
} else {
  enabled = Boolean(url && anonKey);
}

const content = `/**
 * Auto-generated — do not commit. Local: copy supabase-config.example.js or use .env + npm run build:config
 */
window.SALONMENU_SUPABASE = {
  enabled: ${enabled},
  url: ${JSON.stringify(url)},
  anonKey: ${JSON.stringify(anonKey)}
};
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, content, "utf8");

if (enabled) {
  console.log("supabase-config.js written (Supabase enabled).");
} else {
  console.log(
    "supabase-config.js written (Supabase disabled — uses /salons/data.json fallback)."
  );
}
