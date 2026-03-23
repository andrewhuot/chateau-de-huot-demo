# GECX Widget Reference — Château de Huot
*Manual configuration reference for all 26 widget tools*

---

## Overview

Widgets are rendered inside the chat panel as rich interactive UI blocks. Each widget is triggered by a demo flow step with `type: 'widget'`. The `content()` function calls `Widgets.<method>(payload)` and returns an HTML string.

To manually trigger a widget, add a step to a demo flow:

```js
{
  type: 'widget',
  label: 'WIDGET_TOOL_NAME',   // appears as label above the widget
  content: () => Widgets.methodName(payload)
}
```

---

## Category: Booking

---

### 1. Room Carousel
**Label:** `ROOM_CAROUSEL`
**Method:** `Widgets.roomCarousel(rooms)`

Horizontally scrollable card row showing available room types. Each card has an image, room name, description, price, and a "Reserve" button that triggers the booking flow. Appears immediately after a guest expresses interest in a stay.

> **v2.0 Enhancement:** Cards now include 360° Tour badges, Compare checkboxes for side-by-side selection, and entrance animations on scroll.

**Payload Schema:**
```json
[
  {
    "name": "Riviera Suite",
    // Display name shown on the card
    "desc": "Private pool · Sea view · 72 sqm",
    // Short descriptor line (amenities, size)
    "price": "€1,450/night",
    // Price string displayed in gold Playfair font
    "tag": "Most popular",
    // Optional badge overlaid on image (e.g. "Families", "Boutique", null to omit)
    "imageUrl": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80"
    // Unsplash or CDN URL, 400px wide recommended for widget card size
  },
  {
    "name": "Garden Villa",
    "desc": "Private walled garden · 2 bedrooms · 95 sqm",
    "price": "€1,150/night",
    "tag": "Families",
    "imageUrl": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80"
  },
  {
    "name": "Atelier Loft",
    "desc": "Harbor view · Loft design · 58 sqm",
    "price": "€980/night",
    "tag": "Boutique",
    "imageUrl": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&q=80"
  }
]
```

---

### 2. Booking Form
**Label:** `BOOKING_FORM`
**Method:** `Widgets.bookingForm()`

Interactive date/room/guest reservation form. Defaults to next Friday–Saturday. Includes a guest stepper and room type dropdown. On submit, shows a green confirmation banner. No payload required — all data is hardcoded for demo purposes.

**Payload Schema:**
```json
{}
// No arguments. Dates auto-populate to the next available Friday–Saturday.
// Room options: Riviera Suite, Garden Villa, Atelier Loft, Deluxe Room
// Guest stepper defaults to 2
```

---

### 3. Checkout Payment
**Label:** `CHECKOUT_PAYMENT`
**Method:** `Widgets.checkoutPayment(items)`

Order summary with line items, subtotal, tax, total, and a mock Google Pay button. On pay click, button turns green with a "✓ Payment confirmed" state. Appears as the final step in the booking flow.

**Payload Schema:**
```json
[
  {
    "name": "Riviera Suite · 2 nights",
    // Line item description (room + duration)
    "price": "€2,900"
    // Price string; must start with "€" to be included in subtotal calculation
  },
  {
    "name": "Daily breakfast for two",
    "price": "€120"
  },
  {
    "name": "Airport transfer",
    "price": "Complimentary"
    // Non-"€" strings are displayed but excluded from subtotal
  }
]
```

---

### 4. Availability Calendar
**Label:** `AVAILABILITY_CALENDAR`
**Method:** `Widgets.availabilityCalendar()`

A February 2026 calendar grid showing available (green), limited (amber), and sold-out (muted) dates with per-night pricing. Clicking an available date reveals a "Continue to Booking" button. No payload required.

**Payload Schema:**
```json
{}
// Hardcoded to February 2026.
// Available dates: 3, 5, 7, 9, 12, 19, 22, 26 — shown at €1,450/night
// Limited dates: 4, 6, 10, 14, 17, 24 — shown at €1,650/night
// Sold out: 1, 2, 15, 16
```

---

