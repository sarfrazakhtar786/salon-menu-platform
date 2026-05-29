# Salon Onboarding Guide

Ye guide current MVP ke liye hai. **Live admin form:** [`/admin/onboard.html`](../admin/onboard.html) (login required — see [`docs/ADMIN.md`](../docs/ADMIN.md)). Neeche wala flow `salons/data.json` + seed SQL ke liye hai.

## 1. Client Se Data Collect Karein

Har new salon ke liye ye information collect karein:

- Salon name
- City
- Area
- Full address
- Phone number
- WhatsApp number
- Timings
- Weekly off day
- Brand color, agar owner ke paas koi preference ho
- Instagram, Facebook, TikTok links
- Business tags, for example `Ladies Only`, `Bridal Expert`, `Home Service`, `Parking`
- 12 services with price, duration, and short description
- 4 packages/offers
- 12 gallery images
- 9 reviews/testimonials

## 2. Slug Decide Karein

Slug salon ka URL name hota hai.

Examples:

```txt
Noor Beauty Salon -> noor
Glamour Studio -> glamour
Areeba Bridal Lounge -> areeba-bridal
```

Rules:

- Small letters use karein.
- Spaces ki jagah hyphen use karein.
- Special characters avoid karein.
- Slug unique hona chahiye.

## 3. Images Prepare Karein

Current MVP mein images URL se load hoti hain.

Best options:

- Salon ke real photos ko kisi stable image hosting par upload karein.
- Unsplash/demo images sirf demo ke liye use karein.
- Har salon ke liye 12 gallery images rakhein.
- Hero image landscape honi chahiye.
- Gallery images square/portrait bhi ho sakti hain; UI unhein same square size mein crop kar dega.

## 4. WhatsApp Format

WhatsApp number country code ke saath hona chahiye, plus sign ke baghair.

Example:

```txt
0300-1234567 -> 923001234567
```

Note: **Demo phase:** dummy salons (`noor`, `glamour`, `rose-beauty-parlour`) ki bookings abhi platform number `923007666376` par jaati hain — koi real owner onboard nahi. Form se `whatsapp` phir bhi collect karein (`data.json` schema ready). **Pehla real salon** onboard hone par bookings `salon.whatsapp` par switch karni hain — see [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) (Demo phase + Phase 1.1).

## 5. New Salon Data Template

`salons/data.json` mein existing salons ke baad new slug add karein.

