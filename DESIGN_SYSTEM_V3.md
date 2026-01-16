# Noor Parenting App - Design System V3
## Today Screen - Pixel Perfect Implementation Guide

---

## 1. Design Language

### Mood & Style
- **Aesthetic**: Warm, nurturing, Islamic-inspired with modern gamification
- **Inspiration**: Duolingo's engagement patterns + Islamic art warmth + Maternal comfort
- **Target User**: Muslim mothers with young children (0-12 years)
- **Emotional Tone**: Encouraging, gentle, celebratory, spiritually grounded

### Visual Principles
1. **Soft & Rounded**: All corners rounded, no sharp edges
2. **Warm Palette**: Creams, teals, soft pinks - never cold blues
3. **Depth Through Shadows**: Subtle elevation creates hierarchy
4. **Illustrated Characters**: Hand-drawn feel, warm expressions
5. **Islamic Touches**: Geometric patterns, Arabic calligraphy elements

---

## 2. Color System

### Primary Palette
| Name | HEX | Usage |
|------|-----|-------|
| Night Sky Dark | `#1A3A5C` | Hero background gradient start |
| Night Sky Light | `#4A7BA7` | Hero background gradient end |
| Moon Cream | `#F5E6B8` | Moon, stars, highlight accents |
| Primary Teal | `#2DB3A0` | Progress bars, primary buttons, checkmarks |
| Teal Light | `#3ECFBA` | Gradient end for progress |
| Teal Dark | `#1F8A7D` | Button pressed state |

### Background Colors
| Name | HEX | Usage |
|------|-----|-------|
| App Background | `#F5EDE4` | Main screen background (warm beige) |
| Card White | `#FFFFFF` | Card backgrounds |
| Card Tinted | `rgba(255,255,255,0.92)` | Floating cards with blur |
| Section Divider | `#F8F8F8` | Section header backgrounds |

### Text Colors
| Name | HEX | Usage |
|------|-----|-------|
| Text Primary | `#2D3436` | Main titles, task names |
| Text Secondary | `#636E72` | Subtitles, descriptions |
| Text Muted | `#9E9E9E` | Section labels, hints |
| Text Inverse | `#FFFFFF` | Text on dark/colored backgrounds |

### Accent Colors
| Name | HEX | Usage |
|------|-----|-------|
| Reward Gold | `#F4A100` | Points, lightning bolt, rewards |
| Heart Red | `#E84C3D` | Heart icon, favorites |
| Mascot Green | `#7ECEC2` | Character, success states |
| Success Green | `#58CC02` | Checkmarks, completion |
| Progress Yellow | `#FCD34D` | Journey progress bar fill |

### Opacity Rules
- Card overlay: `0.92` opacity with backdrop blur
- Disabled states: `0.5` opacity
- Pressed states: `0.9` opacity
- Hover/touch feedback: `0.95` opacity

### Gradient Definitions
```
Progress Bar: linear-gradient(90deg, #2DB3A0 0%, #7ECFC0 100%)
Night Sky: linear-gradient(180deg, #1A3A5C 0%, #4A7BA7 100%)
Button Teal: linear-gradient(180deg, #2DB3A0 0%, #1F8A7D 100%)
```

---

## 3. Typography

### Font Families
| Font | Weight | Usage |
|------|--------|-------|
| Nunito / Poppins | Bold (700) | Headlines, journey title |
| Nunito / Poppins | SemiBold (600) | Task titles, buttons |
| Nunito / Poppins | Medium (500) | Body text, descriptions |
| Nunito / Poppins | Regular (400) | Captions, hints |

### Type Scale
| Name | Size | Line Height | Weight | Usage |
|------|------|-------------|--------|-------|
| Display | 32px | 38px | Bold | Not used on this screen |
| H1 | 26px | 32px | Bold | Screen titles |
| H2 | 20px | 26px | Bold | Section headers |
| H3 | 18px | 24px | Bold | Card titles (Journey) |
| Body Large | 16px | 24px | SemiBold | Task titles, goals text |
| Body | 14px | 20px | Medium | Descriptions |
| Caption | 12px | 16px | Medium | Section dividers, hints |
| Tiny | 10px | 14px | Medium | Badges, small labels |

### Text Hierarchy Example
```
"1st Akhlaq Journey" → H3, Bold, #2D3436
"0 / 12" → Caption, Bold, #FFFFFF on dark pill
"7 goals left for today!" → Body Large, SemiBold, #2D3436
"Start the day" → Caption, Medium, #9E9E9E
"Pray salajr" → Body Large, SemiBold, #2D3436
"5⚡" → Caption, SemiBold, #F4A100
```

