# 01 — Current site audit

Everything below was observed directly on 2026-11-15 unless marked otherwise.

## 1. At a glance

| Item | Value |
| --- | --- |
| Canonical URL | `https://bozemanmakers.org/` |
| Host | **WordPress.com** (managed), served through the Automattic CDN |
| Platform markers | `host-header: WordPress.com`, `server: nginx`, `x-ac: 1.sea _bur HIT`, `link: <https://public-api.wordpress.com/wp-json/?rest_route=/sites/bozemanmakers.wordpress.com>` |
| WordPress.com site ID | `157042820` (internal name `bozemanmakers.wordpress.com`) |
| Theme | **Radcliffe 2** (`wp-content/themes/pub/radcliffe-2`), primary font Lato |
| Pages published | **6** (no posts — the public API reports `found: 0` posts) |
| Contact form | **Jetpack / Grunion** contact form (WordPress.com-only feature) |
| DNS | `ns1/ns2/ns3.wordpress.com` |
| Apex A records | `192.0.78.24`, `192.0.78.25` (WordPress.com) |
| Mail (MX) | `mx1.emailsrvr.com`, `mx2.emailsrvr.com` (**Rackspace Email** — independent of the website) |
| SPF / DMARC | **No SPF TXT record at the apex and no `_dmarc` record observed** (see defect #11) |
| Analytics | WordPress.com built-in stats (`stats.wp.com/w.js`); no Google Analytics found |
| TTFB (3 samples) | 0.088 s / 0.092 s / 0.084 s |
| Home page transfer | ~174 KB across ~10 requests (HTML 107 KB) |
| Hero image | `2023/03/img_0426-1.jpeg` — 2000×1500 JPEG, **769 KB**, no WebP/AVIF variant |

## 2. Hosting and platform

- The site is on a **paid WordPress.com plan** (custom domain + contact form + no ads). The exact plan
  could not be read publicly; confirm in the WordPress.com account (see `06-open-questions.md`).
- WordPress.com injects its own footer badge ("Create a website or blog at WordPress.com"), login links,
  "Report this content", "Copy shortlink" (`wp.me/PaCW0I-*`) and subscription prompts on every page.
- Page HTML is served pre-rendered with a pre-built, content-hashed CSS bundle
  (`/_static/??-eJx9jEE…`) and minimal JS. That is why TTFB and payload are good — **there is no obvious
  performance reason to migrate**.
- Images are rewritten to the WordPress.com image CDN (`i0.wp.com/bozemanmakers.org/wp-content/uploads/…`).
  Original uploads live under `bozemanmakers.org/wp-content/uploads/<year>/<month>/…`.
- Comments are enabled on the Hebocon page (a comments UI loads there).
- Response headers include `strict-transport-security: max-age=31536000`; `http://` → `https://` and
  `www.` → apex both 301-redirect correctly.

## 3. Domain, DNS and email

| Record | Observed |
| --- | --- |
| NS | `ns1.wordpress.com`, `ns2.wordpress.com`, `ns3.wordpress.com` |
| A (apex) | `192.0.78.24`, `192.0.78.25` |
| MX | `10 mx1.emailsrvr.com`, `10 mx2.emailsrvr.com` |
| TXT (apex) | *none returned* |
| TXT `_dmarc` | *none returned* |
| wiki A record | `wiki.bozemanmakerspace.com` → `107.174.205.131` (a VPS IP, not WordPress.com infrastructure) |

**Implications for the move**

- DNS is delegated to WordPress.com, so **moving DNS is part of the migration**: the new host needs either
  the nameservers changed to a DNS provider you control (recommended: Cloudflare) or a registrar-level
  change. The MX records must be recreated **before** nameservers change, or club email stops working.
- Because `makers@bozemanmakers.com` is Rackspace-hosted, the website move does not affect email — as long
  as MX (and any SPF/DKIM/DMARC you add) is preserved.
- The site lives on `bozemanmakers.org`, the wiki on `bozemanmakerspace.com`, and email on
  `bozemanmakers.com`. This three-domain split is a branding/consistency issue worth a decision.

## 4. Complete URL inventory

Confirmed from `sitemap.xml`, `robots.txt`, internal link extraction, and the WordPress.com REST API.

### 4.1 Indexed pages (the sitemap's complete list)

| URL | Page title | Last modified | Rendered size | Purpose |
| --- | --- | --- | --- | --- |
| `/` | Bozeman Makerspace – A community workshop in Bozeman Montana | 2026-07-16 | 107 KB | Welcome, address/hours, membership pricing, events calendar, donate, newsletter |
| `/tools/` | Tools | 2026-07-16 | 101 KB | Category TOC + ~70-line tool list + tool wishlist |
| `/organization/` | Organization | 2026-01-30 | 115 KB | 501(c)(3) statement, 2026 officers, full bylaws with 30 anchors |
| `/contact/` | Contact | 2019-01-27 | 105 KB | Jetpack contact form (name/e-mail/message) |
| `/thank-you/` | Thank You | 2022-04-02 | 87 KB | Post-submission / post-donation confirmation |
| `/hebocon/` | Hebocon ’21: The Ultimate Crappy Robot Battle | 2021-10-12 | 127 KB | **Stale** 2021 event page (old address, YouTube embed, image gallery, rules PDF) |

### 4.2 Non-page URLs that exist today

| URL | Behaviour | Notes |
| --- | --- | --- |
| `/tools`, `/organization`, `/contact`, `/hebocon`, `/thank-you` | 301 → trailing-slash version | Trailing slashes are canonical |
| `/home`, `/index.php` | 301 → `/` | WordPress.com defaults |
| `/feed/` | 200 `application/rss+xml` | Site feed (empty of posts) |
| `/comments/feed/` | 200 RSS | Comment feed |
| `/author/robl015/` | 200 | Author archive (single legacy author) |
| `/sitemap.xml` | 200 | 6 URLs, `changefreq: weekly` |
| `/news-sitemap.xml` | 200, empty `<urlset>` | Referenced from robots.txt |
| `/robots.txt` | 200 | WP-specific disallows (`/wp-admin/`, `/wp-login.php`, …) — obsolete after the move |
| `/osd.xml` | 200 | OpenSearch description |
| `/wp-json`, `/wp-admin`, `/wp-login.php` | 404 / restricted | No public API surface beyond WordPress.com's |
| Anything else (e.g. `/join/`, `/about/`, `/membership/`, `/calendar/`) | **404** | "Page not found – Bozeman Makerspace" template |

### 4.3 Assets referenced by the site

| Asset | Used on | Size | Notes |
| --- | --- | --- | --- |
| `uploads/2023/03/img_0426-1.jpeg` | home hero | 769 KB | 2000×1500 JPEG; also the `og:image` |
| `uploads/2019/01/bms-member-and-guest-release-form.pdf` | home (Membership) | 78 KB | "BOZEMAN MAKERSPACE // RELEASE FORM" — guest waiver/release, signature + initials, 18+ affirmation |
| `uploads/2019/09/hebocon-rules-2.pdf` | hebocon | — | Event rules |
| `uploads/2021/09/hebo21.png` | hebocon | 722 KB | 573×742 poster PNG |
| `uploads/2019/10/party-compressor.gif`, `garage-1.jpeg`, `654722c2…jpg` | hebocon | 13 KB–? | Event photos |
| Site icon / webclip | all pages | — | Served from `s0.wp.com` (WordPress.com default favicon) |

> **Risk:** every one of these files is hosted by WordPress.com. If the plan lapses, images, the release
> form PDF, and the Hebocon rules PDF all 404. Copy them into the new repo early.

## 5. Third-party services and dependencies

| Service | What it does on the site | Where it lives | Keep after migration? |
| --- | --- | --- | --- |
| **Memberful** | Membership signup + billing | `bozemanmakerspace.memberful.com` — checkout plans `75972` (Standard) and `78970` (College Age); sign-in `/auth/sign_in` | **Keep unchanged** |
| **PayPal** | Donations | Hosted button `hosted_button_id=XYC63Z2XATGJQ` | **Keep** (update to a modern donate URL if desired) |
| **MailerLite** | Newsletter / class announcements | `dashboard.mailerlite.com/forms/12955/51324291966306002/share` | **Keep** (could embed inline) |
| **Google Calendar** | "Upcoming Events" iframe on the home page | `calendar.google.com/calendar/embed?…src=…group.calendar.google.com` | **Keep, but verify public access** (see defect #11) |
| **Google Photos** | Photo album link in the menu | `photos.app.goo.gl/3PTaiqCZgb3B3T6q1` | **Keep** |
| **Facebook** | Page link in the menu | `facebook.com/bozemanmakerspace` | **Keep** |
| **YouTube** | Hebocon video embed | `youtube.com/embed/46ivFpsmEVQ` | Only if Hebocon is kept |
| **Jetpack Forms** (WordPress.com) | Contact form submission → email | WordPress.com | **Must be replaced** |
| **BookStack wiki** | Tool details, policies, FAQ, officers | `wiki.bozemanmakerspace.com` (+ alias `wiki.spen.cc`) | **Keep and link more prominently** |
| **Slack** | Trainings (`#class-requests`), tool issues, 3D printing | Referenced in the wiki, not linked from the site | Consider a public "Join Slack" CTA (see `06-open-questions.md`) |

## 6. Performance baseline

Measured from this environment (not a lab benchmark):

- TTFB ≈ 0.085–0.092 s; full HTML ~0.15 s.
- Home page: **~174 KB total, ~10 requests** including CSS/JS/fonts, excluding the hero image.
- The hero JPEG alone is **769 KB** — the single biggest payload on the site and 4.4× the size of
  everything else combined. It displays as a dark background strip; an AVIF/WebP at ~1400 px wide would
  cut it to roughly 80–150 KB.
- Other images (Hebocon poster PNG 722 KB) are legacy and large, but only load on one page.

**Conclusion:** the current host is not slow. The realistic wins are payload (hero, poster) and removing
WordPress.com assets that serve no purpose (stats beacon, hovercards, login/action-bar scripts).

## 7. SEO / metadata baseline

| Aspect | Current state |
| --- | --- |
| `<title>` | Present, consistent `Page – Bozeman Makerspace` |
| Meta description | **Auto-generated** from page text and truncated with `…` / `&hellip;` (e.g. the home description is literally the address followed by "A Makerspace&nbsp;located in Bozeman, MT. If you have an interest…") |
| Open Graph / Twitter | `og:title`, `og:image` (hero) present on all pages via WordPress.com |
| Structured data | WordPress.com injects `Organization` + `WebSite` JSON-LD on home, `BreadcrumbList` elsewhere. No `NGO`/`Place`/`openingHours`/`address` markup — so Google has no machine-readable address or hours |
| Canonical / HTTPS | Correct; `www` and `http` 301 to the apex HTTPS URL |
| Sitemap / robots | Present, WordPress.com-generated |
| 404s | Proper 404 status with a branded 404 page |
| Redirect hygiene | Only WordPress.com defaults; no legacy paths other than `/home` and `/index.php` |
| Analytics | WordPress.com stats only — no consent banner needed today |

## 8. Content and structure observations

- The whole site is effectively a **single-page brochure** (home carries membership, pricing, hours,
  events, donate, newsletter) plus a long tools list and a long bylaws document.
- **No blog, news, or classes pages exist** — MailerLite and the calendar absorb announcements.
- The **menu has no "Join" or "Visit" item**; the primary conversion path is buried in the home page body.
- The footer repeats location, email, and hours on every page ("Open To The Public: Thurs 6:30 - 8:00 PM,
  Members: 24/7").
- The **wiki already holds better versions** of the tools list (per-tool pages with restrictions, training
  requirements, manuals) and the officers/bylaws (see `03-wiki-content-map.md`).

## 9. Defects, inconsistencies and risks

Ordered roughly by how visible they are to a visitor.

| # | Severity | Finding | Evidence | Fix in new site |
| --- | --- | --- | --- | --- |
| 1 | High | Donate section links "Contact an officer" to **`bozemanmakers.wordpress.com/contact/`** (wrong domain) | Home page, Donate paragraph | Point at `/contact/` |
| 2 | High | Tools page points at the wiki's **old alias `wiki.spen.cc/shelves/tools-at-the-makerspace`** | `/tools/` intro | Use `wiki.bozemanmakerspace.com` URLs |
| 3 | High | **2021 Hebocon page is stale**: advertises Saturday Oct 23 2021 and the **previous address** "5350 Love Ln Unit 2" while the footer says 10 Innovation Ln | `/hebocon/` body | Retire or archive (decision needed) |
| 4 | Medium | **Tool list duplicated** from the wiki and already incomplete/drifting (e.g. site lists a *Makita* table saw, wiki documents a *Bosch*) | `/tools/` vs wiki books | Keep a short category overview; link to the wiki |
| 5 | Medium | **Officers + bylaws duplicated** on the site and in the wiki | `/organization/` vs `/books/organization/*` | Pick one canonical home (see `06-open-questions.md`) |
| 6 | Medium | Typo **"Prusa 13 Mk3"** (model is i3 MK3) | `/tools/` 3D Printers | Correct if the list is kept |
| 7 | Medium | TOC entry "Miscellaneous" links to `#vinyl-cutting-accessories` | `/tools/` TOC | Fix if list is kept |
| 8 | Medium | Release-form link text is a raw PDF; **no privacy note** for the contact form | Home, `/contact/` | Add short privacy note |
| 9 | Medium | **Contact form is a WordPress.com feature**; submissions are invisible once the site moves | `/contact/` (Grunion markup) | Replace with a hosted form handler |
| 10 | Low | Calendar iframe returned **HTTP 401** to a scripted request (officers confirm the calendar is public) | `calendar.google.com/calendar/embed?…` | Keep the embed; verify logged-out in a browser at QA |
| 11 | Medium | **No SPF or DMARC records** for `bozemanmakers.org` even though it sends/receives club mail | DNS TXT queries | Add SPF + DMARC when DNS moves |
| 12 | Low | Hero image 769 KB, legacy PNG poster 722 KB, no modern formats | Asset sizes | Re-encode at build time |
| 13 | Low | Every page carries WordPress.com branding, login, "Report this content", shortlinks | Page footers | Gone by default |
| 14 | Low | Meta descriptions auto-generated/truncated — weak search snippets | `<meta name="description">` | Hand-write per page |
| 15 | Low | Comments enabled on the Hebocon page | Comments UI | Off |
| 16 | Low | No "Join / Visit / Hours" in the nav; hours only in footer + home | Menu markup | Nav CTA + hours block |
| 17 | Low | Thank-you page purpose is undocumented (form? PayPal return?) | `/thank-you/` | Document and wire to form success |
| 18 | Low | Three different domains in play (`bozemanmakers.org`, `bozemanmakerspace.com`, `bozemanmakers.com`) | DNS, links | Decide naming; at minimum use consistent wiki links |
| 19 | Info | WordPress.com `robots.txt`/sitemaps/feeds/author archives disappear on migration | — | Provide `robots.txt`, `sitemap.xml`, `/feed.xml` or redirect `/feed/` |

## 10. What the current setup costs, and what the new one would cost

WordPress.com list prices observed on 2026-11-15 (US$, **verify against the actual account/billing**):

| Plan | Monthly billing | Yearly billing (per month) |
| --- | --- | --- |
| Personal | $9 | $4 |
| Premium | $18 | $8 |
| Business | $40 | $25 |
| Commerce | $70 | $45 |

The site has a custom domain, no ads, and uses a Jetpack contact form, so it is on **some paid plan** —
**Personal** ($48/yr at yearly pricing) at minimum, and more likely **Premium** ($96/yr) or **Business**
($300/yr) depending on which plan the contact form requires. Check the actual billing page rather than
guessing; the savings range below spans the possibilities.

Target stack:

| Item | Annual cost |
| --- | --- |
| Static hosting (Cloudflare Pages free tier) | $0 |
| Domain renewal (`bozemanmakers.org`) | ~$12–20 |
| TLS certificate | $0 (included) |
| Contact form (Cloudflare Pages Function + Resend free tier, or Formspree free tier) | $0 |
| Analytics (Cloudflare Web Analytics) | $0 |
| Email (Rackspace — unchanged) | unchanged |
| Memberful, PayPal, MailerLite, Google Calendar | unchanged |

**Net effect:** roughly **$96–$300/yr → ~$15/yr** for the website, plus whatever effort the club chooses to
put into the wiki. Hosting is not the only saving — the paid WordPress.com features being used (hosted
contact form, custom domain, ad removal) are all replaced by free equivalents.

## 11. Re-capture command (run before the rebuild, then diff against `docs/archive/`)

```bash
mkdir -p /tmp/bms-capture && cd /tmp/bms-capture
for p in "" tools organization contact thank-you hebocon; do
  curl -sSL -o "${p:-home}.html" "https://bozemanmakers.org/$p/"
done
curl -sSL -O https://bozemanmakers.org/sitemap.xml
for f in *.html; do html2text -b 120 "$f" > "${f%.html}.md"; done
```

## 12. Constraints the migration must respect

1. **Keep the five live URLs unchanged**: `/`, `/tools/`, `/organization/`, `/contact/`, `/thank-you/`.
   The wiki, Facebook page, and printed materials point at `/contact/`, and the wiki FAQ points at the site
   root for the calendar.
2. **Keep Memberful checkout and portal URLs identical** (`plan=75972`, `plan=78970`, `/auth/sign_in`);
   those are what members' bookmarks and receipts reference.
3. **Keep the calendar and newsletter reachable** — the wiki FAQ tells people to "check the online calendar
   at bozemanmakers.org" and "subscribe to the mailing list".
4. **Do not lose the release-form PDF**; it is linked from the home page and used at the space.
5. **Preserve email** — MX records and the `makers@bozemanmakers.com` mailbox must survive the DNS change.
6. **Never break `/organization/#…` anchors** that may be shared in meeting minutes; see
   `05-url-and-redirect-map.md` for the anchor strategy.
