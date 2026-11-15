# 08 — MVP build plan (first draft)

**Date:** 2026-11-15 · **Status:** approved plan, not started

Combines the design system (`bozeman-makerspace-design-system/`) with the architecture docs (`04`–`07`)
into a build plan for the first draft of the new site.

**Hard constraint: no AI-generated text on the site.** Visible copy comes only from the current site
(bozemanmakers.org, archived in `archive/`) or the wiki, or is left as a placeholder for a human to write.

---

## 0. Copy rules (decided 2026-11-15)

| Question | Decision |
| --- | --- |
| Allowed sources | The six pages of bozemanmakers.org (`archive/`) **and** wiki.bozemanmakerspace.com, quoted verbatim with a cited source |
| Typos in existing copy | Spelling/grammar/punctuation fixes only, no rewording; every fix logged with the original |
| Design-system `BZM-xxx` part-number labels | **Dropped** for the MVP |
| Scope of the rule | **Visible page copy** (headings, body text, CTAs, nav labels). Functional strings (alt text, aria labels, iframe titles, meta descriptions, form error messages) may be written by the build agent and live in a separate, editable file |
| Unfilled placeholders | Shown as hazard-striped boxes on preview deploys; **production builds fail** until every placeholder is filled |

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

## 2. How the copy rule is enforced

- **Copy slots.** Every heading, paragraph and CTA reads from `src/content/copy/<page>.yaml`. Each slot has:
  - `text` — the copy, or `null` if not yet written
  - `source` — e.g. `archive/home.md:L34`, `wiki:faq#open-build`, or `PLACEHOLDER`
  - `original` — present only when a typo fix changed the text

  A schema check rejects any slot without a `source`.
- **`<Copy slot="home.membership.intro"/>`** renders the text. If `text` is `null`, preview builds show a
  hazard-striped box (reusing the SafetyNote stripe) with the slot name and a short hint. Production builds
  fail and list every unfilled slot.
- **`npm run copy:report`** prints every slot with its source and status (verbatim / typo-fixed /
  placeholder). This is the review checklist and the typo-fix ledger.
- **Functional strings** (alt text, aria labels, iframe titles, meta descriptions, form errors) live in
  `src/content/copy/microcopy.yaml`, outside the copy report.
- **Bylaws** are one Markdown file (`source: archive/organization.md`). Only heading markup is corrected,
  never wording. The duplicated "SECTION 6" heading stays as written.

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
32 anchors at their original IDs.

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
- **Cloudflare Pages** via Git integration. The form handler lives in `/functions`, so no Astro adapter is
  needed and the build stays host-agnostic (see `07-hosting-decision.md` §4)
- `astro:assets` for images (AVIF/WebP + `srcset`), `@astrojs/sitemap`, Fontsource for fonts
- Dark theme from `prefers-color-scheme` via existing tokens; no manual toggle (it would need a label)

```text
src/styles/tokens.css, components.css   ← ported from the design system, Google @import removed
src/components/  Header, MobileMenu, Footer, Shield, Button, PartTag, TicketCard,
                 Note, HoursTable, TierTable, WikiLink, Copy, Placeholder
src/content/copy/*.yaml  + microcopy.yaml + bylaws.md
src/data/org.ts (facts, Memberful plan IDs) · src/data/wiki.ts (all wiki URLs)
src/pages/  index, tools, organization, contact, thank-you, 404
functions/api/contact.ts
public/  _redirects, _headers, robots.txt, forms/member-and-guest-release.pdf
scripts/copy-report.ts
```

---

## 5. Contact form

`POST /api/contact` in a Pages Function: honeypot + Turnstile check, input validation, send to
`makers@bozemanmakers.com` with `reply-to` = submitter, `303` redirect to `/thank-you/` on success. A visible
`mailto:` fallback stays on the page.

**Mail provider: Resend** (free tier 3,000/month, 100/day). Correction to `07-hosting-decision.md`:
MailChannels is believed to have ended free sending for Workers in 2024 — verify before considering it.

Resend needs DNS records to verify the sending domain, and DNS is still at WordPress.com. Either add those
records at WordPress.com DNS now, or keep the preview in Resend test mode (delivers only to the account
owner's address) until cutover. **Decision pending.**

---

## 6. Build order

| # | Milestone | Done when |
| --- | --- | --- |
| M0 | Re-capture bozemanmakers.org and diff against `archive/`; download hero image, release PDF, Hebocon assets; pull wiki FAQ text | Archive current; assets in repo |
| M1 | Scaffold Astro, port tokens/components, layout shell (header, menu, footer, shield), connect Cloudflare Pages | Blank site live at `*.pages.dev` |
| M2 | Copy system: schema, `<Copy>`, placeholder box, strict production check, `copy:report` | A placeholder fails a strict build |
| M3 | All six pages wired to copy files with real sources | Copy report shows only expected placeholders |
| M4 | Contact function + Turnstile | Test submission reaches the test inbox |
| M5 | `_redirects` (per `05`), `_headers`, sitemap, robots, JSON-LD, meta descriptions | `05` §8 verification script passes against preview URL |
| M6 | QA: Lighthouse, keyboard + screen reader, 320px width, logged-out calendar check, link check; hand over placeholder list | §7 holds |

---

## 7. Definition of done (MVP draft)

- Five pages and a 404 live on a `pages.dev` preview URL
- Every visible string has a source in the copy report; unfilled slots are visible placeholders
- Form delivers mail; redirects work; every legacy anchor ID is present
- Lighthouse mobile: performance ≥ 95, accessibility 100, SEO 100; hero < 150 KB; no client JS except
  Turnstile

**Out of scope for the MVP:** DNS/email cutover, cancelling WordPress.com, wiki cleanup (W1–W12),
secondary decisions D9–D14.

---

## 8. Open items

- [ ] **Hero photo:** keep `img_0426-1.jpeg`, or supply a better shop photo?
- [ ] **Tools intro sentence:** keep as-is despite "this list", or placeholder?
- [ ] **Resend before cutover:** add records at WordPress.com DNS now, or test mode until DNS moves?
