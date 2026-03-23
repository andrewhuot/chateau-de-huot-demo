# Design Review — Château de Huot Demo Site
*Perspective: luxury hotel guest + Google Cloud sales exec showing to a C-level prospect*
*Reviewed: February 2026*

---

## Executive Summary

The site has an excellent design foundation: strong brand tokens, good typography hierarchy (Playfair Display / Inter / Cormorant Garamond trifecta is classically correct), a luxury color palette with proper restraint, and a working GSAP + scroll animation system. However, several areas fall short of the "Four Seasons / Aman" standard that would genuinely impress a C-level prospect:

- **Hero image** is a yacht/pool photo that reads as "nice Airbnb" rather than "Provençal château estate"
- **Chat widget** has good bones but the widget rendering is visually sparse — widgets need more depth, spacing, and polish
- **Several Unsplash photos** are not luxury enough for the context they're placed in
- **Animation system** is complete but only partially activated in the HTML — stagger reveals work, but parallax needs the hero image to have more vertical travel range
- **The availability card** at the bottom of the hero is positioned too low and styled too plainly for a "wow" first impression

Below is a full section-by-section assessment followed by specific improvement actions taken.

---

## Section-by-Section Assessment

### Navigation
**Rating: 8/10**

- ✅ Glassmorphism scrolled state (`backdrop-filter: blur(20px)`) is clean and modern
- ✅ Gold-accented "Reserve" CTA button with correct outline treatment
- ✅ Hamburger animation is polished (45° rotation with fade)
- ✅ Active link gold highlight works correctly
- ⚠️ Logo mark is a gold square with "CH" — competent but could be more distinctive
- ⚠️ Nav links spacing at 32px feels slightly tight on 1280px container
- ⚠️ No subtle top border or gradient to separate nav from hero

---

### Hero Section (index.html)
**Rating: 6/10 — Primary area for improvement**

Current image: `photo-1566073771259-6a8506099945` — this is a **yacht/pool photo from a villa resort**, not a château in Provence. A C-level exec looking at this would associate it with a Mediterranean beach hotel, not an inland Provençal estate.

- ✅ Full-viewport height, correct overlay gradient
- ✅ GSAP entrance animation on hero content children (staggered fade-up)
- ✅ Parallax effect active on `.parallax-img img` via ScrollTrigger
- ⚠️ Hero image doesn't evoke Provence — no lavender, stone walls, or estate architecture
- ⚠️ The hero headline ("Where time slows to perfection") is excellent — the image should match it
- ⚠️ Availability card glassmorphism effect is good but the card is styled with simple text; no visual date picker feel
- ⚠️ Hero subtitle is good but set at 1.1rem — slightly too small relative to the h1
- ❌ No grain/texture overlay on hero to add depth (flat overlay looks digital)

**Improvement applied:** Changed hero image to a Provençal stone château estate photo. Added a subtle grain texture overlay to the hero. Increased hero subtitle size.

---

### Welcome Strip
**Rating: 9/10**

- ✅ Navy background with Cormorant Garamond italic quote in gold-light is exactly right
- ✅ Attribution line in muted cream is perfectly balanced
- ✅ Max-width on quote prevents overlong line lengths
- Minor: font size could scale up slightly on large screens

---

### Property Overview (Feature Cards)
**Rating: 8/10**

- ✅ SVG icon system is clean and consistent
- ✅ Feature cards have correct hover lift + subtle gold border
- ✅ Stagger animation on scroll entry works well
- ⚠️ Icon containers use emoji-adjacent SVGs — could be more distinct / architectural
- ⚠️ "La Vérrière ★★" heading could use Cormorant italic for the star treatment

---

### Rooms Preview Section
**Rating: 7/10**

- ✅ Three-column responsive grid works correctly at all breakpoints
- ✅ Image hover zoom (scale 1.06) feels smooth and premium
- ✅ Gold tag badges ("Most requested") are properly styled
- ⚠️ Room card images are good — `photo-1631049307264` (hotel suite) and `photo-1611892440504` (loft room) are solid; `photo-1582719478250` (garden terrace) is acceptable
- ⚠️ Card body typography is slightly cramped — `h3` at 1.2rem is too close to the description size
- ⚠️ "Enquire →" text button is too subtle; could use underline-gold treatment
- ⚠️ Stone-light background section feels slightly beige/safe — could add a subtle Provençal texture

---

### Seasonal Highlights (Alternating Rows)
**Rating: 7/10**

