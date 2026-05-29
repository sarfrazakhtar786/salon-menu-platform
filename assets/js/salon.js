let currentSalon= null;
let currentSlug = "";
let activeCategory = "";
let cart = [];
const platformBookingWhatsapp = "923007666376";
const slugAliases = {
  "rose": "rose-beauty-parlour",
  "rose-beauty-salon": "rose-beauty-parlour",
  "rose-beauty-parlor": "rose-beauty-parlour"
};

function getSalonSlug() {
  if (window.location.hash) return window.location.hash.substring(1);
  const params = new URLSearchParams(window.location.search);
  if (params.has("salon")) return params.get("salon");
  const host = window.location.hostname;
  const parts = host.split(".");
  if (!host.includes("vercel.app") && parts.length >= 3 && parts[0] !== "www") return parts[0];
  const match = window.location.pathname.match(/\/salons\/([^\/]+)/);
  return match ? match[1] : null;
}

    function getTotal() {
  return cart.reduce((sum, item) => sum + Number(item.price || 0), 0);
}

    function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
}

function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

function absoluteUrl(path) {
  if (!path) return `${window.location.origin}/assets/images/home-hero.jpeg`;
  if (/^https?:\/\//i.test(path)) return path;
  return `${window.location.origin}${path.startsWith("/") ? path : `/${path}`}`;
}

function applySalonMeta(salon, slug) {
  const title = `${salon.name} | SalonMenu.pk`;
  const description = salon.tagline || `Book ${salon.name} in ${salon.city} on WhatsApp.`;
  const url = `${window.location.origin}/salons/${slug}/`;
  const image = absoluteUrl(salon.hero_image);

  document.title = `${salon.name} - ${salon.city}`;
  upsertMeta('meta[name="description"]', { name: "description", content: description });
  upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
  upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
  upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
  upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });
  upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
  upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
  upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
  upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
  upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });
  setCanonical(url);
}

function setBookingDateMin() {
  const dateInput = document.getElementById("booking-date");
  if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];
}

async function init() {
  currentSlug = slugAliases[getSalonSlug()] || getSalonSlug();
  if (!currentSlug) {
    showError("Salon not found. Please open a valid salon link.");
    return;
  }

  try {
    const response = await fetch("/salons/data.json");
    const salons = await response.json();
    currentSalon = salons[currentSlug];
    if (!currentSalon) {
      showError(`Salon "${currentSlug}" not found.`);
      return;
    }

    activeCategory = "All Services";
    document.documentElement.style.setProperty("--primary", currentSalon.color || "#845051");
    applySalonMeta(currentSalon, currentSlug);
    render();
    setupSalonAnalytics();
    SalonMenu.analytics?.trackSalonView(currentSlug);
  } catch (error) {
    showError("Error loading salon data. Please refresh the page.");
  }
}

function showError(message) {
  document.getElementById("app").innerHTML = `
    <div class="loader">
      <p>${SalonMenu.escapeHtml(message)}</p>
      <a href="/">← Back to homepage</a>
    </div>
  `;
}

