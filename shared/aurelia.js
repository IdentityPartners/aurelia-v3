/* ============================================================
   AURELIA v3.0 — SHARED JAVASCRIPT UTILITIES
   Identity Partners | aurelia.identitypartners.uk
   ============================================================ */

'use strict';

/* ── Live Cache Token (LCT) ── */
const LCT = {
  generate() {
    return `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
  },
  inject() {
    const token = this.generate();
    document.documentElement.style.setProperty('--lct', `"${token}"`);
    // Append to all fetch calls via interceptor
    window.__AURELIA_LCT__ = token;
    return token;
  }
};

/* ── Theme System — Full families × variants ── */
const ThemeSystem = {
  // §2.2 Style families
  families: ['elegant','modern','clean','classic','abstract'],
  // §2.3 Time variants
  variants: ['dawn','morn','noon','arvo','dusk','midnight'],

  // Theme definitions: each family+variant maps to CSS variable overrides
  THEMES: {
    // Elegant family — warm ivory base, accent changes by variant
    'elegant-dawn':     { accent:'#b5924c', accent2:'#c9a96e', bg:'#faf8f5', ink:'#1c1917', note:'Sepia morning' },
    'elegant-morn':     { accent:'#6b7c6e', accent2:'#8a9e8d', bg:'#f5f8f5', ink:'#1c2a1c', note:'Sage morning' },
    'elegant-noon':     { accent:'#1e2d40', accent2:'#2c3e55', bg:'#f5f7fa', ink:'#0f1a2a', note:'Navy noon' },
    'elegant-arvo':     { accent:'#8b4513', accent2:'#a0522d', bg:'#fdf5f0', ink:'#2a1008', note:'Terracotta afternoon' },
    'elegant-dusk':     { accent:'#6b3a6b', accent2:'#8b5a8b', bg:'#faf5fa', ink:'#1a0a1a', note:'Plum dusk' },
    'elegant-midnight': { accent:'#b5924c', accent2:'#c9a96e', bg:'#faf8f5', ink:'#1c1917', note:'Default gold' },
    // Modern family — crisp whites, bold accents
    'modern-dawn':      { accent:'#e67e22', accent2:'#f39c12', bg:'#fffef9', ink:'#1a1a1a', note:'Amber dawn' },
    'modern-morn':      { accent:'#2980b9', accent2:'#3498db', bg:'#f8fbff', ink:'#0a1a2a', note:'Blue morn' },
    'modern-noon':      { accent:'#27ae60', accent2:'#2ecc71', bg:'#f8fff9', ink:'#0a1a0a', note:'Green noon' },
    'modern-arvo':      { accent:'#c0392b', accent2:'#e74c3c', bg:'#fff8f8', ink:'#1a0a0a', note:'Red arvo' },
    'modern-dusk':      { accent:'#8e44ad', accent2:'#9b59b6', bg:'#faf8ff', ink:'#0a001a', note:'Purple dusk' },
    'modern-midnight':  { accent:'#1abc9c', accent2:'#16a085', bg:'#f5fffd', ink:'#001a14', note:'Teal midnight' },
    // Clean family — minimal, high contrast
    'clean-dawn':       { accent:'#d4a017', accent2:'#e8b84b', bg:'#ffffff', ink:'#111111', note:'Clean gold' },
    'clean-morn':       { accent:'#0066cc', accent2:'#3399ff', bg:'#ffffff', ink:'#001133', note:'Clean blue' },
    'clean-noon':       { accent:'#006633', accent2:'#009944', bg:'#ffffff', ink:'#001a0d', note:'Clean green' },
    'clean-arvo':       { accent:'#cc3300', accent2:'#ff4422', bg:'#ffffff', ink:'#1a0000', note:'Clean red' },
    'clean-dusk':       { accent:'#660099', accent2:'#9900cc', bg:'#ffffff', ink:'#0d0019', note:'Clean purple' },
    'clean-midnight':   { accent:'#003366', accent2:'#004499', bg:'#f8f9fa', ink:'#000d1a', note:'Clean navy' },
    // Classic family — traditional, serif-forward
    'classic-dawn':     { accent:'#8b6914', accent2:'#a07820', bg:'#fdf8f0', ink:'#1a1000', note:'Parchment' },
    'classic-morn':     { accent:'#1a3a5c', accent2:'#2a4a6c', bg:'#f8f5f0', ink:'#0a0a14', note:'Ink blue' },
    'classic-noon':     { accent:'#2d5a1b', accent2:'#3d6a2b', bg:'#f5f8f0', ink:'#0a140a', note:'Forest' },
    'classic-arvo':     { accent:'#7a2020', accent2:'#8a3030', bg:'#fdf5f5', ink:'#1a0000', note:'Crimson' },
    'classic-dusk':     { accent:'#4a2060', accent2:'#5a3070', bg:'#f8f5fc', ink:'#0a0014', note:'Violet' },
    'classic-midnight': { accent:'#1a1a1a', accent2:'#333333', bg:'#f5f5f0', ink:'#000000', note:'Monochrome' },
    // Abstract family — expressive, unexpected
    'abstract-dawn':    { accent:'#ff6b35', accent2:'#ff8c5a', bg:'#fff8f5', ink:'#1a0800', note:'Coral' },
    'abstract-morn':    { accent:'#00b4d8', accent2:'#48cae4', bg:'#f0fbff', ink:'#001a22', note:'Cyan' },
    'abstract-noon':    { accent:'#f72585', accent2:'#ff4da6', bg:'#fff5fa', ink:'#1a0010', note:'Magenta' },
    'abstract-arvo':    { accent:'#7209b7', accent2:'#9b2de0', bg:'#faf5ff', ink:'#0d0019', note:'Electric purple' },
    'abstract-dusk':    { accent:'#3a86ff', accent2:'#60a0ff', bg:'#f5f8ff', ink:'#001033', note:'Electric blue' },
    'abstract-midnight':{ accent:'#06d6a0', accent2:'#40e8b8', bg:'#f0fff9', ink:'#001a12', note:'Mint' },
  },

  current: { family: 'elegant', variant: 'midnight' },

  init() {
    const saved = localStorage.getItem('aurelia_theme');
    if (saved) {
      try { this.current = JSON.parse(saved); } catch(e) {}
    } else {
      // §2.3 Auto-select variant by time of day
      const h = new Date().getHours();
      if (h >= 5 && h < 8) this.current.variant = 'dawn';
      else if (h >= 8 && h < 12) this.current.variant = 'morn';
      else if (h >= 12 && h < 15) this.current.variant = 'noon';
      else if (h >= 15 && h < 18) this.current.variant = 'arvo';
      else if (h >= 18 && h < 21) this.current.variant = 'dusk';
      else this.current.variant = 'midnight';
    }
    this.apply();
  },

  apply() {
    const key = `${this.current.family}-${this.current.variant}`;
    const theme = this.THEMES[key] || this.THEMES['elegant-midnight'];

    // Set data-theme — CSS in themes.css handles all variable overrides
    document.documentElement.setAttribute('data-theme', key);

    // Also apply inline for immediate effect (before CSS loads)
    if (theme) {
      const root = document.documentElement;
      if (theme.accent) root.style.setProperty('--accent', theme.accent);
      if (theme.accent2) root.style.setProperty('--accent-2', theme.accent2);
      if (theme.bg) root.style.setProperty('--bg', theme.bg);
      if (theme.ink) root.style.setProperty('--ink', theme.ink);
    }

    localStorage.setItem('aurelia_theme', JSON.stringify(this.current));
    document.dispatchEvent(new CustomEvent('aurelia:theme-changed', { detail: { ...this.current, theme } }));
  },

  set(family, variant) {
    if (family) this.current.family = family;
    if (variant) this.current.variant = variant;
    this.apply();
  },

  cycle() {
    // Cycle through variants first, then families
    const vi = this.variants.indexOf(this.current.variant);
    if (vi < this.variants.length - 1) {
      this.current.variant = this.variants[vi + 1];
    } else {
      this.current.variant = this.variants[0];
      const fi = this.families.indexOf(this.current.family);
      this.current.family = this.families[(fi + 1) % this.families.length];
    }
    this.apply();
  },

  getLabel() {
    const key = `${this.current.family}-${this.current.variant}`;
    const theme = this.THEMES[key];
    return `${this.current.family.charAt(0).toUpperCase()+this.current.family.slice(1)} · ${this.current.variant.charAt(0).toUpperCase()+this.current.variant.slice(1)}${theme?' — '+theme.note:''}`;
  },

  // §7.2.4 Theme-aware ink colour for Input Engine
  getThemeInkColor() {
    const key = `${this.current.family}-${this.current.variant}`;
    const inkColors = {
      'elegant-dawn':     '#5c4a2a',  // sepia
      'elegant-morn':     '#2d3a4a',  // graphite
      'elegant-noon':     '#1c3a2a',  // forest ink
      'elegant-arvo':     '#1a2d4a',  // fountain-pen blue
      'elegant-dusk':     '#3a1a2a',  // plum
      'elegant-midnight': '#1c1917',  // deep ink (default)
      'modern-dawn':      '#e67e22',  // amber
      'modern-morn':      '#2980b9',  // blue
      'modern-noon':      '#27ae60',  // green
      'modern-arvo':      '#c0392b',  // red
      'modern-dusk':      '#8e44ad',  // purple
      'modern-midnight':  '#1abc9c',  // teal
      'clean-dawn':       '#d4a017',  // gold
      'clean-morn':       '#0066cc',  // blue
      'clean-noon':       '#006633',  // green
      'clean-arvo':       '#cc3300',  // red
      'clean-dusk':       '#660099',  // purple
      'clean-midnight':   '#003366',  // navy
      'classic-dawn':     '#8b6914',  // parchment
      'classic-morn':     '#1a3a5c',  // ink blue
      'classic-noon':     '#2d5a1b',  // forest
      'classic-arvo':     '#7a2020',  // crimson
      'classic-dusk':     '#4a2060',  // violet
      'classic-midnight': '#1a1a1a',  // monochrome
      'abstract-dawn':    '#ff6b35',  // coral
      'abstract-morn':    '#00b4d8',  // cyan
      'abstract-noon':    '#f72585',  // magenta
      'abstract-arvo':    '#7209b7',  // electric purple
      'abstract-dusk':    '#3a86ff',  // electric blue
      'abstract-midnight':'#06d6a0',  // mint
    };
    return inkColors[key] || '#1c1917';
  }
};

/* ── World Clocks ── */
const WorldClocks = {
  zones: [
    { city: 'Local', tz: Intl.DateTimeFormat().resolvedOptions().timeZone },
    { city: 'London', tz: 'Europe/London' },
    { city: 'Brisbane', tz: 'Australia/Brisbane' },
    { city: 'New York', tz: 'America/New_York' },
    { city: 'Los Angeles', tz: 'America/Los_Angeles' },
    { city: 'Tokyo', tz: 'Asia/Tokyo' }
  ],
  interval: null,

  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const update = () => {
      el.innerHTML = this.zones.map(z => {
        const now = new Date();
        const time = now.toLocaleTimeString('en-GB', { timeZone: z.tz, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const date = now.toLocaleDateString('en-GB', { timeZone: z.tz, weekday: 'short', day: 'numeric', month: 'short' });
        return `<div class="clock-item">
          <span class="clock-city">${z.city}</span>
          <span class="clock-time">${time}</span>
          <span class="clock-date">${date}</span>
        </div>`;
      }).join('');
    };
    update();
    this.interval = setInterval(update, 1000);
  },

  destroy() { if (this.interval) clearInterval(this.interval); }
};

/* ── Pomodoro Timer ── */
const Pomodoro = {
  duration: 25 * 60,
  remaining: 25 * 60,
  running: false,
  interval: null,
  mode: 'work', // work | break

  init(containerId) {
    this.container = document.getElementById(containerId);
    this.render();
  },

  render() {
    if (!this.container) return;
    const mins = Math.floor(this.remaining / 60).toString().padStart(2,'0');
    const secs = (this.remaining % 60).toString().padStart(2,'0');
    const pct = 1 - (this.remaining / this.duration);
    const circumference = 2 * Math.PI * 34;
    const offset = circumference * (1 - pct);
    this.container.innerHTML = `
      <div class="pomodoro-ring" title="${this.mode === 'work' ? 'Focus' : 'Break'} mode">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle class="ring-bg" cx="40" cy="40" r="34"/>
          <circle class="ring-progress" cx="40" cy="40" r="34"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${offset}"
            stroke="${this.mode === 'work' ? 'var(--accent)' : '#10b981'}"/>
        </svg>
        <div class="pomodoro-time">${mins}:${secs}</div>
      </div>
      <div style="display:flex;gap:6px;margin-top:6px">
        <button class="btn btn-sm btn-ghost" onclick="Pomodoro.toggle()">${this.running ? '⏸' : '▶'}</button>
        <button class="btn btn-sm btn-ghost" onclick="Pomodoro.reset()">↺</button>
      </div>`;
  },

  toggle() {
    this.running = !this.running;
    if (this.running) {
      this.interval = setInterval(() => {
        this.remaining--;
        if (this.remaining <= 0) {
          this.running = false;
          clearInterval(this.interval);
          this.mode = this.mode === 'work' ? 'break' : 'work';
          this.duration = this.mode === 'work' ? 25*60 : 5*60;
          this.remaining = this.duration;
          Toast.show(this.mode === 'break' ? '🎉 Break time!' : '🎯 Focus time!', 'info');
        }
        this.render();
      }, 1000);
    } else {
      clearInterval(this.interval);
    }
    this.render();
  },

  reset() {
    clearInterval(this.interval);
    this.running = false;
    this.remaining = this.duration;
    this.render();
  }
};

/* ── Toast Notifications ── */
const Toast = {
  container: null,

  init() {
    this.container = document.createElement('div');
    this.container.className = 'toast-container';
    document.body.appendChild(this.container);
  },

  show(message, type = 'info', duration = 3500) {
    if (!this.container) this.init();
    const icons = { success: '✓', error: '✕', info: 'ℹ' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type] || 'ℹ'}</span><span>${message}</span>`;
    this.container.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'toast-in 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

/* ── Sidebar ── */
const Sidebar = {
  collapsed: false,

  init() {
    this.collapsed = localStorage.getItem('aurelia_sidebar_collapsed') === 'true';
    this.apply();
    // Mark active nav item
    const path = window.location.pathname;
    document.querySelectorAll('.nav-item').forEach(item => {
      const href = item.getAttribute('href') || '';
      if (href && path.startsWith(href) && href !== '/') {
        item.classList.add('active');
      } else if (href === '/' && (path === '/' || path === '/index.html')) {
        item.classList.add('active');
      }
    });
  },

  toggle() {
    this.collapsed = !this.collapsed;
    this.apply();
    localStorage.setItem('aurelia_sidebar_collapsed', this.collapsed);
  },

  apply() {
    const sidebar = document.querySelector('.sidebar');
    const main = document.querySelector('.main-content');
    if (sidebar) sidebar.classList.toggle('collapsed', this.collapsed);
    if (main) main.classList.toggle('sidebar-collapsed', this.collapsed);
  }
};

/* ── Device Token Auth (§12) ── */
const Auth = {
  TOKEN_KEY: 'aurelia_device_token',
  USER_KEY: 'aurelia_user',
  REMEMBER_KEY: 'aurelia_remember_me',
  TOKEN_EXPIRY_KEY: 'aurelia_token_expiry',
  // GDPR-compliant: long-lived device token (90 days), no tracking
  TOKEN_LIFETIME_MS: 90 * 24 * 60 * 60 * 1000,

  getToken() {
    // Check expiry (§12.6 Token Persistence)
    const expiry = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
    if (expiry && Date.now() > parseInt(expiry)) {
      // Token expired — regenerate silently (GDPR-safe, no re-login required)
      const newToken = `dt_${Date.now()}_${Math.random().toString(36).slice(2,12)}`;
      this.setToken(newToken, this.getUser());
      return newToken;
    }
    return localStorage.getItem(this.TOKEN_KEY);
  },

  isAuthenticated() { return !!this.getToken(); },

  setToken(token, user) {
    localStorage.setItem(this.TOKEN_KEY, token);
    // Set expiry (§12.6)
    localStorage.setItem(this.TOKEN_EXPIRY_KEY, String(Date.now() + this.TOKEN_LIFETIME_MS));
    if (user) localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  },

  getUser() {
    try { return JSON.parse(localStorage.getItem(this.USER_KEY) || '{}'); } catch(e) { return {}; }
  },

  // §12.3 Remember-Me (GDPR-compliant — no tracking, just token persistence)
  setRememberMe(enabled) {
    localStorage.setItem(this.REMEMBER_KEY, enabled ? '1' : '0');
    if (!enabled) {
      // Clear token on browser close (session-only)
      sessionStorage.setItem(this.TOKEN_KEY, this.getToken() || '');
    }
  },

  isRemembered() { return localStorage.getItem(this.REMEMBER_KEY) !== '0'; },

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
    window.location.href = '/settings/index.html#auth';
  },

  // §12.7 Token Revocation
  revokeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
    // Generate fresh token
    const token = `dt_${Date.now()}_${Math.random().toString(36).slice(2,12)}`;
    this.setToken(token, this.getUser());
    return token;
  },

  // §12.1 Device Token Flow — auto-create for first-time users
  guard() {
    // Always auto-create a device token if missing — never block access
    if (!this.isAuthenticated()) {
      const token = `dt_${Date.now()}_${Math.random().toString(36).slice(2,14)}`;
      this.setToken(token, { name: 'SJ', org: 'Identity Partners' });
    }
  },

  // §12.2 Magic Link — generate a shareable link with embedded token
  generateMagicLink(email) {
    const token = `ml_${Date.now()}_${Math.random().toString(36).slice(2,16)}`;
    const link = `${window.location.origin}/?magic=${token}&email=${encodeURIComponent(email)}`;
    // Store pending magic token
    localStorage.setItem('aurelia_pending_magic', JSON.stringify({ token, email, ts: Date.now() }));
    return link;
  },

  // Check for magic link on page load
  checkMagicLink() {
    const params = new URLSearchParams(window.location.search);
    const magic = params.get('magic');
    if (magic) {
      const pending = JSON.parse(localStorage.getItem('aurelia_pending_magic') || '{}');
      if (pending.token === magic && Date.now() - pending.ts < 3600000) {
        // Valid magic link — create device token
        const token = `dt_${Date.now()}_${Math.random().toString(36).slice(2,12)}`;
        this.setToken(token, { name: pending.email?.split('@')[0] || 'User', email: pending.email, org: 'Identity Partners' });
        localStorage.removeItem('aurelia_pending_magic');
        // Clean URL
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }
};

/* ── API Client ── */
const AureliaAPI = {
  BASE: '/api',

  async request(endpoint, options = {}) {
    // Always ensure we have a device token — auto-create if missing
    let token = Auth.getToken();
    if (!token) {
      token = `dt_${Date.now()}_${Math.random().toString(36).slice(2,14)}`;
      Auth.setToken(token, { name: 'SJ', org: 'Identity Partners' });
    }
    const lct = window.__AURELIA_LCT__ || LCT.generate();
    const url = `${this.BASE}${endpoint}?_lct=${lct}`;
    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
      'Authorization': `Bearer ${token}`,
      ...(options.headers || {})
    };
    try {
      const res = await fetch(url, { ...options, headers });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch(e) {
      console.error(`[Aurelia API] ${endpoint}:`, e);
      throw e;
    }
  },

  chat(messages, model, options = {}) {
    return this.request('/chat', {
      method: 'POST',
      body: JSON.stringify({ messages, model, ...options })
    });
  },

  research(query, sources = ['tavily','brave','exa']) {
    return this.request('/research', {
      method: 'POST',
      body: JSON.stringify({ query, sources })
    });
  },

  models() { return this.request('/models'); },

  secrets() { return this.request('/secrets/list'); },

  ingestSecret(key, value) {
    return this.request('/secrets/ingest', {
      method: 'POST',
      body: JSON.stringify({ key, value })
    });
  }
};

/* ── Multi-Model Router (client-side display) ── */
const ModelRouter = {
  // §1.5 Model priorities — verified working models (Aug 2026)
  // Gemma 4 31B on Cerebras is the primary model (user preference)
  models: [
    // ── CEREBRAS (PRIMARY) — Gemma 4 31B, ~1800 tok/s ─────────────────────
    { id:'cerebras/gemma-4-31b', name:'Gemma 4 31B', provider:'cerebras', type:'chat', speed:'ultra', ctx:131072, input:0.99, output:1.49, moe:false, recommended:true, notes:'PRIMARY — Vision+Reasoning+Tools' },
    { id:'cerebras/gpt-oss-120b', name:'GPT-OSS 120B', provider:'cerebras', type:'chat', speed:'ultra', ctx:131072, input:0.35, output:0.75, moe:true, notes:'MoE 117B/5.1B active, Production' },
    { id:'cerebras/llama3.1-8b', name:'Llama 3.1 8B (Cerebras)', provider:'cerebras', type:'routing', speed:'ultra', ctx:128000, input:0.10, output:0.10, moe:false },
    // ── GROQ (SECONDARY) — verified Aug 2026 ──────────────────────────────
    { id:'groq/openai/gpt-oss-20b', name:'GPT-OSS 20B (Groq)', provider:'groq', type:'chat', speed:'ultra', ctx:128000, input:0.075, output:0.30, moe:false, notes:'Best value on Groq' },
    { id:'groq/openai/gpt-oss-120b', name:'GPT-OSS 120B (Groq)', provider:'groq', type:'chat', speed:'ultra', ctx:128000, input:0.15, output:0.60, moe:true },
    { id:'groq/qwen/qwen3-32b', name:'Qwen3 32B (Groq)', provider:'groq', type:'chat', speed:'ultra', ctx:128000, input:0.29, output:0.59, moe:false },
    // ── DEEPSEEK V4 — 1M context, thinking mode ───────────────────────────
    { id:'deepseek/deepseek-v4-flash', name:'DeepSeek V4 Flash', provider:'deepseek', type:'reasoning', speed:'fast', ctx:1048576, input:0.22, output:0.66, moe:false, notes:'1M ctx, thinking mode' },
    { id:'deepseek/deepseek-v4-pro', name:'DeepSeek V4 Pro', provider:'deepseek', type:'reasoning', speed:'medium', ctx:1048576, input:0.66, output:1.98, moe:false },
    // ── GEMINI ────────────────────────────────────────────────────────────
    { id:'gemini/gemini-2.5-flash', name:'Gemini 2.5 Flash', provider:'gemini', type:'chat', speed:'fast', ctx:1048576, input:0.30, output:2.50, moe:false },
    { id:'gemini/gemini-2.5-pro', name:'Gemini 2.5 Pro', provider:'gemini', type:'reasoning', speed:'medium', ctx:1048576, input:1.25, output:10.00, moe:false, notes:'1M ctx' },
    // ── MISTRAL (MoE) — Large 3 is 675B/41B active ────────────────────────
    { id:'mistral/mistral-large-latest', name:'Mistral Large 3', provider:'mistral', type:'creative', speed:'fast', ctx:262144, input:0.50, output:1.50, moe:true, notes:'MoE 675B/41B active' },
    { id:'mistral/mistral-small-latest', name:'Mistral Small 4', provider:'mistral', type:'chat', speed:'fast', ctx:131072, input:0.15, output:0.60, moe:false },
    { id:'mistral/ministral-3b-latest', name:'Ministral 3B', provider:'mistral', type:'routing', speed:'ultra', ctx:131072, input:0.10, output:0.10, moe:false },
    { id:'mistral/magistral-medium-latest', name:'Magistral Medium', provider:'mistral', type:'reasoning', speed:'medium', ctx:40000, input:2.00, output:5.00, moe:false },
    // ── OPENROUTER — MoE free models + ultimate fallback ──────────────────
    { id:'openrouter/mistralai/mixtral-8x7b-instruct:free', name:'Mixtral 8x7B (Free)', provider:'openrouter', type:'creative', speed:'medium', ctx:32768, input:0, output:0, moe:true, notes:'FREE MoE' },
    { id:'openrouter/mistralai/mixtral-8x22b-instruct', name:'Mixtral 8x22B', provider:'openrouter', type:'creative', speed:'medium', ctx:65536, input:0.70, output:0.70, moe:true, notes:'MoE 8x22B' },
    { id:'openrouter/auto', name:'OpenRouter Auto', provider:'openrouter', type:'auto', speed:'varies', ctx:0, input:0, output:0, moe:false, notes:'400+ models, ultimate fallback' },
    // ── FIREWORKS — DeepSeek V4 cheapest 1M ctx ───────────────────────────
    { id:'fireworks/accounts/fireworks/models/deepseek-v4-flash', name:'DeepSeek V4 Flash (Fireworks)', provider:'fireworks', type:'reasoning', speed:'fast', ctx:1048576, input:0.14, output:0.28, moe:false, notes:'CHEAPEST 1M ctx' },
    { id:'fireworks/accounts/fireworks/models/gpt-oss-20b', name:'GPT-OSS 20B (Fireworks)', provider:'fireworks', type:'chat', speed:'fast', ctx:128000, input:0.07, output:0.30, moe:false },
    { id:'fireworks/accounts/fireworks/models/mixtral-8x22b-instruct', name:'Mixtral 8x22B (Fireworks)', provider:'fireworks', type:'creative', speed:'medium', ctx:65536, input:0.90, output:0.90, moe:true },
    // ── SAMBANOVA — Gemma 4 available ─────────────────────────────────────
    { id:'sambanova/Gemma-4-31B-IT', name:'Gemma 4 31B (SambaNova)', provider:'sambanova', type:'chat', speed:'ultra', ctx:131072, input:0.38, output:1.15, moe:false },
    { id:'sambanova/Meta-Llama-3.3-70B-Instruct', name:'Llama 3.3 70B (SambaNova)', provider:'sambanova', type:'chat', speed:'ultra', ctx:131072, input:0.60, output:1.20, moe:false },
    // ── KIMI — long context specialist ────────────────────────────────────
    { id:'kimi/kimi-k2-6', name:'Kimi K2.6', provider:'kimi', type:'long-context', speed:'medium', ctx:262144, input:0.95, output:4.00, moe:true, notes:'1T MoE, 32B active' },
    { id:'kimi/kimi-k3', name:'Kimi K3', provider:'kimi', type:'long-context', speed:'medium', ctx:1048576, input:3.00, output:15.00, moe:false, notes:'1M ctx flagship' },
    // ── TOGETHER ──────────────────────────────────────────────────────────
    { id:'together/Qwen/Qwen3.7-Plus', name:'Qwen3.7-Plus (Together)', provider:'together', type:'long-context', speed:'fast', ctx:1048576, input:0.32, output:1.28, moe:false, notes:'1M ctx' },
    // ── COHERE (RAG) ──────────────────────────────────────────────────────
    { id:'cohere/command-r-plus', name:'Command R+', provider:'cohere', type:'rag', speed:'fast', ctx:128000, input:2.50, output:10.00, moe:false, notes:'Enterprise RAG' },
    // ── XAI ───────────────────────────────────────────────────────────────
    { id:'xai/grok-3', name:'Grok 3', provider:'xai', type:'chat', speed:'fast', ctx:131072, input:3.00, output:15.00, moe:false },
    // ── POLLINATIONS — Full marketplace (text, image, audio, video, 3D) ───
    { id:'pollinations/gemma-4-31b', name:'Gemma 4 31B (Pollinations)', provider:'pollinations', type:'chat', speed:'fast', ctx:131072, input:0, output:0, moe:false, notes:'Via Pollinations marketplace' },
    { id:'pollinations/openai', name:'GPT-4o class (Pollinations)', provider:'pollinations', type:'chat', speed:'fast', ctx:128000, input:0, output:0, moe:false, notes:'OpenAI via Pollinations' },
    { id:'pollinations/gemini-3-flash', name:'Gemini 3 Flash (Pollinations)', provider:'pollinations', type:'chat', speed:'ultra', ctx:1048576, input:0, output:0, moe:false, notes:'Gemini via Pollinations' },
    { id:'pollinations/deepseek', name:'DeepSeek (Pollinations)', provider:'pollinations', type:'reasoning', speed:'fast', ctx:1048576, input:0, output:0, moe:false, notes:'DeepSeek via Pollinations' },
    { id:'pollinations/kimi-k3', name:'Kimi K3 (Pollinations)', provider:'pollinations', type:'long-context', speed:'medium', ctx:1048576, input:0, output:0, moe:false, notes:'Kimi K3 via Pollinations' },
    { id:'pollinations/claude', name:'Claude (Pollinations)', provider:'pollinations', type:'chat', speed:'fast', ctx:200000, input:0, output:0, moe:false, notes:'Claude via Pollinations' },
    { id:'pollinations/mistral-large', name:'Mistral Large (Pollinations)', provider:'pollinations', type:'creative', speed:'fast', ctx:262144, input:0, output:0, moe:true, notes:'Mistral Large MoE via Pollinations' },
    { id:'pollinations/grok', name:'Grok (Pollinations)', provider:'pollinations', type:'chat', speed:'fast', ctx:131072, input:0, output:0, moe:false, notes:'Grok via Pollinations' },
    { id:'pollinations/nemotron', name:'Nemotron (Pollinations)', provider:'pollinations', type:'reasoning', speed:'medium', ctx:512000, input:0, output:0, moe:false, notes:'NVIDIA Nemotron via Pollinations' },
  
    // ── LOCAL OLLAMA (user's Surface Pro 9) ──────────────────────────────
    { id:'ollama/gemma4:12b', name:'Gemma 4 12B (Local)', provider:'ollama', type:'chat', speed:'fast', ctx:131072, input:0, output:0, moe:false, recommended:false, notes:'Local — Surface Pro 9' },
    { id:'ollama/phi4:latest', name:'Phi 4 (Local)', provider:'ollama', type:'reasoning', speed:'fast', ctx:16384, input:0, output:0, moe:false, recommended:false, notes:'Local — Surface Pro 9' },
    { id:'ollama/qwen2.5:7b', name:'Qwen 2.5 7B (Local)', provider:'ollama', type:'chat', speed:'ultra', ctx:32768, input:0, output:0, moe:false, recommended:false, notes:'Local — Surface Pro 9' },
    { id:'ollama/deepseek-r1:7b', name:'DeepSeek R1 7B (Local)', provider:'ollama', type:'reasoning', speed:'fast', ctx:32768, input:0, output:0, moe:false, recommended:false, notes:'Local — Surface Pro 9' },
    { id:'ollama/gemma4:e4b', name:'Gemma 4 E4B (Local)', provider:'ollama', type:'chat', speed:'ultra', ctx:131072, input:0, output:0, moe:false, recommended:false, notes:'Local — Surface Pro 9' },
  ],

  current: null,

  init() {
    const saved = localStorage.getItem('aurelia_model');
    // Default: Gemma 2 (user preference) — fast, capable, not Llama
    this.current = saved || 'cerebras/gemma-4-31b';  // Gemma 4 31B — verified working
  },

  set(modelId) {
    this.current = modelId;
    localStorage.setItem('aurelia_model', modelId);
    document.dispatchEvent(new CustomEvent('aurelia:model-changed', { detail: modelId }));
  },

  getCurrent() {
    return this.models.find(m => m.id === this.current) || this.models[0];
  },

  getByType(type) {
    return this.models.filter(m => m.type === type || m.type === 'auto');
  },

  renderSelector(containerId) {
    var el = document.getElementById(containerId);
    if (!el) return;
    var m = this.getCurrent();
    el.innerHTML = "";
    
    var selector = document.createElement("div");
    selector.className = "model-selector";
    selector.title = "Switch AI model";
    selector.onclick = function() { ModelRouter.showPicker(); };
    selector.style.cssText = "display:flex;align-items:center;gap:6px;background:var(--bg-2,#f0e9e0);border:1px solid var(--border);border-radius:var(--radius,8px);padding:5px 10px;font-size:11.5px;color:var(--muted,#78716c);cursor:pointer;transition:all .15s";
    
    var dot = document.createElement("span");
    dot.className = "model-dot";
    dot.style.cssText = "width:6px;height:6px;border-radius:50%;background:var(--sage,#6b7c6e);flex-shrink:0";
    
    var name = document.createElement("span");
    name.textContent = m ? m.name : "Select Model";
    
    var arrow = document.createElement("span");
    arrow.style.cssText = "opacity:0.5";
    arrow.textContent = "▾";
    
    selector.appendChild(dot);
    selector.appendChild(name);
    selector.appendChild(arrow);
    el.appendChild(selector);
  },

  showPicker() {
    var existing = document.getElementById("model-picker-modal");
    if (existing) { existing.remove(); return; }
    
    var self = this;
    var overlay = document.createElement("div");
    overlay.id = "model-picker-modal";
    overlay.className = "modal-overlay open";
    overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px";
    
    var modal = document.createElement("div");
    modal.className = "modal";
    modal.style.cssText = "max-width:480px;width:100%;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:24px;box-shadow:0 12px 40px rgba(0,0,0,.15)";
    
    var header = document.createElement("div");
    header.style.cssText = "display:flex;align-items:center;justify-content:space-between;margin-bottom:16px";
    var title = document.createElement("span");
    title.style.cssText = "font-family:var(--font-serif,Georgia);font-size:18px;font-weight:500;color:var(--ink)";
    title.textContent = "Select AI Model";
    var closeBtn = document.createElement("button");
    closeBtn.style.cssText = "background:none;border:none;font-size:18px;cursor:pointer;color:var(--text-faint,#a8a29e)";
    closeBtn.textContent = "✕";
    closeBtn.onclick = function() { overlay.remove(); };
    header.appendChild(title);
    header.appendChild(closeBtn);
    modal.appendChild(header);
    
    var list = document.createElement("div");
    list.style.cssText = "display:flex;flex-direction:column;gap:6px;max-height:400px;overflow-y:auto";
    
    self.models.forEach(function(m) {
      var card = document.createElement("div");
      card.className = "card";
      card.style.cssText = "cursor:pointer;padding:10px 14px;" + (self.current === m.id ? "border-color:var(--ink);background:var(--gold-4,#f5e9d4)" : "");
      card.onclick = function() {
        ModelRouter.set(m.id);
        overlay.remove();
        ModelRouter.renderSelector("model-selector-container");
      };
      
      var row = document.createElement("div");
      row.style.cssText = "display:flex;align-items:center;justify-content:space-between;gap:8px";
      
      var info = document.createElement("div");
      info.style.cssText = "flex:1;min-width:0";
      
      var nameRow = document.createElement("div");
      nameRow.style.cssText = "display:flex;align-items:center;gap:5px";
      
      var nameEl = document.createElement("div");
      nameEl.style.cssText = "font-size:12.5px;font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap";
      nameEl.textContent = m.name;
      nameRow.appendChild(nameEl);
      
      if (m.recommended) {
        var primBadge = document.createElement("span");
        primBadge.style.cssText = "font-size:9px;background:var(--accent,#0f3b3a);color:#fff;padding:1px 5px;border-radius:3px;flex-shrink:0";
        primBadge.textContent = "★ PRIMARY";
        nameRow.appendChild(primBadge);
      }
      if (m.moe) {
        var moeBadge = document.createElement("span");
        moeBadge.style.cssText = "font-size:9px;background:var(--gold-4,#f5e9d4);color:var(--gold,#b5924c);padding:1px 5px;border-radius:3px;border:1px solid var(--gold-3,#e2c99a);flex-shrink:0";
        moeBadge.textContent = "MoE";
        nameRow.appendChild(moeBadge);
      }
      
      var metaEl = document.createElement("div");
      metaEl.style.cssText = "font-size:10.5px;color:var(--text-faint,#a8a29e)";
      var metaText = m.provider + " · " + m.type;
      if (m.ctx) metaText += " · " + (m.ctx >= 1000000 ? "1M" : (m.ctx/1000).toFixed(0) + "K") + " ctx";
      if (m.input) metaText += " · $" + m.input + "/$" + m.output + "/1M";
      if (m.notes) metaText += " · " + m.notes;
      metaEl.textContent = metaText;
      
      info.appendChild(nameRow);
      info.appendChild(metaEl);
      
      var speedBadge = document.createElement("span");
      var speedColor = m.speed === "ultra" ? "green" : m.speed === "fast" ? "sage" : "gold";
      speedBadge.className = "tag tag-" + speedColor;
      speedBadge.style.cssText = "flex-shrink:0";
      speedBadge.textContent = m.speed;
      
      row.appendChild(info);
      row.appendChild(speedBadge);
      card.appendChild(row);
      list.appendChild(card);
    });
    
    modal.appendChild(list);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    overlay.addEventListener("click", function(e) { if (e.target === overlay) overlay.remove(); });
  }
};

/* ── Audio Ambience ── */
const AudioAmbience = {
  ctx: null,
  source: null,
  gainNode: null,
  current: null,

  tracks: {
    'white-noise': null,
    'nature': 'https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a73467.mp3',
    'lofi': 'https://cdn.pixabay.com/audio/2024/02/28/audio_5d3e5e5e5e.mp3'
  },

  toggle(type) {
    if (this.current === type) {
      this.stop();
      return;
    }
    this.stop();
    this.current = type;
    if (type === 'white-noise') {
      this.playWhiteNoise();
    } else {
      this.playTrack(this.tracks[type]);
    }
    document.querySelectorAll('.atm-tile[data-audio]').forEach(t => {
      t.classList.toggle('active', t.dataset.audio === type);
    });
  },

  playWhiteNoise() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      const bufferSize = 4096;
      const node = this.ctx.createScriptProcessor(bufferSize, 1, 1);
      node.onaudioprocess = e => {
        const out = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) out[i] = Math.random() * 2 - 1;
      };
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.value = 0.05;
      node.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);
      this.source = node;
    } catch(e) { console.warn('Audio not available'); }
  },

  playTrack(url) {
    if (!url) return;
    const audio = new Audio(url);
    audio.loop = true;
    audio.volume = 0.3;
    audio.play().catch(() => {});
    this.source = audio;
  },

  stop() {
    if (this.source) {
      if (this.source.pause) this.source.pause();
      if (this.source.disconnect) this.source.disconnect();
      this.source = null;
    }
    if (this.ctx) { this.ctx.close(); this.ctx = null; }
    this.current = null;
    document.querySelectorAll('.atm-tile[data-audio]').forEach(t => t.classList.remove('active'));
  }
};

