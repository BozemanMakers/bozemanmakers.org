# 04 — Proposed new site: structure, stack, and build plan

## 1. Goals and non-goals

**Goals**

1. Cut recurring cost to approximately the price of the domain.
2. Keep the five existing URLs and the content people rely on (membership, tools, organization, contact).
3. Stop duplicating reference material — the wiki becomes the home for tool details, policies, FAQ, and
   officer duties.
4. Make edits safe and reviewable (repo + pull requests) instead of clicking around a hosted builder.
5. Remove WordPress.com chrome, the stale Hebocon page, and the broken links.
6. Be maintainable by a volunteer who touches it twice a year.

**Non-goals**

- No CMS migration of blog content (there are no posts).
- No change to Memberful, PayPal, MailerLite, Google Calendar, Slack, or email hosting.
- No redesign for its own sake — keep the current look and tone (photo hero, simple type, one accent
  colour), just cleaner.
- No member portal or private area on the site.

## 2. Proposed sitemap and navigation

```text
/                 Home — who we are, where, hours, membership signup, events, donate, newsletter
/tools/           Tools overview — short intro + 8–9 category cards linking to the wiki, tool wishlist
/organization/    501(c)(3), 2026 officers, bylaws (canonical; see decision D2)
/contact/         Contact form + address/hours/email + FAQ/orientation links
/thank-you/       Form-success / donation confirmation
/404              Not found
```

Optional later (only if wanted): `/membership/` (split from home), `/calendar/` (standalone events page),
`/faq/` (redirect to the wiki FAQ instead of hosting a copy).

**Navigation**

- Primary: `Tools` · `Organization` · `Contact`
- Utility/CTA (right side): `Wiki ↗` · **`Become a member`** (→ home membership section or Memberful)
- Footer: address + map, hours, email, `Donate`, `FAQ ↗`, `Policies ↗`, `Parking ↗`, `Facebook`,
  `Photos`, `Wiki ↗`

Rationale: the current menu has no path to joining. "Become a member" should be visible on every page,
and the wiki should be a first-class nav item rather than a link buried in the tools intro.

## 3. Page specs

Each page should be a thin template around shared components (`Header`, `Footer`, `Hero`, `PricingCard`,
`WikiLink`, `HoursBlock`, `ContactForm`).

### `/` Home

1. **Hero** — photo (re-encoded), headline "A community workshop in Bozeman, Montana", sub-line with the
   address and "Open to the public Thursdays 6:30–8 PM", CTAs: `Become a member`, `See the tools`.
2. **What we are** — one paragraph (trimmed from current copy) + link to Wikipedia/makerspace concept.
3. **Visit** — address (rear entrance), map link, hours table (public vs member), "first time? read the
   new-member guide ↗".
4. **Membership** — two pricing cards ($50 Standard / $20 College Age) with the four perks and Memberful
   checkout buttons; "manage my membership" link; 18+ and release-form note with PDF link.
5. **Events** — Google Calendar embed (public) + "subscribe to class announcements" (MailerLite).
6. **Donate** — PayPal button, tax-deductible line, tool wishlist link, correct `/contact/` link.
7. **Questions?** — links to wiki FAQ, guest policy, code of conduct, contact.

### `/tools/`

1. Intro: "The Makerspace has many tools… the wiki has the details, manuals and training requirements."
   Primary CTA to the tools shelf.
2. Category cards **only** (decision D8) — each links to a wiki book: Woodworking, Laser Cutting,
   3D Printing, Electronics, Metalworking, Textiles, Jewelry, Pottery, Painting & Finishing. No per-machine
   list; the wiki owns machine detail.
3. **Tool wishlist** (`#tool-wishlist`) — keep as-is, with the "no completely broken tools" caveat.
4. A note that restricted ("red") tools need training — link the FAQ/wiki.

### `/organization/`

1. 501(c)(3) statement.
2. 2026 officers table + link to the wiki Current Officers page (single update point).
3. Bylaws, Articles 1–6, with clean anchors (`#article-1`, `#section-2-1` …) and a table of contents.
4. Optional "For officers" links to the wiki officer-responsibilities chapter and annual filings.

### `/contact/`

1. Short intro (fixed grammar), response-time expectation.
2. Form: name, email, message + honeypot/Turnstile; success → `/thank-you/`.
3. Contact card: address, hours, `makers@bozemanmakers.com` (mailto), map.
4. Notes: training requests → Slack `#class-requests`; policies/FAQ links; privacy line.

