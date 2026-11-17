# 06 — Open questions, verification list, access, and risks

Two kinds of items here: **decisions** (someone must choose) and **facts to verify** (someone must confirm
against reality). Nothing in `04-new-site-plan.md` should be built until D1–D7 are settled.

---

## 1. Decisions

| # | Decision | Options | Recommendation | Owner |
| --- | --- | --- | --- | --- |
| **D1** | Where does the site live, and who controls DNS? | (a) Cloudflare Pages + Cloudflare DNS; (b) GitHub Pages + registrar DNS; (c) Netlify + its DNS | **DECIDED (2026-11-15): (a)** — Cloudflare Pages + Cloudflare DNS; registrar access confirmed. Export the zone first; recreate Rackspace MX and add SPF + DMARC before the nameserver switch. | Officers + treasurer |
| **D2** | Do the **bylaws** live on the site or in the wiki? | (a) Site only; (b) wiki only; (c) both, with a sync rule | **DECIDED (2026-11-15): both.** Bylaws are stable, so the duplication is low-risk, and members reading the wiki shouldn't bounce to the site. **Sync rule:** the site copy at `/organization/#bylaws` is canonical; the wiki page gets a banner ("canonical copy at bozemanmakers.org/organization/#bylaws — mirror last synced YYYY-MM-DD") and is updated in the same commit as any amendment. Restrict wiki edit rights on the Organization book (W11). | President/Secretary |
| **D3** | What happens to `/hebocon/`? | (a) Delete, 301 → `/`; (b) archive on the wiki (`Other` book); (c) keep if the event returns | **DECIDED (2026-11-15): (a)** — delete and 301 to `/`. Media and the rules PDF are captured into the repo archive first in case the event returns. | Officers |
| **D4** | Contact form backend and inbox | (a) Cloudflare Pages Function + Resend/Postmark; (b) Formspree; (c) Netlify Forms | **DECIDED (2026-11-15): (a)** — Cloudflare Pages Function. **Inbox confirmed: `makers@bozemanmakers.com`** (shared mailbox officers already check), `reply-to` set to the submitter. Provider chosen at implementation. | Secretary |
| **D5** | Is the Google Calendar public? | The embed URL returned **HTTP 401** to an anonymous request on 2026-11-15 | **DECIDED (2026-11-15): yes, it is public — keep the embed.** The 401 was almost certainly bot-blocking on a scripted request. Still open it logged-out in a browser during Phase 4 QA to confirm visitors see events, not a sign-in prompt. | Officers |
| **D6** | Wiki canonical hostname | `wiki.bozemanmakerspace.com` (declared base URL) vs `wiki.spen.cc` (alias, used in links) | **DECIDED (2026-11-15): `wiki.bozemanmakerspace.com` is canonical.** 301 the alias; fix in-wiki links (W1/W2); the new site never links `spen.cc`. | Wiki admin |
| **D7** | Approve the stack and monthly budget | Astro + Cloudflare Pages ($0) vs Netlify (free at this volume, $9/mo if limits hit) vs a cheap WordPress host (~$5–15/mo) | **DECIDED in principle (2026-11-15):** Astro on **Cloudflare Pages** — least expensive with no metered path to a bill. Netlify is the acceptable fallback; the build is kept host-agnostic. Full comparison in [`07-hosting-decision.md`](07-hosting-decision.md). | Officers |

### Secondary decisions (can be made during the build)

| # | Decision | Notes |
| --- | --- | --- |
| D8 | Keep a short tool list on `/tools/` at all, or only category cards? | **DECIDED (2026-11-15): category cards only.** Nine cards linking to wiki books, plus the site-owned tool wishlist. No headline-machine list — the wiki owns machine detail. |
| D9 | Split membership into its own `/membership/` page? | **DECIDED (2026-11-15): yes.** Add `/membership/` as the shop-signage/QR target. The home page keeps its membership section; both use the same shared block and Memberful links. |
| D10 | Public **Slack** invite on the site? | The wiki tells members to request training in `#class-requests` but nothing links to Slack. A "Join our Slack" CTA would help — needs an invite link that doesn't expire. |
| D11 | Domain/brand consolidation | Site on `bozemanmakers.org`, wiki on `bozemanmakerspace.com`, email on `bozemanmakers.com`. Decide whether to standardise on one (e.g. serve the site at `bozemanmakerspace.com` and 301 the other) or leave as-is. |
| D12 | Newsletter embed vs button | Today: a button to the MailerLite share page. Embedding the form on the home page likely increases signups. |
| D13 | Add a short privacy note / policy? | The form collects names and emails; a one-paragraph note is probably sufficient for a small nonprofit (confirm with the treasurer/officers). |
| D14 | Do officers want a "Website & IT" wiki book? | Recommended: repo location, deploy steps, accounts, this `docs/` folder, DNS notes. |

---

## 2. Facts to verify before publishing

The site and the wiki **disagree in a few places**, and some claims need an officer's confirmation.

