// ─── CHAT ENGINE ──────────────────────────────────────────────────────────────

const Chat = (() => {
  let history = [];
  let isTyping = false;

  function init() {
    renderChatUI();
    setTimeout(() => addBotMessage(chatKB[0].response, chatKB[0].followups), 400);
  }

  function renderChatUI() {
    const container = document.getElementById("chat-container");
    if (!container) return;
    container.innerHTML = `
      <div class="chat-window" role="region" aria-label="Election Assistant chat">
        <div class="chat-messages" id="chat-messages" role="log" aria-live="polite" aria-label="Chat messages"></div>
        <div class="chat-suggestions" id="chat-suggestions" role="group" aria-label="Quick reply suggestions"></div>
        <div class="chat-input-row">
          <label for="chat-input" class="sr-only">Ask a question about Indian elections</label>
          <input type="text" id="chat-input"
                 placeholder="Ask anything about Indian elections…"
                 aria-label="Type your question about Indian elections"
                 onkeydown="if(event.key==='Enter') Chat.send()"
                 autocomplete="off" />
          <button class="chat-send-btn" onclick="Chat.send()" aria-label="Send message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    `;
    renderSuggestions(quickReplies.slice(0, 5));
  }

  function send() {
    const input = document.getElementById("chat-input");
    const text = input?.value.trim();
    if (!text || isTyping) return;
    input.value = "";
    addUserMessage(text);
    hideSuggestions();
    if (window.FirebaseService) window.FirebaseService.logChatQuery(text);
    showTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      const { response, followups } = findResponse(text);
      addBotMessage(response, followups);
    }, 800 + Math.random() * 400);
  }

  function sendQuick(text) {
    const input = document.getElementById("chat-input");
    if (input) input.value = text;
    send();
  }

  function findResponse(text) {
    const lower = text.toLowerCase();
    // Try to find best matching KB entry by counting keyword hits
    let best = null;
    let bestScore = 0;
    for (const entry of chatKB) {
      if (entry.id === "fallback") continue;
      let score = 0;
      for (const kw of entry.keywords) {
        if (lower.includes(kw)) score += kw.split(" ").length; // longer phrases score more
      }
      if (score > bestScore) { bestScore = score; best = entry; }
    }
    if (!best || bestScore === 0) {
      const fb = chatKB.find(e => e.id === "fallback");
      return { response: fb.response, followups: fb.followups };
    }
    return { response: best.response, followups: best.followups };
  }

  function addUserMessage(text) {
    history.push({ role: "user", text });
    const el = createMessageEl("user", `<span>${escapeHtml(text)}</span>`);
    appendMessage(el);
  }

  function addBotMessage(html, followups = []) {
    history.push({ role: "bot", html });
    const el = createMessageEl("bot", html);
    appendMessage(el);
    if (followups?.length) renderSuggestions(followups);
    else hideSuggestions();
  }

  function createMessageEl(role, content) {
    const wrap = document.createElement("div");
    wrap.className = `chat-msg chat-msg-${role}`;
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble";
    bubble.innerHTML = content;
    if (role === "bot") {
      const avatar = document.createElement("div");
      avatar.className = "chat-avatar";
      avatar.textContent = "🗳️";
      wrap.appendChild(avatar);
    }
    wrap.appendChild(bubble);
    return wrap;
  }

  function appendMessage(el) {
    const container = document.getElementById("chat-messages");
    if (!container) return;
    container.appendChild(el);
    el.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  function showTypingIndicator() {
    isTyping = true;
    const el = document.createElement("div");
    el.className = "chat-msg chat-msg-bot";
    el.id = "typing-indicator";
    el.innerHTML = `
      <div class="chat-avatar">🗳️</div>
      <div class="chat-bubble typing-bubble">
        <span class="dot"></span><span class="dot"></span><span class="dot"></span>
      </div>`;
    appendMessage(el);
  }

  function removeTypingIndicator() {
    isTyping = false;
    document.getElementById("typing-indicator")?.remove();
  }

  function renderSuggestions(suggestions) {
    const el = document.getElementById("chat-suggestions");
    if (!el) return;
    el.innerHTML = suggestions.map(s =>
      `<button class="chat-suggestion" onclick="Chat.sendQuick('${s.replace(/'/g, "\\'")}')">${s}</button>`
    ).join("");
    el.style.display = "flex";
  }

  function hideSuggestions() {
    const el = document.getElementById("chat-suggestions");
    if (el) el.innerHTML = "";
  }

  function clearChat() {
    history = [];
    const msgs = document.getElementById("chat-messages");
    if (msgs) msgs.innerHTML = "";
    hideSuggestions();
    setTimeout(() => addBotMessage(chatKB[0].response, chatKB[0].followups), 200);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  return { init, send, sendQuick, clearChat };
})();
