# SalonMenu.pk — Implementation Plan

Trackable checklist for taking the static MVP to a sellable product. Mark items as you complete them: `- [x]`.

**Related docs:** [README.md](README.md) · [PRODUCT_UPGRADE_PLAN.md](PRODUCT_UPGRADE_PLAN.md) · [SALON_ONBOARDING_GUIDE.md](SALON_ONBOARDING_GUIDE.md) · [DESIGN_HANDOFF_NOTES.md](DESIGN_HANDOFF_NOTES.md)

**Last updated:** 2026-05-29

---

## Demo phase — WhatsApp routing (intentional)

**Current behavior:** `salon.html` sends booking and hero WhatsApp CTAs to the **platform number** (`923007666376`), not each salon’s `whatsapp` field in `salons/data.json`.

**Why:** The three live salons (`noor`, `glamour`, `rose-beauty-parlour`) are **dummy/demo** listings. No real salon owner is onboarded yet. Demo bookings should land with the platform for testing and lead capture.

**Data still collected:** `local-tools/salon-onboarding-form.html` and `data.json` already store per-salon `whatsapp` so the schema is ready for production.

**When to change:** Complete **Phase 1.1** when the **first real salon** is onboarded — route bookings to `salon.whatsapp` (with fallback from `phone`). Until then, platform routing is expected, not a bug.

---

## How to use this file

1. Work phases in order (P0 before P1).
2. Check boxes when done: change `[ ]` to `[x]`.
3. Add notes under a phase if something changes scope.
4. Re-scan `salons/data.json` after any salon onboarding.

---

## Code scan summary (baseline)

Findings from the initial review that drive this plan:

| Priority | Issue | Files |
|----------|-------|-------|
| P0 (deferred) | Bookings use platform WhatsApp during demo; switch to `salon.whatsapp` at first real onboarding | `salon.html` |
| ~~P0~~ Done | `assets/images/` added with logo SVG + hero JPEGs | `assets/`, HTML |
| ~~P0~~ Done | XSS — `escapeHtml` / `escapeAttr` on JSON-rendered content | `index.html`, `salon.html` |
| ~~P0~~ Done | Rose Beauty reviews + `price_level` fixed | `salons/data.json` |
| P1 | No per-salon Open Graph / social preview meta | `salon.html` — meta injected on load; crawlers may need SSG later |
| P1 | QR depends on third-party `api.qrserver.com` | `salon.html` — replaced with local `qrcode.min.js` |
| P1 | Homepage rating shows `*` instead of `★` | `index.html` |
| P2 | Monolithic HTML (CSS + JS inline) | `index.html`, `salon.html` |
| P2 | No JSON validation script / CI | new `scripts/` |
| P2 | `PRODUCT_UPGRADE_PLAN.md` partly outdated vs current code | docs |

**Already done (product):** Discovery homepage, booking modal with customer fields, packages, slug aliases, Vercel rewrites.

---

## Phase 0 — Pre-work

**Goal:** Safe baseline before code changes.

- [ ] Copy / backup `salons/data.json` before edits
- [ ] Note current Vercel deploy URL and last good commit
- [ ] Verify local URLs load:
  - [ ] `/` (homepage)
  - [ ] `/salon.html?salon=noor`
  - [ ] `/salons/glamour`
  - [ ] `/salons/rose-beauty-parlour`
- [ ] Create working branch (e.g. `fix/mvp-production-ready`)
- [ ] List missing assets: logo, `home-hero.jpeg`, salon hero images

**Notes:**

```
Branch name:
Deploy URL:
Missing assets:
```

---

## Phase 1 — P0 Critical fixes

**Goal:** Trust + conversion. Must complete before selling to salons.

### 1.1 WhatsApp routing

