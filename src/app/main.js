/* ============================================================
   JAHJK Website — Main JavaScript
   All interactive features: router, carousel, salah, reveal
   ============================================================ */

/* ── PAGE ROUTER ── */
function go(name) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  const page = document.getElementById("p-" + name);
  if (page) {
    page.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(runReveal, 60);

    if (window.lucide) lucide.createIcons();
  }
  // close mobile drawer
  document.getElementById("drawer").classList.remove("open");
  document.getElementById("ham").classList.remove("open");
  document.body.style.overflow = "";
}

/* ── HAMBURGER ── */
const ham = document.getElementById("ham");
const drawer = document.getElementById("drawer");
ham.addEventListener("click", () => {
  const open = drawer.classList.toggle("open");
  ham.classList.toggle("open", open);
  document.body.style.overflow = open ? "hidden" : "";
});
document.querySelectorAll(".mob-gb").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById(btn.dataset.t).classList.toggle("open");
  });
});

/* ── SALAH TABS ── */
function switchSalah(id, btn) {
  document
    .querySelectorAll(".s-tab")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".s-panel")
    .forEach((p) => p.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("sp-" + id).classList.add("active");
}

/* ── LIVE CLOCK ── */
function tick() {
  const n = new Date(),
    h = n.getHours(),
    m = n.getMinutes(),
    s = n.getSeconds();
  const ap = h >= 12 ? "PM" : "AM",
    hh = h % 12 || 12;
  const el = document.getElementById("lc");
  if (el)
    el.textContent = `${hh}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")} ${ap}`;
}
setInterval(tick, 1000);
tick();

/* ── NEXT PRAYER HIGHLIGHT ── */
(function () {
  const n = new Date(),
    c = n.getHours() * 60 + n.getMinutes();
  const map = {
    fajr: 312,
    sunrise: 398,
    zuhr: 764,
    asr: 970,
    maghrib: 1008,
    isha: 1205,
  };
  let done = false;
  document.querySelectorAll("#sp-daily .s-item").forEach((el) => {
    if (!done && map[el.dataset.p] && c < map[el.dataset.p]) {
      el.classList.add("next");
      done = true;
    }
  });
})();

/* ── CAROUSEL ── */
(function () {
  const track = document.getElementById("ct");
  const dotsEl = document.getElementById("cd");
  if (!track) return;
  const slides = track.querySelectorAll(".car-slide");
  const N = slides.length;
  let cur = 0;
  const vis = 2;

  function buildDots() {
    dotsEl.innerHTML = "";
    const cnt = Math.max(1, N - vis() + 1);
    for (let i = 0; i < cnt; i++) {
      const d = document.createElement("button");
      d.className = "c-dot" + (i === cur ? " active" : "");
      d.addEventListener("click", () => goSlide(i));
      dotsEl.appendChild(d);
    }
  }
  function goSlide(idx) {
    const max = Math.max(0, N - vis());
    cur = Math.max(0, Math.min(idx, max));
    const w = slides[0].getBoundingClientRect().width + 16;
    track.style.transform = `translateX(-${cur * w}px)`;
    document
      .querySelectorAll(".c-dot")
      .forEach((d, i) => d.classList.toggle("active", i === cur));
  }
  document
    .getElementById("cp")
    .addEventListener("click", () => goSlide(cur - 1));
  document
    .getElementById("cn")
    .addEventListener("click", () =>
      goSlide(cur + 1 > N - vis() ? 0 : cur + 1),
    );
  let sx = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      sx = e.touches[0].clientX;
    },
    { passive: true },
  );
  track.addEventListener("touchend", (e) => {
    const dx = sx - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 48) goSlide(dx > 0 ? cur + 1 : cur - 1);
  });
  let tmr = setInterval(() => goSlide(cur + 1 > N - vis() ? 0 : cur + 1), 4800);
  track.addEventListener("mouseenter", () => clearInterval(tmr));
  track.addEventListener("mouseleave", () => {
    tmr = setInterval(() => goSlide(cur + 1 > N - vis() ? 0 : cur + 1), 4800);
  });
  window.addEventListener("resize", () => {
    cur = 0;
    buildDots();
    goSlide(0);
  });
  buildDots();
})();

/* ── APPLE SCROLL REVEAL ── */
function runReveal() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.07, rootMargin: "0px 0px -28px 0px" },
  );
  document
    .querySelectorAll(".page.active .rv, .page.active .rvl, .page.active .rvr")
    .forEach((el) => {
      if (!el.classList.contains("in")) obs.observe(el);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const themeBtn = document.getElementById("themeToggle");

  if (!themeBtn) return;

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "Light Theme";
  }

  themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      themeBtn.textContent = "Light Theme";
    } else {
      localStorage.setItem("theme", "light");
      themeBtn.textContent = "Dark Theme";
    }
  });
});
runReveal();
