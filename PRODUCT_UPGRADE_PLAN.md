# SalonMenu.pk Product Upgrade Plan

## Product Goal

SalonMenu.pk ko simple static demo se sellable, scalable digital salon menu product banana hai. Primary customer salon owner hai, aur end user salon client hai jo mobile par services dekh kar WhatsApp booking karta hai.

## Current State

- Static platform with shared `salon.html` template.
- Salon records stored in `salons/data.json`.
- Vercel rewrite supports `/salons/:slug`.
- Users can view salon services, select services, and send a WhatsApp booking message.
- Homepage is currently a basic landing page with demo links.

## Product Priorities

### P0 - Fix Trust And Conversion Basics

These items should be handled first because they directly affect user trust and booking conversion.

1. Fix Urdu/text encoding issues across README and salon data.
2. Improve WhatsApp booking flow with customer details.
3. Turn homepage into a useful salon discovery page.
4. Improve error states for missing salons and data loading failures.
5. Capture booking leads with enough detail for the salon owner to act immediately.

### P1 - Make It Easier To Sell To Salons

These features help close paid clients and improve perceived value.

1. Add salon packages and promotional offers.
2. Add richer trust signals: verified reviews, Instagram link, before/after gallery, staff highlights.
3. Add SEO and social preview metadata per salon.
4. Add simple analytics tracking for views and WhatsApp clicks.
5. Add owner-facing dashboard basics: profile, services, gallery, bookings/leads, and offers.

### P2 - Make It Scalable

These features reduce manual work when onboarding many salons.

1. Build a simple admin/data entry workflow.
2. Add data validation for `salons/data.json`.
3. Add reusable salon theme options.
4. Add support for custom domains/subdomains documentation and setup checklist.
5. Move from static JSON management to authenticated salon-owner self-service.

## Salon Owner Requirements

As a salon owner, the platform must help me get clients, manage bookings, update my menu, show trust, and understand business performance.

### Business Profile

- Salon name, logo, cover image, brand color, and short tagline.
- Address, city, area, Google Maps link, phone, WhatsApp, Instagram, TikTok, and Facebook.
- Opening hours, weekly off day, special timings, and holiday closures.
- Business tags such as ladies only, unisex, home service, bridal room, parking, card payment, and AC.

### Service Menu Management

- Service categories such as Hair, Makeup, Facial, Nails, Waxing, Massage, Bridal, and Spa.
- Service name, price, duration, description, and starting-from price.
- Discounted price, popular tag, recommended tag, add-ons, and service availability.
- Hide/unhide services without deleting them.
- Branch-specific or staff-specific services in the future.

### Packages And Offers

- Bridal packages, party makeup packages, monthly deals, Eid offers, wedding season offers, and combo bundles.
- Original price, discounted price, included services, offer expiry, and "best value" tag.
- Advance payment requirement and offer-specific booking notes.

### Booking And Lead Management

- Appointment request with customer name, phone, preferred date, preferred time, selected services, notes, and total estimate.
- Booking status: pending, confirmed, rejected, rescheduled, completed, cancelled, and no-show.
- Daily and weekly booking calendar.
- Staff assignment and buffer time between appointments.
- WhatsApp-first flow for MVP, with database-backed booking records in the future.

### Customer Management

- Customer list with visit history and favorite services.
- Customer notes such as skin sensitivity, preferred stylist, or color formula.
- VIP tag, repeat customer tracking, birthday reminders, and anniversary reminders.
- Private complaint/problem customer notes for owner use only.

### Staff Management

- Staff profiles, roles, and profile photos.
- Staff availability, off-days, leaves, and assigned services.
- Staff-wise booking calendar.
- Future commission tracking by service or booking.

### Gallery And Portfolio

- Salon interior photos, service photos, before/after photos, bridal portfolio, hair color portfolio, and nail art portfolio.
- Owner can upload, reorder, hide, and delete images.
- Gallery categories and cover image selection.

### Reviews And Trust

- Customer reviews, star ratings, verified review tag, and review approval before public display.
- Google review link and social proof highlights.
- Private feedback option for complaints that should not be public.

### Owner Dashboard

- Today bookings, pending appointment requests, WhatsApp clicks, menu views, and top selected services.
- Most booked services, revenue estimate, new vs returning customers, and monthly performance.
- Expiring offers and low-performing services.

### Marketing Tools

- Shareable salon menu link, QR code, Instagram bio link, and offer banners.
- WhatsApp message templates and "book again" reminders.
- Coupon codes and festival campaign templates.

### Payments And Billing

- Advance payment instructions for Easypaisa, JazzCash, bank transfer, or cash.
- Payment proof upload, paid/unpaid booking status, invoice, and receipt.
- Platform subscription status, renewal reminders, and package upgrade path.

### Branch Management

- Multiple branches under one salon brand.
- Branch-specific address, timings, services, staff, gallery, and bookings.
- Main brand page that lists all branches.

### Access Control

- Salon owner login, receptionist login, staff login, and platform admin login.
- Role-based permissions.
- Activity log for price, service, booking, and profile changes.
- Data export and backup.

### Public Salon Page

- Mobile-first design, fast loading, service search, category filters, service cart, booking summary, WhatsApp checkout, Google Maps, call button, and share button.
- Language support for English, Urdu, and Roman Urdu.

