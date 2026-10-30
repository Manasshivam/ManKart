// ============================================================
// ManKart — professionals.js
// Handles: Professional listing (public) + Self-Registration
// ============================================================

// ── Render Professional Listing ───────────────────────────────
function renderProfessionals() {
  const grid = document.getElementById('pros-grid');
  if (!grid) return;

  let pros = Store.getAllProfessionals();

  if (state.proFilter !== 'all') {
    pros = pros.filter(p => p.category === state.proFilter);
  }

  if (pros.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">👷</div>
        <div class="no-results-text">No professionals found in this category</div>
        <div class="no-results-sub">Try a different filter or <a href="#register-pro" style="color:var(--primary-light)">register as a professional</a></div>
      </div>`;
    return;
  }

  grid.innerHTML = pros.map(pro => `
    <div class="pro-card fade-in">
      <div class="pro-card-header">
        <div class="pro-avatar">${pro.emoji || '👤'}</div>
        <div>
          <div class="pro-name">${pro.name}</div>
          <div class="pro-role">${pro.categoryLabel || pro.category}</div>
          <div class="pro-verified">
            ${pro.verified ? '<span class="verified-badge">✅ Verified Pro</span>' : '<span style="color:var(--accent);font-size:0.68rem;font-weight:600;">🕐 New</span>'}
          </div>
        </div>
      </div>
      <div class="pro-meta">
        <div class="pro-meta-item">
          <div class="pro-meta-val">⭐ ${pro.rating || 'New'}</div>
          <div class="pro-meta-label">Rating</div>
        </div>
        <div class="pro-meta-item">
          <div class="pro-meta-val">${pro.reviews ? pro.reviews + '+' : 'New'}</div>
          <div class="pro-meta-label">Reviews</div>
        </div>
        <div class="pro-meta-item">
          <div class="pro-meta-val">${pro.experience || 'N/A'}</div>
          <div class="pro-meta-label">Experience</div>
        </div>
      </div>
      <div class="pro-skills">
        ${(pro.skills || []).slice(0, 3).map(s => `<span class="pro-skill-tag">${s}</span>`).join('')}
      </div>
      <div class="pro-footer">
        <div class="pro-price">₹${pro.pricePerHr || pro.price_per_hr} <span>/ hr</span></div>
        <button class="btn-book" ${!(pro.available !== false) ? 'disabled' : ''}
          onclick="openBookingModal('pro', '${pro.id}')">
          ${pro.available !== false ? '📅 Book Now' : '⏳ Unavailable'}
        </button>
      </div>
    </div>
  `).join('');

  setTimeout(() => {
    grid.querySelectorAll('.fade-in').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 60);
    });
  }, 50);
}

// ── Init Pro Section ──────────────────────────────────────────
function initProfessionalSection() {
  const chipsEl = document.getElementById('pro-category-chips');
  if (chipsEl) {
    chipsEl.innerHTML = MANKART_DATA.professionalCategories.map(cat => `
      <button class="chip ${cat.id === 'all' ? 'active' : ''}"
        onclick="setProFilter('${cat.id}', this)">
        ${cat.icon} ${cat.label}
      </button>
    `).join('');
  }
  renderProfessionals();
}

function setProFilter(id, btn) {
  state.proFilter = id;
  document.querySelectorAll('#pro-category-chips .chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderProfessionals();
}

// ── Professional Registration Page ────────────────────────────
function renderProRegistrationPage(container) {
  const categoryOptions = [
    { value: 'electrician', label: '⚡ Electrician' },
    { value: 'plumber', label: '🔧 Plumber' },
    { value: 'carpenter', label: '🪚 Carpenter' },
    { value: 'mechanic', label: '🔩 Mechanic' },
    { value: 'painter', label: '🖌️ Painter' },
    { value: 'cleaner', label: '🧹 Cleaner' },
    { value: 'tutor', label: '📚 Tutor' },
    { value: 'chef', label: '👨‍🍳 Home Chef' },
    { value: 'gardener', label: '🌿 Gardener' },
    { value: 'security', label: '🛡️ Security Guard' },
    { value: 'driver', label: '🚗 Driver' },
    { value: 'other', label: '👥 Other' },
  ];

  const categoryEmojis = {
    electrician: '⚡', plumber: '🔧', carpenter: '🪚', mechanic: '🔩',
    painter: '🖌️', cleaner: '🧹', tutor: '📚', chef: '👨‍🍳',
    gardener: '🌿', security: '🛡️', driver: '🚗', other: '👤'
  };

  container.innerHTML = `
    <div class="portal-page">
      <div class="portal-nav">
        <a href="#book-professional" class="portal-back">← Back to ManKart</a>
        <div class="portal-nav-logo">🛒 <span>ManKart</span></div>
      </div>

      <div class="portal-body">
        <div class="portal-hero">
          <div class="portal-hero-icon">👷</div>
          <h1 class="portal-title">Join as a <span class="text-gradient">Professional</span></h1>
          <p class="portal-subtitle">
            Register yourself on ManKart and start getting bookings from thousands of local customers.
            Your profile goes live after founder review — usually within 24 hours.
          </p>
          <div class="portal-badges">
            <span class="portal-badge">✅ Verified Profile</span>
            <span class="portal-badge">💰 Set Your Own Price</span>
            <span class="portal-badge">📱 Get More Bookings</span>
          </div>
        </div>

        <div class="portal-form-card" id="pro-reg-form-card">
          <h2 class="portal-form-title">Your Professional Profile</h2>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Full Name *</label>
              <input class="form-input" id="reg-name" type="text" placeholder="e.g. Rajesh Kumar" />
            </div>
            <div class="form-group">
              <label class="form-label">Phone Number *</label>
              <input class="form-input" id="reg-phone" type="tel" placeholder="+91 98765 43210" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Service Category *</label>
              <select class="form-select" id="reg-category">
                <option value="">Select your profession</option>
                ${categoryOptions.map(c => `<option value="${c.value}">${c.label}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Years of Experience *</label>
              <input class="form-input" id="reg-exp" type="text" placeholder="e.g. 5 yrs" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Price per Hour (₹) *</label>
              <input class="form-input" id="reg-price" type="number" placeholder="e.g. 350" min="50" />
            </div>
            <div class="form-group">
              <label class="form-label">Service Area / Location *</label>
              <input class="form-input" id="reg-location" type="text" placeholder="e.g. Sector 4, Delhi" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Skills (comma separated) *</label>
            <input class="form-input" id="reg-skills" type="text" placeholder="e.g. Wiring, Fan Installation, Switchboard Repair" />
          </div>

          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input class="form-input" id="reg-email" type="email" placeholder="your@email.com (optional)" />
          </div>

          <div class="form-group">
            <label class="form-label">About You / Bio</label>
            <textarea class="form-input" id="reg-bio" rows="3"
              placeholder="Describe your work, experience, and what makes you stand out..."></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Aadhar / ID Number (for verification)</label>
            <input class="form-input" id="reg-id" type="text" placeholder="Last 4 digits of Aadhar (optional)" />
          </div>

          <div class="portal-agreement">
            <input type="checkbox" id="reg-agree" />
            <label for="reg-agree">
              I agree to ManKart's <span style="color:var(--primary-light)">Terms of Service</span> and
              <span style="color:var(--primary-light)">Professional Guidelines</span>.
              I confirm all information provided is accurate.
            </label>
          </div>

          <button class="btn-portal-submit" onclick="submitProRegistration('${JSON.stringify(categoryEmojis).replace(/"/g,'&quot;')}')">
            🚀 Submit Registration
          </button>

          <p class="portal-note">
            📋 Your profile will be reviewed by the ManKart founder and activated within 24 hours.
            You'll receive a confirmation call on your phone number.
          </p>
        </div>

        <!-- Success State (hidden initially) -->
        <div class="portal-success" id="pro-reg-success" style="display:none">
          <div class="success-icon">🎉</div>
          <h2>Registration Submitted!</h2>
          <p>Thank you for registering on ManKart. Our founder will review your profile and activate it within 24 hours. You'll receive a call on your provided number.</p>
          <div class="success-id" id="pro-reg-id"></div>
          <a href="#book-professional" class="btn-portal-submit" style="display:inline-block;text-decoration:none;text-align:center;margin-top:20px">
            ← Back to ManKart
          </a>
        </div>
      </div>
    </div>
  `;
}

function submitProRegistration(emojiMapStr) {
  const emojiMap = JSON.parse(emojiMapStr.replace(/&quot;/g, '"'));

  const name = document.getElementById('reg-name')?.value.trim();
  const phone = document.getElementById('reg-phone')?.value.trim();
  const category = document.getElementById('reg-category')?.value;
  const exp = document.getElementById('reg-exp')?.value.trim();
  const price = document.getElementById('reg-price')?.value;
  const location = document.getElementById('reg-location')?.value.trim();
  const skillsRaw = document.getElementById('reg-skills')?.value.trim();
  const email = document.getElementById('reg-email')?.value.trim();
  const bio = document.getElementById('reg-bio')?.value.trim();
  const agreed = document.getElementById('reg-agree')?.checked;

  if (!name || !phone || !category || !exp || !price || !location || !skillsRaw) {
    showToast('⚠️ Please fill all required fields');
    return;
  }
  if (!agreed) {
    showToast('⚠️ Please agree to the Terms of Service');
    return;
  }

  const categoryLabel = document.getElementById('reg-category')
    .options[document.getElementById('reg-category').selectedIndex].text.replace(/^.{2} /, '');

  const newPro = Store.registerProfessional({
    name,
    phone,
    email,
    category,
    categoryLabel,
    emoji: emojiMap[category] || '👤',
    experience: exp,
    pricePerHr: parseInt(price),
    location,
    skills: skillsRaw.split(',').map(s => s.trim()).filter(Boolean),
    bio,
    available: true,
    rating: null,
    reviews: 0,
    verified: false,
    status: 'pending',
  });

  // Show success
  document.getElementById('pro-reg-form-card').style.display = 'none';
  const successEl = document.getElementById('pro-reg-success');
  successEl.style.display = 'flex';
  document.getElementById('pro-reg-id').textContent = `Registration ID: ${newPro.id}`;
}
