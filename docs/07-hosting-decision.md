# 07 — Hosting decision: Cloudflare vs Netlify, and vendor risk

**Date:** 2026-11-15 · **Status:** recommendation, pending final sign-off (decision D7)

The brief: *use Cloudflare Functions, and be as price-conscious as possible.* This document records the
comparison, the answer to "will Cloudflare change their free tier?", and how the project is built so a
future price change costs about 30 minutes rather than a rebuild.

---

## 1. What we found at `bozeman.studio`

Checked live on 2026-11-15:

| Observation | Evidence |
| --- | --- |
| Hosted on **Netlify** | `server: Netlify`, `x-nf-request-id: 01M7GA68…`, `cache-status: "Netlify Edge"` |
| Built with **Astro v5.18.1** | `<meta name="generator" content="Astro v5.18.1">` |
| **DNS is at Cloudflare** | `NS carlos.ns.cloudflare.com`, `gloria.ns.cloudflare.com` |
| Site is served via a Netlify hostname | `www` CNAME → `bozeman-artlab.netlify.app` |
| Apex A records are Netlify's load balancer | `75.2.60.5`, `99.83.231.61` |
| **Email is Migadu**, not Netlify | `MX`/`TXT` shows `v=spf1 include:spf.migadu.com -all`, `hosted-email-verify=…` |
| Analytics is **Umami Cloud** | `cloud.umami.is` script |
| No form backend — contact is `mailto:` | 2 × `mailto:` links, no Netlify Forms/Formspree markup |

Two useful takeaways:

1. **The exact stack proposed for the makerspace is already proven in the family** — Astro on a static
   host, with DNS at Cloudflare and email elsewhere. If you want one mental model for both sites, Netlify is
   a legitimate choice.
2. **Her setup is the pattern we want anyway**: DNS separate from hosting. That is what makes a host
   swap a single DNS record — and it's exactly the situation the makerspace is *not* in today (its DNS is
   delegated to WordPress.com).

> Caveat: Netlify accounts created before **2025-09-04** stayed on the old "legacy" Free plan (bandwidth/
> build-minutes based). `bozeman.studio` therefore may be on legacy Free rather than today's credit-based
> Free. Worth checking in her Netlify dashboard if you want a like-for-like comparison.

---

## 2. Current free tiers (verified 2026-11-15)

### Cloudflare Pages / Workers

| Limit | Free plan |
| --- | --- |
| Bandwidth / requests for static assets | **Unmetered** (no published cap) |
| Builds | 500/month, 1 concurrent, 20 min timeout |
| Files per site | 20,000 (25 MiB per file) |
| Custom domains | 100 per project |
| Preview deployments | Unlimited |
| Static redirects | 2,000 (`_redirects`) + 100 dynamic |
| Functions (Workers) | **100,000 requests/day**, 10 ms CPU, 128 MB memory |
| Paid step if ever exceeded | Workers Paid **$5/mo** |

Sources: `developers.cloudflare.com/pages/platform/limits/` and
`developers.cloudflare.com/workers/platform/limits/`.

### Netlify ("credit-based" plans, current)

| Limit | Free | Personal ($9/mo) | Pro ($20/mo) |
| --- | --- | --- | --- |
| Monthly credits | **300** | 1,000 | 3,000 |
| Production deploy | 15 credits (~20 deploys on Free) | | |
| Bandwidth | 20 credits/GB (~15 GB on Free) | | |
| Web requests | 2 credits / 10k (~1.5 M on Free) | | |
| Form submissions | **consume credits** | | |
| Functions | consume compute credits | | |

The 300 free credits are a **shared pool** — deploys, bandwidth, requests, function compute and form
submissions all draw from it. Netlify moved new accounts to this model on 2025-09-04; older accounts keep
legacy pricing unless they opt in.

### What either host would actually see from this site

Six pages, ~150–500 KB per visit, a few thousand visits a month at most, ~4 deploys a month, a handful of
form submissions:

- **Cloudflare:** far below any free limit. $0.
- **Netlify:** also free at this volume, but 20 deploys/month is a real ceiling for an active repo (each
  push/PR build can count), and a spike in traffic or spam submissions eats the same 300 credits. The next
  step up is **$9/mo = $108/yr**.

---

## 3. Answer: will Cloudflare change their offering?

**Assume yes, eventually.** Free tiers are marketing decisions, not contracts. The most recent concrete
example is in this very comparison: **Netlify changed its pricing model in September 2025**, replacing
"100 GB bandwidth / 300 build minutes" with a 300-credit pool — the same offer, materially different caps,
and grandfathered only for existing accounts.

What that means in practice for Cloudflare:

- Their free hosting is a **loss leader** for domain registration, security, and enterprise contracts;
  static hosting costs them so little that it has stayed free and unmetered for years.
- They are actively converging **Pages** and **Workers** (their docs now present "Workers Static Assets" as
  the path for larger sites). That is a *shape* change, not a pricing threat: the build output is identical
  static files either way.