### `/thank-you/`

Same copy as today, plus a secondary CTA back to the home page and a "what happens next" line
(form replies vs. donation receipts).

## 4. Content model (repo layout)

```text
/
├─ docs/                     ← these documents
├─ public/
│  ├─ forms/member-and-guest-release.pdf
│  ├─ images/hero.jpg|avif|webp
│  ├─ favicon.svg, apple-touch-icon.png
│  └─ robots.txt
├─ src/
│  ├─ data/org.ts            ← canonical facts (address, hours, email, prices, plan IDs)
│  ├─ data/wiki.ts           ← every wiki URL in one place
│  ├─ data/nav.ts
│  ├─ components/            ← Header, Footer, Hero, PricingCard, HoursBlock, WikiLink, ContactForm
│  ├─ layouts/Base.astro
│  └─ pages/
│     ├─ index.astro
│     ├─ tools.astro
│     ├─ organization.astro
│     ├─ contact.astro
│     ├─ thank-you.astro
│     └─ 404.astro
├─ functions/api/contact.ts  ← optional Cloudflare Pages Function (form handler)
├─ astro.config.mjs
└─ package.json
```

Bylaws text: either a Markdown file rendered by a component (`src/content/bylaws.md`) or hand-written
Astro markup with explicit `id`s. Markdown + an auto-generated TOC is easier to maintain and review.

## 5. Stack options

| Option | Fit for this site | Cost | Editing by non-technical officers | Notes |
| --- | --- | --- | --- | --- |
| **Astro + Cloudflare Pages** *(recommended)* | Excellent — 6 static pages, components, image optimisation, zero JS by default | $0 hosting | Markdown in Git; optional Pages CMS/Decap | Best balance of maintainability and polish; Cloudflare handles domains, TLS, redirects, analytics, functions |
| Eleventy (11ty) + GitHub Pages | Very good, simpler mental model | $0 | Same | No built-in functions for forms (use Formspree); images need manual optimisation |
| Plain HTML/CSS in repo | Good if the club wants zero tooling | $0 | Requires HTML knowledge | No components → hours/address repeated in 6 files |
| Hugo + Netlify | Good | $0 | Same | Fast builds; Netlify Forms is a handy built-in |
| WordPress on cheap shared hosting | Keeps the editor UX | ~$5–15/mo + maintenance | Yes | Reintroduces plugin updates, security patching, and the reason you're leaving |
| Keep WordPress.com | — | $96–300/yr | Yes | Status quo |

**Recommendation:** **Astro static build → Cloudflare Pages**, repo on GitHub, deploy on push to `main`,
preview deploy per pull request.

**Pricing note (checked 2026-11-15):** Cloudflare Pages does not meter static bandwidth or requests and
allows 500 builds/month, with Pages Functions at 100,000 requests/day on the free plan. Netlify's current
free plan is a **300-credit pool** (≈20 production deploys *or* ≈15 GB bandwidth *or* ≈1.5 M requests, shared
with form submissions), with the first paid tier at $9/mo. At the makerspace's volume both are free, but
Cloudflare has no realistic ceiling and no metered path to a bill. See
[`07-hosting-decision.md`](07-hosting-decision.md) for the numbers, the portability design, and the answer
to "will this change?" — short version: probably eventually, so the build stays host-agnostic.

Why not Next.js/React SPA: nothing here needs a server runtime or hydration; a static build is smaller,
cheaper, and less to break. Why Cloudflare over Vercel/Netlify: free unlimited bandwidth/requests, free
DNS (including apex flattening), free Web Analytics, and `_redirects`/`_headers` support.

### Editing workflow for volunteers

1. **Default:** GitHub web editor → commit to a branch → PR → preview URL → merge → auto-deploy.
2. **If non-technical officers need to edit hours/officers:** add **Pages CMS** (free, GitHub login, no
   server) or Decap CMS, scoped to `src/data/org.ts` and the content files. This keeps the stack static.

## 6. Integrations

