# bozemanmakers.org

Static site for the Bozeman Makerspace, built with Astro 5 and deployed to
Cloudflare Pages. The migration plan and the archived source copy live in
[`docs/`](docs/); start with [`docs/08-mvp-build-plan.md`](docs/08-mvp-build-plan.md).

## Commands

```bash
npm install
npm run dev       # local dev server
npm run build     # static build to dist/
npm run preview   # preview the built site
npm run check     # Astro + TypeScript checks
```

Node 24 is pinned in `.tool-versions` (asdf).

## Layout

```text
src/
  assets/hero.jpg          shop photo, optimised at build
  components/              Header, Footer, Button, TicketCard, Note, …
  content/bylaws.md        verbatim bylaws, explicit anchor IDs
  content/microcopy.ts     meta/alt/aria/form strings
  data/org.ts              canonical facts (address, hours, prices, links)
  data/wiki.ts             every wiki URL
  data/nav.ts              nav labels
  layouts/Base.astro       head, JSON-LD, header/footer shell
  pages/                   index, membership, tools, organization, contact, thank-you, 404
  styles/                  design-system tokens + component + site CSS
functions/api/contact.ts   Cloudflare Pages Function (POST /api/contact)
public/                    _redirects, _headers, robots.txt, favicon, release PDF
```

## Theme

The site is light-themed: `<html data-theme="light">` in `src/layouts/Base.astro` stops the
`prefers-color-scheme` rule in `tokens.css` from applying. The dark palette is still in
`src/styles/tokens.css`; change the attribute to `data-theme="dark"` to use it.

## Copy rule

Visible copy is transcribed from the archived site (`docs/archive/`) or the wiki,
with a `<!-- source: … -->` comment at each block. Do not add marketing copy.
Unwritten strings are marked `TODO(copy)` and fixed before launch. Typos are
fixed in place and the original is noted in the PR. See
[`docs/08-mvp-build-plan.md`](docs/08-mvp-build-plan.md) §0–2.

Functional strings (titles, meta descriptions, alt text, aria labels, form
labels) live in `src/content/microcopy.ts`.

## Contact form

`functions/api/contact.ts` sends through [Resend](https://resend.com). Set these
variables in the Cloudflare Pages project:

| Variable | Example | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | `re_…` | Required |
| `CONTACT_TO` | `makers@bozemanmakers.com` | Shared officers' mailbox |
| `CONTACT_FROM` | `Bozeman Makerspace <website@bozemanmakers.org>` | Must be a verified Resend domain |
| `TURNSTILE_SECRET_KEY` | `0x…` | Optional; only set it after adding the widget |

Without `RESEND_API_KEY` the endpoint returns 503 and the page's `mailto:` link
is the fallback. Turnstile is off by default; the honeypot and a best-effort
per-IP limit are always on.

## Deploy

Cloudflare Pages, Git integration:

- Build command: `npm run build`
- Output directory: `dist`
- Functions directory: `functions` (default)
- Node version: 24

`public/_redirects` and `public/_headers` are copied into the build. The site is
host-agnostic: `dist/` also deploys to Netlify or any static host; only the form
handler would need replacing.

## Redirects and anchors

The five live paths (`/`, `/tools/`, `/organization/`, `/contact/`,
`/thank-you/`) are preserved. Retired WordPress URLs 301 to `/`. The 19 tool
anchors and the 29 bylaws anchors are kept at their original IDs; see
[`docs/05-url-and-redirect-map.md`](docs/05-url-and-redirect-map.md).

## Before launch

- Confirm the facts in `docs/06-open-questions.md` V1–V14 (officers, prices,
  hours, address, tax-deductible wording).
- Re-capture the live site and diff against `docs/archive/` (M0).
- Fill the `TODO(copy)` items: the tools intro sentence and the contact privacy
  note.
- Verify the calendar while logged out, submit the form to a real inbox, and
  check the redirects in `docs/05-url-and-redirect-map.md` §8.
