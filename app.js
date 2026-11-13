/* ============================================================
   ARDOM Attendance — select ID → selfie → check in/out (1x/day)
   Records include selfie + GPS location.
   ============================================================ */

const $ = (id) => document.getElementById(id);
const LS_KEY = "ardom_attendance_v2";

/* ---------------- employee register (imported from Excel) ----------------
   id    -> appears in the searchable list
   name  -> shown everywhere
   pin   -> 4-6 digit code; only that employee can punch under their ID.
            All PINs are currently the default "123" - change them!
*/
const EMPLOYEES = [
  { id: "ARD5685", name: "ABEED UR REHMAN RAFIQI", pin: "" },
  { id: "ARD5841A", name: "ATIF SHOWKAT", pin: "" },
  { id: "ARD5842A", name: "IRFAN ASHRAF BHAT", pin: "" },
  { id: "ARD5845A", name: "PARVAZ AHMAD KHAN", pin: "" },
  { id: "ARD5846A", name: "MOHD YOUNIS LONE", pin: "" },
  { id: "ARD5850B", name: "MOHD IBRAHIM MIR", pin: "" },
  { id: "ARD5852", name: "SABZAR AHMAD ITOO", pin: "" },
  { id: "ARD5853", name: "GULZAR AHMAD DAR", pin: "" },
  { id: "ARD5855A", name: "UMAR JAN SHAH", pin: "" },
  { id: "ARD5856A", name: "FEROOZ AHMAD GUROO", pin: "" },
  { id: "ARD5857A", name: "NADEEM RASHID DAR", pin: "" },
  { id: "ARD5858A", name: "ZAHID ZAHOOR", pin: "" },
  { id: "ARD5860A", name: "SUHAIL AHMAD THAKUR", pin: "" },
  { id: "ARD5862A", name: "SAJAD AHMAD BHAT", pin: "" },
  { id: "ARD5863A", name: "BASITUL MUSHTAQ", pin: "" },
  { id: "ARD5864A", name: "STANZIN NAMGYAL", pin: "" },
  { id: "ARD5869A", name: "SHAHNAWAZ MUSHATAQ", pin: "" },
  { id: "ARD5872", name: "AROOJ UL ISLAM", pin: "" },
  { id: "ARD5873A", name: "HILAL AHMAD MIR", pin: "" },
  { id: "ARD5875", name: "WIKAS AHMAD WANI", pin: "" },
  { id: "ARD5878A", name: "MOHAMMAD SHAFI MALIK", pin: "" },
  { id: "ARD5879", name: "AJAZ AHMAD SHEIKH", pin: "" },
  { id: "ARD5880B", name: "MUDASIR AHMAD PARREY", pin: "" },
  { id: "ARD5881A", name: "MUDASIR AHMAD WANI", pin: "" },
  { id: "ARD5882A", name: "ABDUL RASHID TAILI", pin: "" },
  { id: "ARD5884", name: "SALEEM ASHRAF BHAT", pin: "" },
  { id: "ARD5889A", name: "TANVEER AHMAD BHAT", pin: "" },
  { id: "ARD5891A", name: "ISHFAQ IMTIYAZ", pin: "" },
  { id: "ARD5893A", name: "MAAJID UL HAQ", pin: "" },
  { id: "ARD5894A", name: "MOHAMMAD ANWAR MASOODI", pin: "" },
  { id: "ARD5898A", name: "MOMIN AHMAD GANIE", pin: "" },
  { id: "ARD5899", name: "MUSHTAQ AHMAD HAJAM", pin: "" },
  { id: "ARD5901A", name: "NASEER AHMAD WANI", pin: "" },
  { id: "ARD5902A", name: "NASEER U DIN SHAH", pin: "" },
  { id: "ARD5903A", name: "TARIQ AHMAD HAJAM", pin: "" },
  { id: "ARD5904A", name: "PARSHEED AHMED WANI", pin: "" },
  { id: "ARD5906A", name: "SHEIKH SAJAD HUSSAIN", pin: "" },
  { id: "ARD5909", name: "ISSEY MUTUP", pin: "" },
  { id: "ARD5917A", name: "ARIF ALI HAJAM", pin: "" },
  { id: "ARD5918B", name: "HAROON RASHID", pin: "" },
  { id: "ARD5920A", name: "VIVEK BADYAL", pin: "" },
  { id: "ARD5925", name: "JAVID AHMAD BHAT", pin: "" },
  { id: "ARD5926A", name: "MAHMOOD AHMAD SHEIKH", pin: "" },
  { id: "ARD5929B", name: "SAFFAN MAJEED KHAN", pin: "" },
  { id: "ARD5931B", name: "AEJAZ AHMAD SHEIKH", pin: "" },
  { id: "ARD5932A", name: "AJAZ AHMAD SHEIKH", pin: "" },
  { id: "ARD5933B", name: "BASHIR AHMAD MIR", pin: "" },
  { id: "ARD5934", name: "BASHARAT AHMAD LONE", pin: "" },
  { id: "ARD5940A", name: "MUDASIR AHMAD BANGROO", pin: "" },
  { id: "ARD5941B", name: "NASIR HUSSAIN MOCHI", pin: "" },
  { id: "ARD5946B", name: "TARIQ AHMAD DAR", pin: "" },
  { id: "ARD5951A", name: "MUHAMMAD SAYEED KHAN", pin: "" },
  { id: "ARD5953A", name: "KHURSHEED AHMAD KUMAR", pin: "" },
  { id: "ARD5967", name: "MORUP STANZIN", pin: "" },
  { id: "ARD5971A", name: "QAISAR JAN SHAH", pin: "" },
  { id: "ARD5976B", name: "SHAFIQ AHMAD MALIK", pin: "" },
  { id: "ARD5980A", name: "IRSHAD AHMED", pin: "" },
  { id: "ARD5981", name: "IMTIYAZ AHMAD MALIK", pin: "" },
  { id: "ARD5984", name: "AIJAZ YOUSAF", pin: "" },
  { id: "ARD5985", name: "JAVID AHMAD NAJAR", pin: "" },
  { id: "ARD5987A", name: "JUNAID MUSHTAQ NAJAR", pin: "" },
  { id: "ARD5993A", name: "TAWSEEF AHMAD", pin: "" },
  { id: "ARD5994A", name: "VAKEEL AHMAD SHAH", pin: "" },
  { id: "ARD6001A", name: "STANZIN JIGMET", pin: "" },
  { id: "ARD6002A", name: "ZAKIR AHMAD MALIK", pin: "" },
  { id: "ARD6014A", name: "SUHAIL MOHI UD DIN", pin: "" },
  { id: "ARD6015B", name: "MOHD ALI", pin: "" },
  { id: "ARD6020A", name: "TAJAMUL AZIZ LONE", pin: "" },
  { id: "ARD6026", name: "MOHAMMAD ALI", pin: "" },
  { id: "ARD6028A", name: "ZEESHAN HUSSAIN", pin: "" },
  { id: "ARD6037", name: "UMAR RASHID", pin: "" },
  { id: "ARD6053B", name: "MOHD BAQIR", pin: "" },
  { id: "ARD6054B", name: "PHUNTSOG TUNDUP", pin: "" },
  { id: "ARD6055", name: "AAQIB RIYAZ", pin: "" },
  { id: "ARD6057A", name: "TAHIR AHMAD DAR", pin: "" },
  { id: "ARD6091A", name: "KHURSHID AHMAD GANIE", pin: "" },
  { id: "ARD6094B", name: "MOHD MEHDI", pin: "" },
  { id: "ARD6105B", name: "MOHAMMAD IDREES RAFIQI", pin: "" },
  { id: "ARD6117", name: "RIYAZ AHMAD RATHER", pin: "" },
  { id: "ARD6118A", name: "SHARIQ AHMAD KHAN", pin: "" },
  { id: "ARD6234B", name: "MIR MUZAMIL SULTAN", pin: "" },
  { id: "ARD6320A", name: "MEHMOOD RAFEEQ KALGAN", pin: "" },
  { id: "ARD6343A", name: "IQBAL AHMAD DAR", pin: "" },
  { id: "ARD6349A", name: "KHURSHEED AHMAD", pin: "" },
  { id: "ARD6351A", name: "SAHIL AHMAD KHAN", pin: "" },
  { id: "ARD6352A", name: "SAJAD AHMAD CHOPAN", pin: "" },
  { id: "ARD6355A", name: "SHAHNAAZ AHMAD", pin: "" },
  { id: "ARD6359A", name: "ZAHID AHMAD DAR", pin: "" },
  { id: "ARD6360A", name: "ZUBAIR AHMAD LONE", pin: "" },
  { id: "ARD6361A", name: "ZUBAIR AHMAD SHAH", pin: "" },
  { id: "ARD6374A", name: "KAISER MOHAMMAD BHAT", pin: "" },
  { id: "ARD6393A", name: "TAWHEED GUL", pin: "" },
  { id: "ARD6396", name: "JAHANGIR MALIK", pin: "" },
  { id: "ARD6413A", name: "IMRAN QADIR GUROO", pin: "" },
  { id: "ARD6414A", name: "HASHIM ALI WANI", pin: "" },
  { id: "ARD6497A", name: "SHAHNAWAZ YOUSUF", pin: "" },
  { id: "ARD6502A", name: "ARIF AHMAD MIR", pin: "" },
  { id: "ARD6523A", name: "IFTIKHAR AHMAD CHECK", pin: "" },
  { id: "ARD6524", name: "MAHBOOB HUSSAIN SHEIKH", pin: "" },
  { id: "ARD6528A", name: "JIGMAT PHUNTSOG", pin: "" },
  { id: "ARD6594A", name: "ZUBAIR AHMAD MALIK", pin: "" },
  { id: "ARD6621A", name: "BASIT RAMZAN", pin: "" },
  { id: "ARD6899", name: "THINLAS NORBOO", pin: "" },
  { id: "ARD5885A", name: "BILAL AHMAD TEELI", pin: "" },
  { id: "ARD5888B", name: "SHAHZAD NABI WANI", pin: "" },
  { id: "ARD5905B", name: "OZAIR FAYAZ", pin: "" },
  { id: "ARD5912A", name: "PUNCHOK TUNDUP", pin: "" },
  { id: "ARD5919A", name: "URGAIN TASHI", pin: "" },
  { id: "ARD5923B", name: "HILAL AHMAD GANIE", pin: "" },
  { id: "ARD5952A", name: "SEERAT AHMAD", pin: "" },
  { id: "ARD5990A", name: "NAZARAF AHMAD KOOLI", pin: "" },
  { id: "ARD6007B", name: "ARIF MUSHTAQ", pin: "" },
  { id: "ARD6017A", name: "TSERING KUNCHOK", pin: "" },
  { id: "ARD6024B", name: "MOHAMMAD HANEEF LONE", pin: "" },
  { id: "ARD6043B", name: "ZAFAR ALI", pin: "" },
  { id: "ARD6097B", name: "RAMEEZ RAJA", pin: "" },
  { id: "ARD6293A", name: "ISHAQ RASHID", pin: "" },
  { id: "ARD6314A", name: "SONAM PALJOR", pin: "" },
  { id: "ARD6347A", name: "JAVID AHMAD SHEIKH", pin: "" },
  { id: "ARD6376A", name: "SALEHEEN AHMAD", pin: "" },
  { id: "ARD6433A", name: "TOUSEEF RASOOL DAR", pin: "" },
  { id: "ARD6498A", name: "ALI SHAH", pin: "" },
  { id: "ARD6623A", name: "SARJEEL AHMAD DAR", pin: "" },
  { id: "ARD6662A", name: "WASEEM AHMAD MIR", pin: "" },
  { id: "ARD7062", name: "WAJID ALI", pin: "" },
  { id: "ARD7063", name: "MOHD HUSSAIN AZAD", pin: "" },
  { id: "ARD7068", name: "WASEEM RAMZAN BHAT", pin: "" },
  { id: "ARD7071", name: "MOHAMMAD ABASS", pin: "" },
  { id: "ARD7072", name: "STANZIN DYSAL", pin: "" },
  { id: "CARD4854A", name: "TUNDUP NAMGYAIL", pin: "" },
  { id: "ARD7075", name: "NIDDA MANZOOR GANAIE", pin: "" },
  { id: "ARD7076", name: "UMER MUSHTAQ", pin: "" },
  { id: "ARD7078", name: "ASHAQ AHMAD MIR", pin: "" },
  { id: "ARD7081", name: "TALIB MANZOOR", pin: "" },
  { id: "ARD7083", name: "AKHTAR ALI KHAN", pin: "" },
  { id: "ARD7086", name: "MOHAMMAD ARIF KHAN", pin: "" },
  { id: "ARD7087", name: "BIR SINGH", pin: "" },
  { id: "ARD7090", name: "GH MOHAMMAD SHIEKH", pin: "" },
  { id: "ARD7094", name: "GOWHAR AYAZ BHAT", pin: "" },
  { id: "ARD7096", name: "PIR ANZAR", pin: "" },
  { id: "ARD7097", name: "UMER FAROOQ LANGOO", pin: "" },
  { id: "ARD7101", name: "TARIQ AHMAD MIR", pin: "" },
  { id: "ARD6439A", name: "PEERZADA ADIL GULZAR", pin: "" },
  { id: "ARD7145", name: "SHAHBAZ AHMAD BHAT", pin: "" },
  { id: "ARD7121", name: "MUDASIR AHMAD KUMAR", pin: "" },
  { id: "ARD7123", name: "SAVEER AHMAD BHAT", pin: "" },
  { id: "ARD6567A", name: "STANZIN NOORBU", pin: "" },
  { id: "ARD5874A", name: "IMRAN NAZIR BEIGH", pin: "" },
  { id: "ARD5883B", name: "MUZAFER HUSSAIN SHEIKH", pin: "" },
  { id: "ARD7168", name: "BASIT YOUSUF WANI", pin: "" },
  { id: "ARD7169", name: "MAROOF MAQBOOL LONE", pin: "" },
  { id: "ARD7160", name: "ARIEF HUSSAIN LONE", pin: "" },
  { id: "ARD7164", name: "ALTAF HUSSAIN", pin: "" },
  { id: "ARD7165", name: "SHAFAT AHMAD MALIK", pin: "" },
  { id: "ARD7211", name: "DELDAN NAMGAIL", pin: "" },
  { id: "ARD7214", name: "MOHD RAFIQ BHAT", pin: "" },
  { id: "ARD7215", name: "NISAR AHMAD", pin: "" },
  { id: "ARD7218", name: "FAIZAN HASSAN", pin: "" },
  { id: "ARD7280", name: "SAKIB RASOOL", pin: "" },
  { id: "ARD7293", name: "RAVIJEET SINGH", pin: "" },
  { id: "ARD7311", name: "NUMAN RASOOL", pin: "" },
  { id: "ARD7327", name: "ARSHID HUSSAIN ZARGAR", pin: "" },
  { id: "ARD7340", name: "LATEEF AHMAD WANI", pin: "" },
  { id: "ARD7369", name: "MOHAMMAD SHAFI KHAN", pin: "" },
  { id: "ARD7370", name: "ADIL BASHIR DAR", pin: "" },
  { id: "ARD7393", name: "MUDASSAR TARIQ MIR", pin: "" },
  { id: "ARD7407", name: "MOHAMMAD ARIF WANI", pin: "" },
  { id: "ARD7408", name: "KEWAL SINGH", pin: "" },
  { id: "ARD7425", name: "MAJID SHAFI", pin: "" },
  { id: "ARD7438", name: "MALIK MUNER", pin: "" },
  { id: "ARD7439", name: "SHAHID MOHMOOD BHAT", pin: "" },
  { id: "ARD7440", name: "UBAID NABI MASOODI", pin: "" },
  { id: "ARD5973B", name: "YASIR QAYOOM", pin: "" },
  { id: "ARD7469", name: "MANJEET SINGH", pin: "" },
  { id: "ARD7477", name: "RAVINDER SHARMA", pin: "" },
  { id: "ARD7100A", name: "MUZAMMIL RASHID SHEIKH", pin: "" },
  { id: "ARD7482", name: "TASHI WANGCHOK", pin: "" },
  { id: "ARD7483", name: "ADIL AHMAD GANAI", pin: "" },
  { id: "ARD7539", name: "GULZAR HUSSAIN", pin: "" },
  { id: "ARD7542", name: "PEERZADA RASHID ASHRAF", pin: "" },
  { id: "ARD7554", name: "SARFARAZ AHMAD", pin: "" },
  { id: "ARD7595", name: "ALTAF AHMAD MALIK", pin: "" },
  { id: "ARD5995A", name: "PARVAIZ AHMAD MALIK", pin: "" },
  { id: "ARD7599", name: "DANISH MANZOOR", pin: "" },
  { id: "ARD7624", name: "BASIT MANZOOR", pin: "" },
  { id: "ARD7638", name: "UMER KHURSHID", pin: "" },
  { id: "ARD7640", name: "ZUBAIR AHMAD", pin: "" },
  { id: "ARD7666", name: "YAWAR AHMAD SHAH", pin: "" },
  { id: "ARD7668", name: "SAQIB ALI", pin: "" },
  { id: "ARD7669", name: "ASIF ALI RATHER", pin: "" },
  { id: "ARD7741", name: "YOUNIS AHMAD BEIGH", pin: "" },
  { id: "ARD7759", name: "NISAR AHMED KHANDAY", pin: "" },
  { id: "ARD6044B", name: "MOHMAD IMRAN MIR", pin: "" },
  { id: "ARD7847", name: "BILAL AHMAD MALLA", pin: "" },
  { id: "ARD6530A", name: "TSERING ANGCHUK SIRI", pin: "" },
  { id: "ARD7884", name: "SKALZANG DORJEY", pin: "" },
  { id: "ARD7895", name: "SAJAD AHMAD DAR", pin: "" },
  { id: "ARD6006C", name: "JIGMATH PUNCHOK", pin: "" },
  { id: "ARD7922", name: "PARRY ZADA WASEEM AHMAD", pin: "" },
  { id: "ARD7935", name: "MOHSAN REYAZ WAR", pin: "" },
  { id: "ARD7941", name: "ABID AHMED MALIK", pin: "" },
  { id: "ARD7969", name: "SHARAFAT BASHIR", pin: "" },
  { id: "ARD6375B", name: "WASEEM RAJA", pin: "" },
  { id: "ARD7975", name: "ABID HUSSAIN", pin: "" },
  { id: "ARD7981", name: "WASIM GUL", pin: "" },
  { id: "ARD7984", name: "ADIL ASHRAF GADDA", pin: "" },
  { id: "ARD5983A", name: "AB QUYOOM MALIK", pin: "" },
  { id: "ARD7994", name: "MOHSIN AJAZ", pin: "" },
  { id: "ARD8006", name: "FEROOZ AHMAD MAGRAY", pin: "" },
  { id: "ARD8016", name: "SHAKOOR AH KHAN", pin: "" },
  { id: "ARD8019", name: "AZHAR MEHMOOD", pin: "" },
  { id: "ARD8020", name: "TANVEER AHMAD MALIK", pin: "" },
  { id: "ARD7089A", name: "YASSAR AHMAD MALIK", pin: "" },
  { id: "ARD5896B", name: "UZAIR GANI BHAT", pin: "" },
  { id: "ARD8057", name: "SAMEER NABI CHOPAN", pin: "" },
  { id: "ARD7217A", name: "WASEEM KHAN", pin: "" },
  { id: "ARD8185", name: "UMER GULL", pin: "" },
  { id: "ARD8225", name: "SHUB KUMAR", pin: "" },
  { id: "ARD8249", name: "ABDUL MAJEED DAR", pin: "" },
  { id: "ARD8256", name: "MOHAMMAD AUYOOB SHEIKH", pin: "" },
  { id: "ARD7264B", name: "DANISH HABIB", pin: "" },
  { id: "ARD8259", name: "TASEER LATIEF BHAT", pin: "" },
  { id: "JK-SEP26-04", name: "AMIR BASHIR", pin: "" },
  { id: "JK-SEP26-03", name: "IMTIYAZ AHMAD SEER", pin: "" },
  { id: "JK-OCT26-01", name: "MUSADIQ SADIQ", pin: "" },
  { id: "JK-OCT26-02", name: "ASIF BASHIR GOJAR KALGAN", pin: "" },
  { id: "JKL-OCT26-01", name: "JATINDER PAL SINGH", pin: "" },
];

