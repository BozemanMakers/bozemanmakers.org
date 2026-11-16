# 02 — Content inventory: what moves, what changes, what goes

Verbatim source copy for every page is in [`archive/`](archive/) (captured 2026-11-15). This document
turns that copy into decisions. Line references are to the archive files.

**Decision key**

| Code | Meaning |
| --- | --- |
| **KEEP** | Move the copy roughly as-is (light copy-editing only). |
| **REWRITE** | Keep the idea; fix errors/duplication or restructure. |
| **DELEGATE** | Replace the copy with a short summary + link to the wiki. |
| **RETIRE** | Do not carry it over (redirect or archive). |
| **NEW** | Copy that does not exist today and must be written. |

---

## 1. Canonical facts (single source for the whole site)

These values repeat on several pages today (often inconsistently). Put them in **one data file** in the new
repo (e.g. `src/data/org.ts` or `_data/org.yml`) and render them everywhere — header, footer, contact,
home, structured data.

| Fact | Value | Source / notes |
| --- | --- | --- |
| Organization name | Bozeman Makerspace (BMS) | all pages |
| Tagline | A community workshop in Bozeman Montana | site header |
| Legal status | 501(c)(3) nonprofit organization | `/organization/`, wiki FAQ |
| Founded | 2011 | wiki FAQ (not on the site) |
| Address | 10 Innovation Ln Unit D, Bozeman, MT 59718 — rear entrance of the building | home, footer |
| Map link | Google Maps pin (currently `goo.gl/maps/jH1bcA8uk3vs2Th87`) | recreate as a stable Maps URL |
| Public hours | Thursdays 6:30–8:00 PM (Open Build) | home, footer |
| Member access | 24/7 | home, footer |
| Email | makers@bozemanmakers.com | footer (obfuscated in markup) |
| Membership — Standard | $50/month | home pricing card, Memberful plan `75972` |
| Membership — College Age (18–25) | $20/month | home pricing card, Memberful plan `78970` |
| Included in membership | 24/7 access, all tools, personal storage locker, discounted class fees | home pricing cards, wiki FAQ |
| Eligibility | 18+; signed release form required | home, release PDF |
| Billing | Month-to-month, auto-renews | wiki FAQ |
| Fob replacement | $5 | wiki fee schedule |
| Facebook | facebook.com/bozemanmakerspace | menu |
| Photos | Google Photos shared album | menu |
| Newsletter | MailerLite form (class/workshop announcements) | home |
| Donate | PayPal hosted button `XYC63Z2XATGJQ` | home |
| Wiki | wiki.bozemanmakerspace.com | tools page (currently via the `wiki.spen.cc` alias) |
| Officers (2026) | President Madison Swords; VP Sam Koepnick; Treasurer Spencer Cornish; Secretary Brett Thompson | `/organization/`, wiki Current Officers |

> ⚠️ Verify each fact before launch — see `06-open-questions.md` §2. Prices, hours, officers and the
> fob fee are exactly the things that drift between the site, the wiki, and reality.

---

## 2. Page-by-page

### 2.1 Home — `/` (archive: [`home.md`](archive/home.md))

