# 💄 SalonMenu.pk — Digital Salon Menu Platform

Ek codebase, 100+ salons. Har salon ka apna URL.

---

## 📁 Project Structure

```
salon-menu-platform/
├── index.html        ← Platform homepage
├── salon.html        ← Single template (sab salons ke liye)
├── salons/
│   └── data.json         ← Har client ka data yahan
├── vercel.json           ← Routing rules
└── README.md
```

---

## ➕ Naya Salon Add Karna

Sirf `salons/data.json` open karo aur naya entry add karo:

```json
"mynewsalon": {
  "name": "My New Salon",
  "tagline": "آپ کا خیرمقدم",
  "city": "Islamabad",
  "area": "F-7",
  "address": "Shop 3, F-7 Markaz, Islamabad",
  "phone": "0300-0000000",
  "whatsapp": "923000000000",
  "timings": "Mon–Sat: 10am – 8pm",
  "color": "#7c5cbf",
  "stats": {
    "clients": "200+",
    "experience": "3yr",
    "rating": "4.7"
  },
  "services": {
    "Facial": [
      { "name": "Basic Facial", "time": "45 min", "price": 1200 }
    ],
    "Hair": [
      { "name": "Hair Cut", "time": "30 min", "price": 800 }
    ]
  },
  "reviews": [
    { "text": "Bohat acha salon hai!", "author": "Ayesha, F-7", "stars": 5 }
  ]
}
```

Phir GitHub pe push karo — **Vercel automatic deploy kar dega** ✅

---

## 🌐 URL Formats

| Format | Example |
|--------|---------|
| Path-based (free) | `yourapp.vercel.app/salons/noor` |
| Custom subdomain | `noor.salonmenu.pk` |

---

## 🚀 GitHub + Vercel Setup (Step by Step)

### Step 1 — GitHub Pe Upload Karo

1. GitHub.com pe jao → **New Repository**
2. Naam rakho: `salon-menu-platform`
3. **Public** rakho
4. Apna computer mein terminal kholo:

```bash
cd salon-menu-platform
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/TUMHARA_USERNAME/salon-menu-platform.git
git push -u origin main
```

---

### Step 2 — Vercel Pe Deploy Karo

1. **vercel.com** pe jao → Login with GitHub
2. **"Add New Project"** click karo
3. Apni repo select karo: `salon-menu-platform`
4. **Deploy** click karo

**Done! Tumhara platform live hai** 🎉

---

### Step 3 — Apni Domain Lagao (Optional)

1. `salonmenu.pk` ya koi bhi domain khareedo (Pknic.pk se)
2. Vercel dashboard → Project → **Domains**
3. `salonmenu.pk` add karo
4. DNS settings mein jo Vercel bole woh CNAME add karo

---

### Step 4 — Har Client Ka Subdomain

Jab naya client aaye:
1. `data.json` mein entry add karo (e.g. slug: `glamour`)
2. Vercel Domains mein `glamour.salonmenu.pk` add karo
3. Client ko link do: `glamour.salonmenu.pk`

---

## 💰 Pricing Model

| Cheez | Tumhara Kharcha |
|-------|----------------|
| Vercel (hosting) | Free |
| salonmenu.pk domain | ~Rs. 1,500/saal |
| Per client kharcha | Rs. 0 |

| Cheez | Client Se Lo |
|-------|-------------|
| One-time setup | Rs. 15,000 |
| Annual renewal | Rs. 5,000/saal |

**10 clients = Rs. 50,000/saal sirf renewal se** 🔥

---

## 🎨 Brand Color Change

Har salon ka `"color"` field alag rakh sakte ho:
- `"#c8705a"` → Rose (default)
- `"#7c5cbf"` → Purple
- `"#2e7d32"` → Green
- `"#1565c0"` → Blue

---

## 📞 Support

Koi masla ho toh WhatsApp karo: **0300-XXXXXXX**
