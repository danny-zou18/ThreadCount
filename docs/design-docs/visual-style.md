# Design Decision: Visual Style — "The Light Table"

**Status**: Active (Experiment 1)
**Created**: 2026-02-12

## One-Sentence Pitch

> An infinite, beige canvas where clothes float like museum artifacts, organized with the precision of a Swiss train schedule.

## Visual Metaphor

The screen is a photographer's light table or a stylist's floor — not a dashboard. The background *is* the workspace.

---

## Color Palette

The clothes provide the color. The UI stays out of the way.

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#F5F0EB` | Page background (Alabaster/Bone) |
| `--bg-elevated` | `#FDFBF9` | Cards, modals, elevated surfaces |
| `--text-primary` | `#0D0D0D` | Headings, primary text (near-black) |
| `--text-secondary` | `#6B6560` | Body text, descriptions (warm grey) |
| `--text-tertiary` | `#A39E98` | Metadata, placeholders, disabled |
| `--border` | `#E8E3DD` | Subtle warm borders |
| `--border-strong` | `#0D0D0D` | Emphasis borders (used sparingly) |
| `--accent` | `#D94E1F` | International Orange — the ONE action color |
| `--accent-hover` | `#C14319` | Orange hover state |
| `--error` | `#C4391C` | Errors (close to accent, intentional) |
| `--success` | `#2D7A3A` | Success states (muted green) |
| `--shadow-levitate` | `0 20px 40px -10px rgba(0,0,0,0.08)` | Floating/levitation effect for items |
| `--shadow-card` | `0 1px 3px rgba(0,0,0,0.04)` | Subtle card elevation |

### Rules
- No other UI colors. The clothing images are the only color on screen.
- Black for text and structural lines. Orange for the single primary action.
- All greys are warm-toned (never blue-grey).

---

## Typography

Mix editorial serif (fashion magazine) with technical monospace (garment tag).

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| **Headings** | Instrument Serif | 400 (regular) | Page titles, section headers — "the artsy" |
| **Body** | Inter | 400, 500, 600 | Body text, buttons, form labels — neutral workhorse |
| **Mono/Meta** | Space Mono | 400, 700 | Metadata (brand, size, fabric), tags, IDs — "the garment label" |

### Scale
| Level | Size | Font | Weight |
|-------|------|------|--------|
| Display | 48px / 3rem | Instrument Serif | 400 |
| H1 | 36px / 2.25rem | Instrument Serif | 400 |
| H2 | 24px / 1.5rem | Instrument Serif | 400 |
| H3 | 18px / 1.125rem | Inter | 600 |
| Body | 14px / 0.875rem | Inter | 400 |
| Small | 12px / 0.75rem | Inter | 400 |
| Mono | 12px / 0.75rem | Space Mono | 400 |

---

## Backgrounds & Texture

- **No pure white** (`#FFFFFF`) anywhere. The lightest color is `--bg-elevated` (`#FDFBF9`).
- **Subtle grain**: Apply a faint noise texture to the background to kill digital sheen. Use a CSS pseudo-element with a tiny SVG noise pattern at ~3% opacity.

---

## Imagery

### Clothing Items
- All items are PNGs with transparent backgrounds (deep-etched).
- **Levitation shadow**: `box-shadow: 0 20px 40px -10px rgba(0,0,0,0.08)` — items float above the surface.
- **Scale variance**: Respect relative proportions. A sock is smaller than a coat.

### Generated AI Images
- Displayed in clean frames with thin black borders.
- No rounded corners on AI output (editorial feel).

---

## Layout Principles

1. **Whitespace is premium**: Fill ~60% of the screen. The "air" around clothes makes them look expensive.
2. **Asymmetrical masonry** for wardrobe grids — items keep natural aspect ratios, Pinterest-style.
3. **Overlapping** in outfit builder — jacket layer sits visually on top of the shirt layer.
4. **Structural lines**: Use thin black horizontal rules to separate sections (newspaper/editorial style).

---

## Components

### Buttons
- **Primary (the one orange button)**: Solid `--accent` background, white text. Used for THE main action on a page (Generate, Save, Add).
- **Secondary**: Black border, transparent background, black text. For supporting actions.
- **Ghost**: No border, warm grey text. For tertiary actions (cancel, back).

### Cards
- Background: `--bg-elevated`
- Border: `1px solid var(--border)`
- Shadow: `var(--shadow-card)`
- No rounded corners (or very subtle: 2px). Editorial, not playful.

### Inputs
- Bottom border only (underline style), not full box borders
- Label above in Inter (small, 500 weight)
- Placeholder in `--text-tertiary`
- Focus: bottom border turns `--accent`

### Tags / Metadata Labels
- Space Mono, uppercase, letter-spaced
- Example: `WOOL · AUTUMN · NAVY`

---

## Interaction (TBD)

To be revisited once the theme is confirmed. Potential directions:
- Drag-to-place with physics (clothes "land" with slight bounce)
- Hover reveals metadata in mono type
- Page transitions: editorial slide/fade

---

## Reference Touchpoints

- Net-a-Porter editorial pages
- SSENSE product layouts
- The Row (brand site) — extreme whitespace
- Kinfolk magazine — editorial typography + warm tones
- Swiss International Style — grid precision, sans-serif utility
