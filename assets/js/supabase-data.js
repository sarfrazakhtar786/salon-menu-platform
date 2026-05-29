/**
 * Loads salon catalog from Supabase PostgREST and maps to legacy data.json shape.
 */
window.SalonMenu = window.SalonMenu || {};

SalonMenu.supabase = (function () {
  const config = window.SALONMENU_SUPABASE || {};

  function isEnabled() {
    return Boolean(config.enabled && config.url && config.anonKey);
  }

  function buildHeaders(prefer) {
    const h = {
      apikey: config.anonKey,
      Authorization: `Bearer ${config.anonKey}`,
      "Content-Type": "application/json"
    };
    if (prefer) h.Prefer = prefer;
    return h;
  }

  async function request(path, options = {}) {
    const url = `${config.url.replace(/\/$/, "")}/rest/v1/${path}`;
    const response = await fetch(url, {
      ...options,
      headers: { ...buildHeaders(options.prefer), ...options.headers }
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Supabase ${response.status}: ${text}`);
    }
    if (response.status === 204) return null;
    return response.json();
  }

  function sortByOrder(a, b, key) {
    return (a[key] ?? 0) - (b[key] ?? 0);
  }

  function mapSalonRow(row) {
    const gallery = (row.salon_gallery_images || []).sort((a, b) => sortByOrder(a, b, "sort_order"));
    const tags = (row.salon_tags || [])
      .map(st => st.business_tags?.name)
      .filter(Boolean);
    const socials = { instagram: "", facebook: "", tiktok: "" };
    (row.salon_social_links || []).forEach(link => {
      if (link.platform in socials) socials[link.platform] = link.url || "";
    });

    const services = {};
    (row.service_categories || [])
      .sort((a, b) => sortByOrder(a, b, "sort_order"))
      .forEach(cat => {
        services[cat.name] = (cat.services || [])
          .sort((a, b) => sortByOrder(a, b, "sort_order"))
          .map(svc => ({
            name: svc.name,
            time: svc.duration_label || "",
            price: svc.price_pkr,
            desc: svc.description || ""
          }));
      });

    const packages = (row.packages || [])
      .sort((a, b) => sortByOrder(a, b, "sort_order"))
      .map(pkg => ({
        name: pkg.name,
        includes: (pkg.package_items || [])
          .sort((a, b) => sortByOrder(a, b, "sort_order"))
          .map(item => item.label),
        price: pkg.price_pkr,
        original_price: pkg.original_price_pkr ?? undefined,
        tag: pkg.promo_tag || undefined
      }));

    const reviews = (row.salon_reviews || [])
      .filter(r => r.is_published !== false)
      .map(r => ({
        text: r.body,
        author: r.author_name,
        stars: r.stars,
        verified: r.is_verified
      }));

    return {
      _dbId: row.id,
      name: row.name,
      tagline: row.tagline || "",
      city: row.city_name,
      area: row.area || "",
      address: row.address || "",
      phone: row.phone || "",
      whatsapp: row.whatsapp,
      timings: row.timings || "",
      weekly_off: row.weekly_off || "",
      color: row.brand_color || "#845051",
      price_level: row.price_level || "",
      hero_image: row.hero_image_url || "",
      gallery: gallery.map(g => g.image_url),
      socials,
      business_tags: tags,
      stats: {
        clients: row.stats_clients_label || "",
        experience: row.stats_experience_label || "",
        rating: row.stats_rating != null ? String(row.stats_rating) : "New"
      },
      packages,
      services,
      reviews
    };
  }

  const SALON_SELECT = [
    "*",
    "salon_gallery_images(image_url,sort_order)",
    "salon_tags(business_tags(name))",
    "salon_social_links(platform,url)",
    "service_categories(id,name,slug,sort_order,services(id,name,description,duration_label,price_pkr,sort_order))",
    "packages(id,name,price_pkr,original_price_pkr,promo_tag,sort_order,package_items(label,sort_order))",
    "salon_reviews(author_name,body,stars,is_verified,is_published)"
  ].join(",");

  async function fetchSalonsCatalog() {
    const rows = await request(
      `salons?status=eq.published&select=${encodeURIComponent(SALON_SELECT)}&order=name.asc`
    );
    const catalog = {};
    rows.forEach(row => {
      catalog[row.slug] = mapSalonRow(row);
    });
    return catalog;
  }

  async function insertBookingRequest(payload) {
    return request("booking_requests", {
      method: "POST",
      prefer: "return=representation",
      body: JSON.stringify(payload)
    });
  }

  async function insertPlatformLead(payload) {
    return request("platform_leads", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }

  return {
    isEnabled,
    fetchSalonsCatalog,
    insertBookingRequest,
    insertPlatformLead
  };
})();

SalonMenu.loadSalonsCatalog = async function loadSalonsCatalog() {
  if (SalonMenu.supabase.isEnabled()) {
    try {
      return await SalonMenu.supabase.fetchSalonsCatalog();
    } catch (error) {
      console.warn("[SalonMenu] Supabase catalog failed, falling back to data.json", error);
    }
  }
  const response = await fetch("/salons/data.json");
  if (!response.ok) throw new Error("Failed to load salons/data.json");
  return response.json();
};