- ✅ Alternating left/right layout is a classic luxury hotel pattern
- ✅ Section labels in Cormorant italic + gold are excellent
- ✅ Hover zoom on images works well
- ⚠️ Current images:
  - Summer: `photo-1506905925346` — mountain/lake panorama, not Provence. Should be lavender fields
  - Autumn: `photo-1504280390367` — this is actually good (autumnal landscape)
  - Winter: `photo-1540555700478` — spa candles/bath, acceptable
- ⚠️ Row content padding at 80px/64px is generous; could use a thin gold vertical rule as decoration
- **Improvement applied:** Summer image replaced with authentic Provençal lavender field photo

---

### Testimonials Section
**Rating: 8.5/10**

- ✅ Navy background makes this section visually distinct
- ✅ Cormorant Garamond italic quotes at 1.1rem with navy background + cream text is gorgeous
- ✅ Gold avatar backgrounds for initials are consistent with brand
- ✅ Large decorative quote mark (`::before` pseudo-element at 5rem) adds editorial depth
- ⚠️ Quote cards on dark background with `rgba(255,255,255,0.06)` are barely visible — they blend into the navy
- ⚠️ No animation on testimonial card entrance — these should stagger in

---

### Stats Bar
**Rating: 8/10**

- ✅ Playfair Display numbers at 2.8rem in gold are striking
- ✅ Gold vertical separators are elegant
- ✅ "★★" for Michelin stars is unexpected and delightful
- ⚠️ Slight issue: the stat container uses the bridge CSS with `.stat-item` but `grid` display on mobile makes separators visible between items

---

### CTA Banner Section
**Rating: 8/10**

Current image: `photo-1571896349842` — a spa/pool image. This is not bad but "at dusk" (as the alt text says) isn't quite what it is.

- ✅ Dark overlay (rgba 0.72) at full bleed is dramatic and correct
- ✅ Gold section label above cream h2 is properly ordered
- ⚠️ Image could be replaced with a twilight château exterior
- **Improvement applied:** CTA banner image updated to a more evocative exterior estate photo

---

### Footer
**Rating: 8/10**

- ✅ Four-column grid with brand, estate links, contact, and discover columns
- ✅ GECX badge pill is a nice integration signal
- ✅ Social link circles with gold hover transition
- ⚠️ Footer address phone number shows `+33 4 90 XX XX XX` (placeholder visible in demo)
- ⚠️ Footer brand description column is slightly wide; adjust to 1.2fr vs current 1.5fr ratio
- ⚠️ Footer gold separator line (gradient) is defined in CSS but not rendered in HTML

---

### Chat Widget (Launcher + Panel)
**Rating: 7/10**

- ✅ Goldpulse ring animation on launcher is excellent — draws attention without being garish
- ✅ Navy panel header with Playfair hotel name looks premium
- ✅ Status dot pulse (sage green) is a nice "live" signal
- ✅ Custom gold scrollbar on messages area is a clever detail
- ✅ Message bubble shapes (asymmetric border-radius) are modern and correct
- ⚠️ The panel at 400×600px feels slightly narrow for the rich widgets it contains
- ⚠️ Quick chips row is styled correctly but could use a subtle gradient from stone-light
- ⚠️ Widget labels (`Widget Tool — ROOM_CAROUSEL`) look developer-facing; for the demo they should be more elegant
- **Improvement applied:** Widget label styling upgraded to feel more branded

---

### Widget Rendering (Inside Chat Panel)
**Rating: 6/10 — Second primary area for improvement**

- ✅ Room Carousel scrolls smoothly with snap points
- ✅ Booking Form has correct styled inputs, stepper, and confirmation state
- ✅ Tab switching on Restaurant Menu and Wine List works correctly
- ✅ Calendar grid is properly styled with availability states
- ✅ Loyalty progress bar has CSS transition on width
- ⚠️ Room cards inside the widget carousel are only 150px wide with 90px image height — cramped
- ⚠️ Spa picker grid cards have text that gets cut off at 2-column 150px width
- ⚠️ Map widget is pure CSS placeholder with no real cartographic feel
- ⚠️ Virtual Tour viewport looks empty/placeholder — needs a background image even if static
- ⚠️ `form-row`, `form-group`, `stepper` classes in widgets.js don't match CSS class names — some styles may not apply
- **Improvements applied:** See implementation section below

---

## Image Quality Assessment

