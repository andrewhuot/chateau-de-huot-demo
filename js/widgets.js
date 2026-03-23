// widgets.js — All 20 GECX widget renderers for Château de Huot
// Each function returns an HTML string. Called by demo-flows.js via Widgets.*

const Widgets = {

  // 1. Room Carousel
  roomCarousel(rooms) {
    const cards = rooms.map((room, i) => `
      <div class="room-card room-card-enter" style="animation-delay:${i * 100}ms">
        <div class="room-card-img">
          <img src="${room.imageUrl}" alt="${room.name}" loading="lazy" />
          ${room.tag ? `<span class="room-tag">${room.tag}</span>` : ''}
          <span class="room-tour-badge">360\u00B0 Tour</span>
        </div>
        <div class="room-card-body">
          <div class="room-name">${room.name}</div>
          <div class="room-desc">${room.desc}</div>
          <div class="room-footer">
            <span class="room-price">${room.price}</span>
            <button class="btn-gold-sm" data-flow="booking" data-quick="I'd like to book the ${room.name}">Reserve</button>
          </div>
          <label class="room-compare-label">
            <input type="checkbox" class="room-compare-checkbox" data-room-name="${room.name}" data-room-price="${room.price}" />
            <span class="room-compare-text">Compare</span>
          </label>
        </div>
      </div>
    `).join('');
    return `
      <div class="w-room-carousel">
        <div class="room-scroll-track">${cards}</div>
        <div class="room-scroll-hint">\u2190 Scroll \u2192</div>
        <div class="room-compare-summary" style="display:none;"></div>
      </div>
    `;
  },

  // 2. Booking Form
  bookingForm() {
    const today = new Date();
    const nextFri = new Date(today);
    nextFri.setDate(today.getDate() + ((5 - today.getDay() + 7) % 7 || 7));
    const nextSat = new Date(nextFri);
    nextSat.setDate(nextFri.getDate() + 1);
    const fmt = d => d.toISOString().split('T')[0];

    return `
      <div class="w-booking-form">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Check-in</label>
            <input type="date" class="form-input" value="${fmt(nextFri)}" />
          </div>
          <div class="form-group">
            <label class="form-label">Check-out</label>
            <input type="date" class="form-input" value="${fmt(nextSat)}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Room Type</label>
            <select class="form-input form-select">
              <option>Riviera Suite</option>
              <option>Garden Villa</option>
              <option>Atelier Loft</option>
              <option>Deluxe Room</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Guests</label>
            <div class="stepper">
              <button class="stepper-minus">−</button>
              <span class="stepper-value">2</span>
              <button class="stepper-plus">+</button>
            </div>
          </div>
        </div>
        <button class="btn-gold booking-confirm-btn">Confirm Reservation</button>
        <div class="booking-confirmed" style="display:none;">
          <div class="booking-confirmed-inner">
            <span class="confirmed-check">✓</span>
            <span>Reservation confirmed — a summary has been sent to your email.</span>
          </div>
        </div>
      </div>
    `;
  },

  // 3. Restaurant Menu
  restaurantMenu() {
    const lunch = [
      { icon: '🌿', name: 'Salade de Provence', desc: 'Heirloom tomatoes, lavender honey dressing, aged goat cheese', price: '€28' },
      { icon: '🐟', name: 'Filet de Daurade', desc: 'Sea bream, fennel purée, saffron beurre blanc, micro herbs', price: '€38' },
      { icon: '🥩', name: 'Côte de Veau', desc: 'Milk-fed veal, morel jus, pomme purée, haricots verts', price: '€46' },
    ];
    const dinner = [
      { icon: '🌿', name: 'Velouté d\'Artichaut', desc: 'Artichoke velouté, truffle oil, crispy capers, chive cream', price: '€34' },
      { icon: '🐟', name: 'Homard Bleu Rôti', desc: 'Brittany lobster, tarragon bisque, golden caviar, brioche', price: '€78' },
      { icon: '🥩', name: 'Pigeon de Bresse', desc: 'Roasted Bresse pigeon, black garlic, beetroot, thyme jus', price: '€62' },
    ];
    const wine = [
      { icon: '🍷', name: 'Château Margaux 2016', desc: 'Médoc, full-bodied, notes of cassis, cedar and violet', price: '€320/bottle' },
      { icon: '🍾', name: 'Puligny-Montrachet 2019', desc: 'Burgundy Blanc, mineral, honeysuckle, long finish', price: '€180/bottle' },
      { icon: '🥂', name: 'Château Pétrus 2015', desc: 'Pomerol, plush, mocha and dark cherry, exceptional depth', price: '€980/bottle' },
    ];

    const renderItems = items => items.map(item => `
      <div class="menu-item">
        <div class="menu-item-header">
          <span class="menu-icon">${item.icon}</span>
          <span class="menu-name">${item.name}</span>
          <span class="menu-price">${item.price}</span>
        </div>
        <div class="menu-desc">${item.desc}</div>
      </div>
    `).join('');

    return `
      <div class="w-restaurant-menu" data-tabs-container>
        <div class="widget-tabs">
          <button class="tab-btn active" data-tab="lunch">Lunch</button>
          <button class="tab-btn" data-tab="dinner">Dinner</button>
          <button class="tab-btn" data-tab="wine">Wine</button>
        </div>
        <div class="tab-panel active" data-panel="lunch">${renderItems(lunch)}</div>
        <div class="tab-panel" data-panel="dinner">${renderItems(dinner)}</div>
        <div class="tab-panel" data-panel="wine">${renderItems(wine)}</div>
        <button class="btn-navy" style="margin-top:12px" data-flow="dining" data-quick="I'd like to reserve a table for dinner">Reserve a Table</button>
      </div>
    `;
  },

  // 4. Spa Treatment Picker
  spaTreatmentPicker() {
    const treatments = [
      { category: 'Massage', name: 'Signature Massage', duration: '90 min', price: '€180', times: ['10:00', '12:00', '14:00', '16:00'] },
      { category: 'Facial', name: 'Riviera Facial', duration: '60 min', price: '€150', times: ['10:00', '12:00', '14:00', '16:00'] },
      { category: 'Ritual', name: 'Couples Ritual', duration: '120 min', price: '€380', times: ['10:00', '12:00', '14:00', '16:00'] },
      { category: 'Scrub', name: 'Provençal Body Scrub', duration: '45 min', price: '€120', times: ['10:00', '12:00', '14:00', '16:00'] },
    ];
    const cards = treatments.map(t => `
      <div class="spa-card">
        <div class="spa-card-top">
          <span class="spa-category-pill">${t.category}</span>
          <span class="spa-duration-badge">${t.duration}</span>
        </div>
        <div class="spa-name">${t.name}</div>
        <div class="spa-price">${t.price}</div>
        <select class="form-input spa-time-select">
          ${t.times.map(time => `<option value="${time}">${time}</option>`).join('')}
        </select>
        <button class="btn-gold-sm spa-book-btn">Book</button>
      </div>
    `).join('');
    return `<div class="w-spa-picker"><div class="spa-grid">${cards}</div></div>`;
  },

  // 5. Experience Booking
  experienceBooking(experiences) {
    const today = new Date();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayBtns = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i + 1);
      return `<button class="day-btn${i === 0 ? ' active' : ''}" data-date="${d.toISOString().split('T')[0]}">
        <span class="day-name">${dayNames[d.getDay()]}</span>
        <span class="day-num">${d.getDate()}</span>
      </button>`;
    }).join('');

    const cards = experiences.map(exp => `
      <div class="exp-card">
        <img src="${exp.imageUrl}" alt="${exp.name}" class="exp-img" loading="lazy" />
        <div class="exp-body">
          <div class="exp-name">${exp.name}</div>
          <div class="exp-desc">${exp.desc}</div>
          <div class="exp-meta">
            <span class="exp-duration">⏱ ${exp.duration}</span>
            <span class="exp-price">${exp.price}</span>
          </div>
          <button class="btn-gold-sm exp-book-btn">Book Now</button>
        </div>
      </div>
    `).join('');

    return `
      <div class="w-experience-booking">
        <div class="exp-date-row">${dayBtns}</div>
        <div class="form-group" style="margin:8px 0">
          <label class="form-label">Group Size</label>
          <div class="stepper">
            <button class="stepper-minus">−</button>
            <span class="stepper-value">2</span>
            <button class="stepper-plus">+</button>
          </div>
        </div>
        <div class="exp-cards">${cards}</div>
      </div>
    `;
  },

  // 6. Map Widget
  mapWidget() {
    const attractions = [
      { name: 'Old Town', distance: '0.5 km', walk: '6 min' },
      { name: 'Morning Market', distance: '0.8 km', walk: '10 min' },
      { name: 'Lavender Fields', distance: '2.0 km', walk: '25 min' },
      { name: 'Yacht Club', distance: '1.2 km', walk: '15 min' },
    ];
    return `
      <div class="w-map" data-tabs-container>
        <div class="map-toggle-tabs widget-tabs">
          <button class="tab-btn map-toggle-btn active" data-tab="map-view">Map View</button>
          <button class="tab-btn map-toggle-btn" data-tab="list-view">List View</button>
        </div>
        <div class="tab-panel active" data-panel="map-view">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=5.35%2C43.28%2C5.40%2C43.32&layer=mapnik&marker=43.30%2C5.37"
            style="width:100%;height:180px;border:none;border-radius:8px;"
            loading="lazy">
          </iframe>
        </div>
        <div class="tab-panel" data-panel="list-view">
          <div class="map-distances">
            ${attractions.map(a => `
              <div class="map-attraction">
                <span class="map-attraction-name">${a.name}</span>
                <span class="map-walk-time">${a.walk}</span>
                <span class="map-distance-badge">${a.distance}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <a href="https://maps.google.com" target="_blank" class="btn-navy btn-sm" style="margin-top:10px;display:inline-block;">Open in Google Maps</a>
      </div>
    `;
  },

  // 7. Weather Widget
  weatherWidget() {
    const forecast = [
      { day: 'Mon', icon: '☀️', high: 26, low: 18 },
      { day: 'Tue', icon: '🌤', high: 23, low: 16 },
      { day: 'Wed', icon: '⛅', high: 21, low: 14 },
      { day: 'Thu', icon: '☀️', high: 25, low: 17 },
      { day: 'Fri', icon: '☀️', high: 27, low: 19 },
    ];
    return `
      <div class="w-weather">
        <div class="weather-current">
          <div class="weather-location">Provence, France</div>
          <div class="weather-main">
            <span class="weather-icon-lg">☀️</span>
            <span class="weather-temp">24°C</span>
          </div>
          <div class="weather-condition">Sunny · Wind 12 km/h · Humidity 48%</div>
        </div>
        <div class="weather-forecast">
          ${forecast.map(d => `
            <div class="forecast-day">
              <span class="forecast-name">${d.day}</span>
              <span class="forecast-icon">${d.icon}</span>
              <span class="forecast-high">${d.high}°</span>
              <span class="forecast-low">${d.low}°</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // 8. Photo Gallery
  photoGallery(images) {
    const primary = images.slice(0, 4);
    const hidden = images.slice(4);
    const renderImg = url => `
      <div class="gallery-item">
        <img src="${url}" alt="Château de Huot" loading="lazy" />
        <div class="gallery-item-overlay">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
    `;
    return `
      <div class="w-gallery">
        <div class="gallery-grid">${primary.map(renderImg).join('')}</div>
        ${hidden.length > 0 ? `
          <div class="gallery-grid-hidden">${hidden.map(renderImg).join('')}</div>
          <button class="gallery-view-more">View more</button>
        ` : ''}
      </div>
    `;
  },

  // 9. Reviews Widget
  reviewsWidget() {
    const reviews = [
      { initials: 'SM', name: 'Sophie M.', city: 'Paris', stars: 5, text: 'The most transcendent stay of my life. Every detail anticipates what you need before you know you need it.', date: 'Jan 2026' },
      { initials: 'JT', name: 'James T.', city: 'London', stars: 5, text: 'The Riviera Suite private pool at dawn — simply extraordinary. A memory I will carry for life.', date: 'Dec 2025' },
      { initials: 'ML', name: 'Mei L.', city: 'Singapore', stars: 5, text: 'Impeccable service, flawless cuisine, and a team that makes every guest feel like the only guest. Will return every year.', date: 'Nov 2025' },
    ];
    return `
      <div class="w-reviews">
        ${reviews.map(r => `
          <div class="review-card">
            <div class="review-header">
              <div class="review-avatar">${r.initials}</div>
              <div class="review-meta">
                <div class="review-name">${r.name} <span class="review-city">· ${r.city}</span></div>
                <div class="review-stars">${'★'.repeat(r.stars)}</div>
              </div>
              <div class="review-verified">✓ Verified Stay · ${r.date}</div>
            </div>
            <p class="review-text">"${r.text}"</p>
          </div>
        `).join('')}
        <div class="reviews-aggregate">
          <span class="agg-score">5.0</span>
          <span class="agg-stars">★★★★★</span>
          <span class="agg-count">Exceptional · 312 reviews</span>
        </div>
      </div>
    `;
  },

  // 10. FAQ Accordion
  faqAccordion() {
    const faqs = [
      {
        q: 'What are the check-in and check-out times?',
        a: 'Check-in is from 3:00 PM and check-out is by 12:00 PM. Early check-in and late check-out are available upon request, subject to availability. Riviera Suite guests receive complimentary late check-out until 2:00 PM.'
      },
      {
        q: 'Is airport transfer included?',
        a: 'Complimentary private airport transfer is included for Riviera Suite and Garden Villa bookings. Transfers are by Mercedes S-Class or similar. For other room types, transfers are available at €120 each way.'
      },
      {
        q: 'Do you accommodate dietary restrictions?',
        a: 'Absolutely. Our kitchen can accommodate all dietary requirements including vegetarian, vegan, gluten-free, and allergy-specific menus. Please notify us at least 48 hours prior to arrival so our chef can prepare accordingly.'
      },
      {
        q: 'What is your cancellation policy?',
        a: 'Cancellations made 14 or more days prior to arrival receive a full refund. Cancellations 7–13 days prior receive a 50% refund. Within 7 days, stays are non-refundable. Travel insurance is strongly recommended.'
      },
      {
        q: 'Is the spa open to day visitors?',
        a: 'The Château Spa is exclusively reserved for hotel guests. This ensures a private, unhurried atmosphere for all guests. Spa access is included with all suite categories. Individual treatments can be booked via the concierge.'
      },
    ];
    return `
      <div class="w-faq">
        ${faqs.map((faq, i) => `
          <div class="faq-item${i === 0 ? ' open' : ''}">
            <div class="faq-item-header">
              <span class="faq-question">${faq.q}</span>
              <span class="faq-chevron">›</span>
            </div>
            <div class="faq-item-body">
              <p>${faq.a}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  // 11. Price Comparison
  priceComparison() {
    const rows = [
      { label: 'Size', riviera: '72 sqm', villa: '95 sqm', loft: '58 sqm', deluxe: '42 sqm' },
      { label: 'View', riviera: 'Sea & hills', villa: 'Private garden', loft: 'Harbor', deluxe: 'Courtyard' },
      { label: 'Private Pool', riviera: '✓', villa: '✓', loft: '—', deluxe: '—' },
      { label: 'Breakfast', riviera: 'Included', villa: 'Included', loft: '+ €45/day', deluxe: '+ €45/day' },
      { label: 'Transfer', riviera: 'Complimentary', villa: 'Complimentary', loft: '+ €120', deluxe: '+ €120' },
      { label: 'From', riviera: '€1,450/night', villa: '€1,150/night', loft: '€980/night', deluxe: '€680/night' },
    ];
    return `
      <div class="w-price-comparison">
        <table class="comparison-table">
          <thead>
            <tr>
              <th></th>
              <th class="col-highlight">Riviera Suite</th>
              <th>Garden Villa</th>
              <th>Atelier Loft</th>
              <th>Deluxe Room</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map(row => `
              <tr>
                <td class="row-label">${row.label}</td>
                <td class="col-highlight">${row.riviera}</td>
                <td>${row.villa}</td>
                <td>${row.loft}</td>
                <td>${row.deluxe}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  // 12. Loyalty Program
  loyaltyProgram() {
    const points = 1847;
    const tierMax = 2500;
    const pct = Math.round((points / tierMax) * 100);
    const rewards = [
      { name: 'Late Check-out', cost: 800, redeemable: true },
      { name: 'Spa Credit €50', cost: 1200, redeemable: true },
      { name: 'Complimentary Night', cost: 2500, redeemable: false },
    ];
    return `
      <div class="w-loyalty">
        <div class="loyalty-header">
          <div class="loyalty-avatar">WD</div>
          <div class="loyalty-info">
            <div class="loyalty-name">W. DuPont</div>
            <div class="loyalty-tier">Gold Member</div>
          </div>
          <div class="loyalty-points-display">
            <span class="loyalty-pts">${points.toLocaleString()}</span>
            <span class="loyalty-pts-label">pts</span>
          </div>
        </div>
        <div class="loyalty-progress-section">
          <div class="loyalty-progress-label">
            <span>Gold</span>
            <span>${points.toLocaleString()} / ${tierMax.toLocaleString()} pts to Platinum</span>
          </div>
          <div class="loyalty-progress-bar">
            <div class="loyalty-progress-fill" style="width:${pct}%"></div>
          </div>
        </div>
        <div class="loyalty-rewards">
          <div class="loyalty-rewards-title">Redeem Points</div>
          ${rewards.map(r => `
            <div class="reward-row">
              <span class="reward-name">${r.name}</span>
              <span class="reward-cost">${r.cost.toLocaleString()} pts</span>
              <button class="btn-gold-sm" ${!r.redeemable ? 'disabled style="opacity:0.4"' : ''}>
                ${r.redeemable ? 'Redeem' : 'Need more'}
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // 13. Event Inquiry Form
  eventInquiryForm() {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    const fmt = d => d.toISOString().split('T')[0];

    return `
      <div class="w-event-inquiry">
        <div class="form-group">
          <label class="form-label">Event Type</label>
          <select class="form-input form-select">
            <option>Corporate Retreat</option>
            <option>Wedding</option>
            <option>Gala Dinner</option>
            <option>Private Dinner</option>
            <option>Conference</option>
          </select>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Date</label>
            <input type="date" class="form-input" value="${fmt(nextMonth)}" />
          </div>
          <div class="form-group">
            <label class="form-label">Guest Count</label>
            <input type="number" class="form-input" value="50" min="10" max="500" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Special Requirements</label>
          <textarea class="form-input form-textarea" rows="3" placeholder="Dietary needs, AV equipment, décor preferences, theme..."></textarea>
        </div>
        <button class="btn-navy event-inquiry-submit">Submit Inquiry</button>
        <div class="event-inquiry-confirmed" style="display:none;">
          <div class="booking-confirmed-inner">
            <span class="confirmed-check">✓</span>
            <span>Our events team will contact you within 2 hours with a bespoke proposal.</span>
          </div>
        </div>
      </div>
    `;
  },

  // 14. Wine List
  wineList() {
    const reds = [
      { name: 'Château Pétrus 2015', region: 'Pomerol, Bordeaux', vintage: '2015', notes: 'Opulent and silky. Black cherry, mocha, cassis. Exceptional length and elegance. Drink 2025–2040.', price: '€980' },
      { name: 'Domaine Leroy Gevrey 2018', region: 'Burgundy', vintage: '2018', notes: 'Biodynamic. Raspberry, violets, iron minerality. Silk-textured with a profound finish. Highly allocated.', price: '€480' },
      { name: 'Guigal Côte-Rôtie La Mouline', region: 'Northern Rhône', vintage: '2017', notes: 'Legendary single-vineyard Syrah. Smoked meat, black olive, violets. Voluptuous and long.', price: '€320' },
    ];
    const whites = [
      { name: 'Puligny-Montrachet 1er Cru 2019', region: 'Burgundy', vintage: '2019', notes: 'Honeysuckle, white peach, and a flinty mineral spine. Pristine Chardonnay with exceptional precision.', price: '€180' },
      { name: 'Domaine Weinbach Riesling 2020', region: 'Alsace', vintage: '2020', notes: 'Off-dry, citrus blossom, petrol complexity, vivid acidity. Perfect with the sea bream.', price: '€120' },
      { name: 'Château Haut-Brion Blanc 2018', region: 'Pessac-Léognan, Bordeaux', vintage: '2018', notes: 'Sauvignon Blanc and Sémillon. Smoke, lime zest, wax. Extraordinarily complex and rare.', price: '€650' },
    ];
    const roses = [
      { name: 'Domaines Ott Clos Mireille 2022', region: 'Côtes de Provence', vintage: '2022', notes: 'The reference rosé of Provence. Peach blossom, white strawberry, dry and elegant. Iconic bottle.', price: '€95' },
      { name: 'Château d\'Esclans Garrus 2021', region: 'Côtes de Provence', vintage: '2021', notes: 'The world\'s most expensive rosé. Aged in oak. Brioche, nectarine, extraordinary body.', price: '€140' },
      { name: 'Miraval 2023', region: 'Côtes de Provence', vintage: '2023', notes: 'Brad Pitt and Guillaume Perrin. Pale salmon, fresh red fruit, crisp finish. Exceptional value.', price: '€65' },
    ];
    const champagnes = [
      { name: 'Krug Grande Cuvée NV', region: 'Champagne', vintage: 'NV', notes: 'Multi-vintage masterpiece. Brioche, toasted hazelnut, dried apricot. The benchmark of prestige.', price: '€220' },
      { name: 'Dom Pérignon 2013', region: 'Épernay, Champagne', vintage: '2013', notes: 'Exceptional vintage. White flowers, brioche, chalk minerality. Pinpoint precision and length.', price: '€280' },
      { name: 'Cristal Roederer 2015', region: 'Reims, Champagne', vintage: '2015', notes: 'Gold in the glass. Lemon curd, almond paste, and a silky mousse. Iconic and celebratory.', price: '€340' },
    ];

    const renderWines = wines => wines.map(w => `
      <div class="wine-item">
        <div class="wine-header">
          <span class="wine-name">${w.name}</span>
          <span class="wine-price">${w.price}</span>
        </div>
        <div class="wine-meta">${w.region} · ${w.vintage}</div>
        <div class="wine-notes">${w.notes}</div>
        <button class="btn-gold-sm wine-add-btn" style="margin-top:6px">Add to reservation</button>
      </div>
    `).join('');

    return `
      <div class="w-wine-list" data-tabs-container>
        <div class="widget-tabs">
          <button class="tab-btn active" data-tab="red">Red</button>
          <button class="tab-btn" data-tab="white">White</button>
          <button class="tab-btn" data-tab="rose">Rosé</button>
          <button class="tab-btn" data-tab="champagne">Champagne</button>
        </div>
        <div class="tab-panel active" data-panel="red">${renderWines(reds)}</div>
        <div class="tab-panel" data-panel="white">${renderWines(whites)}</div>
        <div class="tab-panel" data-panel="rose">${renderWines(roses)}</div>
        <div class="tab-panel" data-panel="champagne">${renderWines(champagnes)}</div>
      </div>
    `;
  },

  // 15. Checkout Payment
  checkoutPayment(items) {
    const subtotal = items
      .filter(item => item.price.startsWith('€'))
      .reduce((sum, item) => sum + parseFloat(item.price.replace('€', '').replace(',', '')), 0);
    const tax = 47;
    const total = subtotal + tax;

    return `
      <div class="w-checkout">
        <div class="checkout-order-summary">
          ${items.map(item => `
            <div class="checkout-line">
              <span class="checkout-item-name">${item.name}</span>
              <span class="checkout-item-price">${item.price}</span>
            </div>
          `).join('')}
          <div class="checkout-separator"></div>
          <div class="checkout-line">
            <span class="checkout-item-name">Subtotal</span>
            <span class="checkout-item-price">€${subtotal.toLocaleString()}</span>
          </div>
          <div class="checkout-line">
            <span class="checkout-item-name">Taxes &amp; fees</span>
            <span class="checkout-item-price">€${tax}</span>
          </div>
          <div class="checkout-line checkout-total">
            <span>Total</span>
            <span>€${(total).toLocaleString()}</span>
          </div>
        </div>
        <button class="gpay-btn">
          <svg width="41" height="17" viewBox="0 0 41 17" xmlns="http://www.w3.org/2000/svg"><path d="M19.65 8.52c0 3.71-2.9 6.48-6.5 6.48C9.55 15 6.65 12.23 6.65 8.52 6.65 4.79 9.55 2 13.15 2c1.93 0 3.51.72 4.74 1.9l-1.92 1.92C15.07 4.97 14.22 4.53 13.15 4.53c-2.35 0-4.04 1.9-4.04 3.99 0 2.09 1.69 3.99 4.04 3.99 2.57 0 3.56-1.84 3.71-2.79h-3.71V7.43h6.31c.06.35.09.71.09 1.09z" fill="#4285F4"/><path d="M32.97 7.43h-1.61V5.82h-1.61v1.61H28.1v1.61h1.65v1.61h1.61V9.04h1.61z" fill="#34A853"/><path d="M38.63 5.82h-5.66v1.61h3.9c-.19 1.06-1.12 1.83-2.22 1.83-1.26 0-2.28-1.02-2.28-2.28s1.02-2.28 2.28-2.28c.6 0 1.15.24 1.56.62l1.14-1.14A3.89 3.89 0 0 0 34.65 3c-2.15 0-3.89 1.75-3.89 3.9s1.74 3.9 3.89 3.9c2.25 0 3.74-1.58 3.74-3.8 0-.25-.03-.5-.06-.74l-.3.56z" fill="#FBBC05"/></svg>
          Pay
        </button>
        <div class="checkout-trust">🔒 Secure checkout powered by GECX Pay</div>
      </div>
    `;
  },

  // 16. Virtual Tour
  virtualTour() {
    const rooms = [
      { value: 'suite', label: 'Suite', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=70&fit=crop' },
      { value: 'villa', label: 'Villa', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=70&fit=crop' },
      { value: 'loft', label: 'Loft', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=70&fit=crop' },
      { value: 'spa', label: 'Spa', img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=70&fit=crop' },
      { value: 'restaurant', label: 'Restaurant', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=70&fit=crop' },
    ];
    const hotspots = [
      { label: 'Pool Terrace', top: '25%', left: '70%', desc: 'Heated infinity pool with panoramic valley views.', thumb: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=120&q=60&fit=crop' },
      { label: 'Suite Interior', top: '40%', left: '20%', desc: 'King-size bed, marble bath, private balcony.', thumb: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=120&q=60&fit=crop' },
      { label: 'Garden', top: '65%', left: '55%', desc: 'Manicured French gardens with lavender walkways.', thumb: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=120&q=60&fit=crop' },
      { label: 'Dining Room', top: '30%', left: '45%', desc: 'Two-Michelin-star restaurant seating 40 guests.', thumb: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=120&q=60&fit=crop' },
      { label: 'Spa', top: '60%', left: '25%', desc: 'Full-service spa with sauna, hammam, and treatment rooms.', thumb: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=120&q=60&fit=crop' },
    ];
    return `
      <div class="w-virtual-tour">
        <div class="tour-room-selector">
          <select class="tour-room-select form-input form-select">
            ${rooms.map(r => `<option value="${r.value}" data-img="${r.img}">${r.label}</option>`).join('')}
          </select>
        </div>
        <div class="tour-viewport tour-ambient-bg">
          <div class="tour-bg-label">360\u00B0 Virtual Tour</div>
          ${hotspots.map(h => `
            <div class="tour-hotspot" style="top:${h.top};left:${h.left};">
              <div class="hotspot-dot"></div>
              <div class="hotspot-tooltip">${h.label}</div>
              <div class="hotspot-detail-panel">
                <img src="${h.thumb}" alt="${h.label}" class="hotspot-detail-img" />
                <div class="hotspot-detail-name">${h.label}</div>
                <div class="hotspot-detail-desc">${h.desc}</div>
              </div>
            </div>
          `).join('')}
        </div>
        <button class="btn-navy tour-open-btn" style="margin-top:10px;width:100%">Open Full Tour</button>
      </div>
    `;
  },

  // 17. Itinerary Builder
  itineraryBuilder() {
    const slots = [
      {
        label: 'Morning',
        time: '9:00 AM – 12:00 PM',
        activities: ['Market Visit', 'Lavender Tour', 'Morning Yoga']
      },
      {
        label: 'Afternoon',
        time: '1:00 PM – 5:00 PM',
        activities: ['Wine Tasting', 'Côte d\'Azur Drive', 'Art Gallery Tour']
      },
      {
        label: 'Evening',
        time: '6:00 PM onwards',
        activities: ['Sunset Sail', 'Spa Treatment', 'Private Dinner']
      },
    ];
    return `
      <div class="w-itinerary">
        ${slots.map(slot => `
          <div class="itinerary-section">
            <div class="itinerary-slot-header">
              <span class="slot-label">${slot.label}</span>
              <span class="slot-time">${slot.time}</span>
            </div>
            <div class="slot-drop-zone">
              <span class="slot-placeholder">Tap an activity below to add</span>
            </div>
            <div class="activity-chips">
              ${slot.activities.map(act => `
                <button class="activity-chip">${act}</button>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  // 18. Availability Calendar
  availabilityCalendar() {
    const now = new Date(2026, 1, 1); // Feb 2026
    const year = now.getFullYear();
    const month = now.getMonth();
    const monthName = now.toLocaleString('en-US', { month: 'long' });
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const available = new Set([3, 5, 7, 9, 12, 19, 22, 26]);
    const limited = new Set([4, 6, 10, 14, 17, 24]);
    const soldOut = new Set([1, 2, 15, 16]);

    let cells = '';
    for (let i = 0; i < firstDay; i++) {
      cells += '<div class="cal-cell cal-empty"></div>';
    }
    for (let d = 1; d <= daysInMonth; d++) {
      let cls = 'cal-date';
      let price = '';
      if (soldOut.has(d)) { cls += ' sold-out'; price = 'Sold out'; }
      else if (limited.has(d)) { cls += ' limited'; price = '€1,650'; }
      else if (available.has(d)) { cls += ' available'; price = '€1,450'; }
      else { cls += ' unavailable'; }
      cells += `<div class="${cls}" data-date="${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}">
        <span class="cal-day-num">${d}</span>
        ${price ? `<span class="cal-price">${price}</span>` : ''}
      </div>`;
    }

    return `
      <div class="w-calendar">
        <div class="cal-header">
          <span class="cal-month">${monthName} ${year}</span>
        </div>
        <div class="cal-legend">
          <span class="legend-dot available-dot"></span><span>Available</span>
          <span class="legend-dot limited-dot"></span><span>Limited</span>
          <span class="legend-dot sold-dot"></span><span>Sold out</span>
        </div>
        <div class="cal-grid">
          <div class="cal-weekday">Su</div><div class="cal-weekday">Mo</div><div class="cal-weekday">Tu</div>
          <div class="cal-weekday">We</div><div class="cal-weekday">Th</div><div class="cal-weekday">Fr</div>
          <div class="cal-weekday">Sa</div>
          ${cells}
        </div>
        <div class="cal-booking-trigger" style="display:none;margin-top:10px;">
          <button class="btn-gold" data-flow="booking" data-quick="I'd like to book the Riviera Suite for my selected dates">Continue to Booking</button>
        </div>
      </div>
    `;
  },

  // 19. Guest Preference Profile
  guestPreferenceProfile() {
    const prefs = [
      { label: 'Dietary', value: 'Vegetarian' },
      { label: 'Room Temp', value: '20°C' },
      { label: 'Pillow', value: 'Firm' },
      { label: 'Language', value: 'English' },
      { label: 'Late Dining', value: 'Yes' },
    ];
    return `
      <div class="w-preferences">
        <div class="pref-header">
          <div class="pref-avatar">WD</div>
          <div class="pref-identity">
            <div class="pref-name">W. DuPont</div>
            <div class="pref-tier">Gold Member · Est. 2021</div>
          </div>
        </div>
        <div class="pref-list">
          ${prefs.map(p => `
            <div class="pref-tag">
              <span class="pref-label">${p.label}:</span>
              <span class="pref-value">${p.value}</span>
              <button class="pref-edit-btn" title="Edit">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#c9a96e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#c9a96e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          `).join('')}
        </div>
        <button class="btn-gold pref-update-btn" style="margin-top:12px">Update Preferences</button>
      </div>
    `;
  },

  // 20. Language Toggle
  languageToggle() {
    const langs = [
      { code: 'en', flag: '🇬🇧', label: 'EN' },
      { code: 'fr', flag: '🇫🇷', label: 'FR' },
      { code: 'de', flag: '🇩🇪', label: 'DE' },
      { code: 'it', flag: '🇮🇹', label: 'IT' },
    ];
    return `
      <div class="w-language-toggle">
        <div class="lang-btn-group">
          ${langs.map((l, i) => `
            <button class="lang-btn${i === 0 ? ' active' : ''}" data-lang="${l.code}">
              ${l.flag} ${l.label}
            </button>
          `).join('')}
        </div>
        <div class="lang-greeting">Good morning — Château de Huot welcomes you.</div>
      </div>
    `;
  },

  // 21. Reservation Manager
  reservationManager() {
    return `
      <div class="w-reservation-manager">
        <div class="reservation-card">
          <div class="reservation-header">
            <span class="reservation-conf">Confirmation #CH-2026-4892</span>
            <span class="reservation-status confirmed">Confirmed</span>
          </div>
          <div class="reservation-details">
            <div class="reservation-detail-row">
              <span class="reservation-label">Room</span>
              <span class="reservation-value">Riviera Suite</span>
            </div>
            <div class="reservation-detail-row">
              <span class="reservation-label">Check-in</span>
              <span class="reservation-value">Mar 28, 2026</span>
            </div>
            <div class="reservation-detail-row">
              <span class="reservation-label">Check-out</span>
              <span class="reservation-value">Mar 30, 2026</span>
            </div>
            <div class="reservation-detail-row">
              <span class="reservation-label">Guests</span>
              <span class="reservation-value">2</span>
            </div>
            <div class="reservation-detail-row">
              <span class="reservation-label">Total</span>
              <span class="reservation-value reservation-price">€2,900</span>
            </div>
          </div>
          <div class="reservation-actions">
            <button class="btn-gold reservation-modify-btn">Modify Booking</button>
            <button class="btn-navy reservation-cancel-btn">Cancel Booking</button>
          </div>
          <div class="reservation-modify-form" style="display:none;">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Check-in</label>
                <input type="date" class="form-input" value="2026-03-28" />
              </div>
              <div class="form-group">
                <label class="form-label">Check-out</label>
                <input type="date" class="form-input" value="2026-03-30" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Room Type</label>
              <select class="form-input form-select reservation-room-select">
                <option value="riviera" selected>Riviera Suite — €1,450/night</option>
                <option value="villa">Garden Villa — €1,150/night</option>
                <option value="loft">Atelier Loft — €980/night</option>
                <option value="deluxe">Deluxe Room — €680/night</option>
              </select>
            </div>
            <div class="reservation-packages">
              <label class="form-label">Add-on Packages</label>
              <div class="reservation-toggle-row">
                <label class="reservation-toggle-label">
                  <input type="checkbox" checked /> Breakfast (included)
                </label>
              </div>
              <div class="reservation-toggle-row">
                <label class="reservation-toggle-label">
                  <input type="checkbox" /> Spa Package (+€180)
                </label>
              </div>
              <div class="reservation-toggle-row">
                <label class="reservation-toggle-label">
                  <input type="checkbox" /> Airport Transfer (+€120)
                </label>
              </div>
            </div>
            <div class="reservation-price-diff" style="display:none;">
              <span class="price-diff-label">Price difference:</span>
              <span class="price-diff-value">+€0</span>
            </div>
            <button class="btn-gold reservation-save-btn">Save Changes</button>
          </div>
          <div class="reservation-cancel-confirm" style="display:none;">
            <div class="cancel-warning">
              <p>Are you sure you want to cancel your reservation? Cancellations within 7 days of arrival are non-refundable.</p>
              <div class="cancel-actions">
                <button class="btn-navy reservation-cancel-yes">Yes, Cancel</button>
                <button class="btn-gold-sm reservation-cancel-no">Keep Reservation</button>
              </div>
            </div>
          </div>
          <div class="reservation-cancelled" style="display:none;">
            <div class="booking-confirmed-inner">
              <span class="confirmed-check">✗</span>
              <span>Your reservation has been cancelled. A confirmation email has been sent.</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 22. Service Request
  serviceRequest() {
    const roomServiceItems = [
      { name: 'Club Sandwich', price: '€24', icon: '🥪' },
      { name: 'Caesar Salad', price: '€22', icon: '🥗' },
      { name: 'Cheese Board', price: '€28', icon: '🧀' },
      { name: 'Bottle of Champagne', price: '€120', icon: '🍾' },
      { name: 'Fresh Orange Juice', price: '€12', icon: '🍊' },
    ];

    const renderRoomService = roomServiceItems.map(item => `
      <div class="service-item">
        <span class="service-item-icon">${item.icon}</span>
        <span class="service-item-name">${item.name}</span>
        <span class="service-item-price">${item.price}</span>
        <div class="stepper">
          <button class="stepper-minus">−</button>
          <span class="stepper-value">0</span>
          <button class="stepper-plus">+</button>
        </div>
      </div>
    `).join('');

    return `
      <div class="w-service-request" data-tabs-container>
        <div class="widget-tabs">
          <button class="tab-btn active" data-tab="room-service">Room Service</button>
          <button class="tab-btn" data-tab="housekeeping">Housekeeping</button>
          <button class="tab-btn" data-tab="amenities">Amenities</button>
          <button class="tab-btn" data-tab="maintenance">Maintenance</button>
        </div>
        <div class="tab-panel active" data-panel="room-service">
          ${renderRoomService}
          <div class="form-group" style="margin-top:12px;">
            <label class="form-label">Delivery Time</label>
            <select class="form-input form-select">
              <option value="15">15 minutes</option>
              <option value="30" selected>30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">60 minutes</option>
            </select>
          </div>
        </div>
        <div class="tab-panel" data-panel="housekeeping">
          <div class="service-checkbox-list">
            <label class="service-checkbox"><input type="checkbox" /> Extra towels</label>
            <label class="service-checkbox"><input type="checkbox" /> Turndown service</label>
            <label class="service-checkbox"><input type="checkbox" /> Fresh linens</label>
            <label class="service-checkbox"><input type="checkbox" /> Late checkout request</label>
          </div>
        </div>
        <div class="tab-panel" data-panel="amenities">
          <div class="service-checkbox-list">
            <label class="service-checkbox"><input type="checkbox" /> Extra pillows</label>
            <label class="service-checkbox"><input type="checkbox" /> Crib / cot</label>
            <label class="service-checkbox"><input type="checkbox" /> Iron &amp; board</label>
            <label class="service-checkbox"><input type="checkbox" /> Bathrobes</label>
          </div>
        </div>
        <div class="tab-panel" data-panel="maintenance">
          <div class="form-group">
            <label class="form-label">Describe the issue</label>
            <textarea class="form-input form-textarea" rows="3" placeholder="e.g. Bathroom light flickering, AC not cooling..."></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Urgency</label>
            <select class="form-input form-select">
              <option value="low">Low — at your convenience</option>
              <option value="normal" selected>Normal — within the hour</option>
              <option value="high">High — as soon as possible</option>
              <option value="urgent">Urgent — immediate attention</option>
            </select>
          </div>
        </div>
        <button class="btn-gold service-submit-btn" style="margin-top:12px;">Submit Request</button>
        <div class="service-order-tracker" style="display:none;margin-top:16px;">
          <div class="tracker-steps">
            <div class="tracker-step active">
              <div class="tracker-dot"></div>
              <span class="tracker-label">Received</span>
            </div>
            <div class="tracker-step">
              <div class="tracker-dot"></div>
              <span class="tracker-label">Preparing</span>
            </div>
            <div class="tracker-step">
              <div class="tracker-dot"></div>
              <span class="tracker-label">On the way</span>
            </div>
            <div class="tracker-step">
              <div class="tracker-dot"></div>
              <span class="tracker-label">Delivered</span>
            </div>
          </div>
          <div class="tracker-progress-bar">
            <div class="tracker-progress-fill" style="width:25%"></div>
          </div>
        </div>
      </div>
    `;
  },

  // 23. Local Discovery
  localDiscovery(places) {
    const defaultPlaces = [
      { name: 'Le Petit Jardin', category: 'Restaurants', distance: '0.3 km', rating: 5, priceLevel: 3, imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop', description: 'Michelin-starred Provençal cuisine in a hidden garden courtyard.' },
      { name: 'Musée de la Lavande', category: 'Attractions', distance: '1.2 km', rating: 4, priceLevel: 1, imageUrl: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=300&h=200&fit=crop', description: 'Interactive museum tracing the history of Provençal lavender.' },
      { name: 'Marché Forville', category: 'Shopping', distance: '0.8 km', rating: 4, priceLevel: 1, imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=300&h=200&fit=crop', description: 'Daily morning market with local produce, cheeses, and flowers.' },
      { name: 'La Plage Bleue', category: 'Restaurants', distance: '0.5 km', rating: 4, priceLevel: 2, imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=300&h=200&fit=crop', description: 'Beachfront seafood grill with sunset views over the bay.' },
      { name: 'Le Bar Étoilé', category: 'Nightlife', distance: '1.0 km', rating: 4, priceLevel: 2, imageUrl: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=300&h=200&fit=crop', description: 'Rooftop cocktail bar with live jazz and panoramic harbour views.' },
      { name: 'Galerie du Port', category: 'Attractions', distance: '0.6 km', rating: 5, priceLevel: 1, imageUrl: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=300&h=200&fit=crop', description: 'Contemporary art gallery showcasing Mediterranean artists.' },
    ];
    const data = places || defaultPlaces;
    const categories = ['All', 'Restaurants', 'Attractions', 'Shopping', 'Nightlife'];

    const renderStars = rating => '★'.repeat(rating) + '☆'.repeat(5 - rating);
    const renderPrice = level => '€'.repeat(level);

    const cards = data.map(place => `
      <div class="discovery-card" data-category="${place.category}">
        <div class="discovery-card-img">
          <img src="${place.imageUrl}" alt="${place.name}" loading="lazy" />
          <span class="discovery-distance-badge">${place.distance}</span>
        </div>
        <div class="discovery-card-body">
          <div class="discovery-card-header">
            <span class="discovery-name">${place.name}</span>
            <span class="discovery-price-level">${renderPrice(place.priceLevel)}</span>
          </div>
          <div class="discovery-rating">${renderStars(place.rating)}</div>
          <p class="discovery-desc">${place.description}</p>
          <div class="discovery-card-actions">
            <a href="https://maps.google.com" target="_blank" class="btn-navy btn-sm">Get Directions</a>
            <button class="btn-gold-sm discovery-add-btn">Add to Itinerary</button>
          </div>
        </div>
      </div>
    `).join('');

    return `
      <div class="w-local-discovery" data-tabs-container>
        <div class="widget-tabs">
          ${categories.map((cat, i) => `
            <button class="tab-btn${i === 0 ? ' active' : ''}" data-tab="${cat.toLowerCase()}">${cat}</button>
          `).join('')}
        </div>
        <div class="discovery-sort">
          <label class="form-label" style="margin-right:8px;margin-bottom:0;">Sort by</label>
          <select class="form-input form-select discovery-sort-select" style="width:auto;">
            <option value="distance">Distance</option>
            <option value="rating">Rating</option>
            <option value="popular">Popular</option>
          </select>
        </div>
        <div class="discovery-cards">${cards}</div>
      </div>
    `;
  },

  // 24. Upsell / Upgrade
  upsellUpgrade() {
    const addons = [
      { icon: '🚗', name: 'Airport Transfer', desc: 'Private Mercedes S-Class pickup and drop-off', price: 120 },
      { icon: '🍾', name: 'Welcome Champagne', desc: 'Krug Grande Cuvée with macarons upon arrival', price: 85 },
      { icon: '🕐', name: 'Late Checkout', desc: 'Extend your stay until 4:00 PM on departure day', price: 65 },
      { icon: '💆', name: 'Spa Credit €100', desc: 'Redeemable on any treatment or product at the Château Spa', price: 80 },
      { icon: '🌹', name: 'Romantic Package', desc: 'Rose petals, candles, champagne, and chocolate truffles in-suite', price: 220 },
    ];

    const items = addons.map((addon, i) => `
      <div class="upsell-item">
        <span class="upsell-icon">${addon.icon}</span>
        <div class="upsell-info">
          <div class="upsell-name">${addon.name}</div>
          <div class="upsell-desc">${addon.desc}</div>
        </div>
        <span class="upsell-price">€${addon.price}</span>
        <label class="upsell-toggle">
          <input type="checkbox" class="upsell-checkbox" data-price="${addon.price}" />
          <span class="upsell-toggle-slider"></span>
        </label>
      </div>
    `).join('');

    return `
      <div class="w-upsell">
        <div class="upsell-header">Enhance Your Stay</div>
        <div class="upsell-list">${items}</div>
        <div class="upsell-footer">
          <div class="upsell-total">
            <span class="upsell-total-label">Total add-ons:</span>
            <span class="upsell-total-value">€0</span>
          </div>
          <button class="btn-gold upsell-confirm-btn">Confirm Upgrades</button>
        </div>
      </div>
    `;
  },

  // 25. Chat Transfer
  chatTransfer() {
    return `
      <div class="w-chat-transfer">
        <div class="transfer-notice">
          <div class="transfer-spinner"></div>
          <span>Connecting you with a specialist...</span>
        </div>
        <div class="transfer-agent-card">
          <div class="transfer-agent-photo">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face" alt="Marie Laurent" loading="lazy" />
          </div>
          <div class="transfer-agent-info">
            <div class="transfer-agent-name">Marie Laurent</div>
            <div class="transfer-agent-role">Senior Guest Relations</div>
            <div class="transfer-agent-langs">EN · FR · ES</div>
            <div class="transfer-agent-rating">4.9 ★</div>
          </div>
        </div>
        <div class="transfer-context-box">
          <span class="transfer-context-icon">📋</span>
          <span>I've shared your booking details and conversation history with Marie.</span>
        </div>
        <div class="transfer-wait">
          <span class="transfer-wait-label">Estimated wait: <strong>~2 minutes</strong></span>
          <div class="transfer-progress-bar">
            <div class="transfer-progress-fill"></div>
          </div>
        </div>
        <div class="transfer-connected" style="display:none;">
          <div class="booking-confirmed-inner">
            <span class="confirmed-check">✓</span>
            <span>Marie has joined the conversation</span>
          </div>
        </div>
      </div>
    `;
  },

  // 26. Trip Summary
  tripSummary(booking) {
    const data = booking || {
      confirmation: 'CH-2026-4892',
      destination: 'Château de Huot',
      timeline: [
        { date: 'Mar 28', time: '3:00 PM', event: 'Check-in', detail: 'Riviera Suite · Welcome champagne' },
        { date: 'Mar 28', time: '4:30 PM', event: 'Spa Treatment', detail: 'Signature Massage · 90 min' },
        { date: 'Mar 28', time: '8:00 PM', event: 'Dinner', detail: 'Le Jardin restaurant · Table for 2' },
        { date: 'Mar 29', time: '10:00 AM', event: 'Experience', detail: 'Lavender Fields Tour · Private guide' },
        { date: 'Mar 29', time: '7:30 PM', event: 'Dinner', detail: 'Private terrace dining · Chef\'s tasting menu' },
        { date: 'Mar 30', time: '12:00 PM', event: 'Check-out', detail: 'Airport transfer arranged' },
      ],
      costs: [
        { label: 'Riviera Suite (2 nights)', amount: '€2,900' },
        { label: 'Spa — Signature Massage', amount: '€180' },
        { label: 'Dining (2 dinners)', amount: '€310' },
        { label: 'Lavender Fields Tour', amount: '€95' },
        { label: 'Taxes & fees', amount: '€174' },
      ],
      total: '€3,659',
    };

    const timelineHtml = data.timeline.map(entry => `
      <div class="trip-timeline-entry">
        <div class="trip-timeline-marker">
          <div class="trip-timeline-dot"></div>
          <div class="trip-timeline-line"></div>
        </div>
        <div class="trip-timeline-content">
          <div class="trip-timeline-date">${entry.date} · ${entry.time}</div>
          <div class="trip-timeline-event">${entry.event}</div>
          <div class="trip-timeline-detail">${entry.detail}</div>
        </div>
      </div>
    `).join('');

    const costsHtml = data.costs.map(cost => `
      <div class="trip-cost-line">
        <span class="trip-cost-label">${cost.label}</span>
        <span class="trip-cost-amount">${cost.amount}</span>
      </div>
    `).join('');

    return `
      <div class="w-trip-summary">
        <div class="trip-header">
          <div class="trip-title">Your Trip to ${data.destination}</div>
          <div class="trip-conf">Confirmation #${data.confirmation}</div>
        </div>
        <div class="trip-section">
          <div class="trip-section-title">Itinerary</div>
          <div class="trip-timeline">${timelineHtml}</div>
        </div>
        <div class="trip-section">
          <div class="trip-section-title">Cost Breakdown</div>
          <div class="trip-costs">
            ${costsHtml}
            <div class="trip-cost-line trip-cost-total">
              <span class="trip-cost-label">Total</span>
              <span class="trip-cost-amount">${data.total}</span>
            </div>
          </div>
        </div>
        <div class="trip-section trip-qr-section">
          <div class="trip-qr-code">
            <div class="trip-qr-placeholder"></div>
            <span class="trip-qr-label">Mobile Check-in</span>
          </div>
        </div>
        <div class="trip-actions">
          <button class="btn-gold-sm trip-share-btn">Share Itinerary</button>
          <button class="btn-gold-sm trip-calendar-btn">Add to Calendar</button>
          <button class="btn-navy trip-download-btn">Download PDF</button>
        </div>
      </div>
    `;
  },

};

window.Widgets = Widgets;