### 5. Price Comparison
**Label:** `PRICE_COMPARISON`
**Method:** `Widgets.priceComparison()`

A comparison table of all four room tiers (Riviera Suite, Garden Villa, Atelier Loft, Deluxe Room) across six attributes. The Riviera Suite column is highlighted. No payload required.

**Payload Schema:**
```json
{}
// Hardcoded attributes: Size, View, Private Pool, Breakfast, Transfer, From price
// Riviera Suite highlighted as the recommended tier
```

---

## Category: Dining

---

### 6. Restaurant Menu
**Label:** `RESTAURANT_MENU`
**Method:** `Widgets.restaurantMenu()`

Tabbed menu widget with three panels: Lunch, Dinner, Wine. Each item shows a dietary icon, dish name, description, and price. A "Reserve a Table" button at the bottom triggers the dining flow. No payload required.

**Payload Schema:**
```json
{}
// Hardcoded menu:
// Lunch: Salade de Provence €28, Filet de Daurade €38, Côte de Veau €46
// Dinner: Velouté d'Artichaut €34, Homard Bleu Rôti €78, Pigeon de Bresse €62
// Wine: Château Margaux 2016 €320, Puligny-Montrachet €180, Château Pétrus €980
```

---

### 7. Wine List
**Label:** `WINE_LIST`
**Method:** `Widgets.wineList()`

Tabbed wine cellar with four panels: Red, White, Rosé, Champagne. Each entry shows wine name, region/vintage, tasting notes, price, and an "Add to reservation" button (turns gold on click). No payload required.

**Payload Schema:**
```json
{}
// Hardcoded selections:
// Reds: Pétrus 2015 (€980), Domaine Leroy (€480), Guigal Côte-Rôtie (€320)
// Whites: Puligny-Montrachet (€180), Weinbach Riesling (€120), Haut-Brion Blanc (€650)
// Rosés: Domaines Ott Clos Mireille (€95), Château d'Esclans Garrus (€140), Miraval (€65)
// Champagnes: Krug Grande Cuvée (€220), Dom Pérignon 2013 (€280), Cristal 2015 (€340)
```

---

## Category: Spa & Wellness

---

### 8. Spa Treatment Picker
**Label:** `SPA_TREATMENT_PICKER`
**Method:** `Widgets.spaTreatmentPicker()`

2×2 grid of treatment cards. Each card shows category pill, treatment name, price, duration badge, a time-slot dropdown, and a "Book" button (turns green on click). No payload required.

**Payload Schema:**
```json
{}
// Hardcoded treatments:
// Signature Massage — 90 min — €180 — slots: 10:00, 12:00, 14:00, 16:00
// Riviera Facial — 60 min — €150 — slots: 10:00, 12:00, 14:00, 16:00
// Couples Ritual — 120 min — €380 — slots: 10:00, 12:00, 14:00, 16:00
// Provençal Body Scrub — 45 min — €120 — slots: 10:00, 12:00, 14:00, 16:00
```

---

### 9. Loyalty Program
**Label:** `LOYALTY_PROGRAM`
**Method:** `Widgets.loyaltyProgram()`

Member card showing name, tier badge (Gold), current points, an animated progress bar to Platinum, and redeemable rewards. Redeem buttons are enabled/disabled based on point balance. No payload required.

**Payload Schema:**
```json
{}
// Hardcoded member: W. DuPont — Gold — 1,847 pts (74% to Platinum at 2,500)
// Rewards:
//   Late Check-out: 800 pts (redeemable)
//   Spa Credit €50: 1,200 pts (redeemable)
//   Complimentary Night: 2,500 pts (locked — "Need more")
```

---

## Category: Concierge

---

### 10. Weather Widget
**Label:** `WEATHER`
**Method:** `Widgets.weatherWidget()`

Current conditions display (Provence, 24°C, Sunny) plus a 5-day forecast row. Each forecast day shows icon, high, and low temperatures. No payload required.

**Payload Schema:**
```json
{}
// Hardcoded: Provence, France
// Current: 24°C Sunny, Wind 12 km/h, Humidity 48%
// Forecast: Mon 26°/18°, Tue 23°/16°, Wed 21°/14°, Thu 25°/17°, Fri 27°/19°
```

