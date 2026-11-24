# bozemanmakers.org

Static site for the Bozeman Makerspace, built with Astro 5 and deployed to
Cloudflare Workers. The migration plan and the archived source copy live in
[`docs/`](docs/); start with [`docs/08-mvp-build-plan.md`](docs/08-mvp-build-plan.md).

## Commands

```bash
npm install
npm run dev        # Astro dev server (static pages only)
npm run dev:worker # full Worker + static assets locally (wrangler dev)
npm run build      # static build to dist/
npm run preview    # preview the built static site
npm run deploy     # deploy with wrangler
npm run check      # Astro + Worker TypeScript checks
```

Node 24 is pinned in `.tool-versions` (asdf) and `.nvmrc` (Cloudflare's build image).

## Layout

```text
src/
  assets/hero/             shop photos for the home carousel, optimised at build
  components/              Header, Footer, Button, TicketCard, Note, …
  content/bylaws.md        verbatim bylaws, explicit anchor IDs
  content/microcopy.ts     meta/alt/aria/form strings
  data/org.ts              canonical facts (address, hours, prices, links)
  data/wiki.ts             every wiki URL
  data/nav.ts              nav labels
  layouts/Base.astro       head, JSON-LD, header/footer shell
  pages/                   index, membership, tools, organization, contact, thank-you, 404
  styles/                  design-system tokens + component + site CSS
worker/index.ts            Worker entry: routes /api/*, serves assets
worker/contact.ts          contact handler (POST /api/contact)
wrangler.jsonc             Workers config: static assets + /api/* routing
public/                    _redirects, _headers, .assetsignore, robots.txt, favicon, release PDF
```

## Hero photos

The home page carousel reads every image in `src/assets/hero/`, sorted by filename. To add a
photo, drop it in as `02-something.jpg` (then `03-…`, and so on) and add its alt text to the
`heroPhotoAlt` map in `src/data/heroPhotos.ts`. With one photo the carousel renders as a
plain still image; controls appear at two or more. With two or more it autoplays every 6
seconds and pauses on hover, focus, when scrolled out of view, when the tab is hidden, or
when the visitor asks for reduced motion. There is also a pause/play button. No `px` values —
keep new CSS relative.

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

`worker/contact.ts` sends through [Resend](https://resend.com). Set these
variables in the Worker's **Settings → Variables & Secrets**:

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

Cloudflare Workers Builds, Git integration:

- Worker name: `bozemanmakers-org` (must match `wrangler.jsonc`)
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy` (default)
- Preview command: `npx wrangler preview` (default)
- Root directory: `/`
- Static assets: `dist/`, configured in `wrangler.jsonc`
- Node version: 24 (via `.nvmrc`)

`wrangler.jsonc` serves `dist/` as static assets, runs the Worker first only for `/api/*`, and uses
`dist/404.html` for unknown routes. `public/_redirects` and `public/_headers` are copied into the build and
parsed by Workers static assets; `.assetsignore` keeps them from being served as files. The site stays
host-agnostic: `dist/` also deploys to Netlify or any static host; only the contact handler would need
replacing.

## Redirects and anchors

The five live paths (`/`, `/tools/`, `/organization/`, `/contact/`,
`/thank-you/`) are preserved, and `/membership/` is the new shop-QR signup page. Retired WordPress URLs 301
to `/`. The 19 tool anchors and the 29 bylaws anchors are kept at their original IDs; see
[`docs/05-url-and-redirect-map.md`](docs/05-url-and-redirect-map.md).

## Before launch

- Confirm the facts in `docs/06-open-questions.md` V1–V14 (officers, prices,
  hours, address, tax-deductible wording).
- Fill the `TODO(copy)` items: the tools intro sentence and the contact privacy
  note.
- Verify the calendar while logged out, submit the form to a real inbox, and
  check the redirects in `docs/05-url-and-redirect-map.md` §8.
