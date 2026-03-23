# DEMO GUIDE — Château de Huot × GECX v2.0

**Audience**: C-level executives, enterprise sales prospects
**Format**: Live browser demo, no slides
**Duration**: 15–20 minutes full tour, or 5-minute quick hit (10 flows, 26 widgets)

---

## Setup (Before the Demo)

1. Open `index.html` in Chrome or Safari (latest version)
2. Set browser zoom to 90% for best layout
3. Full-screen the browser (F11 / Cmd+Ctrl+F)
4. Ensure you have internet connection (Unsplash CDN images + Google Fonts)
5. Pre-load: click "Reserve" once to warm the chat panel
6. **NEW**: Press Ctrl+Shift+D to verify the Admin Panel loads (then close it)

---

## Demo Flows

### Flow 1: Luxury Booking (5 min) — Best for first impression

**Narrative**: "Imagine a guest browsing this Provence estate. They want to book the finest suite."

1. Click **"Reserve Your Stay"** on the homepage hero
2. Chat opens → watch the typing indicator → Room Carousel appears (3 suites with Unsplash photos)
3. Narrate: *"This is the Room Carousel widget — GECX renders it natively in the chat, no redirect"*
4. Chat continues → Price Comparison table appears
5. *"The AI has already identified the guest's interest in the Riviera Suite and is showing a comparison"*
6. Booking Form widget appears → fill in dates if asked
7. Checkout widget with Google Pay button → click it → confirmation
8. *"End-to-end booking journey. Zero page navigations. Fully conversational."*

**Key widget moments**: ROOM_CAROUSEL → PRICE_COMPARISON → BOOKING_FORM → CHECKOUT_PAYMENT

---

### Flow 2: Concierge Intelligence (3 min) — Best for AI story

**Narrative**: "Now let's see the concierge intelligence. A guest asks what to do today."

1. Click **"Plan my day"** chip in the chat panel (or type "What should I do today?")
2. Weather Widget appears with Provence conditions
3. *"The concierge knows your location, the date, and current conditions"*
4. Experience cards appear — 3 curated activities
5. Itinerary Builder appears — morning/afternoon/evening slots
6. *"It's not just answering questions — it's actively building a day plan"*

**Key widget moments**: WEATHER → EXPERIENCE_BOOKING → ITINERARY_BUILDER

---

### Flow 3: Dining Reservation (3 min) — Best for luxury F&B story

**Narrative**: "Let's book dinner at La Vérrière — two Michelin stars."

1. Navigate to `dining.html` → click **"Reserve Your Table"**
2. Restaurant Menu widget with tabs (Lunch / Dinner / Wine)
3. *"The menu is fully rendered in the chat. Guests can browse without leaving the conversation"*
4. Wine List widget — sommelier recommendations
5. Guest Preference Profile — *"GECX remembers preferences across sessions"*
6. Booking Form (time/table) → confirmation

**Key widget moments**: RESTAURANT_MENU → WINE_LIST → GUEST_PREFERENCES → BOOKING_FORM

---

### Flow 4: Spa Booking (2 min) — Best for personalization story

**Narrative**: "Now let's book a spa treatment. Watch how it learns from the guest's loyalty profile."

1. Navigate to `spa.html` → click **"Book a Treatment"**
2. Spa Treatment Picker — 4 treatments with time slots
3. Availability Calendar — color-coded (green/gold/red)
4. *"Real-time availability, color-coded at a glance"*
5. Loyalty Program widget — tier, points, rewards
6. *"GECX connects to the loyalty system — the guest sees their points update in real time"*

**Key widget moments**: SPA_TREATMENT_PICKER → AVAILABILITY_CALENDAR → LOYALTY_PROGRAM

---

### Flow 5: Events Inquiry (2 min) — Best for enterprise/B2B story

**Narrative**: "Now from the perspective of a corporate event planner."

1. Navigate to `events.html` → click **"Enquire Now"**
2. Photo Gallery (venue photos in-chat)
3. Price Comparison (venue tiers)
4. *"The AI is presenting the right venue for a corporate retreat — not a wedding option"*
5. Event Inquiry Form — type: corporate retreat
6. Submit → confirmation: *"Our events team will contact you within 2 hours"*

**Key widget moments**: PHOTO_GALLERY → PRICE_COMPARISON → EVENT_INQUIRY_FORM

---

### Flow 6: Post-Stay Support (2 min) — Best for support/retention story

**Narrative**: "Finally, post-stay guest services. This is where most hotels lose loyalty."

1. Type: "I have a question about my bill"
2. FAQ Accordion — expandable answers
3. Quick Actions — escalate / billing review / concierge
4. *"The AI resolves 80% of queries immediately. Human escalation is one tap for the rest"*
5. Reviews Widget — rate your stay (closes the loop)

**Key widget moments**: FAQ_ACCORDION → QUICK_ACTIONS → REVIEWS_WIDGET

---

### Flow 7: Modify My Booking (3 min) — Best for lifecycle management story

**Narrative**: "Now the guest needs to modify their existing reservation."

1. Type "I need to modify my booking" or click "Modify booking" chip
2. Reservation Manager shows current booking with full details
3. *"The AI has full context — confirmation number, dates, room type"*
4. Upsell widget appears with smart add-on suggestions
5. *"Contextual upselling — the AI knows what's relevant to this guest"*
6. Trip Summary with updated itinerary and cost breakdown
7. *"Complete lifecycle management. Modify, upgrade, confirm — all in-chat."*