/* ---------------- state ---------------- */
let state = {
  empID: "",
  name: "",
  selfie: null,
  stream: null,
  records: loadRecords(),
  me: null, // who is using this device this session (survives refresh)
};

/* restore "me" for this browsing session ("My attendance" card works across refresh) */
try { state.me = JSON.parse(sessionStorage.getItem("ardom_me") || "null"); } catch (e) {}

function loadRecords() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; }
  catch { return []; }
}
function saveRecords() {
  localStorage.setItem(LS_KEY, JSON.stringify(state.records));
}

/* ======================================================================
   LIVE SYNC (Firebase) — every phone writes to ONE central database
   Fallback: if no config is pasted in config.js → local mode per device
   ====================================================================== */
let db = null;                    // firebase database handle or null
let dayPath = () => "attendance/" + dayKeyISO();

function dayKeyISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function initSync() {
  const chip = $("syncChip");
  const cfg = typeof FIREBASE_CONFIG !== "undefined" ? FIREBASE_CONFIG : null;
  const filled = cfg && cfg.apiKey && !String(cfg.apiKey).startsWith("PASTE");

  if (!filled || typeof firebase === "undefined") {
    chip.textContent = "⚪ Local only";
    chip.title = "Paste your Firebase config into config.js to enable live sync";
    return;
  }
  try {
    firebase.initializeApp(cfg);
    db = firebase.database();
    chip.textContent = "🟢 Signing in…";

    /* anonymous sign-in → every real employee session gets a token the
       security rules require; random strangers without the app get nothing */
    const anonIn = firebase.auth().signInAnonymously().catch((err) => {
      chip.textContent = "⚠ Sign-in failed";
      chip.title = err.message + " — Did you enable the Anonymous provider in Firebase Authentication?";
      showToast("Auth failed — see sync chip tooltip");
    });

    let listenersBound = false; // auth changes (admin elevation) must not duplicate listeners
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) return;
      if (listenersBound) { // elevated session took over — just restore the chip state
        chip.textContent = "🟢 Live sync";
        if (isAdmin) renderEnrolledGrid();
        return;
      }
      listenersBound = true;
      chip.textContent = "🟢 Connecting…";
      db.ref(dayPath()).on("value", (snap) => {
        state.records = Object.values(snap.val() || {});
        renderRecords();
        renderMyStatus(); // own status flips live (at work → done)
        renderPunchReminders();
        chip.textContent = "🟢 Live sync";
        chip.classList.remove("local");
        chip.classList.add("live");
        if (isAdmin) renderEnrolledGrid(); // enrollment list is safe to read now
      }, (err) => {
        chip.textContent = "⚠ Sync error";
        chip.title = err.message;
      });

      /* leave requests live too — the rejected/approved notice updates instantly */
      db.ref("leaves").on("value", (snap) => {
        leavesCache = snap.val() || {};
        leavesCacheAt = Date.now();
        renderLeaveNotice(true);
        renderPunchReminders();
        if (isAdmin) renderLeaveAdmin();
        if (isAdmin) renderDash();
      }, (err) => { console.warn("leaves listener:", err.message); });

      /* sign-in just completed → NOW the faces read is safe; refresh the
         enrolled-count tile and enrollment grid immediately (they may have
         bootstrapped with a permission-denied empty cache) */
      if (isAdmin) renderEnrolledGrid();
    });

    // rolls the view to the new day automatically at midnight
    chip.dataset.path = dayPath(); // guard: never initialized → reload loop bug
    /* admin page-reload: re-elevate the session silently (the elevated sign-in
       survives only within this tab's sessionStorage). Chained AFTER the
       anonymous sign-in settles so the two can't race. */
    if (sessionStorage.getItem("ardom_admin") === "1" && sessionStorage.getItem("ardom_adminpw")) {
      anonIn.then(() => elevateAdmin(sessionStorage.getItem("ardom_adminpw"), true)).catch(() => {});
    }
    setInterval(() => {
      const p = dayPath();
      if (p !== chip.dataset.path) { chip.dataset.path = p; location.reload(); }
    }, 60000);
  } catch (e) {
    chip.textContent = "⚠ Config error";
    chip.title = e.message;
  }
}

/* write a full record (check-in) */
function writeIn(rec) {
  if (!db) { state.records.push(rec); saveRecords(); renderRecords(); renderMyStatus(); return; }
  db.ref(`${dayPath()}/${rec.empID}`).set(rec);
  /* compact history mirror (no selfie) — powers the employee's own CSV download */
  db.ref(`history/${rec.empID}/${dayKeyISO()}`).set({
    empID: rec.empID, name: rec.name,
    checkIn: rec.checkIn, inLoc: rec.inLoc, checkOut: null, outLoc: null,
  });
}

/* update an existing record (check-out) */
function writeOut(rec, time, loc, verdict) {
  const patch = { checkOut: time, outLoc: loc };
  if (verdict) patch.verifyOut = { kind: verdict.kind, ok: verdict.ok, score: verdict.score || null };
  if (!db) {
    const local = state.records.find(r => r === rec);
    if (local) { Object.assign(local, patch); saveRecords(); renderRecords(); renderMyStatus(); }
    return;
  }
  db.ref(`${dayPath()}/${rec.empID}`).update(patch);
  db.ref(`history/${rec.empID}/${dayKeyISO()}`).update({ checkOut: time, outLoc: loc });
}

/* remove all of today's records — local mode clears instantly;
   in live sync mode keep an audit trail (rules also block it) */
function clearToday() {
  if (!db) { state.records = []; saveRecords(); renderRecords(); return; }
  todayRecords().forEach((r) => db.ref(`history/${r.empID}/${dayKeyISO()}`).remove().catch(() => {}));
  db.ref(dayPath()).remove().then(() => showToast("All records cleared"))
    .catch(() => showToast("🔒 Live mode: records are kept for audit — remove days from the Firebase console"));
}

/* ======================================================================
   LEAVE SYSTEM
   • 2 auto-approved leaves (CL) per employee per calendar month
   • after those are used → the request becomes PL, admin approves or rejects
   • rejected → the employee is notified: "absent today — admin rejected
   ====================================================================== */
const MONTHLY_CL_LIMIT = 2;
let leavesCache = null, leavesCacheAt = 0;

async function allLeaves(force) {
  if (!force && leavesCache && Date.now() - leavesCacheAt < 60000) return leavesCache;
  if (db) {
    await authReady();
    try {
      leavesCache = (await db.ref("leaves").get()).val() || {};
      leavesCacheAt = Date.now();
      return leavesCache;
    } catch (e) { console.warn("leaves read:", e); }
  }
  try { leavesCache = JSON.parse(localStorage.getItem("ardom_leaves") || "{}"); }
  catch (e) { leavesCache = {}; }
  leavesCacheAt = Date.now();
  return leavesCache;
}

function leafForToday(leaves, empID, iso) {
  const mine = leaves[empID] || {};
  return (iso || dayKeyISO()) && mine[iso || dayKeyISO()] || null;
}

/* granted plain leaves (CL) used in the current calendar month */
function monthLeavesUsed(leaves, empID) {
  const ym = dayKeyISO().slice(0, 7);
  const mine = leaves[empID] || {};
  return Object.entries(mine)
    .filter(([d, v]) => d.startsWith(ym) && v && v.type === "CL" && v.status === "granted").length;
}

async function requestLeave(empID, empName, iso) {
  const dateISO = iso || dayKeyISO();
  const leaves = await allLeaves();
  const existing = (leaves[empID] || {})[dateISO];
  if (existing) {
    return { ok: false, leaf: existing, msg:
      existing.status === "granted" ? "🌿 You are already on leave today."
      : existing.status === "pending" ? "🌿 Your PL request is already pending with the admin."
      : "❌ Your earlier leave request was rejected — you are marked ABSENT today." };
  }
  if (activeRecordFor(empID)) {
    return { ok: false, msg: "✅ You already checked in today — you don't need a leave." };
  }
  const used = monthLeavesUsed(leaves, empID);
  const leaf = used < MONTHLY_CL_LIMIT
    ? { type: "CL", status: "granted", appliedAt: new Date().toISOString(), decidedBy: "auto", decidedAt: new Date().toISOString() }
    : { type: "PL", status: "pending", appliedAt: new Date().toISOString() };
  try {
    const rec = Object.assign({ name: empName }, leaf);
    if (db) await db.ref(`leaves/${empID}/${dateISO}`).set(rec);
    else {
      const store = JSON.parse(localStorage.getItem("ardom_leaves") || "{}");
      (store[empID] = store[empID] || {})[dateISO] = rec;
      localStorage.setItem("ardom_leaves", JSON.stringify(store));
    }
    leavesCache = null; leavesCacheAt = 0;
    return leaf.status === "granted"
      ? { ok: true, leaf, msg: `🌿 Leave approved automatically — ${used + 1} of ${MONTHLY_CL_LIMIT} leave days used this month.` }
      : { ok: true, leaf, msg: "🌿 Your PL request has been sent to the admin — waiting for approval." };
  } catch (e) {
    return { ok: false, msg: "⚠ Could not save the request: " + (e.message || e) };
  }
}

/* admin approves or rejects a PL request */
async function decideLeave(empID, iso, approve) {
  const patch = {
    status: approve ? "granted" : "rejected",
    decidedBy: "admin",
    decidedAt: new Date().toISOString(),
  };
  try {
    if (db) await db.ref(`leaves/${empID}/${iso}`).update(patch);
    else {
      const store = JSON.parse(localStorage.getItem("ardom_leaves") || "{}");
      if (store[empID] && store[empID][iso]) Object.assign(store[empID][iso], patch);
      localStorage.setItem("ardom_leaves", JSON.stringify(store));
    }
    leavesCache = null; leavesCacheAt = 0;
    await allLeaves(true);
    showToast(approve ? "🌿 Leave approved" : "❌ Leave rejected — employee notified");
    renderLeaveNotice();
    renderLeaveAdmin();
    renderDash();
  } catch (e) {
    showToast("⚠ Decision failed: " + (e.message || e));
  }
}

/* green/yellow/red notice shown on step 1 for the remembered employee */
let lastLeafNoticeKey = null;
function renderLeaveNotice(live) {
  const box = $("leaveNotice");
  if (!box) return;
  const iso = dayKeyISO();
  const leaves = leavesCache || {};
  let html = "", cls = "", key = "";

  if (state.me) {
    const leaf = (leaves[state.me.empID] || {})[iso];
    if (leaf) {
      const workingNow = activeRecordFor(state.me.empID);
      if (leaf.status === "rejected") {
        key = `${state.me.empID}|rejected`;
        cls = "bad";
        html = `❌ <b>${state.me.name}</b> — the admin <b>rejected your leave request</b>. <b>You are ABSENT today</b> (${leaf.type} pending was denied). Contact your admin.`;
      } else if (leaf.status === "pending") {
        key = `${state.me.empID}|pending`;
        cls = "warn";
        html = `🌿 <b>${state.me.name}</b> — your PL request is <b>pending admin approval</b>. Check back here; you will be notified of the decision.`;
      } else if (leaf.reopenReq && !workingNow) {
        key = `${state.me.empID}|reopenReq`;
        cls = "warn";
        html = `⏳ <b>${state.me.name}</b> — your request to be marked <b>PRESENT today</b> is <b>waiting for admin approval</b>. Once they approve, your check-in opens here.`;
      } else if (!workingNow) {
        key = `${state.me.empID}|granted`;
        cls = "good";
        html = `🌿 <b>${state.me.name}</b> — you are <b>ON LEAVE today</b> (${leaf.type}).<br><button type="button" id="btnReopenReq" class="btn tiny ghost">🌅 I came to work today — ask admin to reopen check-in</button>`;
      }
    }
  }

  /* live rejection notification even while the app is open */
  if (live && key && key.startsWith(state.me && state.me.empID) && key.endsWith("|rejected") && lastLeafNoticeKey !== key) {
    showToast("❌ Admin rejected your leave request — you are absent today");
  }
  lastLeafNoticeKey = key;

  box.className = "leave-note " + cls + (html ? "" : " hidden");
  box.innerHTML = html;
}

/* employee asks to convert today's approved leave back into a working day */
$("leaveNotice").addEventListener("click", async (e) => {
  if (e.target.id !== "btnReopenReq" || !state.me) return;
  const ok = confirm(`Request a reopening of your check-in for TODAY?\n\nThe admin gets your request — once they approve it you can check in and your ${dayKeyISO()} leave gets cancelled.`);
  if (!ok) return;
  try {
    if (db) {
      await db.ref(`leaves/${state.me.empID}/${dayKeyISO()}`).update({
        reopenReq: true, reopenName: state.me.name,
        reopenAt: new Date().toISOString(),
      });
    } else {
      const store = JSON.parse(localStorage.getItem("ardom_leaves") || "{}");
      const leaf = (store[state.me.empID] || {})[dayKeyISO()];
      if (leaf) Object.assign(leaf, { reopenReq: true });
      localStorage.setItem("ardom_leaves", JSON.stringify(store));
      leavesCache = null; leavesCacheAt = 0; await allLeaves(true);
    }
    showToast("✅ Request SENT — the admin sees it in the leave console. You can check in once they approve.");
    renderLeaveNotice();
  } catch (err) { showToast("⚠ Could not send request: " + (err.message || err)); }
});

/* admin panel — a proper leave console: pending PL decisions + on-leave today (cancelable) */
async function renderLeaveAdmin() {
  const panel = $("leavePanel");
  if (!panel) return;
  const leaves = await allLeaves();
  const today = dayKeyISO();
  const pending = [];
  const onLeaveToday = [];

  Object.entries(leaves).forEach(([empID, days]) => {
    Object.entries(days || {}).forEach(([iso, v]) => {
      if (!v) return;
      if (v.status === "pending") pending.push({ empID, iso, v });
      if (v.status === "granted" && iso === today) onLeaveToday.push({ empID, iso, v });
    });
  });
  pending.sort((a, b) => a.iso.localeCompare(b.iso));

  let html = `<h4>🌿 Leave console — ${pending.length} pending · ${onLeaveToday.length} on leave today</h4>`;

  html += pending.length
    ? pending.map(({ empID, iso, v }) => {
        const emp = EMPLOYEES.find((x) => x.id === empID);
        const used = monthLeavesUsed(leaves, empID);
        const worked = iso === today && recordForToday(empID) ? " · ⚠ already punched in that day" : "";
        return `<div class="leave-row pending">
          <div><b>${empID}</b> — ${emp ? emp.name : (v.name || "?")} · <b>${iso}</b> (PL)<br>
          <small>CL used this month: ${used}/${MONTHLY_CL_LIMIT}${worked}</small></div>
          <div class="row">
            <button class="btn tiny primary" data-ok="${empID}|${iso}">✔ Approve</button>
            <button class="btn tiny danger" data-no="${empID}|${iso}">✖ Reject</button>
          </div>
        </div>`;
      }).join("")
    : `<p class="hint">No pending PL requests. The first 2 leaves/month approve automatically (CL); beyond that each request lands here for your decision.</p>`;

  html += onLeaveToday.length
    ? onLeaveToday.map(({ empID, iso, v }) => {
        const emp = EMPLOYEES.find((x) => x.id === empID);
        const asking = v.reopenReq
          ? `<br><b>⏳ This employee says they CAME TO WORK</b> — approve to reopen their check-in.`
          : `<small>Their check-in is blocked. Cancel below if they actually came to work.</small>`;
        const btns = v.reopenReq
          ? `<div class="row">
               <button class="btn tiny primary" data-convert="${empID}|${iso}">✔ Approve → let them check in</button>
               <button class="btn tiny ghost" data-keep="${empID}|${iso}">➖ Keep them on leave</button>
             </div>`
          : `<div class="row"><button class="btn tiny ghost" data-cancel="${empID}|${iso}">➖ Cancel leave</button></div>`;
        return `<div class="leave-row ${v.reopenReq ? "pending" : "granted"}">
          <div>🌿 <b>${empID}</b> — ${emp ? emp.name : (v.name || "?")} is <b>ON LEAVE today</b> (${v.type})${v.reopenReq ? `<br><small>requested at ${new Date(v.reopenAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</small>` : ""}<br>${asking}</div>
          ${btns}
        </div>`;
      }).join("")
    : `<p class="hint">Nobody is on leave today.</p>`;

  panel.innerHTML = html;
}

/* admin keeps them on leave — clears the employee's reopen request */
async function keepOnLeave(empID, iso) {
  try {
    if (db) await db.ref(`leaves/${empID}/${iso}`).update({ reopenReq: null, reopenName: null, reopenAt: null });
    else {
      const store = JSON.parse(localStorage.getItem("ardom_leaves") || "{}");
      const leaf = (store[empID] || {})[iso];
      if (leaf) { delete leaf.reopenReq; delete leaf.reopenName; delete leaf.reopenAt; }
      localStorage.setItem("ardom_leaves", JSON.stringify(store));
      leavesCache = null; leavesCacheAt = 0; await allLeaves(true);
    }
    showToast(`🌿 ${empID} stays ON LEAVE — their request was dismissed`);
    renderLeaveNotice();
    renderLeaveAdmin();
  } catch (e) { showToast("⚠ Could not save: " + (e.message || e)); }
}

/* admin cancels a wrongly-approved leave → check-in for that day opens again */
async function cancelLeave(empID, iso, customMsg) {
  try {
    if (db) await db.ref(`leaves/${empID}/${iso}`).remove();
    else {
      const store = JSON.parse(localStorage.getItem("ardom_leaves") || "{}");
      if (store[empID]) delete store[empID][iso];
      localStorage.setItem("ardom_leaves", JSON.stringify(store));
    }
    leavesCache = null; leavesCacheAt = 0;
    await allLeaves(true);
    showToast(customMsg || "Leave cancelled — employee can check in again");
    renderLeaveNotice();
    renderLeaveAdmin();
    renderDash();
  } catch (e) {
    showToast("⚠ Cancel failed: " + (e.message || e));
  }
}

/* approve/reject/cancel/keep/convert clicks are delegated */
document.addEventListener("click", (e) => {
  const hit = e.target.closest && e.target.closest("[data-ok],[data-no],[data-cancel],[data-convert],[data-keep]");
  if (!hit) return;
  const [empID, iso] = (hit.dataset.ok || hit.dataset.no || hit.dataset.cancel || hit.dataset.convert || hit.dataset.keep).split("|");
  if (hit.dataset.convert) {
    if (!confirm(`Approve ${empID}'s "I came to work" request for ${iso}?\n\nTheir leave gets cancelled and they can check in right away.`)) return;
    cancelLeave(empID, iso, "✅ Approved — they can check in now. This present punch DOESN'T use their monthly CL quota.");
    return;
  }
  if (hit.dataset.keep) {
    if (!confirm(`Keep ${empID} ON LEAVE for ${iso}?`)) return;
    keepOnLeave(empID, iso);
    return;
  }
  if (hit.dataset.cancel) {
    if (!confirm(`Cancel the approved leave for ${empID} on ${iso}? They will be able to check in again.`)) return;
    cancelLeave(empID, iso);
    return;
  }
  if (!confirm(hit.dataset.no
    ? `Reject the leave for ${empID} on ${iso}? The employee will be notified they are absent.`
    : `Approve PL for ${empID} on ${iso}?`)) return;
  decideLeave(empID, iso, !!hit.dataset.ok);
});

/* shrink selfies so the database stays light */
function compressImage(dataURL, maxDim = 480, quality = 0.72) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL("image/jpeg", quality));
    };
    img.src = dataURL;
  });
}

