# 03 — Wiki structure and site → wiki content map

The wiki at **`https://wiki.bozemanmakerspace.com/`** is a **BookStack** instance (v25.12.3 per its asset
version string). It is **publicly readable without login**, has per-page revision history, page-level PDF
and Markdown export, tags, and search. Everything below was crawled on 2026-11-15.

> **Alias warning:** `https://wiki.spen.cc/` serves the *same* BookStack instance (its HTML declares
> `base-url = https://wiki.bozemanmakerspace.com`). The current tools page links to the `spen.cc` alias and
> the wiki's own pages link to themselves as `wiki.spen.cc`. Standardise on
> `wiki.bozemanmakerspace.com` (see §7).

---

## 1. Structure as it exists today

Three shelves, 13 books, ~54 pages.

| Shelf | Books | Contents |
| --- | --- | --- |
| **Makerspace Policies and Administration** | Organization; Rules and Policies; Frequently Asked Questions | Legal entity, officer duties, filings, bylaws; code of conduct, orientation, storage/guest/parking policies, fees; FAQ |
| **Spaces** | *(none — empty shelf)* | Intended for physical areas of the space; not yet populated |
| **Tools at the Makerspace** | 3D Printing; Laser Cutting; Woodworking; Metalworking; Textiles; Jewelry; Pottery; Painting; Electronics; Other | One page per tool using a shared template (model no., date purchased, status, manual link, product link, description, additional resources) |

### Book → page inventory (with URLs to link from the new site)

| Book | Pages | URL |
| --- | --- | --- |
| **Frequently Asked Questions** | FAQ (general, membership, guests, training, classes) | `https://wiki.bozemanmakerspace.com/books/frequently-asked-questions/page/frequently-asked-questions-OcX` |
| **Rules and Policies** | Code of Conduct; New Member Orientation; Storage Policy; Guest Policy; Parking Policy; Fee Schedule | `https://wiki.bozemanmakerspace.com/books/rules-and-policies` |
| **Organization** | Current Officers; Bylaws; Annual Filings; Chapter "Officer Responsibilities" (President, Vice President, Treasurer, Secretary, General) | `https://wiki.bozemanmakerspace.com/books/organization` |
| **Woodworking** | Laguna Band Saw; SawStop Table Saw; Bosch Table Saw; DeWalt Miter Saw; JET Drill Press; JET Dust Collector; Laguna Jointer; Grizzly Planer; Bauer Belt/Disc Sander; Central Machinery Spindle Sander; Shop Fox Wood Lathe; Homebrew CNC Router; Onefinity Elite Gen 2 CNC Router (+ 7 Onefinity docs: Hardware and Machine Anatomy, Preparing a Cut File, Speeds and Feeds, Software: VCarve and RTS-X, Running a Job, Maintenance and Troubleshooting, Safety Rules) | `https://wiki.bozemanmakerspace.com/books/woodworking` |
| **3D Printing** | Bambulab P1S 3D Printer; chapters "FDM/Filament Deposition 3D printers" and "Resin 3D printers" | `https://wiki.bozemanmakerspace.com/books/3d-printing` |
| **Laser Cutting** | **empty** ("No pages or chapters have been created for this book") | `https://wiki.bozemanmakerspace.com/books/laser-cutting` |
| **Electronics** | Hakko Soldering Station; Benchtop DC Power Supply; Rigol Digital Oscilloscope | `https://wiki.bozemanmakerspace.com/books/electronics` |
| **Jewelry** | Pulse Arc Welder; Foredom Rotary Tool; GraverSmith Pneumatic Engraver; AmScope Stereo Microscope; Central Machinery Bench Buffer | `https://wiki.bozemanmakerspace.com/books/jewelry` |
| **Metalworking** | Lincoln Weldpak 180HD | `https://wiki.bozemanmakerspace.com/books/metalworking` |
| **Painting** | Chicago Electric Powder Coating System | `https://wiki.bozemanmakerspace.com/books/painting` |
| **Pottery** | Shimpo VL-Lite Pottery Wheel; L&L School Master Kiln | `https://wiki.bozemanmakerspace.com/books/pottery` |
| **Textiles** | QX A1 Heat Press; Sailrite Ultrafeed; Sears Roebuck Serger; USCutter PrismCut P28; Singer Sewing Machine | `https://wiki.bozemanmakerspace.com/books/textiles` |
| **Other** | Tool Page Template | `https://wiki.bozemanmakerspace.com/books/other` |