```json
"areeba-bridal": {
  "name": "Areeba Bridal Lounge",
  "tagline": "Premium bridal beauty experience",
  "city": "Lahore",
  "area": "DHA Phase 6",
  "address": "Shop 12, DHA Phase 6, Lahore",
  "phone": "0300-1111111",
  "whatsapp": "923001111111",
  "timings": "Mon-Sat: 11am - 9pm",
  "weekly_off": "Sunday",
  "color": "#845051",
  "price_level": "$$$",
  "hero_image": "https://example.com/hero.jpg",
  "gallery": [
    "https://example.com/gallery-1.jpg",
    "https://example.com/gallery-2.jpg",
    "https://example.com/gallery-3.jpg",
    "https://example.com/gallery-4.jpg",
    "https://example.com/gallery-5.jpg",
    "https://example.com/gallery-6.jpg",
    "https://example.com/gallery-7.jpg",
    "https://example.com/gallery-8.jpg",
    "https://example.com/gallery-9.jpg",
    "https://example.com/gallery-10.jpg",
    "https://example.com/gallery-11.jpg",
    "https://example.com/gallery-12.jpg"
  ],
  "socials": {
    "instagram": "https://instagram.com/example",
    "facebook": "",
    "tiktok": ""
  },
  "business_tags": ["Ladies Only", "Bridal Expert", "Parking"],
  "stats": {
    "clients": "200+",
    "experience": "4yr",
    "rating": "4.8"
  },
  "packages": [
    {
      "name": "Bridal Glow Package",
      "includes": ["Gold Facial", "Hair Styling", "Bridal Makeup"],
      "price": 18000,
      "original_price": 22000,
      "tag": "Best Value"
    },
    {
      "name": "Party Ready Package",
      "includes": ["Party Makeup", "Blow Dry", "Gel Nails"],
      "price": 6500,
      "original_price": 8000,
      "tag": "Popular"
    },
    {
      "name": "Hair Revival Package",
      "includes": ["Hair Cut", "Protein Treatment", "Blow Dry"],
      "price": 7500,
      "original_price": 9500,
      "tag": "Hair Care"
    },
    {
      "name": "Nails & Glow Package",
      "includes": ["Manicure", "Pedicure", "Basic Facial"],
      "price": 3500,
      "original_price": 4500,
      "tag": "Self Care"
    }
  ],
  "services": {
    "Facial": [
      { "name": "Basic Facial", "time": "45 min", "price": 1500, "desc": "Fresh cleansing facial for everyday glow." },
      { "name": "Gold Facial", "time": "60 min", "price": 3000, "desc": "Radiance facial for events and special days." },
      { "name": "Hydra Facial", "time": "60 min", "price": 4500, "desc": "Hydrating facial for clean and plump skin." }
    ],
    "Hair": [
      { "name": "Hair Cut", "time": "30 min", "price": 1000, "desc": "Modern haircut with shape and styling." },
      { "name": "Hair Color", "time": "120 min", "price": 5500, "desc": "Full hair color with consultation." },
      { "name": "Protein Treatment", "time": "90 min", "price": 6500, "desc": "Repair treatment for dry or damaged hair." }
    ],
    "Makeup": [
      { "name": "Party Makeup", "time": "60 min", "price": 4500, "desc": "Event-ready makeup with long-lasting finish." },
      { "name": "Bridal Makeup", "time": "180 min", "price": 22000, "desc": "Complete premium bridal makeup." },
      { "name": "Engagement Makeup", "time": "120 min", "price": 14000, "desc": "Soft glam look for engagement events." }
    ],
    "Nails": [
      { "name": "Basic Manicure", "time": "30 min", "price": 1000, "desc": "Classic nail cleanup and polish." },
      { "name": "Gel Nails", "time": "60 min", "price": 2500, "desc": "Long-lasting gel nail finish." },
      { "name": "Luxury Pedicure", "time": "60 min", "price": 2200, "desc": "Pedicure with scrub, massage, and polish." }
    ]
  },
  "reviews": [
    { "text": "Service bohat professional thi.", "author": "Ayesha K.", "stars": 5, "verified": true },
    { "text": "Makeup long lasting aur natural tha.", "author": "Sana M.", "stars": 5, "verified": true },
    { "text": "Salon clean aur staff friendly tha.", "author": "Hira B.", "stars": 4, "verified": false },
    { "text": "Bridal trial detailed tha.", "author": "Fatima A.", "stars": 5, "verified": true },
    { "text": "Hair color result excellent aya.", "author": "Maha F.", "stars": 5, "verified": true },
    { "text": "Nails bohat neat thay.", "author": "Nida W.", "stars": 5, "verified": true },
    { "text": "Good value for money.", "author": "Rabia R.", "stars": 4, "verified": false },
    { "text": "Soft glam bilkul reference jaisa tha.", "author": "Komal S.", "stars": 5, "verified": true },
    { "text": "Facial relaxing aur fresh tha.", "author": "Laiba T.", "stars": 4, "verified": false }
  ]
}
```

## 6. Route Alias Add Karein

New salon ke liye folder banayein:

```txt
salons/areeba-bridal/index.html
```

Us file mein ye content rakhein, slug replace karke:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Areeba Bridal Lounge</title>
  <meta http-equiv="refresh" content="0; url=/salon.html?salon=areeba-bridal">
  <link rel="canonical" href="/salon.html?salon=areeba-bridal">
</head>
<body>
  <p>Opening Areeba Bridal Lounge...</p>
  <script>window.location.replace("/salon.html?salon=areeba-bridal");</script>
</body>
</html>
```

## 7. Validate Data

Terminal mein run karein:

```powershell
node -e "const d=JSON.parse(require('fs').readFileSync('salons/data.json','utf8')); for (const [slug,s] of Object.entries(d)) console.log(slug, Object.values(s.services).flat().length, s.packages.length, s.gallery.length, s.reviews.length)"
```

Expected minimum:

```txt
services: 12
packages: 4
gallery: 12
reviews: 9
```

## 8. Local Test

```powershell
cd F:\salon-menu-platform
python -m http.server 4173
```

Open:

```txt
http://127.0.0.1:4173/
http://127.0.0.1:4173/salon.html?salon=areeba-bridal
http://127.0.0.1:4173/salons/areeba-bridal/
```

Check:

- Salon card homepage par aa raha hai.
- Salon page open ho raha hai.
- Services show ho rahi hain.
- Packages show ho rahe hain.
- Gallery 12 images show kar rahi hai.
- Reviews show ho rahe hain.
- WhatsApp booking button correct message bana raha hai.

## 9. Git Push

```powershell
git add salons/data.json salons/areeba-bridal/index.html
git commit -m "Add Areeba Bridal Lounge"
git push origin main
```

Vercel push ke baad automatic deploy karega.

## 10. Client Handoff Message

Client ko ye bhej sakte hain:

```txt
Your salon digital menu is live:
https://your-domain.com/salons/areeba-bridal

Clients can view services, packages, gallery, reviews, and send booking requests on WhatsApp.
```

## 11. Important Notes

- Abhi ye managed onboarding model hai.
- Salon owner khud data update nahi kar sakta.
- Future SaaS version mein owner login, dashboard, image upload, booking management, and analytics add honge.
- 15-30 salons tak current setup manageable hai agar data carefully maintain kiya jaye.
