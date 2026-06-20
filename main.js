
    /* ── SALAH HIDE ON SCROLL ── */
    (function () {
      const bar = document.querySelector('.salah-bar');
      if (!bar) return;
      let lastY = window.scrollY;
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const currentY = window.scrollY;
            if (currentY > lastY && currentY > 80) {
              bar.classList.add('hidden');
            } else {
              bar.classList.remove('hidden');
            }
            lastY = currentY;
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    })();

    /* ── PAGE NAVIGATION (standalone pages) ── */
const PAGE_URLS = {
  "home": "index.html",
  "smert": "smert.html",
  "aims": "aims.html",
  "about": "about.html",
  "executive": "executive.html",
  "constitution": "constitution.html",
  "events": "events.html",
  "fatwa-form": "fatwa-form.html",
  "ifta-board": "ifta-board.html",
  "fatwa-status": "fatwa-status.html",
  "waqf": "waqf.html",
  "waqf-reg": "waqf-registered.html",
  "waqf-unreg": "waqf-unregistered.html",
  "waqf-darasgah": "waqf-darasgah.html",
  "waqf-other": "waqf-other.html",
  "friday": "friday.html",
  "schools": "schools.html",
  "colleges": "colleges.html",
  "madarsa": "madarsas.html",
  "masjid": "masjids.html",
  "kuliyat-boys": "kuliyat-boys.html",
  "kuliyat-girls": "kuliyat-girls.html",
  "markaz-ibn": "markaz-ibn.html",
  "markaz-aisha": "markaz-aisha.html",
  "sunday": "sunday-classes.html",
  "books": "books.html",
  "new-pub": "new-publications.html",
  "weekly": "weekly-muslim.html",
  "login": "login.html",
  "register": "register.html",
  "forgot-password": "forgot-password.html",
  "quick-links": "index.html#quick-links"
};
function go(name) {
  const url = PAGE_URLS[name] || (name + '.html');
  window.location.href = url;
}

