# Bozeman Makerspace website — migration findings & plan

**Prepared:** 2026-11-15
**Scope:** Full assessment of `https://bozemanmakers.org` (WordPress.com), its content, third-party
dependencies, and how it should map onto a cheaper, modern site that leans on the wiki at
`https://wiki.bozemanmakerspace.com/` for durable/operational detail.

**Method:** The live site was crawled with `curl` on 2026-11-15 (all six pages, sitemap, robots.txt,
feeds, headers, DNS records, asset sizes, and the public WordPress.com REST API). The wiki was crawled
the same day (shelves → books → pages). Verbatim page copy is preserved in [`docs/archive/`](archive/),
so nothing depends on the current host staying online.

---

## TL;DR

- The site is **six pages and zero blog posts** on a **WordPress.com** hosted plan, using the
  **Radcliffe 2** theme. Technically it is fast (~0.09 s TTFB, ~174 KB per pageview), so the reasons to
  move are **cost, ownership, maintenance friction, stale content, and WordPress chrome**, not speed.
- The **content itself is small and portable**: ~3 pages of real content (home/membership, tools list,
  organization/bylaws), one contact form, one thank-you page, and one dead 2021 event page.
- **All commerce, email marketing, calendar, and forms already live outside WordPress** (Memberful,
  PayPal, MailerLite, Google Calendar, Jetpack Forms, Google Photos, Facebook). Moving the site does not
  require re-platforming payments or memberships.
- The **wiki already duplicates and supersedes** the tools list and the officers/bylaws content. The new
  site should be a small brochure site that links into the wiki instead of re-listing tool details.
- The parts of the current site that are **actively wrong** should be fixed or dropped in the move:
  a donate link pointing at `bozemanmakers.wordpress.com`, a link to the wiki's old `wiki.spen.cc`
  alias, a 2021 event page listing the previous address, duplicate tool data, and truncated
  auto-generated meta descriptions.
- Recommended target: **static site (Astro) on Cloudflare Pages**, repo-driven, with the existing
  external services kept as-is. Recurring site cost drops from a WordPress.com plan to **≈ $0 hosting +
  ~$12–20/yr domain**; email (Rackspace) is unchanged.

---

## Documents

| File | What it answers |
| --- | --- |
| [`01-current-site-audit.md`](01-current-site-audit.md) | What the current site is, how it is hosted, every URL that exists, dependencies, performance/SEO baseline, and a numbered list of defects. |
| [`02-content-inventory.md`](02-content-inventory.md) | Page-by-page inventory: blocks, canonical facts, what to keep / rewrite / retire, and where each item lands. |
| [`03-wiki-content-map.md`](03-wiki-content-map.md) | Full wiki structure (shelves → books → pages), site→wiki mapping, a tool-by-tool coverage matrix, wiki gaps, and wiki-side cleanup tasks. |
| [`04-new-site-plan.md`](04-new-site-plan.md) | Proposed sitemap and page specs, content model, stack options and recommendation, integrations, SEO/a11y/analytics requirements, build/deploy workflow, phases, and cost model. |
| [`05-url-and-redirect-map.md`](05-url-and-redirect-map.md) | Exact old→new URL table (including anchors and assets), redirect config, and post-launch verification steps. |
| [`06-open-questions.md`](06-open-questions.md) | Decisions needed before build, facts that must be verified, access/credentials required, and a risk register. |
| [`07-hosting-decision.md`](07-hosting-decision.md) | Cloudflare vs Netlify cost comparison (with current free-tier limits), the `bozeman.studio` findings, and the vendor-risk/portability strategy. |
| [`08-mvp-build-plan.md`](08-mvp-build-plan.md) | MVP build plan: copy rules (no AI-generated text), design system vs architecture reconciliation, page-by-page copy sources, stack, milestones, definition of done. |
| [`archive/`](archive/) | Verbatim copy of all six live pages captured 2026-11-15 (source text for the rebuild). |

---

## Reading order

1. `01-current-site-audit.md` — understand what exists today.
2. `02-content-inventory.md` + `03-wiki-content-map.md` — what moves and what gets delegated to the wiki.
3. `06-open-questions.md` — remaining secondary decisions and the facts an officer must confirm.
4. `04-new-site-plan.md` + `05-url-and-redirect-map.md` — build and launch.

## Decisions settled (2026-11-15)

| Ref | Decision |
| --- | --- |
| D1 | **Cloudflare Pages + Cloudflare DNS**; registrar access confirmed; export the zone and recreate Rackspace MX + add SPF/DMARC before the nameserver switch. |
| D2 | **Bylaws live in both places** — site copy is canonical, wiki is a dated mirror with a sync banner. |
| D3 | **`/hebocon/` is retired** — 301 to `/`; media and rules PDF archived in the repo. |
| D4 | **Contact form = Cloudflare Pages Function** → `makers@bozemanmakers.com`, `reply-to` = submitter. |
| D5 | **Calendar is public** — keep the embed; verify logged-out during QA. |
| D6 | **Wiki canonical host = `wiki.bozemanmakerspace.com`**; `wiki.spen.cc` 301s to it. |
| D7 | **Astro on Cloudflare Pages**, built host-agnostically (Netlify is the fallback). |
| D8 | **`/tools/` = category cards only** (9 cards → wiki books) + the site-owned wishlist. |

Still open: secondary decisions D9–D14 and the verification list V1–V14 in `06-open-questions.md`.

## Snapshot warning

The audit reflects the site as served on **2026-11-15**. The archive in `docs/archive/` is the source of
truth for the rebuild; re-capturing it was intentionally skipped on 2026-11-16 because the live site had
not changed. If the WordPress.com site is edited before cutover, re-run the capture in
`01-current-site-audit.md` §11 and diff it against `docs/archive/`.
