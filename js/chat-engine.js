// chat-engine.js — Core GECX chat engine for Château de Huot

const ChatEngine = {
  panel: null,
  messages: null,
  input: null,
  flowToken: 0,
  isOpen: false,
  demoSpeed: 1,

  init() {
    this.panel = document.getElementById('chat-panel');
    this.messages = document.getElementById('chat-messages');
    this.input = document.getElementById('chat-input');

    const launcher = document.getElementById('chat-launcher');
    const closeBtn = document.getElementById('chat-close');
    const sendBtn = document.getElementById('chat-send');

    launcher?.addEventListener('click', () => this.open());
    closeBtn?.addEventListener('click', () => this.close());
    sendBtn?.addEventListener('click', () => this.handleSend());

    this.input?.addEventListener('keydown', e => {
      if (e.key === 'Enter') this.handleSend();
    });

    // Delegated: data-flow buttons trigger flows
    document.addEventListener('click', e => {
      const flowTrigger = e.target.closest('[data-flow]');
      if (flowTrigger) {
        const flowName = flowTrigger.dataset.flow;
        const quickText = flowTrigger.dataset.quick;
        this.open();
        if (quickText) this.addUserMessage(quickText, true);
        this.playFlow(flowName);
        return;
      }

      // data-quick only (no data-flow) — quick reply within widget
      const quickTrigger = e.target.closest('[data-quick]:not([data-flow])');
      if (quickTrigger && this.panel?.contains(quickTrigger)) {
        const text = quickTrigger.dataset.quick;
        if (text) {
          this.addUserMessage(text, true);
          this.handleQuickReply(text);
        }
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.close();
    });

    // Demo admin panel toggle
    document.addEventListener('keydown', e => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        this.toggleAdminPanel();
      }
    });
    this.createAdminPanel();
  },

  open(quickMessage) {
    if (!this.panel) return;
    this.panel.classList.add('is-open');
    this.isOpen = true;
    this.input?.focus();
    if (quickMessage) {
      this.addUserMessage(quickMessage, true);
    }
  },

  close() {
    this.panel?.classList.remove('is-open');
    this.isOpen = false;
  },

  async playFlow(flowName) {
    const token = ++this.flowToken;
    const flow = window.DemoFlows?.[flowName];
    if (!flow) return;

    for (const step of flow) {
      if (token !== this.flowToken) return;
      await this.renderStep(step, token);
    }
  },

  async renderStep(step, token) {
    const wait = ms => new Promise(r => setTimeout(r, ms / this.demoSpeed));

    switch (step.type) {
      case 'user':
        this.addUserMessage(step.text, true);
        await wait(step.delay ?? 400);
        break;
      case 'bot':
        await this.showBotMessage(step.text, token);
        await wait(step.delay ?? 500);
        break;
      case 'widget':
        await this.showBotMessage(null, token);
        if (token !== this.flowToken) return;
        this.addWidget(step.label, step.content());
        await wait(step.delay ?? 600);
        break;
      case 'divider':
        this.addDivider(step.label);
        await wait(200);
        break;
    }
  },

  async showBotMessage(text, token) {
    const wait = ms => new Promise(r => setTimeout(r, ms / this.demoSpeed));
    const typingEl = this.showTyping();
    const delay = text ? Math.min(400 + text.length * 15, 2000) : 800;
    await wait(delay);
    if (token !== undefined && token !== this.flowToken) {
      typingEl?.remove();
      return;
    }
    typingEl?.remove();
    if (text) this.appendBotMessage(text);
  },

  showTyping() {
    if (!this.messages) return null;
    const el = document.createElement('div');
    el.className = 'msg-bot msg-typing';
    el.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div><span class="typing-text">Concierge is typing...</span>';
    this.messages.appendChild(el);
    this.scrollToBottom();
    return el;
  },

  appendBotMessage(text) {
    if (!this.messages) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const el = document.createElement('div');
    el.className = 'msg-bot';
    el.innerHTML = `<p>${text}</p><span class="msg-time">${timeStr}</span>`;
    this.messages.appendChild(el);
    this.scrollToBottom();
  },

  addUserMessage(text, immediate = false) {
    if (!this.messages) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const el = document.createElement('div');
    el.className = 'msg-user';
    el.innerHTML = `<p>${text}</p><span class="msg-time">${timeStr}</span>`;
    this.messages.appendChild(el);
    this.scrollToBottom();
    setTimeout(() => {
      const receipt = document.createElement('span');
      receipt.className = 'msg-read-receipt';
      receipt.textContent = '\u2713\u2713';
      el.appendChild(receipt);
    }, 500);
  },

  addWidget(label, htmlString) {
    if (!this.messages) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'msg-bot';
    wrapper.innerHTML = `
      <div class="widget-block">
        <div class="widget-label">${label.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}</div>
        ${htmlString}
      </div>
    `;
    this.messages.appendChild(wrapper);
    this.scrollToBottom();
    this.initWidgetInteractions(wrapper);
  },

  addDivider(label) {
    if (!this.messages) return;
    const el = document.createElement('div');
    el.className = 'msg-divider';
    el.textContent = label;
    this.messages.appendChild(el);
    this.scrollToBottom();
  },

  scrollToBottom() {
    if (this.messages) {
      this.messages.scrollTo({ top: this.messages.scrollHeight, behavior: 'smooth' });
    }
  },

  handleSend() {
    const text = this.input?.value?.trim();
    if (!text) return;
    this.addUserMessage(text, true);
    this.input.value = '';
    this.routeMessage(text);
  },

  routeMessage(text) {
    const lower = text.toLowerCase();

    // New flows — check first for specificity
    if (lower.includes('modify') || lower.includes('change') || lower.includes('update') || lower.includes('cancel') || lower.includes('reservation')) {
      this.playFlow('modify');
    } else if (lower.includes('service') || lower.includes('room service') || lower.includes('towel') || lower.includes('housekeeping') || lower.includes('amenity')) {
      this.playFlow('service');
    } else if (lower.includes('explore') || lower.includes('nearby') || lower.includes('discover') || lower.includes('around') || lower.includes('area') || lower.includes('local')) {
      this.playFlow('explore');
    } else if (lower.includes('vip') || lower.includes('welcome back') || lower.includes('returning') || lower.includes('loyalty')) {
      this.playFlow('vip');
    } else if (lower.includes('book') || lower.includes('suite') || lower.includes('room') || lower.includes('reserve')) {
      this.playFlow('booking');
    } else if (lower.includes('spa') || lower.includes('massage') || lower.includes('treatment')) {
      this.playFlow('spa');
    } else if (lower.includes('dinner') || lower.includes('dining') || lower.includes('restaurant') || lower.includes('table')) {
      this.playFlow('dining');
    } else if (lower.includes('today') || lower.includes('do') || lower.includes('activity') || lower.includes('experience')) {
      this.playFlow('concierge');
    } else if (lower.includes('event') || lower.includes('wedding') || lower.includes('corporate') || lower.includes('retreat')) {
      this.playFlow('events');
    } else if (lower.includes('bill') || lower.includes('help') || lower.includes('support') || lower.includes('question')) {
      this.playFlow('support');
    } else {
      // Context awareness: default based on current page
      const path = window.location.pathname.toLowerCase();
      if (path.includes('rooms')) {
        this.playFlow('booking');
      } else if (path.includes('dining')) {
        this.playFlow('dining');
      } else if (path.includes('spa') || path.includes('wellness')) {
        this.playFlow('spa');
      } else if (path.includes('event')) {
        this.playFlow('events');
      } else {
        const wait = ms => new Promise(r => setTimeout(r, ms));
        const typing = this.showTyping();
        wait(1000).then(() => {
          typing?.remove();
          this.appendBotMessage('I would be delighted to assist. Would you like to explore our suites, dining, spa, or local experiences?');
        });
      }
    }
  },

  handleQuickReply(text) {
    this.routeMessage(text);
  },

  fireConfetti() {
    const colors = ['#c9a96e', '#1a1a2e', '#e8dcc8', '#34A853', '#4285F4', '#EA4335', '#FBBC05'];
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999;overflow:hidden;';
    document.body.appendChild(container);
    for (let i = 0; i < 30; i++) {
      const piece = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const delay = Math.random() * 500;
      const size = 6 + Math.random() * 8;
      const rotation = Math.random() * 360;
      piece.style.cssText = `
        position:absolute;top:-20px;left:${left}%;
        width:${size}px;height:${size * 0.6}px;
        background:${color};
        transform:rotate(${rotation}deg);
        opacity:0.9;
        animation:confetti-fall ${1.5 + Math.random() * 1.5}s ease-out ${delay}ms forwards;
      `;
      container.appendChild(piece);
    }
    // Add keyframes if not present
    if (!document.getElementById('confetti-style')) {
      const style = document.createElement('style');
      style.id = 'confetti-style';
      style.textContent = `
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    setTimeout(() => container.remove(), 3500);
  },

  createAdminPanel() {
    const flowNames = ['booking', 'concierge', 'dining', 'spa', 'events', 'support', 'modify', 'service', 'explore', 'vip'];
    const widgetNames = [
      'roomCarousel', 'priceComparison', 'bookingForm', 'checkoutPayment',
      'weatherWidget', 'experienceBooking', 'itineraryBuilder', 'restaurantMenu',
      'wineList', 'guestPreferenceProfile', 'spaTreatmentPicker', 'availabilityCalendar',
      'loyaltyProgram', 'photoGallery', 'eventInquiryForm', 'faqAccordion',
      'reviewsWidget', 'languageToggle', 'reservationManager', 'upsellUpgrade',
      'tripSummary', 'serviceRequest', 'localDiscovery', 'mapWidget',
      'virtualTour', 'chatTransfer'
    ];

    const panel = document.createElement('div');
    panel.id = 'demo-admin-panel';
    panel.innerHTML = `
      <div class="admin-panel-inner">
        <button class="admin-close-btn">&times;</button>
        <h3 class="admin-title">Demo Control Panel</h3>

        <div class="admin-section">
          <label class="admin-label">Flow Selector</label>
          <div class="admin-row">
            <select id="admin-flow-select" class="admin-select">
              ${flowNames.map(f => `<option value="${f}">${f.charAt(0).toUpperCase() + f.slice(1)}</option>`).join('')}
            </select>
            <button id="admin-play-btn" class="admin-btn">Play</button>
          </div>
        </div>

        <div class="admin-section">
          <label class="admin-label">Speed Control</label>
          <div class="admin-row admin-speed-row">
            <button class="admin-speed-btn" data-speed="0.5">0.5x</button>
            <button class="admin-speed-btn active" data-speed="1">1x</button>
            <button class="admin-speed-btn" data-speed="2">2x</button>
          </div>
        </div>

        <div class="admin-section">
          <label class="admin-label">Widget Gallery</label>
          <div class="admin-row">
            <select id="admin-widget-select" class="admin-select">
              ${widgetNames.map(w => `<option value="${w}">${w.replace(/([A-Z])/g, ' $1').trim()}</option>`).join('')}
            </select>
            <button id="admin-render-btn" class="admin-btn">Render</button>
          </div>
        </div>

        <div class="admin-section admin-actions">
          <button id="admin-reset-btn" class="admin-btn admin-btn-danger">Reset Chat</button>
          <button id="admin-auto-btn" class="admin-btn admin-btn-auto">Auto-Demo All</button>
        </div>
      </div>
    `;

    // Add styles
    if (!document.getElementById('admin-panel-style')) {
      const style = document.createElement('style');
      style.id = 'admin-panel-style';
      style.textContent = `
        #demo-admin-panel {
          position: fixed; top: 0; right: -340px; width: 320px; height: 100vh;
          background: #1a1a2e; color: #e8dcc8; z-index: 100000;
          transition: right 0.3s ease; box-shadow: -4px 0 20px rgba(0,0,0,0.3);
          font-family: 'Inter', sans-serif; overflow-y: auto;
        }
        #demo-admin-panel.is-open { right: 0; }
        .admin-panel-inner { padding: 24px 20px; }
        .admin-close-btn {
          position: absolute; top: 12px; right: 16px; background: none; border: none;
          color: #e8dcc8; font-size: 24px; cursor: pointer; opacity: 0.7;
        }
        .admin-close-btn:hover { opacity: 1; }
        .admin-title { font-size: 16px; font-weight: 600; margin: 0 0 20px; color: #c9a96e; letter-spacing: 0.5px; }
        .admin-section { margin-bottom: 18px; }
        .admin-label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6; margin-bottom: 8px; }
        .admin-row { display: flex; gap: 8px; }
        .admin-select {
          flex: 1; padding: 8px 10px; border-radius: 6px; border: 1px solid rgba(201,169,110,0.3);
          background: rgba(255,255,255,0.05); color: #e8dcc8; font-size: 13px;
        }
        .admin-btn {
          padding: 8px 14px; border-radius: 6px; border: 1px solid #c9a96e;
          background: transparent; color: #c9a96e; font-size: 13px; cursor: pointer;
          transition: all 0.2s;
        }
        .admin-btn:hover { background: #c9a96e; color: #1a1a2e; }
        .admin-btn-danger { border-color: #EA4335; color: #EA4335; }
        .admin-btn-danger:hover { background: #EA4335; color: #fff; }
        .admin-btn-auto { border-color: #34A853; color: #34A853; }
        .admin-btn-auto:hover { background: #34A853; color: #fff; }
        .admin-speed-row { gap: 6px; }
        .admin-speed-btn {
          flex: 1; padding: 6px; border-radius: 6px; border: 1px solid rgba(201,169,110,0.3);
          background: transparent; color: #e8dcc8; font-size: 12px; cursor: pointer;
          transition: all 0.2s;
        }
        .admin-speed-btn.active { background: #c9a96e; color: #1a1a2e; font-weight: 600; }
        .admin-actions { display: flex; gap: 8px; margin-top: 24px; }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(panel);

    // Close button
    panel.querySelector('.admin-close-btn').addEventListener('click', () => this.toggleAdminPanel());

    // Play flow
    panel.querySelector('#admin-play-btn').addEventListener('click', () => {
      const flow = panel.querySelector('#admin-flow-select').value;
      this.open();
      this.playFlow(flow);
    });

    // Speed buttons
    panel.querySelectorAll('.admin-speed-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        panel.querySelectorAll('.admin-speed-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.demoSpeed = parseFloat(btn.dataset.speed);
      });
    });

    // Render widget
    panel.querySelector('#admin-render-btn').addEventListener('click', () => {
      const widgetName = panel.querySelector('#admin-widget-select').value;
      if (window.Widgets && typeof window.Widgets[widgetName] === 'function') {
        this.open();
        const html = window.Widgets[widgetName]();
        this.addWidget(widgetName.replace(/([A-Z])/g, '_$1').toUpperCase(), html);
      }
    });

    // Reset chat
    panel.querySelector('#admin-reset-btn').addEventListener('click', () => {
      if (this.messages) this.messages.innerHTML = '';
      this.flowToken++;
    });

    // Auto-demo all flows
    panel.querySelector('#admin-auto-btn').addEventListener('click', async () => {
      this.open();
      const flows = ['booking', 'concierge', 'dining', 'spa', 'events', 'support', 'modify', 'service', 'explore', 'vip'];
      for (const flowName of flows) {
        this.addDivider(`--- ${flowName.toUpperCase()} ---`);
        await this.playFlow(flowName);
        await new Promise(r => setTimeout(r, 1000 / this.demoSpeed));
      }
    });
  },

  toggleAdminPanel() {
    const panel = document.getElementById('demo-admin-panel');
    if (panel) panel.classList.toggle('is-open');
  },

  initWidgetInteractions(wrapper) {
    // FAQ accordion
    wrapper.querySelectorAll('.faq-item-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        wrapper.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });

    // Gallery expand
    const viewMore = wrapper.querySelector('.gallery-view-more');
    viewMore?.addEventListener('click', () => {
      wrapper.querySelector('.gallery-grid-hidden')?.classList.toggle('visible');
      viewMore.textContent = viewMore.textContent.trim() === 'View more' ? 'View less' : 'View more';
    });

    // Language toggle
    wrapper.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        wrapper.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const lang = btn.dataset.lang;
        const greetings = {
          en: 'Good morning — Château de Huot welcomes you.',
          fr: 'Bonjour — Château de Huot vous souhaite la bienvenue.',
          de: 'Guten Morgen — Château de Huot heißt Sie willkommen.',
          it: 'Buongiorno — Château de Huot vi dà il benvenuto.',
        };
        const display = wrapper.querySelector('.lang-greeting');
        if (display && lang) display.textContent = greetings[lang] || greetings.en;
      });
    });

    // Checkout Google Pay mock
    wrapper.querySelector('.gpay-btn')?.addEventListener('click', function () {
      this.textContent = '\u2713 Payment confirmed';
      this.style.background = '#34A853';
      this.disabled = true;
      ChatEngine.fireConfetti();
    });

    // Tab switching (menu, spa categories, etc.)
    wrapper.querySelectorAll('.widget-tabs').forEach(tabs => {
      tabs.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const tabGroup = btn.closest('.widget-tabs');
          tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const panel = btn.dataset.tab;
          const container = btn.closest('[data-tabs-container]') || wrapper;
          container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
          container.querySelector(`[data-panel="${panel}"]`)?.classList.add('active');
        });
      });
    });

    // Stepper buttons
    wrapper.querySelectorAll('.stepper').forEach(stepper => {
      const display = stepper.querySelector('.stepper-value');
      let val = parseInt(display?.textContent || '1');
      stepper.querySelector('.stepper-minus')?.addEventListener('click', () => {
        if (val > 1) { val--; if (display) display.textContent = val; }
      });
      stepper.querySelector('.stepper-plus')?.addEventListener('click', () => {
        val++;
        if (display) display.textContent = val;
      });
    });

    // Booking form confirm button
    wrapper.querySelector('.booking-confirm-btn')?.addEventListener('click', function () {
      const form = this.closest('.w-booking-form');
      const confirm = form?.querySelector('.booking-confirmed');
      if (confirm) {
        confirm.style.display = 'block';
        this.style.display = 'none';
      }
    });

    // Event inquiry form submit
    wrapper.querySelector('.event-inquiry-submit')?.addEventListener('click', function () {
      const form = this.closest('.w-event-inquiry');
      const confirm = form?.querySelector('.event-inquiry-confirmed');
      if (confirm) {
        confirm.style.display = 'block';
        this.style.display = 'none';
      }
    });

    // Spa book buttons
    wrapper.querySelectorAll('.spa-book-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const card = this.closest('.spa-card');
        const treatmentName = card?.querySelector('.spa-name')?.textContent || 'treatment';
        const timeSelect = card?.querySelector('.spa-time-select');
        const time = timeSelect?.value || '10:00';
        this.textContent = `Booked for ${time} \u2713`;
        this.disabled = true;
        this.style.background = '#34A853';
        this.style.color = '#fff';
        this.style.border = 'none';
      });
    });

    // Experience book buttons
    wrapper.querySelectorAll('.exp-book-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        this.textContent = 'Booking confirmed \u2713';
        this.disabled = true;
        this.style.background = '#34A853';
        this.style.color = '#fff';
        this.style.border = 'none';
      });
    });

    // Wine "Add to reservation" buttons
    wrapper.querySelectorAll('.wine-add-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        this.textContent = 'Added \u2713';
        this.classList.add('wine-added');
        this.disabled = true;
      });
    });

    // Itinerary activity chips
    wrapper.querySelectorAll('.activity-chip').forEach(chip => {
      chip.addEventListener('click', function () {
        const slot = this.closest('.itinerary-section')?.querySelector('.slot-drop-zone');
        if (!slot) return;
        const tag = document.createElement('span');
        tag.className = 'slot-activity-tag';
        tag.textContent = this.textContent;
        const placeholder = slot.querySelector('.slot-placeholder');
        if (placeholder) placeholder.style.display = 'none';
        slot.appendChild(tag);
        this.classList.add('chip-added');
        this.disabled = true;
      });
    });

    // Calendar date selection
    wrapper.querySelectorAll('.cal-date.available, .cal-date.limited').forEach(date => {
      date.addEventListener('click', function () {
        wrapper.querySelectorAll('.cal-date').forEach(d => d.classList.remove('selected'));
        this.classList.add('selected');
        const bookingTrigger = wrapper.querySelector('.cal-booking-trigger');
        if (bookingTrigger) bookingTrigger.style.display = 'block';
      });
    });

    // Preference edit tags
    wrapper.querySelectorAll('.pref-edit-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const tag = this.closest('.pref-tag');
        const label = tag?.querySelector('.pref-value');
        if (!label) return;
        const current = label.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = current;
        input.className = 'pref-edit-input';
        input.style.cssText = 'border:1px solid #c9a96e;border-radius:4px;padding:1px 6px;font-size:12px;width:90px;';
        label.replaceWith(input);
        input.focus();
        input.addEventListener('blur', () => {
          const newLabel = document.createElement('span');
          newLabel.className = 'pref-value';
          newLabel.textContent = input.value || current;
          input.replaceWith(newLabel);
        });
      });
    });

    // Update preferences button
    wrapper.querySelector('.pref-update-btn')?.addEventListener('click', function () {
      this.textContent = 'Preferences updated \u2713';
      this.disabled = true;
      this.style.background = '#34A853';
      this.style.borderColor = '#34A853';
      this.style.color = '#fff';
    });

    // Virtual tour hotspot tooltips (hover) and detail panels (click)
    wrapper.querySelectorAll('.tour-hotspot').forEach(dot => {
      dot.addEventListener('mouseenter', () => {
        dot.querySelector('.hotspot-tooltip')?.classList.add('visible');
      });
      dot.addEventListener('mouseleave', () => {
        dot.querySelector('.hotspot-tooltip')?.classList.remove('visible');
      });
      dot.addEventListener('click', () => {
        const panel = dot.querySelector('.hotspot-detail-panel');
        if (!panel) return;
        // Close all other detail panels first
        wrapper.querySelectorAll('.hotspot-detail-panel.visible').forEach(p => {
          if (p !== panel) p.classList.remove('visible');
        });
        panel.classList.toggle('visible');
      });
    });

    // Virtual tour room selector
    wrapper.querySelector('.tour-room-select')?.addEventListener('change', function () {
      const selected = this.options[this.selectedIndex];
      const img = selected?.dataset.img;
      const viewport = wrapper.querySelector('.tour-viewport');
      if (viewport && img) {
        viewport.style.backgroundImage = `url('${img}')`;
      }
    });

    // Virtual tour open button
    wrapper.querySelector('.tour-open-btn')?.addEventListener('click', function () {
      this.textContent = 'Launching tour\u2026';
      setTimeout(() => { this.textContent = 'Open Full Tour'; }, 2000);
    });

    // Room compare checkboxes
    wrapper.querySelectorAll('.room-compare-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        const carousel = wrapper.querySelector('.w-room-carousel') || wrapper.closest('.w-room-carousel')?.parentElement || wrapper;
        const checked = carousel.querySelectorAll('.room-compare-checkbox:checked');
        const summary = carousel.querySelector('.room-compare-summary');
        if (!summary) return;
        if (checked.length === 2) {
          const names = Array.from(checked).map(c => c.dataset.roomName);
          const prices = Array.from(checked).map(c => c.dataset.roomPrice);
          summary.innerHTML = `
            <div class="compare-header">Comparing</div>
            <div class="compare-row">
              <div class="compare-item"><strong>${names[0]}</strong><br/>${prices[0]}</div>
              <div class="compare-vs">vs</div>
              <div class="compare-item"><strong>${names[1]}</strong><br/>${prices[1]}</div>
            </div>
          `;
          summary.style.display = 'block';
        } else {
          summary.style.display = 'none';
        }
        // Limit to max 2 selections
        if (checked.length >= 2) {
          carousel.querySelectorAll('.room-compare-checkbox:not(:checked)').forEach(unchecked => {
            unchecked.disabled = true;
          });
        } else {
          carousel.querySelectorAll('.room-compare-checkbox').forEach(c => {
            c.disabled = false;
          });
        }
      });
    });

    // --- New widget interactions ---

    // Reservation manager: modify button reveals edit form, cancel button shows confirmation
    wrapper.querySelector('.reservation-modify-btn')?.addEventListener('click', function () {
      const editForm = wrapper.querySelector('.reservation-edit-form');
      if (editForm) {
        editForm.style.display = editForm.style.display === 'block' ? 'none' : 'block';
        this.textContent = editForm.style.display === 'block' ? 'Close Editor' : 'Modify Dates';
      }
    });
    wrapper.querySelector('.reservation-cancel-btn')?.addEventListener('click', function () {
      const confirmEl = wrapper.querySelector('.reservation-cancel-confirm');
      if (confirmEl) {
        confirmEl.style.display = 'block';
      } else {
        const msg = document.createElement('div');
        msg.className = 'reservation-cancel-confirm';
        msg.style.cssText = 'margin-top:12px;padding:12px;background:rgba(234,67,53,0.08);border:1px solid rgba(234,67,53,0.3);border-radius:8px;font-size:13px;color:#EA4335;';
        msg.innerHTML = '<strong>Are you sure?</strong> This action cannot be undone. <button class="reservation-cancel-yes" style="margin-left:8px;padding:4px 12px;border-radius:4px;border:1px solid #EA4335;background:#EA4335;color:#fff;cursor:pointer;font-size:12px;">Yes, Cancel</button>';
        this.closest('.w-reservation-manager')?.appendChild(msg) || this.parentElement.appendChild(msg);
        msg.querySelector('.reservation-cancel-yes')?.addEventListener('click', function () {
          msg.innerHTML = '<strong>Reservation cancelled.</strong> A confirmation email has been sent.';
          msg.style.borderColor = 'rgba(201,169,110,0.3)';
          msg.style.background = 'rgba(201,169,110,0.08)';
          msg.style.color = '#c9a96e';
        });
      }
    });

    // Service request submit button
    wrapper.querySelector('.service-submit-btn')?.addEventListener('click', function () {
      this.textContent = 'Order Placed \u2713';
      this.disabled = true;
      this.style.background = '#34A853';
      this.style.borderColor = '#34A853';
      this.style.color = '#fff';
      // Animate order tracker
      const tracker = wrapper.querySelector('.order-tracker');
      if (tracker) {
        tracker.style.display = 'block';
        const steps = tracker.querySelectorAll('.tracker-step');
        steps.forEach((step, i) => {
          setTimeout(() => {
            step.classList.add('active');
          }, (i + 1) * 2000);
        });
      }
    });

    // Local discovery: filter tabs
    wrapper.querySelectorAll('.discovery-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        wrapper.querySelectorAll('.discovery-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        wrapper.querySelectorAll('.discovery-card').forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Local discovery: sort dropdown
    wrapper.querySelector('.discovery-sort')?.addEventListener('change', function () {
      const container = wrapper.querySelector('.discovery-grid');
      if (!container) return;
      const cards = Array.from(container.querySelectorAll('.discovery-card'));
      cards.sort((a, b) => {
        if (this.value === 'distance') return parseFloat(a.dataset.distance || 0) - parseFloat(b.dataset.distance || 0);
        if (this.value === 'rating') return parseFloat(b.dataset.rating || 0) - parseFloat(a.dataset.rating || 0);
        return 0;
      });
      cards.forEach(c => container.appendChild(c));
    });

    // Local discovery: add to itinerary buttons
    wrapper.querySelectorAll('.discovery-add-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        this.textContent = 'Added to Itinerary \u2713';
        this.classList.add('added');
        this.disabled = true;
        this.style.background = '#34A853';
        this.style.color = '#fff';
        this.style.borderColor = '#34A853';
      });
    });

    // Upsell: toggle switches update running total
    wrapper.querySelectorAll('.upsell-toggle').forEach(toggle => {
      toggle.addEventListener('change', () => {
        let total = 0;
        wrapper.querySelectorAll('.upsell-toggle:checked').forEach(checked => {
          total += parseFloat(checked.dataset.price || 0);
        });
        const totalEl = wrapper.querySelector('.upsell-total-value');
        if (totalEl) totalEl.textContent = `\u20AC${total.toLocaleString()}`;
      });
    });

    // Chat transfer: auto-animate progress
    const transferWidget = wrapper.querySelector('.w-chat-transfer');
    if (transferWidget) {
      setTimeout(() => {
        const status = transferWidget.querySelector('.transfer-status');
        if (status) {
          status.textContent = 'Connected';
          status.classList.add('connected');
        }
        const agentInfo = transferWidget.querySelector('.transfer-agent');
        if (agentInfo) agentInfo.style.display = 'flex';
      }, 3000);
    }

    // Trip summary action buttons
    wrapper.querySelectorAll('.trip-action-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const action = this.dataset.action;
        const toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);padding:10px 20px;background:#1a1a2e;color:#e8dcc8;border-radius:8px;font-size:13px;z-index:100001;box-shadow:0 4px 12px rgba(0,0,0,0.3);transition:opacity 0.3s;';
        const messages = {
          share: 'Trip summary link copied to clipboard',
          calendar: 'Events added to your calendar',
          download: 'Trip summary PDF downloading...',
        };
        toast.textContent = messages[action] || 'Action completed';
        document.body.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; }, 2000);
        setTimeout(() => toast.remove(), 2500);
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => ChatEngine.init());