function render() {
  const salon = currentSalon;
  const categories = ["All Services", ...Object.keys(salon.services || {})];
  const tags = salon.business_tags || [];
  const socials = Object.entries(salon.socials || {}).filter(([, url]) => url);
  const gallery = salon.gallery || [];
  const rating = salon.stats?.rating || "New";

  document.getElementById("app").innerHTML = `
    <header class="topbar">
      <div class="shell nav">
        <a class="brand" href="/"><img src="/assets/images/salonmenu-logo.svg" alt="SalonMenu.pk"></a>
        <nav class="nav-links" aria-label="Salon navigation">
          <a href="#services">Services</a>
          <a href="#packages">Packages</a>
          <a href="#gallery">Gallery</a>
          <a href="#reviews">Reviews</a>
        </nav>
        <button class="nav-action" type="button" onclick="openBooking('nav')">Book Now</button>
      </div>
    </header>

    <section class="hero" style="background-image: linear-gradient(rgba(45,45,45,.35), rgba(45,45,45,.72)), url('${SalonMenu.escapeAttr(salon.hero_image || "")}')">
      <div class="shell hero-content">
        <div class="badge-row">
          <span class="badge">Premium Member</span>
          <span class="badge"><span class="gold">★</span> ${SalonMenu.escapeHtml(rating)}</span>
          <span class="badge">${SalonMenu.escapeHtml(salon.area)}, ${SalonMenu.escapeHtml(salon.city)}</span>
        </div>
        <h1>${SalonMenu.escapeHtml(salon.name)}</h1>
        <p class="tagline">${SalonMenu.escapeHtml(salon.tagline || "Premium beauty services and appointment booking.")}</p>
        <div class="hero-actions">
          <a class="btn whatsapp" href="https://wa.me/${platformBookingWhatsapp}?text=${encodeURIComponent(`Hi! I want to book an appointment at ${salon.name}.`)}" target="_blank" rel="noopener">WhatsApp</a>
          <a class="btn light" href="tel:${SalonMenu.escapeAttr(salon.phone)}">Call Now</a>
          <a class="btn light" href="https://maps.google.com/?q=${encodeURIComponent(salon.address)}" target="_blank" rel="noopener">Directions</a>
          <button class="btn light" type="button" onclick="shareSalon()">Share</button>
        </div>
      </div>
    </section>

    <main class="shell main-grid">
      <div>
        <section class="section" id="services">
          <div class="section-head">
            <div>
              <span class="eyebrow">Curated Menu</span>
              <h2>Our services</h2>
            </div>
          </div>
          <div class="tabs">
            ${categories.map(category => `<button class="tab ${category === activeCategory ? "active" : ""}" type="button" onclick="setCategory('${SalonMenu.escapeAttr(category)}')">${SalonMenu.escapeHtml(category)}</button>`).join("")}
          </div>
          <div class="service-list" style="margin-top:24px">
            ${renderServices()}
          </div>
        </section>

        ${renderPackages()}

        ${gallery.length ? `
          <section class="section" id="gallery">
            <div class="section-head">
              <div>
                <span class="eyebrow">Portfolio</span>
                <h2>Salon gallery</h2>
              </div>
            </div>
            <div class="gallery">
              ${gallery.map((image, index) => `<img src="${SalonMenu.escapeAttr(image)}" alt="${SalonMenu.escapeHtml(salon.name)} gallery image ${index + 1}" loading="lazy">`).join("")}
            </div>
          </section>
        ` : ""}

        <section class="section" id="reviews">
          <div class="section-head">
            <div>
              <span class="eyebrow">Client Love</span>
              <h2>Reviews</h2>
            </div>
          </div>
          <div class="reviews-grid">
            ${(salon.reviews || []).map(review => `
              <article class="review-card">
                <div class="stars">${"★".repeat(review.stars || 5)}${"☆".repeat(5 - (review.stars || 5))}</div>
                <p>"${SalonMenu.escapeHtml(review.text)}"</p>
                <div class="author">
                  <span>${SalonMenu.escapeHtml(review.author)}</span>
                  ${review.verified ? '<span class="verified">Verified</span>' : ""}
                </div>
              </article>
            `).join("")}
          </div>
        </section>
      </div>

      <aside class="sidebar">
        <section class="info-card" id="info">
          <h3>Business Information</h3>
          <div class="info-row"><strong>📍</strong><span><strong>Location</strong>${SalonMenu.escapeHtml(salon.address)}</span></div>
          <div class="info-row"><strong>⏱</strong><span><strong>Opening Hours</strong>${SalonMenu.escapeHtml(salon.timings)}<br>Weekly off: ${SalonMenu.escapeHtml(salon.weekly_off || "Ask salon")}</span></div>
          <div class="info-row"><strong>☎</strong><span><strong>Phone</strong>${SalonMenu.escapeHtml(salon.phone)}</span></div>
          ${socials.length ? `<div class="info-row"><strong>@</strong><span><strong>Social</strong>${socials.map(([name, url]) => `<a href="${SalonMenu.escapeAttr(url)}" target="_blank" rel="noopener">${SalonMenu.escapeHtml(name)}</a>`).join(" · ")}</span></div>` : ""}
          <div class="tag-row">${tags.map(tag => `<span class="tag">${SalonMenu.escapeHtml(tag)}</span>`).join("")}</div>
          <div class="booking-card" id="booking-card">No services selected yet</div>
          <button class="btn primary" style="width:100%; margin-top:14px" type="button" onclick="openBooking('sidebar')">Book Appointment</button>
        </section>
        <section class="qr-card" id="qr-menu">
          <div class="qr-brand">SalonMenu.pk</div>
          <h3>Scan this menu</h3>
          <p>Customers can scan, view services, and book on WhatsApp.</p>
          <div class="qr-box" id="salon-qr-code" aria-label="QR code for ${SalonMenu.escapeHtml(salon.name)} menu"></div>
          <span class="qr-url">${getSalonPublicUrl()}</span>
          <div class="qr-actions">
            <button class="btn primary" type="button" onclick="downloadQrCard()">Download QR Card</button>
            <button class="btn ghost" type="button" onclick="copySalonLink()">Copy Menu Link</button>
            <button class="btn ghost" type="button" onclick="shareSalonOnWhatsApp()">Share on WhatsApp</button>
          </div>
        </section>
      </aside>
    </main>

    <footer>
      <div class="shell">© 2026 ${SalonMenu.escapeHtml(salon.name)}. Powered by SalonMenu.pk.</div>
    </footer>

    <button class="floating-checkout" type="button" onclick="openBooking('floating')" id="floating-checkout">Book on WhatsApp</button>
    <nav class="bottom-nav" aria-label="Mobile navigation">
      <a href="#services">Services</a>
      <a href="#packages">Offers</a>
      <a href="#gallery">Gallery</a>
      <a href="#info">Info</a>
    </nav>
  `;

  updateBookingUi();
  renderSalonQrCode();
}

