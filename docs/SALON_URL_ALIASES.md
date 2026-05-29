# Salon URL aliases

Canonical salon slugs live in `salons/data.json`. Some older or marketing-friendly paths redirect to the same menu.

## Canonical slug

| Salon | Canonical slug | Public URL |
|-------|----------------|------------|
| Rose Beauty Parlour | `rose-beauty-parlour` | `/salons/rose-beauty-parlour/` |

## Runtime aliases (`salon.html`)

These URL slugs resolve to the canonical record in JavaScript:

| Alias | Canonical |
|-------|-----------|
| `rose` | `rose-beauty-parlour` |
| `rose-beauty-salon` | `rose-beauty-parlour` |
| `rose-beauty-parlor` | `rose-beauty-parlour` |

## Static redirect folders

Keep thin redirect HTML for bookmarked paths:

- `salons/rose/index.html` → `rose-beauty-parlour`
- `salons/rose-beauty-salon/index.html` → `rose-beauty-parlour`
- `salons/rose-beauty-parlour/index.html` → canonical

Do not remove alias folders until analytics show they are unused.

## Adding a new salon

1. Pick one canonical slug in `data.json`.
2. Optional: add marketing aliases in `slugAliases` inside `assets/js/salon.js`.
3. Add `salons/{slug}/index.html` redirect stub if you want `/salons/{slug}/` without query params.