/* ======================================================================
   FACE ENGINE — enrollment + match (replaces PINs)
   ====================================================================== */
const MODELS_URL = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.15/model";
const FACE_MATCH_MAX = 0.5;   // euclidean distance; 0.4 strict / 0.6 loose
/* un-enrolled employees MUST enroll their face at the first punch (self-service) */
const GRACE_UNENROLLED = false;

let faceCache = {};
let faceEngineState = "idle";

function faceStatus(msg, cls = "") {
  const el = $("faceStatus");
  el.textContent = msg;
  el.className = "face-status " + cls;
}

function faceEngineReady() {
  return faceEngineState === "ready" && typeof faceapi !== "undefined";
}

function loadFaceEngine() {
  if (faceEngineReady()) return Promise.resolve(true);
  if (faceEngineState === "failed") return Promise.resolve(false);
  if (faceEngineState === "loading") {
    return new Promise((r) => {
      const t = setInterval(() => { if (faceEngineState !== "loading") { clearInterval(t); r(faceEngineReady()); } }, 200);
    });
  }
  faceEngineState = "loading";
  return Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODELS_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODELS_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODELS_URL),
  ]).then(() => { faceEngineState = "ready"; return true; })
    .catch((e) => { console.warn("face engine load:", e); faceEngineState = "failed"; return false; });
}

/* compute the 128-d signature of a photo (dataURL) */
async function faceDescriptorOf(dataURL) {
  const ok = await loadFaceEngine();
  if (!ok) return null;
  const img = await new Promise((res) => {
    const i = new Image();
    i.onload = () => res(i);
    i.src = dataURL;
  });
  try {
    const det = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.45 }))
      .withFaceLandmarks().withFaceDescriptor();
    return det ? det.descriptor : null;
  } catch (e) { console.warn("detect:", e); return null; }
}

async function getEnrollment(empID) {
  if (faceCache[empID]) return faceCache[empID];
  const all = await allEnrollments();
  if (all[empID]) faceCache[empID] = all[empID];
  return all[empID] || null;
}

/* all enrollments with a 60s cache (full-node read is once per minute max) */
let facesCache = null, facesCacheAt = 0;
async function allEnrollments(force) {
  /* an EMPTY cached store is never trusted when live sync exists — the boot
     order can stamp one before Firebase assigns `db`, and it would then sit
     there for a full minute showing a false "0 enrolled" */
  const hasCache = facesCache && Date.now() - facesCacheAt < 60000 && Object.keys(facesCache).length > 0;
  if (!force && hasCache) return facesCache;
  if (db) {
    try {
      await authReady();
      const snap = await db.ref("faces").get();
      facesCache = snap.val() || {};
      facesCacheAt = Date.now();
      return facesCache;
    } catch (e) {
      console.warn("faces read:", e);
      /* read failed (e.g. sign-in still settling) — serve whatever we have but
         DON'T stamp a fresh 60s cache on an empty result, or the wrong
         "0 enrolled" would stick for a whole minute */
      if (facesCache && Object.keys(facesCache).length) return facesCache;
      return {};
    }
  }
  try { facesCache = JSON.parse(localStorage.getItem("ardom_faces") || "{}"); }
  catch (e) { facesCache = {}; }
  facesCacheAt = Date.now();
  return facesCache;
}

/* wait for firebase anonymous sign-in to finish before node reads */
function authReady() {
  return new Promise((res) => {
    if (!db || firebase.auth().currentUser) { res(); return; }
    const off = firebase.auth().onAuthStateChanged(() => { off(); res(); });
  });
}

/* who owns this face (if already enrolled) — null if nobody */
async function findFaceOwner(descriptor, excludeID) {
  const store = await allEnrollments();
  let best = null;
  for (const [id, rec] of Object.entries(store)) {
    if (id === excludeID || !rec || !rec.descriptor) continue;
    const dist = euclidean(descriptor, rec.descriptor);
    if (dist <= FACE_MATCH_MAX && (!best || dist < best.dist)) best = { id, dist };
  }
  if (!best) return null;
  const emp = EMPLOYEES.find((x) => x.id === best.id);
  return { id: best.id, name: emp ? emp.name : best.id, dist: best.dist };
}

function euclidean(a, b) {
  let s = 0;
  for (let i = 0; i < a.length; i++) { const d = a[i] - b[i]; s += d * d; }
  return Math.sqrt(s);
}

/* verdict on the captured selfie: ok / mismatch / noface / unenrolled / engine-failed */
async function verifySelfie(dataURL) {
  const enrollment = await getEnrollment(state.empID);

  const det = await faceDescriptorOf(dataURL);
  if (!det) return { ok: false, kind: "noface", msg: "❌ No face found in the photo — retake it in better light." };
  if (!enrollment && faceEngineReady()) {
    state.lastDescriptor = Array.from(det);
    /* first-time user → enrollment is mandatory before anything else */
    if (!GRACE_UNENROLLED) {
      const owner = await findFaceOwner(det, state.empID);
      if (owner) return { ok: false, kind: "wrong-id", msg: `❌ This face is already enrolled under ${owner.id} (${owner.name}). Punch under your own ID.` };
      return { ok: false, kind: "unenrolled", msg: `📸 Welcome, first time here! You must ENROLL your face once before continuing — tap “💾 Enroll my face” below. It takes 5 seconds and never needs repeating.` };
    }
  }
  if (!enrollment) return { ok: true, kind: "engine-failed", msg: "⚠ Face engine unavailable — continuing without face check." };

  const dist = euclidean(det, enrollment.descriptor);
  const similarity = Math.round(Math.max(0, 1 - dist) * 100);
  if (dist <= FACE_MATCH_MAX) {
    return { ok: true, kind: "ok", msg: `✅ Face verified (${similarity}% match)`, score: similarity };
  }
  flagMismatch(dist);
  return { ok: false, kind: "mismatch", msg: `❌ Face does NOT match the enrolled photo (${similarity}%). Only you can punch under your ID.`, score: similarity };
}

/* every mismatch attempt is recorded for the admin */
function flagMismatch(dist) {
  const entry = {
    empID: state.empID, name: state.name, date: todayKey(),
    time: timeNow(), score: Math.round(Math.max(0, 1 - dist) * 100),
  };
  try {
    if (db) db.ref("flagged/" + dayKeyISO()).push(entry);
    else {
      const arr = JSON.parse(localStorage.getItem("ardom_flagged") || "[]");
      arr.push(entry);
      localStorage.setItem("ardom_flagged", JSON.stringify(arr));
    }
    showToast("⚠ A mismatch was recorded for the admin");
  } catch (e) { console.warn(e); }
}

/* ---------------- helpers ---------------- */
function todayKey() { return new Date().toDateString(); }
function timeNow() {
  /* hour12 forced — device locale used to decide (some phones saved "13:59:03",
     which broke worked-hour math). Every punch now stores "01:59:03 PM". */
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
}
function empOf(id) { return EMPLOYEES.find((e) => e.id === id); }
/* a record voided by the admin ("converted to leave") is invisible in every
   place that treats it as presence — the leave entry itself replaces it */
function isVoided(r) { return r && r.voided === true; }
function activeRecordFor(id) {
  const rec = recordForToday(id);
  return rec && !isVoided(rec) ? rec : null;
}
function todayRecords() { return state.records.filter((r) => r.date === todayKey()); }
function recordForToday(id) {
  return todayRecords().find((r) => r.empID === id) || null;
}
function fmtLoc(loc) {
  return loc ? `${loc.lat.toFixed(5)}, ${loc.lng.toFixed(5)} (±${Math.round(loc.acc)}m)` : "location unavailable";
}
function mapLink(loc) {
  return loc ? `https://www.openstreetmap.org/?mlat=${loc.lat}&mlon=${loc.lng}#map=17/${loc.lat}/${loc.lng}` : null;
}
function showToast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._tm);
  t._tm = setTimeout(() => t.classList.remove("show"), 2600);
}

/* geolocation → promise (10s timeout, graceful failure) */
function getLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) { resolve(null); return; }
    navigator.geolocation.getCurrentPosition(
      (p) => resolve({ lat: p.coords.latitude, lng: p.coords.longitude, acc: p.coords.accuracy }),
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  });
}

/* step names → element ids */
const PANELS = { 1: "step1", 2: "step2", 3: "step3", 4: "done" };

function goTo(step) {
  document.querySelectorAll(".step-panel").forEach((el) => el.classList.remove("active"));
  $(PANELS[step]).classList.add("active");

  document.querySelectorAll("#stepper li").forEach((li) => {
    const n = +li.dataset.step;
    li.classList.toggle("active", n === Math.min(step, 3));
    li.classList.toggle("done", n < Math.min(step, 3) || step === 4);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------------- clock ---------------- */
setInterval(() => {
  $("clock").textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}, 1000);

/* ============ searchable employee picker ============ */
let selectedEmp = null;

/* neighbouring keys on the phone keyboard — one adjacent-key typo is forgiven
   when searching an ID, e.g. "ARF7370" still finds ARD7370 (D and F are side
   by side). Long names are NOT typo-matched, so real matches stay ranked first. */
const KEY_NEIGHBORS = {
  q: "wa", w: "qes", e: "wrd", r: "eft", t: "rgy", y: "thu", u: "yji", i: "uko",
  o: "ipl", p: "ol", a: "qsz", s: "awdx", d: "sefc", f: "drgv", g: "fthb",
  h: "gyjn", j: "hukm", k: "jil", l: "ko", z: "asx", x: "zsdc", c: "xdfv",
  v: "cfgb", b: "vghn", n: "bhjm", m: "njk",
};

/* true when query ≈ id with at most ONE adjacent-key substitution (same length) */
function idTypoMatch(id, f) {
  if (f.length < 4 || f.length !== id.length) return false;
  let typos = 0;
  for (let i = 0; i < f.length; i++) {
    const a = f[i], b = id[i];
    if (a === b) continue;
    if (typos || !(KEY_NEIGHBORS[a] || "").includes(b)) return false;
    typos = 1;
  }
  return true;
}

/* rank an employee against the filter — higher = better; 0 = no match */
function empMatchScore(e, f) {
  if (!f) return 1;
  const id = e.id.toLowerCase(), name = e.name.toLowerCase();
  if (id.startsWith(f)) return 100;
  if (idTypoMatch(id, f)) return 90;
  if (id.includes(f)) return 70;
  /* name: word-start match beats mid-word substring */
  if (name.split(/\s+/).some((w) => w.startsWith(f))) return 60;
  if (f.length >= 3 && name.includes(f)) return 40;
  return 0;
}

const EMP_LIST_MAX = 80;
function renderEmpList(filter = "") {
  const f = filter.trim().toLowerCase();
  let matches = [];
  if (!f) matches = EMPLOYEES.slice();
  else matches = EMPLOYEES
    .map((e) => ({ e, s: empMatchScore(e, f) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || a.e.id.localeCompare(b.e.id))
    .map((x) => x.e);
  let html = matches.slice(0, EMP_LIST_MAX).map((e) =>
    `<li data-id="${e.id}"><b>${e.id}</b><span>${e.name}</span></li>`).join("");
  if (matches.length > EMP_LIST_MAX)
    html += `<li class="none">… ${matches.length - EMP_LIST_MAX} more — keep typing to narrow down</li>`;
  $("empList").innerHTML = matches.length
    ? html
    : `<li class="none">No employee matches “${filter}” — IDs start with <b>ARD</b> (check for typos like F instead of D)</li>`;
}

function pickEmp(emp) {
  selectedEmp = emp;
  $("empSearch").value = `${emp.id} — ${emp.name}`;
  $("empPreview").innerHTML = `👤 <b>${emp.name}</b> · ${emp.id}`;
  $("empPreview").classList.remove("hidden");
  $("empPinWrap").classList.toggle("hidden", !emp.pin);
  $("empPin").value = "";
  $("empList").innerHTML = "";
}

const empSearch = $("empSearch");
empSearch.addEventListener("focus", () => {
  if (!selectedEmp) renderEmpList(empSearch.value);
});
empSearch.addEventListener("input", () => {
  selectedEmp = null;
  $("empPreview").classList.add("hidden");
  $("empPinWrap").classList.add("hidden");
  renderEmpList(empSearch.value);
});
empSearch.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const first = $("empList").querySelector("li[data-id]");
    if (first) { pickEmp(EMPLOYEES.find((x) => x.id === first.dataset.id)); }
  }
});
$("empList").addEventListener("click", (e) => {
  const li = e.target.closest("li[data-id]");
  if (li) pickEmp(EMPLOYEES.find((x) => x.id === li.dataset.id));
});

/* "Check my status" — shows only your own punch/leave state. Auto-appears
   right after identifying, so an employee ALWAYS sees where they stand. */
function renderMyStatus() {
  const box = $("myStatusBox");
  const emp = state.me ? EMPLOYEES.find((x) => x.id === state.me.empID) : null;
  if (!emp) { box.classList.add("hidden"); return; }
  box.classList.remove("hidden");
  /* leave status takes priority over punch status */
  const leaf = ((leavesCache || {})[emp.id] || {})[dayKeyISO()];
  if (leaf) {
    if (leaf.status === "rejected") {
      box.innerHTML = `❌ <b>${emp.id} · ${emp.name}</b> — leave REJECTED by admin: <b>you are ABSENT today</b>.`;
      box.className = "status-box bad";
      return;
    }
    if (leaf.status === "pending") {
      box.innerHTML = `🌿 <b>${emp.id} · ${emp.name}</b> — PL request <b>pending admin approval</b>. You'll see the decision here and as a notification.`;
      box.className = "status-box warn";
      return;
    }
    box.innerHTML = `🌿 <b>${emp.id} · ${emp.name}</b> — ON LEAVE today (${leaf.type}). No punch needed.`;
    box.className = "status-box good";
    return;
  }
  const rec = recordForToday(emp.id);
  if (!rec) {
    box.innerHTML = `🟡 <b>${emp.id} · ${emp.name}</b> — <b>not checked in</b> yet today.`;
    box.className = "status-box warn";
  } else if (!rec.checkOut) {
    box.innerHTML = `🟢 <b>${emp.id} · ${emp.name}</b> — still marked <b>AT WORK</b> since <b>${rec.checkIn}</b>. ⏱ ${workedDuration(rec).replace("Working for ", "").replace(" so far", "")} — don't forget to CHECK OUT before leaving!`;
    box.className = "status-box good";
  } else {
    box.innerHTML = `🏁 <b>${emp.id} · ${emp.name}</b> — done for today. In <b>${rec.checkIn}</b> · Out <b>${rec.checkOut}</b> · ⏱ ${workedDuration(rec)}`;
    box.className = "status-box";
  }
}
$("btnMyStatus").addEventListener("click", renderMyStatus);

/* "Apply for leave" — 2 auto-approved leaves per month; after that → PL for admin approval */
$("btnLeave").addEventListener("click", async () => {
  const box = $("myStatusBox");
  box.classList.remove("hidden");
  const typed = $("empSearch").value.trim().toLowerCase();
  const emp = EMPLOYEES.find((x) => x.id.toLowerCase() === typed || x.name.toLowerCase() === typed)
    || (state.me && EMPLOYEES.find((x) => x.id === state.me.empID));
  if (!emp) { box.textContent = "🔍 Type your ID or name above first — e.g. ARD5859 — then tap this again."; return; }
  box.textContent = "⏳ Sending your leave request…";
  const res = await requestLeave(emp.id, emp.name);
  const cls = res.leaf && res.leaf.status === "granted" ? "good" : res.ok ? "warn" : "bad";
  box.innerHTML = res.ok
    ? (res.leaf.status === "granted"
        ? `🌿 <b>${emp.id} · ${emp.name}</b> — leave APPROVED (CL). ${res.msg.replace(/🌿 Leave approved automatically — /, "")}`
        : `🌿 <b>${emp.id} · ${emp.name}</b> — PL request SENT to admin. Wait here or check back; you'll see the decision.`)
    : res.msg;
  box.className = "status-box " + cls;
  renderLeaveNotice();
});

/* =====================================================================
   iOS (iPhone/iPad): Apple only lets web-push reach apps that were
   added to the HOME SCREEN. Detect that and guide the employee —
   plus a manual "Turn on reminders" button, since iOS requires the
   permission ask to happen inside a real tap (the auto-ask is ignored).
   ===================================================================== */
function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}
function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;
}

/* show/hide the on/off button depending on who's identified & the permission state */
function refreshNotifButton() {
  const b = $("btnNotif");
  if (!b) return;
  const canAsk = "Notification" in window && "PushManager" in window &&
    typeof Notification !== "undefined" && Notification.permission !== "undefined";
  const show = !!state.me && canAsk && Notification.permission !== "granted";
  b.classList.toggle("hidden", !show);
  if (show) {
    b.textContent = (isIOS() && !isStandalone())
      ? "📲 iPhone: add to Home Screen"
      : "🔔 Turn on reminders";
  }
}

$("btnNotif").addEventListener("click", async () => {
  if (!state.me) return;
  if (isIOS() && !isStandalone()) {
    confirmBox(`📲 To get reminders on iPhone, install the app first:
1. Tap the SHARE button at the bottom of Safari (⬆ in a box)
2. Pick "Add to Home Screen" → Add
3. Open ARDOM Attendance FROM the new home-screen icon
4. Identify yourself → tap this button again → Allow

(Happens once — after that reminders reach you like a normal app.)`);
    return;
  }
  if (typeof Notification !== "undefined" && Notification.permission === "denied") {
    pushBlockedGuide();
    return;
  }
  const ok = await ensurePush();
  refreshNotifButton();
  /* if a finished selfie verdict is waiting on this device, unlock it now */
  if (ok && state.faceVerdict && state.faceVerdict.ok) {
    const g = await requirePushAccess();
    if (g.ok) unlockFromPush(g);
    else { $("btnPush2").classList.remove("hidden"); faceStatus(state.faceVerdict.msg + "  —  " + g.msg, "ok"); }
  }
});