---

### 11. Experience Booking
**Label:** `EXPERIENCE_BOOKING`
**Method:** `Widgets.experienceBooking(experiences)`

Date picker (next 7 days) + group size stepper + stacked experience cards. Each card shows an image, name, description, duration, price, and a "Book Now" button (turns green on click). Appears in the concierge flow for day planning.

**Payload Schema:**
```json
[
  {
    "name": "Lavender Valley Tour",
    // Experience display name
    "duration": "3 hours",
    // Duration string shown in the card meta row
    "price": "€180/person",
    // Price string shown in the card meta row
    "desc": "Private guided tour through Provence's finest lavender fields",
    // Short description (1–2 sentences)
    "imageUrl": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
    // Unsplash or CDN URL; 400px wide, displayed as 56×56 thumbnail
  },
  {
    "name": "Sunset Yacht Charter",
    "duration": "3 hours",
    "price": "€980/charter",
    "desc": "Private charter with sommelier and sunset aperitifs on the Côte d'Azur",
    "imageUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80"
  },
  {
    "name": "Provençal Market & Cooking",
    "duration": "4 hours",
    "price": "€240/person",
    "desc": "Morning market with our chef, then a private cooking masterclass",
    "imageUrl": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80"
  }
]
```

---

### 12. Itinerary Builder
**Label:** `ITINERARY_BUILDER`
**Method:** `Widgets.itineraryBuilder()`

Three time-slot sections (Morning, Afternoon, Evening) each with a drop zone and activity chips. Clicking a chip adds it to the slot drop zone and disables the chip. No payload required.

**Payload Schema:**
```json
{}
// Hardcoded slots and activities:
// Morning (9:00–12:00): Market Visit, Lavender Tour, Morning Yoga
// Afternoon (1:00–5:00): Wine Tasting, Côte d'Azur Drive, Art Gallery Tour
// Evening (6:00 onwards): Sunset Sail, Spa Treatment, Private Dinner
```

---

### 13. Map Widget
**Label:** `MAP_WIDGET`
**Method:** `Widgets.mapWidget()`

Stylized navy/gold map placeholder showing a pin for Château de Huot and a list of nearby attractions with distances. Includes an "Open in Google Maps" link. No payload required.

> **v2.0 Enhancement:** Now uses an OpenStreetMap embed with Map/List view toggle and walking times for each attraction.

**Payload Schema:**
```json
{}
// Hardcoded location: Provence-Alpes-Côte d'Azur, France
// Attractions:
//   Old Town — 0.5 km
//   Morning Market — 0.8 km
//   Lavender Fields — 2.0 km
//   Yacht Club — 1.2 km
```

---

### 14. Virtual Tour
**Label:** `VIRTUAL_TOUR`
**Method:** `Widgets.virtualTour()`

A dark navy viewport with interactive hotspot dots (Pool Terrace, Suite Interior, Garden, Dining Room, Spa) that reveal tooltips on hover. Includes an "Open Full Tour" button with a loading state. No payload required.

> **v2.0 Enhancement:** Now includes a room selector dropdown, background images for each room, and enhanced hotspot detail panels with descriptions and photos.

**Payload Schema:**
```json
{}
// Hardcoded hotspot positions and labels:
//   Pool Terrace — top: 25%, left: 70%
//   Suite Interior — top: 40%, left: 20%
//   Garden — top: 65%, left: 55%
//   Dining Room — top: 30%, left: 45%
//   Spa — top: 60%, left: 25%
```

---

### 15. Guest Preference Profile
**Label:** `GUEST_PREFERENCES`
**Method:** `Widgets.guestPreferenceProfile()`

Guest profile card with avatar, name, tier, and editable preference tags. Each tag has an inline edit button that replaces the value with an input on click. Includes an "Update Preferences" button that confirms on click. No payload required.

**Payload Schema:**
```json
{}
// Hardcoded guest: W. DuPont — Gold Member — Est. 2021
// Preferences:
//   Dietary: Vegetarian
//   Room Temp: 20°C
//   Pillow: Firm
//   Language: English
//   Late Dining: Yes
```