| Need | Today | New site |
| --- | --- | --- |
| Membership signup/manage | Memberful links | **Unchanged** — keep plan IDs `75972`, `78970`, portal `/auth/sign_in` |
| Donations | PayPal hosted button | Keep; ensure the button's return URL points at `/thank-you/` |
| Newsletter | MailerLite share link | Keep link; optionally embed the MailerLite form inline |
| Events | Google Calendar iframe | Verify the calendar is **public**; embed an `.ics`-backed widget or a published calendar if not |
| Contact form | Jetpack Forms (WordPress.com) | **Replace** with a **Cloudflare Pages Function** (`functions/api/contact.ts`) that validates input and sends via a transactional mail provider (Resend/Postmark free tier). Honeypot + Turnstile; success → `/thank-you/`; keep a visible `mailto:` fallback. The handler is deliberately one small file so it can be swapped for Formspree/Netlify Functions if the host ever changes |
| Release form | PDF on wp.com uploads | Re-host at `/forms/member-and-guest-release.pdf`, link with file size + "PDF" |
| Analytics | WordPress.com stats | Cloudflare Web Analytics (cookieless) or none |
| Search | WordPress search | Not needed (wiki has its own search) |
| Comments | On Hebocon | Off |
| Feeds | `/feed/` | Provide `/feed.xml`? Not needed with no posts — 301 `/feed/` and `/comments/feed/` to `/` |

Form recipient should be a **group address** (e.g. `makers@bozemanmakers.com` or an officers list), not an
individual — confirm in `06-open-questions.md`.

## 7. Technical requirements

**SEO**

- Keep the five URLs and trailing-slash style; canonical tags on every page.
- Hand-written `<title>` (≤60 chars) and `<meta description>` (≤160 chars) per page.
- JSON-LD: `NGO` (or `Organization`) with `name`, `url`, `email`, `address` (`PostalAddress`),
  `openingHoursSpecification` (Thursdays 18:30–20:00), `sameAs` (Facebook, wiki), and `foundingDate`.
- `sitemap.xml` generated at build; `robots.txt` allows all and points to the sitemap.
- OG/Twitter image (re-encoded hero, 1200×630).
- Preserve inbound link equity: 301 the retired URLs (see `05-url-and-redirect-map.md`).

**Performance budget**

- Total JS ≤ 20 KB (ideally 0); CSS ≤ 25 KB.
- Hero image ≤ 150 KB AVIF/WebP with `srcset`; lazy-load everything below the fold.
- No third-party fonts (system stack) or a single self-hosted subset.
- LCP < 2.0 s on a mid-tier phone/4G.

**Accessibility**

- Semantic landmarks, one `h1` per page, ordered headings.
- Visible focus states; skip link; keyboard-operable nav.
- Alt text for every image; `aria-label` on icon-only links.
- Colour contrast ≥ 4.5:1 — check white text over the hero photo.
- Form labels, error messages tied with `aria-describedby`, and a success message on `/thank-you/`.

**Security & privacy**

- HTTPS only + HSTS (Cloudflare).
- No cookies/trackers → no consent banner needed; add a one-line privacy note near the form.
- Form handler validates input, rate-limits, and never echoes user input into email headers.

## 8. Build plan (phases)

### Phase 0 — Decisions and access (blocking)

- [ ] Resolve decisions D1–D6 in `06-open-questions.md` (bylaws home, Hebocon, DNS control, form recipient,
      calendar visibility, wiki canonical domain).
- [ ] Obtain: WordPress.com admin, registrar login, Cloudflare/GitHub access, Memberful admin (read-only is
      enough), PayPal button settings, MailerLite form, Google Calendar sharing settings.

### Phase 1 — Capture

- [ ] Download all assets: hero photo, release-form PDF, Hebocon assets (if archived), site icon.
- [ ] Re-run the archive capture and diff against `docs/archive/`.
- [ ] Export the bylaws text and officer list into the repo.

### Phase 2 — Scaffold

- [ ] Create Astro project, base layout, header/footer, design tokens (colours from the current theme).
- [ ] Add `src/data/org.ts` and `src/data/wiki.ts`.
- [ ] Set up Cloudflare Pages project + preview deploys.

### Phase 3 — Build pages

- [ ] Home, Tools, Organization (+ bylaws), Contact, Thank-you, 404.
- [ ] Image pipeline (AVIF/WebP + srcset), favicon set, OG image.
- [ ] JSON-LD, sitemap, robots, meta descriptions.

### Phase 4 — Integrations