## Recommended Future Tech Stack

For a proper self-service beauty salon platform, migrate from static HTML/JSON to:

- Next.js with App Router and TypeScript for public pages, dashboard, routing, SEO, and fullstack features.
- Tailwind CSS for fast, consistent UI.
- Supabase Postgres for salons, services, bookings, customers, staff, reviews, subscriptions, and analytics events.
- Supabase Auth for owner/receptionist/staff/admin login.
- Supabase Storage for gallery, logo, cover image, payment proof, and portfolio uploads.
- Supabase Row Level Security so each salon owner can only manage their own data.
- Vercel for deployment.

Prisma can be added later if the data model becomes complex enough to need a stronger migration and ORM workflow.

## Phase 1 - MVP Upgrade Sprint

### 1. Encoding Cleanup

Goal: All Urdu, symbols, and readable text should display correctly.

Tasks:
- Replace corrupted Urdu strings in `salons/data.json`.
- Clean README formatting and corrupted characters.
- Replace broken emoji/entity text in `salon.html` with stable readable text or safe symbols.

Acceptance Criteria:
- Urdu taglines display correctly in the browser.
- README renders cleanly on GitHub.
- No visible mojibake text such as `Ø`, `Ù`, `â`, or `ðŸ`.

### 2. Stronger WhatsApp Booking Flow

Goal: Salon receives useful booking requests, not vague messages.

Tasks:
- Add booking fields for customer name, phone, preferred date, preferred time, and optional notes.
- Show selected services in a compact booking summary.
- Include service names, total, customer details, and salon name in WhatsApp message.
- Allow users to remove selected services before sending.
- Prepare the data shape so the same booking details can later be stored in a database.

Acceptance Criteria:
- User can select services and fill booking details.
- WhatsApp message includes all selected services and customer details.
- Empty cart still supports a generic appointment request.
- Mobile layout remains easy to use.

### 3. Homepage Salon Discovery

Goal: Homepage should help users find salons, not just introduce the platform.

Tasks:
- Load salons from `salons/data.json`.
- Render salon cards with name, city, area, rating, hero image, and CTA.
- Add filters for city and service category.
- Add search by salon name or area.
- Link each card to `/salons/{slug}`.

Acceptance Criteria:
- Homepage lists all salons from the data file.
- Users can filter by city and service category.
- Users can search by salon name/area.
- Each salon card opens the correct salon page.

### 4. Owner-Value MVP Features

Goal: Make the platform valuable enough for a real salon owner to pay for it.

Tasks:
- Add QR/share link support.
- Add packages/offers to the public salon page.
- Add editable-style data structure for gallery, social links, business tags, and reviews.
- Add a basic bookings/leads structure for future dashboard migration.

Acceptance Criteria:
- A salon owner can clearly use the public page as their digital menu and booking link.
- The salon page supports offers, gallery, social links, reviews, and WhatsApp booking.
- Data model is ready to migrate into database tables later.

## Phase 2 - Sales Features

### Packages And Offers

Goal: Increase booking value and give salons a reason to promote the link.

Data Model Example:

```json
"packages": [
  {
    "name": "Bridal Glow Package",
    "includes": ["Gold Facial", "Hair Styling", "Party Makeup"],
    "price": 9500,
    "original_price": 12000,
    "tag": "Best Value"
  }
]
```

Acceptance Criteria:
- Packages appear above or near services.
- Package selection works with WhatsApp checkout.
- Discount/original price is visually clear.

### Trust And Social Proof

Goal: Make salon pages feel credible enough for paid clients.

Tasks:
- Add Instagram and TikTok links.
- Add before/after gallery section.
- Add review labels like verified or repeat client.
- Add optional staff profiles.

Acceptance Criteria:
- Missing optional fields do not break the page.
- Trust content improves the page without making it cluttered.

## Phase 3 - Scale Features

### Admin Workflow

Goal: Reduce manual JSON editing and move toward salon-owner self-service.

Options:
- Simple local admin HTML page that edits JSON manually for now.
- Later upgrade to a hosted backend or CMS.

Initial Admin Requirements:
- Add/edit salon profile.
- Add/edit service categories and prices.
- Preview generated salon page.
- Export updated JSON.

Future Owner Dashboard Requirements:
- Owner login.
- Manage profile, services, packages, gallery, staff, bookings, reviews, and offers.
- Track leads, WhatsApp clicks, views, and top services.
- Support receptionist/staff permissions.

### Data Validation

Goal: Prevent broken salon pages as more clients are added.

Tasks:
- Add a schema or validation script for required fields.
- Validate phone, WhatsApp, services, prices, gallery URLs, and colors.
- Add a README onboarding checklist.

## Suggested Implementation Order

1. `PRODUCT_UPGRADE_PLAN.md`
2. Fix text encoding issues.
3. Build homepage discovery.
4. Add booking form/modal or bottom sheet.
5. Add packages data support.
6. Add SEO/social metadata improvements.
7. Add gallery/social/business tag improvements.
8. Add booking/leads data structure.
9. Add validation/admin workflow.
10. Plan Next.js + Supabase migration for owner self-service.

## First Work Item

Start with encoding cleanup because it is the fastest trust improvement and reduces visual bugs before deeper UI work.
