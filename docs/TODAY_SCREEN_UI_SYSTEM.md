# Today Screen UI System (v0.1)

Scope: `TodayScreen` and its core sections (Ayah overlay, Wellness, Challenges, Daily Task Deck, Quick Capture).

Goals:
- Make the screen feel cohesive, premium, and calm.
- Make actions obvious with minimal CTA clutter (one primary action per card).
- Enforce a token-driven design system (no one-off hex/spacing/type in components).

---

## Color System (tokens)

### Surfaces
| Token | Hex / RGBA | Usage |
|---|---:|---|
| `bg/app` | `#FFF3F7` | Screen background |
| `bg/card` | `#FFFFFF` | Cards, modals, sheets |
| `bg/cardTint` | `rgba(255,255,255,0.92)` | “Glass” panels near imagery/video |
| `stroke/subtle` | `rgba(17,24,39,0.08)` | Hairlines, dividers |
| `stroke/strong` | `rgba(17,24,39,0.16)` | Selected/focus states |

### Text
| Token | Hex | Usage |
|---|---:|---|
| `text/primary` | `#111827` | Titles, primary content |
| `text/secondary` | `#4B5563` | Labels, secondary content |
| `text/muted` | `#6B7280` | Meta, captions (only on light backgrounds) |
| `text/inverse` | `#FFFFFF` | Text on strong fills |
| `text/link` | `#1CB0F6` | Inline “learn more” / helper text |

### CTAs (3D button system)
| Token | Hex | Usage |
|---|---:|---|
| `cta/primary` | `#58CC02` | Primary actions |
| `cta/primaryShadow` | `#58A700` | 3D edge for primary |
| `cta/secondary` | `#1CB0F6` | Secondary actions |
| `cta/secondaryShadow` | `#1899D6` | 3D edge for secondary |
| `cta/disabled` | `#E5E7EB` | Disabled surface |
| `cta/disabledShadow` | `#BDBDBD` | Disabled edge |

### Status
| Token | Hex | Usage |
|---|---:|---|
| `success` | `#16A34A` | Completion, success callouts |
| `warning` | `#F59E0B` | Expiring challenges, caution |
| `danger` | `#EF4444` | Critical alerts |
| `info` | `#2563EB` | Informational highlights |

### Opacity, gradients, contrast rules
- **No buttons or important text on photos/video.** Use `bg/cardTint` panels instead.
- Overlay/blur usage: `#FFF3F7 → rgba(255,243,247,0)` for scroll fades; keep visual weight low (≤ ~30%).
- Minimum contrast:
  - Body text: **≥ 4.5:1**
  - Captions/secondary: **≥ 3:1**
  - Avoid `text/muted` on tinted backgrounds unless verified.
- 3D edges must be hue-matched (shadow color = same family, darker by ~12–18%).

---

## Typography

### Font families (implemented in `App.tsx`)
- Display / headings: `BricolageGrotesque` (Bold / SemiBold)
- UI / body: `Poppins` (SemiBold; add Regular later if needed)

### Type scale
| Style | Size / Line | Family | Weight | Usage |
|---|---:|---|---:|---|
| `Display/XL` | 28 / 34 | Bricolage | Bold | Screen hero titles |
| `Title/L` | 22 / 28 | Bricolage | Bold | Card titles |
| `Title/M` | 18 / 24 | Bricolage | SemiBold | Section headers |
| `Body/M` | 14 / 20 | Poppins | SemiBold | Supporting copy |
| `Caption/S` | 12 / 16 | Poppins | SemiBold | Chips/meta/helper text |
| `Overline` | 12 / 16 + tracking 0.6 | Bricolage | SemiBold | MUST/NICE labels |

### Text hierarchy rules (nonnegotiable)
- One display face (Bricolage) for hierarchy; one UI face (Poppins) for readability.
- Titles never use muted colors; captions never exceed `text/secondary`.
- No decorative glyph “icons” (no icon-as-text characters).

---

## Layout & Spacing

### Grid
- 4pt base grid.
- Spacing tokens: `4, 8, 12, 16, 20, 24, 32`.
- Max content width: **420** (center aligned on larger screens).

### Standard paddings
- Screen gutter: **16**
- Section vertical spacing: **16–20**
- Card padding: **16**

