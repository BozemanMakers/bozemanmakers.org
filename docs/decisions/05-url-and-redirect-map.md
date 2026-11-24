# 05 — URL, anchor, and redirect map

## 1. Principles

1. **Keep every existing page path unchanged** — `/`, `/tools/`, `/organization/`, `/contact/`,
   `/thank-you/`. No path churn means no SEO loss, no broken wiki/Facebook links, and no need to change
   Memberful or PayPal settings.
2. **301 (permanent) everything that is retired**; never 302 for permanent removals.
3. **Keep the current trailing-slash style** (`/tools/`, not `/tools`) and 301 the non-slash form.
4. **Reuse the existing anchor IDs verbatim** on `/tools/` and `/organization/` wherever the content stays.
   This is the cheapest possible way to keep shared links working.
5. **`www` and `http` 301 to `https://bozemanmakers.org/`.**
6. 404 for anything unknown — with a helpful 404 page that links home, tools, contact and the wiki.

## 2. Page map

| Old URL | New URL | Code | Notes |
| --- | --- | --- | --- |
| `/` | `/` | 200 | Same path; rebuilt |
| *(new)* | `/membership/` | 200 | Shop-signage/QR signup page; the home membership section stays |
| `/tools/` | `/tools/` | 200 | Same path; content rewritten, anchors preserved |
| `/organization/` | `/organization/` | 200 | Same path; bylaws canonical here (decision D2) |
| `/contact/` | `/contact/` | 200 | Same path — **the wiki FAQ links here** |
| `/thank-you/` | `/thank-you/` | 200 | Same path; form success + optional donation return |
| `/hebocon/` | `/` *(recommended)* | 301 | Stale 2021 event. Alternative: `/hebocon/ → https://wiki.bozemanmakerspace.com/books/other` if archived |
| `/hebocon` | `/` | 301 | Non-slash form |
| `/home`, `/index.php` | `/` | 301 | WordPress.com defaults; keep for old bookmarks |
| `/tools`, `/organization`, `/contact`, `/thank-you` | add slash | 301 | Trailing-slash policy |
| `/feed/` | `/` *(or `/feed.xml`)* | 301 | No posts; nothing to syndicate |
| `/comments/feed/` | `/` | 301 | Comments are off |
| `/author/robl015/` | `/` | 301 | Legacy author archive; no author pages on the new site |
| `/sitemap.xml` | `/sitemap.xml` | 200 | Generate at build (keep the same filename) |
| `/news-sitemap.xml` | `/` | 301 | Empty on the current site |
| `/robots.txt` | `/robots.txt` | 200 | New content: allow all + sitemap |
| `/osd.xml` | `/` | 301 | OpenSearch descriptor no longer used |
| `/wp-admin/*`, `/wp-login.php`, `/wp-signup.php`, `/wp-json/*`, `/xmlrpc.php` | `/` | 301 | WordPress-only endpoints |
| anything else | — | 404 | Branded 404 with helpful links |

## 3. `/tools/` anchors

Under decision D8 the page becomes **category cards only**, so most of today's per-section anchors no
longer have a matching heading. A `#fragment` can't be redirected by a server (the browser resolves it
after the page loads), so the workable approach is to **keep the anchor IDs present in the HTML** by
putting zero-height anchor elements on the nearest surviving element:

```html
<section id="woodworking" class="card">
  <span id="big-tools" aria-hidden="true"></span>
  <span id="powered-hand-tools" aria-hidden="true"></span>
  <span id="manual-hand-tools" aria-hidden="true"></span>
  …
</section>
```

Old links then still land in the right part of the page. Category-level anchors map to the card itself.

| Anchor | Current target | New treatment (cards-only page) |
| --- | --- | --- |
| `#tools-at-the-makerspace` | intro | Real ID on the intro section |
| `#woodworking` | H2 | ID on the Woodworking card |
| `#big-tools` | H3 | Anchor span inside the Woodworking card |
| `#powered-hand-tools` | H3 | Anchor span inside the Woodworking card |
| `#manual-hand-tools` | H3 | Anchor span inside the Woodworking card |
| `#electronics` | H2 | ID on the Electronics card |
| `#metals` | H2 | ID on the Metalworking card |
| `#metalworking` | H3 | Anchor span inside the Metalworking card |
| `#machining` | H3 | Anchor span inside the Metalworking card |
| `#crafts-textiles` | H2 | ID on the Textiles card |
| `#sewing` | H3 | Anchor span inside the Textiles card |
| `#jewelry` | H3 | ID on the Jewelry card (it has its own wiki book) |
| `#vinyl-cutting-accessories` | H3 | Anchor span inside the Textiles card; **drop the duplicate** by giving the old "Miscellaneous" entry `#miscellaneous` |
| `#other-cnc-computer-controlled-machines` | H2 | Anchor span on the 3D Printing card |
| `#3d-printers` | H3 | ID on the 3D Printing card |
| `#laser-cutter` | H3 | ID on the Laser Cutting card |
| `#painting-coating` | H2 | ID on the Painting & Finishing card |
| `#pottery` | H2 | ID on the Pottery card |
| `#tool-wishlist` | H2 | Real ID on the wishlist section (kept on the site) |