/* ── Workspace Manager ── */
const WorkspaceManager = {
  workspaces: [],
  active: null,

  init() {
    const saved = localStorage.getItem('aurelia_workspaces');
    if (saved) {
      try { this.workspaces = JSON.parse(saved); } catch(e) {}
    }
    if (!this.workspaces.length) {
      this.workspaces = [
        { id: 'ip', name: 'Identity Partners', tags: ['#IP','#business'], color: '#7c6af7' },
        { id: 'personal', name: 'Personal', tags: ['#personal','#life'], color: '#10b981' },
        { id: 'research', name: 'Research', tags: ['#research','#academic'], color: '#38bdf8' }
      ];
      this.save();
    }
  },

  save() { localStorage.setItem('aurelia_workspaces', JSON.stringify(this.workspaces)); },

  setActive(id) {
    this.active = id;
    document.dispatchEvent(new CustomEvent('aurelia:workspace-changed', { detail: id }));
  },

  create(name, tags = [], color = '#7c6af7') {
    const ws = { id: `ws_${Date.now()}`, name, tags, color };
    this.workspaces.push(ws);
    this.save();
    return ws;
  }
};

/* ── Auto-resize textarea ── */
function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 160) + 'px';
}

/* ── Fullscreen Manager ── */
const Fullscreen = {
  isFullscreen: false,

  toggle(elementId) {
    const el = elementId ? document.getElementById(elementId) : document.documentElement;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => {
        this.isFullscreen = true;
        document.dispatchEvent(new CustomEvent('aurelia:fullscreen', { detail: true }));
      }).catch(e => {
        // Fallback: expand element to fill viewport
        this.expandElement(el);
      });
    } else {
      document.exitFullscreen().then(() => {
        this.isFullscreen = false;
        document.dispatchEvent(new CustomEvent('aurelia:fullscreen', { detail: false }));
      });
    }
  },

  expandElement(el) {
    // CSS fullscreen fallback
    if (el.dataset.expanded === 'true') {
      el.style.cssText = el.dataset.origStyle || '';
      el.dataset.expanded = 'false';
      this.isFullscreen = false;
    } else {
      el.dataset.origStyle = el.style.cssText;
      el.style.cssText = 'position:fixed!important;top:0!important;left:0!important;width:100vw!important;height:100vh!important;z-index:9999!important;overflow:auto!important;background:var(--bg)!important;';
      el.dataset.expanded = 'true';
      this.isFullscreen = true;
    }
  },

  // Maximise a panel within the page (not true fullscreen)
  maximisePanel(panelId, btnId) {
    const panel = document.getElementById(panelId);
    const btn = btnId ? document.getElementById(btnId) : null;
    if (!panel) return;
    if (panel.dataset.maximised === 'true') {
      panel.style.cssText = panel.dataset.origStyle || '';
      panel.dataset.maximised = 'false';
      if (btn) btn.textContent = '⤢ Maximise';
    } else {
      panel.dataset.origStyle = panel.style.cssText;
      panel.style.cssText = 'position:fixed!important;top:0!important;left:0!important;width:100vw!important;height:100vh!important;z-index:9998!important;overflow:auto!important;background:var(--bg)!important;padding:20px!important;';
      panel.dataset.maximised = 'true';
      if (btn) btn.textContent = '⤡ Restore';
    }
  }
};

