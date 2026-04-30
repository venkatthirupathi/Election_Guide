// ─── QUIZ ENGINE ──────────────────────────────────────────────────────────────

const Quiz = (() => {
  let questions = [];
  let current = 0;
  let score = 0;
  let answers = [];
  let selectedCategory = "All";
  let timerInterval = null;
  let timeLeft = 30;

  function init() {
    renderCategoryFilter();
    startQuiz();
  }

  function getFilteredQuestions() {
    let pool = selectedCategory === "All"
      ? [...quizData]
      : quizData.filter(q => q.category === selectedCategory);
    return shuffleArray(pool).slice(0, 10);
  }

  function shuffleArray(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  function startQuiz() {
    questions = getFilteredQuestions();
    current = 0;
    score = 0;
    answers = [];
    clearInterval(timerInterval);
    renderQuestion();
  }

  function renderCategoryFilter() {
    const categories = ["All", ...new Set(quizData.map(q => q.category))];
    const container = document.getElementById("quiz-categories");
    if (!container) return;
    container.innerHTML = categories.map(cat => `
      <button class="category-btn ${cat === selectedCategory ? "active" : ""}"
              onclick="Quiz.setCategory('${cat}')">
        ${cat}
      </button>
    `).join("");
  }

  function renderQuestion() {
    const container = document.getElementById("quiz-container");
    if (!container || !questions[current]) return;

    const q = questions[current];
    const progress = ((current / questions.length) * 100).toFixed(0);

    container.innerHTML = `
      <div class="quiz-header">
        <div class="quiz-progress-bar" role="progressbar"
             aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"
             aria-label="Quiz progress: question ${current + 1} of ${questions.length}">
          <div class="quiz-progress-fill" style="width: ${progress}%"></div>
        </div>
        <div class="quiz-meta">
          <span class="quiz-counter" aria-live="polite">Question ${current + 1} of ${questions.length}</span>
          <span class="quiz-score-live" aria-live="polite" aria-label="Current score: ${score}">Score: ${score}</span>
          <span class="quiz-timer" id="quiz-timer" aria-live="polite" aria-label="Time remaining: ${timeLeft} seconds">⏱️ ${timeLeft}s</span>
        </div>
        <div class="quiz-category-tag" aria-label="Category: ${q.category}">${q.category}</div>
      </div>

      <div class="quiz-question-card" role="form" aria-label="Quiz question ${current + 1}">
        <h2 class="quiz-question" id="quiz-q-label">${q.question}</h2>
        <div class="quiz-options" id="quiz-options" role="group" aria-labelledby="quiz-q-label">
          ${q.options.map((opt, i) => `
            <button class="quiz-option" onclick="Quiz.selectAnswer(${i})" data-index="${i}"
                    aria-label="Option ${String.fromCharCode(65 + i)}: ${opt}">
              <span class="option-letter" aria-hidden="true">${String.fromCharCode(65 + i)}</span>
              <span class="option-text">${opt}</span>
            </button>
          `).join("")}
        </div>
        <div class="quiz-explanation hidden" id="quiz-explanation" aria-live="polite"></div>
        <div class="quiz-nav hidden" id="quiz-nav">
          <button class="btn-primary" onclick="Quiz.nextQuestion()" aria-label="${current + 1 === questions.length ? "See your results" : "Go to next question"}">
            ${current + 1 === questions.length ? "See Results 🏆" : "Next Question →"}
          </button>
        </div>
      </div>
    `;

    startTimer();
  }

  function startTimer() {
    timeLeft = 30;
    clearInterval(timerInterval);
    updateTimerDisplay();
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        autoTimeOut();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const el = document.getElementById("quiz-timer");
    if (el) {
      el.textContent = `⏱️ ${timeLeft}s`;
      el.className = "quiz-timer" + (timeLeft <= 10 ? " danger" : timeLeft <= 20 ? " warning" : "");
    }
  }

  function autoTimeOut() {
    const options = document.querySelectorAll(".quiz-option");
    options.forEach(btn => btn.disabled = true);
    const q = questions[current];
    options[q.answer]?.classList.add("correct");
    answers.push({ question: q.question, selected: -1, correct: q.answer, isCorrect: false, timedOut: true });
    showExplanation(q, -1);
    document.getElementById("quiz-nav")?.classList.remove("hidden");
  }

  function selectAnswer(index) {
    clearInterval(timerInterval);
    const q = questions[current];
    const options = document.querySelectorAll(".quiz-option");
    options.forEach(btn => btn.disabled = true);

    const isCorrect = index === q.answer;
    if (isCorrect) score++;

    options[index]?.classList.add(isCorrect ? "correct" : "wrong");
    if (!isCorrect) options[q.answer]?.classList.add("correct");

    answers.push({ question: q.question, selected: index, correct: q.answer, isCorrect });
    showExplanation(q, index);
    document.getElementById("quiz-nav")?.classList.remove("hidden");
  }

  function showExplanation(q, selected) {
    const el = document.getElementById("quiz-explanation");
    if (!el) return;
    const timedOut = selected === -1;
    el.innerHTML = `
      <div class="explanation-box ${timedOut ? "timeout" : selected === q.answer ? "correct-exp" : "wrong-exp"}">
        <strong>${timedOut ? "⏰ Time's up!" : selected === q.answer ? "✅ Correct!" : "❌ Incorrect"}</strong>
        <p>${q.explanation}</p>
      </div>
    `;
    el.classList.remove("hidden");
  }

  function nextQuestion() {
    current++;
    if (current >= questions.length) {
      showResults();
    } else {
      renderQuestion();
    }
  }

  function showResults() {
    clearInterval(timerInterval);
    const container = document.getElementById("quiz-container");
    const percentage = Math.round((score / questions.length) * 100);
    const grade = percentage >= 90 ? "🏆 Expert" : percentage >= 70 ? "🎖️ Proficient" : percentage >= 50 ? "📚 Learning" : "🌱 Beginner";
    const gradeColor = percentage >= 90 ? "#10b981" : percentage >= 70 ? "#3b82f6" : percentage >= 50 ? "#f59e0b" : "#ef4444";

    // Persist score locally and log to Firebase
    if (window.Storage) {
      window.Storage.saveQuizScore(score, questions.length, selectedCategory);
    }
    if (window.FirebaseService) {
      window.FirebaseService.logQuizComplete(score, questions.length, selectedCategory);
      window.FirebaseService.saveQuizScore(score, questions.length, selectedCategory);
    }

    container.innerHTML = `
      <div class="quiz-results">
        <div class="results-header">
          <div class="results-circle" style="--score-color: ${gradeColor}">
            <span class="results-score">${score}/${questions.length}</span>
            <span class="results-percent">${percentage}%</span>
          </div>
          <h2 class="results-grade">${grade}</h2>
          <p class="results-message">${getResultMessage(percentage)}</p>
        </div>

        <div class="results-breakdown">
          <h3>Review Your Answers</h3>
          ${answers.map((ans, i) => {
            const q = questions[i];
            return `
              <div class="review-item ${ans.isCorrect ? "review-correct" : "review-wrong"}">
                <div class="review-q">${i + 1}. ${ans.question}</div>
                <div class="review-answers">
                  ${ans.timedOut ? `<span class="review-timeout">⏰ Timed out — Correct: ${q.options[ans.correct]}</span>` : `
                    ${!ans.isCorrect ? `<span class="review-wrong-ans">✗ You chose: ${q.options[ans.selected]}</span>` : ""}
                    <span class="review-correct-ans">✓ ${q.options[ans.correct]}</span>
                  `}
                </div>
              </div>
            `;
          }).join("")}
        </div>

        <div class="results-actions">
          <button class="btn-primary" onclick="Quiz.startQuiz()">🔄 Try Again</button>
          <button class="btn-secondary" onclick="App.navigate('flashcards')">📚 Study Flashcards</button>
        </div>
      </div>
    `;
  }

  function getResultMessage(pct) {
    if (pct >= 90) return "Outstanding! You have excellent knowledge of Indian elections!";
    if (pct >= 70) return "Great job! You have a solid understanding of the electoral system.";
    if (pct >= 50) return "Good effort! Review the topics to strengthen your knowledge.";
    return "Keep learning! The flashcards and topic guides will help you improve.";
  }

  function setCategory(cat) {
    selectedCategory = cat;
    renderCategoryFilter();
    startQuiz();
  }

  return { init, startQuiz, selectAnswer, nextQuestion, setCategory };
})();
