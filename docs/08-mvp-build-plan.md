# 08 — MVP build plan (first draft)

**Date:** 2026-11-15 · **Status:** approved plan, implementation in progress
**Revised 2026-11-15:** the automated copy-slot schema and `copy:report` were dropped. Copy is transcribed
inline and checked by a person before launch.

Combines the design system (`bozeman-makerspace-design-system/`) with the architecture docs (`04`–`07`)
into a build plan for the first draft of the new site.

**Hard constraint: no AI-generated text on the site.** Visible copy comes only from the current site
(bozemanmakers.org, archived in `archive/`) or the wiki, or is left as a placeholder for a human to write.

---

## 0. Copy rules (decided 2026-11-15)

| Question | Decision |
| --- | --- |
| Allowed sources | The six pages of bozemanmakers.org (`archive/`) **and** wiki.bozemanmakerspace.com, quoted verbatim with a cited source |
| Typos in existing copy | Spelling/grammar/punctuation fixes only, no rewording; every fix logged in the PR description with the original |
| Design-system `BZM-xxx` part-number labels | **Dropped** for the MVP |
| Scope of the rule | **Visible page copy** (headings, body text, CTAs, nav labels). Functional strings (alt text, aria labels, iframe titles, meta descriptions, form error messages) may be written by the build agent and live in `src/content/microcopy.ts` |
| Unfilled placeholders | Marked with a visible `TODO` box on preview deploys and listed in the PR; fixed before launch |
| Enforcement | A human read-through against `docs/archive/` and the wiki before launch. **No schema, no report script, no failing builds.** |

**Superseded:** the "new copy to write" checklist in `02-content-inventory.md` §5 and the suggested
wording in `02`/`04` (e.g. the proposed contact intro and hero CTA text) are **not** to be used. Those slots
use existing copy or become placeholders.

---

## 1. Where the design system and the architecture disagree

The design system sets the look. The architecture docs set structure, URLs and hosting.

| Topic | Design-system mock-up | Architecture plan | MVP uses |
| --- | --- | --- | --- |
| Nav | Classes · The shop · Membership · Visit + "Book a tour" | Tools · Organization · Contact | **Architecture** (keeps the 5 URLs). Labels from today's menu: `Tools`, `Organization`, `Contact`, `Facebook`, `Photos`, plus `wiki` (from the tools page) |
| Classes section / class cards | Three invented classes | No classes exist | **Drop.** The Google Calendar embed under "Upcoming Events" replaces it |
| Membership | Day pass, $60 member, student tier | $20 College Age / $50 Standard | **Real tiers**, styled like the design system's parts-list table |
| "Open shop tonight" strip | Invented Tuesday hours | Thu 6:30–8:00 PM | Same dark strip, filled with the existing footer hours line |
| `BZM-xxx` labels | Everywhere | — | **Dropped** |
| Fonts | Google Fonts `@import` | No third-party font requests | **Self-hosted** via Fontsource; same three typefaces |
| Logo | Two SVG files swapped for light/dark | — | Inline SVG coloured with `currentColor`; one file covers both themes; paths not redrawn |
| Hero, safety notes, footer tagline | Invented copy | — | **None ships.** Real copy (§3) or placeholders |

---

## 2. How the copy rule is applied

No schema, no copy report, no build-time checks. The site is seven pages; a person reads it before launch.

- **Copy lives inline** in the Astro components. Each block gets a one-line comment naming its source, e.g.
  `<!-- source: archive/home.md:L16 -->` or `<!-- source: wiki:faq -->`.
- **Typos** are fixed in place. If a fix changes wording, note the original in the PR description so the
  reviewer can see what moved.
- **Unwritten copy** is marked with a `TODO` comment and a visible placeholder box on the preview deploy,
  then filled before launch. Nothing fails the build.
- **Functional strings** (alt text, aria labels, iframe titles, meta descriptions, form errors) live in
  `src/content/microcopy.ts` so they are easy to review in one place. They are not "copy" in the
  no-AI-text sense, but keep factual claims about the space out of them.
- **Bylaws** are one Markdown file (`source: archive/organization.md`). Only heading markup is corrected,
  never wording. The duplicated "SECTION 6" heading stays as written.
