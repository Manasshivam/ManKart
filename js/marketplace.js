// ============================================================
// ManKart — marketplace.js
// Handles: Product listing (public) + Seller Portal
// ============================================================

// ── Render Market Products ────────────────────────────────────
function renderMarketProducts() {
  const grid = document.getElementById('market-grid');
  if (!grid) return;

  let products = Store.getAllProducts();

  if (state.marketFilter !== 'all') {
    products = products.filter(p => p.category === state.marketFilter);
  }
  if (state.marketSearch) {
    const q = state.marketSearch.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.category && p.category.toLowerCase().includes(q))
    );
  }

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="no-results" style="grid-column:1/-1">
        <div class="no-results-icon">🔍</div>
        <div class="no-results-text">No products found</div>
        <div class="no-results-sub">Try a different category or search term</div>
      </div>`;
    return;
  }

  grid.innerHTML = products.map(product => {
    const cartItem = getCartItem(product.id);
    const qty = cartItem ? cartItem.qty : 0;
    const isSellerListed = product.source === 'seller';

    return `
      <div class="product-card fade-in">
        <div class="product-img">
          ${product.discount > 0 ? `<span class="product-discount">${product.discount}% OFF</span>` : ''}
          ${isSellerListed ? `<span class="seller-tag">🏪 Seller</span>` : ''}
          ${product.emoji}
          ${!product.inStock ? '<div class="out-of-stock-overlay">OUT OF STOCK</div>' : ''}
        </div>
        <div class="product-body">
          <div class="product-name">${product.name}</div>
          <div class="product-unit">${product.unit}</div>
          <div class="product-delivery">⚡ ${product.deliveryTime || product.delivery_time || '30 min'}</div>
          <div class="product-price-row">
            <div class="product-prices">
              <span class="product-price">₹${product.price}</span>
              ${(product.originalPrice || product.original_price) > product.price
                ? `<span class="product-original">₹${product.originalPrice || product.original_price}</span>`
                : ''}
            </div>
            ${product.inStock ? (
              qty > 0 ? `
                <div class="qty-controls">
                  <button class="qty-btn" onclick="removeFromCart(${typeof product.id === 'string' ? `'${product.id}'` : product.id})">−</button>
                  <span class="qty-num">${qty}</span>
                  <button class="qty-btn" onclick="addToCartById(${typeof product.id === 'string' ? `'${product.id}'` : product.id})">+</button>
                </div>
              ` : `
                <button class="add-btn" onclick="addToCartById(${typeof product.id === 'string' ? `'${product.id}'` : product.id})">+</button>
              `
            ) : `<button class="add-btn" disabled>+</button>`}
          </div>
        </div>
      </div>
    `;
  }).join('');

  setTimeout(() => {
    grid.querySelectorAll('.fade-in').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 40);
    });
  }, 50);
}

// Helper — add to cart by ID (works for both numeric and string IDs)
function addToCartById(id) {
  const product = Store.getAllProducts().find(p => p.id == id);
  if (product) addToCart(product);
}

// ── Init Marketplace ──────────────────────────────────────────
function initMarketplace() {
  const chipsEl = document.getElementById('market-category-chips');
  if (chipsEl) {
    chipsEl.innerHTML = MANKART_DATA.marketCategories.map(cat => `
      <button class="chip ${cat.id === 'all' ? 'active' : ''}"
        onclick="setMarketFilter('${cat.id}', this)">
        ${cat.icon} ${cat.label}
      </button>
    `).join('');
  }

  const searchEl = document.getElementById('market-search');
  if (searchEl) {
    searchEl.addEventListener('input', (e) => {
      state.marketSearch = e.target.value.trim();
      renderMarketProducts();
    });
  }

  renderMarketProducts();
}

function setMarketFilter(id, btn) {
  state.marketFilter = id;
  document.querySelectorAll('#market-category-chips .chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderMarketProducts();
}

// ── Seller Portal Page ────────────────────────────────────────
function renderSellerPortalPage(container) {
  const categoryOptions = MANKART_DATA.marketCategories.filter(c => c.id !== 'all');
  const emojiOptions = ['🍎','🍌','🥭','🍅','🥦','🧅','🥕','🥛','🧈','🫙','🍿','🍟','🌾','🥤','🍵','🧴','🪥','🧽','🚽','🔌','📱','🛒','📦','🎁','🧁','🍰','🍞','🥚','🧀','🫐'];

  container.innerHTML = `
    <div class="portal-page">
      <div class="portal-nav">
        <a href="#marketplace" class="portal-back">← Back to ManKart</a>
        <div class="portal-nav-logo">🛒 <span>ManKart</span></div>
      </div>

      <div class="portal-body">
        <div class="portal-hero">
          <div class="portal-hero-icon">🏪</div>
          <h1 class="portal-title">Sell on <span class="text-accent-gradient">ManKart</span></h1>
          <p class="portal-subtitle">
            List your products and reach thousands of local customers.
            Your products go live immediately in the ManKart Marketplace.
          </p>
          <div class="portal-badges">
            <span class="portal-badge">⚡ Instant Listing</span>
            <span class="portal-badge">🛒 Reach Local Buyers</span>
            <span class="portal-badge">📦 You Handle Delivery</span>
          </div>
        </div>

        <div class="portal-form-card" id="seller-form-card">
          <h2 class="portal-form-title">List Your Product</h2>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Your Name / Shop Name *</label>
              <input class="form-input" id="seller-name" type="text" placeholder="e.g. Sharma Fresh Vegetables" />
            </div>
            <div class="form-group">
              <label class="form-label">Contact Phone *</label>
              <input class="form-input" id="seller-phone" type="tel" placeholder="+91 98765 43210" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Product Name *</label>
            <input class="form-input" id="product-name" type="text" placeholder="e.g. Fresh Alphonso Mangoes" />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Category *</label>
              <select class="form-select" id="product-category">
                <option value="">Select category</option>
                ${categoryOptions.map(c => `<option value="${c.id}">${c.icon} ${c.label}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Pick an Emoji Icon *</label>
              <div class="emoji-picker" id="emoji-picker">
                ${emojiOptions.map(e => `<button type="button" class="emoji-opt" onclick="selectEmoji('${e}', this)">${e}</button>`).join('')}
              </div>
              <input type="hidden" id="product-emoji" value="" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Selling Price (₹) *</label>
              <input class="form-input" id="product-price" type="number" placeholder="e.g. 149" min="1" />
            </div>
            <div class="form-group">
              <label class="form-label">Original / MRP Price (₹)</label>
              <input class="form-input" id="product-original" type="number" placeholder="e.g. 199 (for discount)" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Unit / Quantity *</label>
              <input class="form-input" id="product-unit" type="text" placeholder="e.g. 1 kg, 500 ml, 6 pack" />
            </div>
            <div class="form-group">
              <label class="form-label">Est. Delivery Time *</label>
              <select class="form-select" id="product-delivery">
                <option value="10 min">10 min</option>
                <option value="15 min">15 min</option>
                <option value="20 min" selected>20 min</option>
                <option value="30 min">30 min</option>
                <option value="45 min">45 min</option>
                <option value="1 hr">1 hr</option>
                <option value="Same Day">Same Day</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Stock Status</label>
            <div style="display:flex;gap:16px;margin-top:6px">
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer">
                <input type="radio" name="stock" value="true" checked /> In Stock
              </label>
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer">
                <input type="radio" name="stock" value="false" /> Out of Stock
              </label>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Product Description (optional)</label>
            <textarea class="form-input" id="product-desc" rows="2"
              placeholder="Brief description of your product..."></textarea>
          </div>

          <button class="btn-portal-submit" onclick="submitProductListing()">
            🚀 List Product Now
          </button>

          <p class="portal-note">
            📋 Your product will appear immediately in the ManKart Marketplace.
            The ManKart founder can remove listings that violate guidelines.
          </p>
        </div>

        <!-- Success State -->
        <div class="portal-success" id="seller-success" style="display:none">
          <div class="success-icon">🎉</div>
          <h2>Product Listed Successfully!</h2>
          <p>Your product is now live in the ManKart Marketplace and visible to all local customers.</p>
          <div class="success-actions" style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:20px">
            <button class="btn-portal-submit" onclick="resetSellerForm()" style="flex:1;max-width:200px">+ List Another</button>
            <a href="#marketplace" class="btn-portal-submit" style="display:inline-block;text-decoration:none;text-align:center;flex:1;max-width:200px">View Marketplace</a>
          </div>
        </div>
      </div>
    </div>
  `;

  // Set default emoji selection
  document.querySelector('.emoji-opt')?.click();
}

function selectEmoji(emoji, btn) {
  document.querySelectorAll('.emoji-opt').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById('product-emoji').value = emoji;
}

function submitProductListing() {
  const sellerName = document.getElementById('seller-name')?.value.trim();
  const sellerPhone = document.getElementById('seller-phone')?.value.trim();
  const name = document.getElementById('product-name')?.value.trim();
  const category = document.getElementById('product-category')?.value;
  const emoji = document.getElementById('product-emoji')?.value;
  const price = parseInt(document.getElementById('product-price')?.value);
  const originalPrice = parseInt(document.getElementById('product-original')?.value) || price;
  const unit = document.getElementById('product-unit')?.value.trim();
  const deliveryTime = document.getElementById('product-delivery')?.value;
  const inStock = document.querySelector('input[name="stock"]:checked')?.value === 'true';

  if (!sellerName || !sellerPhone || !name || !category || !emoji || !price || !unit) {
    showToast('⚠️ Please fill all required fields and pick an emoji');
    return;
  }

  const discount = originalPrice > price ? Math.round((1 - price / originalPrice) * 100) : 0;

  Store.addProduct({
    name,
    category,
    emoji,
    price,
    originalPrice,
    unit,
    deliveryTime,
    inStock,
    discount,
    sellerName,
    sellerPhone,
    rating: 0,
    reviews: 0,
  });

  document.getElementById('seller-form-card').style.display = 'none';
  document.getElementById('seller-success').style.display = 'flex';
}

function resetSellerForm() {
  document.getElementById('seller-form-card').style.display = 'block';
  document.getElementById('seller-success').style.display = 'none';
  document.getElementById('seller-form-card').querySelectorAll('input, select, textarea').forEach(el => {
    el.value = '';
    if (el.type === 'radio' && el.value === 'true') el.checked = true;
  });
  document.getElementById('product-emoji').value = '';
  document.querySelectorAll('.emoji-opt').forEach(b => b.classList.remove('selected'));
}