/* shared behind both reminder buttons: ask → subscribe → report; true when reminders are ON */
async function ensurePush() {
  if (!state.me) return false;
  if (typeof Notification === "undefined" || Notification.permission === undefined) {
    showToast("⚠️ This browser can't show reminders — use Chrome (Android) or Safari on iPhone.");
    return false;
  }
  /* Android/Chrome permanently blocks the site after the prompt is dismissed
     twice — requestPermission() then returns "denied" instantly with NO popup.
     Handled by the caller (blocked-guide + escape valve), not an endless retry. */
  if (Notification.permission === "denied") return false;
  if (Notification.permission === "default") {
    const p = await Notification.requestPermission();
    if (p !== "granted") return false;
  }
  if (Notification.permission !== "granted") {
    showToast("🔕 Reminders stayed OFF — enable them when you can, reminders help you remember your punches.");
    return false;
  }
  const ok = await enablePushForMe();
  showToast(ok ? "🔔 Reminders are ON for this device." : "⚠️ Couldn't register reminders — try again from the Home-Screen app.");
  return ok;
}

/* how-to-unblock guide for Android phones where the site was silently banned */
function pushBlockedGuide() {
  confirmBox(`🚫 Notifications are BLOCKED for this site in your phone's browser:
1. Tap the 🔒 (or ⊙) icon at the LEFT of the address bar
2. Tap "Permissions" → "Notifications"
3. Choose "Allow" → come back and continue

(Until then you can still punch IN/OUT — reminders are just helpful warnings.)`);
}

/* =====================================================================
   MANDATORY SUBSCRIPTION GATE — same spirit as the enrollment gate:
   reminders/wake-ups must be ON before the punch flow continues.
   Escape valve: if the phone blocked notifications system-wide
   (permission = "denied") the punch is allowed with a warning, since
   only the phone's OS settings can lift that, not the website.
   ===================================================================== */
async function requirePushAccess() {
  try {
    if (typeof Notification === "undefined" || Notification.permission === undefined) return { ok: true };
    if (Notification.permission === "denied")
      return { ok: true, warn: "⚠ Reminders are BLOCKED in this phone's settings — re-enable them for ardompro.netlify.app when you can." };
    if (Notification.permission !== "granted")
      return { ok: false, msg: "🔔 One step left: tap “🔔 Turn on reminders” below → Allow — every employee must keep reminders ON." };
    /* permission granted → a saved subscription must exist for this employee */
    let bound = false;
    if (db) bound = await db.ref("pushSubs/" + state.empID).get().then((s) => !!s.val()).catch(() => false);
    else bound = !!localStorage.getItem("ardom_push_" + state.empID);
    if (bound) return { ok: true };
    const subbed = await enablePushForMe();
    if (subbed) return { ok: true };
    if (isIOS() && !isStandalone())
      return { ok: false, msg: "📲 iPhone: install first — Safari ➜ Share ➜ “Add to Home Screen”, open from the icon, identify yourself again, then tap “🔔 Turn on reminders”." };
    return { ok: false, msg: "🔔 Reminders couldn't register yet — tap “🔔 Turn on reminders” below and Allow." };
  } catch (e) { return { ok: true }; }
}

/* unlock the punch flow once reminders are confirmed ON for this employee */
function unlockFromPush(gate) {
  $("btnPush2").classList.add("hidden");
  const v = state.faceVerdict;
  if (v && v.ok) {
    $("btnNext2").classList.remove("hidden");
    faceStatus(v.msg + (gate && gate.warn ? "  —  " + gate.warn : ""), "ok");
  }
}

/* single place that applies the selfie verdict + the push gate, used by
   normal verification AND right after first-time self-enrollment */
async function applyVerdict(v) {
  $("btnSelfEnroll").classList.toggle("hidden", v.kind !== "unenrolled");
  if (v.ok) {
    const gate = await requirePushAccess();
    if (gate.ok) {
      $("btnNext2").classList.remove("hidden");
      $("btnPush2").classList.add("hidden");
      faceStatus(v.msg + (gate.warn ? "  —  " + gate.warn : ""), "ok");
      return;
    }
    $("btnNext2").classList.add("hidden");
    $("btnPush2").classList.remove("hidden");
    faceStatus(v.msg + "  —  " + gate.msg, "ok");
    return;
  }
  $("btnNext2").classList.add("hidden");
  $("btnPush2").classList.add("hidden");
  faceStatus(v.msg, "bad");
}

/* "🔔 Turn on reminders" on the selfie screen (mandatory gate path) */
$("btnPush2").addEventListener("click", async () => {
  if (!state.me) return;
  if (isIOS() && !isStandalone()) {
    confirmBox(`📲 To continue on iPhone, install the app first:
1. Tap the SHARE button at the bottom of Safari (⬆ in a box)
2. Pick "Add to Home Screen" → Add
3. Open ARDOM Attendance FROM the new home-screen icon
4. Identify yourself → tap this button again → Allow`);
    return;
  }
  const btn = $("btnPush2");
  /* Android/Chrome can permanently block the site (prompt dismissed twice) —
     requestPermission() then returns "denied" with NO popup. Escape valve:
     OS-blocked is beyond the app's control, so the punch continues with a
     warning — same rule requirePushAccess already applies. */
  if (typeof Notification !== "undefined" && Notification.permission === "denied") {
    pushBlockedGuide();
    if (state.faceVerdict && state.faceVerdict.ok) {
      unlockFromPush({ ok: true, warn: "⚠ Reminders are BLOCKED in this phone's settings — re-enable them for ardompro.netlify.app when you can." });
      refreshNotifButton();
    }
    return;
  }
  btn.disabled = true;
  const oldLabel = btn.textContent;
  btn.textContent = "⏳ Turning on reminders…";
  try {
    const ok = await ensurePush();
    refreshNotifButton();
    if (!ok) {
      /* second opinion — requirePushAccess may succeed (e.g. a subscription
         already exists) or produce the precise reason for the failure */
      const g = await requirePushAccess();
      if (g.ok) { unlockFromPush(g); return; }
      faceStatus("❌ " + g.msg, "bad");
      return;
    }
    const g = await requirePushAccess();
    if (g.ok) unlockFromPush(g);
    else faceStatus(g.msg, "bad");
  } finally {
    btn.disabled = false;
    btn.textContent = oldLabel;
  }
});

/* confirm-style helper for the iOS guide (falls back to alert when absent) */
function confirmBox(msg) {
  if (typeof confirm === "function") return Promise.resolve(confirm(msg));
  alert(msg);
  return Promise.resolve(true);
}

/* "Download my attendance" — ONLY the one employee's own history (time punches + leaves) */
$("btnMyCsv").addEventListener("click", async () => {
  const typed = $("empSearch").value.trim().toLowerCase();
  const emp = EMPLOYEES.find((x) => x.id.toLowerCase() === typed || x.name.toLowerCase() === typed)
    || (state.me && EMPLOYEES.find((x) => x.id === state.me.empID));
  if (!emp) { showToast("Type your ID or name first, then download"); return; }

  const rows = [];
  if (db) {
    try {
      await authReady();
      const hist = (await db.ref(`history/${emp.id}`).get()).val() || {};
      Object.entries(hist).forEach(([iso, d]) => {
        if (!d || d.voided) return; // converted-to-leave day shows as the leave row below
        rows.push({ iso, id: emp.id, name: d.name || emp.name, checkIn: d.checkIn, inLoc: d.inLoc, checkOut: d.checkOut, outLoc: d.outLoc, kind: "present" });
      });
    } catch (e) { console.warn(e); }
  }
  const leaves = await allLeaves();
  Object.entries(leaves[emp.id] || {}).forEach(([iso, v]) => {
    if (!v) return;
    rows.push({ iso, id: emp.id, name: emp.name, checkIn: null, inLoc: null, checkOut: null, outLoc: null,
      kind: v.status === "granted" ? `ON LEAVE (${v.type})` : v.status === "pending" ? `PL pending approval` : "LEAVE REJECTED — absent" });
  });
  rows.sort((a, b) => b.iso.localeCompare(a.iso));
  if (!rows.length) { showToast("No attendance saved yet"); return; }

  const csv = [["Date", "Day", "Employee ID", "Name", "Check In", "In Location", "Check Out", "Out Location", "Worked", "Remarks"]]
    .concat(rows.map((r) => {
      const dt = new Date(r.iso + "T00:00:00");
      const day = dt.toLocaleDateString([], { weekday: "short" });
      const loc = (v) => v ? `${(+v.lat).toFixed(5)},${(+v.lng).toFixed(5)}` : "";
      const worked = r.checkIn ? workedDuration(r).replace(/^Total worked: /, "") : "";
      return [r.iso, day, r.id, r.name, r.checkIn || (r.kind !== "present" ? "—" : ""), loc(r.inLoc), r.checkOut || "", loc(r.outLoc), worked, r.kind === "present" ? "Present" : r.kind];
    }))
    .map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = `my-attendance-${emp.id}.csv`;
  a.click();
  showToast("Your attendance downloaded");
});

/* ============ STEP 1 — EMPLOYEE ============ */
$("nameForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let emp = selectedEmp;

  /* allow pasting just the ID directly */
  if (!emp) {
    const typed = $("empSearch").value.trim().toLowerCase();
    emp = EMPLOYEES.find((x) => x.id.toLowerCase() === typed || x.name.toLowerCase() === typed);
    if (!emp) { showToast("Pick yourself from the list first"); return; }
  }

  /* PIN gate — the "knows it's me" layer */
  if (emp.pin && $("empPin").value !== emp.pin) {
    showToast("🔒 Wrong PIN — try again");
    $("empPin").value = "";
    $("empPin").focus();
    return;
  }

  state.empID = emp.id;
  state.name = emp.name;
  state.selfie = null;
  rememberMe(emp); // "My attendance" card survives refreshes this session
  askNotificationPermission(); // one-time: allow browser reminders even in background

  $("selfieFor").textContent =
    `Smile for the camera, ${emp.name} (${emp.id}) — your photo is attached to this record.`;
  resetCamera();
  goTo(2);
  startCamera(); // auto-open the camera instead of making them tap "Start"
});

/* ============ STEP 2 — SELFIE ============ */
const video = $("video");

function resetCamera() {
  stopStream();
  state.faceVerdict = null;
  state.lastDescriptor = null;
  faceStatus("");
  $("camLive").classList.add("hidden");
  $("camShot").classList.add("hidden");
  $("camPlaceholder").classList.remove("hidden");
  $("camMsg").textContent = "Camera will appear here";
  $("btnCapture").disabled = true;
  $("btnCapture").classList.remove("hidden");
  $("btnRetake").classList.add("hidden");
  $("btnNext2").classList.add("hidden");
  $("btnSelfEnroll").classList.add("hidden");
  $("startCam").classList.remove("hidden"); // BUGFIX: was left hidden after the first selfie — second visit had no way to start the camera
}

function stopStream() {
  if (state.stream) {
    state.stream.getTracks().forEach((t) => t.stop());
    state.stream = null;
    try { video.srcObject = null; } catch (e) {} // helps the phone release the camera fully
  }
}

/* token guard: a slow second Start-camera press can't leave a zombie stream racing the new one */
let camStartToken = 0;

$("startCam").addEventListener("click", startCamera);

async function startCamera() {
  const token = ++camStartToken;
  stopStream();
  $("camMsg").textContent = "⏳ Starting camera…";
  const want = { video: { facingMode: "user", width: { ideal: 720 }, height: { ideal: 960 } }, audio: false };
  try {
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia(want);
    } catch (firstErr) {
      // the camera may still be releasing from the previous session — brief wait, then a plain retry
      await new Promise((r) => setTimeout(r, 500));
      if (token !== camStartToken) return;
      stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    }
    if (token !== camStartToken) { stream.getTracks().forEach((t) => t.stop()); return; }
    state.stream = stream;
    video.srcObject = stream;
    $("camPlaceholder").classList.add("hidden");
    $("camLive").classList.remove("hidden");
    $("btnCapture").disabled = false;
  } catch (err) {
    $("camMsg").textContent =
      "Camera unavailable — upload a photo below instead, or tap “📷 Start camera” to retry.";
  }
}

/* capture frame from video */
$("btnCapture").addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth || 720;
  canvas.height = video.videoHeight || 960;
  const ctx = canvas.getContext("2d");
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1); // undo mirroring for the saved photo
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  showShot(canvas.toDataURL("image/jpeg", 0.85));
});

/* uploaded photo fallback */
$("filePick").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => showShot(ev.target.result);
  reader.readAsDataURL(file);
});

function showShot(dataURL) {
  compressImage(dataURL).then(async (small) => {
    stopStream();
    state.selfie = small;
    state.faceVerdict = { ok: false, kind: "pending", msg: "Verifying…" };

    $("camLive").classList.add("hidden");
    $("camPlaceholder").classList.add("hidden");
    $("camShot").classList.remove("hidden");
    $("snapshot").src = dataURL;

    $("btnCapture").classList.add("hidden");
    $("startCam").classList.add("hidden");
    $("btnRetake").classList.remove("hidden");
    $("btnNext2").classList.add("hidden");
    $("btnSelfEnroll").classList.add("hidden");
    $("btnPush2").classList.add("hidden");

    faceStatus("⏳ Checking face against enrolled photo…", "busy");
    const v = await verifySelfie(dataURL);
    state.faceVerdict = v;
    await applyVerdict(v);
  });
}

/* self-enrollment — the employee locks their own identity at first punch */
$("btnSelfEnroll").addEventListener("click", async () => {
  if (!state.selfie || !state.lastDescriptor) return;
  const btn = $("btnSelfEnroll");
  btn.disabled = true;
  btn.textContent = "⏳ Saving your face…";

  /* duplicate-face gate — their face must not exist under another ID */
  const owner = await findFaceOwner(state.lastDescriptor, state.empID);
  if (owner) {
    faceStatus(`❌ This face is already enrolled under ${owner.id} (${owner.name}). One face = one employee.`, "bad");
    btn.disabled = false;
    btn.textContent = "💾 Enroll my face";
    return;
  }

  /* hijack gate — if this ID is already enrolled, only its owner may refresh it */
  const existing = await getEnrollment(state.empID);
  if (existing) {
    const dist = euclidean(state.lastDescriptor, existing.descriptor);
    if (dist > FACE_MATCH_MAX) {
      faceStatus("❌ This ID is already enrolled with a different face — ask your admin.", "bad");
      flagMismatchUnknown();
      btn.disabled = false;
      btn.textContent = "💾 Enroll my face";
      return;
    }
  }

  const rec = {
    photo: state.selfie,
    descriptor: state.lastDescriptor,
    enrolledAt: new Date().toISOString(),
    by: "self",
  };
  try {
    if (db) await db.ref("faces/" + state.empID).set(rec);
    else {
      const store = JSON.parse(localStorage.getItem("ardom_faces") || "{}");
      store[state.empID] = rec;
      localStorage.setItem("ardom_faces", JSON.stringify(store));
    }
    facesCache = null; facesCacheAt = 0;
    showToast("✅ Face enrolled — welcome aboard!");
    const v2 = await verifySelfie(state.selfie);
    state.faceVerdict = v2;
    await applyVerdict(v2);
  } catch (e) {
    faceStatus("⚠ Save failed: " + (e.message || e), "bad");
  }
  btn.disabled = false;
  btn.textContent = "💾 Enroll my face";
});

/* audit entry when someone tries to lock an ID that belongs to a different face */
function flagMismatchUnknown() {
  const entry = { empID: state.empID, name: state.name, date: todayKey(), time: timeNow(), event: "hijack-attempt" };
  try {
    if (db) db.ref("flagged/" + dayKeyISO()).push(entry);
    else {
      const arr = JSON.parse(localStorage.getItem("ardom_flagged") || "[]");
      arr.push(entry);
      localStorage.setItem("ardom_flagged", JSON.stringify(arr));
    }
  } catch (e) { console.warn(e); }
}

$("btnRetake").addEventListener("click", () => {
  resetCamera();
  startCamera();
});

$("btnNext2").addEventListener("click", () => {
  renderStep3();
  goTo(3);
});

$("btnBack1").addEventListener("click", () => {
  resetCamera();
  goTo(1);
});

/* ============ STEP 3 — CHECK IN / OUT ============ */
async function renderStep3() {
  $("confirmFor").textContent =
    `${state.name} (${state.empID}) · ${new Date().toLocaleDateString([], { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`;

  if (!leavesCache) await allLeaves(); // fresh leaf info before gating the buttons

  const rec = activeRecordFor(state.empID);
  const leafToday = leavesCache && (leavesCache[state.empID] || {})[dayKeyISO()];
  const box = $("statusBox");
  const btnIn = $("btnCheckIn");
  const btnOut = $("btnCheckOut");

  btnOut.disabled = true;
  btnIn.disabled = true;
  $("inHint").textContent = "Start your shift";
  $("outHint").textContent = "End your shift";
  box.classList.remove("available");

  /* approved leave (and no punch yet) → check-in/out are turned off */
  if (!rec && leafToday && leafToday.status === "granted") {
    box.innerHTML = `<span>🌿</span><span><b>${state.name}</b> is <b>ON LEAVE today</b> (${leafToday.type}). Check-in is disabled. If you actually came to work, tap the <b>“🌅 I came to work today”</b> button on the home screen — once the admin approves it, this screen unlocks.`;
    btnIn.disabled = true;
    $("inHint").textContent = "🌿 On leave — check-in disabled";
    $("outHint").textContent = "🌿 On leave";
    return;
  }
  /* pending PL → temptation guard: they can punch, but we tell them the decision matters */
  if (!rec) {
    // fresh: check in allowed — with a note when a PL decision is still pending
    box.classList.add("available");
    const plPending = leafToday && leafToday.status === "pending";
    box.innerHTML = plPending
      ? `<span>🌿</span><span><b>${state.name}</b>'s PL request is <b>pending admin approval</b>. If you are physically present, check in normally — that settles the request.</span>`
      : `<span>🟡</span><span><b>${state.name}</b> (${state.empID}) hasn't checked in yet today. Choose an action below.</span>`;
    btnIn.disabled = false;
  } else if (!rec.checkOut) {
    // locked: only checkout possible
    box.innerHTML = `<span>🟢</span><span><b>${state.name}</b> is checked in since <b>${rec.checkIn}</b> at <b>${fmtLoc(rec.inLoc)}</b>. You can only check out now.</span>`;
    btnIn.disabled = true;
    $("inHint").textContent = "🔒 Already checked in today";
    btnOut.disabled = false;
    $("outHint").textContent = "Currently: checked in";
  } else {
    // fully done for the day
    box.innerHTML = `<span>🏁</span><span><b>${state.name}</b> completed today: in <b>${rec.checkIn}</b> · out <b>${rec.checkOut}</b>. Attendance is locked until tomorrow.</span>`;
    $("inHint").textContent = "🔒 Completed today";
    $("outHint").textContent = "🔒 Completed today";
  }

  /* location is mandatory — acquire it ahead of the punch so nobody waits */
  prefillLocation();
}

