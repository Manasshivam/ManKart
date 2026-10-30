// ============================================================
// ManKart — app.js (Orchestrator)
// Ties together: store, router, professionals, marketplace, admin
// To add a new feature: create a new module JS file and
// register its route here. Nothing else needs to change.
// ============================================================

// ── Global State ─────────────────────────────────────────────
const state = {
  // Cart
  cart: Store.getCart(),

  // Filters
  shopFilter: 'all',
  shopSearch: '',
  proFilter: 'all',
  repairFilter: 'all',
  marketFilter: 'all',
  marketSearch: '',

  // Booking
  bookingItem: null,
  selectedTimeSlot: null,
};

// ── Helpers ───────────────────────────────────────────────────
function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

function formatCurrency(n) {
  return '₹' + Number(n).toLocaleString('en-IN');
}

// ── Cart ──────────────────────────────────────────────────────
function getCartItem(productId) {
  return state.cart.find(i => String(i.id) === String(productId));
}

function addToCart(product) {
  const existing = getCartItem(product.id);
  if (existing) {
    existing.qty++;
  } else {
    state.cart.push({ ...product, qty: 1 });
  }
  Store.saveCart(state.cart);
  updateCartUI();
  showToast(`✅ ${product.name} added to cart`);
}

function removeFromCart(productId) {
  const existing = getCartItem(productId);
  if (!existing) return;
  if (existing.qty > 1) {
    existing.qty--;
  } else {
    state.cart = state.cart.filter(i => String(i.id) !== String(productId));
  }
  Store.saveCart(state.cart);
  updateCartUI();
}

function getCartTotal() {
  return state.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function getCartCount() {
  return state.cart.reduce((sum, i) => sum + i.qty, 0);
}

function updateCartUI() {
  const count = getCartCount();
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    countEl.textContent = count;
    countEl.classList.toggle('visible', count > 0);
  }
  renderCartDrawer();
  renderMarketProducts(); // Refresh qty controls
}

// ── Cart Drawer ───────────────────────────────────────────────
function renderCartDrawer() {
  const itemsEl = document.getElementById('cart-items');
  const emptyEl = document.getElementById('cart-empty');
  const footerEl = document.getElementById('cart-footer');
  if (!itemsEl) return;

  if (state.cart.length === 0) {
    itemsEl.innerHTML = '';
    emptyEl && (emptyEl.style.display = 'flex');
    footerEl && (footerEl.style.display = 'none');
    return;
  }

  emptyEl && (emptyEl.style.display = 'none');
  footerEl && (footerEl.style.display = 'block');

  itemsEl.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <span class="cart-item-emoji">${item.emoji}</span>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatCurrency(item.price)} × ${item.qty} = ${formatCurrency(item.price * item.qty)}</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="removeFromCart('${item.id}')">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="addToCartById('${item.id}')">+</button>
      </div>
    </div>
  `).join('');

  const subtotal = getCartTotal();
  const delivery = subtotal > 0 ? 29 : 0;
  const summaryEl = document.getElementById('cart-summary');
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div class="cart-summary-row"><span>Subtotal</span><span>${formatCurrency(subtotal)}</span></div>
      <div class="cart-summary-row"><span>Delivery</span><span>${delivery === 0 ? 'FREE' : formatCurrency(delivery)}</span></div>
      <div class="cart-total"><span>Total</span><span>${formatCurrency(subtotal + delivery)}</span></div>
    `;
  }
}

function openCart() { document.getElementById('cart-overlay')?.classList.add('open'); }
function closeCart() { document.getElementById('cart-overlay')?.classList.remove('open'); }