Useful landing pages: all shelves `https://wiki.bozemanmakerspace.com/shelves`, all books
`https://wiki.bozemanmakerspace.com/books`, tools shelf
`https://wiki.bozemanmakerspace.com/shelves/tools-at-the-makerspace`.

---

## 2. Site content → wiki target

| Site location | Current site content | Wiki target | Action on the site |
| --- | --- | --- | --- |
| `/tools/` intro | "check out our new wiki for more details" (links `wiki.spen.cc`) | `/shelves/tools-at-the-makerspace` | **Fix URL**, make it the page's primary CTA |
| `/tools/` Woodworking | 23 items in 3 subsections | `/books/woodworking` (13 tool pages + Onefinity docs) | Short intro + "See all woodworking tools and their manuals →" |
| `/tools/` Electronics | 7 items | `/books/electronics` | Same pattern |
| `/tools/` Metals → Metalworking / Machining | 10 items | `/books/metalworking` (only the Lincoln MIG page exists) | Link, but see gap §4 — either write pages first or keep a bare list |
| `/tools/` Crafts/Textiles | 19 items | `/books/textiles`, `/books/jewelry` | Two category cards |
| `/tools/` Other CNC → 3D Printers | 4 lines | `/books/3d-printing` | Card |
| `/tools/` Other CNC → Laser Cutter | Omtech 80 W | `/books/laser-cutting` (**empty**) | Card + a gap task (§4) |
| `/tools/` Painting & Coating | 3 items | `/books/painting` | Card |
| `/tools/` Pottery | 2 items | `/books/pottery` | Card |
| `/tools/#tool-wishlist` | Donation wishlist | — (site-only) | Keep on the site; optionally mirror in the wiki `Other` book |
| Home — membership | Joining steps, 18+, release form, fob sign-out | `/books/rules-and-policies/page/new-member-orientation` + FAQ | Keep the pitch; link "what to expect at orientation" |
| Home — FAQ-ish questions (cost, hours, guests, refunds) | Not on the site today | `/books/frequently-asked-questions/page/frequently-asked-questions-OcX` | Add a single "Common questions → FAQ" link |
| Home — guests/waivers | One line ("Kids are welcome with their parents") | `/books/rules-and-policies/page/guest-policy` | Link "guest & waiver policy" |
| Home — storage locker perk | "Personal storage locker" | `/books/rules-and-policies/page/storage-policy` | Leave as perk; policy detail lives in the wiki |
| Home — fob replacement | Not on the site | `/books/rules-and-policies/page/fee-schedule` | Optional line: "Lost fob? $5 replacement" |
| `/organization/` officers table | 2026 officers | `/books/organization/page/current-officers` | Keep the table **and** link to the wiki page (it has the same data; make the wiki the update point) |
| `/organization/` bylaws | Full bylaws, 29 anchors | `/books/organization/page/bylaws` (mirror copy) | **Decided (D2):** site is canonical, wiki mirrors it with a sync banner + link back |
| `/organization/` (implicit) | — | `/books/organization/page/annual-filings`, `/books/organization/chapter/officer-responsibilities` | Link "for officers" from `/organization/` |
| `/contact/` | Contact form | — | Keep the form; add FAQ + orientation links |
| Footer/site-wide | Address, hours | `/books/rules-and-policies/page/parking-policy` | Optional footer link: "Parking & arrival" |
| Site-wide | — | `/shelves/makerspace-policies-and-administration` | Add a "Policies" footer link |