| Block | Current content | Decision | Destination in new site |
| --- | --- | --- | --- |
| Hero | Full-bleed photo strip (`img_0426-1.jpeg`), site title + tagline | **REWRITE** | Same hero, re-encoded image; overlay tagline and a primary CTA ("Visit us Thursdays 6:30–8 PM") |
| Welcome | Address line + three paragraphs explaining what a makerspace is, linking to Wikipedia | **KEEP** (trim) | Shorten to one tight paragraph; the Wikipedia link can stay |
| Membership intro | Tour at Thursday Open Build; 18+; signed release form; fob sign-out at Open Build | **KEEP** | Membership section; the same block is reused on `/membership/` (shop QR target) |
| Pricing cards | College Age $20/mo and Standard $50/mo with four ✓ features each + Memberful checkout buttons | **KEEP** | Pricing cards, same Memberful URLs |
| Manage membership | Memberful sign-in link + "contact an officer" | **KEEP** (fix link) | Link to `/contact/` (today's copy points at `bozemanmakers.wordpress.com/contact/`) |
| Upcoming Events | Google Calendar iframe + "Subscribe for Class and Workshop Announcements" (MailerLite) | **KEEP** (verify) | Calendar embed + newsletter button; verify the calendar is public (audit defect #10) |
| Donate | PayPal donate button; tax-deductible; checks/cash at events; tool donations + wishlist link | **REWRITE** | Fix wrong contact link; keep PayPal button; link wishlist to `/tools/#tool-wishlist` |
| Footer | Address, email, public/member hours | **KEEP** | Global footer component |

Missing from today's home page (recommended **NEW**):

- A one-line explanation of **Open Build** (the wiki explains it; the site does not).
- A **"First time here? Read the FAQ"** link to the wiki.
- A **privacy note** near the contact form / newsletter ("we use your email only for X").
- Nav items for **Wiki** and a **Visit / Join** anchor.

### 2.2 Tools — `/tools/` (archive: [`tools.md`](archive/tools.md))

| Block | Current content | Decision | Destination |
| --- | --- | --- | --- |
| Intro | "The Makerspace has *many* tools… stop by for a tour"; link to the wiki | **KEEP** (fix link) | Intro paragraph; wiki link must use `wiki.bozemanmakerspace.com` |
| Category TOC | 9 sections, 19 anchors | **REWRITE** | TOC of the *short* category overview (one section per wiki book) |
| Woodworking (3 subsections, ~23 items) | Big tools / powered hand tools / manual hand tools | **DELEGATE** | One category card → wiki Woodworking book (decision D8: cards only, no machine list) |
| Electronics (7 items) | Scope, soldering, meters, wire | **DELEGATE** | Category card → wiki Electronics book |
| Metals (Metalworking + Machining, 10 items) | Welders, grinders, press brake, mills, lathe | **DELEGATE** | Category card → wiki Metalworking book |
| Crafts/Textiles (Sewing, Jewelry, Vinyl, Misc, ~19 items) | Industrial machine, serger, jewelry tools, vinyl cutter, heat press, printmaking | **DELEGATE** | Category cards → wiki Textiles / Jewelry books |
| Other CNC (3D printers, laser cutter) | Bambu P1S + AMS, Prusa, 2× resin, 80 W CO₂ laser | **DELEGATE** | Category cards → wiki 3D Printing / Laser Cutting books |
| Painting & Coating | Spray booth, powder coating, drying racks | **DELEGATE** | Category card → wiki Painting book |
| Pottery | Shimpo wheel, L&L kiln | **DELEGATE** | Category card → wiki Pottery book |
| Tool wishlist | 7 bullets + "email us to donate" | **KEEP** | Keep on the site (it is an appeal, not reference data) — `/tools/#tool-wishlist` |

**Why delegate:** the wiki already has ~45 individual tool pages with model numbers, purchase dates,
status, manuals, product links, training/restriction notes, and a consistent page template. The site's flat
list is already out of sync (audit defects #4, #6, #7) and cannot show restrictions. Under decision D8 the
site keeps **category cards only** — no per-machine list — so the page cannot drift again. See
`03-wiki-content-map.md` for the exact per-category links and coverage gaps.

### 2.3 Organization — `/organization/` (archive: [`organization.md`](archive/organization.md))

| Block | Current content | Decision | Destination |
| --- | --- | --- | --- |
| 501(c)(3) statement | One sentence | **KEEP** | `/organization/` intro |
| 2026 Officers table | 4 rows | **KEEP + link** | Keep the 4-row table (small, high-value) and link to wiki Current Officers |
| Bylaws (Articles 1–6, 29 anchors) | ~2,200 words, full legal text | **KEEP** (canonical here) | `/organization/` with clean, stable anchors; the wiki keeps a mirror with a sync banner (decision D2) |

**Why the site is the canonical copy (the wiki mirrors it):**

1. Existing shared links use the site's own anchors (`/organization/#article-2-membership`, etc.).
2. The wiki's heading anchors are BookStack-generated, truncated to ~20 characters and
   percent-encoded (`#bkmrk-article-1-%E2%80%94-name-and`), so they are neither readable nor stable.
3. A legal document benefits from version control in the same repo as the site, and from not being freely
   editable by anyone with wiki edit rights (the wiki's rules book has explicit permissions; the
   Organization book should too).
4. The drafters' text contains artifacts (stray `####`, `SECTION 6 -- Rights and Responsibilities` used
   twice, an empty heading) — it needs one careful editorial pass and then a stable canonical copy.

**Mirror rule (decided 2026-11-15):** the wiki keeps its own copy because bylaws rarely change and members
shouldn't have to leave the wiki to read them. The wiki page carries a banner pointing at the canonical
site copy with a "last synced" date, and both are updated in the same commit whenever an amendment passes.
The same applies to the officers table (wiki = day-to-day update point, site = rendered copy).


### 2.4 Contact — `/contact/` (archive: [`contact.md`](archive/contact.md))

| Block | Current content | Decision | Destination |
| --- | --- | --- | --- |
| Intro | "Send a questions or comments…" (typo) | **REWRITE** | "Questions, membership help, class ideas, tool donations — send us a note." |
| Form | Jetpack/Grunion form: Name*, Email*, Message, Submit + confirmation text | **REPLACE** | Same three fields on a new form backend (see `04-new-site-plan.md` §6) |
| Address/hours/email | Footer block | **KEEP** | Also show a compact contact card beside the form |
| Missing | — | **NEW** | Direct `mailto:` fallback, expected response time, "for training requests use Slack `#class-requests`", FAQ link |

### 2.5 Thank You — `/thank-you/` (archive: [`thank-you.md`](archive/thank-you.md))

| Block | Current content | Decision | Destination |
| --- | --- | --- | --- |
| Message | "Thank you for supporting the Bozeman Makerspace… Happy Making!" + "Go back to homepage" | **KEEP** | Form success target for `/contact/`; also usable as a PayPal return page |

Determine what currently sends people here (form submission and/or the PayPal button's return URL) and
keep that behaviour — see `06-open-questions.md` §3.

### 2.6 Hebocon ’21 — `/hebocon/` (archive: [`hebocon.md`](archive/hebocon.md))

| Block | Current content | Decision |
| --- | --- | --- |
| Event announcement | 2021 date/time, schedule, food, old address (5350 Love Ln) | **RETIRE** |
| Explainer | What Hebocon is | **ARCHIVE** (optional) |
| Rules PDF, poster PNG, event photos, YouTube embed | assets + media | **ARCHIVE** |

This is a dead event page advertising a 2021 date and the club's previous address.

**Decided 2026-11-15:** drop it — `301 /hebocon/ → /`. The page, poster, photos, and rules PDF are
archived in the repo (`docs/archive/`) in case the event is run again, at which point it gets rewritten for
the real date and venue.

Either way, download `hebo21.png`, `hebocon-rules-2.pdf`, `party-compressor.gif`, `garage-1.jpeg`,
`654722c2fb438a79de86c3db853957b5.jpg` **before** the WordPress.com plan is closed if there is any chance
the assets will be reused.

---

## 3. Copy that must move verbatim (or near-verbatim)

- The **membership perk lists** ("24/7 Access / Use of all Makerspace tools / Personal storage locker /
  Discounted class fees") — they match Memberful's plan descriptions.
- The **price points** ($50 Standard, $20 College Age) and the 18+ / release-form requirement.
- The **address with "(Rear entrance of building)"** — people genuinely get lost.
- The **hours line**: "Open To The Public: Thurs 6:30 - 8:00 PM · Members: 24/7".
- The **release form PDF** (re-hosted, not re-typed).
- The **tool wishlist** and the "we accept new or used tools, but not completely broken ones" guidance.
- The **full bylaws text** (with a single editorial cleanup pass — see `06-open-questions.md` §2.4).
- "Happy Making!" on the thank-you page.

## 4. Content deliberately left behind

| Item | Reason |
| --- | --- |
| WordPress.com footer badge, login/subscribe/report links, `wp.me` shortlinks | Platform chrome |
| Hebocon ’21 page and its media | Stale (2021 date, old address) |
| Flat 70-item tool list | Superseded by the wiki; drifts |
| Duplicated officers/bylaws copy **in the wiki** | One canonical copy (site, recommended) |
| Auto-generated meta descriptions | Replaced by hand-written ones |
| Comment form | Not used |

## 5. New copy to write (checklist)

- [ ] Nav labels + "Become a member" CTA
- [ ] Home hero headline/subhead + CTA
- [ ] One-paragraph "What is a makerspace / what is Open Build"
- [ ] Tools page intro + per-category one-liner (8 categories)
- [ ] Contact intro, response-time note, form privacy note, Slack training note
- [ ] Donate copy (fixed links, tax-deductible statement verified by the treasurer)
- [ ] 404 page copy
- [ ] Meta title + description for each of the 5 pages (~150–160 chars)
- [ ] Alt text for every image carried over (today all content images have `alt=""`)

## 6. Accessibility notes on current content

- All content images carry empty `alt` text (PayPal button is the exception) — fill these in.
- Headings jump levels in the bylaws (h3 → h4 with missing sections) — normalise during the editorial pass.
- The home page uses a photo-text overlay; check contrast of hero text against the photo.
- Links like "Read the official rules" and "wiki" are fine, but the PDF link text should say "PDF" and the
  file size.