/* location cache so the punch doesn't wait on GPS */
let locCache = null;

async function prefillLocation() {
  const el = $("locStatus");
  if (el) el.textContent = "⏳ Getting your location… (allow location access if prompted)";
  locCache = null;
  const loc = await getLocation();
  if (el) {
    if (loc) {
      locCache = { loc, at: Date.now() };
      el.innerHTML = `✅ Location ready — <b>${fmtLoc(loc)}</b>. You can punch now.`;
      el.classList.add("ok");
      el.classList.remove("bad");
    } else {
      el.innerHTML = `❌ No location. <b>Location is mandatory</b>: tap the 🔒/ⓘ icon in the address bar → Location → <b>Allow</b>, make sure device GPS/Location services are on, then retry your punch.`;
      el.classList.add("bad");
      el.classList.remove("ok");
    }
  }
}

async function punch(type) {
  // hard guard: a checked-in employee can only check out, never again check in
  const existing = activeRecordFor(state.empID);
  if (type === "in" && existing) {
    showToast("🔒 Already checked in today — you can only check out");
    renderStep3();
    return;
  }
  if (type === "out" && (!existing || existing.checkOut)) {
    showToast("🔒 Nothing to check out — already done for today");
    renderStep3();
    return;
  }
  /* approved leave today → punching contradicts the leave; admin must cancel it first */
  const leafToday = leavesCache && (leavesCache[state.empID] || {})[dayKeyISO()];
  if (type === "in" && leafToday && leafToday.status === "granted") {
    showToast("🌿 You are ON approved leave today — check-in is not possible. Ask admin to cancel the leave.");
    renderStep3();
    return;
  }

  const btn = type === "in" ? $("btnCheckIn") : $("btnCheckOut");
  btn.disabled = true;
  const tSpan = btn.querySelector(".t");
  const lbl = tSpan ? tSpan.textContent : "";
  if (tSpan) tSpan.textContent = type === "in" ? "Checking in…" : "Checking out…";

  /* mandatory location: reuse the fresh step-3 fix or grab a new one; block if absent */
  const nowMs = Date.now();
  let loc = locCache && nowMs - locCache.at < 90000 ? locCache.loc : await getLocation();
  if (tSpan) tSpan.textContent = lbl;
  btn.disabled = false;
  if (!loc) {
    showToast("📍 Location is required — allow location access and try again");
    await prefillLocation();
    return;
  }

  const time = timeNow();
  const rec = activeRecordFor(state.empID);

  if (type === "in") {
    writeIn({
      date: todayKey(),
      empID: state.empID,
      name: state.name,
      selfie: state.selfie,
      checkIn: time,
      inLoc: loc,
      checkOut: null,
      outLoc: null,
      verify: state.faceVerdict ? { kind: state.faceVerdict.kind, ok: state.faceVerdict.ok, score: state.faceVerdict.score || null } : null,
    });
    finish("✅", "Checked in!", `You're on the clock, ${state.name}.`, { checkIn: time, checkOut: null, inLoc: loc, outLoc: null });
  } else {
    writeOut(rec, time, loc, state.faceVerdict);
    finish("🏁", "Checked out!", "Great work today. See you tomorrow!", { checkIn: rec.checkIn, checkOut: time, inLoc: rec.inLoc, outLoc: loc });
  }
  showToast(loc ? "📍 Location captured" : "⚠ Location not available");
}

function finish(icon, title, msg, t) {
  stopStream();
  $("doneIcon").textContent = icon;
  $("doneTitle").textContent = title;
  $("doneMsg").textContent = msg;
  $("doneSummary").innerHTML = `
    <div>🆔 <b>${state.empID}</b> — ${state.name}</div>
    <div>📅 ${new Date().toLocaleDateString()}</div>
    <div>🟢 Check-in: <b>${t.checkIn ?? "—"}</b></div>
    <div class="loc">📍 ${t.inLoc ? `at <a href="${mapLink(t.inLoc)}" target="_blank" rel="noopener">${fmtLoc(t.inLoc)}</a>` : "location unavailable"}</div>
    <div>🏁 Check-out: <b>${t.checkOut ?? "—"}</b></div>
    <div class="loc">📍 ${t.outLoc ? `at <a href="${mapLink(t.outLoc)}" target="_blank" rel="noopener">${fmtLoc(t.outLoc)}</a>` : "location unavailable"}</div>`;
  renderRecords();
  goTo(4);
}

$("btnCheckIn").addEventListener("click", () => punch("in"));
$("btnCheckOut").addEventListener("click", () => punch("out"));

$("btnBack2").addEventListener("click", () => {
  resetCamera();
  goTo(2);
  startCamera();
});

$("btnDone").addEventListener("click", () => {
  empSearch.value = "";
  selectedEmp = null;
  $("empPreview").classList.add("hidden");
  $("empPinWrap").classList.add("hidden");
  state.empID = "";
  state.name = "";
  resetCamera();
  goTo(1);
});

/* ============ RECORDS ============ */
/* hours between check-in and check-out ("7 h 45 m" / "still working, 3 h 10 m so far") */
function workedDuration(r) {
  const parse = (t) => {
    if (!t) return null;
    const m = String(t).match(/(\d{1,2}):(\d{2}):?(\d{2})?\s*(AM|PM)?/i);
    if (!m) return null;
    const raw = parseInt(m[1], 10);
    const suffix = (m[4] || "").toUpperCase();
    let h;
    if (!suffix) h = raw >= 13 ? raw % 24 : raw % 12; // legacy 24-hour rows ("18:28") if hour ≥ 13, else plain 12-hour clock
    else { h = raw % 12; if (suffix === "PM") h += 12; }
    return h * 60 + parseInt(m[2], 10) + (parseInt(m[3] || "0", 10) / 60);
  };
  const inMin = parse(r.checkIn);
  const outMin = r.checkOut ? parse(r.checkOut) : null;
  if (inMin == null) return "—";
  const end = outMin != null ? outMin : (new Date().getHours() * 60 + new Date().getMinutes());
  let mins = end - inMin;
  if (mins < 0) mins += 24 * 60; // crossed midnight
  if (outMin == null && mins > 23 * 60 + 30) mins = 0; // a few seconds of clock skew is not an overnight shift
  mins = Math.round(mins);
  const h = Math.floor(mins / 60), m = mins % 60;
  return outMin != null ? `Total worked: ${h} h ${m} m` : `Working for ${h} h ${m} m so far`;
}

/* one attendance card (times + location + face badge) */
function recordCard(r, adminView) {
  const worked = workedDuration(r);
  const badge = r.checkOut ? `<span class="badge out">✔ DONE</span>` : `<span class="badge in">● AT WORK</span>`;
  const locTxt = r.outLoc ? fmtLoc(r.outLoc) : r.inLoc ? fmtLoc(r.inLoc) : null;
  const locHtml = locTxt
    ? `<div class="t">📍 <a href="${mapLink(r.outLoc || r.inLoc)}" target="_blank" rel="noopener">${locTxt}</a></div>`
    : "";
  const voidBtn = adminView
    ? `<div class="row"><button class="btn tiny ghost" data-editpunch="${r.empID}">✏️ Edit times</button><button class="btn tiny ghost" data-voidle="${r.empID}">🌿 Convert today's punch to LEAVE</button></div>`
    : "";
  return `<div class="record">
    <img src="${r.selfie || ""}" alt="selfie of ${r.name}" />
    <div class="info"><div class="name">${r.empID} · ${r.name}</div>
    <div class="t">🟢 Check-in: <b>${r.checkIn ?? "—"}</b></div>
    <div class="t">🏁 Check-out: <b>${r.checkOut ?? "still on the clock…"}</b></div>
    <div class="t">⏱ ${worked}</div>${locHtml}${voidBtn}</div>
    <div class="col-badge">${r.verify && r.verify.kind === "ok" ? '<span class="verified">👤 ✓</span>' : r.verify && r.verify.kind === "unenrolled" ? '<span class="verified" style="color:#b45309">👤 ⏳</span>' : ""}${badge}${adminView && r.editedBy ? `<span class="badge edited" title="Times edited by admin · ${r.editedAt || ""}">✏️ edited</span>` : ""}</div>
  </div>`;
}

/* privacy: employees see ONLY their own card ("My attendance"), admins see the full day.
   Nothing to show → the whole section is hidden (no empty-state noise). */
function renderRecords() {
  const section = $("recordsSection");
  const title = $("recordsTitle");
  $("btnSwitchMe").classList.toggle("hidden", !state.me || isAdmin);
  $("btnClear").classList.toggle("hidden", !isAdmin);

  if (!isAdmin) {
    const myRec = state.me ? todayRecords().find((r) => r.empID === state.me.empID) : null;
    if (!myRec || isVoided(myRec)) { section.classList.add("hidden"); return; }
    section.classList.remove("hidden");
    title.textContent = "My attendance";
    $("records").innerHTML = recordCard(myRec);
    return;
  }

  /* admin sees today's full list — but ONLY while the Today tab is open */
  section.classList.toggle("hidden", adminTab !== "today");
  if (adminTab !== "today") return;
  title.textContent = "Today's records (admin view)";
  const list = todayRecords().filter((r) => !isVoided(r))
    .slice().sort((a, b) => (b.checkOut ? 0 : 1) - (a.checkOut ? 0 : 1));
  $("records").innerHTML = list.length
    ? list.map((r) => recordCard(r, true)).join("")
    : `<div class="empty">No attendance records yet today.</div>`;
  if (isAdmin) renderDash();   // keep dashboard live alongside records
}

/* ===========================================================
   ADMIN: convert TODAY'S present punch into an approved leave
   (employee stays in the duty roster as ON LEAVE; the punch is voided)
   =========================================================== */
async function voidPresentAsLeave(empID) {
  if (!isAdmin) { showToast("🔒 Admin login required"); return; }
  const rec = activeRecordFor(empID);
  if (!rec) { showToast("⚠ Nothing to convert — no active punch today"); return; }
  const ok = confirm(`Convert ${rec.name}'s ${todayKey()} punch to LEAVE?\n\nThe check-in${rec.checkOut ? " and check-out" : ""} disappear from today's sheet and the employee is marked ON LEAVE (audit trail kept in the database).`);
  if (!ok) return;
  const isCL = confirm("Which type?\n\nOK = CL (usual casual leave)   \nCancel = PL (prior approval leave)");
  const type = isCL ? "CL" : "PL";
  try {
    if (db) {
      await db.ref(`leaves/${empID}/${dayKeyISO()}`).set({
        type, status: "granted", by: "admin", name: rec.name,
        note: "present punch converted to leave",
        decidedBy: "admin", decidedAt: new Date().toISOString(),
      });
      await db.ref(`${dayPath()}/${empID}`).update({ voided: true, voidReason: "leave" });
      await db.ref(`history/${empID}/${dayKeyISO()}`).update({ voided: true, checkOut: null, outLoc: null });
    } else {
      const pencs = JSON.parse(localStorage.getItem("ardom_leaves") || "{}");
      pencs[empID] = pencs[empID] || {};
      pencs[empID][dayKeyISO()] = { type, status: "granted", by: "admin", name: rec.name };
      localStorage.setItem("ardom_leaves", JSON.stringify(pencs));
      const mine = state.records.find((r) => r.empID === empID);
      if (mine) mine.voided = true;
      saveRecords();
    }
    leavesCache = null; leavesCacheAt = 0;
    await allLeaves(true);
    showToast(`🌿 ${rec.name} is now ON LEAVE (${type}) — punch removed from today's sheet`);
    renderRecords();
    renderLeaveNotice();
    renderLeaveAdmin();
    renderDash();
    if (adminTab === "profile" && profileEmpID === empID) renderProfile(); // open profile reflects the change instantly
  } catch (e) {
    showToast("⚠ Conversion failed: " + (e.message || e));
  }
}
$("records").addEventListener("click", (e) => {
  const hit = e.target.closest("[data-voidle]");
  if (hit) voidPresentAsLeave(hit.dataset.voidle);
  const ed = e.target.closest("[data-editpunch]");
  if (ed) openPunchEdit(ed.dataset.editpunch);
});

/* ================================================================
   ADMIN: EDIT any employee's check-in / check-out (any date)
   - prefill from a record card (today) or open blank from the tools row
   - saves attendance + history, writes editedBy/editedAt audit fields
   - requires the elevated (bot) session when changing an existing
     check-in; check-out edits work for any signed-in session
   ================================================================ */

/* normalize admin-typed time ("9:30", "0930", "18:28", "6:28 pm") into the
   app's stored format "09:30:00 AM" (same shape timeNow() produces) */
function normClock(input) {
  const t = String(input || "").trim().toLowerCase();
  if (!t) return null;
  const m = t.match(/^(\d{1,2})(?::?(\d{2}))?(?::(\d{2}))?\s*(am|pm)?$/);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2] || "0", 10);
  const sec = parseInt(m[3] || "0", 10);
  let suffix = (m[4] || "").toUpperCase();
  if (min > 59 || sec > 59) return null;
  if (!suffix) {
    if (h === 0) { h = 12; suffix = "AM"; }        // 0:30 → 12:30 AM
    else if (h >= 13) suffix = "PM";               // 18:28 → 06:28 PM
    else suffix = h === 12 ? "PM" : "AM";
  }
  if (suffix === "PM" && h < 12) h += 12;
  if (suffix === "AM" && h === 12) h = 0;
  const hh = ((h + 11) % 12) + 1;                  // back to 12-hour display
  const p = (n) => String(n).padStart(2, "0");
  return `${p(hh)}:${p(min)}:${p(sec)} ${suffix}`;
}

function openPunchEdit(empID, dateISO) {
  if (!isAdmin) { showToast("🔒 Admin login required"); return; }
  const sel = $("peEmp");
  sel.innerHTML = EMPLOYEES.map((e) => `<option value="${e.id}">${e.id} — ${e.name}</option>`).join("");
  $("peDate").value = dateISO || dayKeyISO();
  $("peIn").value = "";
  $("peOut").value = "";
  $("peMsg").classList.add("hidden");
  sel.value = empID && EMPLOYEES.some((e) => e.id === empID) ? empID : sel.options[0].value;
  $("punchEditModal").classList.remove("hidden");
  /* prefill today's times when editing from a record card */
  if (empID && (dateISO || dayKeyISO()) === dayKeyISO()) {
    const rec = recordForToday(empID);
    if (rec) { $("peIn").value = rec.checkIn || ""; $("peOut").value = rec.checkOut || ""; }
  }
  $("peIn").focus();
}
$("peCancel").addEventListener("click", () => $("punchEditModal").classList.add("hidden"));
$("punchEditModal").addEventListener("click", (e) => {
  if (e.target === $("punchEditModal")) $("punchEditModal").classList.add("hidden");
});

$("punchEditForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const empID = $("peEmp").value;
  const emp = empOf(empID);
  const dateISO = $("peDate").value;
  if (!dateISO) { peErr("Pick a date"); return; }
  const newIn = normClock($("peIn").value);
  const newOut = normClock($("peOut").value);
  if ($("peIn").value.trim() && !newIn) { peErr(`Can't read the check-in time "${$("peIn").value}" — try 9:30 or 9:30 AM`); return; }
  if ($("peOut").value.trim() && !newOut) { peErr(`Can't read the check-out time "${$("peOut").value}" — try 6:28 or 6:28 PM`); return; }
  const isToday = dateISO === dayKeyISO();
  const path = isToday ? dayPath() : `attendance/${dateISO}`;
  try {
    await authReady();
    /* load the existing row (today: live cache first; past days: read node) */
    let rec = isToday ? recordForToday(empID) : null;
    if (!rec && db) rec = (await db.ref(`${path}/${empID}`).get()).val() || null;
    if (isVoided(rec) && !confirm("This punch was converted to a LEAVE. Saving will restore it as a present punch (the leave entry stays). Continue?")) return;

    const wasIn = rec ? rec.checkIn : null;
    const finalIn = newIn || (rec ? rec.checkIn : null);
    if (!finalIn) { peErr("Check-in is required — a punch can't exist without one"); return; }
    if (rec && finalIn !== wasIn && !authElevated) {
      const ok = await elevateAdmin(sessionStorage.getItem("ardom_adminpw") || "");
      if (!ok) { peErr("Changing a CHECK-IN needs the elevated admin session — log out and back in with the admin password."); return; }
    }
    const stamp = new Date().toISOString();
    if (db) {
      if (rec) {
        await db.ref(`${path}/${empID}`).update({
          checkIn: finalIn, checkOut: newOut || null,
          editedBy: "admin", editedAt: stamp,
        });
      } else {
        await db.ref(`${path}/${empID}`).set({
          date: new Date(dateISO + "T00:00:00").toDateString(), empID, name: emp ? emp.name : empID,
          checkIn: finalIn, inLoc: null, checkOut: newOut || null, outLoc: null,
          selfie: "", verify: null,
          editedBy: "admin", editedAt: stamp, manual: true,
        });
      }
      /* history mirror keeps the employee's own CSV truthful */
      const hist = (await db.ref(`history/${empID}/${dateISO}`).get()).val() || {};
      await db.ref(`history/${empID}/${dateISO}`).set({
        ...hist, empID, name: (hist && hist.name) || (emp ? emp.name : empID),
        checkIn: finalIn, checkOut: newOut || null,
        editedBy: "admin", editedAt: stamp,
      });
    } else {
      /* local mode */
      let local = state.records.find((r) => r.empID === empID && r.date === dateISO);
      if (!local) {
        local = { date: new Date(dateISO + "T00:00:00").toDateString(), empID, name: emp ? emp.name : empID, checkIn: finalIn, checkOut: null, selfie: "" };
        local.dateKeyISO = dateISO;
        state.records.push(local);
      }
      local.checkIn = finalIn; local.checkOut = newOut || null;
      local.editedBy = "admin"; local.editedAt = stamp;
      saveRecords();
    }
    leavesCache = null; leavesCacheAt = 0;
    $("punchEditModal").classList.add("hidden");
    showToast(`✏️ Punch saved — ${emp ? emp.name : empID} · ${dateISO} · ${finalIn}${newOut ? " → " + newOut : " (on the clock)"}`);
    renderRecords();
  } catch (err) {
    peErr("Save failed: " + (err.message || err) + (/permission.?denied/i.test(String(err.message || err)) ? " — publish the updated firebase.rules.json in the Firebase console first" : ""));
  }
});
function peErr(msg) {
  const el = $("peMsg");
  el.textContent = "⚠ " + msg;
  el.classList.remove("hidden");
}

/* remember who is using this device for THIS browsing session (survives refresh) */
function rememberMe(emp) {
  state.me = { empID: emp.id, name: emp.name };
  sessionStorage.setItem("ardom_me", JSON.stringify(state.me));
  renderMyStatus(); // the employee immediately sees where they stand
  renderPunchReminders(); // reminders follow the person instantly
  enablePushForMe().catch(() => {}); // wake-up reminders bind to this device
  refreshNotifButton(); // show the manual on-switch when needed (Android deny / iPhone guide)
}