function renderServices() {
  const services = activeCategory === "All Services"
    ? Object.entries(currentSalon.services || {}).flatMap(([category, items]) => items.map(item => ({ ...item, category })))
    : (currentSalon.services?.[activeCategory] || []).map(item => ({ ...item, category: activeCategory }));
  if (!services.length) return "<div class='booking-card'>No services available in this category.</div>";

  return services.map(service => {
    const id = `service:${service.name}`;
    const added = cart.some(item => item.id === id);
    return `
      <article class="service-card">
        <div>
          <h3>${SalonMenu.escapeHtml(service.name)}</h3>
          <p>${SalonMenu.escapeHtml(service.desc || "Premium salon service.")}</p>
          <div class="service-meta"><span>${SalonMenu.escapeHtml(service.time || "Ask timing")}</span><span>${SalonMenu.escapeHtml(service.category)}</span></div>
        </div>
        <div>
          <div class="price">${SalonMenu.money(service.price)}</div>
          <button class="add-btn ${added ? "added" : ""}" type="button" onclick="toggleItem('${SalonMenu.escapeAttr(id)}', '${SalonMenu.escapeAttr(service.name)}', ${Number(service.price || 0)})">${added ? "✓" : "+"}</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderPackages() {
  const packages = currentSalon.packages || [];
  if (!packages.length) return "";

  return `
    <section class="section" id="packages">
      <div class="section-head">
        <div>
          <span class="eyebrow">Offers</span>
          <h2>Packages and deals</h2>
        </div>
      </div>
      <div class="packages">
        ${packages.map(item => {
          const id = `package:${item.name}`;
          const added = cart.some(cartItem => cartItem.id === id);
          return `
            <article class="package-card">
              <div class="package-top">
                <div>
                  <h3>${SalonMenu.escapeHtml(item.name)}</h3>
                  <p>${SalonMenu.escapeHtml((item.includes || []).join(" · "))}</p>
                </div>
                <span class="package-tag">${SalonMenu.escapeHtml(item.tag || "Offer")}</span>
              </div>
              <div class="package-price">
                <strong>${SalonMenu.money(item.price)}</strong>
                ${item.original_price ? `<s>${SalonMenu.money(item.original_price)}</s>` : ""}
              </div>
              <button class="btn ghost" style="width:100%; margin-top:16px" type="button" onclick="toggleItem('${SalonMenu.escapeAttr(id)}', '${SalonMenu.escapeAttr(item.name)}', ${Number(item.price || 0)})">${added ? "Remove Package" : "Select Package"}</button>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function setCategory(category) {
  activeCategory = category;
  render();
}

function getSalonPublicUrl() {
  return `${window.location.origin}/salons/${currentSlug}/`;
}

function renderSalonQrCode() {
  const host = document.getElementById("salon-qr-code");
  if (!host || typeof QRCode === "undefined") return;

  host.innerHTML = "";
  new QRCode(host, {
    text: getSalonPublicUrl(),
    width: 196,
    height: 196,
    colorDark: "#1b1c1c",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.M
  });
}

function getQrDataUrl(size = 620) {
  return new Promise((resolve, reject) => {
    if (typeof QRCode === "undefined") {
      reject(new Error("QR library not loaded"));
      return;
    }

    const temp = document.createElement("div");
    temp.style.position = "fixed";
    temp.style.left = "-9999px";
    document.body.appendChild(temp);

    new QRCode(temp, {
      text: getSalonPublicUrl(),
      width: size,
      height: size,
      colorDark: "#1b1c1c",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M
    });

    const img = temp.querySelector("img");
    if (!img) {
      temp.remove();
      reject(new Error("QR generation failed"));
      return;
    }

    const finish = () => {
      resolve(img.src);
      temp.remove();
    };

    if (img.complete && img.src) finish();
    else img.onload = finish;
    img.onerror = () => {
      temp.remove();
      reject(new Error("QR image failed"));
    };
  });
}

    function toggleItem(id, name, price) {
  const existing = cart.findIndex(item => item.id === id);
  if (existing >= 0) {
    cart.splice(existing, 1);
  } else {
    cart.push({ id, name, price });
  }
  render();
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  updateBookingUi();
  render();
}

function updateBookingUi() {
  const count = cart.length;
  const total = getTotal();
  const summary = count ? `
    <div class="booking-items">
      ${cart.map(item => `
        <div class="booking-item">
          <span>${SalonMenu.escapeHtml(item.name)}</span>
          <strong>${SalonMenu.money(item.price)}</strong>
          <button type="button" onclick="removeItem('${SalonMenu.escapeAttr(item.id)}')">Remove</button>
        </div>
      `).join("")}
    </div>
    <div class="total-row"><span>Total Estimate</span><span>${SalonMenu.money(total)}</span></div>
  ` : "No services selected yet";

  const bookingCard = document.getElementById("booking-card");
  if (bookingCard) bookingCard.innerHTML = summary;

  const floating = document.getElementById("floating-checkout");
  if (floating) floating.textContent = count ? `${count} selected · ${SalonMenu.money(total)}` : "Book on WhatsApp";

  const modalSummary = document.getElementById("modal-summary");
  if (modalSummary) modalSummary.innerHTML = summary;
}

function setupSalonAnalytics() {
  if (setupSalonAnalytics.bound) return;
  setupSalonAnalytics.bound = true;

  document.getElementById("app")?.addEventListener("click", event => {
    const link = event.target.closest('a[href*="wa.me"]');
    if (!link || !link.closest("#app")) return;
    const cta = link.classList.contains("whatsapp") ? "hero" : "link";
    SalonMenu.analytics?.trackWhatsAppClick(currentSlug, cta);
  });
}

function openBooking(source) {
  setBookingDateMin();
  updateBookingUi();
  document.getElementById("booking-modal").classList.add("open");
  document.getElementById("booking-modal").setAttribute("aria-hidden", "false");
  SalonMenu.analytics?.trackBookingModalOpen(currentSlug, source);
}

function closeBooking() {
  document.getElementById("booking-modal").classList.remove("open");
  document.getElementById("booking-modal").setAttribute("aria-hidden", "true");
}

function shareSalon() {
  const url = getSalonPublicUrl();
  if (navigator.share) {
    navigator.share({ title: currentSalon.name, text: currentSalon.tagline, url });
  } else {
    navigator.clipboard?.writeText(url);
    alert("Salon link copied.");
  }
}

async function copySalonLink() {
  await navigator.clipboard.writeText(getSalonPublicUrl());
  alert("Salon menu link copied.");
}

function shareSalonOnWhatsApp() {
  SalonMenu.analytics?.trackWhatsAppClick(currentSlug, "share");
  const text = `View ${currentSalon.name} menu and book here: ${getSalonPublicUrl()}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
}

async function downloadQrCard() {
  let qrDataUrl;
  try {
    qrDataUrl = await getQrDataUrl(620);
  } catch (error) {
    alert("Could not generate QR card. Please refresh and try again.");
    return;
  }

  const salonUrl = getSalonPublicUrl();
  const salonName = SalonMenu.xmlEscape(currentSalon.name);
  const area = SalonMenu.xmlEscape(`${currentSalon.area}, ${currentSalon.city}`);
  const safeUrl = SalonMenu.xmlEscape(salonUrl);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  <defs>
<linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
  <stop offset="0" stop-color="#fffaf8"/>
  <stop offset="1" stop-color="#f3e8e6"/>
</linearGradient>
<filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
  <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#845051" flood-opacity="0.20"/>
</filter>
  </defs>
  <rect width="1080" height="1350" rx="56" fill="url(#bg)"/>
  <rect x="70" y="70" width="940" height="1210" rx="44" fill="#ffffff" filter="url(#shadow)"/>
  <text x="540" y="170" text-anchor="middle" font-family="Georgia, serif" font-size="54" font-weight="700" fill="#845051">SalonMenu.pk</text>
  <text x="540" y="250" text-anchor="middle" font-family="Georgia, serif" font-size="64" font-weight="700" fill="#1b1c1c">${salonName}</text>
  <text x="540" y="310" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="600" fill="#675858">${area}</text>
  <rect x="230" y="395" width="620" height="620" rx="34" fill="#fffaf8" stroke="#eadbd9" stroke-width="3"/>
  <image href="${SalonMenu.xmlEscape(qrDataUrl)}" x="270" y="435" width="540" height="540"/>
  <text x="540" y="1110" text-anchor="middle" font-family="Arial, sans-serif" font-size="38" font-weight="800" fill="#845051">Scan to view menu &amp; book on WhatsApp</text>
  <text x="540" y="1172" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" fill="#675858">${safeUrl}</text>
  <text x="540" y="1248" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#bd8282">Powered by SalonMenu.pk</text>
</svg>`;
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${currentSlug}-qr-card.svg`;
  link.click();
  URL.revokeObjectURL(url);
}

document.getElementById("booking-form").addEventListener("submit", event => {
  event.preventDefault();
  const details = {
    name: document.getElementById("customer-name").value.trim(),
    phone: document.getElementById("customer-phone").value.trim(),
    date: document.getElementById("booking-date").value,
    time: document.getElementById("booking-time").value,
    notes: document.getElementById("booking-notes").value.trim()
  };

  const selected = cart.length ? cart.map(item => `- ${item.name}: ${SalonMenu.money(item.price)}`).join("\n") : "- General appointment request";
  const message = [
    `Hi ${currentSalon.name}, I want to book an appointment.`,
    "",
    "Selected:",
    selected,
    `Total Estimate: ${SalonMenu.money(getTotal())}`,
    "",
    `Name: ${details.name}`,
    `Phone: ${details.phone}`,
    `Preferred Date: ${details.date || "Flexible"}`,
    `Preferred Time: ${details.time || "Flexible"}`,
    `Notes: ${details.notes || "None"}`
  ].join("\n");

  SalonMenu.analytics?.trackWhatsAppClick(currentSlug, "booking_submit");
  window.open(`https://wa.me/${platformBookingWhatsapp}?text=${encodeURIComponent(message)}`, "_blank");
});

document.getElementById("booking-modal").addEventListener("click", event => {
  if (event.target.id === "booking-modal") closeBooking();
});

init();