---

## Category: Support

---

### 16. FAQ Accordion
**Label:** `FAQ_ACCORDION`
**Method:** `Widgets.faqAccordion()`

Collapsible accordion of five frequently asked questions. First item open by default. Click to expand/collapse with a rotating chevron. No payload required.

**Payload Schema:**
```json
{}
// Hardcoded FAQs:
// 1. Check-in / check-out times
// 2. Airport transfer policy
// 3. Dietary accommodation
// 4. Cancellation policy
// 5. Spa access (guests only)
```

---

### 17. Reviews Widget
**Label:** `REVIEWS_WIDGET`
**Method:** `Widgets.reviewsWidget()`

Three verified guest review cards (avatar, name, city, stars, quote, date) plus an aggregate score banner (5.0 ★ — 312 reviews). No payload required.

**Payload Schema:**
```json
{}
// Hardcoded reviews:
// Sophie M. — Paris — ★★★★★ — Jan 2026 — "The most transcendent stay of my life..."
// James T. — London — ★★★★★ — Dec 2025 — "The Riviera Suite private pool at dawn..."
// Mei L. — Singapore — ★★★★★ — Nov 2025 — "Impeccable service, flawless cuisine..."
```

---

### 18. Photo Gallery
**Label:** `PHOTO_GALLERY`
**Method:** `Widgets.photoGallery(images)`

2×2 image grid showing the first 4 images. Remaining images hidden behind a "View more" toggle button. Each thumbnail has a hover expand icon overlay. Used in the events flow to showcase venue spaces.

**Payload Schema:**
```json
[
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=300&q=80",
  // First 4 images shown in primary 2×2 grid
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=300&q=80",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=300&q=80",
  "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=300&q=80",
  // Images 5+ are hidden; revealed by "View more" button
  "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=300&q=80",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=300&q=80"
  // Recommended: 300px wide thumbnails. All images same aspect ratio for visual consistency.
]
```

---

## Category: Custom Widgets

---

### 19. Event Inquiry Form
**Label:** `EVENT_INQUIRY_FORM`
**Method:** `Widgets.eventInquiryForm()`

Full event inquiry form with event type dropdown (Corporate Retreat, Wedding, Gala Dinner, Private Dinner, Conference), date picker, guest count input, and a special requirements textarea. On submit, hides the form and shows a confirmation message. Used in the events flow.

**Payload Schema:**
```json
{}
// Hardcoded defaults:
//   Event type: Corporate Retreat (first option)
//   Date: 1 month from today (auto-calculated)
//   Guest Count: 50
//   Guest count min: 10, max: 500
// Confirmation message: "Our events team will contact you within 2 hours with a bespoke proposal."
```

---

### 20. Language Toggle
**Label:** `LANGUAGE_TOGGLE`
**Method:** `Widgets.languageToggle()`

Row of four language selector buttons (EN 🇬🇧, FR 🇫🇷, DE 🇩🇪, IT 🇮🇹). Clicking a button highlights it and updates the greeting message below in the selected language. No payload required.

**Payload Schema:**
```json
{}
// Hardcoded languages and greetings:
// EN: "Good morning — Château de Huot welcomes you."
// FR: "Bonjour — Château de Huot vous souhaite la bienvenue."
// DE: "Guten Morgen — Château de Huot heißt Sie willkommen."
// IT: "Buongiorno — Château de Huot vi dà il benvenuto."
```

---

## Category: Guest Services

---

### 21. Reservation Manager
**Label:** `RESERVATION_MANAGER`
**Method:** `Widgets.reservationManager()`

Shows current booking details with interactive modification and cancellation controls. Displays confirmation number, room type, dates, guest count, and status. "Modify" reveals an inline edit form with date pickers, room type dropdown, and package add-ons. "Cancel" triggers a confirmation step before processing. Price delta is shown when changes are made. No payload required.

**Payload Schema:**
```json
{}
// Hardcoded booking:
//   Confirmation: #CH-2026-4892
//   Room: Riviera Suite
//   Dates: Mar 28–30, 2026
//   Guests: 2
//   Status: Confirmed
// Modify mode: inline edit form with dates, room type, packages
// Cancel mode: confirmation step with cancellation policy notice
// Price delta displayed on any modification
```

