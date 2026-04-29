// ─── APP CONTROLLER ───────────────────────────────────────────────────────────

const App = (() => {
  let currentPage = "home";

  const pages = ["home", "learn", "topic", "quiz", "flashcards", "timeline", "glossary", "chat"];

  function init() {
    navigate("home");
    setupMobileMenu();
  }

  function navigate(page, param = null) {
    currentPage = page;

    // Hide all pages
    pages.forEach(p => {
      const el = document.getElementById(`page-${p}`);
      if (el) el.classList.add("hidden");
    });

    // Update nav active state
    document.querySelectorAll(".nav-link").forEach(el => {
      el.classList.toggle("active", el.dataset.page === page);
    });

    // Show current page
    const target = document.getElementById(`page-${page}`);
    if (target) {
      target.classList.remove("hidden");
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Initialize page
    if (page === "home") renderHome();
    else if (page === "learn") renderLearn();
    else if (page === "topic") renderTopic(param);
    else if (page === "quiz") Quiz.init();
    else if (page === "flashcards") Flashcard.init();
    else if (page === "timeline") renderTimeline();
    else if (page === "glossary") renderGlossary();
    else if (page === "chat") Chat.init();

    // Close mobile menu
    document.getElementById("mobile-menu")?.classList.add("hidden");
  }

  function renderHome() {
    const container = document.getElementById("home-content");
    if (!container) return;

    container.innerHTML = `
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-bg"></div>
        <div class="hero-content">
          <div class="hero-badge">🇮🇳 Indian Democracy</div>
          <h1 class="hero-title">Understand India's<br><span class="hero-highlight">Election System</span></h1>
          <p class="hero-subtitle">Interactive learning platform for Indian elections — quizzes, flashcards, timelines, and comprehensive guides.</p>
          <div class="hero-cta">
            <button class="btn-hero-primary" onclick="App.navigate('learn')">Start Learning →</button>
            <button class="btn-hero-secondary" onclick="App.navigate('quiz')">Take a Quiz 🧠</button>
          </div>
        </div>
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="stat-number">969M+</span>
            <span class="stat-label">Eligible Voters (2024)</span>
          </div>
          <div class="hero-stat">
            <span class="stat-number">543</span>
            <span class="stat-label">Lok Sabha Seats</span>
          </div>
          <div class="hero-stat">
            <span class="stat-number">1951</span>
            <span class="stat-label">First General Election</span>
          </div>
          <div class="hero-stat">
            <span class="stat-number">75+</span>
            <span class="stat-label">Years of Democracy</span>
          </div>
        </div>
      </section>

      <!-- Feature Cards -->
      <section class="features-section">
        <h2 class="section-title">What You'll Learn</h2>
        <div class="features-grid">
          <div class="feature-card" onclick="App.navigate('learn')">
            <div class="feature-icon">📖</div>
            <h3>Topic Guides</h3>
            <p>Deep-dive into ECI, election types, voting process, parties, and more.</p>
            <span class="feature-count">6 Topics</span>
          </div>
          <div class="feature-card" onclick="App.navigate('quiz')">
            <div class="feature-icon">🧠</div>
            <h3>Interactive Quiz</h3>
            <p>Test your knowledge with 25 questions across 8 categories. Timed challenges!</p>
            <span class="feature-count">25 Questions</span>
          </div>
          <div class="feature-card" onclick="App.navigate('flashcards')">
            <div class="feature-icon">📚</div>
            <h3>Flashcards</h3>
            <p>Study key terms with interactive flip cards. Track your mastery progress.</p>
            <span class="feature-count">20 Cards</span>
          </div>
          <div class="feature-card" onclick="App.navigate('timeline')">
            <div class="feature-icon">📅</div>
            <h3>Election Timeline</h3>
            <p>Explore 75 years of Indian election history with key milestones.</p>
            <span class="feature-count">13 Events</span>
          </div>
          <div class="feature-card" onclick="App.navigate('glossary')">
            <div class="feature-icon">📝</div>
            <h3>Glossary</h3>
            <p>Searchable dictionary of 25+ election terms and concepts.</p>
            <span class="feature-count">25+ Terms</span>
          </div>
        </div>
      </section>

      <!-- Quick Topics -->
      <section class="quick-topics">
        <h2 class="section-title">Browse Topics</h2>
        <div class="topics-grid">
          ${topicsData.map(t => `
            <div class="topic-card" onclick="App.navigate('topic', '${t.id}')" style="--topic-color: ${t.color}">
              <div class="topic-icon">${t.icon}</div>
              <div class="topic-info">
                <h4>${t.title}</h4>
                <p>${t.summary}</p>
              </div>
              <span class="topic-arrow">→</span>
            </div>
          `).join("")}
        </div>
      </section>

      <!-- Did You Know -->
      <section class="did-you-know">
        <h2 class="section-title">Did You Know?</h2>
        <div class="facts-carousel" id="facts-carousel">
          ${getRandomFacts().map((f, i) => `
            <div class="fact-card ${i === 0 ? "active" : ""}">
              <div class="fact-icon">${f.icon}</div>
              <p>${f.text}</p>
            </div>
          `).join("")}
        </div>
        <div class="fact-dots" id="fact-dots"></div>
      </section>
    `;

    initFactsCarousel();
  }

  function getRandomFacts() {
    return [
      { icon: "🗳️", text: "The 2024 Indian General Election had 969 million eligible voters — more than the population of any country except China and India itself." },
      { icon: "🖥️", text: "India was the first country to use Electronic Voting Machines (EVMs) on a national scale, beginning a complete transition in 2004." },
      { icon: "⚖️", text: "The Election Commission of India is one of the most respected independent bodies in the country, feared by political parties for its strict enforcement." },
      { icon: "📜", text: "India's first election in 1951-52 took almost 4 months to complete because printing ballot papers for 173 million voters was a massive logistical challenge." },
      { icon: "🎨", text: "India uses indelible ink (Indelible Electoral Ink, containing silver nitrate) on voters' fingers — the formula was originally developed in Mysore, Karnataka." },
      { icon: "🌐", text: "India has 543 Lok Sabha constituencies, each representing roughly 1.5 to 2 million people — larger than many countries' total populations." }
    ];
  }

  function initFactsCarousel() {
    const cards = document.querySelectorAll(".fact-card");
    const dotsContainer = document.getElementById("fact-dots");
    if (!cards.length || !dotsContainer) return;

    let active = 0;
    dotsContainer.innerHTML = [...cards].map((_, i) =>
      `<span class="fact-dot ${i === 0 ? "active" : ""}" onclick="App.goToFact(${i})"></span>`
    ).join("");

    window._factInterval = setInterval(() => {
      active = (active + 1) % cards.length;
      goToFact(active);
    }, 4000);
  }

  function goToFact(index) {
    document.querySelectorAll(".fact-card").forEach((el, i) => el.classList.toggle("active", i === index));
    document.querySelectorAll(".fact-dot").forEach((el, i) => el.classList.toggle("active", i === index));
  }

  function renderLearn() {
    const container = document.getElementById("learn-content");
    if (!container) return;

    container.innerHTML = `
      <div class="learn-header">
        <h1>Learn About Indian Elections</h1>
        <p>Comprehensive guides covering every aspect of India's electoral system</p>
      </div>
      <div class="learn-grid">
        ${topicsData.map(t => `
          <div class="learn-card" onclick="App.navigate('topic', '${t.id}')">
            <div class="learn-card-header" style="background: ${t.color}">
              <span class="learn-icon">${t.icon}</span>
            </div>
            <div class="learn-card-body">
              <h3>${t.title}</h3>
              <p>${t.summary}</p>
              <div class="learn-sections">${t.content.length} sections</div>
              <button class="btn-read">Read →</button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderTopic(id) {
    const topic = topicsData.find(t => t.id === id);
    const container = document.getElementById("topic-content");
    if (!container || !topic) return;

    container.innerHTML = `
      <div class="topic-page">
        <div class="topic-breadcrumb">
          <button onclick="App.navigate('learn')" class="breadcrumb-link">← Back to Topics</button>
        </div>
        <div class="topic-header" style="background: linear-gradient(135deg, ${topic.color}22, ${topic.color}11); border-left: 4px solid ${topic.color}">
          <span class="topic-header-icon">${topic.icon}</span>
          <div>
            <h1>${topic.title}</h1>
            <p>${topic.summary}</p>
          </div>
        </div>
        <div class="topic-sections">
          ${topic.content.map((section, i) => `
            <div class="topic-section">
              <div class="section-number" style="background: ${topic.color}">${i + 1}</div>
              <div class="section-body">
                <h3>${section.heading}</h3>
                <p>${section.text.replace(/\n/g, "<br>")}</p>
              </div>
            </div>
          `).join("")}
        </div>
        <div class="topic-footer">
          <button class="btn-primary" onclick="App.navigate('quiz')">Test Your Knowledge 🧠</button>
          <button class="btn-secondary" onclick="App.navigate('flashcards')">Study Flashcards 📚</button>
        </div>
      </div>
    `;
  }

  function renderTimeline() {
    const container = document.getElementById("timeline-content");
    if (!container) return;

    container.innerHTML = `
      <div class="timeline-header">
        <h1>India's Election History</h1>
        <p>Key milestones in 75+ years of democratic elections</p>
      </div>
      <div class="timeline">
        ${timelineData.map((event, i) => `
          <div class="timeline-item ${i % 2 === 0 ? "left" : "right"}">
            <div class="timeline-dot">${event.icon}</div>
            <div class="timeline-card">
              <div class="timeline-year">${event.year}</div>
              <h3>${event.event}</h3>
              <p>${event.detail}</p>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderGlossary() {
    const container = document.getElementById("glossary-content");
    if (!container) return;

    container.innerHTML = `
      <div class="glossary-header">
        <h1>Election Glossary</h1>
        <p>Key terms and concepts in Indian elections</p>
        <div class="glossary-search">
          <input type="text" id="glossary-input" placeholder="🔍 Search terms..." oninput="App.filterGlossary()" class="search-input">
        </div>
      </div>
      <div class="glossary-list" id="glossary-list">
        ${renderGlossaryItems(glossaryData)}
      </div>
    `;
  }

  function renderGlossaryItems(items) {
    const grouped = {};
    items.forEach(item => {
      const letter = item.term[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(item);
    });

    return Object.keys(grouped).sort().map(letter => `
      <div class="glossary-group">
        <div class="glossary-letter">${letter}</div>
        ${grouped[letter].map(item => `
          <div class="glossary-item">
            <dt>${item.term}</dt>
            <dd>${item.definition}</dd>
          </div>
        `).join("")}
      </div>
    `).join("");
  }

  function filterGlossary() {
    const query = document.getElementById("glossary-input")?.value.toLowerCase() || "";
    const filtered = glossaryData.filter(item =>
      item.term.toLowerCase().includes(query) || item.definition.toLowerCase().includes(query)
    );
    const container = document.getElementById("glossary-list");
    if (container) container.innerHTML = filtered.length
      ? renderGlossaryItems(filtered)
      : `<p class="no-results">No terms found for "${query}"</p>`;
  }

  function setupMobileMenu() {
    const toggle = document.getElementById("mobile-toggle");
    const menu = document.getElementById("mobile-menu");
    if (toggle && menu) {
      toggle.addEventListener("click", () => menu.classList.toggle("hidden"));
    }
  }

  return { init, navigate, goToFact, filterGlossary };
})();

// ─── BOOTSTRAP ────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => App.init());