/* ======================================================================
   MISSED-PUNCH REMINDERS
   • open app mid-day with no check-in → "you haven't checked in"
   • checked in too long / evening still not out → "don't forget to check out"
   • forgotten check-outs of the last 3 days → caught on the next visit
  送达 notification when allowed, banner + toast otherwise
   ====================================================================== */
const REMIND_TOAST_COOLDOWN = 15 * 60 * 1000; // don't nag more than 4×/hour
let lastRemindToasts = [];

function notifyPunch(msg) {
  const now = Date.now();
  const same = lastRemindToasts.includes(msg) && now - (window.__lastRemindAt || 0) < REMIND_TOAST_COOLDOWN;
  if (same) return;
  lastRemindToasts = [msg];
  window.__lastRemindAt = now;
  try {
    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      new Notification("ARDOM Attendance", { body: msg });
      showToast(msg);
    } else showToast(msg);
  } catch (e) { showToast(msg); }
}

/* ask for notification permission ONCE when someone identifies themselves */
function askNotificationPermission() {
  try {
    if (typeof Notification === "undefined" || Notification.permission !== "default") return;
    if (localStorage.getItem("ardom_notifAsked")) return;
    localStorage.setItem("ardom_notifAsked", "1");
    Notification.requestPermission().then((p) => { if (p === "granted") enablePushForMe(); }).catch(() => {});
  } catch (e) {}
}

/* ======================================================================
   WEB PUSH — device "wake-up" reminders even when the app is closed.
   Subscriptions are stored in pushSubs/<empID>; the scheduled backend
   (see push-backend/) sends the actual reminders each workday.
   ====================================================================== */
const PUSH_VAPID_PUBLIC = "BLyyGWTJrft2fzyCj9cTRxX2I7p-c10lxGjtxLmbII2JWAb_HnhrcMSVRd44NXhilUoBHN0m_L2xSbt9YTb3zaI";

function urlB64ToU8(b64url) {
  const pad = (s) => s + "===".slice((s.length + 3) % 4);
  const bin = atob(pad(b64url).replace(/-/g, "+").replace(/_/g, "/"));
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
}

async function enablePushForMe() {
  if (!state.me || !("serviceWorker" in navigator) || !("PushManager" in window)) return false;
  try {
    if (!("Notification" in window) || Notification.permission !== "granted") return false;
    const reg = await navigator.serviceWorker.register("./sw.js");
    const sub = await reg.pushManager.getSubscription() ||
      await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlB64ToU8(PUSH_VAPID_PUBLIC) });
    const json = sub.toJSON();
    const rec = {
      name: state.me.name,
      endpoint: sub.endpoint,
      token: sub.endpoint.includes("/send/") ? sub.endpoint.split("/send/")[1] : "",
      keys: { p256dh: json.keys && json.keys.p256dh, auth: json.keys && json.keys.auth },
      at: new Date().toISOString(),
    };
    if (db) await db.ref("pushSubs/" + state.me.empID).set(rec);
    else localStorage.setItem("ardom_push_" + state.me.empID, JSON.stringify(rec));
    return true;
  } catch (e) { console.warn("push enable:", e); return false; }
}

async function missedOutsFor(empID, daysBack = 3) {
  if (!db) return []; // local mode: no history mirror kept
  const hist = await db.ref(`history/${empID}`).get().then((s) => s.val() || {}).catch(() => {});
  const out = [];
  for (let i = 1; i <= daysBack; i++) {
    const d = new Date(Date.now() - i * 86400000);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const rec = hist[iso];
    if (rec && rec.voided) continue; // admin-converted leave day — not a missed punch
    if (rec && rec.checkIn && !rec.checkOut) out.push(iso);
  }
  return out;
}

/* "Tue 12 Nov" style day label for reminder texts — every line names the day
   it refers to so a message read the NEXT MORNING can't be mistaken for today */
function humanDay(offsetDays = 0) {
  const d = new Date(Date.now() + offsetDays * 86400000);
  return d.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" });
}

async function renderPunchReminders() {
  const box = $("punchReminder");
  if (!box || !state.me) return;
  const empID = state.me.empID;
  const lines = [];
  const nowD = new Date();
  const hour = nowD.getHours();
  const isoToday = dayKeyISO();

  /* don't nag someone on approved or pending leave */
  const leafToday = ((leavesCache || {})[empID] || {})[isoToday];
  const isOnLeave = leafToday && leafToday.status !== "rejected";

  const rec0 = activeRecordFor(empID);
  const rec = isVoided(recordForToday(empID)) ? null : rec0;
  if (!rec && !isOnLeave && hour >= 10) {
    lines.push(`🟡 <b>You haven't checked IN yet TODAY (${humanDay(0)}).</b> Open the app and punch your check-in.`);
  }
  if (rec && !rec.checkOut) {
    const inMin = parseTimeHM(rec.checkIn);
    const workedMin = inMin != null ? (nowD.getHours() * 60 + nowD.getMinutes()) - inMin : null;
    const evening = hour >= 18;
    const longShift = workedMin != null && workedMin >= 8 * 60;
    if (evening || longShift) {
      lines.push(`⚠ <b>Don't forget to CHECK OUT — today (${humanDay(0)})!</b> You checked in at ${rec.checkIn} and are still marked at work${evening ? " (it's evening)" : ""}. Check out before leaving.`);
    }
  }

  /* forgotten check-outs of past days — shown once each per session */
  const missed = await missedOutsFor(empID, 3);
  missed.forEach((iso) => {
    const seenKey = "mouted_" + iso;
    const store = db ? sessionStorage : localStorage;
    if (store.getItem(seenKey)) return;
    const d = new Date(iso + "T00:00:00");
    const daysAgo = Math.round((Date.now() - d.getTime()) / 86400000);
    const agoTxt = daysAgo === 1 ? " — that was YESTERDAY's duty" : ` (${daysAgo} days ago)`;
    lines.push(`⚠ You forgot to CHECK OUT on <b>${humanDay((Date.now() - d.getTime()) / 86400000)}</b>${agoTxt}. Ask the admin — it stays in the records.`);
    store.setItem(seenKey, "1");
  });

  box.className = "leave-note " + (lines.length ? "warn" : "hidden");
  if (lines.length) {
    box.innerHTML = lines.join("<br>");
    lines.forEach((l) => notifyPunch(l.replace(/<[^>]*>/g, "").trim()));
  } else box.classList.add("hidden");
}

/* tiny time parser (minutes since midnight) shared by the reminder math */
function parseTimeHM(t) {
  if (!t) return null;
  const m = String(t).match(/(\d{1,2}):(\d{2}):?(\d{2})?\s*(AM|PM)?/i);
  if (!m) return null;
  const raw = parseInt(m[1], 10);
  const suffix = (m[4] || "").toUpperCase();
  let h;
  if (!suffix) h = raw >= 13 ? raw % 24 : raw % 12; // legacy 24-hour rows ("18:28") if hour ≥ 13, else plain 12-hour clock
  else { h = raw % 12; if (suffix === "PM") h += 12; }
  return h * 60 + parseInt(m[2], 10);
}

/* "Not you? Switch" — forget the remembered person (also cleared when the tab closes) */
$("btnSwitchMe").addEventListener("click", () => {
  state.me = null;
  sessionStorage.removeItem("ardom_me");
  renderRecords();
  goTo(1);
  showToast("Switched — enter your own ID");
});

$("btnClear").addEventListener("click", () => {
  if (!isAdmin) { showToast("🔒 Admin login required to clear entries"); return; }
  if (!confirm("Delete ALL attendance records?")) return;
  clearToday();
  showToast("All records cleared");
});

/* -------- CSV CENTER — ⬇ Day CSV + 📅 Month CSV (ADMIN ONLY) --------
   Day:   full roster for that day — working / checked out / ON LEAVE / absent
   Month: every day of the picked month for all employees (history + leaves) */

function csvDownload(rows, filename) {
  const csv = rows.map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = filename;
  a.click();
}

const isoOf = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");

/* ---- month picker (◀ ▶) above the CSV buttons ---- */
let monthCursor = new Date();
monthCursor.setDate(1); // the 1st avoids month-overflow on ◀▶

function renderMonthLabel() {
  if (!$("monthLabel")) return;
  const cur = new Date();
  const nextDisabled = monthCursor.getTime() >= new Date(cur.getFullYear(), cur.getMonth(), 1).getTime();
  const label = monthCursor.toLocaleDateString([], { month: "long", year: "numeric" });
  /* both pickers stay in sync — Month sheet tab + Downloads tab */
  $("monthLabel").textContent = label;
  $("monthNext").disabled = nextDisabled;
  if ($("dMonthLabel")) {
    $("dMonthLabel").textContent = label;
    $("dMonthNext").disabled = nextDisabled;
  }
}
const bumpMonth = (dir) => { monthCursor.setMonth(monthCursor.getMonth() + dir); renderMonthLabel(); };
$("monthPrev").addEventListener("click", () => bumpMonth(-1));
$("monthNext").addEventListener("click", () => bumpMonth(1));
$("dMonthPrev").addEventListener("click", () => bumpMonth(-1));
$("dMonthNext").addEventListener("click", () => bumpMonth(1));
renderMonthLabel();

/* ---- ⬇ Day CSV: full roster + true status (leave included), ANY date ---- */

/* one shared status rule for today + past days (same codes the dashboard uses) */
function dayStatusFor(rec, leaf) {
  if (rec && rec.checkOut) return "out";
  if (rec) return "in";
  if (leaf && leaf.status === "granted") return "leave";
  return "absent";
}
function dayCsvRows(recordsForDay, leaves, iso) {
  const isToday = iso === dayKeyISO();
  const rows = [["Date", "Emp ID", "Name", "Check In", "Check In Location", "Check Out", "Check Out Location", "Status"]];
  EMPLOYEES.forEach((emp) => {
    const raw = recordsForDay.find((r) => r.empID === emp.id);
    const rec = isVoided(raw) ? null : raw; // converted-to-leave punches don't count
    const leaf = (leaves[emp.id] || {})[iso];
    const st = dayStatusFor(rec, leaf);
    const status =
      st === "in" ? (isToday ? "Working" : "No check-out") // a past day can't be "working" anymore
      : st === "out" ? "Checked out"
      : st === "leave" ? `On leave (${leaf ? leaf.type : ""})`
      : (leaf && leaf.status === "pending") ? "Leave pending"
      : "Absent";
    rows.push([
      iso, emp.id, emp.name,
      (rec && rec.checkIn) || "", rec && rec.inLoc ? fmtLoc(rec.inLoc) : "",
      (rec && rec.checkOut) || "", rec && rec.outLoc ? fmtLoc(rec.outLoc) : "",
      status,
    ]);
  });
  return rows;
}

$("btnDayCsv").addEventListener("click", async () => {
  if (!isAdmin) { showToast("🔒 Admin login required to export"); return; }
  const iso = ($("dayCsvDate") && $("dayCsvDate").value) || dayKeyISO();
  const isToday = iso === dayKeyISO();
  try {
    let recordsForDay, leaves;
    if (db) {
      showToast(isToday ? "⬇ Building Day CSV…" : `⬇ Loading ${iso}…`);
      await allLeaves(true);
      leaves = leavesCache || {};
      if (isToday) {
        recordsForDay = todayRecords();
      } else {
        const snap = await db.ref(`attendance/${iso}`).get();
        recordsForDay = Object.values(snap.val() || {});
      }
    } else {
      /* local mode — only what this device holds */
      await allLeaves();
      leaves = leavesCache || {};
      recordsForDay = state.records.filter((r) => r.date === new Date(iso + "T00:00:00").toDateString());
    }
    csvDownload(dayCsvRows(recordsForDay, leaves, iso), `ardom-day-${iso}.csv`);
    showToast(`⬇ Day CSV exported — ${iso}`);
  } catch (e) {
    showToast("⚠ Export failed: " + (e.message || e));
  }
});

/* minutes-since-midnight for a saved clock string — shared by the CSV hour totals */
function parseClockMin(t) {
  if (!t) return null;
  const m = String(t).match(/(\d{1,2}):(\d{2}):?(\d{2})?\s*(AM|PM)?/i);
  if (!m) return null;
  const raw = parseInt(m[1], 10), suffix = (m[4] || "").toUpperCase();
  let h;
  if (!suffix) h = raw >= 13 ? raw % 24 : raw % 12; // legacy 24-hour rows if hour ≥ 13
  else { h = raw % 12; if (suffix === "PM") h += 12; }
  return h * 60 + parseInt(m[2], 10);
}

/* ---- 📅 Month CSV: SUMMARY (working days / leave / absent per employee)
        + day-wise blocks ("DAY 10-NOV-26 (Tuesday)") for the picked month ---- */
$("btnMonthCsv").addEventListener("click", async () => {
  if (!isAdmin) { showToast("🔒 Admin login required to export"); return; }
  showToast("📅 Building month CSV…");
  await allLeaves();
  const leaves = leavesCache || {};

  /* every attendance day for every employee in the picked month */
  const histAll = {};
  if (db) {
    try { Object.entries((await db.ref("history").get()).val() || {}).forEach(([id, days]) => { histAll[id] = days || {}; }); }
    catch (e) { showToast("⚠ Could not read history: " + (e.message || e)); return; }
  } else {
    /* local mode — only what this device has (single day) */
    state.records.forEach((r) => {
      const d = new Date(r.date);
      if (isNaN(d)) return;
      (histAll[r.empID] = histAll[r.empID] || {})[isoOf(d)] = { name: r.name, checkIn: r.checkIn, inLoc: r.inLoc, checkOut: r.checkOut, outLoc: r.outLoc };
    });
  }

  const y = monthCursor.getFullYear(), m = monthCursor.getMonth();
  const nDays = new Date(y, m + 1, 0).getDate();
  const monthTitle = monthCursor.toLocaleDateString([], { month: "long", year: "numeric" });

  /* per-employee totals */
  const sum = {};
  EMPLOYEES.forEach((emp) => {
    sum[emp.id] = { name: emp.name, present: 0, incomplete: 0, cl: 0, pl: 0, pending: 0, rejected: 0, mins: 0 };
  });

  /* collect day-by-day rows; quiet days are skipped entirely */
  const dayBlocks = []; // { title, rows }
  for (let i = 1; i <= nDays; i++) {
    const iso = isoOf(new Date(y, m, i));
    const dayRows = [];
    EMPLOYEES.forEach((emp) => {
      const rec = (histAll[emp.id] || {})[iso], leaf = (leaves[emp.id] || {})[iso];
      const s = sum[emp.id];
      const voided = rec && rec.voided;
      let status = "", cin = "", cout = "", cinLoc = "", coutLoc = "";
      if (rec && !voided && rec.checkIn) {
        cin = rec.checkIn; cout = rec.checkOut || "";
        cinLoc = rec.inLoc ? fmtLoc(rec.inLoc) : ""; coutLoc = rec.outLoc ? fmtLoc(rec.outLoc) : "";
        if (rec.checkOut) {
          status = "Present";
          s.present++;
          let mins = parseClockMin(cout) - parseClockMin(cin);
          if (mins < 0) mins += 24 * 60;                    // crossed midnight
          if (mins > 23 * 60 + 30) mins = 0;                // clock-skew, not a real overnight shift
          s.mins += Math.max(0, mins);
        } else { status = "Present (no check-out)"; s.incomplete++; }
      } else if (leaf && leaf.status === "granted") {
        status = `On leave (${leaf.type})`;
        if (leaf.type === "PL") s.pl++; else s.cl++;
      } else if (leaf && leaf.status === "pending") {
        status = "PL pending approval"; s.pending++;
      } else if (leaf && leaf.status === "rejected") {
        status = "Absent (leave rejected)"; s.rejected++;
      } else if (voided) {
        status = "Punch converted to leave";
      } else {
        return; // nothing happened for this employee that day → skip
      }
      dayRows.push([emp.id, emp.name, cin, cinLoc, cout, coutLoc, status]);
    });
    if (dayRows.length) {
      const d = new Date(iso + "T00:00:00");
      dayBlocks.push({
        title: `DAY ${d.getDate()}-${d.toLocaleString([], { month: "short" }).toUpperCase()}-${String(y).slice(2)}` +
               ` (${d.toLocaleDateString([], { weekday: "long" })})`,
        rows: dayRows,
      });
    }
  }

  if (!dayBlocks.length) { showToast(`No attendance data for ${monthTitle}`); return; }

  const rows = [];
  rows.push([`ARDOM ATTENDANCE — ${monthTitle}`]);
  rows.push([]);
  /* ---------- SUMMARY: one row per employee ---------- */
  rows.push(["SUMMARY — working days · leave · absent"]);
  rows.push(["Emp ID", "Name", "Working Days (Present)", "Present (no check-out)", "On Leave CL", "On Leave PL", "PL Pending", "Absent (leave rejected)", "Total Hours Worked"]);
  EMPLOYEES.forEach((emp) => {
    const s = sum[emp.id];
    if (s.present + s.incomplete + s.cl + s.pl + s.pending + s.rejected === 0) return; // nothing all month
    rows.push([
      emp.id, emp.name, s.present, s.incomplete, s.cl, s.pl, s.pending, s.rejected,
      s.mins > 0 ? `${Math.floor(s.mins / 60)} h ${s.mins % 60} m` : "",
    ]);
  });
  /* ---------- DAY-WISE DETAILS ---------- */
  rows.push([]);
  rows.push(["DAY-WISE DETAILS"]);
  dayBlocks.forEach((block) => {
    rows.push([], [block.title]);
    rows.push(["Emp ID", "Name", "Check In", "In Location", "Check Out", "Out Location", "Status"]);
    block.rows.forEach((r) => rows.push(r));
  });

  csvDownload(rows, `ardom-month-${y}-${String(m + 1).padStart(2, "0")}.csv`);
  showToast(`📅 Month CSV exported — ${monthTitle} (summary + ${dayBlocks.length} day blocks)`);
});

/* ======================================================================
   MONTH SHEET — the Google-Sheets-style code grid (P / CL / PL / UA / W-O)
   rows = employees, columns = days of the picked month, right = totals
   Codes follow the office Excel sheet: P, WFH, OD, TOUR, CL, SL, PL, UA,
   ML, PTL, W/O, H, LWP, SPL, HD, MPL (we currently produce P CL PL UA W/O)
   ====================================================================== */
const SHEET_TOTALS = [
  { key: "P", label: "P" }, { key: "CL", label: "CL" }, { key: "PL", label: "PL" },
  { key: "UA", label: "UA" }, { key: "WO", label: "W/O" }, { key: "BLANK", label: "Blank" },
  { key: "PAY", label: "Pay" },
];

/* builds the code for one employee on one day + totals — shared by view & XLSX */
async function fetchMonthData() {
  await allLeaves();
  const leaves = leavesCache || {};
  const histAll = {};
  if (db) {
    try { Object.entries((await db.ref("history").get()).val() || {}).forEach(([id, days]) => { histAll[id] = days || {}; }); }
    catch (e) { showToast("⚠ Could not read history: " + (e.message || e)); throw e; }
  } else {
    state.records.forEach((r) => {
      const d = new Date(r.date);
      if (isNaN(d)) return;
      (histAll[r.empID] = histAll[r.empID] || {})[isoOf(d)] = { name: r.name, checkIn: r.checkIn, inLoc: r.inLoc, checkOut: r.checkOut, outLoc: r.outLoc };
    });
  }
  return { leaves, histAll };
}

