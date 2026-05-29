import fs from "fs";
import path from "path";

const dataPath = path.resolve("salons/data.json");
const raw = fs.readFileSync(dataPath, "utf8");
const salons = JSON.parse(raw);

const errors = [];
const slugs = Object.keys(salons);
const slugSet = new Set();

const whatsappPattern = /^92\d{9,11}$/;

function push(slug, message) {
  errors.push(`${slug}: ${message}`);
}

for (const slug of slugs) {
  if (slugSet.has(slug)) push(slug, "duplicate slug");
  slugSet.add(slug);

  const salon = salons[slug];
  const required = ["name", "city", "whatsapp", "services", "hero_image"];
  for (const field of required) {
    if (salon[field] === undefined || salon[field] === null || salon[field] === "") {
      push(slug, `missing required field "${field}"`);
    }
  }

  if (salon.whatsapp && !whatsappPattern.test(String(salon.whatsapp))) {
    push(slug, `invalid whatsapp "${salon.whatsapp}" (use 92XXXXXXXXXX)`);
  }

  const serviceCount = Object.values(salon.services || {}).flat().length;
  if (serviceCount < 1) push(slug, "services must include at least one item");

  for (const [category, items] of Object.entries(salon.services || {})) {
    items.forEach((service, index) => {
      if (typeof service.price !== "number") {
        push(slug, `services.${category}[${index}].price must be a number`);
      }
    });
  }

  for (const [index, pkg] of (salon.packages || []).entries()) {
    if (typeof pkg.price !== "number") push(slug, `packages[${index}].price must be a number`);
    if (pkg.original_price !== undefined && typeof pkg.original_price !== "number") {
      push(slug, `packages[${index}].original_price must be a number`);
    }
  }
}

if (errors.length) {
  console.error("Salon data validation failed:\n");
  errors.forEach((line) => console.error(`- ${line}`));
  process.exit(1);
}

console.log(`OK: ${slugs.length} salon(s) validated in salons/data.json`);