**Rule of thumb for the rebuild:** the site owns *who we are, where we are, how to join, how to pay,
how to reach us, and the wishlist*; the wiki owns *how things work, what the rules are, and every
machine's details*.

---

## 3. Wiki → site links that must keep working

The wiki currently points at the site in these places:

| Wiki page | Link | Requirement for the new site |
| --- | --- | --- |
| FAQ → General ("How do I contact…") | `https://bozemanmakers.org/contact/` | **`/contact/` must exist at the same path** |
| FAQ → Classes and Events ("Check the online calendar at…") | `https://bozemanmakers.org` (root) | The home page **must keep a public events calendar** (or add `/calendar/` and update the wiki) |
| FAQ → Membership ("How do I become a member") | "sign up on our website" + `/contact/` | Membership signup links must stay prominent on the home page |

Nothing else on the wiki links out to the site, so the redirect surface is small — but it also means the
wiki has **no link to the membership signup, donate page, or newsletter**; adding a small "Quick links"
block to the wiki FAQ would help both systems stay consistent.

---

## 4. Tool coverage matrix (site list vs wiki pages)

`✓` = has a wiki page · `~` = partial/indirect coverage · `—` = **no page**

### Woodworking

| Site label | Wiki page | Status |
| --- | --- | --- |
| Laguna Band saw | `/books/woodworking/page/laguna-band-saw` | ✓ |
| SawStop table saw | `/books/woodworking/page/sawstop-table-saw` | ✓ |
| Makita table saw | — (wiki documents a **Bosch Table Saw**) | **conflict — verify which saw exists** |
| Bosch table saw | `/books/woodworking/page/bosch-table-saw` | ✓ wiki-only |
| DeWalt 12″ sliding bevel miter saw | `/books/woodworking/page/dewalt-miter-saw` | ✓ |
| Scroll saw | — | — |
| JET Drill press | `/books/woodworking/page/jet-drill-press` | ✓ |
| Laguna 8″ Helical Jointer | `/books/woodworking/page/laguna-jointer` | ✓ |
| Grizzly 12″ Helical Planer | `/books/woodworking/page/grizzly-planer` | ✓ |
| Tabletop spindle sander | `/books/woodworking/page/central-machinery-spindle-sander` | ✓ |
| Belt/disc sander (tabletop) | `/books/woodworking/page/bauer-beltdisc-sander` | ✓ |
| Router table | — | — |
| Onefinity 4×4 CNC router | `/books/woodworking/page/onefinity-elite-gen-2-cnc-router` (+ 7 docs) | ✓ |
| Dust collector (not listed on site) | `/books/woodworking/page/jet-dust-collector` | ✓ wiki-only |
| Wood lathe (not listed on site) | `/books/woodworking/page/shop-fox-wood-lathe` | ✓ wiki-only |
| Homebrew CNC router (not listed on site) | `/books/woodworking/page/homebrew-cnc-router` | ✓ wiki-only |
| Powered hand tools: belt sanders, palm sanders, hand planer, routers, jig saws, impact drivers, drills, circular saws, Dremels, air nailers/staplers | — | — (10 items, no pages) |
| Manual hand tools: planes, saws, hammers, screwdrivers, pliers, box wrenches, sockets | — | — (7 items, no pages) |

### Electronics / Metals / Machining

| Site label | Wiki page | Status |
| --- | --- | --- |
| Rigol 2-channel oscilloscope | `/books/electronics/page/rigol-digital-oscilloscope` | ✓ |
| Hakko soldering irons | `/books/electronics/page/hakko-soldering-station` | ✓ |
| Benchtop DC power supply (not listed on site) | `/books/electronics/page/benchtop-dc-power-supply` | ✓ wiki-only |
| Wire strippers, wire cutters, multimeters, desoldering plungers, bulk wire | — | — (5 items, no pages) |
| MIG welders | `/books/metalworking/page/lincoln-weldpak-180hd` (Lincoln Weldpak 180HD) | ~ one machine only |
| TIG welders | — | — |
| Metal band saw, press brake, angle grinders, bench grinders, small press | — | — (5 items) |
| FADEC CNC milling machine | — | — |
| Grizzly milling machine | — | — |
| Grizzly metal lathe | — | — |

