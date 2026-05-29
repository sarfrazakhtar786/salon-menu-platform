/**
 * Generates supabase/seed-demo-salons.sql from salons/data.json
 * Run: node scripts/generate-supabase-seed.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(root, "salons/data.json"), "utf8"));

function sqlStr(value) {
  if (value === null || value === undefined || value === "") return "null";
  return `'${String(value).replace(/'/g, "''")}'`;
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function citySlug(city) {
  return slugify(city);
}

function salonIdExpr(slug) {
  return `(select id from public.salons where slug = ${sqlStr(slug)})`;
}

const extraTags = new Set();
Object.values(data).forEach(salon => {
  (salon.business_tags || []).forEach(tag => extraTags.add(tag));
});

let sql = `-- =============================================================================
-- SalonMenu.pk — Demo salon seed (generated from salons/data.json)
-- Run in Supabase SQL Editor AFTER mvp-schema.sql
-- Safe to re-run: deletes demo slugs then re-inserts
-- =============================================================================

delete from public.salons
where slug in ('noor', 'glamour', 'rose-beauty-parlour');

`;

extraTags.forEach(tag => {
  sql += `insert into public.business_tags (name, slug) values (${sqlStr(tag)}, ${sqlStr(slugify(tag))}) on conflict (slug) do nothing;\n`;
});

sql += "\n";

for (const [slug, salon] of Object.entries(data)) {
  const rating = parseFloat(salon.stats?.rating) || null;
  const cSlug = citySlug(salon.city);
  const sid = salonIdExpr(slug);

  sql += `-- ${salon.name}\n`;
  sql += `insert into public.salons (\n`;
  sql += `  slug, status, verification_status, name, tagline,\n`;
  sql += `  city_id, city_name, area, address, phone, whatsapp,\n`;
  sql += `  timings, weekly_off, brand_color, price_level, hero_image_url,\n`;
  sql += `  stats_clients_label, stats_experience_label, stats_rating,\n`;
  sql += `  is_featured, published_at\n`;
  sql += `) values (\n`;
  sql += `  ${sqlStr(slug)}, 'published', 'verified',\n`;
  sql += `  ${sqlStr(salon.name)}, ${sqlStr(salon.tagline)},\n`;
  sql += `  (select id from public.cities where slug = ${sqlStr(cSlug)}),\n`;
  sql += `  ${sqlStr(salon.city)}, ${sqlStr(salon.area)}, ${sqlStr(salon.address)},\n`;
  sql += `  ${sqlStr(salon.phone)}, ${sqlStr(salon.whatsapp)},\n`;
  sql += `  ${sqlStr(salon.timings)}, ${sqlStr(salon.weekly_off)},\n`;
  sql += `  ${sqlStr(salon.color || "#BD8282")}, ${sqlStr(salon.price_level)},\n`;
  sql += `  ${sqlStr(salon.hero_image)},\n`;
  sql += `  ${sqlStr(salon.stats?.clients)}, ${sqlStr(salon.stats?.experience)},\n`;
  sql += `  ${rating ?? "null"}, true, now()\n`;
  sql += `);\n\n`;

  (salon.gallery || []).forEach((url, i) => {
    sql += `insert into public.salon_gallery_images (salon_id, image_url, sort_order) values (${sid}, ${sqlStr(url)}, ${i});\n`;
  });

  (salon.business_tags || []).forEach(tag => {
    sql += `insert into public.salon_tags (salon_id, tag_id)\n`;
    sql += `select ${sid}, bt.id from public.business_tags bt where bt.slug = ${sqlStr(slugify(tag))};\n`;
  });

  const socialMap = { instagram: "instagram", facebook: "facebook", tiktok: "tiktok" };
  Object.entries(salon.socials || {}).forEach(([key, url]) => {
    if (!url) return;
    const platform = socialMap[key];
    if (!platform) return;
    sql += `insert into public.salon_social_links (salon_id, platform, url) values (${sid}, '${platform}'::public.social_platform, ${sqlStr(url)})\n`;
    sql += `on conflict (salon_id, platform) do update set url = excluded.url;\n`;
  });

  let catOrder = 0;
  for (const [catName, services] of Object.entries(salon.services || {})) {
    const catSlug = slugify(catName);
    sql += `insert into public.service_categories (salon_id, name, slug, sort_order)\n`;
    sql += `values (${sid}, ${sqlStr(catName)}, ${sqlStr(catSlug)}, ${catOrder});\n`;
    services.forEach((svc, i) => {
      sql += `insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)\n`;
      sql += `select ${sid}, sc.id, ${sqlStr(svc.name)}, ${sqlStr(svc.desc)}, ${sqlStr(svc.time)}, ${svc.price}, ${i}\n`;
      sql += `from public.service_categories sc where sc.salon_id = ${sid} and sc.slug = ${sqlStr(catSlug)};\n`;
    });
    catOrder += 1;
  }

  (salon.packages || []).forEach((pkg, pi) => {
    sql += `insert into public.packages (salon_id, name, price_pkr, original_price_pkr, promo_tag, sort_order)\n`;
    sql += `values (${sid}, ${sqlStr(pkg.name)}, ${pkg.price}, ${pkg.original_price ?? "null"}, ${sqlStr(pkg.tag)}, ${pi});\n`;
    (pkg.includes || []).forEach((label, ii) => {
      sql += `insert into public.package_items (package_id, label, sort_order)\n`;
      sql += `select p.id, ${sqlStr(label)}, ${ii} from public.packages p\n`;
      sql += `where p.salon_id = ${sid} and p.name = ${sqlStr(pkg.name)};\n`;
    });
  });

  (salon.reviews || []).forEach(review => {
    sql += `insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)\n`;
    sql += `values (${sid}, ${sqlStr(review.author)}, ${sqlStr(review.text)}, ${review.stars}, ${review.verified ? "true" : "false"});\n`;
  });

  sql += "\n";
}

sql += `-- Verify\nselect slug, name, city_name, status from public.salons order by name;\n`;

const outPath = join(root, "supabase/seed-demo-salons.sql");
writeFileSync(outPath, sql, "utf8");
console.log(`Wrote ${outPath} (${sql.length} bytes)`);
