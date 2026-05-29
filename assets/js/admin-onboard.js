/**
 * Salon onboarding form logic — used by /admin/onboard.html and local-tools form.
 */
window.AdminOnboard = (function () {
  let existingData = {};
  let generatedJson = "";
  let generatedRoute = "";
  let options = {
    dataJsonPath: "/salons/data.json",
    leadSource: "admin_onboard_form"
  };

  const $ = id => document.getElementById(id);

  function slugify(value) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function lines(id) {
    return $(id).value.split(/\r?\n/).map(v => v.trim()).filter(Boolean);
  }

  function csv(id) {
    return $(id).value.split(",").map(v => v.trim()).filter(Boolean);
  }

  function setStatus(message, type = "") {
    $("status").className = `status ${type}`;
    $("status").textContent = message;
  }

  function addService(value = {}) {
    const wrap = document.createElement("div");
    wrap.className = "item service";
    wrap.innerHTML = `
      <div class="item-head"><span>Service</span><button type="button" class="danger" onclick="AdminOnboard.removeItem(this)">Remove</button></div>
      <div class="form-grid">
        <label>Category <input class="service-category" value="${value.category || ""}" placeholder="Facial"></label>
        <label>Name <input class="service-name" value="${value.name || ""}" placeholder="Basic Facial"></label>
        <label>Time <input class="service-time" value="${value.time || ""}" placeholder="45 min"></label>
        <label>Price <input class="service-price" type="number" value="${value.price || ""}" placeholder="1500"></label>
        <label class="full">Description <textarea class="service-desc" placeholder="Short service description">${value.desc || ""}</textarea></label>
      </div>
    `;
    $("services").appendChild(wrap);
    updateCounts();
  }

  function addPackage(value = {}) {
    const wrap = document.createElement("div");
    wrap.className = "item package";
    wrap.innerHTML = `
      <div class="item-head"><span>Package</span><button type="button" class="danger" onclick="AdminOnboard.removeItem(this)">Remove</button></div>
      <div class="form-grid">
        <label>Name <input class="package-name" value="${value.name || ""}" placeholder="Bridal Glow Package"></label>
        <label>Tag <input class="package-tag" value="${value.tag || ""}" placeholder="Best Value"></label>
        <label>Price <input class="package-price" type="number" value="${value.price || ""}" placeholder="9500"></label>
        <label>Original Price <input class="package-original" type="number" value="${value.original_price || ""}" placeholder="12000"></label>
        <label class="full">Includes <input class="package-includes" value="${(value.includes || []).join(", ")}" placeholder="Gold Facial, Hair Styling, Party Makeup"></label>
      </div>
    `;
    $("packages").appendChild(wrap);
    updateCounts();
  }

  function addReview(value = {}) {
    const wrap = document.createElement("div");
    wrap.className = "item review";
    wrap.innerHTML = `
      <div class="item-head"><span>Review</span><button type="button" class="danger" onclick="AdminOnboard.removeItem(this)">Remove</button></div>
      <div class="form-grid">
        <label>Author <input class="review-author" value="${value.author || ""}" placeholder="Ayesha K."></label>
        <label>Stars <input class="review-stars" type="number" min="1" max="5" value="${value.stars || 5}"></label>
        <label>Verified
          <select class="review-verified">
            <option value="true" ${value.verified !== false ? "selected" : ""}>true</option>
            <option value="false" ${value.verified === false ? "selected" : ""}>false</option>
          </select>
        </label>
        <label class="full">Text <textarea class="review-text" placeholder="Review text">${value.text || ""}</textarea></label>
      </div>
    `;
    $("reviews").appendChild(wrap);
    updateCounts();
  }

  function addDefaultServices() {
    $("services").innerHTML = "";
    [
      ["Facial", "Basic Facial", "45 min", 1500, "Fresh cleansing facial for everyday glow."],
      ["Facial", "Gold Facial", "60 min", 3000, "Radiance facial for events and special days."],
      ["Facial", "Hydra Facial", "60 min", 4500, "Hydrating facial for clean and plump skin."],
      ["Hair", "Hair Cut", "30 min", 1000, "Modern haircut with shape and styling."],
      ["Hair", "Hair Color", "120 min", 5500, "Full hair color with consultation."],
      ["Hair", "Protein Treatment", "90 min", 6500, "Repair treatment for dry or damaged hair."],
      ["Makeup", "Party Makeup", "60 min", 4500, "Event-ready makeup with long-lasting finish."],
      ["Makeup", "Bridal Makeup", "180 min", 22000, "Complete premium bridal makeup."],
      ["Makeup", "Engagement Makeup", "120 min", 14000, "Soft glam look for engagement events."],
      ["Nails", "Basic Manicure", "30 min", 1000, "Classic nail cleanup and polish."],
      ["Nails", "Gel Nails", "60 min", 2500, "Long-lasting gel nail finish."],
      ["Nails", "Luxury Pedicure", "60 min", 2200, "Pedicure with scrub, massage, and polish."]
    ].forEach(([category, name, time, price, desc]) => addService({ category, name, time, price, desc }));
  }

  function addDefaultPackages() {
    $("packages").innerHTML = "";
    [
      { name: "Bridal Glow Package", includes: ["Gold Facial", "Hair Styling", "Bridal Makeup"], price: 18000, original_price: 22000, tag: "Best Value" },
      { name: "Party Ready Package", includes: ["Party Makeup", "Blow Dry", "Gel Nails"], price: 6500, original_price: 8000, tag: "Popular" },
      { name: "Hair Revival Package", includes: ["Hair Cut", "Protein Treatment", "Blow Dry"], price: 7500, original_price: 9500, tag: "Hair Care" },
      { name: "Nails & Glow Package", includes: ["Manicure", "Pedicure", "Basic Facial"], price: 3500, original_price: 4500, tag: "Self Care" }
    ].forEach(addPackage);
  }

  function addDefaultReviews() {
    $("reviews").innerHTML = "";
    [
      ["Ayesha K.", "Service bohat professional thi.", 5, true],
      ["Sana M.", "Makeup long lasting aur natural tha.", 5, true],
      ["Hira B.", "Salon clean aur staff friendly tha.", 4, false],
      ["Fatima A.", "Bridal trial detailed tha.", 5, true],
      ["Maha F.", "Hair color result excellent aya.", 5, true],
      ["Nida W.", "Nails bohat neat thay.", 5, true],
      ["Rabia R.", "Good value for money.", 4, false],
      ["Komal S.", "Soft glam bilkul reference jaisa tha.", 5, true],
      ["Laiba T.", "Facial relaxing aur fresh tha.", 4, false]
    ].forEach(([author, text, stars, verified]) => addReview({ author, text, stars, verified }));
  }

  function fillDemo() {
    $("name").value = "Areeba Bridal Lounge";
    $("slug").value = "areeba-bridal-lounge";
    $("slug").dataset.touched = "true";
    $("tagline").value = "Premium bridal beauty experience";
    $("city").value = "Lahore";
    $("area").value = "DHA Phase 6";
    $("address").value = "Shop 12, DHA Phase 6, Lahore";
    $("phone").value = "0300-1111111";
    $("whatsapp").value = "923001111111";
    $("timings").value = "Mon-Sat: 11am - 9pm";
    $("weekly_off").value = "Sunday";
    $("color").value = "#845051";
    $("price_level").value = "$$$";
    $("hero_image").value = "/assets/images/salons/areeba-bridal-lounge-hero.jpeg";
    $("instagram").value = "https://instagram.com/example";
    $("facebook").value = "";
    $("tiktok").value = "";
    $("business_tags").value = "Ladies Only, Bridal Expert, Parking";
    $("clients").value = "200+";
    $("experience").value = "4yr";
    $("rating").value = "4.8";
    $("gallery").value = Array.from({ length: 12 }, (_, i) => `https://example.com/gallery-${i + 1}.jpg`).join("\n");
    addDefaultServices();
    addDefaultPackages();
    addDefaultReviews();
    updateCounts();
  }

  function collectServices() {
    const services = {};
    document.querySelectorAll(".service").forEach(item => {
      const category = item.querySelector(".service-category").value.trim();
      const service = {
        name: item.querySelector(".service-name").value.trim(),
        time: item.querySelector(".service-time").value.trim(),
        price: Number(item.querySelector(".service-price").value || 0),
        desc: item.querySelector(".service-desc").value.trim()
      };
      if (!category || !service.name) return;
      if (!services[category]) services[category] = [];
      services[category].push(service);
    });
    return services;
  }

  function collectPackages() {
    return [...document.querySelectorAll(".package")].map(item => ({
      name: item.querySelector(".package-name").value.trim(),
      includes: item.querySelector(".package-includes").value.split(",").map(v => v.trim()).filter(Boolean),
      price: Number(item.querySelector(".package-price").value || 0),
      original_price: Number(item.querySelector(".package-original").value || 0),
      tag: item.querySelector(".package-tag").value.trim()
    })).filter(item => item.name);
  }

  function collectReviews() {
    return [...document.querySelectorAll(".review")].map(item => ({
      author: item.querySelector(".review-author").value.trim(),
      text: item.querySelector(".review-text").value.trim(),
      stars: Number(item.querySelector(".review-stars").value || 5),
      verified: item.querySelector(".review-verified").value === "true"
    })).filter(item => item.author && item.text);
  }

  function buildSalon() {
    return {
      name: $("name").value.trim(),
      tagline: $("tagline").value.trim(),
      city: $("city").value.trim(),
      area: $("area").value.trim(),
      address: $("address").value.trim(),
      phone: $("phone").value.trim(),
      whatsapp: $("whatsapp").value.trim(),
      timings: $("timings").value.trim(),
      weekly_off: $("weekly_off").value.trim(),
      color: $("color").value,
      price_level: $("price_level").value,
      hero_image: $("hero_image").value.trim(),
      gallery: lines("gallery"),
      socials: {
        instagram: $("instagram").value.trim(),
        facebook: $("facebook").value.trim(),
        tiktok: $("tiktok").value.trim()
      },
      business_tags: csv("business_tags"),
      stats: {
        clients: $("clients").value.trim(),
        experience: $("experience").value.trim(),
        rating: $("rating").value.trim()
      },
      packages: collectPackages(),
      services: collectServices(),
      reviews: collectReviews()
    };
  }

  function validate(slug, salon) {
    const errors = [];
    if (!slug) errors.push("Slug required.");
    if (!salon.name) errors.push("Salon name required.");
    if (!salon.city) errors.push("City required.");
    if (!salon.area) errors.push("Area required.");
    if (!salon.whatsapp) errors.push("WhatsApp required.");
    if (!salon.hero_image) errors.push("Hero image required.");
    if (Object.values(salon.services).flat().length < 12) errors.push("At least 12 services recommended.");
    if (salon.packages.length < 4) errors.push("At least 4 packages recommended.");
    if (salon.gallery.length < 12) errors.push("At least 12 gallery images recommended.");
    if (salon.reviews.length < 9) errors.push("At least 9 reviews recommended.");
    if (existingData[slug]) errors.push(`Slug "${slug}" already exists. This will replace existing salon.`);
    return errors;
  }

  function routeHtml(slug, name) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name}</title>
  <meta http-equiv="refresh" content="0; url=/salon.html?salon=${slug}">
  <link rel="canonical" href="/salon.html?salon=${slug}">
</head>
<body>
  <p>Opening ${name}...</p>
  <script>window.location.replace("/salon.html?salon=${slug}");<\/script>
</body>
</html>`;
  }

  function generate() {
    const slug = slugify($("slug").value);
    $("slug").value = slug;
    const salon = buildSalon();
    const errors = validate(slug, salon);
    const updated = { ...existingData, [slug]: salon };
    generatedJson = JSON.stringify(updated, null, 2) + "\n";
    generatedRoute = routeHtml(slug, salon.name || slug);
    $("output").textContent = generatedJson;
    $("routeOutput").textContent = `Live URL: /salons/${slug}\n\nOptional alias file salons/${slug}/index.html:\n\n${generatedRoute}`;
    updateCounts();
    if (errors.length) {
      setStatus(errors.join(" "), "bad");
    } else {
      setStatus(`Ready. ${slug} added. Download JSON, save lead, then run seed SQL to publish.`, "ok");
    }
  }

  function downloadJson() {
    if (!generatedJson) generate();
    const blob = new Blob([generatedJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function copyOutput() {
    if (!generatedJson) generate();
    await navigator.clipboard.writeText(generatedJson);
    setStatus("Updated JSON copied.", "ok");
  }

  async function copyRoute() {
    if (!generatedRoute) generate();
    await navigator.clipboard.writeText(generatedRoute);
    setStatus("Route HTML copied.", "ok");
  }

  async function saveToSupabase() {
    if (!window.SalonMenu?.supabase?.isEnabled?.()) {
      setStatus("Supabase is not configured on this site.", "bad");
      return;
    }

    const slug = slugify($("slug").value);
    $("slug").value = slug;
    const salon = buildSalon();
    const errors = validate(slug, salon);
    if (errors.length) {
      setStatus(errors.join(" "), "bad");
      return;
    }

    generate();

    const serviceCount = Object.values(salon.services).flat().length;
    setStatus("Saving onboarding lead to Supabase…", "");

    let submittedBy = null;
    try {
      const session = await SalonMenu.auth?.getSession?.();
      submittedBy = session?.user?.id || null;
    } catch (_) {
      /* local tool without auth */
    }

    try {
      await SalonMenu.supabase.insertPlatformLead({
        lead_type: "owner_listing",
        name: salon.name,
        phone: salon.phone || salon.whatsapp,
        message: [salon.tagline, `${salon.city} · ${salon.area}`, `Slug: ${slug}`].filter(Boolean).join(" · "),
        metadata: {
          source: options.leadSource,
          workflow_status: "pending_review",
          submitted_by: submittedBy,
          slug,
          salon,
          counts: {
            services: serviceCount,
            packages: salon.packages.length,
            gallery: salon.gallery.length,
            reviews: salon.reviews.length
          },
          generated_at: new Date().toISOString()
        }
      });
      setStatus(
        `Saved to platform_leads (${slug}). Publish after review: merge JSON → npm run db:seed-sql → SQL Editor.`,
        "ok"
      );
    } catch (error) {
      console.error(error);
      setStatus(`Supabase save failed: ${error.message}`, "bad");
    }
  }

  function updateCounts() {
    if (!$("galleryCount")) return;
    $("galleryCount").textContent = lines("gallery").length;
    $("serviceCount").textContent = document.querySelectorAll(".service").length;
    $("packageCount").textContent = document.querySelectorAll(".package").length;
    $("reviewCount").textContent = document.querySelectorAll(".review").length;
  }

  function removeItem(button) {
    button.closest(".item")?.remove();
    updateCounts();
  }

  async function loadExistingData() {
    try {
      const response = await fetch(options.dataJsonPath, { cache: "no-store" });
      existingData = await response.json();
      if ($("loadedStatus")) {
        $("loadedStatus").textContent = `${Object.keys(existingData).length} salons loaded`;
      }
      setStatus("Current salons loaded.", "ok");
    } catch (error) {
      existingData = {};
      if ($("loadedStatus")) $("loadedStatus").textContent = "Load failed";
      setStatus(`Could not load ${options.dataJsonPath}. Serve the site from repo root.`, "bad");
    }
  }

  function bindForm() {
    $("name")?.addEventListener("input", () => {
      if (!$("slug").dataset.touched) $("slug").value = slugify($("name").value);
    });
    $("slug")?.addEventListener("input", () => {
      $("slug").dataset.touched = "true";
    });
    $("gallery")?.addEventListener("input", updateCounts);
  }

  function init(opts = {}) {
    options = { ...options, ...opts };
    bindForm();
    loadExistingData();
    addDefaultServices();
    addDefaultPackages();
    addDefaultReviews();
    updateCounts();
  }

  return {
    init,
    loadExistingData,
    fillDemo,
    addService,
    addPackage,
    addReview,
    addDefaultServices,
    addDefaultPackages,
    addDefaultReviews,
    generate,
    downloadJson,
    copyOutput,
    copyRoute,
    saveToSupabase,
    updateCounts,
    removeItem
  };
})();
