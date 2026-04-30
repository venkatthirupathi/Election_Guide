// ─── FLASHCARD ENGINE ─────────────────────────────────────────────────────────

const Flashcard = (() => {
  let cards = [];
  let current = 0;
  let known = new Set();
  let studying = new Set();
  let selectedCategory = "All";
  let shuffled = false;

  function init() {
    renderCategoryFilter();
    loadCards();
    renderCard();
    renderProgress();
  }

  function getFilteredCards() {
    return selectedCategory === "All"
      ? [...flashcardData]
      : flashcardData.filter(c => c.category === selectedCategory);
  }

  function loadCards() {
    cards = getFilteredCards();
    if (shuffled) cards = [...cards].sort(() => Math.random() - 0.5);
    current = 0;
    known.clear();
    studying.clear();
  }

  function renderCategoryFilter() {
    const categories = ["All", ...new Set(flashcardData.map(c => c.category))];
    const container = document.getElementById("fc-categories");
    if (!container) return;
    container.innerHTML = categories.map(cat => `
      <button class="category-btn ${cat === selectedCategory ? "active" : ""}"
              onclick="Flashcard.setCategory('${cat}')">
        ${cat}
      </button>
    `).join("");
  }

  function renderCard() {
    const container = document.getElementById("flashcard-area");
    if (!container) return;

    if (cards.length === 0) {
      container.innerHTML = `<div class="fc-empty">No cards in this category.</div>`;
      return;
    }

    const card = cards[current];
    const isKnown = known.has(current);
    const isStudying = studying.has(current);

    container.innerHTML = `
      <div class="fc-counter">${current + 1} / ${cards.length}</div>
      <div class="flashcard-wrapper">
        <div class="flashcard" id="fc-card" onclick="Flashcard.flip()">
          <div class="flashcard-inner" id="fc-inner">
            <div class="flashcard-front">
              <div class="fc-icon">${card.icon}</div>
              <div class="fc-category-tag">${card.category}</div>
              <h2 class="fc-term">${card.term}</h2>
              <p class="fc-hint">Click to reveal definition →</p>
            </div>
            <div class="flashcard-back">
              <div class="fc-icon">${card.icon}</div>
              <h3 class="fc-back-term">${card.term}</h3>
              <p class="fc-definition">${card.definition}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="fc-actions">
        <button class="fc-btn fc-btn-prev" onclick="Flashcard.prev()" ${current === 0 ? "disabled" : ""}>
          ← Prev
        </button>
        <div class="fc-status-btns">
          <button class="fc-btn fc-btn-study ${isStudying ? "active-study" : ""}"
                  onclick="Flashcard.markStudying()" title="Still learning">
            📌 Still Learning
          </button>
          <button class="fc-btn fc-btn-know ${isKnown ? "active-know" : ""}"
                  onclick="Flashcard.markKnown()" title="I know this">
            ✓ Got It
          </button>
        </div>
        <button class="fc-btn fc-btn-next" onclick="Flashcard.next()" ${current === cards.length - 1 ? "disabled" : ""}>
          Next →
        </button>
      </div>
    `;
    renderProgress();
  }

  function flip() {
    const inner = document.getElementById("fc-inner");
    if (inner) inner.classList.toggle("flipped");
  }

  function next() {
    if (current < cards.length - 1) {
      current++;
      renderCard();
    } else {
      showComplete();
    }
  }

  function prev() {
    if (current > 0) {
      current--;
      renderCard();
    }
  }

  function persistProgress() {
    if (window.Storage) {
      window.Storage.saveFlashcardProgress(selectedCategory, known.size, studying.size, cards.length);
    }
  }

  function markKnown() {
    known.add(current);
    studying.delete(current);
    persistProgress();
    renderCard();
    if (current < cards.length - 1) {
      setTimeout(() => { current++; renderCard(); }, 400);
    }
  }

  function markStudying() {
    studying.add(current);
    known.delete(current);
    persistProgress();
    renderCard();
    if (current < cards.length - 1) {
      setTimeout(() => { current++; renderCard(); }, 400);
    }
  }

  function renderProgress() {
    const prog = document.getElementById("fc-progress");
    if (!prog) return;
    const total = cards.length;
    const knownCount = known.size;
    const studyCount = studying.size;
    const unseenCount = total - knownCount - studyCount;
    const knownPct = total ? (knownCount / total * 100).toFixed(0) : 0;

    prog.innerHTML = `
      <div class="fc-progress-stats">
        <span class="fc-stat fc-stat-known">✓ Know: ${knownCount}</span>
        <span class="fc-stat fc-stat-study">📌 Learning: ${studyCount}</span>
        <span class="fc-stat fc-stat-unseen">○ Unseen: ${unseenCount}</span>
      </div>
      <div class="fc-progress-bar-container">
        <div class="fc-progress-bar">
          <div class="fc-bar-known" style="width: ${knownPct}%"></div>
          <div class="fc-bar-study" style="width: ${total ? (studyCount/total*100).toFixed(0) : 0}%"></div>
        </div>
        <span class="fc-progress-label">${knownPct}% mastered</span>
      </div>
      <div class="fc-controls-row">
        <button class="fc-control-btn" onclick="Flashcard.toggleShuffle()">
          🔀 ${shuffled ? "Unshuffle" : "Shuffle"}
        </button>
        <button class="fc-control-btn" onclick="Flashcard.reviewStudying()">
          📌 Review Learning
        </button>
        <button class="fc-control-btn" onclick="Flashcard.reset()">
          🔄 Reset All
        </button>
      </div>
    `;
  }

  function showComplete() {
    const container = document.getElementById("flashcard-area");
    const knownCount = known.size;
    const studyCount = studying.size;
    const total = cards.length;

    // Log session to Firebase Analytics
    if (window.FirebaseService) {
      window.FirebaseService.logFlashcardSession(knownCount, total);
    }

    container.innerHTML = `
      <div class="fc-complete">
        <div class="fc-complete-icon">🎉</div>
        <h2>Deck Complete!</h2>
        <p>You've gone through all ${total} cards.</p>
        <div class="fc-complete-stats">
          <div class="fc-complete-stat green">
            <span class="stat-num">${knownCount}</span>
            <span class="stat-label">Mastered</span>
          </div>
          <div class="fc-complete-stat yellow">
            <span class="stat-num">${studyCount}</span>
            <span class="stat-label">Still Learning</span>
          </div>
          <div class="fc-complete-stat gray">
            <span class="stat-num">${total - knownCount - studyCount}</span>
            <span class="stat-label">Skipped</span>
          </div>
        </div>
        ${studyCount > 0 ? `<button class="btn-primary" onclick="Flashcard.reviewStudying()">📌 Review ${studyCount} Remaining</button>` : ""}
        <button class="btn-secondary" onclick="Flashcard.reset()">🔄 Start Over</button>
        ${knownCount >= total * 0.8 ? `<button class="btn-quiz" onclick="App.navigate('quiz')">🧠 Take the Quiz!</button>` : ""}
      </div>
    `;
  }

  function toggleShuffle() {
    shuffled = !shuffled;
    loadCards();
    renderCard();
  }

  function reviewStudying() {
    if (studying.size === 0) {
      alert("No cards marked as 'Still Learning'!");
      return;
    }
    cards = [...studying].map(i => flashcardData[i]);
    current = 0;
    known.clear();
    studying.clear();
    renderCard();
  }

  function reset() {
    loadCards();
    renderCard();
  }

  function setCategory(cat) {
    selectedCategory = cat;
    renderCategoryFilter();
    loadCards();
    renderCard();
  }

  return { init, flip, next, prev, markKnown, markStudying, toggleShuffle, reviewStudying, reset, setCategory };
})();