---

### 22. Service Request
**Label:** `SERVICE_REQUEST`
**Method:** `Widgets.serviceRequest()`

In-room service ordering widget with four tabbed panels. Room Service tab shows food items with quantity steppers and delivery time selector. Housekeeping tab offers checkbox options. Amenities tab provides checkbox selections. Maintenance tab has a textarea for issue description and urgency level selector. On submit, triggers a live 4-step order tracker animation. No payload required.

**Payload Schema:**
```json
{}
// Hardcoded tabs and options:
// Room Service: food items with quantity steppers + delivery time selector
// Housekeeping: checkbox options (towels, turndown, deep clean, etc.)
// Amenities: checkbox options (extra pillows, robes, minibar restock, etc.)
// Maintenance: textarea for issue description + urgency selector (Low/Medium/High)
// Submit triggers animated 4-step tracker: Received → Preparing → On the Way → Delivered
```

---

### 23. Local Discovery
**Label:** `LOCAL_DISCOVERY`
**Method:** `Widgets.localDiscovery(places)`

Nearby places directory with filter tabs (All, Restaurants, Attractions, Shopping, Nightlife) and a sort dropdown (Distance, Rating, Popular). Each card shows a photo, place name, distance, star rating, price level, and description. Includes an "Add to Itinerary" button per card. Takes an optional places array; defaults to 6 curated locations.

**Payload Schema:**
```json
[
  {
    "name": "Le Petit Jardin",
    // Place display name
    "category": "Restaurants",
    // One of: Restaurants, Attractions, Shopping, Nightlife
    "distance": "0.3 km",
    // Distance string from property
    "rating": 4.8,
    // Numeric rating (1–5)
    "priceLevel": "€€€",
    // Price level indicator
    "desc": "Michelin-starred Provençal cuisine in a hidden courtyard garden",
    // Short description (1–2 sentences)
    "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80"
    // Photo URL, 400px wide recommended
  }
]
// Defaults to 6 curated locations if no payload provided
```

---

### 24. Upsell/Upgrade
**Label:** `UPSELL_UPGRADE`
**Method:** `Widgets.upsellUpgrade()`

"Enhance Your Stay" panel with five toggle add-ons. Each toggle shows the add-on name and price. A running total updates live as toggles are switched on and off. Includes a "Confirm Upgrades" button at the bottom. No payload required.

**Payload Schema:**
```json
{}
// Hardcoded add-ons:
//   Airport Transfer — €120
//   Welcome Champagne — €85
//   Late Checkout — €65
//   Spa Credit — €80
//   Romantic Package — €220
// Running total updates on each toggle
// "Confirm Upgrades" button submits selected add-ons
```

---

### 25. Chat Transfer
**Label:** `CHAT_TRANSFER`
**Method:** `Widgets.chatTransfer()`

AI-to-human handoff widget. Shows a transfer notice, agent profile card (Marie Laurent, Senior Guest Relations, photo, languages spoken, 4.9 rating), context summary of the conversation, and an estimated wait time with animated progress bar. Auto-transitions to a "connected" state after the progress completes. No payload required.

**Payload Schema:**
```json
{}
// Hardcoded agent:
//   Name: Marie Laurent
//   Title: Senior Guest Relations
//   Languages: FR, EN, DE
//   Rating: 4.9 ★
// Context summary: auto-generated from conversation
// Estimated wait: animated progress bar
// Auto-transitions to "Connected" state
```

---

### 26. Trip Summary
**Label:** `TRIP_SUMMARY`
**Method:** `Widgets.tripSummary(booking)`

Comprehensive trip confirmation widget. Displays a header with confirmation number, a timeline view of all stay events, an itemized cost breakdown, a QR code placeholder for mobile check-in, and action buttons (Share Itinerary, Add to Calendar, Download PDF). Takes an optional booking object; defaults to hardcoded demo booking.

