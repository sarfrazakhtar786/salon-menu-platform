/**
 * Analytics configuration — enable after adding your Plausible site.
 * See docs/ANALYTICS.md for setup steps.
 */
window.SALONMENU_ANALYTICS = {
  enabled: false,
  provider: "plausible",
  plausible: {
    domain: "salonmenu.pk",
    scriptUrl: "https://plausible.io/js/script.js"
  },
  debug: false
};
