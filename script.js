// ── PAGE NAVIGATION ──
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById('page-' + pageId).classList.add('active');
  const navEl = document.getElementById('nav-' + pageId);
  if (navEl) navEl.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── DISEASE DETECTION SIMULATION ──
function simulateDetection() {
  const result = document.getElementById('detectionResult');
  result.style.display = 'none';
  setTimeout(() => { result.style.display = 'block'; result.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 1200);
}

// ── CHATBOT ──
const botResponses = {
  default: [
    "That's a great farming question! Based on current agricultural best practices, I'd recommend consulting with your local Krishi Vigyan Kendra for personalized advice. Can I help you with anything more specific?",
    "Thank you for your question! I can provide guidance on crop management, disease control, government schemes, and market prices. What specific aspect would you like to know more about?",
    "SmartAgri AI has analyzed thousands of agricultural cases. For the best results, please share your location, crop type, and the specific challenge you're facing so I can provide targeted recommendations.",
  ],
  disease: "For pest control on rice, I recommend: 1) Monitor fields regularly for early detection, 2) Use biological controls like Trichogramma for stem borer, 3) Apply neem-based pesticides (3ml/litre) for mild infestations, 4) For severe cases, use Carbofuran 3G at 1kg/acre. Avoid broad-spectrum chemicals during flowering. Would you like more details?",
  fertilizer: "For wheat, the ideal fertilizer schedule is: Basal dose — N:P:K at 120:60:40 kg/ha. Apply half nitrogen + full phosphorus + full potassium at sowing. Apply remaining nitrogen in two splits — at tillering (3 weeks) and jointing (6 weeks). Use micronutrient mixture containing Zinc Sulphate 25 kg/ha if deficiency symptoms appear.",
  scheme: "PM-KISAN provides ₹6,000/year to eligible farmer families in 3 installments of ₹2,000. Eligibility: Small/marginal farmers with cultivable land. To apply: Visit your nearest Common Service Centre or apply online at pmkisan.gov.in with your Aadhaar, bank account, and land records. Would you like help with other schemes?",
  sowing: "For tomatoes in Tamil Nadu, the best sowing times are: Kharif Season — May to June (for rainfed areas), Rabi Season — September to October (main crop), Summer Season — January to February (with irrigation). Ooty regions can grow year-round. Use disease-resistant varieties like Arka Rakshak or CO-3 for best yield."
};

function getBotReply(msg) {
  const m = msg.toLowerCase();
  if (m.includes('pest') || m.includes('disease') || m.includes('control')) return botResponses.disease;
  if (m.includes('fertil') || m.includes('wheat') || m.includes('nutrient')) return botResponses.fertilizer;
  if (m.includes('scheme') || m.includes('kisan') || m.includes('subsid')) return botResponses.scheme;
  if (m.includes('sow') || m.includes('tomato') || m.includes('plant')) return botResponses.sowing;
  return botResponses.default[Math.floor(Math.random() * 3)];
}

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  addMsg(msg, 'user');
  input.value = '';
  setTimeout(() => {
    addMsg(getBotReply(msg), 'bot');
  }, 900);
}

function sendQuickMsg(msg) {
  document.getElementById('chatInput').value = msg;
  sendChatMessage();
}