/* builds the code for one employee on one day + totals — shared by view & XLSX */
function sheetCellFor(record, leaf, d /*Date 00:00*/, today) {
  const iso = isoOf(d);
  const dow = d.getDay();
  let code = "", tip = "", cls = "";
  const pastOrToday = d.getTime() <= today.getTime();
  if (record && !record.voided && record.checkIn) {
    code = "P";
    cls = "c-p";
    tip = record.checkOut ? `P · ${record.checkIn} → ${record.checkOut}` : "P · no check-out yet";
    if (!record.checkOut) cls += " c-p-out";
  } else if (leaf && leaf.status === "granted") {
    code = leaf.type || "PL";
    cls = "c-leaf";
    tip = `On leave (${code})`;
  } else if (leaf && leaf.status === "pending") {
    code = leaf.type || "PL";
    cls = "c-pending";
    tip = `${code} — awaiting admin approval`;
  } else if (leaf && leaf.status === "rejected") {
    code = "UA";
    cls = "c-ua";
    tip = "Leave rejected → absent";
  } else if (dow === 0) {
    code = pastOrToday ? "W/O" : "";
    cls = "c-wo";
  } else if (record && record.voided) {
    code = pastOrToday ? "UA" : "";
    cls = "c-ua";
    tip = "Punch converted to leave";
  }
  return { code, cls, tip, iso };
}

async function buildSheetData() {
  const { leaves, histAll } = await fetchMonthData();
  const y = monthCursor.getFullYear(), m = monthCursor.getMonth();
  const nDays = new Date(y, m + 1, 0).getDate();
  const today = new Date(); today.setHours(0, 0, 0, 0);

  const dates = [];
  for (let i = 1; i <= nDays; i++) dates.push(new Date(y, m, i));

  const rows = EMPLOYEES.map((emp, idx) => {
    const hist = histAll[emp.id] || {}, myLeaves = leaves[emp.id] || {};
    const cells = dates.map((d) => sheetCellFor(hist[isoOf(d)], myLeaves[isoOf(d)], d, today));
    const totals = { P: 0, CL: 0, PL: 0, UA: 0, WO: 0, BLANK: 0 };
    cells.forEach((c) => {
      if (!c.code) totals.BLANK++;
      else if (c.code === "P") totals.P++;
      else if (c.code === "CL") totals.CL++;
      else if (c.code === "PL") totals.PL++;
      else if (c.code === "UA") totals.UA++;
      else if (c.code === "W/O") totals.WO++;
    });
    totals.PAY = totals.P + totals.CL + totals.PL + totals.WO;
    return { no: idx + 1, emp, cells, totals };
  });
  return { y, m, dates, rows, today };
}

/* ---------- on-screen grid ---------- */
async function renderSheetView() {
  const section = $("sheetSection");
  section.classList.remove("hidden");
  section.innerHTML = `<p class="hint">⏳ Loading the month grid…</p>`;
  try {
    const model = await buildSheetData();
    const monthLabel = monthCursor.toLocaleDateString([], { month: "long", year: "numeric" });
    let html = `<h3>🗓 Attendance codes — ${monthLabel}</h3>`;
    html += `<p class="hint"><b>P</b> present · <b>CL/PL</b> leave · <b>UA</b> rejected leave = absent · <b>W/O</b> weekly off (Sunday) · <b>blank</b> nothing marked · hover a cell for punch times · <b>dashed cells = absent — tap one to add that punch</b>.</p>`;
    html += `<div class="sheet-grid-wrap"><table class="sheet-grid"><thead><tr>
      <th>S.No</th><th class="sticky-id">Emp ID</th><th class="sticky-name">Name</th>`;
    model.dates.forEach((d) => {
      const isSun = d.getDay() === 0;
      html += `<th class="${isSun ? "sun" : ""}"><b>${d.getDate()}</b><br>${d.toLocaleDateString([], { weekday: "short" })}</th>`;
    });
    SHEET_TOTALS.forEach((t) => { html += `<th class="tt">${t.label}</th>`; });
    html += `</tr></thead><tbody>`;
    model.rows.forEach((row) => {
      html += `<tr><td>${row.no}</td><td class="sticky-id">${row.emp.id}</td><td class="sticky-name">${row.emp.name}</td>`;
      row.cells.forEach((c, i) => {
        /* absent past/today cells (blank or UA, not Sundays) open the punch editor prefilled */
        const d = model.dates[i];
        const addable = d <= model.today && (c.code === "" || c.code === "UA");
        html += `<td class="day ${c.cls}${addable ? " addable" : ""}" title="${addable ? "Absent — tap to add this punch" : (c.tip || "")}"${addable ? ` data-addpunch="${row.emp.id}" data-pdate="${c.iso}"` : ""}>${c.code}</td>`;
      });
      SHEET_TOTALS.forEach((t) => { html += `<td class="tt">${row.totals[t.key]}</td>`; });
      html += `</tr>`;
    });
    html += `</tbody></table></div>`;
    section.innerHTML = html;
    section.dataset.month = isoOf(new Date(monthCursor.getFullYear(), monthCursor.getMonth(), 1));
  } catch (e) {
    section.innerHTML = `<p class="hint">⚠ Could not load: ${String(e.message || e)}</p>`;
  }
}

$("btnSheetView").addEventListener("click", () => {
  if (!isAdmin) { showToast("🔒 Admin login required"); return; }
  const section = $("sheetSection");
  const open = !section.classList.contains("hidden");
  if (open) { section.classList.add("hidden"); return; }
  /* month changed since it was last drawn? always redraw for the picked month */
  renderSheetView();
});

/* tap an ABSENT cell (dashed) → punch editor prefilled with that employee + date */
$("sheetSection").addEventListener("click", (e) => {
  const cell = e.target.closest("[data-addpunch]");
  if (cell) openPunchEdit(cell.dataset.addpunch, cell.dataset.pdate);
});

/* ---------- ⬇ real Excel file (same layout as the office workbook) ---------- */
let xlsxLibPromise = null;
function loadXlsxLib() {
  if (!xlsxLibPromise) {
    xlsxLibPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
      s.onload = () => resolve(window.XLSX);
      s.onerror = () => { xlsxLibPromise = null; reject(new Error("Excel library could not load (offline?)")); };
      document.head.appendChild(s);
    });
  }
  return xlsxLibPromise;
}

const EXCEL_SERIAL_1899_12_30 = Date.UTC(1899, 11, 30);
const excelSerial = (d) => Math.round((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - EXCEL_SERIAL_1899_12_30) / 86400000);

async function exportSheetXlsx() {
  if (!isAdmin) { showToast("🔒 Admin login required"); return; }
  showToast("📄 Building the Excel sheet…");
  let XLSX;
  try { XLSX = await loadXlsxLib(); }
  catch (e) { showToast("⚠ " + (e.message || e)); return; }
  const model = await buildSheetData();
  const y = model.y, m = model.m;
  const totHeads = ["Total P", "Total WFH", "Total OD/Tour", "Total CL", "TOTAL SL", "Total PL", "Total MPL", "Total UA", "Total ML+PTL", "Total W/O", "Total H", "Total LWP", "Total SPL", "TOTAL HD", "Total Blank", "Grand Total", "Pay Days", "Final Remarks"];

  const aoa = [];
  /* row alignment mirrors the office workbook:
     row2 = month starting date · row4 = title + date serials · row5 = headers · row6+ = employees */
  aoa.push([]);                                                    // row 1
  aoa.push(["", "", "", "Month Starting Date", excelSerial(new Date(y, m, 1))]);  // row 2
  aoa.push([]);                                                    // row 3
  aoa.push([`Attendance for ${monthCursor.toLocaleDateString([], { month: "short" })}'${String(y).slice(2)} Month`, "", "", "", "", "", "", "", "", "",
    ...model.dates.map((d) => excelSerial(d)),
    ...Array(31 - model.dates.length).fill(""),
    "Remarks, if any Long Leave, Unauthorized Leave, etc.",
    ...totHeads]);                                                 // row 4
  aoa.push(["S. No.", "Temp Id", "Employee ID", "EMP NAME", "DESIGNATION", "DOJ", "Client", "Circle", "Location", "LWD\n  (Last Working Day)",
    ...model.dates.map((d) => d.toLocaleDateString([], { weekday: "short" })),
    ...Array(31 - model.dates.length).fill(""),
    "", ...totHeads.map(() => "X")]);                              // row 5
  model.rows.forEach((row) => {
    const t = row.totals;
    aoa.push([
      row.no, "", row.emp.id, row.emp.name, "", "", "", "", "", "",
      ...row.cells.map((c) => c.code),
      ...Array(31 - model.dates.length).fill(""),  /* 30-day months: pad so Remarks stays in AP like the office sheet */
      "",                       /* remarks (AP) */
      t.P, 0, 0,                /* Total P / WFH / OD-Tour */
      t.CL, 0, t.PL, 0, t.UA,   /* CL / SL / PL / MPL / UA */
      0, t.WO, 0, 0, 0, 0,      /* ML+PTL / W/O / H / LWP / SPL / HD */
      t.BLANK, model.dates.length, t.PAY, "",   /* Blank / Grand / Pay / Final remarks */
    ]);
  });

  const ws = XLSX.utils.aoa_to_sheet(aoa);
  /* real date display on the serial cells (row 2 + row 4 day columns) */
  ws["E2"].z = "dd-mmm-yy";
  model.dates.forEach((d, i) => {
    const ref = XLSX.utils.encode_cell({ r: 3, c: 10 + i }); // K4.. row 4
    if (ws[ref]) ws[ref].z = "d-mmm";
  });
  ws["!cols"] = [{ wch: 5 }, { wch: 8 }, { wch: 11 }, { wch: 26 }, { wch: 16 }, { wch: 8 }, { wch: 10 }, { wch: 8 }, { wch: 14 }, { wch: 14 }]
    .concat(model.dates.map(() => ({ wch: 4.5 })))
    .concat([{ wch: 24 }], totHeads.map(() => ({ wch: 8 })));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Attendance");
  const mName = monthCursor.toLocaleDateString([], { month: "short" }).replace("'", "");
  XLSX.writeFile(wb, `Attendance Sheet - JK ${mName}'${String(y).slice(2)}.xlsx`);
  showToast(`📄 Excel sheet exported — ${monthCursor.toLocaleDateString([], { month: "long" })} ${y}`);
}

$("btnSheetXlsx").addEventListener("click", exportSheetXlsx);
$("btnSheetXlsx2").addEventListener("click", exportSheetXlsx); // duplicate inside the Downloads tab

$("btnPunchEdit").addEventListener("click", () => {
  if (!isAdmin) { showToast("🔒 Admin login required"); return; }
  openPunchEdit();
});

/* ---------------- admin gate ----------------
   NO password is stored in this file (this code is public on GitHub).
   The typed password is verified BY FIREBASE's servers: it signs the
   session in as the app's admin/bot email — only the correct password
   can succeed. Wrong password = Firebase rejects it. */
let isAdmin = sessionStorage.getItem("ardom_admin") === "1";

function renderAdmin() {
  $("adminBtn").textContent = isAdmin ? "🔓 Admin · Logout" : "🔐 Admin";
  $("adminBtn").classList.toggle("on", isAdmin);
  $("btnClear").classList.toggle("hidden", !isAdmin);
  $("dash").classList.toggle("hidden", !isAdmin);
  /* admin console ONLY — the employee "Who's checking in?" wizard is hidden
     while the admin is logged in; logging out brings the employee flow back */
  document.body.classList.toggle("admin-mode", isAdmin);
  if (isAdmin) {
    openAdminTab(sessionStorage.getItem("ardom_atab") || "today"); // restore last tab
    /* Downloads: default the Day CSV date to YESTERDAY before 10 AM — that's
       the usual "export yesterday's sheet" moment. Once set, never overwritten. */
    if ($("dayCsvDate") && !$("dayCsvDate").value) {
      const d = new Date();
      if (d.getHours() < 10) d.setDate(d.getDate() - 1);
      $("dayCsvDate").value = isoOf(d);
    }
    renderDash(); renderRecords(); if (db) renderEnrolledGrid(); renderLeaveAdmin(); renderMonthLabel();
  } else {
    facesCache = null; facesCacheAt = 0; renderRecords(); goTo(1); // logout → employee flow + own-records-only view
  }
}

/* ================================================================
   ADMIN TABS — the console is split into 4 tabs:
   📊 Today (live dashboard) · 🗓 Month sheet · ⬇ Downloads · 📷 Faces & tools
   The employee records section is only visible on the Today tab.
   ================================================================ */
let adminTab = "today";

function openAdminTab(name) {
  if (!isAdmin) return;
  adminTab = name;
  sessionStorage.setItem("ardom_atab", name); // survives page reloads
  document.querySelectorAll("#adminTabs .atab").forEach((b) => b.classList.toggle("active", b.dataset.tab === name));
  document.querySelectorAll("#dash .atabpane").forEach((p) => p.classList.toggle("active", p.dataset.pane === name));
  renderRecords(); // recordsSection visibility follows the tab
}
$("adminTabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".atab");
  if (btn) openAdminTab(btn.dataset.tab);
});

/* ======================================================================
   ADMIN DASHBOARD — whole roster on one sheet
   ====================================================================== */
function dashRows() {
  return EMPLOYEES.map((emp) => {
    const raw = todayRecords().find((r) => r.empID === emp.id);
    /* a punch converted to LEAVE by the admin counts as the leave, not the punch */
    const rec = isVoided(raw) ? null : raw;
    let status = "absent";
    if (rec && rec.checkOut) status = "out";
    else if (rec) status = "in";
    /* approved leave today (CL or PL) → ON LEAVE instead of ABSENT */
    const leaf = leavesCache && (leavesCache[emp.id] || {})[dayKeyISO()];
    if (status === "absent" && leaf && leaf.status === "granted") status = "leave";
    return { emp, rec, status };
  });
}

function renderDash() {
  const rows = dashRows();

  /* summary tiles */
  const count = (s) => rows.filter((r) => r.status === s).length;
  $("tRoster").textContent = EMPLOYEES.length;
  $("tIn").textContent = count("in");
  $("tOut").textContent = count("out");
  $("tAbsent").textContent = count("absent");
  if ($("tLeave")) $("tLeave").textContent = count("leave");
  /* faces enrolled — mandatory admin visibility (exact refresh happens in renderEnrolledGrid) */
  if ($("tEnrolled")) {
    const en = window.__enrolledIDs || new Set();
    $("tEnrolled").textContent = `${en.size}/${EMPLOYEES.length}`;
    const tile = $("tileEnroll");
    tile.title = en.size < EMPLOYEES.length
      ? `${EMPLOYEES.length - en.size} employee(s) have NO face yet — they must enroll at their first punch. Tap to open enrollment.`
      : "Every employee has a face enrolled ✓ — tap to review";
  }
  renderEnTiles();

  /* sync-reality note */
  const note = $("dashNote");
  if (db) {
    note.className = "hint";
    note.textContent = "🟢 Live data from all devices · updated instantly.";
  } else {
    note.className = "hint";
    note.textContent = "⚠ Local mode — this sheet only shows records saved on THIS device. Add your Firebase keys in config.js and republish for the real all-device sheet.";
  }

  renderDashTable(rows);
}

function renderDashTable(rows) {
  const f = ($("dashSearch").value || "").trim().toLowerCase();
  /* tile-driven filter: show only the enrolled-not-in (or enrolled-and-in) people */
  let base = rows;
  const en = window.__enrolledIDs || new Set();
  if (dashFilter === "enNot") base = rows.filter((r) => en.has(r.emp.id) && !r.rec);
  else if (dashFilter === "enIn") base = rows.filter((r) => en.has(r.emp.id) && !!r.rec);
  const filtered = base
    .filter((r) => !f || r.emp.id.toLowerCase().includes(f) || r.emp.name.toLowerCase().includes(f))
    .sort((a, b) => {
      if (a.status !== b.status) {
        const sortBadgeOrder = { in: 0, out: 1, leave: 2, absent: 3 };
        return sortBadgeOrder[a.status] - sortBadgeOrder[b.status];
      }
      return a.emp.id.localeCompare(b.emp.id);
    });
  renderDashFilterNote();

  const badge = (s) =>
    s === "in" ? '<span class="badge in">● WORKING</span>'
    : s === "out" ? '<span class="badge out">✔ OUT</span>'
    : s === "leave" ? '<span class="badge leave">🌿 ON LEAVE</span>'
    : '<span class="badge absent">— ABSENT</span>';

  const enrolled = window.__enrolledIDs || new Set();
  const faceCell = (r) =>
    enrolled.has(r.emp.id)
      ? '<span class="verified">👤 ✓</span>'
      : '<span class="verified" style="color:#b45309">👤 ⏳</span>';

  const locCell = (r) => {
    const loc = (r.rec && (r.rec.outLoc || r.rec.inLoc)) || null;
    return loc ? `<a href="${mapLink(loc)}" target="_blank" rel="noopener">${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}</a>` : "—";
  };

  $("dashTable").querySelector("thead").innerHTML =
    `<tr><th>Emp ID</th><th>Name</th><th>Face</th><th>Check-in</th><th>Check-out</th><th>Location</th><th>Status</th></tr>`;
  $("dashTable").querySelector("tbody").innerHTML = filtered.map((r) => `
    <tr data-prof="${r.emp.id}" title="Tap to open ${r.emp.name}'s profile">
      <td>${r.emp.id}</td>
      <td>${r.emp.name}</td>
      <td>${faceCell(r)}</td>
      <td>${(r.rec && r.rec.checkIn) || "—"}</td>
      <td>${(r.rec && r.rec.checkOut) || "—"}</td>
      <td>${locCell(r)}</td>
      <td>${badge(r.status)}${r.rec && r.rec.editedBy ? `<span class="badge edited" title="Times edited by admin — audit note saved">✏️ edited</span>` : ""}</td>
    </tr>`).join("") || `<tr><td colspan="7" class="empty">${dashFilter === "enNot" ? "✓ Every enrolled employee has checked in today." : dashFilter === "enIn" ? "No enrolled employee has checked in yet today." : "No match."}</td></tr>`;
}

$("dashSearch").addEventListener("input", () => renderDashTable(dashRows()));

/* dashboard rows open the employee's profile — one tap, everything about them */
$("dashTable").addEventListener("click", (e) => {
  if (!isAdmin || e.target.closest("a")) return; // location links stay links
  const tr = e.target.closest("tr[data-prof]");
  if (tr) openProfile(tr.dataset.prof);
});

/* ======================================================================
   EMPLOYEE PROFILE TAB — one employee, everything in one place:
   face status · leave balance · this month's day-by-day history
   ====================================================================== */
let profileEmpID = null;