- [ ] Contact form backend + spam protection; success route to `/thank-you/`.
- [ ] Calendar embed verified publicly.
- [ ] Memberful/MailerLite/PayPal links checked end-to-end (test checkout in test mode if available).
- [ ] Analytics (optional).

### Phase 5 — QA

- [ ] Lighthouse mobile ≥ 95 performance / 100 accessibility / 100 SEO.
- [ ] Keyboard + screen-reader smoke test; 320 px width test.
- [ ] Verify every wiki link resolves (200) and every external link resolves.
- [ ] Check redirects with `curl -I` (list in `05-url-and-redirect-map.md`).
- [ ] Confirm form delivery to the real inbox, including reply-to behaviour.

### Phase 6 — Cutover

- [ ] Lower DNS TTL to 300 s ≥ 24 h before cutover.
- [ ] Recreate MX/SPF/DMARC **before** switching nameservers (email is on Rackspace, not WordPress.com).
- [ ] Point `bozemanmakers.org` + `www` at Cloudflare Pages; verify HTTPS.
- [ ] Submit the new sitemap in Google Search Console; confirm no coverage errors after ~1 week.
- [ ] Update external profiles: Facebook page, Google Business Profile, Google Photos album description,
      wiki FAQ links (if paths changed), any printed materials.

### Phase 7 — Decommission (after 30 days of green)

- [ ] Keep the WordPress.com plan active until redirects/analytics look healthy.
- [ ] Cancel the WordPress.com plan; keep the domain registration (transfer to Cloudflare/registrar of
      choice) and the Rackspace mailboxes.
- [ ] Archive a final WXR export (`Tools → Export`) and the `docs/archive/` copy for the record.

### Phase 8 — Wiki follow-through

- [ ] Complete wiki tasks W1–W12 in `03-wiki-content-map.md` (canonical domain, laser book, metal shop,
      de-duplicate bylaws, permissions, "Start here" page).

## 9. Cost model

| Line item | Current | After migration |
| --- | --- | --- |
| Website hosting | WordPress.com Premium ≈ $96/yr (or Business ≈ $300/yr) | Cloudflare Pages **$0** |
| Domain | Included/renewed via WP.com | ~$12–20/yr (registrar) |
| TLS | Included | Included |
| Contact form | Included in WP.com plan | $0–$10/mo (free tiers likely sufficient) |
| Analytics | Included (WP.com stats) | $0 (Cloudflare Web Analytics) |
| Email hosting | Rackspace (separate) | Unchanged |
| Memberful / PayPal / MailerLite | Existing | Unchanged |
| **Website total** | **≈ $96–300/yr** | **≈ $12–20/yr** |

Full comparison with the alternatives, including Netlify's credit-based free plan, is in
[`07-hosting-decision.md`](07-hosting-decision.md) §6.

## 10. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| DNS move breaks club email | Recreate MX (and add SPF/DMARC) at the new DNS provider first; export the current zone; test mail both directions |
| Expired WordPress.com plan deletes the release-form PDF / images | Copy assets into the repo in Phase 1 |
| Content drifts between site and wiki after launch | One owner per fact (`02-content-inventory.md` §1); wiki pages link to the site for money/legal facts, site links to wiki for operational facts |
| Volunteers can't edit a static site | Documented PR workflow + optional Pages CMS; document in the wiki "Website & IT" book |
| Contact form spam or missed messages | Honeypot + Turnstile, plus a visible `mailto:` fallback; monitor for the first month |
| Someone shares an old `/hebocon/` or anchor URL | 301 map in `05-url-and-redirect-map.md` |
| Calendar embed is private/broken | Verify in Phase 4; fall back to a public `.ics` or a simple "see Slack/Facebook" notice |
| Nobody maintains the wiki | Keep the site's wiki links to **shelf/book** level (stable), not individual deep pages that may be renamed |

## 11. Success criteria

- All five URLs return 200 with the same paths; retired URLs 301 correctly.
- Zero WordPress.com or `wiki.spen.cc` references in the deployed HTML.
- Mobile Lighthouse: performance ≥ 95, accessibility 100, SEO 100.
- Total page weight < 500 KB including images; hero < 150 KB.
- Contact form delivers mail to the officers' address and is not being used for spam.
- The facts table in `02-content-inventory.md` §1 is confirmed correct by an officer.
- WordPress.com plan cancelled; mail, calendar, newsletter, memberships and donations all working.
