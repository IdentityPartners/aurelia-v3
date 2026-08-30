/* ============================================================
   AURELIA v3.0 — HELP SYSTEM
   Tooltips, guides, wizards, AI assistant
   Toggle: Settings → Help System → on/off
   ============================================================ */

'use strict';

const AureliaHelp = {
  enabled: true,
  
  TOOLTIPS: {
    // Chat
    'send-btn':           'Send your message (or press Enter)',
    'model-selector-container': 'Choose which AI model to use. Gemma 4 31B is fastest; DeepSeek V4 Flash has 1M context.',
    'agent-research-btn': 'Research Agent: adds citations and sources to responses',
    'agent-atomise-btn':  'Atomisation Agent: breaks content into reusable pieces (quotes, bullets, social posts)',
    'agent-creator-btn':  'Creator Agent: optimises output for content creation and social media',
    'round-robin-btn':    'Round Robin: sends your message to multiple models simultaneously and synthesises the best answer',
    'chat-qwerty-btn':    'On-screen keyboard — useful with Surface Pen or touch',
    'image-gen-btn':      'Generate an image using Pollinations AI (free, no key needed)',
    'attach-btn':         'Attach a file, image, or document to your message',
    'persona-btn':        'Choose a persona: Sardonic Butler, Research Associate, Long-Suffering PA, etc.',
    
    // Research
    'research-btn':       'Search across all selected sources simultaneously',
    'save-run-btn':       'Save this research run to your library',
    
    // Drafting
    'mode-type-btn':      'Switch to keyboard typing mode',
    'mode-hand-btn':      'Switch to handwriting mode — use your Surface Pen',
    'mode-dict-btn':      'Switch to dictation mode — speak your draft',
    'atomise-btn':        'Atomise: break your draft into reusable pieces — quotes, social posts, headlines',
    
    // Platform Manager
    'run-all-btn':        'Run all dev team agents in sequence',
    
    // Settings
    'ingester-worker-name': 'The name of your Cloudflare Worker (usually aurelia-api)',
  },

  GUIDES: {
    chat: {
      title: 'How to use Chat',
      steps: [
        'Type your message in the box at the bottom and press Enter or click the send button',
        'Choose your AI model using the model selector in the top bar — Gemma 4 31B is the fastest',
        'Use the agent chips (Research, Atomise, Creator) to add specialist capabilities',
        'Try Round Robin to get answers from multiple models at once',
        'Click 🎭 to choose a persona (Sardonic Butler, Research Associate, etc.)',
        'Click 📎 to attach files or images to your message',
        'Click 🎨 to generate an image',
      ]
    },
    research: {
      title: 'How to use Research Library',
      steps: [
        'Type your research query in the search box',
        'Select which sources to search using the chips (Tavily, Brave, Exa, etc.)',
        'Click Search to query all selected sources simultaneously',
        'Click any result to see the full detail in the right panel',
        'Use → Chat or → Draft to send results to other modules',
        'Click Save Run to save your research to the library',
        'Switch to "Browse All Sources" to see all 150+ research databases',
      ]
    },
    atomisation: {
      title: 'What is Atomisation?',
      steps: [
        'Atomisation breaks long content into reusable "atomic" pieces',
        'A 2000-word article becomes: 5 LinkedIn posts, 10 tweets, 3 quote cards, 2 podcast scripts',
        'Use it in Drafting Desk: write your content, then click ⚡ Atomise',
        'Use it in Chat: activate the Atomise agent chip before sending',
        'Atomised content goes directly to Creator Studio or Social Queue',
        'Think of it as your content multiplier — write once, publish everywhere',
      ]
    },
    agentiCity: {
      title: 'What is Agenti City?',
      steps: [
        'Agenti City is where you build and manage AI agents',
        'Each agent has a personality, domain expertise, and a lifecycle (Trigger → Plan → Execute → Verify → Persist)',
        'The 10 canonical agents are: Research, Atomisation, Creator, CRM, Monetisation, Platform, Inbox, Life Admin, Website, Agent Builder',
        'You can create custom agents with your own prompts and workflows',
        'Agents can be chained together in the Orchestrator for multi-step workflows',
        'The Round Robin feature in Chat uses multiple agents simultaneously',
      ]
    },
    platformManager: {
      title: 'How to use Platform Manager',
      steps: [
        'Platform Manager tracks all 150 Anglophone platforms for your Identity Partners services',
        'Each platform has a Tier (1=deploy now, 2=build recurring, 3=apply selectively)',
        'Click "Profile" on any platform to add your username, status, and notes',
        'Click "Set Active" to mark platforms where you have live profiles',
        'Use the filters to find platforms by category (Companionship, Coaching, Freelance, etc.)',
        'The Platform Agent can automate profile creation across multiple platforms',
        'Export to CSV to track your platform strategy in a spreadsheet',
      ]
    },
    keyIngester: {
      title: 'How to configure API keys',
      steps: [
        'Go to Settings → Key Ingester',
        'Paste all your API keys in the large text box — one per line',
        'Format: KEY_NAME=your_key_value (spaces and quotes are handled automatically)',
        'Click "Parse & Ingest" to save locally AND push to Cloudflare Secrets',
        'Keys are stored encrypted in Cloudflare — never in plain text',
        'The most important keys are: GROQ_API_KEY, CEREBRAS_API_KEY, GEMINI_PAID_API_KEY',
        'You can get free keys from: groq.com, cerebras.ai, aistudio.google.com',
      ]
    },
  },

  init() {
    this.enabled = localStorage.getItem('aurelia_help_enabled') !== 'false';
    if (!this.enabled) return;
    this.addTooltips();
    this.addHelpButtons();
    this.addFloatingHelper();
  },

  addTooltips() {
    Object.entries(this.TOOLTIPS).forEach(([id, tip]) => {
      const el = document.getElementById(id);
      if (el && !el.dataset.tooltip) {
        el.dataset.tooltip = tip;
        el.setAttribute('title', tip);
      }
    });
    // Also add tooltips to elements with data-help attribute
    document.querySelectorAll('[data-help]').forEach(el => {
      if (!el.dataset.tooltip) {
        el.dataset.tooltip = el.dataset.help;
        el.setAttribute('title', el.dataset.help);
      }
    });
  },

  addHelpButtons() {
    // Add ? buttons next to complex features
    const helpTargets = [
      { selector: '.chat-input-actions', guide: 'chat', label: '? Chat help' },
      { selector: '#research-bar, .research-bar', guide: 'research', label: '? Research help' },
    ];
    helpTargets.forEach(({ selector, guide, label }) => {
      const el = document.querySelector(selector);
      if (el && !el.querySelector('.help-btn')) {
        const btn = document.createElement('button');
        btn.className = 'help-btn';
        btn.textContent = '?';
        btn.title = label;
        btn.style.cssText = 'background:none;border:1px solid var(--border);border-radius:50%;width:18px;height:18px;font-size:10px;cursor:pointer;color:var(--text-faint);display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .15s;margin-left:4px';
        btn.addEventListener('click', (e) => { e.stopPropagation(); this.showGuide(guide); });
        btn.addEventListener('mouseenter', () => { btn.style.borderColor = 'var(--accent)'; btn.style.color = 'var(--accent)'; });
        btn.addEventListener('mouseleave', () => { btn.style.borderColor = 'var(--border)'; btn.style.color = 'var(--text-faint)'; });
        el.appendChild(btn);
      }
    });
  },

  addFloatingHelper() {
    // Add a floating help button in the bottom-right
    const existing = document.getElementById('aurelia-help-fab');
    if (existing) return;
    
    const fab = document.createElement('div');
    fab.id = 'aurelia-help-fab';
    fab.innerHTML = '?';
    fab.title = 'Help & Guides';
    fab.style.cssText = 'position:fixed;bottom:20px;right:20px;width:36px;height:36px;border-radius:50%;background:var(--accent);color:var(--ivory,#fff);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:600;cursor:pointer;z-index:500;box-shadow:0 2px 12px rgba(0,0,0,0.15);transition:all .15s;user-select:none;font-family:var(--font-sans)';
    fab.addEventListener('click', () => this.showHelpMenu());
    fab.addEventListener('mouseenter', () => { fab.style.transform = 'scale(1.1)'; });
    fab.addEventListener('mouseleave', () => { fab.style.transform = 'scale(1)'; });
    document.body.appendChild(fab);
  },

  showHelpMenu() {
    const existing = document.getElementById('aurelia-help-menu');
    if (existing) { existing.remove(); return; }
    
    const menu = document.createElement('div');
    menu.id = 'aurelia-help-menu';
    menu.style.cssText = 'position:fixed;bottom:64px;right:20px;background:var(--surface,#fff);border:1px solid var(--border,rgba(0,0,0,.1));border-radius:12px;padding:12px;z-index:501;box-shadow:0 4px 24px rgba(0,0,0,.12);min-width:220px;font-family:var(--font-sans)';
    
    const guides = Object.entries(this.GUIDES);
    menu.innerHTML = `
      <div style="font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--text-faint,#a8a29e);margin-bottom:8px">Help & Guides</div>
      ${guides.map(([key, g]) => `
        <div onclick="AureliaHelp.showGuide('${key}')" style="padding:8px 10px;border-radius:6px;cursor:pointer;font-size:13px;color:var(--ink,#1c1917);transition:background .12s" onmouseover="this.style.background='var(--bg-2,#f0e9e0)'" onmouseout="this.style.background='none'">
          ${g.title}
        </div>`).join('')}
      <div style="border-top:1px solid var(--border,rgba(0,0,0,.1));margin-top:8px;padding-top:8px">
        <div onclick="AureliaHelp.askAI()" style="padding:8px 10px;border-radius:6px;cursor:pointer;font-size:13px;color:var(--accent,#0f3b3a);font-weight:500;transition:background .12s" onmouseover="this.style.background='var(--bg-2,#f0e9e0)'" onmouseout="this.style.background='none'">
          ✦ Ask AI for help
        </div>
        <div onclick="window.open('/dev-team/','_blank')" style="padding:8px 10px;border-radius:6px;cursor:pointer;font-size:13px;color:var(--muted,#78716c);transition:background .12s" onmouseover="this.style.background='var(--bg-2,#f0e9e0)'" onmouseout="this.style.background='none'">
          🤖 Dev Team
        </div>
        <div onclick="AureliaHelp.toggle()" style="padding:8px 10px;border-radius:6px;cursor:pointer;font-size:12px;color:var(--text-faint,#a8a29e);transition:background .12s" onmouseover="this.style.background='var(--bg-2,#f0e9e0)'" onmouseout="this.style.background='none'">
          ${this.enabled ? '✕ Hide help system' : '✓ Show help system'}
        </div>
      </div>`;
    
    document.body.appendChild(menu);
    // Close on outside click
    setTimeout(() => {
      document.addEventListener('click', function close(e) {
        if (!menu.contains(e.target) && e.target.id !== 'aurelia-help-fab') {
          menu.remove();
          document.removeEventListener('click', close);
        }
      });
    }, 100);
  },

  showGuide(key) {
    const guide = this.GUIDES[key];
    if (!guide) return;
    
    const existing = document.getElementById('aurelia-guide-modal');
    if (existing) existing.remove();
    
    const modal = document.createElement('div');
    modal.id = 'aurelia-guide-modal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(3px)';
    modal.innerHTML = `
      <div style="background:var(--surface,#fff);border-radius:16px;padding:24px;max-width:480px;width:100%;box-shadow:0 12px 40px rgba(0,0,0,.15);font-family:var(--font-sans)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
          <div style="font-family:var(--font-serif,Georgia);font-size:20px;font-weight:500;color:var(--ink,#1c1917)">${guide.title}</div>
          <button onclick="document.getElementById('aurelia-guide-modal').remove()" style="background:none;border:none;font-size:18px;cursor:pointer;color:var(--text-faint,#a8a29e);padding:4px">✕</button>
        </div>
        <ol style="padding-left:20px;display:flex;flex-direction:column;gap:10px">
          ${guide.steps.map(step => `<li style="font-size:13.5px;color:var(--ink-2,#44403c);line-height:1.6">${step}</li>`).join('')}
        </ol>
        <div style="margin-top:16px;display:flex;gap:8px">
          <button onclick="AureliaHelp.askAI('${guide.title}')" style="background:var(--accent,#0f3b3a);color:#fff;border:none;border-radius:8px;padding:8px 16px;font-size:13px;cursor:pointer;font-family:var(--font-sans)">✦ Ask AI about this</button>
          <button onclick="document.getElementById('aurelia-guide-modal').remove()" style="background:none;border:1px solid var(--border,rgba(0,0,0,.1));border-radius:8px;padding:8px 16px;font-size:13px;cursor:pointer;color:var(--muted,#78716c);font-family:var(--font-sans)">Close</button>
        </div>
      </div>`;
    
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
  },

  askAI(context) {
    const query = context ? `Help me understand: ${context}` : 'How do I use Aurelia?';
    sessionStorage.setItem('aurelia_new_chat_query', query);
    window.location.href = '/chat/index.html';
  },

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('aurelia_help_enabled', this.enabled);
    const fab = document.getElementById('aurelia-help-fab');
    if (fab) fab.style.display = this.enabled ? 'flex' : 'none';
    const menu = document.getElementById('aurelia-help-menu');
    if (menu) menu.remove();
    if (typeof Toast !== 'undefined') Toast.show(this.enabled ? 'Help system enabled' : 'Help system hidden — toggle in Settings', 'info');
  },

  // Called from Settings to toggle
  setEnabled(val) {
    this.enabled = val;
    localStorage.setItem('aurelia_help_enabled', val);
    const fab = document.getElementById('aurelia-help-fab');
    if (fab) fab.style.display = val ? 'flex' : 'none';
  }
};

// Auto-init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  AureliaHelp.init();
});
