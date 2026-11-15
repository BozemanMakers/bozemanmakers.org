# Button
A chunky, square-shouldered button with a hard offset shadow that "presses" flat when clicked.

- **Primary** (`bzm-btn bzm-btn--primary`): machine-green `enamel-deep` fill, `on-enamel` text. It's the START button. One per view: *Book a tour*, *Sign up*, *Reserve*.
- **Default** (`bzm-btn`): paper fill. Everything else that's an action.
- **Quiet** (`bzm-btn bzm-btn--quiet`): underlined text, no box. Tertiary actions, *Cancel*.
- Disabled buttons go dashed and lose their shadow — they look un-assembled, not just faded.
- Labels are verbs in sentence case. No icons-only buttons.
- Focus is a dashed `enamel-ink` outline, offset 4px.

The consumer provides: the element (`<button>` or `<a>`) and the label.
