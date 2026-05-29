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
const cityFilter = document.getElementById("city-filter");
const serviceFilter = document.getElementById("service-filter");
const categoryChips = document.getElementById("category-chips");

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

    function getServiceNames(salon) {
  return Object.values(salon.services || {}).flat().map(service => service.name);
}

function getCategories(salon) {
  return Object.keys(salon.services || {});
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

function renderFilters() {
  const cities = unique(state.salons.map(({ salon }) => salon.city));
  const categories = unique(state.salons.flatMap(({ salon }) => getCategories(salon)));

  cityFilter.innerHTML = '<option value="">All Cities</option>' + cities.map(city => `<option value="${SalonMenu.escapeAttr(city)}">${SalonMenu.escapeHtml(city)}</option>`).join("");
  serviceFilter.innerHTML = '<option value="">All Services</option>' + categories.map(category => `<option value="${SalonMenu.escapeAttr(category)}">${SalonMenu.escapeHtml(category)}</option>`).join("");

  categoryChips.innerHTML = [
    `<button class="chip active" data-category="">All Services</button>`,
    ...categories.map(category => `<button class="chip" data-category="${SalonMenu.escapeAttr(category)}">${SalonMenu.escapeHtml(category)}</button>`)
  ].join("");

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

function renderSalons() {
  const filtered = state.salons.filter(({ salon }) => salonMatches(salon));
  resultCount.textContent = `${filtered.length} salon${filtered.length === 1 ? "" : "s"} found`;

  if (!filtered.length) {
    grid.innerHTML = '<div class="empty">No salons match this search yet. Try another city or service.</div>';
    return;
  }

  grid.innerHTML = filtered.map(({ slug, salon }) => {
    const tags = (salon.business_tags || getCategories(salon)).slice(0, 3);
    const rating = salon.stats?.rating || "New";
    const image = salon.hero_image || "";
    return `
      <article class="salon-card">
        <div class="card-media">
          <img src="${SalonMenu.escapeAttr(image)}" alt="${SalonMenu.escapeHtml(salon.name)} cover image" loading="lazy">
          <div class="rating"><span>★</span> ${SalonMenu.escapeHtml(rating)}</div>
        </div>
        <div class="card-body">
          <div class="card-title-row">
            <h3>${SalonMenu.escapeHtml(salon.name)}</h3>
            ${salon.price_level ? `<span class="price-level">${SalonMenu.escapeHtml(salon.price_level)}</span>` : ""}
          </div>
          <p class="location">${SalonMenu.escapeHtml(salon.area)}, ${SalonMenu.escapeHtml(salon.city)}</p>
          <div class="tag-row">
            ${tags.map(tag => `<span class="tag">${SalonMenu.escapeHtml(tag)}</span>`).join("")}
          </div>
          <a class="view-btn" href="/salon.html?salon=${encodeURIComponent(slug)}">View Menu</a>
        </div>
      </article>
    `;
  }).join("");
}

async function init() {
  try {
    const response = await fetch("/salons/data.json");
    const data = await response.json();
    state.salons = Object.entries(data).map(([slug, salon]) => ({ slug, salon }));
    renderFilters();
    renderSalons();
    SalonMenu.analytics?.trackHomepageView();
  } catch (error) {
    resultCount.textContent = "Unable to load salons";
    grid.innerHTML = '<div class="empty">Salon data could not be loaded. Please refresh the page.</div>';
  }
}

document.getElementById("search-form").addEventListener("submit", event => {
  event.preventDefault();
  state.query = searchInput.value.trim();
  state.city = cityFilter.value;
  state.service = serviceFilter.value;
  if (state.service) {
    state.category = "";
    categoryChips.querySelectorAll(".chip").forEach(item => item.classList.toggle("active", item.dataset.category === ""));
  }
  renderSalons();
  document.getElementById("explore").scrollIntoView({ behavior: "smooth", block: "start" });
});

searchInput.addEventListener("input", () => {
  state.query = searchInput.value.trim();
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

init();