### Radius
| Token | Value | Usage |
|---|---:|---|
| `radius/sm` | 12 | Chips, small controls |
| `radius/md` | 16 | Standard cards |
| `radius/lg` | 24 | Hero containers |
| `radius/xl` | 28 | Deck cards |

### Shadows / strokes
- Prefer a **single system**:
  - Cards: “ledge” shadow (y=6) + light ambient `rgba(0,0,0,0.06)`.
  - Buttons: use the existing 3D edge only (avoid adding extra drop shadows).
- Strokes: `stroke/subtle` by default; `stroke/strong` for selected/focus.

---

## Components (Today screen inventory)

### Header
- Left: Settings icon button (44×44 hit target, 24px icon).
- Right (optional): Notifications, Add (only if scoped). If not implemented, remove.
- States: default / pressed / disabled.
- Interaction intent: quick navigation, no decorative placeholders.

### Hero (character animation/video)
- Container radius: 24; avoid competing shadows.
- Tap: one clear destination (e.g., Journey or Garden), not multiple.

### Wellness card
- Single tappable card (`bg/card`, radius 16, padding 16).
- Show score, one tip, chevron.
- Pressed state: slight translate (2–4px) + subtle highlight.

### Active challenges
- Header + count chip.
- Card variants: default, expiring soon (uses `warning` accent only).
- Primary action: “Mark complete”.

### Daily Task Deck card
- Image shows fully (no overlays).
- Content panel:
  - MUST/NICE chip = Bricolage
  - Title = Bricolage Bold
  - Description = Poppins
- Actions:
  - One primary CTA (footer): “Mark as complete” / “Completed”.
  - Details via tapping image/content (no extra “Details” button).

### Progress & chips
- Progress bar: height 12–14, radius 999, fill uses `success`.
- Chips: radius 999, padding ~10×6, consistent stroke.

### Quick Capture FAB
- Size 56, bottom-right, min hit target 56.
- Pulse: only for onboarding / first session; otherwise static.

### Modals
- Ayah overlay: full-screen, one primary CTA, dismiss available.
- Coaching modal: bottom sheet, primary + secondary actions, consistent spacing.

---

## Icons & Images

### Icon rules
- One icon library only (rounded set).
- Stroke/weight consistent; target size:
  - 20 inline
  - 24 header
  - 28 FAB glyph
- Colors: `text/secondary` default, `text/link` for actionable.
- Never use text characters as icons.

### AI image prompts (if generating task imagery)
General:
> Soft pastel children’s book illustration, Islamic parenting daily routine scene, minimal background, warm blush + teal accents, gentle gradients, clean shapes, high readability, no text, centered composition, 4:5 aspect ratio.

Variants:
- Dua/Spiritual: “parent and child making dua at sunrise…”
- Manners/Adab: “child sharing toys, parent smiling…”
- Hygiene: “washing hands, tidy bathroom…”

---

## Motion & Animation

Principles:
- Motion clarifies hierarchy; never distracts from tasks.
- One hero motion (video/character); everything else is subtle.

Timings:
- Press: 90–120ms down, 140–180ms up
- Sheet/modal in: 260–320ms; out: 180–220ms
- Easing: `cubic-bezier(0.2, 0.8, 0.2, 1)` for UI; spring only for deck swipes

Deck swipe:
- Spring for swipe; subtle parallax on behind card.
- “Settle” micro-bounce only after a successful swipe.

Screen transitions:
- Tab switch: fade + translate (6–10px) over 180–220ms.

---

## Navigation & Flow

Structure:
- Bottom tabs: Today (active), Journey, Garden, …

Today interactions:
- Tap task image/content → Task detail screen/modal
- Press “Mark complete” → instant state update + haptic + tiny celebration (≤ 500ms)
- Quick Capture FAB → bottom sheet flow

Active/inactive states:
- Active tab: filled/stronger color + label `text/primary`
- Inactive: outline + label `text/muted`

---

## Consistency Rules (nonnegotiable)
- No buttons/critical text over imagery/video.
- One primary CTA per card; secondary actions move to detail screens.
- Parent screen owns horizontal margins; child components do not add their own gutters.
- All interactive elements meet ≥ 44×44 hit target.
- Token-only styling (colors/type/spacing/radius/shadows); no ad-hoc hex values.

