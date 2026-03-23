// demo-flows.js — All 6 demo conversation flows for Château de Huot
// Each flow is an array of step objects consumed by ChatEngine.playFlow()

const DemoFlows = {

  booking: [
    { type: 'divider', label: 'Suite Booking' },
    { type: 'bot', text: 'Welcome to Château de Huot. I have found exceptional availability for your dates. Allow me to present our finest accommodations.' },
    { type: 'widget', label: 'ROOM_CAROUSEL', content: () => Widgets.roomCarousel([
      { name: 'Riviera Suite', desc: 'Private pool · Sea view · 72 sqm', price: '€1,450/night', tag: 'Most popular', imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80' },
      { name: 'Garden Villa', desc: 'Private garden · 2 bedrooms · 95 sqm', price: '€1,150/night', tag: 'Families', imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80' },
      { name: 'Atelier Loft', desc: 'Harbor view · Loft design · 58 sqm', price: '€980/night', tag: 'Boutique', imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&q=80' },
    ]) },
    { type: 'bot', text: 'The Riviera Suite is our most celebrated accommodation — 72 sqm with a private plunge pool overlooking the Provençal hills. I can compare all suite tiers for you.' },
    { type: 'widget', label: 'PRICE_COMPARISON', content: () => Widgets.priceComparison() },
    { type: 'bot', text: 'Shall I hold the Riviera Suite? I can check exact availability for your dates right now.' },
    { type: 'widget', label: 'BOOKING_FORM', content: () => Widgets.bookingForm() },
    { type: 'bot', text: 'Perfect. Here is your reservation summary. Complete with our secure one-touch checkout.' },
    { type: 'widget', label: 'CHECKOUT_PAYMENT', content: () => Widgets.checkoutPayment([
      { name: 'Riviera Suite · 2 nights', price: '€2,900' },
      { name: 'Daily breakfast for two', price: '€120' },
      { name: 'Airport transfer', price: 'Complimentary' },
    ]) },
    { type: 'bot', text: 'Your reservation is confirmed. ✓ A confirmation has been sent to your email. We look forward to welcoming you.' },
  ],

  concierge: [
    { type: 'divider', label: 'Concierge' },
    { type: 'bot', text: 'Good morning. Let me pull today\'s conditions for Provence.' },
    { type: 'widget', label: 'WEATHER', content: () => Widgets.weatherWidget() },
    { type: 'bot', text: 'A beautiful 24°C day — ideal for outdoor experiences. Based on your preferences, here are my recommendations.' },
    { type: 'widget', label: 'EXPERIENCE_BOOKING', content: () => Widgets.experienceBooking([
      { name: 'Lavender Valley Tour', duration: '3 hours', price: '€180/person', desc: 'Private guided tour through Provence\'s finest lavender fields', imageUrl: 'https://images.unsplash.com/photo-1499578124509-1611b77778c8?w=400&q=80' },
      { name: 'Sunset Yacht Charter', duration: '3 hours', price: '€980/charter', desc: 'Private charter with sommelier and sunset aperitifs on the Côte d\'Azur', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80' },
      { name: 'Provençal Market & Cooking', duration: '4 hours', price: '€240/person', desc: 'Morning market with our chef, then a private cooking masterclass', imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80' },
    ]) },
    { type: 'bot', text: 'Allow me to build you a complete day itinerary around your chosen experience.' },
    { type: 'widget', label: 'ITINERARY_BUILDER', content: () => Widgets.itineraryBuilder() },
    { type: 'bot', text: 'Your day is beautifully arranged. Shall I confirm any of these bookings?' },
  ],

  dining: [
    { type: 'divider', label: 'Dining Reservation' },
    { type: 'bot', text: 'La Vérrière, our two-Michelin-star restaurant, has availability this evening. Allow me to present tonight\'s menu.' },
    { type: 'widget', label: 'RESTAURANT_MENU', content: () => Widgets.restaurantMenu() },
    { type: 'bot', text: 'Our sommelier has curated exceptional wine pairings for this evening\'s menu.' },
    { type: 'widget', label: 'WINE_LIST', content: () => Widgets.wineList() },
    { type: 'bot', text: 'I see from your profile that you prefer vegetarian selections and later dining. Shall I update your preferences?' },
    { type: 'widget', label: 'GUEST_PREFERENCES', content: () => Widgets.guestPreferenceProfile() },
    { type: 'widget', label: 'BOOKING_FORM', content: () => Widgets.bookingForm() },
    { type: 'bot', text: 'Table confirmed for 8pm at La Vérrière. Your sommelier has been notified of your wine selection. Bon appétit.' },
  ],

  spa: [
    { type: 'divider', label: 'Spa & Wellness' },
    { type: 'bot', text: 'The Château Spa offers an exceptional range of treatments. Allow me to present today\'s availability.' },
    { type: 'widget', label: 'SPA_TREATMENT_PICKER', content: () => Widgets.spaTreatmentPicker() },
    { type: 'bot', text: 'Excellent choice. Let me show you our treatment calendar.' },
    { type: 'widget', label: 'AVAILABILITY_CALENDAR', content: () => Widgets.availabilityCalendar() },
    { type: 'bot', text: 'Your Signature Massage at 3pm has been reserved. As a Gold loyalty member, you will also earn 180 points.' },
    { type: 'widget', label: 'LOYALTY_PROGRAM', content: () => Widgets.loyaltyProgram() },
  ],

  events: [
    { type: 'divider', label: 'Events & Private Dining' },
    { type: 'bot', text: 'Château de Huot hosts some of the most prestigious corporate and private events in Provence. Let me show you our venues.' },
    { type: 'widget', label: 'PHOTO_GALLERY', content: () => Widgets.photoGallery([
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=300&q=80',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=300&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=300&q=80',
      'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=300&q=80',
      'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=300&q=80',
      'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=300&q=80',
    ]) },
    { type: 'widget', label: 'PRICE_COMPARISON', content: () => Widgets.priceComparison() },
    { type: 'bot', text: 'Please share your event details and our dedicated events team will create a bespoke proposal.' },
    { type: 'widget', label: 'EVENT_INQUIRY_FORM', content: () => Widgets.eventInquiryForm() },
    { type: 'bot', text: 'Your inquiry has been submitted. Our events director will contact you within 2 hours with a tailored proposal.' },
  ],

  support: [
    { type: 'divider', label: 'Guest Services' },
    { type: 'bot', text: 'I am here to help. Please find answers to our most common questions below.' },
    { type: 'widget', label: 'FAQ_ACCORDION', content: () => Widgets.faqAccordion() },
    { type: 'bot', text: 'If your question is not covered, I can connect you directly with our guest services team.' },
    { type: 'widget', label: 'QUICK_ACTIONS', content: () => `
      <div class="quick-chips" style="margin-top:8px">
        <button data-quick="Escalate to front desk" class="quick-chip">🧑‍💼 Speak to front desk</button>
        <button data-quick="Request billing review" class="quick-chip">📋 Billing review</button>
        <button data-quick="Contact concierge" class="quick-chip">🔔 Concierge</button>
        <button data-quick="Emergency assistance" class="quick-chip">🚨 Emergency</button>
      </div>
    ` },
    { type: 'bot', text: 'I have notified our guest services team. Someone will reach you within 5 minutes. In the meantime, would you like to share your experience?' },
    { type: 'widget', label: 'REVIEWS_WIDGET', content: () => Widgets.reviewsWidget() },
  ],

  modify: [
    { type: 'divider', label: 'Modify Reservation' },
    { type: 'bot', text: 'Welcome back, Mr. DuPont. I can see your upcoming reservation. Let me pull up the details.' },
    { type: 'widget', label: 'RESERVATION_MANAGER', content: () => Widgets.reservationManager() },
    { type: 'bot', text: 'I see you\'re considering extending your stay — excellent choice. May I suggest some enhancements to make it even more memorable?' },
    { type: 'widget', label: 'UPSELL_UPGRADE', content: () => Widgets.upsellUpgrade() },
    { type: 'bot', text: 'Wonderful selections. Here is your updated trip summary with all modifications.' },
    { type: 'widget', label: 'TRIP_SUMMARY', content: () => Widgets.tripSummary() },
    { type: 'bot', text: 'All changes have been saved. You will receive an updated confirmation email shortly. Is there anything else I can arrange?' },
  ],

  service: [
    { type: 'divider', label: 'Room Service' },
    { type: 'bot', text: 'Good evening, Mr. DuPont. Room 412, Riviera Suite. How may I assist you this evening?' },
    { type: 'widget', label: 'SERVICE_REQUEST', content: () => Widgets.serviceRequest() },
    { type: 'bot', text: 'Your order has been received. Our kitchen is preparing your selections now. You can track the progress below.' },
    { type: 'bot', text: 'Your dinner will arrive in approximately 25 minutes. As a Gold member, you\'ve earned 45 loyalty points for this order.' },
    { type: 'widget', label: 'LOYALTY_PROGRAM', content: () => Widgets.loyaltyProgram() },
    { type: 'bot', text: 'Excellent. Is there anything else I can arrange for your evening? Perhaps a turndown service at 9pm?' },
  ],

  explore: [
    { type: 'divider', label: 'Local Discovery' },
    { type: 'bot', text: 'Let me check today\'s conditions for you first.' },
    { type: 'widget', label: 'WEATHER', content: () => Widgets.weatherWidget() },
    { type: 'bot', text: 'A perfect day to explore! Here are the best spots near the château, curated by our concierge team.' },
    { type: 'widget', label: 'LOCAL_DISCOVERY', content: () => Widgets.localDiscovery() },
    { type: 'bot', text: 'Wonderful choices. Let me show you where everything is on the map.' },
    { type: 'widget', label: 'MAP_WIDGET', content: () => Widgets.mapWidget() },
    { type: 'bot', text: 'I\'ve added your selections to today\'s itinerary. Here\'s your updated day plan.' },
    { type: 'widget', label: 'ITINERARY_BUILDER', content: () => Widgets.itineraryBuilder() },
    { type: 'bot', text: 'Shall I reserve a table at any of the nearby restaurants for dinner this evening?' },
  ],

  vip: [
    { type: 'divider', label: 'VIP Guest Welcome' },
    { type: 'bot', text: 'Welcome back, Mr. DuPont! How wonderful to see you again. Your third visit — you\'re becoming part of the Château family.' },
    { type: 'widget', label: 'GUEST_PREFERENCES', content: () => Widgets.guestPreferenceProfile() },
    { type: 'bot', text: 'Your usual suite — the Riviera — is available for your dates. I\'ve already noted your preferences: firm pillows, room at 20°C, and vegetarian dining.' },
    { type: 'widget', label: 'ROOM_CAROUSEL', content: () => Widgets.roomCarousel([
      { name: 'Riviera Suite', desc: 'Your preferred suite · Private pool · 72 sqm', price: '€1,450/night', tag: '★ Your Suite', imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80' },
      { name: 'Garden Villa', desc: 'Private garden · 2 bedrooms · 95 sqm', price: '€1,150/night', tag: 'Families', imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80' },
      { name: 'Atelier Loft', desc: 'Harbor view · Loft design · 58 sqm', price: '€980/night', tag: 'Boutique', imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&q=80' },
    ]) },
    { type: 'bot', text: 'Last time you enjoyed our Couples Ritual at the spa. Shall I book that again? I also have some exclusive enhancements for returning guests.' },
    { type: 'widget', label: 'UPSELL_UPGRADE', content: () => Widgets.upsellUpgrade() },
    { type: 'bot', text: 'Everything is arranged. Here\'s your complete trip summary with all the personalised touches.' },
    { type: 'widget', label: 'TRIP_SUMMARY', content: () => Widgets.tripSummary() },
    { type: 'widget', label: 'LANGUAGE_TOGGLE', content: () => Widgets.languageToggle() },
    { type: 'bot', text: 'We are delighted to welcome you home, Mr. DuPont. À bientôt!' },
  ],

};

window.DemoFlows = DemoFlows;
