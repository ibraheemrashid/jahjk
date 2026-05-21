/**
 * JAHJK Website — Photo Carousel
 * Auto-play, touch swipe, dot indicators, responsive columns.
 * Requires: #ct (track), #cd (dots), #cp (prev btn), #cn (next btn)
 */

(function initCarousel() {
  const track = document.getElementById('ct');
  const dotsEl = document.getElementById('cd');
  if (!track || !dotsEl) return;

  const slides = track.querySelectorAll('.car-slide');
  const N = slides.length;
  let cur = 0;

  // Responsive: how many slides visible at once
  const vis = () => window.innerWidth >= 900 ? 3 : window.innerWidth >= 560 ? 2 : 1;

  function buildDots() {
    dotsEl.innerHTML = '';
    const cnt = Math.max(1, N - vis() + 1);
    for (let i = 0; i < cnt; i++) {
      const d = document.createElement('button');
      d.className = 'c-dot' + (i === cur ? ' active' : '');
      d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      d.addEventListener('click', () => goSlide(i));
      dotsEl.appendChild(d);
    }
  }

  function goSlide(idx) {
    const max = Math.max(0, N - vis());
    cur = Math.max(0, Math.min(idx, max));
    const slideWidth = slides[0].getBoundingClientRect().width + 16; // 16px gap
    track.style.transform = `translateX(-${cur * slideWidth}px)`;
    document.querySelectorAll('.c-dot').forEach((d, i) => d.classList.toggle('active', i === cur));
  }

  // Button controls
  const prevBtn = document.getElementById('cp');
  const nextBtn = document.getElementById('cn');
  if (prevBtn) prevBtn.addEventListener('click', () => goSlide(cur - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goSlide(cur + 1 > N - vis() ? 0 : cur + 1));

  // Touch swipe
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = startX - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 48) goSlide(dx > 0 ? cur + 1 : cur - 1);
  });

  // Auto-play
  let timer = setInterval(() => goSlide(cur + 1 > N - vis() ? 0 : cur + 1), 4800);
  track.addEventListener('mouseenter', () => clearInterval(timer));
  track.addEventListener('mouseleave', () => {
    timer = setInterval(() => goSlide(cur + 1 > N - vis() ? 0 : cur + 1), 4800);
  });

  // Rebuild on resize
  window.addEventListener('resize', () => { cur = 0; buildDots(); goSlide(0); });

  buildDots();
})();