---

## 4. Layout & Spacing

### Grid System
- **Screen Gutter**: 16px horizontal padding
- **Base Unit**: 8px
- **Content Width**: 100% - 32px (gutters)

### Spacing Scale (8px base)
| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Inner padding, icon gaps |
| sm | 8px | Between small elements |
| md | 12px | Card internal padding |
| lg | 16px | Section gaps, card padding |
| xl | 20px | Major section separations |
| xxl | 24px | Large gaps |
| xxxl | 32px | Screen section dividers |

### Component Spacing
```
Card Internal Padding: 14px 16px
Card Margin Bottom: 8px
Section Gap: 16px
Header Height: 56px
Tab Bar Height: ~83px (with safe area)
```

### Border Radius Scale
| Token | Value | Usage |
|-------|-------|-------|
| xs | 8px | Small buttons, badges |
| sm | 12px | Tags, small cards |
| md | 16px | Task cards |
| lg | 20px | Journey card |
| xl | 24px | Content container top corners |
| pill | 9999px | Progress bars, circular elements |

---

## 5. Shadows & Elevation

### Shadow Definitions
```css
/* Card Shadow */
card: {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 8,
  elevation: 2,
}

/* Floating Card Shadow */
floating: {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.12,
  shadowRadius: 24,
  elevation: 8,
}

/* Button Shadow (3D effect) */
button: {
  shadowColor: '#1F8A7D',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 0,
  elevation: 4,
}

/* Soft Ambient */
ambient: {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.04,
  shadowRadius: 16,
  elevation: 3,
}
```

### Elevation Levels
| Level | Usage | Shadow |
|-------|-------|--------|
| 0 | Background, dividers | None |
| 1 | Section headers | Subtle |
| 2 | Task cards | Card shadow |
| 3 | Journey progress card | Floating shadow |
| 4 | FAB, modals | Strong shadow |

---

## 6. Component Specifications

### 6.1 Header Bar
```
Height: 56px
Background: Transparent
Padding: 16px horizontal, 8px vertical

Left: Hamburger Menu Icon
  - Size: 24x24px
  - Color: #FFFFFF (with subtle shadow for visibility)
  - 3 lines: 2px stroke, 18px width, 5px gap

Center: Empty

Right: Heart + Add Button
  - Heart Icon: 28x28px, filled #E84C3D
  - Notification Dot: 8px circle, pink, top-right offset
  - Add Button: 40px circle
    - Background: gradient #2DB3A0 → #3ECFBA
    - Icon: white "+" 20px, 2px stroke
    - Shadow: button shadow
```

### 6.2 Journey Progress Card (Floating)
```
Position: Overlapping hero by ~40px from bottom
Width: calc(100% - 32px)
Background: rgba(255,255,255,0.92) with blur(10px)
Border Radius: 20px
Padding: 12px 16px
Shadow: floating

Layout: Row
  - Flame Badge: 32x32px illustrated icon
  - Text Container: flex 1
    - Title: "1st Akhlaq Journey" - H3 Bold #2D3436
    - Progress Bar:
      - Track: 8px height, #E8E8E8, pill radius
      - Fill: gradient teal, animated width
    - Counter Pill:
      - Background: #2D3436
      - Text: "0 / 12" white, 12px bold
      - Padding: 4px 10px
      - Radius: 10px
```

### 6.3 Goals Left Section
```
Background: #FFFFFF
Border Radius: 20px
Padding: 12px 16px
Shadow: card
Margin: 0 16px 16px 16px

Layout: Row, center aligned
  - Clipboard Emoji: 24px
  - Text: "7 goals left for today!" - Body Large SemiBold
  - Sparkle Badge:
    - 28px circle
    - Background: light teal tint
    - Content: sparkle icon or "+"
```

### 6.4 Section Divider
```
Padding: 8px 16px
Background: transparent

Layout: Row
  - Text: "Start the day" - Caption Medium #9E9E9E
  - Chevron: 12px, rotates on expand

Interaction: Tap to collapse/expand section
```