### Textiles / Jewelry / Vinyl / Misc

| Site label | Wiki page | Status |
| --- | --- | --- |
| Sailrite LSZ-1 industrial sewing machine | `/books/textiles/page/sailrite-ultrafeed` | ✓ |
| Consumer sewing machines | `/books/textiles/page/singer-sewing-machine` | ✓ (one machine) |
| Serger | `/books/textiles/page/sears-roebuck-serger` | ✓ |
| Seam rippers, rotary cutters, cutting mat, thread/scrap fabric | — | — (4 items) |
| Pulse welder | `/books/jewelry/page/pulse-arc-welder` | ✓ |
| Pneumatic engraver | `/books/jewelry/page/graversmith-pneumatic-engraver` | ✓ |
| Foredom rotary engraver | `/books/jewelry/page/foredom-rotary-tool` | ✓ |
| Stereo microscope | `/books/jewelry/page/amscope-stereo-microscope` | ✓ |
| Bench buffer/polisher | `/books/jewelry/page/central-machinery-bench-buffer` | ✓ |
| USCutter PrismCut | `/books/textiles/page/uscutter-prismcut-p28` | ✓ |
| Large heat press | `/books/textiles/page/qx-a1-heat-press` | ✓ |
| Paper laminator | — | — |
| Block printing, screenprinting, scrapbook paper, leatherworking supplies | — | — (4 items) |

### 3D printing / Laser / Painting / Pottery

| Site label | Wiki page | Status |
| --- | --- | --- |
| Bambulab P1S (+ AMS 2 Pro) | `/books/3d-printing/page/bambulab-p1s-3d-printer` | ✓ |
| Prusa "13" Mk3 (i3 Mk3) | — | — |
| 8K resin printer (×2) | chapter only: `/books/3d-printing/chapter/resin-3d-printers` | ~ |
| 80 W Omtech CO₂ laser (autofocus, rotary) | — (**Laser Cutting book is empty**) | — **highest-priority gap** |
| Powder coating machine | `/books/painting/page/chicago-electric-powder-coating-system` | ✓ (annealer not covered) |
| Custom spray booth w/ filtered ventilation | — | — |
| Drying racks | — | — |
| Shimpo VL-Lite potter's wheel | `/books/pottery/page/shimpo-vl-lite-pottery-wheel` | ✓ |
| L&L School-Master kiln | `/books/pottery/page/ll-school-master-kiln` | ✓ |

**Coverage summary:** roughly **27 of the site's ~70 listed items** have a dedicated wiki page; most of the
rest are consumables, hand tools, or categories that may not need individual pages. The material gaps are:
the **laser cutter**, **metalworking/machining machines**, **TIG welding**, and **powered hand tools**.

---

## 5. Recommended wiki landing links (use these in the new site)

```text
Tools shelf .......... https://wiki.bozemanmakerspace.com/shelves/tools-at-the-makerspace
FAQ .................. https://wiki.bozemanmakerspace.com/books/frequently-asked-questions/page/frequently-asked-questions-OcX
Policies book ........ https://wiki.bozemanmakerspace.com/books/rules-and-policies
New member guide ..... https://wiki.bozemanmakerspace.com/books/rules-and-policies/page/new-member-orientation
Guest policy ......... https://wiki.bozemanmakerspace.com/books/rules-and-policies/page/guest-policy
Storage policy ....... https://wiki.bozemanmakerspace.com/books/rules-and-policies/page/storage-policy
Parking .............. https://wiki.bozemanmakerspace.com/books/rules-and-policies/page/parking-policy
Code of conduct ...... https://wiki.bozemanmakerspace.com/books/rules-and-policies/page/makerspace-code-of-conduct
Fee schedule ......... https://wiki.bozemanmakerspace.com/books/rules-and-policies/page/fee-schedule
Current officers ..... https://wiki.bozemanmakerspace.com/books/organization/page/current-officers
Bylaws (mirror of site) https://wiki.bozemanmakerspace.com/books/organization/page/bylaws
```

