# Bozeman Makerspace

**Working direction: "Shop Manual."** A first sketch to react to, not a finished brand. It was built from scratch on purpose and borrows nothing from the current site.

The idea: the site should feel like the things lying around a good shop. That means a well-thumbed tool manual, the grey-green enamel on an old milling machine, its red stop button, brass fittings, and a strip of tape with a part number on it. It should look like it was **made**, not rendered: honest materials, visible structure, and nothing glossy.

## Principles

1. **Paper, not glass.** A putty-grey ground (`paper`), ink-dark text (`ink`), and no gradients, blur or glow. Depth comes from 2px borders (`border-firm`) and one hard offset shadow (`shadow-block`), like a block of wood set on a bench.
2. **Cut square.** Corners are `radius-0`. Buttons and inputs get a deburred `radius-1`. The only round shapes are holes and rivets (`radius-hole`).
3. **Label everything like inventory.** Small mono uppercase labels (`label` style) do the work of eyebrows, tags and table headers. A part-number voice (`BZM-014 · WOODSHOP`) is a recurring motif.
4. **Green to start, red to stop.** `enamel-deep` fills the single START button in a view (the primary action). `stop` red is only for warnings, errors and *few seats left*, never for an action you want pressed. If two buttons are green, one of them is wrong.
5. **Colour means a shop area.** `brass-ink` = wood, `gauge` = electronics and digital fab, `ink` = metal, plain for everything else. Words always back the colour up.

## Voice

Plain, warm and a little dry, like the person at the next bench. Short sentences and concrete nouns.

- Yes: *"Bring a project, or don't. Someone here will have one you can help with."*
- Yes: *"Eye protection on past the yellow line."*
- No: *"Unlock your creative potential in our innovative collaborative space!"*
- Times, prices and dimensions go in the `data` mono style so they read like a spec sheet: `Thu 6:30 pm · 4 seats · $35`.

## Visual foundations

**Colour.** Neutrals carry about 90% of every page: `paper`, `paper-2`, `ink`, `ink-muted`, `rule` and `rule-faint`. The palette is **Machine Shop**: `enamel` machine-tool green (identity, big blocks), `enamel-deep` (buttons and green text), `stop` red, `brass` and a supporting `gauge` blue. `enamel` itself is too light for small text on light paper, so green text and buttons use `enamel-deep`/`enamel-ink`. `brass` is a fill behind `ink` only; brass text uses `brass-ink`. Every text colour passes 4.5:1 on `paper` in both themes. The dark theme, "Shop at night", is the same palette under a work lamp, not a neon inversion.

**Type.** Three families with distinct jobs:
- **Zilla Slab** (`display`): headings. A sturdy slab serif with a typewriter, stencil and tool-catalog feel, without going retro-cosplay.
- **Source Serif 4** (`body`): reading text, set large (17px) because people read this on phones in the shop.
- **IBM Plex Mono** (`mono`): labels, data and part numbers.
All three are free on Google Fonts.

**Texture.** One optional ground: `bzm-gridpaper`, a sparse dot grid (1px dots in `rule`, every 24px / `space-4`), like an engineering pad. It replaced a full line grid that read as too busy. Use it in at most one or two bands per page, such as the hero or a row of cards. Keep it quiet: no darker dots, tighter pitch or line grids.

**Spacing.** Five steps: 4, 8, 16, 24 and 48px (`space-1` to `space-5`). The 24px step doubles as the dot-grid pitch.

**Motion.** Almost none. Buttons nudge up 1px on hover and press flat on click. That's it.

## Iconography

None are drawn yet. When we add icons: single-weight 2px line in `ink`, square caps, drawn on a 24px grid, the way you'd sketch a tool in a notebook margin. No filled glyph sets and no emoji. Real photos of member projects beat any icon.

## Logo

The mark is the existing **shield badge**: a shield outline holding *BOZEMAN* over a rule, *MAKERSPACE* in tall condensed capitals, a circular saw blade, and *EST. 2011* between two rules. It's already a stamped, workshop-badge object, so it fits this direction without redrawing. Files are in the **Logos** asset group.

- On `paper`, use **shield-ink**. On `ink` or the dark theme, use **shield-paper**. Don't put it on `enamel`, `gauge`, `stop` or photos without an `ink` or `paper` panel behind it.
- **shield-enamel** (machine-green outline, ink contents) is for big, celebratory moments: a poster or a shirt. Not the nav.
- **shield-original** is the file as supplied (black outline, #424141 contents). It's kept for reference, but the ink version replaces it on screen so the greys match the palette.
- Minimum size: 96px tall. Below that the *BOZEMAN* and *EST. 2011* lines blur, so use the name in `display` type instead.
- Give it clear space equal to the width of the saw blade on every side.
- **In the site header, the badge hangs over the header rule like a tag on a hook.** Use 152px tall on desktop and 100px on phones, with the rule passing behind it (see the Homepage and HomepagePhone pages). This keeps it above the 96px minimum without needing a wide lockup. On phones the nav collapses to a single `Menu` button on the right.
- Never stretch, outline, drop-shadow or redraw it. If we want a horizontal lockup later, it should be drawn by hand from the badge, not faked from type.

The badge's tall condensed capitals rhyme with the system's slab headings but aren't the same face. That's fine, and it keeps the badge special. Don't try to typeset *MAKERSPACE* to imitate it.

## What's here

Button, PartTag, ClassCard and SafetyNote, all styled in `components/bundle.css` with token variables only. Classes are prefixed `bzm-`.

## Other directions considered

- **Workbench Ledger**: cream and pencil-grey, with handwritten-marker annotations. Charming, but harder to keep readable.
- **Blueprint**: all cyanotype blue with white line work. Striking, but tiring for long pages and very "engineering-only".
- **Pegboard**: brown hardboard, dot grid, tools-as-icons. Fun as an accent, too busy as a system.
"Shop Manual" takes a little from each: the dot grid and the labelling.

Palettes tried: the first sketch used warm manila with safety orange. **Machine Shop** replaced it. Spruce & Snow, Galvanized, Risograph and Copper & Verdigris were also considered.