/* ── HAMBURGER ── */
    const ham = document.getElementById('ham');
    const drawer = document.getElementById('drawer');
    if (ham && drawer) ham.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      ham.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    document.querySelectorAll('.mob-gb').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById(btn.dataset.t).classList.toggle('open');
      });
    });

    /* ── SALAH TABS ── */
    function switchSalah(id, btn) {
      document.querySelectorAll('.s-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.s-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('sp-' + id).classList.add('active');
    }

    /* ── SALAH HIDE ON SCROLL ── */
    (function () {
      const bar = document.querySelector('.salah-bar');
      if (!bar) return;
      let lastY = window.scrollY;
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const currentY = window.scrollY;
            if (currentY > lastY && currentY > 80) { bar.classList.add('hidden'); }
            else { bar.classList.remove('hidden'); }
            lastY = currentY;
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    })();

    /* ── HERO PRAYER CARD — Live Aladhan API ── */
    (function fetchHeroPrayers() {
      const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
      const lat = 34.0837, lng = 74.7973;
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();

      // Show Hijri + Gregorian date
      const dateEl = document.getElementById('prayer-date-display');
      if (dateEl) {
        const greg = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
        dateEl.textContent = greg;
      }

      const url = `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lng}&method=1`;

      fetch(url)
        .then(r => r.json())
        .then(data => {
          const timings = data.data.timings;
          const meta = data.data.date;

          // Update date with Hijri
          if (dateEl && meta) {
            const hijri = meta.hijri;
            dateEl.textContent = `${meta.readable} / ${hijri.day} ${hijri.month.en} ${hijri.year}`;
          }

          const now = new Date();
          const curMins = now.getHours() * 60 + now.getMinutes();
          let marked = false;

          prayers.forEach(p => {
            const timeEl = document.getElementById('pt-' + p);
            const row = document.querySelector(`.prayer-row[data-prayer="${p}"]`);
            if (!timeEl || !timings[p]) return;

            // Convert 24h to 12h
            const [hh, mm] = timings[p].split(':').map(Number);
            const ap = hh >= 12 ? 'PM' : 'AM';
            const h12 = hh % 12 || 12;
            timeEl.textContent = `${h12}:${String(mm).padStart(2, '0')} ${ap}`;

            // Highlight next prayer
            const pMins = hh * 60 + mm;
            if (!marked && curMins < pMins) {
              if (row) { row.classList.add('next-prayer'); }
              marked = true;
            }
          });

          // Also update the salah bar times (legacy bar)
          prayers.forEach(p => {
            const el = document.getElementById('t-' + p);
            if (el && timings[p]) {
              const [hh, mm] = timings[p].split(':').map(Number);
              const ap = hh >= 12 ? 'PM' : 'AM';
              const h12 = hh % 12 || 12;
              el.textContent = `${h12}:${String(mm).padStart(2, '0')} ${ap}`;
            }
          });
        })
        .catch(() => {
          // Fallback Srinagar times
          const fb = { Fajr: '5:12 AM', Sunrise: '6:38 AM', Dhuhr: '12:44 PM', Asr: '4:10 PM', Maghrib: '6:48 PM', Isha: '8:05 PM' };
          prayers.forEach(p => {
            const el = document.getElementById('pt-' + p);
            if (el && fb[p]) el.textContent = fb[p];
          });
          if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
        });
    })();


    document.addEventListener('DOMContentLoaded', () => {
      const heroVideo = document.querySelector('.hero-v2-video');

      if (heroVideo) {
        heroVideo.playbackRate = 0.6;
      }
    });

    /* ── LIVE CLOCK ── */
    function tick() {
      const n = new Date(), h = n.getHours(), m = n.getMinutes(), s = n.getSeconds();
      const ap = h >= 12 ? 'PM' : 'AM', hh = h % 12 || 12;
      const str = `${hh}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')} ${ap}`;
      const el = document.getElementById('lc');
      if (el) el.textContent = str;
      const el2 = document.getElementById('lc2');
      if (el2) el2.textContent = str;
    }
    setInterval(tick, 1000); tick();

    /* ── LIVE SALAH TIMES via Aladhan API ── */
    (function fetchSalahTimes() {
      const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
      const lat = 34.0837, lng = 74.7973; // Srinagar coordinates
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();

      // Update date display
      const dateEl = document.getElementById('salah-date');
      if (dateEl) {
        dateEl.textContent = today.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long' });
      }

      // Aladhan API — method 1 = Karachi (standard for South Asia)
      const url = `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lng}&method=1`;

      fetch(url)
        .then(r => r.json())
        .then(data => {
          const timings = data.data.timings;
          prayers.forEach(p => {
            const el = document.getElementById('t-' + p);
            if (el && timings[p]) {
              // Convert 24h to 12h
              const [hh, mm] = timings[p].split(':').map(Number);
              const ap = hh >= 12 ? 'PM' : 'AM';
              const h12 = hh % 12 || 12;
              el.textContent = `${h12}:${String(mm).padStart(2, '0')} ${ap}`;
            }
          });

          // Highlight next prayer
          const now = new Date();
          const curMins = now.getHours() * 60 + now.getMinutes();
          let marked = false;
          document.querySelectorAll('#sp-daily .s-item').forEach(el => {
            el.classList.remove('next');
            const key = el.dataset.p;
            if (!marked && timings[key]) {
              const [hh, mm] = timings[key].split(':').map(Number);
              const pMins = hh * 60 + mm;
              if (curMins < pMins) { el.classList.add('next'); marked = true; }
            }
          });
        })
        .catch(() => {
          // Fallback: static Srinagar times if API fails
          const fallback = { Fajr: '5:12 AM', Sunrise: '6:38 AM', Dhuhr: '12:44 PM', Asr: '4:10 PM', Maghrib: '6:48 PM', Isha: '8:05 PM' };
          prayers.forEach(p => {
            const el = document.getElementById('t-' + p);
            if (el && fallback[p]) el.textContent = fallback[p];
          });
        });
    })();

    /* ── CAROUSEL ── */
    (function () {
      const track = document.getElementById('ct');
      const dotsEl = document.getElementById('cd');

      if (!track || !dotsEl) return;

      const carouselSection = track.closest('.car-sec');

      if (carouselSection) {
        const carObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              carouselSection.classList.add('in');
              carObserver.unobserve(carouselSection);
            }
          });
        }, { threshold: 0.22 });

        carObserver.observe(carouselSection);
      }

      const slides = track.querySelectorAll('.car-slide');
      const N = slides.length;

      let cur = 0;

      const vis = () => window.innerWidth >= 560 ? 2 : 1;
      const stepBy = () => vis();
      const pageCount = () => Math.ceil(N / stepBy());

      function buildDots() {
        dotsEl.innerHTML = '';

        for (let i = 0; i < pageCount(); i++) {
          const d = document.createElement('button');
          d.className = 'c-dot' + (i === Math.floor(cur / stepBy()) ? ' active' : '');

          d.addEventListener('click', () => {
            goSlide(i * stepBy());
          });

          dotsEl.appendChild(d);
        }
      }

      function goSlide(idx) {
        if (idx >= N) {
          cur = 0;
        } else if (idx < 0) {
          cur = (pageCount() - 1) * stepBy();
        } else {
          cur = idx;
        }

        const gap = 20;
        const w = slides[0].getBoundingClientRect().width + gap;

        track.style.transform = `translateX(-${cur * w}px)`;

        slides.forEach((slide, i) => {
          slide.classList.remove('is-active', 'is-near');

          if (i >= cur && i < cur + vis()) {
            slide.classList.add('is-active');
          }

          if (i === cur - 1 || i === cur + vis()) {
            slide.classList.add('is-near');
          }
        });

        const activePage = Math.floor(cur / stepBy());

        document.querySelectorAll('.c-dot').forEach((d, i) => {
          d.classList.toggle('active', i === activePage);
        });
      }

      const prevBtn = document.getElementById('cp');
      const nextBtn = document.getElementById('cn');

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          goSlide(cur - stepBy());
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          goSlide(cur + stepBy());
        });
      }

      let sx = 0;

      track.addEventListener('touchstart', e => {
        sx = e.touches[0].clientX;
      }, { passive: true });

      track.addEventListener('touchend', e => {
        const dx = sx - e.changedTouches[0].clientX;

        if (Math.abs(dx) > 48) {
          goSlide(dx > 0 ? cur + stepBy() : cur - stepBy());
        }
      });

      let tmr = setInterval(() => {
        goSlide(cur + stepBy());
      }, 4800);

      track.addEventListener('mouseenter', () => clearInterval(tmr));

      track.addEventListener('mouseleave', () => {
        tmr = setInterval(() => {
          goSlide(cur + stepBy());
        }, 4800);
      });

      window.addEventListener('resize', () => {
        cur = 0;
        buildDots();
        goSlide(0);
      });

      buildDots();
      goSlide(0);
    })();

    /* ── APPLE SCROLL REVEAL ── */
    function runReveal() {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.07, rootMargin: '0px 0px -28px 0px' });
      document
        .querySelectorAll(
          '.page.active .rv, .page.active .rvl, .page.active .rvr, .page.active .rv-up, .page.active .rv-left, .page.active .rv-right, .page.active .rv-zoom, .page.active .rv-tilt, .page.active .rv-pop'
        ).forEach(el => {
          if (!el.classList.contains('in')) obs.observe(el);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {

      const themeBtn =
        document.getElementById('themeToggle');

      if (!themeBtn) return;

      function updateThemeIcons() {

        const isDark =
          document.body.classList.contains('dark');

        themeBtn.setAttribute(
          'aria-label',
          isDark ? 'Light Mode' : 'Dark Mode'
        );

      }

      // LOAD SAVED THEME

      if (localStorage.getItem('theme') === 'dark') {

        document.body.classList.add('dark');

      }

      updateThemeIcons();

      // TOGGLE

      themeBtn.addEventListener('click', function () {

        document.body.classList.toggle('dark');

        const isDark =
          document.body.classList.contains('dark');

        localStorage.setItem(
          'theme',
          isDark ? 'dark' : 'light'
        );

        updateThemeIcons();

      });

    });
    runReveal();
  


    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    if (backToTop) backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    lucide.createIcons();

    document.querySelectorAll('.dir-search').forEach(input => {

      input.addEventListener('input', function () {

        const q =
          this.value.toLowerCase().trim();

        const target =
          this.dataset.target;

        document.querySelectorAll('.' + target)
          .forEach(card => {

            const txt =
              card.innerText.toLowerCase();

            card.style.display =
              txt.includes(q)
                ? ''
                : 'none';
          });

      });

    });
  


    lucide.createIcons();
  


    function googleTranslateElementInit() {
      new google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,ur,ar'
        },
        'google_translate_element'
      );
    }
  