function addMsg(text, role) {
  const box = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg ' + role;
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  div.innerHTML = `<div class="msg-bubble">${text}</div><div class="msg-time">${now}</div>`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function handleChatKey(e) { if (e.key === 'Enter') sendChatMessage(); }

function selectLang(el, lang) {
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  addMsg(`Language switched to ${lang}. How can I help you with your farming needs?`, 'bot');
}

// ── FILTER TAGS (Schemes) ──
document.querySelectorAll('.filter-tag').forEach(tag => {
  tag.addEventListener('click', function() {
    document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});

// ── ANIMATE ELEMENTS ON SCROLL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.wiki-card, .challenge-card, .scheme-card, .product-card').forEach(el => {
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ════════════════════════════
// AUTH SYSTEM
// ════════════════════════════

// ── TAB SWITCHER ──
function switchTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  document.getElementById('panel-' + tab).classList.add('active');
  // hide messages
  ['loginError','loginSuccess','registerError','registerSuccess'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
}

// ── TOGGLE PASSWORD VISIBILITY ──
function togglePass(inputId, eyeEl) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    eyeEl.textContent = '🙈';
  } else {
    input.type = 'password';
    eyeEl.textContent = '👁️';
  }
}

// ── USER TYPE SELECTION ──
function selectUserType(el) {
  document.querySelectorAll('.user-type-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}

// ── PASSWORD STRENGTH CHECKER ──
function checkStrength(val) {
  const segs = [document.getElementById('s1'), document.getElementById('s2'), document.getElementById('s3'), document.getElementById('s4')];
  const label = document.getElementById('strengthLabel');
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  const colors = ['#ef4444', '#f59e0b', '#3b82f6', '#22c55e'];
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  segs.forEach((s, i) => { s.style.background = i < score ? colors[score - 1] : 'rgba(255,255,255,0.1)'; });
  label.textContent = val.length === 0 ? 'Enter a password' : labels[score - 1] || 'Weak';
  label.style.color = val.length === 0 ? 'rgba(255,255,255,0.4)' : colors[score - 1] || '#ef4444';
}

// ── SHOW TOAST ──
function showToast(icon, title, msg, duration = 3500) {
  document.getElementById('toastIcon').textContent = icon;
  document.getElementById('toastTitle').textContent = title;
  document.getElementById('toastMsg').textContent = msg;
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// ── SIMPLE USER STORE (localStorage simulation in memory) ──
const userStore = {};

// ── HANDLE LOGIN ──
function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errEl = document.getElementById('loginError');
  const sucEl = document.getElementById('loginSuccess');
  errEl.style.display = 'none';
  sucEl.style.display = 'none';

  if (!email || !password) {
    errEl.textContent = 'Please enter your email and password.';
    errEl.style.display = 'block'; return;
  }

  // Check stored users
  const stored = userStore[email];
  if (stored && stored.password === password) {
    sucEl.style.display = 'block';
    setTimeout(() => {
      loginUser(stored);
      showPage('home');
    }, 1000);
  } else if (email === 'demo@smartagri.com' && password === 'demo123') {
    // Demo account
    sucEl.style.display = 'block';
    setTimeout(() => {
      loginUser({ firstName: 'Demo', lastName: 'User', email: 'demo@smartagri.com' });
      showPage('home');
    }, 1000);
  } else {
    errEl.textContent = 'Invalid email or password. Try demo@smartagri.com / demo123';
    errEl.style.display = 'block';
  }
}

// ── HANDLE REGISTER ──
function handleRegister() {
  const firstName = document.getElementById('regFirstName').value.trim();
  const lastName  = document.getElementById('regLastName').value.trim();
  const phone     = document.getElementById('regPhone').value.trim();
  const email     = document.getElementById('regEmail').value.trim();
  const state     = document.getElementById('regState').value;
  const district  = document.getElementById('regDistrict').value.trim();
  const password  = document.getElementById('regPassword').value;
  const confirm   = document.getElementById('regConfirm').value;
  const agreed    = document.getElementById('agreeTerms').checked;
  const userType  = document.querySelector('.user-type-btn.selected')?.dataset.type || 'Farmer';

  const errEl = document.getElementById('registerError');
  const sucEl = document.getElementById('registerSuccess');
  errEl.style.display = 'none';
  sucEl.style.display = 'none';

  if (!firstName || !lastName || !email || !phone || !password || !confirm) {
    errEl.textContent = 'Please fill in all required fields.';
    errEl.style.display = 'block'; return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errEl.textContent = 'Please enter a valid email address.';
    errEl.style.display = 'block'; return;
  }
  if (password.length < 8) {
    errEl.textContent = 'Password must be at least 8 characters.';
    errEl.style.display = 'block'; return;
  }
  if (password !== confirm) {
    errEl.textContent = 'Passwords do not match.';
    errEl.style.display = 'block'; return;
  }
  if (!agreed) {
    errEl.textContent = 'Please agree to the Terms of Service.';
    errEl.style.display = 'block'; return;
  }
  if (userStore[email]) {
    errEl.textContent = 'An account with this email already exists.';
    errEl.style.display = 'block'; return;
  }

  // Store user
  userStore[email] = { firstName, lastName, email, phone, state, district, password, userType };
  sucEl.style.display = 'block';
  showToast('🎉', 'Account Created!', `Welcome to SmartAgri AI, ${firstName}!`);
  setTimeout(() => {
    loginUser({ firstName, lastName, email });
    showPage('home');
  }, 1500);
}

// ── LOGIN USER (update navbar) ──
function loginUser(user) {
  document.getElementById('navAuthButtons').style.display = 'none';
  document.getElementById('navUserProfile').style.display = 'flex';
  document.getElementById('navAvatarText').textContent = user.firstName[0].toUpperCase();
  document.getElementById('navUserName').textContent = user.firstName;
  document.getElementById('dropdownName').textContent = user.firstName + ' ' + user.lastName;
  document.getElementById('dropdownEmail').textContent = user.email;
  showToast('👋', 'Welcome back, ' + user.firstName + '!', 'You are now logged into SmartAgri AI.');
}

// ── LOGOUT ──
function logoutUser() {
  closeDropdown();
  document.getElementById('navAuthButtons').style.display = 'flex';
  document.getElementById('navUserProfile').style.display = 'none';
  showToast('👋', 'Logged out', 'You have been signed out successfully.');
  showPage('home');
}

// ── DROPDOWN TOGGLE ──
function toggleDropdown() {
  document.getElementById('userDropdown').classList.toggle('open');
}
function closeDropdown() {
  document.getElementById('userDropdown').classList.remove('open');
}
// Close on outside click
document.addEventListener('click', function(e) {
  const navUser = document.getElementById('navUserProfile');
  if (navUser && !navUser.contains(e.target)) closeDropdown();
});

// ── SOCIAL LOGIN (demo) ──
function socialLogin(provider) {
  showToast('🌐', provider + ' Login', 'Connecting to ' + provider + '... (Demo mode)');
  setTimeout(() => {
    loginUser({ firstName: provider + 'User', lastName: '', email: provider.toLowerCase() + '@demo.com' });
    showPage('home');
  }, 1500);
}