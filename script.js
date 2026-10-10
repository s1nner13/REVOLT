// ============================================
//  DISCORD CLONE — Script
// ============================================

const messagesEl = document.getElementById('messages');
const input = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

// ---------- DONNÉES DE DÉMO ----------
const USERS = {
  Raven77:   { color: '#ff9eb8', letter: 'R' },
  '2D':      { color: '#5865f2', letter: '2' },
  Kaosedge:  { color: '#3ba55d', letter: 'K' },
  Thanatos1: { color: '#faa61a', letter: 'T' },
};

const CHANNELS = {
  'general': [
    { author: '2D',      text: 'Bon les gars, ce soir on teste les nouveaux sons de Raven 🖤', time: '14:32' },
    { author: 'Raven77', text: 'J\'ai fini de bosser sur PERDITION. Le sound design est chaud.', time: '14:33' },
    { author: 'Kaosedge',text: 'Hâte d\'entendre ça frro 🔥', time: '14:34' },
    { author: 'Thanatos1', text: 'Balance un extrait dans #wip quand tu veux', time: '14:35' },
  ],
  'musique': [
    { author: 'Raven77', text: 'Bon, j\'ai commencé à bosser sur Cakewalk. C\'est chaud mais ça passe.', time: '10:12' },
    { author: '2D',      text: 'Le ProChannel ça bute pour les fades', time: '10:15' },
  ],
  'wip': [
    { author: 'Raven77', text: '[extrait] PERDITION v3 — voix pitchée + reverb long', time: '11:40' },
    { author: 'Kaosedge',text: 'Le mix est propre, mais la basse manque d\'impact', time: '11:42' },
  ],
  'osu': [
    { author: 'Raven77', text: 'Je vise le top 10k pour l\'OWC 2027 💀', time: '09:00' },
    { author: 'Thanatos1', text: 'On y croit, faut juste FC du 5★ clean', time: '09:01' },
  ],
};

// ---------- AFFICHAGE DES MESSAGES ----------
function renderMessages(channelKey) {
  messagesEl.innerHTML = '';
  const msgs = CHANNELS[channelKey] || [];
  msgs.forEach(m => addMessage(m.author, m.text, m.time, false));
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function addMessage(author, text, time, scroll = true) {
  const user = USERS[author] || { color: '#888', letter: author[0]?.toUpperCase() || '?' };
  const now = time || new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  const msg = document.createElement('div');
  msg.className = 'message';
  msg.innerHTML = `
    <div class="msg-avatar" style="background:${user.color}">${user.letter}</div>
    <div class="msg-body">
      <div class="msg-header">
        <span class="msg-author" style="color:${user.color}">${author}</span>
        <span class="msg-time">Aujourd'hui à ${now}</span>
      </div>
      <div class="msg-text">${escapeHtml(text)}</div>
    </div>
  `;
  messagesEl.appendChild(msg);

  if (scroll) messagesEl.scrollTop = messagesEl.scrollHeight;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ---------- ENVOI ----------
function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage('Raven77', text);
  input.value = '';
  input.focus();

  // Petite réponse simulée
  setTimeout(() => {
    const responses = [
      'ouais carré 🖤',
      'grave',
      'j\'avoue',
      'mdr frro',
      'attends je regarde',
      '🔥🔥🔥',
    ];
    addMessage('2D', responses[Math.floor(Math.random() * responses.length)]);
  }, 800 + Math.random() * 1500);
}

sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage();
});

// ---------- NAVIGATION SALONS ----------
document.querySelectorAll('.channel').forEach(ch => {
  ch.addEventListener('click', () => {
    document.querySelectorAll('.channel').forEach(c => c.classList.remove('active'));
    ch.classList.add('active');

    const key = ch.dataset.channel;
    const name = ch.textContent.trim().replace(/^[#🔊\s]+/, '');
    document.querySelector('.chat-name').textContent = name;
    document.querySelector('.composer input').placeholder = `Envoyer un message dans #${name}`;

    if (key) renderMessages(key);
    else messagesEl.innerHTML = ''; // salons vocaux : vide
  });
});

// ---------- NAVIGATION SERVEURS ----------
document.querySelectorAll('.guild[data-server]').forEach(g => {
  g.addEventListener('click', () => {
    document.querySelectorAll('.guild').forEach(x => x.classList.remove('active'));
    g.classList.add('active');
    document.querySelector('.server-name').textContent = g.dataset.server;
  });
});

// ---------- INIT ----------
renderMessages('general');
input.focus();
