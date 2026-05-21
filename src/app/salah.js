/**
 * JAHJK Website — Salah Times & Live Clock
 * - Live clock in the salah bar (#lc)
 * - Highlights the next upcoming prayer
 * - Tab switching between Daily / Ramadan / Jumu'ah panels
 *
 * Prayer times are hardcoded for Srinagar — replace with API call
 * for dynamic times. Recommended API: https://aladhan.com/prayer-times-api
 */

// ── Tab Switcher ──────────────────────────────────────────────
function switchSalah(id, btn) {
  document.querySelectorAll('.s-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.s-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('sp-' + id).classList.add('active');
}
window.switchSalah = switchSalah;

// ── Live Clock ───────────────────────────────────────────────
function tick() {
  const n = new Date();
  const h = n.getHours(), m = n.getMinutes(), s = n.getSeconds();
  const ap = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 || 12;
  const el = document.getElementById('lc');
  if (el) el.textContent = `${hh}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')} ${ap}`;
}
setInterval(tick, 1000);
tick();

// ── Next Prayer Highlight ────────────────────────────────────
(function highlightNextPrayer() {
  const n = new Date();
  const cur = n.getHours() * 60 + n.getMinutes();

  // Minutes from midnight for each prayer (Srinagar, approximate)
  const prayerTimes = {
    fajr:    5 * 60 + 12,   // 5:12 AM
    sunrise: 6 * 60 + 38,   // 6:38 AM
    zuhr:   12 * 60 + 44,   // 12:44 PM
    asr:    16 * 60 + 10,   // 4:10 PM
    maghrib:18 * 60 + 48,   // 6:48 PM
    isha:   20 * 60 + 5,    // 8:05 PM
  };

  let marked = false;
  document.querySelectorAll('#sp-daily .s-item').forEach(el => {
    if (!marked && prayerTimes[el.dataset.p] && cur < prayerTimes[el.dataset.p]) {
      el.classList.add('next');
      marked = true;
    }
  });
})();