/* ── Keyboard Shortcuts ── */
const Shortcuts = {
  init() {
    document.addEventListener('keydown', e => {
      // Ctrl/Cmd + K → focus chat input
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const chatInput = document.querySelector('.chat-input-bar textarea');
        if (chatInput) chatInput.focus();
        else window.location.href = '/chat/index.html';
      }
      // Ctrl/Cmd + B → toggle sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        Sidebar.toggle();
      }
      // F11 → toggle fullscreen
      if (e.key === 'F11') {
        e.preventDefault();
        Fullscreen.toggle();
        const btn = document.getElementById('global-fullscreen-btn');
        if (btn) btn.innerHTML = document.fullscreenElement ? '⤡' : '⤢';
      }
      // Escape → close modals
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
        const picker = document.getElementById('model-picker-modal');
        if (picker) picker.remove();
      }
    });
  }
};

/* ── §1.0-1.5 Input Grammar Engine (Unified Expansion) ── */
const InputGrammar = {
  // §1.0 Global input priority: Pen > Hybrid > Keyboard > Dictation > Touch
  PRIORITY: ['pen', 'hybrid', 'keyboard', 'dictation', 'touch'],

  // §1.1 Conflict resolution rules
  CONFLICT_RULES: {
    'pen+keyboard': 'hybrid',
    'pen+dictation': 'pen',
    'keyboard+dictation': 'keyboard',
    'pen+keyboard+dictation': 'hybrid',
  },

  // §1.3 Input-to-agent mapping
  AGENT_MAP: {
    pen:       ['atomisation', 'creator', 'crm', 'annotation'],
    keyboard:  ['chat', 'platform', 'monetisation'],
    dictation: ['drafting', 'crm'],
    hybrid:    ['orchestrator', 'atomisation', 'creator'],
    touch:     ['navigation'],
  },

  // §1.4 Input-to-orchestrator mapping
  ORCHESTRATOR_MAP: {
    pen:       'structure',
    keyboard:  'text',
    dictation: 'text',
    hybrid:    'structure+text',
    touch:     'navigation',
  },

  // §1.5 Input-to-storage mapping
  STORAGE_MAP: {
    pen:        ['svg', 'json'],
    keyboard:   ['md', 'txt'],
    dictation:  ['md'],
    hybrid:     ['md', 'svg'],
    annotation: ['svg', 'json'],
  },

  // §2.1-2.9 Per-module input grammars
  MODULE_GRAMMARS: {
    chat:         { priority:['pen','hybrid','keyboard','dictation'], inkModes:['inline','ink-to-text','ink-to-command','ink-to-tag'], agents:['research','atomisation','creator'] },
    research:     { priority:['pen-annotation','pen-query','keyboard','dictation'], inkModes:['highlight','underline','margin-notes','contradiction-marks','gap-marks'], agents:['research','citation','contradiction'] },
    drafting:     { priority:['pen','hybrid','keyboard','dictation'], inkModes:['ink-to-outline','ink-to-structure','ink-to-draft','ink-to-rewrite'], agents:['atomisation','drafting'] },
    creator:      { priority:['pen','hybrid','keyboard'], inkModes:['ink-to-asset','ink-to-layout','ink-to-palette','ink-to-script'], agents:['creator'] },
    crm:          { priority:['pen-session','dictation','keyboard'], inkModes:['ink-to-session','ink-to-insight','ink-to-follow-up'], agents:['crm'] },
    social:       { priority:['pen','keyboard','dictation'], inkModes:['ink-to-post','ink-to-carousel','ink-to-variant'], agents:['social'] },
    monetisation: { priority:['pen','keyboard'], inkModes:['ink-to-offer','ink-to-programme','ink-to-funnel'], agents:['monetisation'] },
    platform:     { priority:['pen','keyboard'], inkModes:['ink-to-bio','ink-to-headline','ink-to-banner'], agents:['platform'] },
    settings:     { priority:['pen','keyboard'], inkModes:['ink-to-setting','ink-to-theme','ink-to-rule'], agents:['settings'] },
  },

  currentMode: 'keyboard',
  activeModules: new Set(),

  // Detect current input mode from pointer events
  detectMode(pointerType) {
    if (pointerType === 'pen') {
      this.currentMode = 'pen';
      localStorage.setItem('aurelia_pen_detected', 'true');
    } else if (pointerType === 'touch') {
      this.currentMode = 'touch';
    }
    document.dispatchEvent(new CustomEvent('aurelia:input-mode-changed', { detail: this.currentMode }));
    return this.currentMode;
  },

  // Resolve conflict between two active input modes
  resolveConflict(mode1, mode2) {
    const key = [mode1, mode2].sort().join('+');
    return this.CONFLICT_RULES[key] || mode1;
  },

  // Get agents triggered by current input mode in current module
  getTriggeredAgents(module) {
    const grammar = this.MODULE_GRAMMARS[module];
    if (!grammar) return this.AGENT_MAP[this.currentMode] || [];
    return grammar.agents || [];
  },

  // Get storage formats for current input
  getStorageFormats(inputType) {
    return this.STORAGE_MAP[inputType] || ['md'];
  },

  // Log input override to audit
  logOverride(from, to, reason) {
    const log = JSON.parse(localStorage.getItem('aurelia_audit_log') || '[]');
    log.unshift({ id:`audit_${Date.now()}`, type:'input', action:`Input override: ${from} → ${to}`, detail:reason, ts:Date.now() });
    localStorage.setItem('aurelia_audit_log', JSON.stringify(log.slice(0,200)));
  },

  init() {
    // Listen for pointer events to detect pen
    window.addEventListener('pointerdown', e => {
      if (e.pointerType === 'pen') this.detectMode('pen');
    }, { passive: true });
  }
};

