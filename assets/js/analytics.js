window.SalonMenu = window.SalonMenu || {};

SalonMenu.analytics = (function () {
  const config = window.SALONMENU_ANALYTICS || {};
  let ready = false;

  function log(eventName, props) {
    if (config.debug) {
      console.info("[SalonMenu analytics]", eventName, props || {});
    }
  }

  function send(eventName, props) {
    log(eventName, props);
    if (!config.enabled) return;

    const payload = props && Object.keys(props).length ? { props } : undefined;

    if (config.provider === "plausible" && typeof window.plausible === "function") {
      window.plausible(eventName, payload);
      return;
    }

    if (config.provider === "umami" && typeof window.umami === "object" && typeof window.umami.track === "function") {
      window.umami.track(eventName, props);
    }
  }

  function loadPlausible() {
    const settings = config.plausible || {};
    if (!settings.domain || !settings.scriptUrl) return;

    window.plausible = window.plausible || function () {
      (window.plausible.q = window.plausible.q || []).push(arguments);
    };

    const script = document.createElement("script");
    script.defer = true;
    script.dataset.domain = settings.domain;
    script.src = settings.scriptUrl;
    document.head.appendChild(script);
    ready = true;
  }

  function init() {
    if (!config.enabled) {
      log("disabled");
      return;
    }

    if (config.provider === "plausible") {
      loadPlausible();
    }
  }

  return {
    init,
    isEnabled: function isEnabled() {
      return Boolean(config.enabled);
    },
    trackHomepageView: function trackHomepageView() {
      send("Homepage View");
    },
    trackSalonView: function trackSalonView(slug) {
      if (!slug) return;
      send("Salon View", { salon: slug });
    },
    trackBookingModalOpen: function trackBookingModalOpen(slug, source) {
      if (!slug) return;
      send("Booking Modal Open", { salon: slug, source: source || "unknown" });
    },
    trackWhatsAppClick: function trackWhatsAppClick(slug, cta) {
      send("WhatsApp Click", { salon: slug || "platform", cta: cta || "unknown" });
    }
  };
})();

SalonMenu.analytics.init();
