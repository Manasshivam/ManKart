// ============================================================
// ManKart — admin.js
// Founder-only admin panel: full control over everything
// Password: change in store.js → ADMIN_PASSWORD_HASH
// ============================================================

function renderAdminPage(container) {
  // If not logged in → show login screen
  if (!Store.isAdminLoggedIn()) {
    renderAdminLogin(container);
    return;
  }
  renderAdminDashboard(container);
}

// ── Admin Login ───────────────────────────────────────────────
function renderAdminLogin(container) {
  container.innerHTML = `
    <div class="portal-page admin-page">
      <div class="portal-nav">
        <a href="#home" class="portal-back">← Back to ManKart</a>
        <div class="portal-nav-logo">🛒 <span>ManKart</span></div>
      </div>
      <div class="portal-body">
        <div class="admin-login-wrap">
          <div class="admin-login-icon">🔐</div>
          <h1 class="portal-title">Founder <span class="text-gradient">Admin Panel</span></h1>
          <p class="portal-subtitle">This area is restricted to ManKart founder only.</p>
          <div class="admin-login-card">
            <div class="form-group">
              <label class="form-label">Admin Password</label>
              <input class="form-input" id="admin-pwd" type="password"
                placeholder="Enter admin password"
                onkeydown="if(event.key==='Enter') doAdminLogin()" />
            </div>
            <button class="btn-portal-submit" onclick="doAdminLogin()">🔓 Login as Founder</button>
            <p class="portal-note" style="margin-top:12px">
              Default password: <code style="background:rgba(255,255,255,0.1);padding:2px 8px;border-radius:6px;font-family:monospace">mankart_admin_2024</code><br/>
              Change it in <code style="font-family:monospace">js/store.js → ADMIN_PASSWORD_HASH</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
  setTimeout(() => document.getElementById('admin-pwd')?.focus(), 100);
}

function doAdminLogin() {
  const pwd = document.getElementById('admin-pwd')?.value;
  if (Store.adminLogin(pwd)) {
    renderAdminDashboard(document.getElementById('portal-container'));
  } else {
    showToast('❌ Incorrect password');
    document.getElementById('admin-pwd').value = '';
    document.getElementById('admin-pwd').focus();
  }
}

// ── Admin Dashboard ───────────────────────────────────────────
function renderAdminDashboard(container) {
  const stats = Store.getStats();
  const pending = Store.getPendingProfessionals();

  container.innerHTML = `
    <div class="portal-page admin-page">
      <div class="portal-nav">
        <a href="#home" class="portal-back">← Back to ManKart</a>
        <div class="portal-nav-logo">🛒 <span>ManKart Admin</span></div>
        <button class="admin-logout-btn" onclick="doAdminLogout()">Logout 🚪</button>
      </div>

      <div class="portal-body">
        <!-- Stats Row -->
        <div class="admin-stats-row">
          <div class="admin-stat-card">
            <div class="admin-stat-icon">🛍️</div>
            <div class="admin-stat-val">${stats.totalUserProducts}</div>
            <div class="admin-stat-label">Seller Products</div>
          </div>
          <div class="admin-stat-card highlight">
            <div class="admin-stat-icon">⏳</div>
            <div class="admin-stat-val">${stats.pendingProfessionals}</div>
            <div class="admin-stat-label">Pending Approvals</div>
          </div>
          <div class="admin-stat-card">
            <div class="admin-stat-icon">✅</div>
            <div class="admin-stat-val">${stats.approvedProfessionals}</div>
            <div class="admin-stat-label">Approved Pros</div>
          </div>
          <div class="admin-stat-card">
            <div class="admin-stat-icon">📝</div>
            <div class="admin-stat-val">${stats.totalRegistrations}</div>
            <div class="admin-stat-label">Total Registrations</div>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div class="admin-tabs">
          <button class="admin-tab active" onclick="switchAdminTab('add-product', this)" id="tab-add-product">
            ➕ Add Product
          </button>
          <button class="admin-tab" onclick="switchAdminTab('manage-products', this)" id="tab-manage-products">
            📦 Manage Products
          </button>
          <button class="admin-tab" onclick="switchAdminTab('approve-pros', this)" id="tab-approve-pros">
            👷 Approve Pros
            ${pending.length > 0 ? `<span class="admin-tab-badge">${pending.length}</span>` : ''}
          </button>
          <button class="admin-tab" onclick="switchAdminTab('all-pros', this)" id="tab-all-pros">
            👥 All Professionals
          </button>
        </div>

        <!-- Tab Content -->
        <div id="admin-tab-content">
          <!-- Rendered by switchAdminTab -->
        </div>
      </div>
    </div>
  `;

  // Load default tab
  switchAdminTab('add-product', document.getElementById('tab-add-product'));
}

function doAdminLogout() {
  Store.adminLogout();
  renderAdminLogin(document.getElementById('portal-container'));
  showToast('👋 Logged out');
}

function switchAdminTab(tab, btn) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  btn?.classList.add('active');
  const content = document.getElementById('admin-tab-content');
  if (!content) return;

  switch(tab) {
    case 'add-product':    renderAdminAddProduct(content); break;
    case 'manage-products': renderAdminManageProducts(content); break;
    case 'approve-pros':   renderAdminApprovePros(content); break;
    case 'all-pros':       renderAdminAllPros(content); break;
  }
}

// ── Tab: Add Product (Founder lists their own products) ───────
function renderAdminAddProduct(container) {
  const categoryOptions = MANKART_DATA.marketCategories.filter(c => c.id !== 'all');
  const emojiOptions = ['🍎','🍌','🥭','🍅','🥦','🧅','🥕','🛒','🥛','🧈','🫙','🍿','🍟','🌾','🥤','🍵','🧁','🍰','🍞','🥚','🧀','🫐','🍇','🍊','🍋','🥬','🧴','🪥','🧽','🔌','📱','🎁','📦','🫒','🌽','🫑','🥝'];

  container.innerHTML = `
    <div class="admin-panel-card">
      <h2 class="admin-section-title">➕ Add Product to Marketplace</h2>
      <p style="color:var(--text-secondary);font-size:0.88rem;margin-bottom:24px">
        As founder, you can directly add products. They go live immediately with a "ManKart Pick" badge.
      </p>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Product Name *</label>
          <input class="form-input" id="admin-prod-name" type="text" placeholder="e.g. Premium Basmati Rice" />
        </div>
        <div class="form-group">
          <label class="form-label">Category *</label>
          <select class="form-select" id="admin-prod-cat">
            <option value="">Select category</option>
            ${categoryOptions.map(c => `<option value="${c.id}">${c.icon} ${c.label}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Pick Emoji Icon *</label>
        <div class="emoji-picker" id="admin-emoji-picker">
          ${emojiOptions.map(e => `<button type="button" class="emoji-opt" onclick="selectAdminEmoji('${e}', this)">${e}</button>`).join('')}
        </div>
        <input type="hidden" id="admin-prod-emoji" value="" />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Selling Price (₹) *</label>
          <input class="form-input" id="admin-prod-price" type="number" placeholder="e.g. 149" min="1" />
        </div>
        <div class="form-group">
          <label class="form-label">MRP / Original Price (₹)</label>
          <input class="form-input" id="admin-prod-original" type="number" placeholder="e.g. 199" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Unit *</label>
          <input class="form-input" id="admin-prod-unit" type="text" placeholder="e.g. 1 kg, 500 ml, 1 pack" />
        </div>
        <div class="form-group">
          <label class="form-label">Delivery Time *</label>
          <select class="form-select" id="admin-prod-delivery">
            <option value="10 min">10 min</option>
            <option value="15 min">15 min</option>
            <option value="20 min" selected>20 min</option>
            <option value="30 min">30 min</option>
            <option value="45 min">45 min</option>
            <option value="Same Day">Same Day</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Stock Status</label>
        <div style="display:flex;gap:20px;margin-top:8px">
          <label style="display:flex;align-items:center;gap:6px;cursor:pointer">
            <input type="radio" name="admin-stock" value="true" checked /> In Stock
          </label>
          <label style="display:flex;align-items:center;gap:6px;cursor:pointer">
            <input type="radio" name="admin-stock" value="false" /> Out of Stock
          </label>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Description (optional)</label>
        <textarea class="form-input" id="admin-prod-desc" rows="2"
          placeholder="Short product description..."></textarea>
      </div>

      <button class="btn-portal-submit" onclick="adminAddProduct()">
        ✅ Add to Marketplace
      </button>

      <div id="admin-product-success" style="display:none;margin-top:16px" class="success-inline">
        ✅ Product added successfully! Visible in Marketplace now.
      </div>
    </div>
  `;
}

function selectAdminEmoji(emoji, btn) {
  document.querySelectorAll('#admin-emoji-picker .emoji-opt').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById('admin-prod-emoji').value = emoji;
}

function adminAddProduct() {
  const name = document.getElementById('admin-prod-name')?.value.trim();
  const category = document.getElementById('admin-prod-cat')?.value;
  const emoji = document.getElementById('admin-prod-emoji')?.value;
  const price = parseInt(document.getElementById('admin-prod-price')?.value);
  const originalPrice = parseInt(document.getElementById('admin-prod-original')?.value) || price;
  const unit = document.getElementById('admin-prod-unit')?.value.trim();
  const deliveryTime = document.getElementById('admin-prod-delivery')?.value;
  const inStock = document.querySelector('input[name="admin-stock"]:checked')?.value === 'true';

  if (!name || !category || !emoji || !price || !unit) {
    showToast('⚠️ Fill all required fields and select an emoji');
    return;
  }

  const discount = originalPrice > price ? Math.round((1 - price / originalPrice) * 100) : 0;

  Store.addProduct({
    name, category, emoji, price, originalPrice,
    unit, deliveryTime, inStock, discount,
    sellerName: 'ManKart',
    source: 'admin',       // admin-added gets "ManKart Pick" badge
    rating: 4.5,
    reviews: 0,
  });

  document.getElementById('admin-product-success').style.display = 'block';
  showToast('✅ Product added to Marketplace!');

  // Clear form
  ['admin-prod-name','admin-prod-price','admin-prod-original','admin-prod-unit','admin-prod-desc'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('admin-prod-cat').value = '';
  document.getElementById('admin-prod-emoji').value = '';
  document.querySelectorAll('#admin-emoji-picker .emoji-opt').forEach(b => b.classList.remove('selected'));

  setTimeout(() => {
    document.getElementById('admin-product-success').style.display = 'none';
  }, 4000);
}

// ── Tab: Manage Products ──────────────────────────────────────
function renderAdminManageProducts(container) {
  const userProducts = Store.getAll('products'); // Only non-seed products

  container.innerHTML = `
    <div class="admin-panel-card">
      <h2 class="admin-section-title">📦 Manage Listed Products</h2>
      <p style="color:var(--text-secondary);font-size:0.88rem;margin-bottom:24px">
        Products listed by you (admin) and by sellers. Seed/demo products are managed in <code style="font-family:monospace">js/data.js</code>.
      </p>

      ${userProducts.length === 0 ? `
        <div class="admin-empty">
          <div style="font-size:2.5rem">📦</div>
          <div>No products listed yet.</div>
          <div style="font-size:0.82rem;color:var(--text-muted)">Add your first product using the "Add Product" tab.</div>
        </div>
      ` : `
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Source</th>
                <th>Seller</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${userProducts.map(p => `
                <tr>
                  <td><span style="font-size:1.3rem">${p.emoji}</span> ${p.name}</td>
                  <td>${p.category}</td>
                  <td>₹${p.price}</td>
                  <td>
                    <span class="admin-badge ${p.source === 'admin' ? 'badge-primary' : 'badge-accent'}">
                      ${p.source === 'admin' ? '👑 Admin' : '🏪 Seller'}
                    </span>
                  </td>
                  <td>${p.sellerName || '—'}</td>
                  <td>
                    <span class="${p.inStock ? 'badge badge-success' : 'badge badge-danger'}">
                      ${p.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td>
                    <button class="admin-action-btn danger"
                      onclick="adminRemoveProduct('${p.id}')">🗑️ Remove</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    </div>
  `;
}

function adminRemoveProduct(id) {
  if (!confirm('Remove this product from the marketplace?')) return;
  Store.removeProduct(id);
  showToast('🗑️ Product removed');
  switchAdminTab('manage-products', document.getElementById('tab-manage-products'));
}

// ── Tab: Approve Professionals ────────────────────────────────
function renderAdminApprovePros(container) {
  const pending = Store.getPendingProfessionals();

  container.innerHTML = `
    <div class="admin-panel-card">
      <h2 class="admin-section-title">👷 Pending Professional Approvals</h2>
      <p style="color:var(--text-secondary);font-size:0.88rem;margin-bottom:24px">
        Review professionals who have registered. Approve to make them visible on ManKart, or reject.
      </p>

      ${pending.length === 0 ? `
        <div class="admin-empty">
          <div style="font-size:2.5rem">✅</div>
          <div>No pending approvals!</div>
          <div style="font-size:0.82rem;color:var(--text-muted)">All registrations have been reviewed.</div>
        </div>
      ` : `
        <div class="approval-cards">
          ${pending.map(pro => `
            <div class="approval-card" id="approval-${pro.id}">
              <div class="approval-header">
                <div class="pro-avatar" style="width:50px;height:50px;font-size:1.5rem">${pro.emoji || '👤'}</div>
                <div>
                  <div style="font-weight:700;font-size:1rem">${pro.name}</div>
                  <div style="font-size:0.78rem;color:var(--text-secondary)">${pro.categoryLabel || pro.category} · ${pro.location}</div>
                  <div style="font-size:0.72rem;color:var(--text-muted)">Registered: ${new Date(pro.createdAt).toLocaleDateString('en-IN')}</div>
                </div>
                <span class="badge badge-accent" style="margin-left:auto">⏳ Pending</span>
              </div>
              <div class="approval-details">
                <div class="approval-row"><span>📞 Phone:</span><span>${pro.phone}</span></div>
                ${pro.email ? `<div class="approval-row"><span>📧 Email:</span><span>${pro.email}</span></div>` : ''}
                <div class="approval-row"><span>💼 Experience:</span><span>${pro.experience}</span></div>
                <div class="approval-row"><span>💰 Rate:</span><span>₹${pro.pricePerHr}/hr</span></div>
                <div class="approval-row"><span>🔧 Skills:</span><span>${(pro.skills || []).join(', ')}</span></div>
                ${pro.bio ? `<div class="approval-row"><span>📝 Bio:</span><span>${pro.bio}</span></div>` : ''}
              </div>
              <div class="approval-actions">
                <button class="admin-action-btn success" onclick="adminApprovePro('${pro.id}')">
                  ✅ Approve & Activate
                </button>
                <button class="admin-action-btn danger" onclick="adminRejectPro('${pro.id}')">
                  ❌ Reject
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

function adminApprovePro(id) {
  Store.approveProfessional(id);
  showToast('✅ Professional approved and now live on ManKart!');
  // Remove card with animation
  const card = document.getElementById(`approval-${id}`);
  if (card) {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.95)';
    card.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      switchAdminTab('approve-pros', document.getElementById('tab-approve-pros'));
      // Update badge on tab
      const stats = Store.getStats();
      const badge = document.querySelector('#tab-approve-pros .admin-tab-badge');
      if (badge) badge.textContent = stats.pendingProfessionals;
    }, 350);
  }
}

function adminRejectPro(id) {
  if (!confirm('Reject this professional registration?')) return;
  Store.rejectProfessional(id);
  showToast('❌ Registration rejected');
  switchAdminTab('approve-pros', document.getElementById('tab-approve-pros'));
}

// ── Tab: All Professionals ────────────────────────────────────
function renderAdminAllPros(container) {
  const allPros = Store.getAllRegisteredProfessionals();
  const seedPros = MANKART_DATA.professionals;

  const statusBadge = (status) => {
    const map = {
      approved: 'badge-success',
      pending: 'badge-accent',
      rejected: 'badge-danger',
    };
    return `<span class="badge ${map[status] || 'badge-primary'}">${status}</span>`;
  };

  container.innerHTML = `
    <div class="admin-panel-card">
      <h2 class="admin-section-title">👥 All Professionals</h2>
      <p style="color:var(--text-secondary);font-size:0.88rem;margin-bottom:16px">
        <strong style="color:var(--primary-light)">${seedPros.length} seed</strong> demo professionals +
        <strong style="color:var(--accent)">${allPros.length} registered</strong> via app.
      </p>

      ${allPros.length === 0 ? `
        <div class="admin-empty">
          <div style="font-size:2.5rem">👷</div>
          <div>No professionals registered yet.</div>
        </div>
      ` : `
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Phone</th>
                <th>Rate</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${allPros.map(pro => `
                <tr>
                  <td>${pro.emoji || '👤'} ${pro.name}</td>
                  <td>${pro.categoryLabel || pro.category}</td>
                  <td>${pro.phone}</td>
                  <td>₹${pro.pricePerHr}/hr</td>
                  <td>${pro.location}</td>
                  <td>${statusBadge(pro.status)}</td>
                  <td style="display:flex;gap:6px;flex-wrap:wrap">
                    ${pro.status === 'pending' ? `<button class="admin-action-btn success" onclick="adminApprovePro('${pro.id}')">✅</button>` : ''}
                    ${pro.status === 'approved' ? `<button class="admin-action-btn warning" onclick="adminRejectPro('${pro.id}')">⛔</button>` : ''}
                    <button class="admin-action-btn danger" onclick="adminDeletePro('${pro.id}')">🗑️</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}

      <div style="margin-top:24px;padding-top:20px;border-top:1px solid var(--border)">
        <h3 style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:12px">📋 Seed / Demo Professionals (from data.js)</h3>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead><tr><th>Name</th><th>Category</th><th>Rating</th><th>Rate</th><th>Status</th></tr></thead>
            <tbody>
              ${seedPros.map(p => `
                <tr>
                  <td>${p.emoji} ${p.name}</td>
                  <td>${p.categoryLabel}</td>
                  <td>⭐ ${p.rating}</td>
                  <td>₹${p.pricePerHr}/hr</td>
                  <td><span class="badge badge-success">Seed Data</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function adminDeletePro(id) {
  if (!confirm('Permanently delete this professional registration?')) return;
  Store.remove('professionals', id);
  showToast('🗑️ Professional deleted');
  switchAdminTab('all-pros', document.getElementById('tab-all-pros'));
}
