(function () {
  'use strict';
  const nav      = document.getElementById('site-nav');
  const toggle   = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const allLinks = navLinks ? navLinks.querySelectorAll('a') : [];

  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 10);
    updateActiveLink();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen.toString());
      toggle.innerHTML = isOpen ? '&times;' : '&#9776;';
    });
  }

  allLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navLinks) navLinks.classList.remove('open');
      if (toggle) { toggle.innerHTML = '&#9776;'; toggle.setAttribute('aria-expanded', 'false'); }
    });
  });

  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;
    let current = '';
    sections.forEach(function (s) { if (window.scrollY >= s.offsetTop - 90) current = s.id; });
    allLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }
})();
