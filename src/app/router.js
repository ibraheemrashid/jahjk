/**
 * JAHJK Website — Page Router
 * Call go('page-name') to navigate between pages.
 * Page IDs in HTML must follow pattern: id="p-{name}"
 */

function go(name) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show target page
  const page = document.getElementById('p-' + name);
  if (page) {
    page.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Re-run scroll reveal for new page content
    setTimeout(runReveal, 60);
  }

  // Close mobile drawer
  const drawer = document.getElementById('drawer');
  const ham = document.getElementById('ham');
  if (drawer) drawer.classList.remove('open');
  if (ham) ham.classList.remove('open');
  document.body.style.overflow = '';
}

// Expose globally
window.go = go;
