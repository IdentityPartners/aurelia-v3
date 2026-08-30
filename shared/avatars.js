/* ============================================================
   AURELIA v3.0 — AVATAR SYSTEM
   Real image-based avatars for users, models, and personas
   ============================================================ */

'use strict';

const AureliaAvatars = {
  // ── User avatars ────────────────────────────────────────────────────────
  USERS: {
    'SJ': {
      name: 'SJ',
      initials: 'SJ',
      color: '#0f3b3a',
      // Real avatar from Unsplash (professional portrait style)
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    },
    'Olivia': {
      name: 'Olivia',
      initials: 'OL',
      color: '#5c2d3f',
      url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    },
    'Nicholas': {
      name: 'Nicholas',
      initials: 'NJ',
      color: '#1a3a5c',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
    },
  },

  // ── Model family avatars ─────────────────────────────────────────────────
  // Each model family has a distinctive character image
  MODEL_FAMILIES: {
    // DeepSeek — whale (their logo is a whale)
    'deepseek': {
      emoji: '🐋',
      name: 'DeepSeek',
      url: 'https://images.rawpixel.com/image_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI1LTAxL3Jhd3BpeGVsb2ZmaWNlOV9zaW1wbGVfY29sb3JmdWxfZmxhdF92ZWN0b3JfaWxsdXN0cmF0aW9uX29mX2Ffc183OTFiNTAwOS1jZTk5LTQ4ZjktOGVmMy0wY2FjNjgzOTJiMjRfMS5qcGc.jpg',
      color: '#1a5554',
    },
    // Mistral — court jester (Mistral = wind, jester = French court)
    'mistral': {
      emoji: '🎭',
      name: 'Mistral',
      url: 'https://media.craiyon.com/2025-05-16/hgMVcdUBQKSCrmzSLMVDNA.webp',
      color: '#7a3d50',
    },
    // Gemma/Google — gemstone woman
    'gemma': {
      emoji: '💎',
      name: 'Gemma',
      url: 'https://images.rawpixel.com/image_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI1LTA4L3NyLWltYWdlLTE2MDcyNS1nbDA2LXMtMTY0Ni5qcGc.jpg',
      color: '#1565c0',
    },
    // Gemini — gemstone/celestial
    'gemini': {
      emoji: '✨',
      name: 'Gemini',
      url: 'https://images.nightcafe.studio/jobs/tJEak0jC1Zom2H1r2AbR/tJEak0jC1Zom2H1r2AbR--0--ro212.jpg?tr=w-400,c-at_max',
      color: '#1565c0',
    },
    // Meta/Llama — llama
    'llama': {
      emoji: '🦙',
      name: 'Llama',
      url: 'https://cdn.pixabay.com/photo/2026/01/23/13/10/baby-alpaca-illustration-10084421_1280.png',
      color: '#5a3000',
    },
    // Cerebras — lightning/speed
    'cerebras': {
      emoji: '⚡',
      name: 'Cerebras',
      url: 'https://easy-peasy.ai/cdn-cgi/image/quality=70,format=auto,width=500/https://media.easy-peasy.ai/8754fef3-c58d-4e42-bd3a-199f8b409797/dd372649-1327-4dae-90f9-0af4eff06cd5.png',
      color: '#f57f17',
    },
    // Groq — speed/lightning
    'groq': {
      emoji: '🚀',
      name: 'Groq',
      url: null,
      color: '#1565c0',
    },
    // NVIDIA — chip/robot
    'nvidia': {
      emoji: '🤖',
      name: 'NVIDIA',
      url: 'https://as2.ftcdn.net/v2/jpg/05/97/51/13/1000_F_597511354_TaKKJjzvNQK3ao0sS8vgH3vAQuhbcbit.jpg',
      color: '#2e7d32',
    },
    // Claude/Anthropic — owl (wise)
    'claude': {
      emoji: '🦉',
      name: 'Claude',
      url: 'https://as2.ftcdn.net/jpg/01/59/68/47/1000_F_159684724_Exjgd7zYDGehAPlYKSPHaR4wa8xx6a1B.jpg',
      color: '#5c2d3f',
    },
    // OpenAI/GPT — professional
    'openai': {
      emoji: '🧠',
      name: 'GPT',
      url: null,
      color: '#1c1917',
    },
    // Kimi/Moonshot — moon goddess
    'kimi': {
      emoji: '🌙',
      name: 'Kimi',
      url: 'https://images.nightcafe.studio/jobs/tJEak0jC1Zom2H1r2AbR/tJEak0jC1Zom2H1r2AbR--0--ro212.jpg?tr=w-400,c-at_max',
      color: '#4a2060',
    },
    // Cohere — crystal
    'cohere': {
      emoji: '🔮',
      name: 'Cohere',
      url: 'https://avatarfiles.alphacoders.com/376/thumb-1920-376380.png',
      color: '#1a5554',
    },
    // SambaNova — fast/nova
    'sambanova': {
      emoji: '💫',
      name: 'SambaNova',
      url: null,
      color: '#7a3d50',
    },
    // Fireworks — fireworks
    'fireworks': {
      emoji: '🎆',
      name: 'Fireworks',
      url: null,
      color: '#f57f17',
    },
    // Together — community
    'together': {
      emoji: '🤝',
      name: 'Together',
      url: null,
      color: '#2e7d32',
    },
    // Puter — user-pays
    'puter': {
      emoji: '🌐',
      name: 'Puter',
      url: null,
      color: '#1565c0',
    },
    // Default Aurelia
    'aurelia': {
      emoji: 'A',
      name: 'Aurelia',
      url: null,
      color: '#0f3b3a',
    },
  },

  // ── Persona avatars ──────────────────────────────────────────────────────
  PERSONAS: {
    'sardonic-butler': { emoji: '🎩', name: 'Sardonic Butler', color: '#1c1917' },
    'research-associate': { emoji: '🦉', name: 'Research Associate', color: '#1a3a5c' },
    'long-suffering-pa': { emoji: '😤', name: 'Long-Suffering PA', color: '#5c2d3f' },
    'identity-coach': { emoji: '💛', name: 'Identity Coach', color: '#b5924c' },
    'devils-advocate': { emoji: '😈', name: "Devil's Advocate", color: '#8b2635' },
    'wise-sage': { emoji: '🌙', name: 'Wise Sage', color: '#4a2060' },
    'strategist': { emoji: '♟️', name: 'The Strategist', color: '#1a3a5c' },
    'poet': { emoji: '🌹', name: 'The Poet', color: '#7a3d50' },
    'default': { emoji: '✦', name: 'Aurelia', color: '#0f3b3a' },
  },

  // ── Get model family from model ID ───────────────────────────────────────
  getModelFamily(modelId) {
    if (!modelId) return 'aurelia';
    const id = modelId.toLowerCase();
    if (id.includes('deepseek')) return 'deepseek';
    if (id.includes('mistral') || id.includes('mixtral')) return 'mistral';
    if (id.includes('gemma')) return 'gemma';
    if (id.includes('gemini')) return 'gemini';
    if (id.includes('llama') || id.includes('meta')) return 'llama';
    if (id.includes('cerebras')) return 'cerebras';
    if (id.includes('groq')) return 'groq';
    if (id.includes('nvidia') || id.includes('nemotron')) return 'nvidia';
    if (id.includes('claude') || id.includes('anthropic')) return 'claude';
    if (id.includes('gpt') || id.includes('openai')) return 'openai';
    if (id.includes('kimi') || id.includes('moonshot')) return 'kimi';
    if (id.includes('cohere') || id.includes('command')) return 'cohere';
    if (id.includes('sambanova')) return 'sambanova';
    if (id.includes('fireworks')) return 'fireworks';
    if (id.includes('together')) return 'together';
    if (id.includes('puter')) return 'puter';
    return 'aurelia';
  },

  // ── Create avatar element ────────────────────────────────────────────────
  // Returns a DOM element (img or div with emoji/initials)
  createAvatar(type, id, size) {
    size = size || 30;
    let data = null;

    if (type === 'user') {
      data = this.USERS[id] || { initials: (id || 'U').slice(0, 2).toUpperCase(), color: '#0f3b3a' };
    } else if (type === 'model') {
      const family = this.getModelFamily(id);
      data = this.MODEL_FAMILIES[family] || this.MODEL_FAMILIES['aurelia'];
    } else if (type === 'persona') {
      data = this.PERSONAS[id] || this.PERSONAS['default'];
    }

    const el = document.createElement('div');
    el.style.cssText = `width:${size}px;height:${size}px;border-radius:50%;flex-shrink:0;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:${Math.round(size*0.45)}px;font-weight:600;background:${data.color || '#0f3b3a'};color:#fff;border:1px solid rgba(0,0,0,0.08);`;

    if (data.url) {
      const img = document.createElement('img');
      img.src = data.url;
      img.style.cssText = `width:100%;height:100%;object-fit:cover;`;
      img.onerror = () => {
        img.remove();
        el.textContent = data.emoji || data.initials || '?';
      };
      el.appendChild(img);
    } else {
      el.textContent = data.emoji || data.initials || '?';
    }

    return el;
  },

  // ── Get current user ─────────────────────────────────────────────────────
  getCurrentUser() {
    const user = Auth ? Auth.getUser() : {};
    return user.name || 'SJ';
  },

  // ── Get active persona ───────────────────────────────────────────────────
  getActivePersona() {
    try {
      return JSON.parse(localStorage.getItem('aurelia_active_persona') || '{}');
    } catch(e) { return {}; }
  },

  // ── Get AI avatar for a model ID ─────────────────────────────────────────
  getAIAvatar(modelId) {
    const persona = this.getActivePersona();
    if (persona.id) {
      return this.createAvatar('persona', persona.id, 30);
    }
    return this.createAvatar('model', modelId, 30);
  },
};

// Make globally available
window.AureliaAvatars = AureliaAvatars;
