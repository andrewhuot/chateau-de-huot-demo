# Château de Huot — GECX Web Widget Demo Site

A flagship luxury hotel demo site showcasing Google Cloud's GECX web widget capabilities. Built for C-level enterprise demonstrations.

## Quick Start

```bash
# No build step required. Open directly in browser:
open index.html

# Or serve locally for best experience:
python3 -m http.server 8080
# Then visit: http://localhost:8080
```

## Architecture

```
demo/
├── index.html           # Homepage
├── rooms.html           # Rooms & Suites
├── dining.html          # Dining (La Vérrière ★★)
├── spa.html             # Spa & Wellness
├── experiences.html     # Curated Experiences
├── events.html          # Events & Weddings
├── gallery.html         # Photo Gallery
├── contact.html         # Contact & Location
├── css/
│   ├── main.css         # Brand tokens, reset, typography
│   ├── components.css   # Nav, footer, cards, page sections
│   ├── chat-widget.css  # GECX widget theming + all 20 widget styles
│   └── animations.css   # Keyframes, GSAP triggers, scroll reveals
└── js/
    ├── main.js          # Nav scroll, GSAP init, scroll reveals
    ├── chat-engine.js   # Mock chat core: message queue, typing, widget injection
    ├── widgets.js       # 20 widget renderers (pure functions → HTML strings)
    └── demo-flows.js    # 6 scripted flows
```

## Tech Stack

- **Vanilla HTML/CSS/JS** — zero build step, opens from `file://`
- **GSAP 3** via CDN (ScrollTrigger, parallax, stagger animations)
- **Google Fonts** — Playfair Display, Inter, Cormorant Garamond
- **Unsplash CDN** — all images served from Unsplash (requires internet)

## The 6 Demo Flows

| Flow | Trigger | Widgets Used |
|------|---------|-------------|
| `booking` | "Reserve" buttons | Room Carousel, Price Comparison, Booking Form, Checkout |
| `concierge` | "Plan my day" chips | Weather, Experience Booking, Itinerary Builder |
| `dining` | "Book dinner" buttons | Restaurant Menu, Wine List, Guest Preferences, Booking Form |
| `spa` | "Spa treatments" chips | Spa Treatment Picker, Availability Calendar, Loyalty Program |
| `events` | "Events" page CTAs | Photo Gallery, Price Comparison, Event Inquiry Form |
| `support` | "Help" / chat input | FAQ Accordion, Quick Actions, Reviews Widget |

## The 20 Widgets

1. Room Carousel
2. Booking Form
3. Restaurant Menu
4. Spa Treatment Picker
5. Experience Booking
6. Map Widget
7. Weather Widget
8. Photo Gallery (in-chat)
9. Reviews/Testimonials
10. FAQ Accordion
11. Price Comparison Table
12. Loyalty Program
13. Event Inquiry Form
14. Wine List
15. Checkout/Payment (Google Pay mock)
16. Virtual Tour
17. Itinerary Builder
18. Availability Calendar
19. Guest Preference Profile
20. Multi-language Toggle

## Brand

- **Colors**: Gold `#C9A96E`, Navy `#1A2744`, Cream `#FAF7F2`, Stone `#E8DDD0`, Sage `#7B9E87`
- **Fonts**: Playfair Display (headings), Inter (body), Cormorant Garamond (italics/captions)
- **Aesthetic**: Aman / Four Seasons / Belmond — intimate, precise, timeless
