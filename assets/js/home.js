const state = {
  salons: [],
  category: "",
  query: "",
  city: "",
  service: ""
};

const grid = document.getElementById("salon-grid");
const resultCount = document.getElementById("result-count");
const searchInput = document.getElementById("search");
const navSearchInput = document.getElementById("nav-search");
const cityFilter = document.getElementById("city-filter");
const serviceFilter = document.getElementById("service-filter");
const categoryChips = document.getElementById("category-chips");
const popularServicesGrid = document.getElementById("popular-services-grid");
const popularViewport = document.getElementById("popular-viewport");
const popularPrevBtn = document.getElementById("popular-prev");
const popularNextBtn = document.getElementById("popular-next");
const cityGrid = document.getElementById("city-grid");
const heroTagsContainer = document.getElementById("hero-tags");

const heroTags = [
  { label: "All Services", query: "", category: "" },
  { label: "Facial", query: "facial", category: "" },
  { label: "Hair", query: "hair", category: "" },
  { label: "Makeup", query: "makeup", category: "" },
  { label: "Nails", query: "nail", category: "" },
  { label: "Bridal", query: "bridal", category: "" },
  { label: "Massage", query: "massage", category: "" }
];

const cityBrowseCatalog = [
  {
    city: "Lahore",
    image: "https://images.unsplash.com/photo-1582555172862-f73ea7a59636?auto=format&fit=crop&w=640&q=80"
  },
  {
    city: "Karachi",
    image: "https://images.unsplash.com/photo-1584556819295-5c5aee63c800?auto=format&fit=crop&w=640&q=80"
  },
  {
    city: "Islamabad",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=640&q=80",
    comingSoon: true
  },
  {
    city: "Rawalpindi",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=640&q=80",
    comingSoon: true
  },
  {
    city: "Faisalabad",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=640&q=80",
    comingSoon: true
  },
  {
    city: "Multan",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=640&q=80",
    comingSoon: true
  },
  {
    city: "Sahiwal",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=640&q=80"
  },
  {
    city: "Gujranwala",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=640&q=80",
    comingSoon: true
  }
];

const popularServices = [
  {
    name: "Bridal Makeup",
    price: 8000,
    rating: "4.8",
    salons: "120+ Salons",
    query: "bridal",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=480&q=80"
  },
  {
    name: "Hair Coloring",
    price: 3500,
    rating: "4.6",
    salons: "90+ Salons",
    query: "color",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=480&q=80"
  },
  {
    name: "Keratin Treatment",
    price: 4500,
    rating: "4.7",
    salons: "80+ Salons",
    query: "keratin",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmT0m0UA1HZJkDU7B7mSkfd0seof0zRBWlqZTHtgpVdHzECXj_kU3SMT1ibyiw7mPDXJhU-Ti3ySO-XMC5NRuebd2oZKw9Z4LSNe3LfPyVmailCxDRrNvz3gTpsKybEoOUH1rZit6dkNkLAFOUd6gkytGblpuxMv0MtrJm7b8IZbAm6scQJr6scABXETPNj78xkiqhKfL-zwq0D0CnkWHmfIHue8diaESH3wodth1hTUtUEXtE25Itw_GnORQH5_6K95_eecSkowxv"
  },
  {
    name: "Hydra Facial",
    price: 5000,
    rating: "4.6",
    salons: "110+ Salons",
    query: "facial",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=480&q=80"
  },
  {
    name: "Nail Art",
    price: 1500,
    rating: "4.7",
    salons: "70+ Salons",
    query: "nail",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=480&q=80"
  },
  {
    name: "Mehndi Artist",
    price: 3000,
    rating: "4.9",
    salons: "60+ Salons",
    query: "mehndi",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=480&q=80"
  },
  {
    name: "Party Makeup",
    price: 4000,
    rating: "4.6",
    salons: "100+ Salons",
    query: "makeup",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNrVRTobrqMhAkSwP9X7hitzGIesNRsjv6srQhCAEDV8uzmghEGPhnvrjS4LTUf4sHvtd0rJl_q3yBjXnADh4z4w5HbSEKjun36ZZXBQvMeIuPOLxXOsT9du19NHhKFDkOKGfwnTdaCuMpr2BsJxT20ZhMzdxTy9x4SeFjlcgyZBioLxWiHTtx4XQn5474LJsyz8u0LMgvMoNSlp5FWrs5ybBgP_vsJ_PUJbfbZVr2pnNwL1jA7Nbzsnh0goqdfQFZqHfYs7qEyE5k"
  },
  {
    name: "Hair Extensions",
    price: 8000,
    rating: "4.5",
    salons: "50+ Salons",
    query: "extension",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=480&q=80"
  }
];