function openProfile(empID) {
  if (!isAdmin) { showToast("🔒 Admin login required"); return; }
  const sel = $("profEmp");
  sel.innerHTML = EMPLOYEES.map((e) => `<option value="${e.id}">${e.id} — ${e.name}</option>`).join("");
  profileEmpID = EMPLOYEES.some((x) => x.id === empID) ? empID : sel.options[0].value;
  sel.value = profileEmpID;
  openAdminTab("profile");
  renderProfile();
}

$("profEmp").addEventListener("change", () => { profileEmpID = $("profEmp").value; renderProfile(); });

async function renderProfile() {
  const body = $("profBody");
  const emp = EMPLOYEES.find((e) => e.id === profileEmpID);
  if (!emp) { body.innerHTML = `<p class="hint">Pick an employee.</p>`; return; }
  body.innerHTML = `<p class="hint">⏳ Loading ${emp.name}…</p>`;
  const ym = dayKeyISO().slice(0, 7);
  try {
    await allLeaves(true);
    const leaves = leavesCache || {};
    const mine = leaves[emp.id] || {};
    let hist = {};
    if (db) hist = (await db.ref(`history/${emp.id}`).get()).val() || {};

    /* ---- header: face + leave balance ---- */
    const enrolled = (window.__enrolledIDs || new Set()).has(emp.id);
    const faceHtml = enrolled
      ? '<span class="verified">👤 ✓ face enrolled</span>'
      : '<span class="verified" style="color:#b45309">👤 ⏳ NO face yet — they enroll at their first punch</span>';
    const clUsed = monthLeavesUsed(leaves, emp.id);
    let plGranted = 0, plPending = 0;
    Object.entries(mine).forEach(([d, v]) => {
      if (!v || !d.startsWith(ym)) return;
      if (v.type === "PL" && v.status === "granted") plGranted++;
      if (v.status === "pending") plPending++;
    });
    const todayRec = todayRecords().find((r) => r.empID === emp.id);
    const todayLine = todayRec
      ? (isVoided(todayRec)
        ? "🌿 today: punch converted to leave"
        : `today: <b>${todayRec.checkIn}${todayRec.checkOut ? " → " + todayRec.checkOut : " (on the clock)"}</b>`)
      : (mine[dayKeyISO()] && mine[dayKeyISO()].status === "granted" ? "🌿 today: ON LEAVE" : "today: no punch yet");

    /* ---- this month, day by day (newest first) ---- */
    const [Y, M] = ym.split("-").map(Number);
    const nDays = new Date(Y, M, 0).getDate();
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
    let rows = "";
    for (let i = nDays; i >= 1; i--) {
      const iso = `${ym}-${String(i).padStart(2, "0")}`;
      const d = new Date(Y, M - 1, i);
      const past = d.getTime() <= todayStart.getTime();
      const h = hist[iso], leaf = mine[iso];
      const rec = h && !h.voided ? h : null;
      let status, cls = "";
      if (rec && rec.checkOut) status = `✔ ${rec.checkIn} → ${rec.checkOut}`;
      else if (rec) status = iso === dayKeyISO() ? `● working · ${rec.checkIn}` : `no check-out · ${rec.checkIn}`;
      else if (leaf && leaf.status === "granted") { status = `🌿 on leave (${leaf.type || "PL"})`; cls = "leave"; }
      else if (leaf && leaf.status === "pending") { status = `⏳ ${leaf.type || "PL"} pending`; cls = "pending"; }
      else if (leaf && leaf.status === "rejected") { status = "❌ leave rejected → absent"; cls = "ua"; }
      else if (d.getDay() === 0) { status = past ? "W/O" : ""; }
      else if (h && h.voided) { status = "🌿 punch → leave"; cls = "leave"; }
      else if (past) { status = "— absent"; cls = "ua"; }
      if (!status) continue; // future day, nothing marked
      const edited = h && h.editedBy
        ? `<span class="badge edited" title="Edited by admin · ${h.editedAt || ""}">✏️</span>` : "";
      rows += `<tr><td>${d.getDate()} ${d.toLocaleDateString([], { weekday: "short" })}</td><td>${status}${edited}</td></tr>`;
    }

    body.innerHTML = `
      <div class="prof-head">
        <h3>👤 ${emp.id} — ${emp.name}</h3>
        <p class="hint">${faceHtml}<br>📅 ${todayLine}</p>
        <div class="prof-balance">
          <span>🌿 CL used this month: <b>${clUsed}/${MONTHLY_CL_LIMIT}</b></span>
          <span>📋 PL granted this month: <b>${plGranted}</b></span>
          <span>⏳ PL pending: <b>${plPending}</b></span>
        </div>
        <div class="row">
          <button class="btn tiny ghost" data-profedit="${emp.id}">✏️ Edit today's punch</button>
          <button class="btn tiny ghost" data-profvoid="${emp.id}">🌿 Convert today's punch to LEAVE</button>
        </div>
      </div>
      <h3>🗓 This month (${nDays} days)</h3>
      <table><thead><tr><th>Date</th><th>Status</th></tr></thead><tbody>
        ${rows || `<tr><td colspan="2" class="empty">Nothing marked this month.</td></tr>`}
      </tbody></table>`;

    /* keep the "convert to leave" confirm helper working — same pattern as the punch card */
    body.querySelectorAll("[data-profvoid]").forEach((b) => {
      b.addEventListener("click", () => voidPresentAsLeave(b.dataset.profvoid));
    });
  } catch (e) {
    body.innerHTML = `<p class="hint">⚠ Could not load profile: ${String(e.message || e)}</p>`;
  }
}

/* profile action buttons (delegated — profile body re-renders) */
$("profBody").addEventListener("click", (e) => {
  const ed = e.target.closest("[data-profedit]");
  if (ed) openPunchEdit(ed.dataset.profedit);
});

/* ======================================================================
   FACE ENROLLMENT (admin) — one photo per employee, stored as descriptor
   ====================================================================== */
const enrollUI = {
  stream: null, empID: null, shot: null, desc: null,
};

/* fill the employee selector */
(function () {
  const sel = $("enEmp");
  EMPLOYEES.slice().sort((a, b) => a.id.localeCompare(b.id)).forEach((e) => {
    const o = document.createElement("option");
    o.value = e.id;
    o.textContent = `${e.id} — ${e.name}`;
    sel.appendChild(o);
  });
})();

function enMsg(t, cls = "") {
  const el = $("enStatus");
  el.textContent = t;
  el.className = "hint " + cls;
}
function enReset() {
  if (enrollUI.stream) { enrollUI.stream.getTracks().forEach((t) => t.stop()); enrollUI.stream = null; }
  $("enCamLive").classList.add("hidden");
  $("enCamShot").classList.add("hidden");
  $("enCamPh").classList.remove("hidden");
  $("enMsg").textContent = "Camera will appear here";
  $("enCapture").disabled = true;
  $("enCapture").classList.remove("hidden");
  $("enRetake").classList.add("hidden");
  $("enSave").classList.add("hidden");
  enrollUI.shot = null;
  enrollUI.desc = null;
}
$("enEmp").addEventListener("change", () => { enReset(); enrollUI.empID = $("enEmp").value; });
$("enStart").addEventListener("click", async () => {
  enrollUI.empID = $("enEmp").value;
  const engine = await loadFaceEngine();
  enMsg(engine ? "Face engine ready." : "⚠ Face engine failed to load — try again or check internet.");
  try {
    enrollUI.stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 720 }, height: { ideal: 960 } }, audio: false });
    $("enrollVideo").srcObject = enrollUI.stream;
    $("enCamPh").classList.add("hidden");
    $("enCamLive").classList.remove("hidden");
    $("enCapture").disabled = false;
  } catch (e) { enMsg("Camera unavailable — upload a photo instead."); }
});
$("enCapture").addEventListener("click", async () => {
  const video = $("enrollVideo");
  const c = document.createElement("canvas");
  c.width = video.videoWidth || 720;
  c.height = video.videoHeight || 960;
  const ctx = c.getContext("2d");
  ctx.translate(c.width, 0); ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0, c.width, c.height);
  await enShowShot(c.toDataURL("image/jpeg", 0.85));
});
$("enFile").addEventListener("change", (e) => {
  const f = e.target.files[0]; if (!f) return;
  const rd = new FileReader();
  rd.onload = (ev) => enShowShot(ev.target.result);
  rd.readAsDataURL(f);
});
async function enShowShot(dataURL) {
  if (enrollUI.stream) { enrollUI.stream.getTracks().forEach((t) => t.stop()); enrollUI.stream = null; }
  enrollUI.shot = await compressImage(dataURL);
  $("enCamLive").classList.add("hidden");
  $("enCamPh").classList.add("hidden");
  $("enCamShot").classList.remove("hidden");
  $("enrollShot").src = dataURL;
  $("enCapture").classList.add("hidden");
  $("enRetake").classList.remove("hidden");
  $("enSave").classList.add("hidden");
  enMsg("⏳ Analysing face…", "busy");
  const det = await faceDescriptorOf(enrollUI.shot);
  if (!det) { enMsg("❌ No face found — retake in better light."); return; }
  enrollUI.desc = Array.from(det);
  enMsg("✅ Face signature captured — press “Enroll face”.", "ok");
  $("enSave").classList.remove("hidden");
}
$("enRetake").addEventListener("click", () => { enReset(); enrollUI.empID = $("enEmp").value; });
$("enSave").addEventListener("click", async () => {
  const id = enrollUI.empID || $("enEmp").value;
  if (!id || !enrollUI.desc) return;
  const emp = EMPLOYEES.find((x) => x.id === id);

  /* duplicate-face gate — one face = one employee */
  const owner = await findFaceOwner(enrollUI.desc, id);
  if (owner) {
    enMsg(`❌ This face is ALREADY enrolled under ${owner.id} (${owner.name}). One face = one employee. If this is a mistake, remove that enrollment first.`, "bad");
    showToast("⚠ Duplicate face blocked");
    return;
  }

  const rec = { photo: enrollUI.shot, descriptor: enrollUI.desc, enrolledAt: new Date().toISOString(), by: "admin" };
  faceCache[id] = rec;
  try {
    if (db) await db.ref("faces/" + id).set(rec);
    else {
      const store = JSON.parse(localStorage.getItem("ardom_faces") || "{}");
      store[id] = rec; localStorage.setItem("ardom_faces", JSON.stringify(store));
    }
    facesCache = null; facesCacheAt = 0;
    enMsg(`✅ ${emp ? emp.name : id} enrolled`);
    showToast(`Face enrolled — ${emp ? emp.name : id}`);
    renderEnrolledGrid();
    enReset();
  } catch (e) { enMsg("⚠ Save failed: " + e.message); }
});
$("enDel").addEventListener("click", async () => {
  const id = $("enEmp").value;
  if (!id || !confirm("Remove the enrolled face for " + id + "? They can enroll themselves again at their next punch.")) return;
  delete faceCache[id];
  try {
    if (db) await db.ref("faces/" + id).remove();
    else {
      const store = JSON.parse(localStorage.getItem("ardom_faces") || "{}");
      delete store[id]; localStorage.setItem("ardom_faces", JSON.stringify(store));
    }
    facesCache = null; facesCacheAt = 0;
    showToast("Enrollment removed — employee can re-enroll at next punch");
    renderEnrolledGrid();
  } catch (e) { showToast("Remove failed: " + e.message); }
});

/* enrolled-and-punched-today tiles — of everyone with a saved face, who is in
   today and who hasn't shown up yet (live: recalculated on every dash render) */
let dashFilter = null; // null | "enNot" | "enIn" — set by tapping the two enrolled tiles

function renderDashFilterNote() {
  const note = $("dashFilterNote");
  if (!note) return;
  $("tileEnNot").classList.toggle("on", dashFilter === "enNot");
  $("tileEnIn").classList.toggle("on", dashFilter === "enIn");
  if (!dashFilter) { note.classList.add("hidden"); return; }
  note.classList.remove("hidden");
  note.innerHTML = dashFilter === "enNot"
    ? "🔎 Showing: <b>enrolled employees who have NOT checked in today</b> — tap the tile again (or <a href=\"#\" id=\"dashFilterClear\">clear</a>) to see everyone."
    : "🔎 Showing: <b>enrolled employees who checked in today</b> — tap the tile again (or <a href=\"#\" id=\"dashFilterClear\">clear</a>) to see everyone.";
}

function toggleDashFilter(mode) {
  if (!isAdmin) { showToast("🔒 Admin login required"); return; }
  dashFilter = dashFilter === mode ? null : mode;
  renderDashTable(dashRows());
}

$("tileEnNot").addEventListener("click", () => toggleDashFilter("enNot"));
$("tileEnIn").addEventListener("click", () => toggleDashFilter("enIn"));
$("dashFilterNote").addEventListener("click", (e) => {
  if (e.target.id === "dashFilterClear" || e.target === $("dashFilterNote")) {
    dashFilter = null;
    renderDashTable(dashRows());
  }
});

function renderEnTiles() {
  if (!$("tEnIn")) return;
  const en = window.__enrolledIDs || new Set();
  const inToday = todayRecords().filter((r) => !isVoided(r) && en.has(r.empID));
  const notIn = [...en].filter((id) => !inToday.some((r) => r.empID === id));
  $("tEnIn").textContent = `${inToday.length}/${en.size}`;
  $("tEnNot").textContent = String(notIn.length);
  /* tooltip names who exactly hasn't checked in (first few IDs) — and both tiles are tappable filters */
  const names = notIn.slice(0, 6).map((id) => {
    const e = EMPLOYEES.find((x) => x.id === id);
    return e ? `${id} (${e.name})` : id;
  });
  $("tileEnNot").title = notIn.length
    ? `Enrolled but NO check-in yet today (${notIn.length}):\n${names.join(", ")}${notIn.length > 6 ? ` … +${notIn.length - 6} more` : ""}\n\nTap this tile to list them in the table below.`
    : "Every enrolled employee has checked in today ✓";
  $("tileEnIn").title = `${inToday.length} of ${en.size} face-enrolled employees checked in today.\n\nTap this tile to list them in the table below.`;
}

/* enrolled thumbnails */
window.__enrolledIDs = new Set();
async function renderEnrolledGrid() {
  let store = {};
  try { store = await allEnrollments(); } catch (e) { console.warn(e); }
  faceCache = Object.assign({}, faceCache, store);
  window.__enrolledIDs = new Set(Object.entries(store).filter(([, f]) => f && f.descriptor).map(([id]) => id));
  renderEnTiles(); // tiles reflect the fresh face list immediately

  const grid = $("enrolledGrid");
  const entries = Object.entries(store);
  grid.innerHTML = `<h4>Enrolled: ${entries.length} / ${EMPLOYEES.length}</h4>` +
    (entries.length
      ? entries.map(([id, f]) => {
          const emp = EMPLOYEES.find((x) => x.id === id);
          return `<div class="enrolled-card"><img src="${f.photo || ""}" alt="${id}"/><span>${id}${emp ? "<br>" + emp.name.split(" ")[0] : ""}</span></div>`;
        }).join("")
      : "");
  /* keep the dashboard Face column + the mandatory tiles row in sync */
  const tEn = $("tEnrolled");
  if (tEn) {
    tEn.textContent = `${window.__enrolledIDs.size}/${EMPLOYEES.length}`;
    $("tileEnroll").classList.toggle("due", window.__enrolledIDs.size < EMPLOYEES.length);
  }
  if (!$("dash").classList.contains("hidden")) renderDashTable(dashRows());
}

/* tap the "Faces enrolled" tile → open the Faces & tools tab at the enrollment box */
$("tileEnroll").addEventListener("click", () => {
  if (!isAdmin) { showToast("🔒 Admin login required"); return; }
  openAdminTab("faces");
  $("enroll").scrollIntoView({ behavior: "smooth", block: "start" });
});

function closeAdminModal() {
  $("adminModal").classList.add("hidden");
}

/* ================================================================
   ADMIN ELEVATION — punch-time edits are blocked by the security
   rules for normal (anonymous) sessions, so the admin's sign-in
   re-authenticates this session as the app's bot account using the
   SAME password just typed. Rules then allow that one session
   (auth.token.email = bot) to change check-in/check-out times.
   The password lives only in this tab's sessionStorage.
   ================================================================ */
let authElevated = false;
async function elevateAdmin(pw, silent) {
  if (!db || typeof firebase === "undefined" || !firebase.auth) return true;
  /* trust the ACTUAL session, not a remembered flag — a logout can race an
     in-flight elevation and leave the flag stale (flag true, user anonymous) */
  const cur = firebase.auth().currentUser;
  if (cur && cur.email === ADMIN_BOT_EMAIL) { authElevated = true; return true; }
  try {
    const cred = await firebase.auth().signInWithEmailAndPassword(ADMIN_BOT_EMAIL, pw);
    authElevated = !!(cred && cred.user && cred.user.email);
    if (!silent) showToast(authElevated ? "🔑 Admin powers unlocked (punch editing ON)" : "⚠ Elevation failed");
    return authElevated;
  } catch (e) {
    console.warn("elevate:", e.message);
    if (!silent) showToast("⚠ Elevated sign-in failed — punch editing may be limited");
    return false;
  }
}

$("adminBtn").addEventListener("click", async () => {
  if (isAdmin) {
    isAdmin = false;
    sessionStorage.removeItem("ardom_admin");
    sessionStorage.removeItem("ardom_adminpw");
    authElevated = false;
    /* give the elevated (bot) session back — an employee browsing next must
       NOT keep admin write powers */
    if (db && typeof firebase !== "undefined" && firebase.auth) {
      try {
        await firebase.auth().signOut();
        await firebase.auth().signInAnonymously();
      } catch (e) { console.warn("de-elevate:", e.message); }
    }
    renderAdmin();
    showToast("Admin logged out — clear access locked");
  } else {
    $("adminPass").value = "";
    $("adminErr").classList.add("hidden");
    $("adminModal").classList.remove("hidden");
    $("adminPass").focus();
  }
});

$("adminCancel").addEventListener("click", closeAdminModal);
$("adminModal").addEventListener("click", (e) => {
  if (e.target === $("adminModal")) closeAdminModal();
});

$("adminForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const pw = $("adminPass").value;
  const btn = $("adminForm").querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = "⏳ Checking…";
  /* the REAL password check happens on Firebase's servers — the app code
     never contains it. Success = the session is signed in as the admin
     bot account (which also unlocks punch editing immediately). */
  const ok = await elevateAdmin(pw, true); // Firebase rejects a wrong password — nothing sensitive in the app code
  btn.disabled = false;
  btn.textContent = "Login";
  if (ok) {
    isAdmin = true;
    sessionStorage.setItem("ardom_admin", "1");
    sessionStorage.setItem("ardom_adminpw", pw); // session-only, used to re-elevate after reload
    closeAdminModal();
    renderAdmin();
    showToast("✅ Admin logged in");
  } else {
    $("adminErr").classList.remove("hidden");
    $("adminPass").value = "";
    $("adminPass").focus();
  }
});

/* ---------------- boot ---------------- */
renderAdmin();
initSync();
renderRecords();
renderDash();
/* re-bind wake-up reminders on this device (permission already granted) */
if (state.me && typeof Notification !== "undefined" && Notification.permission === "granted") {
  setTimeout(() => enablePushForMe().catch(() => {}), 1500); // after initSync's anonymous sign-in
}