| # | Claim | Where it appears | Action |
| --- | --- | --- | --- |
| V1 | **2026 officers**: Madison Swords (Pres.), Sam Koepnick (VP), Spencer Cornish (Treas.), Brett Thompson (Sec.) | Site `/organization/` **and** wiki Current Officers | Confirm current (annual elections are in September per the bylaws) |
| V2 | Membership: **$50 Standard / $20 College Age (18–25)** | Site pricing cards, wiki FAQ, Memberful plans `75972`/`78970` | Confirm both the price and that Memberful's plan descriptions match |
| V3 | Hours: **public Thursdays 6:30–8:00 PM**, members 24/7 | Site footer + home, wiki FAQ | Confirm no seasonal change |
| V4 | Address: **10 Innovation Ln Unit D, rear entrance** | Site footer/home, wiki FAQ | Confirm; also confirm the Google Maps pin (`goo.gl/maps/jH1bcA8uk3vs2Th87`) still lands on the right building |
| V5 | **Security deposit** mentioned in the bylaws ("monthly membership fee and security deposit as determined by the officers") | Bylaws Art. 2 §2, §6 | The site says nothing about a deposit and Memberful charges only the monthly plan — is a deposit still collected? Clarify or clean up the bylaws text |
| V6 | Fob replacement **$5** | Wiki Fee Schedule | Confirm; consider adding to the site ("Lost your fob?") |
| V7 | **Table saw**: site says *Makita*, wiki documents *Bosch* | `/tools/`, wiki Woodworking | Determine which machine(s) are actually in the shop; fix whichever is wrong |
| V8 | **3D printer model**: site says "Prusa 13 Mk3" | `/tools/` | Almost certainly a typo for **Prusa i3 MK3(S+)** — confirm exact model and add a wiki page |
| V9 | **Laser cutter**: "80 W Omtech CO₂, autofocus, rotary attachment" | `/tools/` | Confirm model number and add the missing wiki page (task W4) |
| V10 | **Resin printers — two 8K units** | `/tools/` | Confirm make/model; add wiki pages |
| V11 | Donations are **tax deductible** | Home donate section | Confirm status/501(c)(3) wording with the treasurer; consider adding the **EIN** to the site footer or a nonprofit statement |
| V12 | Club **founded 2011**; in the current space "since ~2019" | Wiki FAQ only | Confirm before adding to the site or to structured data (`foundingDate`) |
| V13 | Release form covers **members and guests**, requires 18+ | Home link, PDF | Confirm the PDF is the current version — it is dated 2019 and the text mostly refers to "Guest" |
| V14 | "Discount class fees" perk | Pricing cards | Confirm classes are actually charged and discounted (no class pages exist today) |

---

## 3. Access and accounts needed

| System | Why | Held by |
| --- | --- | --- |
| WordPress.com admin (site `157042820`) | Export content, confirm plan/billing, keep site up during cutover | ? |
| Domain registrar for `bozemanmakers.org` | Change nameservers / transfer | ? |
| DNS zone export (`ns1–3.wordpress.com`) | Recreate MX, SPF, DKIM before the switch | ? |
| Cloudflare (or chosen DNS/hosting) account | New hosting + DNS | to create |
| GitHub org/repo | Code, deploys, PR workflow | to create |
| Memberful admin | Verify plan IDs, portal URL, checkout copy | ? |
| PayPal business account | Donate button settings + return URL | Treasurer |
| MailerLite | Newsletter form/embed | ? |
| Google account that owns the calendar + Photos album | Verify public visibility | ? |
| BookStack wiki admin | Tasks W1–W12 | ? |
| Slack workspace admin | Optional public join link / channel names | ? |

A shared password manager entry list (not in this repo) should be created during Phase 0.

---

## 4. Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| **Email outage** during DNS migration (MX dropped/typo'd) | Medium | High — club email is how members and vendors reach officers | Export the zone, recreate MX first, lower TTL to 300 s a day before, keep the old nameservers for 48 h of testing, verify with `dig` and two test messages |
| Missing SPF/DMARC invites spoofing or spam-filtering of *outgoing* form mail | High (already true today) | Medium | Publish SPF for Rackspace + a DMARC `p=none` record at cutover; align the form sender with the domain |
| Contact form submissions lost after the WP.com plan ends | Medium | Medium | Migrate the form before launch; test delivery; keep `makers@bozemanmakers.com` as a visible fallback |
| WordPress.com assets (release PDF, hero) disappear when the plan is cancelled | Medium | Medium | Copy all assets into the repo in Phase 1; verify no `wp-content` URLs remain |
| Site and wiki drift apart again | High over years | Low–Medium | Encode the ownership rule (`03-wiki-content-map.md` §2) and the canonical facts file; make the wiki the only place for tool detail |
| Non-technical volunteers cannot update the new site | Medium | Medium | Document the PR workflow; optionally add Pages CMS; keep hours/officers in one data file |
| Bylaws mirror in the wiki drifts from the canonical site copy | Medium over years | Medium | Sync banner with a date on the wiki page; update both in the same commit on amendment; restrict edit rights on the Organization book (W11) |
| Old anchor or `/hebocon/` links break | Low | Low | Redirect + anchor-preservation map in `05-url-and-redirect-map.md` |
| Calendar stops being public (link revoked, account change) | Low (confirmed public 2026-11-15) | Medium | Phase 4 QA check while logged out; note the dependency in the wiki FAQ |
| The project stalls mid-migration | Medium | Medium | The current site keeps working until cutover; the repo is additive; `docs/archive/` preserves all copy |
| Student/volunteer loses interest and nobody owns the site | High over time | Medium | Write the "Website & IT" wiki page, name an owner, keep the stack boring (static, no server) |

---

## 5. Suggested next steps

1. **Confirm D1–D7** (one meeting, ~30 minutes) and note the answers in this file.
2. **Book an officer 20 minutes** to confirm V1–V14; mark each as confirmed with a date.
3. **Phase 1 capture** is done (assets in the repo); the re-capture/diff was skipped on 2026-11-16 because
   the live site was unchanged.
4. Scaffold the Astro project and deploy a preview URL so the officers can review before any DNS changes.
5. Only after the preview is approved: do the DNS/email cutover during a quiet weekday, not before a
   Thursday Open Build.
