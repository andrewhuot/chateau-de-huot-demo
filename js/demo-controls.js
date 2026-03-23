// demo-controls.js — Hidden admin panel for demo presentations
// Toggle with Ctrl+Shift+D
// Provides: flow selector, speed control, reset, widget gallery

const DemoControls = {
  panel: null,

  init() {
    // Admin panel already created by ChatEngine — enhance it
    // If ChatEngine hasn't created it yet, create our own
    if (!document.getElementById('demo-admin-panel')) {
      this.createPanel();
    }

    // Ensure keyboard shortcut works even if chat-engine hasn't loaded
    document.addEventListener('keydown', e => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        this.toggle();
      }
    });
  },

  toggle() {
    const panel = document.getElementById('demo-admin-panel');
    if (panel) {
      panel.classList.toggle('is-open');
    } else if (typeof ChatEngine !== 'undefined' && ChatEngine.toggleAdminPanel) {
      ChatEngine.toggleAdminPanel();
    }
  },

  createPanel() {
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
    this.panel = panel;
    this.bindEvents();
  },

  bindEvents() {
    const panel = this.panel || document.getElementById('demo-admin-panel');
    if (!panel) return;

    panel.querySelector('.admin-close-btn')?.addEventListener('click', () => this.toggle());

    panel.querySelector('#admin-play-btn')?.addEventListener('click', () => {
      const flow = panel.querySelector('#admin-flow-select').value;
      if (typeof ChatEngine !== 'undefined') {
        ChatEngine.open();
        ChatEngine.playFlow(flow);
      }
    });

    panel.querySelectorAll('.admin-speed-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        panel.querySelectorAll('.admin-speed-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (typeof ChatEngine !== 'undefined') {
          ChatEngine.demoSpeed = parseFloat(btn.dataset.speed);
        }
      });
    });

    panel.querySelector('#admin-render-btn')?.addEventListener('click', () => {
      const widgetName = panel.querySelector('#admin-widget-select').value;
      if (window.Widgets && typeof window.Widgets[widgetName] === 'function' && typeof ChatEngine !== 'undefined') {
        ChatEngine.open();
        const html = window.Widgets[widgetName]();
        ChatEngine.addWidget(widgetName.replace(/([A-Z])/g, '_$1').toUpperCase(), html);
      }
    });

    panel.querySelector('#admin-reset-btn')?.addEventListener('click', () => {
      if (typeof ChatEngine !== 'undefined') {
        if (ChatEngine.messages) ChatEngine.messages.innerHTML = '';
        ChatEngine.flowToken++;
      }
    });

    panel.querySelector('#admin-auto-btn')?.addEventListener('click', async () => {
      if (typeof ChatEngine === 'undefined') return;
      ChatEngine.open();
      const flows = ['booking', 'concierge', 'dining', 'spa', 'events', 'support', 'modify', 'service', 'explore', 'vip'];
      for (const flowName of flows) {
        ChatEngine.addDivider(`--- ${flowName.toUpperCase()} ---`);
        await ChatEngine.playFlow(flowName);
        await new Promise(r => setTimeout(r, 1000 / ChatEngine.demoSpeed));
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => DemoControls.init());
window.DemoControls = DemoControls;