### 6.5 Task Card
```
Background: #FFFFFF
Border Radius: 16px
Padding: 14px 16px
Margin: 0 16px 8px 16px
Shadow: card

Layout: Row, center aligned
  - Task Icon Container:
    - Size: 40x40px
    - Background: illustrated, category-colored
    - Border Radius: 12px
  - Content: flex 1, marginLeft 12px
    - Title: Body Large SemiBold #2D3436
    - Points Badge: "5⚡" inline
      - Lightning: #F4A100
  - Right Side: Row
    - Mini Mascot: 32x32px (optional, some cards)
    - Checkmark Button:
      - Size: 36px circle
      - Empty: 2px border #2DB3A0, transparent fill
      - Checked: filled #2DB3A0, white checkmark

States:
  - Default: As described
  - Pressed: scale(0.98), shadow increases
  - Completed:
    - Green left border 3px
    - Checkmark filled
    - Optional: slight opacity reduction
```

### 6.6 Checkmark Button
```
Size: 36px
Border Radius: 18px (circle)

Empty State:
  - Background: transparent
  - Border: 2px solid #2DB3A0

Checked State:
  - Background: #2DB3A0
  - Border: none
  - Icon: white checkmark, 20px

Animation:
  - Scale bounce on tap
  - Checkmark rotates in from -180deg
  - Duration: 300ms
```

### 6.7 Mini Mascot
```
Size: 32x32px
Character: Green blob creature
Pose: Peeking/shy (hiding behind card edge)
Usage: Appears on select task cards for delight
```

---

## 7. Icons & Images

### Icon Style Guide
- **Line Weight**: 2px stroke
- **Style**: Rounded corners, friendly
- **Size Grid**: 24px (nav), 40px (task), 16px (badges)
- **Colors**: Contextual (white on dark, dark on light)

### Required Icons (with placeholders)
| Icon | Size | Placeholder |
|------|------|-------------|
| Hamburger Menu | 24px | ☰ or 3-line view |
| Heart | 28px | ❤️ |
| Plus | 20px | + |
| Chevron Down | 12px | ▼ |
| Checkmark | 20px | ✓ |
| Lightning | 16px | ⚡ |
| Clipboard | 24px | 📋 |
| Sparkle | 20px | ✨ |
| Flame | 32px | 🔥 |
| Settings | 24px | ⚙️ |

### Task Icons (Illustrated)
| Category | Placeholder | Color Tint |
|----------|-------------|------------|
| Prayer/Salah | 🙏 | Teal |
| Duas | 📖 | Gold |
| Morning | ☀️ | Yellow |
| Evening | 🌙 | Purple |
| Meals | 🍽️ | Orange |
| Sleep | 🛏️ | Blue |
| General | ✨ | Teal |

### AI Image Prompts (for future assets)
```
Task Icon - Prayer:
"Flat illustration icon of hands in prayer position (dua),
warm teal color palette, rounded soft style, 40x40px,
transparent background, Islamic geometric subtle pattern"

Mascot - Peeking:
"Cute green blob mascot character peeking from side,
simple kawaii style, two dot eyes, small smile,
soft mint green #7ECEC2, transparent background, 32x32px"

Flame Badge:
"Illustrated flame icon, warm gradient orange to yellow,
soft rounded style, slight glow effect, 32x32px"
```

---

## 8. Motion & Animation

### Timing Functions
| Name | Easing | Duration | Usage |
|------|--------|----------|-------|
| Snappy | ease-out | 200ms | Button feedback |
| Smooth | ease-in-out | 300ms | Card transitions |
| Gentle | ease-out | 400ms | Modal slides |
| Spring | damping: 19, stiffness: 290 | ~300ms | Bouncy elements |

### Key Animations

#### Progress Bar Fill
```javascript
// Animate from 0 to target width
withTiming(targetWidth, {
  duration: 800,
  easing: Easing.out(Easing.cubic),
})
```

#### Checkmark Appear
```javascript
// Scale and rotate entrance
withSequence(
  withTiming(1.2, { duration: 150 }),
  withTiming(1.0, { duration: 100 })
)
// Rotation from -180 to 0
withTiming(0, { duration: 300 })
```

#### Card Press
```javascript
// Scale down on press
withTiming(0.98, { duration: 100 })
// Spring back on release
withSpring(1, { damping: 15, stiffness: 300 })
```

#### Section Collapse
```javascript
// Height animation
LayoutAnimation.configureNext(
  LayoutAnimation.Presets.easeInEaseOut
)
// Chevron rotation
withTiming(180, { duration: 200 })
```

### Scroll Behavior
- **Background Fade**: Hero image fades from opacity 1→0 over 200px scroll
- **Header Reveal**: Optional sticky header appears after threshold
- **Parallax**: Background scrolls at 0.5x speed (optional)

---

## 9. Navigation & Flow

