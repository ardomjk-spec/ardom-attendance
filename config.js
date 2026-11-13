/* =====================================================================
   ARDOM Firebase connection — PASTE YOUR CONFIG HERE
   ---------------------------------------------------------------------
   How to get these values (free, ~5 minutes):
   1. Go to https://console.firebase.google.com and sign in with any Google account
   2. "Create project"  → name it e.g.  ardom-attendance  → continue
   3. In the project: Build → Realtime Database → Create database
      → location: any near you (e.g. asia-south1) → Start in TEST MODE
   4. Open "Project settings" (gear icon) → "Your apps" → pick the </> web icon
      → register the app (no hosting needed) → Firebase shows a config block
   5. Copy apiKey, authDomain, databaseURL, projectId, storageBucket and
      paste them between "..." below. Only those 5 lines are needed.
   ===================================================================== */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyADoKimvPx3qtpVhiFlPDwfvevgMjzvorQ",
  authDomain: "ardom-attendance.firebaseapp.com",
  databaseURL: "https://ardom-attendance-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ardom-attendance",
  storageBucket: "ardom-attendance.firebasestorage.app",
};

/* elevated admin session for punch-time edits: when the admin types the
   password, the session ALSO signs in with this account (same password).
   The Firebase rules let ONLY this account change past check-in times. */
const ADMIN_BOT_EMAIL = "ardom-bot@ardom-app.local";
