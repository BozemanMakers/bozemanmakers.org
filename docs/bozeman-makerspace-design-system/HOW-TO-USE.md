# Bozeman Makerspace design system: how to use these files

Start with **README.md**. It's the brand book: principles, voice, colour, type, logo rules.

| File | What it is |
|---|---|
| `README.md` | Brand book and usage rules. Read first. |
| `tokens.json` | Source of truth for every colour (light + dark), type style, spacing step, radius, shadow and border width. |
| `tokens.css` | The same tokens as CSS custom properties (`--paper`, `--enamel-deep`, `--space-3`, ...), light/dark themes (`data-theme="dark"` or OS dark mode), type-style classes (`.display-xl`, `.body`, `.label`, ...) and the Google Fonts import. |
| `components/bundle.css` | Component styles, all `bzm-`-prefixed and built only from token variables: `bzm-btn`, `bzm-tag`, `bzm-card`, `bzm-note`, `bzm-gridpaper`, `bzm-label`. |
| `components/<Name>/README.md` | Guidelines for each component: when to use it, variants, what markup to provide. |
| `components/<Name>/preview.html` | Example markup for each component. |
| `components/Homepage/preview.html` | Desktop homepage mock-up (1200px). |
| `components/HomepagePhone/preview.html` | Phone homepage mock-up (390px). |
| `components/Cover/preview.html` | Cover art for the system. |
| `assets/Logos/` | Shield badge SVGs: `shield-ink` (default, on light), `shield-paper` (on dark), `shield-enamel` (posters), `shield-original` (as supplied). |

To use the system on a page, load `tokens.css`, then `components/bundle.css`, then write HTML with the `bzm-` classes. The preview files are HTML fragments that expect those two stylesheets to be loaded first.

Mock-up copy (classes, prices, hours, tool lists) is placeholder. Address and email are left blank.