Categories: append the book path, e.g. `…/books/woodworking`, `…/books/3d-printing`,
`…/books/laser-cutting`, `…/books/electronics`, `…/books/metalworking`, `…/books/textiles`,
`…/books/jewelry`, `…/books/pottery`, `…/books/painting`, `…/books/other`.

---

## 6. Link-out conventions for the new site

- Always use the **canonical** `https://wiki.bozemanmakerspace.com/...` URL, never `wiki.spen.cc`.
- Open wiki links in a new tab (`target="_blank" rel="noopener"`) so the visitor keeps the site open.
- Label links by what the reader gets: "Woodworking tools & manuals →", "Read the FAQ →",
  "Guest & waiver policy →" — not "click here".
- Centralise the URL list in one config file (e.g. `src/data/wiki.ts`) so a future wiki restructure is a
  one-file change.
- Do **not** deep-link to wiki heading anchors; BookStack generates truncated, percent-encoded IDs
  (`#bkmrk-article-1-%E2%80%94-name-and`) that are not stable.

## 7. Wiki-side cleanup tasks (owner: wiki admin)

| # | Task | Why |
| --- | --- | --- |
| W1 | Set the canonical app URL to `wiki.bozemanmakerspace.com` and 301 `wiki.spen.cc` → canonical | Two live hostnames split SEO and break links if the alias is retired; the site currently links the alias |
| W2 | Fix in-wiki links to `wiki.spen.cc` (FAQ: Onefinity router, "Tools page"; logo/favicon references) | Consistency; avoids hard-coding the alias |
| W3 | Rename the FAQ page slug `frequently-asked-questions-OcX` → `faq` (BookStack keeps a redirect) | Stable, readable URL for the site's primary link |
| W4 | Populate the **Laser Cutting** book (Omtech 80 W: safety, training, settings, rotary attachment) | Only major machine with zero documentation |
| W5 | Add pages for the metal shop (TIG, metal band saw, press brake, grinders, mills, lathe) or state explicitly that they are undocumented | Site claims these tools; wiki can't answer questions about them |
| W6 | Reconcile the table saw question (Makita vs Bosch) and the Prusa model name | Site and wiki disagree today |
| W7 | Keep the wiki bylaws copy in sync with the canonical site copy: add a banner ("canonical: bozemanmakers.org/organization/#bylaws — last synced YYYY-MM-DD") and update both in the same commit when an amendment passes (decision D2) | Two copies are acceptable only if the mirror is visibly a mirror |
| W8 | Fix the wiki FAQ's contact/calendar links (they assume the site's current layout) | Keeps the two systems consistent |
| W9 | Either populate or delete the empty **Spaces** shelf | Empty shelf is a dead end for readers |
| W10 | Add a short "Start here / Quick links" page (join, fees, calendar, donate, contact, code of conduct) | Gives every wiki visit a path back to the site's conversion actions |
| W11 | Restrict edit permissions on the Organization book (as already done for Rules) | Legal documents should not be freely editable |
| W12 | Consider a "Website & IT" book documenting the new site's repo, deploy process, accounts, and this docs folder | Prevents the next volunteer from starting over |

## 8. Optional: generate the tools index from the wiki at build time

BookStack exposes a read API (`/api/books`, `/api/pages`) with an API token. A static build could fetch
the books/pages and generate the `/tools/` index automatically, so adding a wiki page automatically adds a
line to the site. Trade-offs: requires a token in CI, adds a network dependency to builds, and the
BookStack API must allow read access for the token. **Recommendation:** start with hand-written category
cards + links (§2), and revisit the API if the tool list is maintained regularly.