### Tab Bar
```
Height: 64px + safe area
Background: #FFFFFF
Shadow: top shadow, 0.05 opacity
Active Indicator: Teal dot below icon

Tabs:
  - Today (Home icon)
  - Chat (Message icon)
  - Tarbiyah/Garden (Plant icon)
  - Journey (Photo icon)
```

### Screen Transitions
- **Tab Switch**: Fade, 200ms
- **Modal Present**: Slide up from bottom, 300ms
- **Detail Push**: Slide from right, 250ms

### Active/Inactive States
| Element | Active | Inactive |
|---------|--------|----------|
| Tab Icon | Teal, filled | Gray, outline |
| Tab Label | Teal, bold | Gray, medium |
| Section | Expanded | Collapsed |
| Card | Normal | Completed (muted) |

---

## 10. Consistency Rules (Non-Negotiables)

### Spacing
- Always use 8px grid
- Never use odd pixel values except 1px borders
- Card margins always 16px from screen edge
- Consistent 8px gap between task cards

### Colors
- Never use pure black (#000000) - use #2D3436
- Never use pure white backgrounds on main screen - use #F5EDE4
- Cards are always #FFFFFF
- Teal is the ONLY accent color for interactive elements

### Typography
- Headlines: Always Poppins/Nunito Bold
- Body: Always Poppins/Nunito SemiBold or Medium
- Never use light weights (300 or below)
- Line height minimum 1.4x font size

### Borders & Radius
- Cards always 16-20px radius
- Buttons always 12px or pill
- Never use 0 radius (sharp corners)
- Borders are 1-2px max, never thicker except completion state

### Shadows
- Every card has a shadow
- Shadows are always subtle (max 0.12 opacity)
- Floating elements have larger blur radius
- 3D buttons use 0 blur, 4px offset

### Interactive Elements
- Minimum touch target: 44x44px
- Always show feedback on press
- Checkmarks animate, never instant
- Progress bars animate fill

### Reuse Constraints
- Use design tokens, never hardcode values
- All colors from TodayColors constant
- All spacing from TodaySpacing constant
- All radii from TodayRadii constant

---

## 11. Component Tree Structure

```
TodayScreen
├── StatusBar (system)
├── HeroBackground (absolute positioned)
│   └── ImageBackground (fades on scroll)
├── HeaderBar (fixed, transparent)
│   ├── HamburgerButton
│   ├── [spacer]
│   └── HeaderRightGroup
│       ├── HeartButton (with badge)
│       └── AddButton (teal circle)
├── ScrollView
│   ├── HeroSpacer (height matches hero)
│   └── ContentContainer (rounded top)
│       ├── JourneyProgressCard (floating overlap)
│       │   ├── FlameIcon
│       │   ├── TitleText
│       │   ├── ProgressBar
│       │   └── CounterPill
│       ├── GoalsLeftSection
│       │   ├── ClipboardIcon
│       │   ├── GoalsText
│       │   └── SparkleButton
│       ├── SectionDivider ("Start the day")
│       ├── TaskCardsList
│       │   └── TaskCard (repeated)
│       │       ├── TaskIcon
│       │       ├── TaskContent
│       │       │   ├── Title
│       │       │   └── PointsBadge
│       │       ├── MiniMascot (optional)
│       │       └── CheckmarkButton
│       ├── SectionDivider ("Any time")
│       ├── TaskCardsList (continued)
│       └── BottomSpacer (for tab bar)
└── TabBar (fixed bottom)
```

---

## 12. File Structure for Implementation

```
src/
├── constants/
│   └── todayScreenTokens.ts (NEW - dedicated tokens)
├── components/
│   └── today/
│       ├── TodayHeader.tsx (NEW)
│       ├── JourneyProgressCard.tsx (NEW)
│       ├── GoalsLeftSection.tsx (NEW)
│       ├── SectionDivider.tsx (NEW)
│       ├── TaskCard.tsx (REDESIGN)
│       ├── CheckmarkButton.tsx (NEW)
│       ├── MiniMascot.tsx (NEW - placeholder)
│       └── PlaceholderIcon.tsx (NEW)
├── screens/
│   └── TodayScreen.tsx (REFACTOR)
```

---

## Implementation Priority

1. **Phase 1**: Update design tokens
2. **Phase 2**: Create atomic components (CheckmarkButton, PlaceholderIcon)
3. **Phase 3**: Create composite components (Header, JourneyCard, TaskCard)
4. **Phase 4**: Refactor TodayScreen layout
5. **Phase 5**: Add animations and polish

---

*Document Version: 3.0*
*Last Updated: January 2026*
*Author: Design Systems Lead*