const categoryIcons = {
  "All Services": "apps",
  "Hair Styling": "content_cut",
  "Hair": "content_cut",
  "Facials": "face_5",
  "Facial": "face_5",
  "Makeup Artistry": "brush",
  "Makeup": "brush",
  "Bridal Makeup": "brush",
  "Nail Care": "back_hand",
  "Nails": "back_hand",
  "Massage & Spa": "self_care",
  "Spa": "self_care",
  "Massage": "self_care",
  "Waxing": "spa",
  "Threading": "face_3",
  "Packages": "redeem"
};

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function getServiceNames(salon) {
  return Object.values(salon.services || {}).flat().map(service => service.name);
}

function getCategories(salon) {
  return Object.keys(salon.services || {});
}

function getCategoryIcon(category) {
  if (categoryIcons[category]) return categoryIcons[category];
  const match = Object.keys(categoryIcons).find(key => category.toLowerCase().includes(key.toLowerCase()));
  return match ? categoryIcons[match] : "spa";
}

function salonMatches(salon) {
  const haystack = [
    salon.name,
    salon.city,
    salon.area,
    salon.tagline,
    ...(salon.business_tags || []),
    ...getCategories(salon),
    ...getServiceNames(salon)
  ].join(" ").toLowerCase();

  const matchesQuery = !state.query || haystack.includes(state.query.toLowerCase());
  const matchesCity = !state.city || salon.city === state.city;
  const selectedService = state.service || state.category;
  const matchesService = !selectedService || getCategories(salon).includes(selectedService);

  return matchesQuery && matchesCity && matchesService;
}

function renderChip(category, active) {
  const label = category || "All Services";
  const icon = getCategoryIcon(label);
  return `
    <button class="chip ${active ? "active" : ""}" type="button" data-category="${SalonMenu.escapeAttr(category)}">
      <span class="material-symbols-outlined" aria-hidden="true">${icon}</span>
      ${SalonMenu.escapeHtml(label)}
    </button>
  `;
}

