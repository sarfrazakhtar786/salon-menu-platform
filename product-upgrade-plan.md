# SalonMenu.pk — Product Upgrade Plan

This document captures homepage sections and features that were **removed from the live MVP** (May 2026) because they used placeholder or unverifiable data. They remain the **design and product roadmap** for future releases.

**Live homepage principle:** show only what is true today; label everything else as **Coming soon**.

**Design reference:** `f:/code.html`, `design/stitch-premium-ui-system/`

---

## What ships today (MVP)

| Feature | Status |
|---------|--------|
| Salon discovery (search, city, service filters) | Live |
| Category chips from real salon menus | Live |
| Featured salon grid from `salons/data.json` | Live |
| Browse by city (live counts; empty cities marked Soon) | Live |
| Digital menu + WhatsApp booking per salon | Live |
| List Your Salon (WhatsApp CTA) | Live |
| How it works + FAQ (honest copy) | Live |
| Coming soon feature band | Live |

---

## Removed sections → future phases

### Phase A — Discovery & merchandising (post 10+ salons)

#### 1. Popular Services carousel
- **Was:** 8 hardcoded services (Bridal Makeup, Keratin, etc.) with fake “120+ Salons” counts and stock photos.
- **Future:** Aggregate from real `services` data; show “From PKR X” and salon count per service; only list services with ≥1 live salon.
- **Trigger:** ≥10 salons and stable service taxonomy.
- **Reference:** `home.js` `popularServices` array (removed).

#### 2. Bridal discovery banner
- **Was:** Full-width promo “Find your perfect bridal artist” + Explore / Packages CTAs.
- **Future:** Dynamic banner when ≥3 salons tag `bridal`; link to filtered explore view.
- **Trigger:** Enough bridal-tagged listings in one or more cities.

#### 3. Real Transformations (before/after gallery)
- **Was:** 4 stock before/after pairs (Hair, Skin, Bridal, Nails).
- **Future:** Owner-uploaded before/after with moderation; opt-in per salon.
- **Trigger:** Media storage (e.g. Supabase Storage) + owner dashboard.
- **Compliance:** Client consent for photos.

---

### Phase B — Trust & social proof (post real usage)

#### 4. Customer testimonials
- **Was:** 5 named quotes with 5★ ratings (placeholder).
- **Future:** Verified reviews tied to WhatsApp booking or post-visit prompt; display only authenticated reviews.
- **Trigger:** Review collection flow + moderation.

#### 5. Platform statistics band
- **Was:** 500+ Salons, 15,000+ Services, 50+ Cities, 20,000+ Monthly Visitors.
- **Future:** Show **real** metrics only, updated periodically (or live from analytics).
- **Rule:** Never display rounded-up or aspirational numbers on the homepage.

#### 6. “Verified salon profiles” (marketing claim)
- **MVP copy:** “Curated listings” until verification workflow exists.
- **Future:** Verification badge, document check, re-verification date.

---

### Phase C — Verticals & content

#### 7. Featured bridal experts
- **Was:** 4 expert cards (Makeup by Hina, Sana's Studio, etc.) with fake ratings and packages.
- **Future:** Separate **Bridal Experts** index OR filter on salons with bridal packages; real portfolios and pricing from salon data.
- **Trigger:** Dedicated bridal taxonomy or partner onboarding.

#### 8. Beauty blog / articles
- **Was:** 4 article cards with dates and read times (placeholder).
- **Future:** CMS or markdown blog; SEO landing pages; optional newsletter tie-in.
- **Trigger:** Content workflow + editor.

---

### Phase D — Platform scale (Supabase / owner product)

| Feature | Notes |
|---------|--------|
| Owner dashboard | Menu CRUD, leads, analytics |
| Online appointment booking | Beyond WhatsApp handoff |
| In-app reviews & ratings | Replace placeholder trust section |
| Customer accounts (Login) | Favorites, bookings history |
| Offers & promotions | Footer “Offers” link |
| Newsletter | Footer signup (currently “coming soon” alert) |
| Mobile app | Listed in coming soon band |
| Subscription / pricing pages | For salon partners |
| Privacy policy & terms | Legal pages |

See **Coming soon band** on homepage for customer-visible list.

---

## Homepage section order (future full product)

When re-adding features, prefer this order (from design mock):

1. Hero + search  
2. Category chips  
3. Why choose us (honest claims only)  
4. Popular services (data-driven)  
5. Bridal banner (conditional)  
6. Transformations (moderated UGC)  
7. Browse by city  
8. Testimonials (verified)  
9. How it works  
10. Featured bridal experts (real data)  
11. Featured salons  
12. Stats (real metrics only)  
13. Blog  
14. FAQ  
15. Grow your salon (partners)  
16. Coming soon band  

---

## Success metrics before each phase

| Phase | Gate |
|-------|------|
| A | 10+ live salons, weekly menu updates without manual JSON pain |
| B | 50+ WhatsApp booking clicks/month, first real testimonials collected |
| C | Content owner assigned OR 5+ bridal-focused partners |
| D | 2+ salons requesting self-serve edits/week |

---

## Changelog

| Date | Change |
|------|--------|
| 2026-05 | Removed all placeholder homepage sections; MVP shows real salon data only. Documented here. |