## 4. `/organization/` anchors

All 29 anchors in the table below currently resolve to unique IDs. **Reuse the exact IDs** in the rebuilt page (no anchor
redirects needed). If the bylaws move to the wiki instead (alternative to decision D2), every one of these
must 301/redirect to the wiki page — but wiki anchors are BookStack-generated and unstable, so only
page-level targets are possible: `https://wiki.bozemanmakerspace.com/books/organization/page/bylaws`.

| Anchor | Section |
| --- | --- |
| `#2026-officers` | Officers table |
| `#bylaws` | Bylaws heading |
| `#article-1-name-and-purpose` | Article 1 |
| `#section-1-name` | Art. 1 §1 |
| `#section-2-purpose` | Art. 1 §2 |
| `#article-2-membership` | Article 2 |
| `#section-1-membership-tiers` | Art. 2 §1 |
| `#section-2-eligibility` | Art. 2 §2 |
| `#section-3-rights-and-responsibilities` | Art. 2 §3 |
| `#section-4-termination-of-membership` | Art. 2 §4 |
| `#section-5-suspension-of-membership` | Art. 2 §5 |
| `#section-6-rights-and-responsibilities` | Art. 2 §6 |
| `#article-3-meetings` | Article 3 |
| `#section-1-regular-meetings` | Art. 3 §1 |
| `#section-2-annual-meetings` | Art. 3 §2 |
| `#section-3-special-meetings` | Art. 3 §3 |
| `#section-4-voting` | Art. 3 §4 |
| `#article-4-officers` | Article 4 |
| `#section-1-numbers` | Art. 4 §1 |
| `#section-2-compensation` | Art. 4 §2 |
| `#section-3-responsibilities` | Art. 4 §3 |
| `#president` | President duties |
| `#vice-president` | Vice-President duties |
| `#treasurer` | Treasurer duties |
| `#secretary` | Secretary duties |
| `#section-4-elections` | Art. 4 §4 |
| `#section-5-resignations-and-terminations` | Art. 4 §5 |
| `#article-5-amendment-of-bylaws` | Article 5 |
| `#article-6-certification` | Article 6 |

## 5. Asset map

Move these into the repo (`public/`) and serve them from the new domain; update every reference.

| Current URL | New path | Used by |
| --- | --- | --- |
| `https://bozemanmakers.org/wp-content/uploads/2023/03/img_0426-1.jpeg` | `/images/hero-{1200,1600,2000}.{avif,webp,jpg}` | Home hero, OG image |
| `https://bozemanmakers.org/wp-content/uploads/2019/01/bms-member-and-guest-release-form.pdf` | `/forms/member-and-guest-release.pdf` | Home membership block |
| `https://bozemanmakers.org/wp-content/uploads/2019/09/hebocon-rules-2.pdf` | *(archive only)* `/archive/hebocon/rules.pdf` or wiki | Hebocon |
| `…/2021/09/hebo21.png`, `…/2019/10/party-compressor.gif`, `…/2019/10/garage-1.jpeg`, `…/2019/10/654722c2….jpg` | *(archive only)* `/archive/hebocon/…` | Hebocon |
| `https://s0.wp.com/i/favicon.ico`, `webclip.png` | `/favicon.svg`, `/apple-touch-icon.png` | All pages |

If the Hebocon page is retired, its assets don't need to be published — but download them before the
WordPress.com plan is closed in case the event returns.

**Tracking query strings** (`?w=2000`, `?fit=1200%2C900`, `?m=…`, `?ver=…`) disappear with the WP.com image
CDN; don't try to redirect them.

## 6. Redirect configuration (Cloudflare Workers static assets)

`public/_redirects`:

```text
# Retired content
/hebocon/                 /                                       301
/hebocon                  /                                       301

# WordPress-era aliases
/home                     /                                       301
/index.php                /                                       301
/feed/                    /                                       301
/comments/feed/           /                                       301
/author/robl015/          /                                       301
/news-sitemap.xml         /                                       301
/osd.xml                  /                                       301

# WordPress-only endpoints
/wp-admin/*               /                                       301
/wp-login.php             /                                       301
/wp-signup.php            /                                       301
/wp-json/*                /                                       301
/xmlrpc.php               /                                       301

# Trailing-slash normalisation (Workers static assets serves both; keep parity with today)
/tools                    /tools/                                 301
/organization             /organization/                          301
/contact                  /contact/                               301
/thank-you                /thank-you/                             301
/membership               /membership/                            301
```

`_redirects` rules are evaluated top-down and do not inherit the query string; Workers static assets adds
the original query string to the `Location` header automatically. The trailing-slash rules at the end are
usually redundant — Workers static assets already normalises `/tools` to `/tools/` because a directory
`index.html` exists — but they make the intent explicit and cost nothing.

