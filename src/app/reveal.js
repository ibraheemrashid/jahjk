/**
 * JAHJK Website — Apple-Style Scroll Reveal
 * Uses IntersectionObserver to animate elements as they enter the viewport.
 *
 * CSS classes:
 *   .rv   — fade up from below
 *   .rvl  — slide in from left
 *   .rvr  — slide in from right
 *
 * Stagger delay classes: .d1 .d2 .d3 .d4 .d5 .d6 .d7 .d8
 * Add .in to trigger the animation (added automatically by observer).
 */

function runReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        observer.unobserve(e.target);
      }
    });
  }, {
    threshold: 0.07,
    rootMargin: '0px 0px -28px 0px'
  });

  // Only observe elements in the currently active page
  document.querySelectorAll('.page.active .rv, .page.active .rvl, .page.active .rvr').forEach(el => {
    if (!el.classList.contains('in')) observer.observe(el);
  });
}

window.runReveal = runReveal;

// Run on initial page load
runReveal();