**Status:** Deferred until first real salon onboard (see [Demo phase — WhatsApp routing](#demo-phase--whatsapp-routing-intentional)). Demo salons keep platform number for now.

- [ ] Introduce `getSalonWhatsApp(salon)` helper (use `salon.whatsapp`, fallback from `phone`)
- [ ] Hero WhatsApp button → salon number (not platform)
- [ ] Booking form submit → salon number (not platform)
- [ ] Keep platform number `923007666376` for “List Your Salon” CTAs (`index.html`) and optionally for demo-only salons
- [ ] Test first real salon → booking opens correct `salon.whatsapp`
- [ ] Update [SALON_ONBOARDING_GUIDE.md](SALON_ONBOARDING_GUIDE.md) — real salons: bookings to salon WhatsApp; demo: platform if needed

### 1.2 Assets folder

- [x] Add `assets/images/salonmenu-logo.svg` (SVG logo; replaces missing PNG)
- [x] Add `assets/images/home-hero.jpeg`
- [x] Add `assets/images/salons/noor-hero.jpeg`
- [x] Add `assets/images/salons/glamour-hero.jpeg`
- [x] Add `assets/images/salons/rose-beauty-parlour-hero.jpeg`
- [x] Confirm paths: homepage uses `/assets/...`; salon page + JSON use `/assets/...`
- [x] Placeholder heroes from Unsplash (replace with real salon photos on onboarding)
- [ ] Deploy and confirm no broken images in browser

### 1.3 XSS hardening

- [x] Add `escapeHtml()` helper (in both pages)
- [x] Escape all user-facing JSON text in `index.html` (name, city, area, tags)
- [x] Escape all user-facing JSON text in `salon.html` (name, tagline, desc, reviews, address, services, packages)
- [x] Keep `escapeAttr()` for attributes and `onclick` values
- [ ] Manual test: malicious string in JSON renders as text, not HTML

### 1.4 Data quality

- [x] Fix Rose Beauty review author locations (Sahiwal-consistent)
- [x] Set `price_level` for Rose (`$$`)
- [x] Spot-check all 3 salons: phone, whatsapp, address, timings consistent

### Phase 1 — Done gate

- [ ] End-to-end booking test on mobile (select services → form → WhatsApp opens platform number + message — expected for demo)
- [ ] No broken images on homepage + all 3 salon pages (verify after deploy)

---

## Phase 2 — P1 Conversion & SEO

**Goal:** Shareability and polish.

### 2.1 Per-salon meta tags

- [x] After salon load, inject `og:title`, `og:description`, `og:image`, `og:url`
- [x] Use absolute URLs for `og:image` (`origin + hero_image`)
- [x] Add `twitter:card` (`summary_large_image`)
- [x] Add `<link rel="canonical">` per salon URL
- [x] Static OG tags on `index.html` for homepage (absolute URLs via inline script)
- [ ] Test share preview (WhatsApp / Facebook debugger)

### 2.2 QR code (optional but recommended)

- [x] Replace `api.qrserver.com` with client-side QR (`assets/js/qrcode.min.js` — davidshimjs/qrcodejs)
- [x] Verify `downloadQrCard()` uses locally generated data URL in SVG
- [ ] Test QR scan opens correct `/salons/:slug/` URL

### 2.3 Small UX fixes

- [x] Homepage rating: `*` → `★` (`index.html`) — done in Phase 1 pass
- [x] Booking date input: `min` = today (`salon.html`)
- [x] Error states: missing salon + failed JSON load → message + link back to `/`
- [x] Empty `price_level` hidden on salon cards (`index.html`)

### Phase 2 — Done gate

- [ ] Share one salon link — preview shows name + hero image
- [ ] QR scan works on phone

---

## Phase 3 — P1 Code organization

**Goal:** Maintainability without changing behavior.

### 3.1 Extract shared assets

- [x] Create `assets/css/tokens.css` (`:root` variables)
- [x] Create `assets/css/home.css`
- [x] Create `assets/css/salon.css`
- [x] Create `assets/js/utils.js` (`escapeHtml`, `escapeAttr`, `money`, `xmlEscape`)
- [x] Create `assets/js/home.js`
- [x] Create `assets/js/salon.js`
- [x] Update HTML to `<link>` + external scripts
- [ ] Visual regression: homepage + one salon page match before/after (verify after deploy)

### 3.2 JSON validation

- [x] Add `scripts/validate-salons.mjs`
- [x] Validate required fields: `name`, `city`, `whatsapp`, `services`
- [x] Validate `whatsapp` format (`92` + digits)
- [x] Validate `price` / `original_price` are numbers
- [x] Validate unique slugs
- [x] Document: `npm run validate:salons` in README
- [ ] (Optional) GitHub Action on PR to run validator

### 3.3 Redirect cleanup

- [x] Document canonical slug + aliases in [docs/SALON_URL_ALIASES.md](docs/SALON_URL_ALIASES.md)
- [x] Confirm aliases in `assets/js/salon.js` cover `rose`, `rose-beauty-salon`
- [x] Keep redirect stub folders for aliases (do not remove yet)

### Phase 3 — Done gate

- [x] `node scripts/validate-salons.mjs` passes
- [ ] No console errors on homepage + salon page (verify locally)

---

## Phase 4 — P1 Analytics & owner value

**Goal:** Measure usage before building dashboard.

- [x] Choose analytics (Plausible / Umami / GA4) — **Plausible** default; see [docs/ANALYTICS.md](docs/ANALYTICS.md)
- [x] Track homepage view
- [x] Track salon page view (with slug dimension if supported)
- [x] Track WhatsApp CTA clicks
- [x] Track booking modal open
- [x] Privacy: cookie banner if required — Plausible is cookieless; footer note on homepage
- [x] (Optional) Simple lead log spreadsheet template for owners until dashboard exists — `docs/templates/salon-lead-log.csv`

---

## Phase 5 — P2 SaaS migration (later)

**Goal:** Move toward Next.js + Supabase per [PRODUCT_UPGRADE_PLAN.md](PRODUCT_UPGRADE_PLAN.md).

### 5.1 Foundation

- [ ] Define TypeScript types: `Salon`, `Service`, `Package`, `Review`
- [ ] Scaffold Next.js app
- [ ] SSG `/` and `/salons/[slug]` from JSON or DB
- [ ] Port design tokens from Stitch / current CSS

### 5.2 Owner dashboard (Stitch designs in `design/`)

- [ ] Owner overview
- [ ] Service management
- [ ] Bookings / leads
- [ ] Gallery manager
- [ ] Profile settings

### 5.3 Platform

- [ ] Supabase schema + auth
- [ ] Salon-owner self-service (replace manual JSON edits)
- [ ] Custom subdomain docs + setup checklist

---

## Testing checklist (run after each phase)

| Test | Pass |
|------|------|
| Homepage search by city | [ ] |
| Homepage filter by service category | [ ] |
| Salon menu: category tabs | [ ] |
| Cart add / remove / total | [ ] |
| Booking modal → WhatsApp (salon number) | [ ] |
| Mobile bottom nav + modal | [ ] |
| Invalid slug shows friendly error | [ ] |
| `/salons/:slug` rewrite works on Vercel | [ ] |

---

## Suggested timeline

| Week | Focus |
|------|--------|
| 1 | Phase 0 + Phase 1 (WhatsApp, assets, XSS, data) |
| 2 | Phase 2 + Phase 3 (SEO, refactor, validation) |
| 3 | Phase 4 (analytics) |
| 4+ | Phase 5 (Next.js / Supabase) |

---

## Progress log

Add a line when you finish a phase or deploy:

| Date | Phase | Notes |
|------|-------|-------|
| 2026-05-29 | Phase 1.2–1.4 | Assets folder, XSS hardening, Rose data fixes. Logo SVG + Unsplash hero placeholders. 1.1 deferred (demo). |
| 2026-05-29 | Phase 2.1 + 2.3 | OG/Twitter meta (homepage + dynamic salon), canonical URLs, booking date min, error back link, hide empty price_level. |
| 2026-05-29 | Phase 2.2 | Self-hosted QR via `assets/js/qrcode.min.js`; removed api.qrserver.com dependency. |
| 2026-05-29 | Phase 3 | CSS/JS extracted; `validate-salons.mjs`; URL alias docs. |

---

## Quick reference — files to touch

| Task | Primary files |
|------|----------------|
| WhatsApp fix | `salon.html` |
| Assets | `assets/images/**`, `salons/data.json` |
| XSS | `index.html`, `salon.html`, `assets/js/utils.js` |
| SEO | `salon.html`, `index.html` |
| Validation | `scripts/validate-salons.mjs`, `salons/data.json` |
| Deploy | `vercel.json`, push to GitHub |