Workers static assets also supports `_headers`. Add a `.assetsignore` file containing `_redirects`,
`_headers`, and `_routes.json` so those config files are not uploaded as public assets.

**Apex/www/http** are handled by Cloudflare, not `_redirects`: add `bozemanmakers.org` as a custom domain
on the Worker, add `www` with a redirect rule, and enable "Always Use HTTPS". Verify with the
commands in §8.

## 7. Cross-site links to update at cutover

| Where | Link to check | Action |
| --- | --- | --- |
| Wiki FAQ → "How do I contact…" | `https://bozemanmakers.org/contact/` | Must resolve (path preserved) |
| Wiki FAQ → "Check the online calendar at…" | `https://bozemanmakers.org` | Must resolve to a home page with a calendar |
| Site → wiki (all links) | `https://wiki.spen.cc/...` | Replace with `https://wiki.bozemanmakerspace.com/...` |
| Facebook page "Website" field | `bozemanmakers.org` | Confirm/refresh |
| Google Business Profile | Website URL | Confirm/refresh |
| MailerLite email templates/footer | Site URL, contact URL | Check for `/hebocon/` or old paths |
| Memberful plan descriptions / emails | Site + contact URLs | Check |
| PayPal button return URL | `/thank-you/` | Verify it still points at the preserved path |
| Slack channel topics | Site URL | Optional |
| Printed flyers / posters | `bozemanmakers.org/contact/` | No change needed |

## 8. Post-launch verification

```bash
BASE=https://bozemanmakers.org

# 1. Pages resolve with 200 on the exact existing paths
for p in / /tools/ /organization/ /contact/ /thank-you/; do
  printf '%-16s ' "$p"; curl -s -o /dev/null -w '%{http_code}\n' "$BASE$p"
done

# 2. Retired/legacy URLs 301 to the intended target
for p in /hebocon/ /hebocon /home /index.php /feed/ /comments/feed/ /author/robl015/ \
         /news-sitemap.xml /osd.xml /wp-login.php /tools /organization /contact; do
  printf '%-20s ' "$p"
  curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}\n' "$BASE$p"
done

# 3. Unknown URLs 404
curl -s -o /dev/null -w '%{http_code}\n' "$BASE/does-not-exist/"

# 4. www + http redirect to the canonical origin
curl -sI http://bozemanmakers.org/            | grep -i '^location'
curl -sI https://www.bozemanmakers.org/       | grep -i '^location'

# 5. Anchors still exist in the HTML
curl -s $BASE/organization/ | grep -c 'id="article-2-membership"'
curl -s $BASE/tools/        | grep -c 'id="tool-wishlist"'

# 6. No WordPress.com or wiki alias leftovers
curl -s $BASE/ | grep -Eic 'wordpress\.com|wp-content|wiki\.spen\.cc'   # expect 0

# 7. Sitemap and robots
curl -s -o /dev/null -w '%{http_code}\n' $BASE/sitemap.xml
curl -s -o /dev/null -w '%{http_code}\n' $BASE/robots.txt

# 8. Mail still flows (MX unchanged) and SPF/DMARC exist
dig +short MX bozemanmakers.org
dig +short TXT bozemanmakers.org
dig +short TXT _dmarc.bozemanmakers.org

# 9. External links used by the site and wiki resolve
for u in \
  https://wiki.bozemanmakerspace.com/shelves/tools-at-the-makerspace \
  https://wiki.bozemanmakerspace.com/books/frequently-asked-questions/page/frequently-asked-questions-OcX \
  https://bozemanmakerspace.memberful.com/checkout?plan=75972 \
  https://bozemanmakerspace.memberful.com/checkout?plan=78970 \
  https://bozemanmakerspace.memberful.com/auth/sign_in \
  https://dashboard.mailerlite.com/forms/12955/51324291966306002/share \
  https://www.facebook.com/bozemanmakerspace ; do
  printf '%s ' "$u"; curl -s -o /dev/null -w '%{http_code}\n' -L "$u"
done
```

Also check in a browser: submit the contact form, click both Memberful plans through to the checkout page
(without paying), click Donate, subscribe via MailerLite, confirm the calendar renders while logged out,
and open the release-form PDF.

> **Note on scripted checks:** the Memberful URLs (`…/checkout?plan=…`, `…/auth/sign_in`) return **403 to
> `curl`** because of bot protection; that is expected. Verify those three links in a real browser instead
> of treating the 403 as a failure.

## 9. Search Console / analytics follow-up

- Add the new property (or keep the existing one) and submit `https://bozemanmakers.org/sitemap.xml`.
- Expect temporary 404 reports for `/feed/`, `/author/…`, `/news-sitemap.xml` — the 301s above resolve them.
- Check "Page indexing → Not found (404)" after a week: only `/hebocon/` should appear, and it should be
  listed as "Page with redirect".
- Remove the old `wp-admin`/`wp-json` crawl entries (they will now 301 to `/`).