- **Review** is a read-through: open each page against `docs/archive/` and the wiki, check the diff, and
  look for anything that reads as newly written rather than transcribed.

---

## 3. Pages and copy sources

### Home `/`

- **Header:** shield hanging over the header rule (152px desktop, 100px phone). Phone nav is a no-JS
  `Menu` toggle (`<details>`); "Menu" is an existing string.
- **Hero** (dot-grid background):
  - H1: `Welcome` (today's H1)
  - Sub-line: tagline `A community workshop in Bozeman Montana`
  - Address with `(Rear entrance of building)`
  - Photo: existing `img_0426-1.jpeg`, re-encoded
  - One primary button, `Sign Up` (existing heading), linking to `#membership`
- **Hours strip:** `Open To The Public: Thurs 6:30 - 8:00 PM · Members: 24/7` (verbatim)
- **What we are:** the three existing welcome paragraphs, verbatim
- **Visit:** hours table using existing footer labels; wiki FAQ's Open Build answer as an info note
- **Membership:**
  - Existing intro paragraphs
  - 18+ release-form sentence + "Kids are welcome with their parents" as a caution note
  - Tier rows: `College Age (Ages 18-25)` / `$20 / month` and `Standard` / `$50 / month`, each with the
    four existing ✓ perks
  - Buttons `Purchase College Age Membership`, `Purchase Standard Membership` (Memberful plans `78970`,
    `75972`)
  - `Manage My Membership` and "Having trouble? Contact an officer"
- **Upcoming Events:** calendar iframe + `Subscribe for Class and Workshop Announcements` (MailerLite)
- **Donate:** existing copy verbatim; contact link fixed to `/contact/`, wishlist link fixed to
  `/tools/#tool-wishlist`; PayPal image becomes a `Donate` button ("Donate" is the old image's alt text)

### Membership `/membership/`

- Same copy as the home membership block, extracted into `MembershipPanel` so it is not duplicated.
- Page H1 `Membership`, then `Sign Up` as H2: intro paragraphs, release-form note, tier table, manage links.
- This is the shop-signage/QR target. The home section stays; the hero `Sign Up` button links here.

### Tools `/tools/`

- **Intro:** existing copy, plus "Want the specifics on a tool? Check out our new wiki…" (capital "Check"
  logged as a typo fix; link changed to `wiki.bozemanmakerspace.com`)
- ⚠️ The intro sentence "we do our best to keep this list up to date" no longer fits once the list is gone.
  **This sentence is a placeholder** unless approved as-is.
- **Nine category cards** (ticket style). Title = wiki book name; the whole card links to the book, so no
  blurbs are needed. Textiles may carry the wiki's own description ("Sewing, printing, cutting, beadwork,
  leatherwork"). Colour groups: brass = wood; gauge = electronics, laser, 3D; ink = metal; plain otherwise.
- **Restricted tools:** caution note quoting the wiki FAQ's "red tools" answer
- **Tool Wishlist:** verbatim, keeps `#tool-wishlist`
- The 19 legacy anchors are kept as zero-height spans per `05-url-and-redirect-map.md` §3

### Organization `/organization/`

501(c)(3) line, `2026 Officers` table, link to the wiki page "Current Officers", and the bylaws with all
29 legacy anchors at their original IDs.

### Contact `/contact/`

- Intro: "Send questions or comments…" (logged typo fix from "Send a questions")
- Form: `Name`, `Email`, `Message`, `(required)`, `Submit`
- Contact card: footer strings `Location` and `E-mail makers@bozemanmakers.com`
- Training note from the wiki: "Post a request in the #class-requests channel on Slack."
- Link to the wiki "Frequently Asked Questions"

### Thank You `/thank-you/`

Verbatim, including "Happy Making!" and "Go back to homepage".

### 404

Title `Page not found` (existing string), followed by the nav links. No prose.

### Footer (dark)

Shield in the paper colour, existing location/e-mail/hours block, links to Facebook, Photos, wiki.

**Expected human-written placeholders: about 1–3.** The tools intro sentence is the only definite one.

---

## 4. Stack and repo layout

- **Astro 5**, static output, TypeScript, no UI framework, zero client JS (except optional Turnstile on
  `/contact/`)
- **Cloudflare Workers** via Git integration (Workers Builds). A small Worker (`worker/index.ts`) handles
  `/api/*`; static assets come from `dist/` via `wrangler.jsonc`. No Astro adapter is needed and the build
  stays host-agnostic (see `07-hosting-decision.md` §4)
- `astro:assets` for images (AVIF/WebP + `srcset`), `@astrojs/sitemap`, Fontsource for fonts
- Light theme by default (`data-theme="light"` on `<html>`); the dark palette stays in
  `tokens.css` for a future opt-in. No toggle.

```text
src/styles/tokens.css, components.css   ← ported from the design system, Google @import removed
src/components/  Header, MobileMenu, Footer, Shield, Button, PartTag, TicketCard,
                 Note, HoursTable, TierTable, WikiLink
src/content/bylaws.md · src/content/microcopy.ts
src/data/org.ts (facts, Memberful plan IDs) · src/data/wiki.ts (all wiki URLs)
src/pages/  index, membership, tools, organization, contact, thank-you, 404
worker/index.ts          ← Worker entry: /api/* + asset fallback
worker/contact.ts        ← contact form handler
wrangler.jsonc           ← static assets + run_worker_first
public/  _redirects, _headers, .assetsignore, robots.txt, forms/member-and-guest-release.pdf
```

---

## 5. Contact form

`POST /api/contact` in a Worker: honeypot + rate limit, input validation, send to
`makers@bozemanmakers.com` with `reply-to` = submitter, `303` redirect to `/thank-you/` on success. A visible
`mailto:` fallback stays on the page. **Turnstile is optional** — add it only if spam gets through the
honeypot; it is the one third-party script on the site.

**Mail provider: Resend** (free tier 3,000/month, 100/day). Correction to `07-hosting-decision.md`:
MailChannels is believed to have ended free sending for Workers in 2024 — verify before considering it.

Resend needs DNS records to verify the sending domain, and DNS is still at WordPress.com. Either add those
records at WordPress.com DNS now, or keep the preview in Resend test mode (delivers only to the account
owner's address) until cutover. **Decision pending.**

---

## 6. Build order

| # | Milestone | Done when |
| --- | --- | --- |
| M0 | Capture assets: hero image, release PDF, wiki FAQ text; archive the original hero. Re-capture/diff skipped 2026-11-16 (live site unchanged). | Assets in repo |
| M1 | Scaffold Astro, port tokens/components, layout shell (header, menu, footer, shield), connect Cloudflare Workers | Blank site live at `*.workers.dev` |
| M2 | Page templates: seven pages built with the shared components and layout, copy stubbed | Every page renders on `workers.dev`; structure and components are final |
| M3 | Copy pass: every visible string transcribed from `archive/` or the wiki with a `source:` comment; typo fixes logged in the PR | A person has read each page against the source; no `TODO`s left |
| M4 | Contact Worker (+ Turnstile only if needed) | Test submission reaches the test inbox |
| M5 | `_redirects` (per `05`), `_headers`, sitemap, robots, JSON-LD, meta descriptions | `05` §8 verification script passes against preview URL |
| M6 | QA: Lighthouse, keyboard + screen reader, 320px width, logged-out calendar check, link check; confirm no `TODO` copy remains | §7 holds |

---

## 7. Definition of done (MVP draft)

- Six pages and a 404 live on a `workers.dev` preview URL
- Every visible string was transcribed from `archive/` or the wiki and checked by a person; typo fixes are
  logged in the PR
- Form delivers mail; redirects work; every legacy anchor ID is present
- Lighthouse mobile: performance ≥ 95, accessibility 100, SEO 100; hero < 150 KB; no first-party client JS
  (Turnstile only if enabled)

**Out of scope for the MVP:** DNS/email cutover, cancelling WordPress.com, wiki cleanup (W1–W12),
secondary decisions D9–D14.

---

## 8. Open items

- [ ] **Hero photo:** keep `img_0426-1.jpeg`, or supply a better shop photo?
- [ ] **Tools intro sentence:** keep as-is despite "this list", or placeholder?
- [ ] **Resend before cutover:** add records at WordPress.com DNS now, or test mode until DNS moves?