**Payload Schema:**
```json
{
  "confirmation": "#CH-2026-4892",
  // Confirmation number displayed in header
  "guest": "W. DuPont",
  // Guest name
  "room": "Riviera Suite",
  // Room type
  "dates": "Mar 28–30, 2026",
  // Stay dates
  "events": [
    { "time": "15:00", "day": "Mar 28", "label": "Check-in & Welcome Champagne" },
    { "time": "19:30", "day": "Mar 28", "label": "Dinner at Le Jardin" },
    { "time": "10:00", "day": "Mar 29", "label": "Spa Treatment" },
    { "time": "11:00", "day": "Mar 30", "label": "Check-out" }
  ],
  // Timeline events shown in chronological order
  "total": "€3,570"
  // Total cost displayed in breakdown section
}
// Defaults to demo booking if no payload provided
// Action buttons: Share Itinerary, Add to Calendar, Download PDF
// QR code placeholder for mobile check-in
```

---

## Quick Reference Table

| # | Widget Name | Method | Takes Payload? | Used In Flow |
|---|-------------|--------|----------------|--------------|
| 1 | Room Carousel | `roomCarousel(rooms)` | Yes — array | booking, vip |
| 2 | Booking Form | `bookingForm()` | No | booking, dining |
| 3 | Checkout Payment | `checkoutPayment(items)` | Yes — array | booking |
| 4 | Availability Calendar | `availabilityCalendar()` | No | spa |
| 5 | Price Comparison | `priceComparison()` | No | booking, events |
| 6 | Restaurant Menu | `restaurantMenu()` | No | dining |
| 7 | Wine List | `wineList()` | No | dining |
| 8 | Spa Treatment Picker | `spaTreatmentPicker()` | No | spa |
| 9 | Loyalty Program | `loyaltyProgram()` | No | spa, service |
| 10 | Weather Widget | `weatherWidget()` | No | concierge, explore |
| 11 | Experience Booking | `experienceBooking(exp)` | Yes — array | concierge |
| 12 | Itinerary Builder | `itineraryBuilder()` | No | concierge, explore |
| 13 | Map Widget | `mapWidget()` | No | explore |
| 14 | Virtual Tour | `virtualTour()` | No | (standalone) |
| 15 | Guest Preference Profile | `guestPreferenceProfile()` | No | dining, vip |
| 16 | FAQ Accordion | `faqAccordion()` | No | support |
| 17 | Reviews Widget | `reviewsWidget()` | No | support |
| 18 | Photo Gallery | `photoGallery(images)` | Yes — URL array | events |
| 19 | Event Inquiry Form | `eventInquiryForm()` | No | events |
| 20 | Language Toggle | `languageToggle()` | No | vip |
| 21 | Reservation Manager | `reservationManager()` | No | modify |
| 22 | Service Request | `serviceRequest()` | No | service |
| 23 | Local Discovery | `localDiscovery(places)` | Yes — array (optional) | explore |
| 24 | Upsell/Upgrade | `upsellUpgrade()` | No | modify, vip |
| 25 | Chat Transfer | `chatTransfer()` | No | (standalone) |
| 26 | Trip Summary | `tripSummary(booking)` | Yes — object (optional) | modify, vip |

---

## Demo Flow Reference

| Flow Name | Widgets Used (in order) |
|-----------|------------------------|
| `booking` | Room Carousel → Price Comparison → Booking Form → Checkout Payment |
| `concierge` | Weather → Experience Booking → Itinerary Builder |
| `dining` | Restaurant Menu → Wine List → Guest Preferences → Booking Form |
| `spa` | Spa Treatment Picker → Availability Calendar → Loyalty Program |
| `events` | Photo Gallery → Price Comparison → Event Inquiry Form |
| `support` | FAQ Accordion → Quick Actions (inline) → Reviews Widget |
| `modify` | Reservation Manager → Upsell/Upgrade → Trip Summary |
| `service` | Service Request → Loyalty Program |
| `explore` | Weather → Local Discovery → Map Widget → Itinerary Builder |
| `vip` | Guest Preferences → Room Carousel → Upsell/Upgrade → Trip Summary → Language Toggle |

---

*GECX Widget Reference v2.0 — Château de Huot Demo — March 2026*