- The realistic downside scenario is not "Cloudflare starts charging for 5,000 pageviews" — it's "the free
  plan gets restructured the way Netlify's did." The mitigation is architectural, not contractual.

**So:** choose on current economics (Cloudflare wins by a wide margin), and design so the decision is
reversible. That is §4.

---

## 4. Portability design (the actual insurance)

The site is deliberately built as **static files + one small function**, and the host is treated as
replaceable:

| Concern | How it stays portable |
| --- | --- |
| Site output | Astro builds plain `dist/` — the same folder deploys to Cloudflare Pages, Netlify, GitHub Pages, S3, or any web server |
| Redirects | `public/_redirects` is understood by **both** Cloudflare Pages and Netlify — the redirect map we already wrote works unchanged |
| Headers | `public/_headers` (Cloudflare). Netlify equivalent is a 5-line `netlify.toml`; commit both stubs from day one |
| Contact form | One `POST /api/contact` endpoint behind a thin `sendMail()` function (~40 lines). Porting = replacing that one file (Netlify Function or Formspree) |
| DNS | Registered and hosted at **Cloudflare** regardless of host (registrar access confirmed 2026-11-15), so a host swap is one CNAME/flattened A record — minutes, and zero impact on MX/Rackspace email |
| No vendor features | No Netlify Forms, no Cloudflare KV/D1/R2, no framework-specific adapters — nothing to un-migrate |
| Analytics | Cloudflare Web Analytics by default; if we ever move, swap the script tag (or use Umami Cloud like `bozeman.studio`) |

**Review trigger:** re-check the free-tier limits once a year at the annual meeting, and immediately if we
see a build failure ("build limit reached") or a billing notice. A host move should be a one-evening job.

---

## 5. Recommendation

**Primary: Cloudflare Pages + a Pages Function.** It is the cheapest option that still gives us a real
contact form, free DNS, free TLS, free analytics, and unlimited traffic headroom — $0/yr, versus $108/yr
for the first paid Netlify tier.

**Acceptable alternative: Netlify**, if consolidating with `bozeman.studio` and reusing one dashboard is
worth more than the cost edge. At this traffic it is $0 today, with a plausible $9/mo later.

**Not recommended as the primary path:** GitHub Pages (free, but no functions → forms via a third party and
no `_headers`), or a cheap WordPress host (reintroduces the maintenance you're leaving).

**Decision record:** D4 (form backend) = Cloudflare Pages Function. Mail provider behind it: pick one of
Resend / Postmark / MailChannels at implementation time; all have free tiers adequate for a handful of
messages a day. Fallback is a visible `mailto:` link, which costs nothing and never breaks.

### 5.1 Why Cloudflare over Netlify for *this* site

Both would work. The tiebreakers, in order of importance:

1. **No metered ceiling on the thing we can't predict — traffic.** Cloudflare doesn't meter static bandwidth
   or requests. A newsletter mention, a news article, or a Hebocon post that goes viral costs $0 on
   Cloudflare and eats a 300-credit pool on Netlify.
2. **Build headroom.** This is a repo-and-PR workflow with preview deploys; 500 builds/month (Cloudflare)
   versus ~20 production deploys' worth of credits (Netlify Free) is the difference between "just push" and
   "is this deploy worth 15 credits?"
3. **Forms arrive as email, not in a dashboard.** For a volunteer org, a submission landing in the shared
   `makers@` mailbox that officers already read every day is more reliable than a Netlify forms dashboard
   that nobody logs into. It also fails loudly (bounce → noticed) rather than silently (unread dashboard).
4. **One platform for DNS, hosting, TLS, analytics.** We have to move DNS off WordPress.com anyway;
   keeping the zone and the site in the same account removes a failure mode during cutover.

**When Netlify would be the better pick:** if consolidating with `bozeman.studio` under one account, sharing
one mental model and one login mattered more than the cost ceiling — and if using Netlify Forms' dashboard
was actively preferred over email. In that case the $9/mo Personal tier should be budgeted as a realistic
future cost, not treated as a surprise.

Neither choice changes the code, the redirects, or the content model — see §4.

---

## 6. Cost summary (annual, at this site's volume)

| Option | Hosting | Form | Domain | Total |
| --- | --- | --- | --- | --- |
| **Cloudflare Pages (recommended)** | $0 | $0 (free function + free mail tier) | ~$12–20 | **~$12–20** |
| Netlify Free (credit model) | $0 while under 300 credits | $0 (forms consume credits) | ~$12–20 | ~$12–20 |
| Netlify Personal (if limits hit) | $108 | included | ~$12–20 | ~$120–140 |
| GitHub Pages + Formspree | $0 | $0 | ~$12–20 | ~$12–20 |
| Current WordPress.com | $96–300 | included | included | **$96–300** |

The only path that can *silently* cost money is a usage-metered host. Cloudflare's unmetered static
hosting and its explicit 100k/day function cap (which fails closed rather than billing) is the most
predictable of the options.
