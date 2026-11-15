# ClassCard
A class or event shown as a shop ticket: punched hole top-left, a dashed tear line above the stub with time and price.

- Order: PartTag eyebrow → title (`subheading`) → one or two sentences → stub (`data` style: when · seats · price) with one Button.
- `bzm-card--featured` adds the block shadow; use it for at most one card in a row.
- Cards sit square (`radius-0`) on `paper`; put a row of them on `bzm-gridpaper` for a bench-top feel.

The consumer provides: tag, title, description, the stub's data, and the action.
