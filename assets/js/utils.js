window.SalonMenu = window.SalonMenu || {};

SalonMenu.escapeHtml = function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

SalonMenu.escapeAttr = function escapeAttr(value) {
  return SalonMenu.escapeHtml(value);
};

SalonMenu.money = function money(amount) {
  return `Rs. ${Number(amount || 0).toLocaleString()}`;
};

SalonMenu.xmlEscape = function xmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};