| Location | Current Photo ID | Quality | Action |
|----------|-----------------|---------|--------|
| Hero | `photo-1566073771259` (yacht pool) | ❌ Wrong vibe | **Replaced** |
| CTA Banner | `photo-1571896349842` (spa pool) | ⚠️ Generic | **Replaced** |
| Summer seasonal | `photo-1506905925346` (mountain) | ❌ Not Provence | **Replaced** |
| Autumn seasonal | `photo-1504280390367` (autumn) | ✅ Good | Kept |
| Winter seasonal | `photo-1540555700478` (spa/bath) | ✅ Acceptable | Kept |
| Room: Riviera Suite | `photo-1631049307264` (hotel suite) | ✅ Luxury feel | Kept |
| Room: Garden Villa | `photo-1582719478250` (terrace) | ✅ Good | Kept |
| Room: Atelier Loft | `photo-1611892440504` (loft room) | ✅ Good | Kept |
| Widget: Lavender Tour | `photo-1506905925346` (mountain) | ❌ Not lavender | **Replaced** |
| Widget: Yacht Charter | `photo-1566073771259` (yacht) | ✅ Good for context | Kept |
| Widget: Cooking class | `photo-1414235077428` (food) | ✅ Good | Kept |

---

## Animation System Assessment

**Rating: 8/10**

The animation system is well-architected:
- GSAP ScrollTrigger parallax on `.parallax-img img` (yPercent: 20 with scrub)
- Stagger reveals on `.gsap-stagger` children (opacity + y: 40)
- IntersectionObserver for `.reveal` class
- CSS keyframes: fadeUp, slideIn, scaleIn, goldPulse, typingBounce, waveIn, drawLine

**Gaps identified:**
- Hero text stagger animation fires correctly but no entrance animation on the availability card
- Testimonial cards have no scroll entrance animation
- Stats bar numbers could benefit from a countUp animation on scroll entry
- `prefers-reduced-motion` is correctly handled ✅

---

## Mobile Responsiveness Assessment

**Rating: 8/10**

- ✅ Hamburger nav at ≤900px
- ✅ Single-column grid at ≤768px
- ✅ Chat panel goes full-width at ≤480px (calc(100vw - 16px))
- ✅ Spa picker collapses to 1 column at ≤480px
- ⚠️ Hero availability card stacks vertically on mobile — acceptable but text gets small
- ⚠️ Alt-row alternating direction uses `direction: rtl` CSS hack — works but unconventional
- ⚠️ Footer 4-column grid collapses correctly but needs `gap: 32px` at small sizes

---

## Overall Luxury Benchmark

| Criterion | Score | Notes |
|-----------|-------|-------|
| First impression / wow factor | 7/10 | Hero image undermines the Provence story |
| Color palette | 9/10 | Navy/gold/cream is excellent; sage accent is subtle |
| Typography hierarchy | 9/10 | Three-font system is exactly right |
| Image quality | 6/10 | Several wrong images; fixed below |
| Animation smoothness | 8/10 | GSAP parallax works; some gaps in coverage |
| Chat widget polish | 7/10 | Good bones; widget rendering needs tighter spacing |
| Mobile responsiveness | 8/10 | Well handled; minor edge cases |
| "Generic / template-y" risk | Medium | Feature cards and rooms section look slightly Bootstrap-adjacent |
| Four Seasons / Aman feel | 7/10 | Copy and type system are there; images holding it back |

**Overall: 7.5/10** → Target post-improvements: **9/10**

---

## Improvements Applied

1. **Hero image** — replaced yacht/pool with authentic stone château exterior in Provence
2. **CTA Banner image** — replaced with more cinematic dusk estate exterior
3. **Summer seasonal image** — replaced mountain photo with Provençal lavender fields
4. **Widget: Lavender Tour image** — replaced with correct lavender field photo
5. **Hero text size** — subtitle scaled up from 1.1rem to 1.15rem
6. **Hero overlay** — added subtle grain texture SVG overlay for depth
7. **Chat widget label** — upgraded styling from plain developer text to branded italic Cormorant label
8. **Virtual Tour widget** — added background image to the tour viewport
9. **Testimonial cards** — added `gsap-stagger` class to trigger scroll animation
10. **Chat panel width** — increased from 400px to 420px to give widgets more breathing room
11. **Room widget cards** — increased image height from 90px to 110px, card width from 150px to 170px
12. **Hero availability card** — added `btn-gold btn--lg` treatment to the check availability CTA

---

*Design Review — Château de Huot — GECX Demo — February 2026*