/* ── §3.0-3.9 Storage Schema Manager (Unified Expansion) ── */
const StorageSchema = {
  SCHEMA_VERSION: '3.0.0',

  // §3.0.2 Every object gets version + schemaVersion + metadata
  stamp(obj, type) {
    return {
      ...obj,
      version: (obj.version || 0) + 1,
      schemaVersion: this.SCHEMA_VERSION,
      _type: type,
      _updatedAt: new Date().toISOString(),
      metadata: {
        ...(obj.metadata || {}),
        lct: window.__AURELIA_LCT__ || '',
        user: Auth.getUser()?.name || 'SJ',
      }
    };
  },

  // §3.1 Chat Thread schema
  thread(partial = {}) {
    return this.stamp({
      id: partial.id || `thread_${Date.now()}`,
      workspace: partial.workspace || null,
      project: partial.project || null,
      tags: partial.tags || [],
      messages: partial.messages || [],
      inkLayers: partial.inkLayers || [],
      agentLogs: partial.agentLogs || [],
      modelLogs: partial.modelLogs || [],
      title: partial.title || 'New Conversation',
      ts: partial.ts || Date.now(),
      ...partial
    }, 'thread');
  },

  // §3.2 Research Run schema
  researchRun(partial = {}) {
    return this.stamp({
      id: partial.id || `run_${Date.now()}`,
      workspace: partial.workspace || null,
      project: partial.project || null,
      query: partial.query || '',
      sources: partial.sources || [],
      citations: partial.citations || [],
      contradictions: partial.contradictions || [],
      gaps: partial.gaps || [],
      annotations: partial.annotations || [],
      results: partial.results || [],
      ts: partial.ts || Date.now(),
      ...partial
    }, 'researchRun');
  },

  // §3.3 Draft schema
  draft(partial = {}) {
    return this.stamp({
      id: partial.id || `draft_${Date.now()}`,
      workspace: partial.workspace || null,
      project: partial.project || null,
      title: partial.title || '',
      text: partial.text || '',
      body: partial.body || '',
      inkLayers: partial.inkLayers || [],
      outline: partial.outline || [],
      annotations: partial.annotations || [],
      versions: partial.versions || [],
      ts: partial.ts || Date.now(),
      ...partial
    }, 'draft');
  },

  // §3.4 Creator Asset schema
  creatorAsset(partial = {}) {
    return this.stamp({
      id: partial.id || `asset_${Date.now()}`,
      workspace: partial.workspace || null,
      project: partial.project || null,
      type: partial.type || 'asset',
      title: partial.title || '',
      content: partial.content || '',
      svg: partial.svg || null,
      png: partial.png || null,
      layers: partial.layers || [],
      brandPalette: partial.brandPalette || null,
      annotations: partial.annotations || [],
      ts: partial.ts || Date.now(),
      ...partial
    }, 'creatorAsset');
  },

  // §3.5 CRM Contact schema
  contact(partial = {}) {
    return this.stamp({
      id: partial.id || `contact_${Date.now()}`,
      first: partial.first || '',
      last: partial.last || '',
      email: partial.email || '',
      phone: partial.phone || '',
      role: partial.role || '',
      tags: partial.tags || [],
      programmes: partial.programmes || [],
      timeline: partial.timeline || [],
      notes: partial.notes || [],
      sessionNotes: partial.sessionNotes || [],
      annotations: partial.annotations || [],
      messages: partial.messages || [],
      audioNotes: partial.audioNotes || [],
      videoNotes: partial.videoNotes || [],
      ts: partial.ts || Date.now(),
      ...partial
    }, 'contact');
  },

  // §3.6 Social Post schema
  post(partial = {}) {
    return this.stamp({
      id: partial.id || `post_${Date.now()}`,
      workspace: partial.workspace || null,
      project: partial.project || null,
      platform: partial.platform || 'linkedin',
      content: partial.content || '',
      text: partial.text || '',
      images: partial.images || [],
      variants: partial.variants || [],
      platforms: partial.platforms || [],
      schedule: partial.schedule || null,
      status: partial.status || 'draft',
      annotations: partial.annotations || [],
      tags: partial.tags || [],
      ts: partial.ts || Date.now(),
      ...partial
    }, 'post');
  },

  // §3.7 Offer schema
  offer(partial = {}) {
    return this.stamp({
      id: partial.id || `offer_${Date.now()}`,
      workspace: partial.workspace || null,
      project: partial.project || null,
      name: partial.name || '',
      title: partial.title || '',
      description: partial.desc || partial.description || '',
      price: partial.price || 0,
      type: partial.type || 'One-off',
      pricing: partial.pricing || {},
      structure: partial.structure || [],
      funnel: partial.funnel || [],
      assets: partial.assets || [],
      platforms: partial.platforms || '',
      annotations: partial.annotations || [],
      ts: partial.ts || Date.now(),
      ...partial
    }, 'offer');
  },

  // §3.8 Platform Profile schema
  platformProfile(partial = {}) {
    return this.stamp({
      id: partial.id || `profile_${Date.now()}`,
      platform: partial.platform || '',
      bio: partial.bio || '',
      headline: partial.headline || '',
      banner: partial.banner || null,
      avatar: partial.avatar || null,
      username: partial.username || '',
      status: partial.status || 'inactive',
      variants: partial.variants || [],
      optimisationScore: partial.optimisationScore || 0,
      revenue: partial.revenue || 0,
      notes: partial.notes || '',
      annotations: partial.annotations || [],
      ts: partial.ts || Date.now(),
      ...partial
    }, 'platformProfile');
  },

  // §3.9 Settings schema
  settings(partial = {}) {
    return this.stamp({
      id: 'settings_global',
      theme: partial.theme || { family:'gold', variant:'auto' },
      inputMode: partial.inputMode || 'keyboard',
      deviceTokens: partial.deviceTokens || [],
      privacySettings: partial.privacySettings || { gdpr:true, rememberMe:true },
      memoryRules: partial.memoryRules || { shortTerm:'session', midTerm:'workspace', longTerm:'r2' },
      auditRules: partial.auditRules || { level:'info', maxEntries:500 },
      ...partial
    }, 'settings');
  },

  // §3.0.3 Cross-module linking — add workspace/project/thread context to any object
  link(obj, context = {}) {
    return {
      ...obj,
      workspace: context.workspace || obj.workspace || null,
      project: context.project || obj.project || null,
      thread: context.thread || obj.thread || null,
      agent: context.agent || obj.agent || null,
      membrane: context.membrane || obj.membrane || null,
    };
  },

  // Migrate old objects to new schema (§3.0.2)
  migrate(obj, type) {
    if (obj.schemaVersion === this.SCHEMA_VERSION) return obj;
    // Apply schema defaults for missing fields
    const template = this[type] ? this[type](obj) : obj;
    return { ...template, ...obj, schemaVersion: this.SCHEMA_VERSION };
  },

  // Save with schema stamping
  save(key, data, type) {
    const stamped = Array.isArray(data)
      ? data.map(item => this.stamp(item, type))
      : this.stamp(data, type);
    localStorage.setItem(key, JSON.stringify(stamped));
    return stamped;
  }
};