function renderPopularServices() {
  if (!popularServicesGrid) return;

  popularServicesGrid.innerHTML = popularServices.map(service => `
    <button class="popular-card" type="button" data-query="${SalonMenu.escapeAttr(service.query)}" aria-label="Search ${SalonMenu.escapeAttr(service.name)}">
      <div class="popular-media">
        <img src="${SalonMenu.escapeAttr(service.image)}" alt="${SalonMenu.escapeHtml(service.name)}" loading="lazy">
      </div>
      <h3>${SalonMenu.escapeHtml(service.name)}</h3>
      <p class="popular-price">From PKR ${Number(service.price).toLocaleString()}</p>
      <div class="popular-meta">
        <span class="material-symbols-outlined" aria-hidden="true">star</span>
        <span>${SalonMenu.escapeHtml(service.rating)}</span>
        <span>${SalonMenu.escapeHtml(service.salons)}</span>
      </div>
    </button>
  `).join("");

  popularServicesGrid.querySelectorAll(".popular-card").forEach(card => {
    card.addEventListener("click", () => {
      state.query = card.dataset.query || "";
      state.category = "";
      state.service = "";
      serviceFilter.value = "";
      syncSearchInputs(state.query);
      categoryChips.querySelectorAll(".chip").forEach(item => item.classList.toggle("active", item.dataset.category === ""));
      renderSalons();
      document.getElementById("explore").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  setupPopularCarousel();
}

function getCitySalonCounts() {
  const counts = {};
  state.salons.forEach(({ salon }) => {
    counts[salon.city] = (counts[salon.city] || 0) + 1;
  });
  return counts;
}

function getCityServiceCounts() {
  const counts = {};
  state.salons.forEach(({ salon }) => {
    counts[salon.city] = (counts[salon.city] || 0) + getServiceNames(salon).length;
  });
  return counts;
}

function getCityBrowseItems() {
  const counts = getCitySalonCounts();
  const known = new Set(cityBrowseCatalog.map(item => item.city));

  const items = cityBrowseCatalog.map(item => ({
    ...item,
    count: counts[item.city] || 0,
    comingSoon: item.comingSoon && !counts[item.city]
  }));

  Object.entries(counts).forEach(([city, count]) => {
    if (known.has(city)) return;
    items.push({
      city,
      count,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=640&q=80",
      comingSoon: false
    });
  });

  return items.sort((a, b) => {
    if (a.comingSoon !== b.comingSoon) return a.comingSoon ? 1 : -1;
    return b.count - a.count || a.city.localeCompare(b.city);
  });
}

function renderCityBrowse() {
  if (!cityGrid) return;

  const salonCounts = getCitySalonCounts();
  const serviceCounts = getCityServiceCounts();
  const items = getCityBrowseItems();

  cityGrid.innerHTML = items.map(item => {
    const salonLabel = item.comingSoon
      ? "Coming soon"
      : `${item.count} salon${item.count === 1 ? "" : "s"}`;
    const serviceLabel = item.comingSoon
      ? ""
      : `${serviceCounts[item.city] || 0} services`;
    return `
      <button
        class="city-compact-card ${item.comingSoon ? "is-soon" : ""}"
        type="button"
        data-city="${SalonMenu.escapeAttr(item.city)}"
        ${item.comingSoon ? "disabled" : ""}
        aria-label="${SalonMenu.escapeAttr(item.comingSoon ? `${item.city} coming soon` : `Browse salons in ${item.city}`)}"
      >
        <img src="${SalonMenu.escapeAttr(item.image)}" alt="${SalonMenu.escapeHtml(item.city)}" loading="lazy">
        ${item.comingSoon ? '<span class="city-compact-soon">Soon</span>' : ""}
        <span class="city-compact-overlay">
          <strong>${SalonMenu.escapeHtml(item.city)}</strong>
          <span>${SalonMenu.escapeHtml(salonLabel)}</span>
          ${serviceLabel ? `<span>${SalonMenu.escapeHtml(serviceLabel)}</span>` : ""}
        </span>
      </button>
    `;
  }).join("");

  cityGrid.querySelectorAll(".city-compact-card:not(:disabled)").forEach(card => {
    card.addEventListener("click", () => {
      state.city = card.dataset.city || "";
      state.query = "";
      state.category = "";
      state.service = "";
      cityFilter.value = state.city;
      serviceFilter.value = "";
      syncSearchInputs("");
      categoryChips.querySelectorAll(".chip").forEach(chip => chip.classList.toggle("active", chip.dataset.category === ""));
      renderSalons();
      document.getElementById("explore").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderHeroTags() {
  if (!heroTagsContainer) return;

  heroTagsContainer.innerHTML = heroTags.map((tag, index) => `
    <button
      class="hero-tag ${index === 0 && !state.query ? "active" : ""}"
      type="button"
      data-query="${SalonMenu.escapeAttr(tag.query)}"
      data-category="${SalonMenu.escapeAttr(tag.category)}"
    >${SalonMenu.escapeHtml(tag.label)}</button>
  `).join("");

  heroTagsContainer.querySelectorAll(".hero-tag").forEach(tagBtn => {
    tagBtn.addEventListener("click", () => {
      state.query = tagBtn.dataset.query || "";
      state.category = tagBtn.dataset.category || "";
      state.service = "";
      serviceFilter.value = "";
      syncSearchInputs(state.query);
      heroTagsContainer.querySelectorAll(".hero-tag").forEach(item => item.classList.remove("active"));
      tagBtn.classList.add("active");
      categoryChips.querySelectorAll(".chip").forEach(chip => chip.classList.toggle("active", chip.dataset.category === state.category));
      renderSalons();
      if (state.query || state.category) {
        document.getElementById("explore").scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function applySearchQuery(query) {
  state.query = query || "";
  state.category = "";
  state.service = "";
  serviceFilter.value = "";
  syncSearchInputs(state.query);
  heroTagsContainer?.querySelectorAll(".hero-tag").forEach(item => {
    item.classList.toggle("active", item.dataset.query === state.query);
  });
  categoryChips.querySelectorAll(".chip").forEach(chip => chip.classList.toggle("active", chip.dataset.category === ""));
  renderSalons();
  document.getElementById("explore").scrollIntoView({ behavior: "smooth", block: "start" });
}

function getPopularScrollStep() {
  const card = popularServicesGrid?.querySelector(".popular-card");
  if (!card) return 190;
  const styles = window.getComputedStyle(popularServicesGrid);
  const gap = parseFloat(styles.columnGap || styles.gap || "22") || 22;
  return card.offsetWidth + gap;
}

function updatePopularCarouselButtons() {
  if (!popularViewport || !popularPrevBtn || !popularNextBtn) return;
  const maxScroll = popularViewport.scrollWidth - popularViewport.clientWidth;
  popularPrevBtn.disabled = popularViewport.scrollLeft <= 4;
  popularNextBtn.disabled = popularViewport.scrollLeft >= maxScroll - 4;
}

function setupPopularCarousel() {
  if (!popularViewport || !popularPrevBtn || !popularNextBtn) return;

  const scrollByStep = direction => {
    popularViewport.scrollBy({
      left: direction * getPopularScrollStep(),
      behavior: "smooth"
    });
  };

  popularPrevBtn.addEventListener("click", () => scrollByStep(-1));
  popularNextBtn.addEventListener("click", () => scrollByStep(1));
  popularViewport.addEventListener("scroll", updatePopularCarouselButtons, { passive: true });
  window.addEventListener("resize", updatePopularCarouselButtons);

  updatePopularCarouselButtons();
}

function bindCategoryChips() {
  categoryChips.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      state.category = chip.dataset.category;
      state.service = "";
      serviceFilter.value = "";
      categoryChips.querySelectorAll(".chip").forEach(item => item.classList.remove("active"));
      chip.classList.add("active");
      renderSalons();
    });
  });
}

function renderFilters() {
  const cities = unique(state.salons.map(({ salon }) => salon.city));
  const categories = unique(state.salons.flatMap(({ salon }) => getCategories(salon)));

  cityFilter.innerHTML = '<option value="">All Cities</option>' + cities.map(city => `<option value="${SalonMenu.escapeAttr(city)}">${SalonMenu.escapeHtml(city)}</option>`).join("");
  serviceFilter.innerHTML = '<option value="">All Services</option>' + categories.map(category => `<option value="${SalonMenu.escapeAttr(category)}">${SalonMenu.escapeHtml(category)}</option>`).join("");

  categoryChips.innerHTML = [
    renderChip("", !state.category),
    ...categories.map(category => renderChip(category, state.category === category))
  ].join("");

  bindCategoryChips();
}

function renderSalons() {
  const filtered = state.salons.filter(({ salon }) => salonMatches(salon));
  resultCount.textContent = `${filtered.length} salon${filtered.length === 1 ? "" : "s"} found`;

  if (!filtered.length) {
    grid.innerHTML = '<div class="empty">No salons match this search yet. Try another city or service.</div>';
    return;
  }

  grid.innerHTML = filtered.map(({ slug, salon }) => {
    const tags = (salon.business_tags || getCategories(salon)).slice(0, 2);
    const rating = salon.stats?.rating || "New";
    const image = salon.hero_image || "";
    return `
      <article class="salon-card">
        <div class="card-media">
          <img src="${SalonMenu.escapeAttr(image)}" alt="${SalonMenu.escapeHtml(salon.name)} cover image" loading="lazy">
          <div class="rating">
            <span class="material-symbols-outlined" aria-hidden="true">star</span>
            ${SalonMenu.escapeHtml(rating)}
          </div>
        </div>
        <div class="card-body">
          <div class="card-title-row">
            <h3>${SalonMenu.escapeHtml(salon.name)}</h3>
            ${salon.price_level ? `<span class="price-level">${SalonMenu.escapeHtml(salon.price_level)}</span>` : ""}
          </div>
          <p class="location">
            <span class="material-symbols-outlined" aria-hidden="true">location_on</span>
            ${SalonMenu.escapeHtml(salon.area)}, ${SalonMenu.escapeHtml(salon.city)}
          </p>
          <div class="tag-row">
            ${tags.map(tag => `<span class="tag">${SalonMenu.escapeHtml(tag)}</span>`).join("")}
          </div>
          <a class="view-btn" href="/salon.html?salon=${encodeURIComponent(slug)}">View Menu</a>
        </div>
      </article>
    `;
  }).join("");
}

function syncSearchInputs(value) {
  if (searchInput && searchInput.value !== value) searchInput.value = value;
  if (navSearchInput && navSearchInput.value !== value) navSearchInput.value = value;
}

async function init() {
  try {
    const response = await fetch("/salons/data.json");
    const data = await response.json();
    state.salons = Object.entries(data).map(([slug, salon]) => ({ slug, salon }));
    renderFilters();
    renderHeroTags();
    renderPopularServices();
    renderCityBrowse();
    renderSalons();
    SalonMenu.analytics?.trackHomepageView();
  } catch (error) {
    resultCount.textContent = "Unable to load salons";
    grid.innerHTML = '<div class="empty">Salon data could not be loaded. Please refresh the page.</div>';
  }
}

document.querySelectorAll("[data-filter-query]").forEach(button => {
  button.addEventListener("click", () => {
    applySearchQuery(button.dataset.filterQuery || "");
  });
});

document.getElementById("search-form").addEventListener("submit", event => {
  event.preventDefault();
  state.query = searchInput.value.trim();
  state.city = cityFilter.value;
  state.service = serviceFilter.value;
  syncSearchInputs(state.query);
  heroTagsContainer?.querySelectorAll(".hero-tag").forEach(item => {
    item.classList.toggle("active", item.dataset.query === state.query && !state.category);
  });
  if (state.service) {
    state.category = "";
    categoryChips.querySelectorAll(".chip").forEach(item => item.classList.toggle("active", item.dataset.category === ""));
  }
  renderSalons();
  document.getElementById("explore").scrollIntoView({ behavior: "smooth", block: "start" });
});

searchInput.addEventListener("input", () => {
  state.query = searchInput.value.trim();
  syncSearchInputs(state.query);
  heroTagsContainer?.querySelectorAll(".hero-tag").forEach(item => {
    item.classList.toggle("active", item.dataset.query === state.query);
  });
  renderSalons();
});

navSearchInput?.addEventListener("input", () => {
  state.query = navSearchInput.value.trim();
  syncSearchInputs(state.query);
  renderSalons();
});

cityFilter.addEventListener("change", () => {
  state.city = cityFilter.value;
  renderSalons();
});

serviceFilter.addEventListener("change", () => {
  state.service = serviceFilter.value;
  state.category = "";
  categoryChips.querySelectorAll(".chip").forEach(item => item.classList.toggle("active", item.dataset.category === ""));
  renderSalons();
});

document.getElementById("owner-whatsapp-cta")?.addEventListener("click", () => {
  SalonMenu.analytics?.trackWhatsAppClick("platform", "owner_listing");
});

document.querySelectorAll(".nav-soon, .nav-soon-btn").forEach(el => {
  el.addEventListener("click", event => {
    if (el.matches("a[href='#']") || el.classList.contains("nav-soon-btn")) {
      event.preventDefault();
    }
  });
});

document.getElementById("newsletter-form")?.addEventListener("submit", event => {
  event.preventDefault();
  alert("Newsletter signup is coming soon. Thanks for your interest!");
});

init();