// ── Shop Nearby ───────────────────────────────────────────────
function renderShops() {
  const grid = document.getElementById('shops-grid');
  if (!grid) return;

  let shops = MANKART_DATA.shops;
  if (state.shopFilter !== 'all') shops = shops.filter(s => s.category === state.shopFilter);
  if (state.shopSearch) {
    const q = state.shopSearch.toLowerCase();
    shops = shops.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.categoryLabel.toLowerCase().includes(q) ||
      s.tags.some(t => t.toLowerCase().includes(q))
    );
  }
  shops = [...shops].sort((a, b) => a.distanceVal - b.distanceVal);

  if (shops.length === 0) {
    grid.innerHTML = `<div class="no-results"><div class="no-results-icon">🔍</div><div class="no-results-text">No shops found</div><div class="no-results-sub">Try a different keyword</div></div>`;
    return;
  }

  grid.innerHTML = shops.map(shop => `
    <div class="shop-card fade-in">
      <div class="shop-card-emoji">${shop.emoji}</div>
      <div class="shop-card-body">
        <div class="shop-card-header">
          <div>
            <div class="shop-card-name">${shop.name}</div>
            <div class="shop-card-category">${shop.categoryLabel}</div>
          </div>
          <div class="${shop.open ? 'shop-status-open' : 'shop-status-closed'}">
            ${shop.open ? '🟢 Open' : '🔴 Closed'}
          </div>
        </div>
        <div class="shop-card-meta">
          <div class="shop-meta-item">⭐ <span>${shop.rating} (${shop.reviews})</span></div>
          <div class="shop-meta-item">📍 <span>${shop.distance}</span></div>
          <div class="shop-meta-item">🕐 <span>${shop.timing}</span></div>
        </div>
        <div class="shop-card-tags">
          ${shop.tags.slice(0,3).map(t => `<span class="shop-tag">${t}</span>`).join('')}
        </div>
        <div class="shop-card-actions">
          <button class="btn-call" onclick="callShop('${shop.phone}', '${shop.name}')">📞 Call</button>
          <button class="btn-dir" onclick="getDirections('${shop.name}', '${shop.address}')">🗺️ Directions</button>
        </div>
      </div>
    </div>
  `).join('');

  setTimeout(() => {
    grid.querySelectorAll('.fade-in').forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 60));
  }, 50);
}

function callShop(phone, name) {
  showToast(`📞 Calling ${name}...`);
  window.open(`tel:${phone}`);
}

function getDirections(name, address) {
  window.open(`https://maps.google.com/?q=${encodeURIComponent(name + ' ' + address)}`, '_blank');
}

function initShopSection() {
  const chipsEl = document.getElementById('shop-category-chips');
  if (chipsEl) {
    chipsEl.innerHTML = MANKART_DATA.shopCategories.map(cat => `
      <button class="chip ${cat.id === 'all' ? 'active' : ''}" onclick="setShopFilter('${cat.id}', this)">
        ${cat.icon} ${cat.label}
      </button>`).join('');
  }
  const searchEl = document.getElementById('shop-search');
  searchEl?.addEventListener('input', e => { state.shopSearch = e.target.value.trim(); renderShops(); });
  renderShops();
}

function setShopFilter(id, btn) {
  state.shopFilter = id;
  document.querySelectorAll('#shop-category-chips .chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderShops();
}

// ── Repair & Install ──────────────────────────────────────────
function renderRepairServices() {
  const grid = document.getElementById('repair-grid');
  if (!grid) return;
  let services = MANKART_DATA.repairServices;
  if (state.repairFilter !== 'all') services = services.filter(s => s.category === state.repairFilter);

  grid.innerHTML = services.map(svc => `
    <div class="repair-card fade-in">
      <div class="repair-card-top">
        <div class="repair-emoji-box">${svc.emoji}</div>
        <div>
          <div class="repair-card-name">${svc.name}</div>
          <div class="repair-card-sub">${svc.services.length} service types</div>
        </div>
      </div>
      <div class="repair-services">
        ${svc.services.slice(0,4).map(s => `<span class="repair-service-pill">${s}</span>`).join('')}
      </div>
      <div class="repair-footer">
        <div class="repair-price">
          <div class="repair-price-val">${formatCurrency(svc.basePrice)}+</div>
          <div class="repair-price-label">Starting price</div>
        </div>
        <button class="btn-book" onclick="openBookingModal('repair', ${svc.id})">🔧 Book</button>
      </div>
    </div>
  `).join('');

  setTimeout(() => {
    grid.querySelectorAll('.fade-in').forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 60));
  }, 50);
}

function initRepairSection() {
  const chipsEl = document.getElementById('repair-category-chips');
  if (chipsEl) {
    chipsEl.innerHTML = MANKART_DATA.repairCategories.map(cat => `
      <button class="chip ${cat.id === 'all' ? 'active' : ''}" onclick="setRepairFilter('${cat.id}', this)">
        ${cat.icon} ${cat.label}
      </button>`).join('');
  }
  renderRepairServices();
}

