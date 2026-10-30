// ============================================================
// ManKart — router.js
// Simple hash-based router. Add new routes/pages here.
// ============================================================

const Router = (() => {

  const routes = {};
  let currentRoute = null;

  function on(hash, handler) {
    routes[hash] = handler;
  }

  function navigate(hash) {
    window.location.hash = hash;
  }

  function resolve() {
    const hash = window.location.hash.replace('#', '') || 'home';
    currentRoute = hash;

    // Handle portal routes (full-page views)
    const portalRoutes = ['register-pro', 'sell', 'admin'];
    const isPortal = portalRoutes.includes(hash);

    // Toggle main app vs portal views
    const mainApp = document.getElementById('main-app');
    const portalContainer = document.getElementById('portal-container');

    if (isPortal && portalContainer) {
      mainApp && (mainApp.style.display = 'none');
      portalContainer.style.display = 'block';
      portalContainer.innerHTML = '';

      if (routes[hash]) {
        routes[hash](portalContainer);
      }
    } else {
      mainApp && (mainApp.style.display = '');
      portalContainer && (portalContainer.style.display = 'none');

      // Scroll to section for normal app routes
      if (hash !== 'home' && hash !== '') {
        const el = document.getElementById(hash);
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        }
      }

      if (routes[hash]) routes[hash]();
    }

    // Update active nav states
    document.querySelectorAll('[data-route]').forEach(el => {
      el.classList.toggle('active', el.dataset.route === hash);
    });
  }

  function init() {
    window.addEventListener('hashchange', resolve);
    resolve(); // Run on load
  }

  function getCurrent() {
    return currentRoute;
  }

  return { on, navigate, init, resolve, getCurrent };
})();
