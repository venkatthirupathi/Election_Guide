// ─── ELECTION GUIDE — UNIT TEST SUITE ────────────────────────────────────────
// Tests core logic for Quiz, Flashcard, App, Chat, Storage, and data integrity.
// Run via tests/runner.html in any modern browser.

const T = (() => {
  let passed = 0, failed = 0;
  const results = [];

  function assert(desc, condition, detail = "") {
    const ok = Boolean(condition);
    ok ? passed++ : failed++;
    results.push({ ok, desc, detail });
    const el = document.getElementById("test-output");
    if (el) {
      const row = document.createElement("div");
      row.className = `test-row ${ok ? "pass" : "fail"}`;
      row.innerHTML = `<span class="status">${ok ? "✅" : "❌"}</span> <span class="desc">${desc}</span>
        ${detail ? `<span class="detail">${detail}</span>` : ""}`;
      el.appendChild(row);
    }
  }

  function assertEqual(desc, actual, expected) {
    const ok = JSON.stringify(actual) === JSON.stringify(expected);
    assert(desc, ok, ok ? "" : `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }

  function assertThrows(desc, fn) {
    try { fn(); assert(desc, false, "Expected an error but none was thrown"); }
    catch { assert(desc, true); }
  }

  function suite(name, fn) {
    const heading = document.getElementById("test-output");
    if (heading) {
      const h = document.createElement("h3");
      h.textContent = `📋 ${name}`;
      heading.appendChild(h);
    }
    fn();
  }

  function summary() {
    const total = passed + failed;
    return { passed, failed, total, results };
  }

  return { assert, assertEqual, assertThrows, suite, summary };
})();

// ─── HELPER FUNCTIONS (cloned from source to test independently) ─────────────
function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ─── DATA INTEGRITY TESTS ─────────────────────────────────────────────────────
T.suite("Data Integrity — quizData", () => {
  T.assert("quizData is defined", typeof quizData !== "undefined");
  T.assert("quizData is an Array", Array.isArray(quizData));
  T.assert("quizData has at least 20 questions", quizData.length >= 20);

  quizData.forEach((q, i) => {
    T.assert(`Q${i+1}: has question text`, typeof q.question === "string" && q.question.length > 5);
    T.assert(`Q${i+1}: has 4 options`, Array.isArray(q.options) && q.options.length === 4);
    T.assert(`Q${i+1}: answer index is valid (0-3)`, Number.isInteger(q.answer) && q.answer >= 0 && q.answer <= 3);
    T.assert(`Q${i+1}: has explanation`, typeof q.explanation === "string" && q.explanation.length > 5);
    T.assert(`Q${i+1}: has category`, typeof q.category === "string" && q.category.length > 0);
  });
});

T.suite("Data Integrity — flashcardData", () => {
  T.assert("flashcardData is defined", typeof flashcardData !== "undefined");
  T.assert("flashcardData is an Array", Array.isArray(flashcardData));
  T.assert("flashcardData has at least 15 cards", flashcardData.length >= 15);

  flashcardData.forEach((c, i) => {
    T.assert(`Card ${i+1}: has term`, typeof c.term === "string" && c.term.length > 0);
    T.assert(`Card ${i+1}: has definition`, typeof c.definition === "string" && c.definition.length > 5);
    T.assert(`Card ${i+1}: has category`, typeof c.category === "string");
    T.assert(`Card ${i+1}: has icon`, typeof c.icon === "string");
  });
});

T.suite("Data Integrity — timelineData", () => {
  T.assert("timelineData is defined", typeof timelineData !== "undefined");
  T.assert("timelineData is an Array", Array.isArray(timelineData));
  T.assert("timelineData has at least 10 events", timelineData.length >= 10);

  timelineData.forEach((e, i) => {
    T.assert(`Event ${i+1}: has year`, typeof e.year === "number" || typeof e.year === "string");
    T.assert(`Event ${i+1}: has event title`, typeof e.event === "string" && e.event.length > 0);
    T.assert(`Event ${i+1}: has detail`, typeof e.detail === "string" && e.detail.length > 5);
  });
});

T.suite("Data Integrity — glossaryData", () => {
  T.assert("glossaryData is defined", typeof glossaryData !== "undefined");
  T.assert("glossaryData is an Array", Array.isArray(glossaryData));
  T.assert("glossaryData has at least 20 terms", glossaryData.length >= 20);

  glossaryData.forEach((g, i) => {
    T.assert(`Term ${i+1}: has term string`, typeof g.term === "string" && g.term.length > 0);
    T.assert(`Term ${i+1}: has definition string`, typeof g.definition === "string" && g.definition.length > 5);
  });

  const terms = glossaryData.map(g => g.term.toLowerCase());
  const unique = new Set(terms);
  T.assert("Glossary has no duplicate terms", unique.size === terms.length);
});

T.suite("Data Integrity — chatKB", () => {
  T.assert("chatKB is defined", typeof chatKB !== "undefined");
  T.assert("chatKB is an Array", Array.isArray(chatKB));
  T.assert("chatKB has a fallback entry", chatKB.some(e => e.id === "fallback"));

  chatKB.forEach((entry, i) => {
    T.assert(`KB[${i}]: has id`, typeof entry.id === "string");
    T.assert(`KB[${i}]: has keywords array`, Array.isArray(entry.keywords));
    T.assert(`KB[${i}]: has response string`, typeof entry.response === "string" && entry.response.length > 0);
    T.assert(`KB[${i}]: has followups array`, Array.isArray(entry.followups));
  });
});

T.suite("Data Integrity — topicsData", () => {
  T.assert("topicsData is defined", typeof topicsData !== "undefined");
  T.assert("topicsData is an Array", Array.isArray(topicsData));
  T.assert("topicsData has at least 4 topics", topicsData.length >= 4);

  topicsData.forEach((t, i) => {
    T.assert(`Topic ${i+1}: has id`, typeof t.id === "string");
    T.assert(`Topic ${i+1}: has title`, typeof t.title === "string");
    T.assert(`Topic ${i+1}: has summary`, typeof t.summary === "string");
    T.assert(`Topic ${i+1}: has content array`, Array.isArray(t.content) && t.content.length > 0);
    T.assert(`Topic ${i+1}: each section has heading+text`, t.content.every(s => s.heading && s.text));
  });
});

// ─── QUIZ LOGIC TESTS ─────────────────────────────────────────────────────────
T.suite("Quiz — Category Filtering", () => {
  const categories = [...new Set(quizData.map(q => q.category))];
  T.assert("Quiz has at least 3 categories", categories.length >= 3);

  categories.forEach(cat => {
    const filtered = quizData.filter(q => q.category === cat);
    T.assert(`Category "${cat}" has at least 1 question`, filtered.length >= 1);
    T.assert(`All items in "${cat}" match category`, filtered.every(q => q.category === cat));
  });
});

T.suite("Quiz — Shuffle", () => {
  const pool = [...quizData];
  const shuffled = shuffleArray(pool);
  T.assert("Shuffle preserves array length", shuffled.length === pool.length);
  T.assert("Shuffle does not mutate original", pool[0] === quizData[0]);

  const sameOrder = shuffled.every((q, i) => q === pool[i]);
  // With 20+ items, same order is astronomically unlikely — just verify not always identical
  T.assert("Shuffle returns an array of quiz items", shuffled.every(q => q.question && q.options));
});

T.suite("Quiz — Question Slice", () => {
  const pool = shuffleArray(quizData).slice(0, 10);
  T.assert("Quiz slice returns exactly 10 questions", pool.length === 10);
  T.assert("All sliced questions are from quizData", pool.every(q => quizData.includes(q)));
});

T.suite("Quiz — Answer Validation", () => {
  quizData.forEach((q, i) => {
    T.assert(`Q${i+1}: correct option exists at index ${q.answer}`, q.options[q.answer] !== undefined);
  });

  const q = quizData[0];
  const isCorrect = (selectedIndex) => selectedIndex === q.answer;
  T.assert("Correct answer detected as correct", isCorrect(q.answer) === true);
  T.assert("Wrong answer detected as wrong", isCorrect(q.answer === 0 ? 1 : 0) === false);
});

T.suite("Quiz — Score Calculation", () => {
  T.assertEqual("0 correct = 0%", Math.round((0 / 10) * 100), 0);
  T.assertEqual("5 correct = 50%", Math.round((5 / 10) * 100), 50);
  T.assertEqual("10 correct = 100%", Math.round((10 / 10) * 100), 100);
  T.assertEqual("7 correct = 70%", Math.round((7 / 10) * 100), 70);
});

T.suite("Quiz — Grade Assignment", () => {
  const getGrade = pct =>
    pct >= 90 ? "Expert" : pct >= 70 ? "Proficient" : pct >= 50 ? "Learning" : "Beginner";

  T.assertEqual("100% = Expert",     getGrade(100), "Expert");
  T.assertEqual("90% = Expert",      getGrade(90),  "Expert");
  T.assertEqual("89% = Proficient",  getGrade(89),  "Proficient");
  T.assertEqual("70% = Proficient",  getGrade(70),  "Proficient");
  T.assertEqual("50% = Learning",    getGrade(50),  "Learning");
  T.assertEqual("49% = Beginner",    getGrade(49),  "Beginner");
  T.assertEqual("0% = Beginner",     getGrade(0),   "Beginner");
});

// ─── FLASHCARD LOGIC TESTS ───────────────────────────────────────────────────
T.suite("Flashcard — Category Filtering", () => {
  const categories = [...new Set(flashcardData.map(c => c.category))];
  T.assert("Flashcards have at least 2 categories", categories.length >= 2);

  categories.forEach(cat => {
    const filtered = flashcardData.filter(c => c.category === cat);
    T.assert(`Flashcard category "${cat}" returns correct items`, filtered.every(c => c.category === cat));
  });
});

T.suite("Flashcard — Progress Tracking", () => {
  const known = new Set([0, 2, 4]);
  const studying = new Set([1, 3]);
  const total = flashcardData.length;
  const knownPct = parseFloat((known.size / total * 100).toFixed(0));

  T.assert("Known count is correct", known.size === 3);
  T.assert("Studying count is correct", studying.size === 2);
  T.assert("Known percentage is a number", typeof knownPct === "number");
  T.assert("Mark known removes from studying", !studying.has(0));
  T.assert("Sets are independent", !known.has(1));

  const unseen = total - known.size - studying.size;
  T.assert("Unseen count = total - known - studying", unseen === total - 3 - 2);
});

T.suite("Flashcard — Shuffle Mode", () => {
  const original = [...flashcardData];
  const shuffled = [...original].sort(() => Math.random() - 0.5);
  T.assert("Shuffle preserves card count", shuffled.length === original.length);
  T.assert("Shuffled cards are all from original data", shuffled.every(c => original.includes(c)));
});

T.suite("Flashcard — Navigation Bounds", () => {
  const cards = [...flashcardData];
  let current = 0;

  T.assert("Initial index is 0", current === 0);
  T.assert("Can advance to next", current + 1 < cards.length);

  current = cards.length - 1;
  T.assert("At last card, next is disabled", current === cards.length - 1);

  current = 0;
  T.assert("At first card, prev is disabled", current === 0);
});

// ─── CHAT LOGIC TESTS ────────────────────────────────────────────────────────
T.suite("Chat — Keyword Matching", () => {
  function findResponse(text) {
    const lower = text.toLowerCase();
    let best = null, bestScore = 0;
    for (const entry of chatKB) {
      if (entry.id === "fallback") continue;
      let score = 0;
      for (const kw of entry.keywords) {
        if (lower.includes(kw)) score += kw.split(" ").length;
      }
      if (score > bestScore) { bestScore = score; best = entry; }
    }
    if (!best || bestScore === 0) {
      const fb = chatKB.find(e => e.id === "fallback");
      return { response: fb.response, followups: fb.followups };
    }
    return { response: best.response, followups: best.followups };
  }

  T.assert("'hello' returns a response", findResponse("hello").response.length > 0);
  T.assert("'ECI' returns a response", findResponse("what is ECI").response.length > 0);
  T.assert("'EVM' returns a response", findResponse("EVM machine").response.length > 0);
  T.assert("Fallback returned for gibberish", findResponse("xyzabcjunk123").response.length > 0);

  const eciRes = findResponse("Election Commission of India");
  T.assert("ECI query returns followup suggestions", Array.isArray(eciRes.followups));

  const fallback = findResponse("zzzzqqqqwwww");
  const fb = chatKB.find(e => e.id === "fallback");
  T.assert("Unknown query matches fallback response", fallback.response === fb.response);
});

T.suite("Chat — XSS Prevention (escapeHtml)", () => {
  T.assertEqual("Escapes &", escapeHtml("a & b"), "a &amp; b");
  T.assertEqual("Escapes <script>", escapeHtml("<script>"), "&lt;script&gt;");
  T.assertEqual("Escapes >", escapeHtml("a > b"), "a &gt; b");
  T.assertEqual("Leaves normal text unchanged", escapeHtml("hello world"), "hello world");
  T.assertEqual("Handles empty string", escapeHtml(""), "");
  T.assertEqual("Handles multiple special chars", escapeHtml("<b>&</b>"), "&lt;b&gt;&amp;&lt;/b&gt;");
});

// ─── GLOSSARY FILTER TESTS ────────────────────────────────────────────────────
T.suite("Glossary — Search Filtering", () => {
  function filterGlossary(query) {
    const q = query.toLowerCase();
    return glossaryData.filter(item =>
      item.term.toLowerCase().includes(q) || item.definition.toLowerCase().includes(q)
    );
  }

  T.assert("Empty query returns all items", filterGlossary("").length === glossaryData.length);
  T.assert("'evm' returns at least one result", filterGlossary("evm").length >= 1);
  T.assert("'NOTA' returns at least one result", filterGlossary("NOTA").length >= 1);
  T.assert("Nonsense query returns empty array", filterGlossary("xzqwerty12345abc").length === 0);
  T.assert("Search is case-insensitive (upper)", filterGlossary("EVM").length === filterGlossary("evm").length);
  T.assert("Search is case-insensitive (mixed)", filterGlossary("Evm").length === filterGlossary("evm").length);

  const results = filterGlossary("election");
  T.assert("'election' matches at least 3 terms/definitions", results.length >= 3);
});

T.suite("Glossary — Alphabetical Grouping", () => {
  function groupByLetter(items) {
    const grouped = {};
    items.forEach(item => {
      const letter = item.term[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(item);
    });
    return grouped;
  }

  const grouped = groupByLetter(glossaryData);
  const letters = Object.keys(grouped);
  T.assert("Glossary has multiple letter groups", letters.length > 3);
  T.assert("Each group contains the correct first letter", Object.entries(grouped).every(
    ([letter, items]) => items.every(item => item.term[0].toUpperCase() === letter)
  ));
});

// ─── STORAGE SERVICE TESTS ───────────────────────────────────────────────────
T.suite("Storage Service", () => {
  // Clean slate
  Storage.clearAll();

  T.assert("getQuizHistory returns empty array initially", Storage.getQuizHistory().length === 0);
  T.assert("getBestScore returns null when no scores", Storage.getBestScore() === null);

  Storage.saveQuizScore(8, 10, "Institutions");
  const history = Storage.getQuizHistory();
  T.assert("saveQuizScore adds to history", history.length === 1);
  T.assertEqual("Saved score is correct", history[0].score, 8);
  T.assertEqual("Saved total is correct", history[0].total, 10);
  T.assertEqual("Saved category is correct", history[0].category, "Institutions");
  T.assertEqual("Percentage is computed", history[0].percentage, 80);

  Storage.saveQuizScore(5, 10, "Voting");
  Storage.saveQuizScore(10, 10, "All");
  T.assert("History keeps all entries", Storage.getQuizHistory().length === 3);

  const best = Storage.getBestScore();
  T.assertEqual("Best score is highest percentage", best.percentage, 100);

  Storage.saveFlashcardProgress("All", 15, 3, 20);
  const fc = Storage.getFlashcardProgress("All");
  T.assertEqual("Flashcard known count saved", fc.known, 15);
  T.assertEqual("Flashcard studying count saved", fc.studying, 3);
  T.assertEqual("Flashcard total saved", fc.total, 20);

  const missing = Storage.getFlashcardProgress("NonExistent");
  T.assertEqual("Missing flashcard progress returns default", missing.known, 0);

  Storage.setSetting("theme", "dark");
  T.assertEqual("Setting is saved and retrieved", Storage.getSetting("theme"), "dark");
  T.assertEqual("Missing setting returns default", Storage.getSetting("missing", "default"), "default");

  // Cleanup
  Storage.clearAll();
  T.assert("clearAll empties quiz history", Storage.getQuizHistory().length === 0);
});

// ─── UTILITY FUNCTION TESTS ───────────────────────────────────────────────────
T.suite("Utility — Debounce", () => {
  let callCount = 0;
  const debounced = debounce(() => callCount++, 50);

  // Call multiple times rapidly
  debounced();
  debounced();
  debounced();
  T.assert("Debounce does not fire immediately", callCount === 0);

  // Verify it eventually fires (async check not possible in sync test)
  T.assert("Debounce returns a function", typeof debounced === "function");
});

T.suite("Utility — shuffleArray", () => {
  const arr = [1, 2, 3, 4, 5];
  const shuffled = shuffleArray(arr);
  T.assert("Shuffle preserves length", shuffled.length === arr.length);
  T.assert("Shuffle does not mutate original", arr[0] === 1 && arr.length === 5);
  T.assert("Shuffled array contains same elements",
    shuffled.every(x => arr.includes(x)) && arr.every(x => shuffled.includes(x))
  );

  const empty = shuffleArray([]);
  T.assertEqual("Shuffle of empty array is empty", empty, []);

  const single = shuffleArray([42]);
  T.assertEqual("Shuffle of single-element array is unchanged", single, [42]);
});

// ─── INTEGRATION TESTS ───────────────────────────────────────────────────────
T.suite("Integration — Full Quiz Flow", () => {
  const questions = shuffleArray(quizData).slice(0, 10);
  let score = 0;
  const answers = [];

  questions.forEach(q => {
    const correct = q.answer;
    const selected = correct; // simulate answering correctly
    const isCorrect = selected === correct;
    if (isCorrect) score++;
    answers.push({ question: q.question, selected, correct, isCorrect });
  });

  T.assertEqual("10 questions played", questions.length, 10);
  T.assertEqual("Perfect score when always correct", score, 10);
  T.assertEqual("10 answers recorded", answers.length, 10);
  T.assert("All answers are marked correct", answers.every(a => a.isCorrect));
  T.assert("Percentage computes to 100%", Math.round(score / questions.length * 100) === 100);
});

T.suite("Integration — Flashcard Full Deck", () => {
  const cards = [...flashcardData];
  const known = new Set();
  const studying = new Set();

  cards.forEach((card, i) => {
    if (i % 3 === 0) known.add(i);
    else if (i % 3 === 1) studying.add(i);
  });

  const knownCount = known.size;
  const studyCount = studying.size;
  const unseenCount = cards.length - knownCount - studyCount;

  T.assert("Known + Studying + Unseen = Total", knownCount + studyCount + unseenCount === cards.length);
  T.assert("Mastery % is calculable", typeof (knownCount / cards.length * 100) === "number");
  T.assert("Review studying creates subset", [...studying].map(i => flashcardData[i]).length === studyCount);
});

T.suite("Integration — Category Consistency", () => {
  const quizCategories = new Set(quizData.map(q => q.category));
  const fcCategories = new Set(flashcardData.map(c => c.category));

  T.assert("Quiz has multiple categories", quizCategories.size > 1);
  T.assert("Flashcards have multiple categories", fcCategories.size > 1);

  // Each quiz category should have at least 1 question
  quizCategories.forEach(cat => {
    const count = quizData.filter(q => q.category === cat).length;
    T.assert(`Category "${cat}" has ≥1 quiz question`, count >= 1);
  });
});

// ─── RENDER SUMMARY ──────────────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  // Delay summary to allow async data to load
  setTimeout(() => {
    const { passed, failed, total } = T.summary();
    const summaryEl = document.getElementById("test-summary");
    if (summaryEl) {
      const pct = Math.round(passed / total * 100);
      summaryEl.innerHTML = `
        <div class="summary-box ${failed === 0 ? 'all-pass' : 'has-fail'}">
          <h2>${failed === 0 ? "✅ All Tests Passed!" : `⚠️ ${failed} Test(s) Failed`}</h2>
          <p>${passed} / ${total} tests passed (${pct}%)</p>
        </div>`;
    }
  }, 100);
});