function setRepairFilter(id, btn) {
  state.repairFilter = id;
  document.querySelectorAll('#repair-category-chips .chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderRepairServices();
}

// ── Booking Modal ─────────────────────────────────────────────
function openBookingModal(type, id) {
  let item;
  if (type === 'pro') {
    item = Store.getAllProfessionals().find(p => String(p.id) === String(id)) ||
           MANKART_DATA.professionals.find(p => String(p.id) === String(id));
  } else {
    item = MANKART_DATA.repairServices.find(s => s.id === id);
  }
  if (!item) return;

  state.bookingItem = { type, item };
  state.selectedTimeSlot = null;

  const timeSlots = type === 'repair' ? item.timeSlots : ["9-10 AM", "10-11 AM", "2-3 PM", "4-5 PM", "5-6 PM", "6-7 PM"];
  const brands = type === 'repair' ? item.brands : null;

  document.getElementById('booking-modal').innerHTML = `
    <div class="modal-header">
      <div class="modal-title">${type === 'pro' ? `📅 Book ${item.name}` : `🔧 Book ${item.name}`}</div>
      <button class="modal-close" onclick="closeBookingModal()">✕</button>
    </div>
    <div class="form-group">
      <label class="form-label">Your Name</label>
      <input class="form-input" id="book-name" type="text" placeholder="Enter your name" />
    </div>
    <div class="form-group">
      <label class="form-label">Phone Number</label>
      <input class="form-input" id="book-phone" type="tel" placeholder="+91 00000 00000" />
    </div>
    <div class="form-group">
      <label class="form-label">Address / Location</label>
      <input class="form-input" id="book-address" type="text" placeholder="Your address or landmark" />
    </div>
    <div class="form-group">
      <label class="form-label">Date</label>
      <input class="form-input" id="book-date" type="date" min="${new Date().toISOString().split('T')[0]}" />
    </div>
    ${brands ? `<div class="form-group"><label class="form-label">Brand</label>
      <select class="form-select" id="book-brand">
        <option value="">Select brand</option>
        ${brands.map(b => `<option value="${b}">${b}</option>`).join('')}
      </select></div>` : ''}
    ${type === 'repair' ? `<div class="form-group"><label class="form-label">Service Type</label>
      <select class="form-select" id="book-service">
        <option value="">Select service</option>
        ${item.services.map(s => `<option value="${s}">${s}</option>`).join('')}
      </select></div>` : ''}
    <div class="form-group">
      <label class="form-label">Preferred Time Slot</label>
      <div class="time-slots">
        ${timeSlots.map(slot => `<div class="time-slot" onclick="selectTimeSlot(this, '${slot}')">${slot}</div>`).join('')}
      </div>
    </div>
    <button class="btn-confirm" onclick="confirmBooking()">✅ Confirm Booking</button>
  `;

  document.getElementById('booking-overlay').classList.add('open');
}

function selectTimeSlot(el, slot) {
  document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
  state.selectedTimeSlot = slot;
}

function closeBookingModal() {
  document.getElementById('booking-overlay').classList.remove('open');
}

function confirmBooking() {
  const name = document.getElementById('book-name')?.value.trim();
  const phone = document.getElementById('book-phone')?.value.trim();
  const date = document.getElementById('book-date')?.value;
  if (!name || !phone || !date || !state.selectedTimeSlot) {
    showToast('⚠️ Please fill all fields and select a time slot');
    return;
  }
  closeBookingModal();
  showToast(`🎉 Booking confirmed for ${name}! You'll receive a confirmation call.`);
}

// ── PWA Service Worker ────────────────────────────────────────
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('[ManKart] SW registered', reg.scope))
        .catch(err => console.warn('[ManKart] SW failed:', err));
    });
  }
}

// ── Register Routes ───────────────────────────────────────────
// ✅ To add a new page/feature: add Router.on('<route>', handler) here
function registerRoutes() {
  Router.on('register-pro', (container) => renderProRegistrationPage(container));
  Router.on('sell', (container) => renderSellerPortalPage(container));
  Router.on('admin', (container) => renderAdminPage(container));
  // Future routes — just add here:
  // Router.on('track-order', (container) => renderTrackOrderPage(container));
  // Router.on('profile', (container) => renderProfilePage(container));
}

// ── App Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Init all sections
  initShopSection();
  initProfessionalSection();
  initRepairSection();
  initMarketplace();
  initAnimations();

  // Cart
  renderCartDrawer();
  updateCartUI();

  // Cart overlay
  document.getElementById('cart-backdrop')?.addEventListener('click', closeCart);

  // Register routes & init router
  registerRoutes();
  Router.init();

  // PWA
  registerServiceWorker();

  // Geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`)
        .then(r => r.json())
        .then(data => {
          const city = data.address?.city || data.address?.town || data.address?.village || 'Your City';
          const el = document.getElementById('user-city');
          const input = document.getElementById('hero-city-input');
          if (el) el.textContent = city;
          if (input) input.placeholder = `📍 ${city}`;
        }).catch(() => {});
    }, () => {}, { timeout: 5000 });
  }
});
