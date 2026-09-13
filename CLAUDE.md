# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, no-build multi-page website template for GW Fins, an upscale seafood restaurant in New Orleans. Plain HTML/CSS/JS — no framework, no bundler, no package.json, no test suite. Every `.html` file at the repo root is a standalone page that loads `css/style.css` and the relevant `js/*.js` files directly via `<script src>`/`<link>` tags.

## Running it

There is no build or dev-server command. Open any `.html` file directly in a browser, or serve the directory for a proper `localhost` URL (needed for correct relative-path behavior in some browsers):

```
python -m http.server 8000
```

then visit `http://localhost:8000/index.html`.

There is no lint or test command configured.

## Pages

`index.html` (Home), `menu.html`, `reservations.html`, `about.html`, `private-events.html`, `gallery.html`, `contact.html`. Each page duplicates the same header (`.site-header` + `.mobile-drawer`) and footer (`.site-footer`) markup inline rather than importing a shared partial — there is no templating system, so nav/footer changes must be applied to all seven files by hand (or via a global find-and-replace).

## Architecture

- **`css/style.css`** — the entire design system (CSS custom properties for the navy/brass/cream palette, typography, every component's styles). All pages share this one file; there is no per-page CSS.
- **`js/main.js`** — loaded on every page. Handles the sticky header's scroll-triggered solid background, the mobile nav drawer toggle, the footer copyright year, and the generic `.reveal` scroll-in animation (IntersectionObserver).
- **`js/menu-data.js`** + **`js/menu-render.js`** — the menu page is data-driven, not hardcoded HTML. `menu-data.js` exports a single `MENU_DATA` object with two top-level groups, `dinner` and `bar`, each containing an ordered array of `{ id, label, note, items }` categories (`items` are `{ name, desc, price }`). `menu-render.js` reads `MENU_DATA` on `DOMContentLoaded` and renders the pill-tab switcher, per-category tabs, and item lists into `menu.html`'s `#menu-section-switch` / `#menu-tabs-root` / `#menu-root` containers, plus wires up scroll-spy tab highlighting via IntersectionObserver. **To update menu content, edit only `js/menu-data.js`** — never hand-edit menu markup in `menu.html`.
- **`js/reservations.js`** — client-side validation plus a real submit: `submitReservation()` POSTs form-encoded data directly to a Zapier "Catch Hook" webhook (`ZAPIER_RESERVATION_WEBHOOK`), which drives the actual reservation workflow (notifications, etc.) on Zapier's side — there is no backend of this site's own. The fetch uses `mode: "no-cors"` because Zapier's catch-hook endpoint doesn't reliably return CORS headers for browser requests; this makes the response opaque, so a resolved promise only means the request left the browser without a network error, not that Zapier confirmed receipt — check the Zap's run history in the Zapier dashboard to confirm hits are landing. A genuine network failure (offline, DNS, timeout) shows `#reservation-error` with the phone fallback instead of the success panel.
- **`js/gallery.js`** — client-side category filtering and a lightbox for `gallery.html`'s image grid; filter buttons match figures by `data-filter`/`data-category`.
- **`images/`** — currently empty. All imagery across every page is hotlinked to Unsplash placeholder URLs (`https://images.unsplash.com/...`) chosen to loosely match real dish names, not actual GW Fins photography (their site's own photos are copyrighted and not available to scrape). When real photos are supplied, they should be dropped into `images/` and the Unsplash URLs swapped for local paths.

## SEO

Every page has a proper `<!DOCTYPE html><html lang="en"><head>...</head><body>...</body></html>` structure, a canonical tag, Open Graph + Twitter Card tags, a `Restaurant` JSON-LD block (address/phone/hours/priceRange), and a `favicon.svg`. `robots.txt` and `sitemap.xml` exist at the repo root.

**Important:** all of the above uses the placeholder domain `https://gwfins-restaurant.vercel.app` (canonical URLs, OG/Twitter `url` and `image` tags, JSON-LD `url`/`menu`, `robots.txt`'s `Sitemap:` line, and every `<loc>` in `sitemap.xml`). Once the real Vercel URL (or a custom domain) is known, find-and-replace that placeholder string across all `.html` files plus `robots.txt` and `sitemap.xml` — it's the same literal string everywhere, so a single global replace covers it.

The JSON-LD `openingHoursSpecification` (Mon–Thu & Sun 17:00–21:30, Fri–Sat 17:00–22:00) is more granular than the simplified "Dinner Nightly, from 5:00pm" shown in the UI copy — it uses the last web-verified closing times rather than the shortened display text, so confirm exact hours with the restaurant before relying on it.

All content `<img>` tags have `width`/`height` (to prevent layout shift) and `loading="lazy"`; the dynamically-populated lightbox `<img>` in `gallery.html` intentionally has neither, since its `src` is set by JS at click time.

## Content accuracy notes

Restaurant facts (address, phone, hours, menu items/prices) have been sourced directly from the restaurant/user rather than invented, and should be treated as the source of truth going forward — don't regenerate placeholder menu content over real data without checking with the user first. A few fields remain unverified placeholders and are marked as such inline: the general contact email (`info@gwfins.com`) and the private-events room names/capacities on `private-events.html`.

## Unrelated directory: `chatbot/`

`chatbot/build_faq_sheet.py` and `chatbot/GW_Fins_Chatbot_FAQ.xlsx` are **not part of this website** and were not produced by work on the site itself — they were generated by a separate scheduled/background Claude Code session running in this same folder (see `.claude/scheduled_tasks.lock`), building an FAQ knowledge base for a separate n8n chatbot project. Don't assume it's wired into the site or delete it without checking with the user.