/* ── §12.4 Browser Password Memory hint ── */
// Aurelia sets autocomplete="off" on sensitive fields but allows
// browser password managers for the magic link email field.
// This is handled per-field in HTML.

/* ── §12.5 Force Fresh (§12.5) ── */
const ForceFresh = {
  // Append cache-busting param to all fetch calls
  enabled: true,

  wrapFetch() {
    if (!this.enabled) return;
    const orig = window.fetch.bind(window);
    window.fetch = (url, opts = {}) => {
      if (typeof url === 'string' && url.startsWith('/api')) {
        const sep = url.includes('?') ? '&' : '?';
        url = `${url}${sep}_ff=${Date.now()}`;
      }
      return orig(url, opts);
    };
  }
};

/* ── §12.8 Versioning ── */
const AureliaVersion = {
  current: '3.0.0',
  build: '2026-08-27',

  check() {
    const stored = localStorage.getItem('aurelia_version');
    if (stored && stored !== this.current) {
      console.info(`[Aurelia] Version updated: ${stored} → ${this.current}`);
      localStorage.setItem('aurelia_version', this.current);
      // Clear stale caches on version change
      LCT.inject();
    } else if (!stored) {
      localStorage.setItem('aurelia_version', this.current);
    }
  },

  getInfo() {
    return { version: this.current, build: this.build, lct: window.__AURELIA_LCT__ };
  }
};