**Key widget moments**: RESERVATION_MANAGER → UPSELL_UPGRADE → TRIP_SUMMARY

---

### Flow 8: Room Service & Requests (3 min) — Best for in-stay engagement story

**Narrative**: "The guest is in their room and wants dinner and turndown service."

1. Type "room service" or click "Room service" chip
2. Service Request widget with 4 category tabs
3. *"Room service, housekeeping, amenities, maintenance — all unified"*
4. Guest orders from menu, selects delivery time
5. *"Live order tracking — the guest always knows status"*
6. Loyalty points update in real-time

**Key widget moments**: SERVICE_REQUEST → LOYALTY_PROGRAM

---

### Flow 9: Explore the Area (3 min) — Best for local discovery story

**Narrative**: "The guest has a free afternoon and wants to explore."

1. Type "what's nearby?" or click "Explore nearby" chip
2. Weather widget sets the scene
3. Local Discovery with filterable, sortable nearby places
4. *"Curated local recommendations with ratings, distances, and one-tap itinerary integration"*
5. Map shows selected locations
6. Itinerary Builder updates with new activities
7. *"The AI becomes a local expert — restaurant reservations are one message away"*

**Key widget moments**: WEATHER → LOCAL_DISCOVERY → MAP_WIDGET → ITINERARY_BUILDER

---

### Flow 10: VIP Return Guest (4 min) — Best for personalization + loyalty story

**Narrative**: "A returning VIP guest gets the red carpet treatment."

1. Type "welcome back" or click "VIP welcome" chip
2. Guest Preferences — remembered from last visit
3. *"GECX remembers everything — dietary needs, room temperature, pillow preference"*
4. Room Carousel with "Your Suite" highlighted
5. *"The AI knows their usual suite and proactively offers it"*
6. Upsell with returning-guest context: "Last time you enjoyed..."
7. Trip Summary with personalized touches
8. Language toggle for international guests
9. *"This is true 1:1 personalization at scale"*

**Key widget moments**: GUEST_PREFERENCES → ROOM_CAROUSEL → UPSELL_UPGRADE → TRIP_SUMMARY → LANGUAGE_TOGGLE

---

## New Features in v2.0

### Demo Admin Panel (Ctrl+Shift+D)
Hidden admin panel for demo control:
- **Flow selector**: Play any of the 10 flows instantly
- **Speed control**: 0.5x, 1x, 2x playback speed
- **Widget gallery**: Render any of the 26 widgets standalone
- **Reset**: Clear chat for fresh demo
- **Auto-demo**: Plays all flows sequentially

### Chat Enhancements
- Message timestamps on all messages
- Read receipts (double check marks) on user messages
- "Concierge is typing..." text with typing indicator
- Confetti animation on payment confirmation
- Smooth scroll animations
- Widget labels upgraded from developer text to elegant branded format

---

## Navigation Tour

Show all 8 pages quickly:
- **Homepage** — full-screen hero, parallax, alternating seasonal rows
- **Rooms** — 2x2 masonry grid with sidebar, amenity chips, availability CTA
- **Dining** — chef bio, menu tabs, wine cellar, private dining section
- **Spa** — 3,000 sqm facility showcase, treatment grid, packages
- **Experiences** — 6 curated experience cards, season filter
- **Events** — venue showcase, capacity table, wedding testimonial
- **Gallery** — masonry photo grid, lightbox, 24 images
- **Contact** — getting here, map, weather, contact form

---

## Key Talking Points

### For technical audiences:
- All widgets are pure JavaScript — no React, no frameworks, zero build step
- Widget renderers are pure functions (HTML string → DOM injection)
- Flow cancellation token prevents race conditions when user interrupts a flow
- Real-time typing simulation gives authentic AI feel
- All state is local — no backend required for this demo

### For business audiences:
- Zero friction booking — no page redirects, no forms on separate pages
- Personalization via Guest Preference Profile (dietary, room temp, language)
- Loyalty integration shows real-time points and rewards
- Human escalation is graceful — the FAQ resolves 80% first
- Multi-language support (EN/FR/DE/IT) for international guests

### For C-level:
- "This is what your website looks like when it's actually working for you"
- Conversion from browse to book happens inside the conversation
- The concierge knows context (stay dates, tier, preferences) before they ask
- Every touchpoint — booking, dining, spa, events, support — unified in one widget

---

## Quick Reset Between Demos

To reset the chat for a fresh demo:
1. Close and reopen the chat panel (click the X button then the Concierge button)
2. Refresh the page (F5 / Cmd+R)
3. **NEW**: Press Ctrl+Shift+D to open the Admin Panel → click "Reset Chat"

The chat state is session-only — each page load starts fresh.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Images not loading | Check internet connection (Unsplash CDN required) |
| Fonts look wrong | Check internet connection (Google Fonts required) |
| Chat doesn't open | Ensure JavaScript is enabled |
| Animations janky | Try Chrome; disable browser extensions |
| Layout broken on mobile | Designed primarily for 1280px+ desktop |
| Admin panel won't open | Ensure focus is on the page, then press Ctrl+Shift+D |

---

*v2.0 — Demo built with GECX Web Widget SDK · Chateau de Huot is a fictional demo property*
