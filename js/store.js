// ============================================================
// ManKart — store.js
// Persistent data layer using localStorage.
// Swap this file's internals for Firebase/Supabase/REST API
// when you're ready — the rest of the app won't change.
// ============================================================

const STORE_KEYS = {
  products: 'mk_products',
  professionals: 'mk_professionals',
  shops: 'mk_shops',
  orders: 'mk_orders',
  cart: 'mk_cart',
  adminAuth: 'mk_admin_auth',
};

const Store = (() => {

  // ── Internal helpers ───────────────────────────────────────
  function _read(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch { return []; }
  }

  function _write(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('[ManKart Store] Write failed:', e);
    }
  }

  function _genId() {
    return 'mk_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
  }

  // ── Generic CRUD ───────────────────────────────────────────
  function getAll(key) {
    return _read(STORE_KEYS[key] || key);
  }

  function getById(key, id) {
    return getAll(key).find(item => item.id === id) || null;
  }

  function add(key, item) {
    const items = getAll(key);
    const newItem = {
      ...item,
      id: item.id || _genId(),
      createdAt: item.createdAt || new Date().toISOString(),
    };
    items.push(newItem);
    _write(STORE_KEYS[key] || key, items);
    return newItem;
  }

  function update(key, id, changes) {
    const items = getAll(key);
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return null;
    items[idx] = { ...items[idx], ...changes, updatedAt: new Date().toISOString() };
    _write(STORE_KEYS[key] || key, items);
    return items[idx];
  }

  function remove(key, id) {
    const items = getAll(key).filter(i => i.id !== id);
    _write(STORE_KEYS[key] || key, items);
  }

  function clear(key) {
    _write(STORE_KEYS[key] || key, []);
  }

  // ── Products (Marketplace) ─────────────────────────────────
  function getAllProducts() {
    const stored = getAll('products');
    // Merge seed data (from data.js) with user-listed products
    const seedIds = new Set(MANKART_DATA.marketProducts.map(p => p.id));
    const userListed = stored.filter(p => !seedIds.has(p.id));
    return [...MANKART_DATA.marketProducts, ...userListed];
  }

  function addProduct(product) {
    return add('products', {
      ...product,
      source: 'seller',
      status: 'active', // sellers' products go live immediately; admin can remove
    });
  }

  function removeProduct(id) {
    remove('products', id);
  }

  function updateProduct(id, changes) {
    return update('products', id, changes);
  }

  // ── Professionals ──────────────────────────────────────────
  function getAllProfessionals() {
    const stored = getAll('professionals');
    const seedIds = new Set(MANKART_DATA.professionals.map(p => p.id));
    const registered = stored.filter(p => !seedIds.has(p.id));
    // Only show approved ones to public
    const approvedRegistered = registered.filter(p => p.status === 'approved');
    return [...MANKART_DATA.professionals, ...approvedRegistered];
  }

  function getPendingProfessionals() {
    return getAll('professionals').filter(p => p.status === 'pending');
  }

  function getAllRegisteredProfessionals() {
    return getAll('professionals');
  }

  function registerProfessional(data) {
    return add('professionals', {
      ...data,
      status: 'pending', // Admin must approve
      source: 'registration',
      verified: false,
    });
  }

  function approveProfessional(id) {
    return update('professionals', id, { status: 'approved', verified: true });
  }

  function rejectProfessional(id) {
    return update('professionals', id, { status: 'rejected' });
  }

  // ── Admin Auth ─────────────────────────────────────────────
  // Simple password check — replace with real auth when needed
  const ADMIN_PASSWORD_HASH = 'mankart_admin_2024'; // Change this in production!

  function adminLogin(password) {
    if (password === ADMIN_PASSWORD_HASH) {
      localStorage.setItem(STORE_KEYS.adminAuth, '1');
      return true;
    }
    return false;
  }

  function adminLogout() {
    localStorage.removeItem(STORE_KEYS.adminAuth);
  }

  function isAdminLoggedIn() {
    return localStorage.getItem(STORE_KEYS.adminAuth) === '1';
  }

  // ── Cart Persistence ───────────────────────────────────────
  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEYS.cart) || '[]');
    } catch { return []; }
  }

  function saveCart(cartItems) {
    localStorage.setItem(STORE_KEYS.cart, JSON.stringify(cartItems));
  }

  // ── Stats for Admin ────────────────────────────────────────
  function getStats() {
    const userProducts = getAll('products');
    const allPros = getAll('professionals');
    return {
      totalUserProducts: userProducts.length,
      pendingProfessionals: allPros.filter(p => p.status === 'pending').length,
      approvedProfessionals: allPros.filter(p => p.status === 'approved').length,
      rejectedProfessionals: allPros.filter(p => p.status === 'rejected').length,
      totalRegistrations: allPros.length,
    };
  }

  // ── Public API ─────────────────────────────────────────────
  return {
    // Generic
    getAll, getById, add, update, remove, clear,
    // Products
    getAllProducts, addProduct, removeProduct, updateProduct,
    // Professionals
    getAllProfessionals, getPendingProfessionals,
    getAllRegisteredProfessionals, registerProfessional,
    approveProfessional, rejectProfessional,
    // Admin
    adminLogin, adminLogout, isAdminLoggedIn,
    // Cart
    getCart, saveCart,
    // Stats
    getStats,
  };
})();