/* ── Init on DOM Ready ── */
document.addEventListener('DOMContentLoaded', () => {
  LCT.inject();
  AureliaVersion.check();
  ForceFresh.wrapFetch();
  ThemeSystem.init();
  Auth.checkMagicLink();
  Auth.guard();
  InputGrammar.init();
  // Add fullscreen button to topbar
  const topbar = document.querySelector('.topbar');
  if (topbar) {
    const fsBtn = document.createElement('button');
    fsBtn.className = 'btn btn-ghost btn-sm';
    fsBtn.id = 'global-fullscreen-btn';
    fsBtn.title = 'Toggle fullscreen (F11)';
    fsBtn.innerHTML = '⤢';
    fsBtn.style.cssText = 'font-size:14px;padding:5px 8px;margin-left:4px';
    fsBtn.onclick = () => {
      Fullscreen.toggle();
      fsBtn.innerHTML = document.fullscreenElement ? '⤡' : '⤢';
    };
    const actions = topbar.querySelector('.topbar-actions');
    if (actions) actions.appendChild(fsBtn);
    else topbar.appendChild(fsBtn);
  }
  // Set Identity Partners brand defaults if not already set
  if (!localStorage.getItem('aurelia_brand')) {
    localStorage.setItem('aurelia_brand', JSON.stringify({
      name: 'Identity Partners',
      tagline: 'Understand your past ✦ Appreciate the present ✦ Define your future',
      primary: '#0f3b3a',
      secondary: '#5c2d3f',
      bg: '#f7f3e9',
      font: 'Cormorant Garamond',
      tone: 'Warm and professional',
      values: 'Authenticity, non-judgement, professional listening, identity development',
      avoid: 'Clinical language, therapy claims, crisis support',
      audience: 'Adults navigating life transitions, late-diagnosed neurodivergent adults'
    }));
  }
  Sidebar.init();
  ModelRouter.init();
  WorkspaceManager.init();
  Toast.init();
  Shortcuts.init();

  // Render world clocks if container exists
  if (document.getElementById('world-clocks')) WorldClocks.render('world-clocks');

  // Render model selector if container exists
  if (document.getElementById('model-selector-container')) ModelRouter.renderSelector('model-selector-container');

  // Render pomodoro if container exists
  if (document.getElementById('pomodoro-container')) Pomodoro.init('pomodoro-container');

  // Auto-resize textareas
  document.querySelectorAll('textarea[data-autoresize]').forEach(ta => {
    ta.addEventListener('input', () => autoResize(ta));
  });

  // Load saved visual theme
  var savedVisualTheme = localStorage.getItem("aurelia_visual_theme");
  if (savedVisualTheme) {
    document.documentElement.setAttribute("data-theme", savedVisualTheme);
  }
});
/* ── Dictation System — Deepgram or Web Speech API ── */
const Dictation = {
  recognition: null,
  active: false,
  targetId: null,
  
  start(targetInputId) {
    if (this.active) { this.stop(); return; }
    this.targetId = targetInputId;
    
    // Try Web Speech API first (works in Edge/Chrome)
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SR();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-GB';
      
      // No profanity filter — use raw transcript
      let finalTranscript = '';
      
      this.recognition.onresult = (e) => {
        let interim = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          if (e.results[i].isFinal) {
            finalTranscript += e.results[i][0].transcript;
          } else {
            interim = e.results[i][0].transcript;
          }
        }
        const el = document.getElementById(this.targetId);
        if (el) {
          // Auto-inject punctuation via simple rules
          let text = finalTranscript + interim;
          text = this.autoPunctuate(text);
          el.value = text;
          if (typeof autoResize === 'function') autoResize(el);
          // Update char count if present
          const cc = document.getElementById('char-count');
          if (cc) cc.textContent = el.value.length;
        }
      };
      
      this.recognition.onerror = (e) => {
        console.warn('Dictation error:', e.error);
        this.stop();
      };
      
      this.recognition.onend = () => {
        if (this.active) this.recognition.start(); // Keep going
      };
      
      this.recognition.start();
      this.active = true;
      this.updateButtons(true);
      if (typeof Toast !== 'undefined') Toast.show('Dictation started — speak now', 'success');
    } else {
      if (typeof Toast !== 'undefined') Toast.show('Speech recognition not supported in this browser', 'error');
    }
  },
  
  stop() {
    if (this.recognition) {
      this.recognition.stop();
      this.recognition = null;
    }
    this.active = false;
    this.updateButtons(false);
    if (typeof Toast !== 'undefined') Toast.show('Dictation stopped', 'info');
  },
  
  toggle(targetInputId) {
    if (this.active && this.targetId === targetInputId) {
      this.stop();
    } else {
      if (this.active) this.stop();
      this.start(targetInputId);
    }
  },
  
  autoPunctuate(text) {
    // Simple auto-punctuation rules
    // Capitalise after sentence endings
    text = text.replace(/([.!?]\s+)([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase());
    // Add period at end if no punctuation
    text = text.trim();
    if (text.length > 0 && !'.!?,;:'.includes(text[text.length-1])) {
      // Don't add period mid-sentence (if last word is short, probably still speaking)
    }
    return text;
  },
  
  updateButtons(active) {
    document.querySelectorAll('[data-dictation-btn]').forEach(btn => {
      const targetId = btn.dataset.dictationBtn;
      if (targetId === this.targetId || !targetId) {
        btn.classList.toggle('active', active);
        btn.title = active ? 'Stop dictation' : 'Start dictation (Deepgram/Web Speech)';
      }
    });
  },
  
  // Create a dictation button for any input
  createButton(targetInputId, small) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-ghost' + (small ? ' btn-sm' : '');
    btn.dataset.dictationBtn = targetInputId;
    btn.title = 'Dictate (click to start/stop)';
    btn.innerHTML = '&#127908;';
    btn.onclick = () => Dictation.toggle(targetInputId);
    return btn;
  }
};

window.Dictation = Dictation;
