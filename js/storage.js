// ─── LOCAL STORAGE SERVICE ────────────────────────────────────────────────────
// Provides offline-first persistence for quiz scores and flashcard progress.
// Falls back gracefully when localStorage is unavailable.

const KEYS = {
  QUIZ_SCORES:    "election_guide_quiz_scores",
  FC_PROGRESS:    "election_guide_fc_progress",
  USER_SETTINGS:  "election_guide_settings"
};

function safeGet(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

// ── QUIZ SCORES ─────────────────────────────────────────────────────────────
function saveQuizScore(score, total, category) {
  const scores = safeGet(KEYS.QUIZ_SCORES, []);
  scores.unshift({
    score,
    total,
    category,
    percentage: Math.round((score / total) * 100),
    timestamp: Date.now()
  });
  // Keep only the last 20 scores
  safeSet(KEYS.QUIZ_SCORES, scores.slice(0, 20));
}

function getQuizHistory() {
  return safeGet(KEYS.QUIZ_SCORES, []);
}

function getBestScore(category = "All") {
  const history = getQuizHistory();
  const filtered = category === "All" ? history : history.filter(s => s.category === category);
  return filtered.reduce((best, s) => s.percentage > (best?.percentage ?? -1) ? s : best, null);
}

// ── FLASHCARD PROGRESS ───────────────────────────────────────────────────────
function saveFlashcardProgress(category, known, studying, total) {
  const progress = safeGet(KEYS.FC_PROGRESS, {});
  progress[category] = { known, studying, total, updatedAt: Date.now() };
  safeSet(KEYS.FC_PROGRESS, progress);
}

function getFlashcardProgress(category = "All") {
  const progress = safeGet(KEYS.FC_PROGRESS, {});
  return progress[category] || { known: 0, studying: 0, total: 0 };
}

// ── USER SETTINGS ────────────────────────────────────────────────────────────
function getSetting(key, defaultValue = null) {
  const settings = safeGet(KEYS.USER_SETTINGS, {});
  return key in settings ? settings[key] : defaultValue;
}

function setSetting(key, value) {
  const settings = safeGet(KEYS.USER_SETTINGS, {});
  settings[key] = value;
  safeSet(KEYS.USER_SETTINGS, settings);
}

function clearAll() {
  Object.values(KEYS).forEach(k => {
    try { localStorage.removeItem(k); } catch { /* ignore */ }
  });
}

// ── PUBLIC API ────────────────────────────────────────────────────────────────
const Storage = {
  saveQuizScore,
  getQuizHistory,
  getBestScore,
  saveFlashcardProgress,
  getFlashcardProgress,
  getSetting,
  setSetting,
  clearAll
};

window.Storage = Storage;
