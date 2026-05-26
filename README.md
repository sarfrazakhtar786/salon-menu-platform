# SalonMenu.pk - Digital Salon Menu Platform

Ek codebase, multiple salons. Har salon ka apna public menu URL.

## Project Structure

```txt
salon-menu-platform/
├── index.html
├── salon.html
├── salons/
│   └── data.json
├── vercel.json
├── PRODUCT_UPGRADE_PLAN.md
└── DESIGN_HANDOFF_NOTES.md
```

## Current Stack

- HTML
- CSS
- Vanilla JavaScript
- JSON data source
- Vercel hosting and rewrites

Future SaaS stack: Next.js, TypeScript, Tailwind CSS, Supabase, and Vercel.

## URL Formats

```txt
/salons/noor
/salons/glamour
/salon.html#noor
/salon.html?salon=noor
```

## Add A New Salon

Open `salons/data.json` and add a new salon object using a unique slug.

```json
"mynewsalon": {
  "name": "My New Salon",
  "tagline": "خوبصورتی آپ کا حق ہے",
  "city": "Islamabad",
  "area": "F-7",
  "address": "Shop 3, F-7 Markaz, Islamabad",
  "phone": "0300-0000000",
  "whatsapp": "923000000000",
  "timings": "Mon-Sat: 10am - 8pm",
  "weekly_off": "Sunday",
  "color": "#845051",
  "price_level": "$$",
  "hero_image": "https://example.com/cover.jpg",
  "gallery": ["https://example.com/photo.jpg"],
  "socials": {
    "instagram": "https://instagram.com/example",
    "facebook": "",
    "tiktok": ""
  },
  "business_tags": ["Ladies Only", "Bridal Expert", "Parking"],
  "stats": {
    "clients": "200+",
    "experience": "3yr",
    "rating": "4.7"
  },
  "packages": [
    {
      "name": "Bridal Glow Package",
      "includes": ["Gold Facial", "Hair Styling", "Party Makeup"],
      "price": 9500,
      "original_price": 12000,
      "tag": "Best Value"
    }
  ],
  "services": {
    "Facial": [
      {
        "name": "Basic Facial",
        "time": "45 min",
        "price": 1200,
        "desc": "Deep cleansing and exfoliation."
      }
    ]
  },
  "reviews": [
    {
      "text": "Bohat acha salon hai.",
      "author": "Ayesha, F-7",
      "stars": 5,
      "verified": true
    }
  ]
}
```

## Important Data Rules

- `whatsapp` should use country code format without `+`, for example `923001234567`.
- `price` and `original_price` should be numbers, not strings.
- `rating` can be a string like `"4.9"` for display.
- Optional fields should be left empty instead of removed if you want consistent data entry.

## Deployment

This project is designed for Vercel static hosting.

1. Push changes to GitHub.
2. Connect the repository to Vercel.
3. Vercel will deploy automatically after each push.

## Product Plan

See [PRODUCT_UPGRADE_PLAN.md](PRODUCT_UPGRADE_PLAN.md) for the roadmap.

## Salon Onboarding

See [SALON_ONBOARDING_GUIDE.md](SALON_ONBOARDING_GUIDE.md) for the current managed onboarding workflow.

## Design Reference

See [DESIGN_HANDOFF_NOTES.md](DESIGN_HANDOFF_NOTES.md) and the extracted Stitch design files in `design/stitch-premium-ui-system`.
