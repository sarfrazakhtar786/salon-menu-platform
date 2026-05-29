# Analytics (Phase 4)

SalonMenu.pk uses a small client-side analytics wrapper (`assets/js/analytics.js`) with **Plausible** as the default provider. Plausible is privacy-friendly, cookieless, and works well on static sites — no cookie banner is required for typical Plausible setups.

## Enable tracking

1. Create a site at [plausible.io](https://plausible.io) for `salonmenu.pk` (or your staging domain).
2. Edit `assets/js/analytics-config.js`:

```javascript
window.SALONMENU_ANALYTICS = {
  enabled: true,
  provider: "plausible",
  plausible: {
    domain: "salonmenu.pk",
    scriptUrl: "https://plausible.io/js/script.js"
  },
  debug: false
};
```

3. Deploy and verify events in the Plausible dashboard (may take a few minutes).

Set `debug: true` locally to log events in the browser console without sending data.

## Events tracked

| Event | When | Properties |
|-------|------|------------|
| Homepage View | Homepage loads salon directory | — |
| Salon View | Salon menu loads successfully | `salon` (slug) |
| Booking Modal Open | User opens booking sheet | `salon`, `source` (`nav`, `sidebar`, `floating`) |
| WhatsApp Click | User taps a WhatsApp CTA | `salon`, `cta` (`hero`, `booking_submit`, `share`, `owner_listing`) |

Plausible also records standard pageviews automatically when the script is enabled.

## Owner lead log (until dashboard exists)

Use `docs/templates/salon-lead-log.csv` to manually log WhatsApp leads from your platform inbox. Columns: date, salon slug, customer name, phone, services, estimated total, status.

## Alternatives

The wrapper can be extended for Umami or GA4 later. Keep event names stable so dashboards stay comparable when switching providers.
