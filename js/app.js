// ─── APP CONTROLLER ───────────────────────────────────────────────────────────

const App = (() => {
  let currentPage = "home";

  const pages = ["home", "learn", "topic", "quiz", "flashcards", "timeline", "glossary", "chat"];

  // Debounce helper for search inputs
  function debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  function init() {
    navigate("home");
    setupMobileMenu();
  }

  function navigate(page, param = null) {
    currentPage = page;

    pages.forEach(p => {
      const el = document.getElementById(`page-${p}`);
      if (el) el.classList.add("hidden");
    });

    document.querySelectorAll(".nav-link").forEach(el => {
      const isActive = el.dataset.page === page;
      el.classList.toggle("active", isActive);
      el.setAttribute("aria-current", isActive ? "page" : "false");
    });

    const target = document.getElementById(`page-${page}`);
    if (target) {
      target.classList.remove("hidden");
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Announce page change to screen readers
    const announcer = document.getElementById("sr-announce");
    if (announcer) {
      const labels = {
        home: "Home page", learn: "Learn section", quiz: "Quiz section",
        flashcards: "Flashcards section", timeline: "Timeline section",
        glossary: "Glossary section", chat: "Chat assistant", topic: "Topic detail"
      };
      announcer.textContent = `Navigated to ${labels[page] || page}`;
    }

    if (page === "home")       renderHome();
    else if (page === "learn") renderLearn();
    else if (page === "topic") renderTopic(param);
    else if (page === "quiz")  Quiz.init();
    else if (page === "flashcards") Flashcard.init();
    else if (page === "timeline")   renderTimeline();
    else if (page === "glossary")   renderGlossary();
    else if (page === "chat")       Chat.init();

    document.getElementById("mobile-menu")?.classList.add("hidden");

    // Log page view to Firebase Analytics
    if (window.FirebaseService) {
      window.FirebaseService.logPageView(page);
    }
  }

  function renderHome() {
    const container = document.getElementById("home-content");
    if (!container) return;

    const best = window.Storage?.getBestScore() || null;
    const bestBadge = best
      ? `<div class="best-score-badge" aria-label="Your best quiz score is ${best.percentage}%">🏆 Your Best: ${best.percentage}% (${best.category})</div>`
      : "";

    container.innerHTML = `
      <!-- Hero Section -->
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-bg" aria-hidden="true"></div>
        <div class="hero-content">
          <div class="hero-badge" aria-label="About this guide">🇮🇳 Indian Democracy</div>
          ${bestBadge}
          <h1 class="hero-title" id="hero-title">Understand India's<br><span class="hero-highlight">Election System</span></h1>
          <p class="hero-subtitle">Interactive learning platform for Indian elections — quizzes, flashcards, timelines, and comprehensive guides.</p>
          <div class="hero-cta">
            <button class="btn-hero-primary" onclick="App.navigate('learn')" aria-label="Start learning about Indian elections">Start Learning →</button>
            <button class="btn-hero-secondary" onclick="App.navigate('quiz')" aria-label="Take an election knowledge quiz">Take a Quiz 🧠</button>
          </div>
        </div>
        <div class="hero-stats" role="list" aria-label="Key statistics about Indian elections">
          <div class="hero-stat" role="listitem">
            <span class="stat-number">969M+</span>
            <span class="stat-label">Eligible Voters (2024)</span>
          </div>
          <div class="hero-stat" role="listitem">
            <span class="stat-number">543</span>
            <span class="stat-label">Lok Sabha Seats</span>
          </div>
          <div class="hero-stat" role="listitem">
            <span class="stat-number">1951</span>
            <span class="stat-label">First General Election</span>
          </div>
          <div class="hero-stat" role="listitem">
            <span class="stat-number">75+</span>
            <span class="stat-label">Years of Democracy</span>
          </div>
        </div>
      </section>

      <!-- Feature Cards -->
      <section class="features-section" aria-labelledby="features-title">
        <h2 class="section-title" id="features-title">What You'll Learn</h2>
        <div class="features-grid" role="list">
          <div class="feature-card" role="listitem" onclick="App.navigate('learn')" tabindex="0"
               aria-label="Topic Guides — 6 topics" onkeydown="if(event.key==='Enter')App.navigate('learn')">
            <div class="feature-icon" aria-hidden="true">📖</div>
            <h3>Topic Guides</h3>
            <p>Deep-dive into ECI, election types, voting process, parties, and more.</p>
            <span class="feature-count">6 Topics</span>
          </div>
          <div class="feature-card" role="listitem" onclick="App.navigate('quiz')" tabindex="0"
               aria-label="Interactive Quiz — 25 questions" onkeydown="if(event.key==='Enter')App.navigate('quiz')">
            <div class="feature-icon" aria-hidden="true">🧠</div>
            <h3>Interactive Quiz</h3>
            <p>Test your knowledge with 25 questions across 8 categories. Timed challenges!</p>
            <span class="feature-count">25 Questions</span>
          </div>
          <div class="feature-card" role="listitem" onclick="App.navigate('flashcards')" tabindex="0"
               aria-label="Flashcards — 20 cards" onkeydown="if(event.key==='Enter')App.navigate('flashcards')">
            <div class="feature-icon" aria-hidden="true">📚</div>
            <h3>Flashcards</h3>
            <p>Study key terms with interactive flip cards. Track your mastery progress.</p>
            <span class="feature-count">20 Cards</span>
          </div>
          <div class="feature-card" role="listitem" onclick="App.navigate('timeline')" tabindex="0"
               aria-label="Election Timeline — 13 events" onkeydown="if(event.key==='Enter')App.navigate('timeline')">
            <div class="feature-icon" aria-hidden="true">📅</div>
            <h3>Election Timeline</h3>
            <p>Explore 75 years of Indian election history with key milestones.</p>
            <span class="feature-count">13 Events</span>
          </div>
          <div class="feature-card" role="listitem" onclick="App.navigate('glossary')" tabindex="0"
               aria-label="Glossary — 25 plus terms" onkeydown="if(event.key==='Enter')App.navigate('glossary')">
            <div class="feature-icon" aria-hidden="true">📝</div>
            <h3>Glossary</h3>
            <p>Searchable dictionary of 25+ election terms and concepts.</p>
            <span class="feature-count">25+ Terms</span>
          </div>
        </div>
      </section>

      <!-- Quick Topics -->
      <section class="quick-topics" aria-labelledby="topics-title">
        <h2 class="section-title" id="topics-title">Browse Topics</h2>
        <div class="topics-grid" role="list">
          ${topicsData.map(t => `
            <div class="topic-card" role="listitem" onclick="App.navigate('topic', '${t.id}')"
                 tabindex="0" style="--topic-color: ${t.color}"
                 aria-label="${t.title} — ${t.summary}"
                 onkeydown="if(event.key==='Enter')App.navigate('topic','${t.id}')">
              <div class="topic-icon" aria-hidden="true">${t.icon}</div>
              <div class="topic-info">
                <h4>${t.title}</h4>
                <p>${t.summary}</p>
              </div>
              <span class="topic-arrow" aria-hidden="true">→</span>
            </div>
          `).join("")}
        </div>
      </section>

      <!-- Did You Know -->
      <section class="did-you-know" aria-labelledby="facts-title">
        <h2 class="section-title" id="facts-title">Did You Know?</h2>
        <div class="facts-carousel" id="facts-carousel" aria-live="polite" aria-atomic="true">
          ${getRandomFacts().map((f, i) => `
            <div class="fact-card ${i === 0 ? "active" : ""}" role="article">
              <div class="fact-icon" aria-hidden="true">${f.icon}</div>
              <p>${f.text}</p>
            </div>
          `).join("")}
        </div>
        <div class="fact-dots" id="fact-dots" role="tablist" aria-label="Fact navigation"></div>
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
      { icon: "🎨", text: "India uses indelible ink (containing silver nitrate) on voters' fingers — the formula was originally developed in Mysore, Karnataka." },
      { icon: "🌐", text: "India has 543 Lok Sabha constituencies, each representing roughly 1.5 to 2 million people — larger than many countries' total populations." }
    ];
  }

  function initFactsCarousel() {
    const cards = document.querySelectorAll(".fact-card");
    const dotsContainer = document.getElementById("fact-dots");
    if (!cards.length || !dotsContainer) return;

    let active = 0;
    dotsContainer.innerHTML = [...cards].map((_, i) =>
      `<span class="fact-dot ${i === 0 ? "active" : ""}" role="tab"
             aria-label="Fact ${i + 1}" aria-selected="${i === 0}"
             tabindex="0" onclick="App.goToFact(${i})"
             onkeydown="if(event.key==='Enter')App.goToFact(${i})"></span>`
    ).join("");

    clearInterval(window._factInterval);
    window._factInterval = setInterval(() => {
      active = (active + 1) % cards.length;
      goToFact(active);
    }, 4000);
  }

  function goToFact(index) {
    document.querySelectorAll(".fact-card").forEach((el, i) => el.classList.toggle("active", i === index));
    document.querySelectorAll(".fact-dot").forEach((el, i) => {
      el.classList.toggle("active", i === index);
      el.setAttribute("aria-selected", i === index ? "true" : "false");
    });
  }

  function renderLearn() {
    const container = document.getElementById("learn-content");
    if (!container) return;

    container.innerHTML = `
      <div class="learn-header">
        <h1>Learn About Indian Elections</h1>
        <p>Comprehensive guides covering every aspect of India's electoral system</p>
      </div>
      <div class="learn-grid" role="list">
        ${topicsData.map(t => `
          <div class="learn-card" role="listitem" onclick="App.navigate('topic', '${t.id}')"
               tabindex="0" aria-label="Read about ${t.title}"
               onkeydown="if(event.key==='Enter')App.navigate('topic','${t.id}')">
            <div class="learn-card-header" style="background: ${t.color}" aria-hidden="true">
              <span class="learn-icon">${t.icon}</span>
            </div>
            <div class="learn-card-body">
              <h3>${t.title}</h3>
              <p>${t.summary}</p>
              <div class="learn-sections">${t.content.length} sections</div>
              <button class="btn-read" aria-label="Read ${t.title}">Read →</button>
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
        <nav class="topic-breadcrumb" aria-label="Breadcrumb">
          <button onclick="App.navigate('learn')" class="breadcrumb-link" aria-label="Back to all topics">← Back to Topics</button>
        </nav>
        <header class="topic-header" style="background: linear-gradient(135deg, ${topic.color}22, ${topic.color}11); border-left: 4px solid ${topic.color}">
          <span class="topic-header-icon" aria-hidden="true">${topic.icon}</span>
          <div>
            <h1>${topic.title}</h1>
            <p>${topic.summary}</p>
          </div>
        </header>
        <div class="topic-sections" role="list">
          ${topic.content.map((section, i) => `
            <article class="topic-section" role="listitem">
              <div class="section-number" style="background: ${topic.color}" aria-label="Section ${i + 1}">${i + 1}</div>
              <div class="section-body">
                <h3>${section.heading}</h3>
                <p>${section.text.replace(/\n/g, "<br>")}</p>
              </div>
            </article>
          `).join("")}
        </div>
        <footer class="topic-footer">
          <button class="btn-primary" onclick="App.navigate('quiz')" aria-label="Test your knowledge with a quiz">Test Your Knowledge 🧠</button>
          <button class="btn-secondary" onclick="App.navigate('flashcards')" aria-label="Study with flashcards">Study Flashcards 📚</button>
        </footer>
      </div>
    `;
  }

  function renderTimeline() {
    const container = document.getElementById("timeline-content");
    if (!container) return;

    container.innerHTML = `
      <header class="timeline-header">
        <h1>India's Election History</h1>
        <p>Key milestones in 75+ years of democratic elections</p>
      </header>
      <ol class="timeline" aria-label="Election timeline">
        ${timelineData.map((event, i) => `
          <li class="timeline-item ${i % 2 === 0 ? "left" : "right"}">
            <div class="timeline-dot" aria-hidden="true">${event.icon}</div>
            <article class="timeline-card">
              <time class="timeline-year" datetime="${event.year}">${event.year}</time>
              <h3>${event.event}</h3>
              <p>${event.detail}</p>
            </article>
          </li>
        `).join("")}
      </ol>
    `;
  }

  function renderGlossary() {
    const container = document.getElementById("glossary-content");
    if (!container) return;

    container.innerHTML = `
      <header class="glossary-header">
        <h1>Election Glossary</h1>
        <p>Key terms and concepts in Indian elections</p>
        <div class="glossary-search">
          <label for="glossary-input" class="sr-only">Search election terms</label>
          <input type="search" id="glossary-input"
                 placeholder="🔍 Search terms…"
                 aria-label="Search election terms"
                 class="search-input"
                 autocomplete="off">
        </div>
      </header>
      <div class="glossary-list" id="glossary-list" role="list" aria-live="polite" aria-label="Glossary terms">
        ${renderGlossaryItems(glossaryData)}
      </div>
    `;

    // Debounced search — fires 250ms after user stops typing
    const input = document.getElementById("glossary-input");
    if (input) {
      input.addEventListener("input", debounce(filterGlossary, 250));
    }
  }

  function renderGlossaryItems(items) {
    const grouped = {};
    items.forEach(item => {
      const letter = item.term[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(item);
    });

    return Object.keys(grouped).sort().map(letter => `
      <div class="glossary-group" role="listitem">
        <div class="glossary-letter" role="heading" aria-level="3">${letter}</div>
        <dl>
          ${grouped[letter].map(item => `
            <div class="glossary-item">
              <dt>${item.term}</dt>
              <dd>${item.definition}</dd>
            </div>
          `).join("")}
        </dl>
      </div>
    `).join("");
  }

  function filterGlossary() {
    const query = document.getElementById("glossary-input")?.value.toLowerCase() || "";
    const filtered = glossaryData.filter(item =>
      item.term.toLowerCase().includes(query) || item.definition.toLowerCase().includes(query)
    );
    const container = document.getElementById("glossary-list");
    if (!container) return;

    const count = filtered.length;
    container.setAttribute("aria-label", `${count} glossary term${count !== 1 ? "s" : ""} found`);
    container.innerHTML = count
      ? renderGlossaryItems(filtered)
      : `<p class="no-results" role="status">No terms found for "<em>${query}</em>"</p>`;
  }

  function setupMobileMenu() {
    const toggle = document.getElementById("mobile-toggle");
    const menu = document.getElementById("mobile-menu");
    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        const isHidden = menu.classList.toggle("hidden");
        toggle.setAttribute("aria-expanded", String(!isHidden));
      });
    }
  }

  return { init, navigate, goToFact, filterGlossary };
})();

// ─── BOOTSTRAP ────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => App.init());
