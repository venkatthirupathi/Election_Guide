// ─── FIREBASE SERVICES ────────────────────────────────────────────────────────
// Integrates Firebase Auth, Firestore, and Analytics for the Election Guide

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import {
  getFirestore, collection, addDoc, getDocs,
  query, orderBy, limit, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ── CONFIG (replace with your Firebase project values) ─────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyElectionGuideIndiaProjectKeyXXXXXX",
  authDomain: "election-guide-india.firebaseapp.com",
  projectId: "election-guide-india",
  storageBucket: "election-guide-india.appspot.com",
  messagingSenderId: "987654321098",
  appId: "1:987654321098:web:abc123def456ghi789",
  measurementId: "G-ELECTIONIND1"
};

// ── INITIALIZATION ──────────────────────────────────────────────────────────
let app, analytics, db, auth;
let currentUser = null;
let initialized = false;

function initFirebase() {
  try {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    db = getFirestore(app);
    auth = getAuth(app);
    initialized = true;

    // Anonymous sign-in for progress tracking without requiring registration
    signInAnonymously(auth).catch(err =>
      console.warn("Anonymous auth unavailable (offline mode):", err.code)
    );

    onAuthStateChanged(auth, user => {
      currentUser = user;
      if (user) {
        console.info("Election Guide: session started", user.uid.slice(0, 8) + "...");
      }
    });
  } catch (err) {
    console.warn("Firebase init skipped (check config):", err.message);
  }
}

// ── ANALYTICS EVENTS ────────────────────────────────────────────────────────
function logPageView(pageName) {
  if (!initialized) return;
  try {
    logEvent(analytics, "page_view", {
      page_title: `Election Guide – ${pageName}`,
      page_location: window.location.href
    });
  } catch (e) { /* offline */ }
}

function logQuizComplete(score, total, category) {
  if (!initialized) return;
  try {
    logEvent(analytics, "quiz_complete", {
      score,
      total_questions: total,
      category,
      percentage: Math.round((score / total) * 100)
    });
  } catch (e) { /* offline */ }
}

function logFlashcardSession(known, total) {
  if (!initialized) return;
  try {
    logEvent(analytics, "flashcard_session", {
      cards_mastered: known,
      total_cards: total,
      mastery_rate: Math.round((known / total) * 100)
    });
  } catch (e) { /* offline */ }
}

function logChatQuery(query) {
  if (!initialized) return;
  try {
    logEvent(analytics, "chat_query", { query_length: query.length });
  } catch (e) { /* offline */ }
}

// ── FIRESTORE OPERATIONS ────────────────────────────────────────────────────
async function saveQuizScore(score, total, category) {
  if (!initialized || !db) return null;
  try {
    const docRef = await addDoc(collection(db, "quiz_scores"), {
      score,
      total,
      category,
      percentage: Math.round((score / total) * 100),
      userId: currentUser?.uid || "anonymous",
      timestamp: serverTimestamp()
    });
    return docRef.id;
  } catch (err) {
    console.warn("Could not save score (offline or unconfigured):", err.code);
    return null;
  }
}

async function getLeaderboard(limitCount = 10) {
  if (!initialized || !db) return [];
  try {
    const q = query(
      collection(db, "quiz_scores"),
      orderBy("percentage", "desc"),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.warn("Leaderboard unavailable:", err.code);
    return [];
  }
}

async function saveUserProgress(progressData) {
  if (!initialized || !db || !currentUser) return null;
  try {
    const docRef = await addDoc(collection(db, "user_progress"), {
      userId: currentUser.uid,
      ...progressData,
      timestamp: serverTimestamp()
    });
    return docRef.id;
  } catch (err) {
    console.warn("Progress save failed:", err.code);
    return null;
  }
}

// ── PUBLIC API ───────────────────────────────────────────────────────────────
export const FirebaseService = {
  init: initFirebase,
  logPageView,
  logQuizComplete,
  logFlashcardSession,
  logChatQuery,
  saveQuizScore,
  getLeaderboard,
  saveUserProgress,
  get userId() { return currentUser?.uid || null; },
  get isSignedIn() { return currentUser !== null; }
};

// Expose globally for non-module scripts
window.FirebaseService = FirebaseService;

// Auto-initialize
initFirebase();
