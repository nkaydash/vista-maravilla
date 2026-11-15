document.addEventListener('DOMContentLoaded', function () {

  /* ---- sticky nav background on scroll ---- */
  var nav = document.getElementById('siteNav');
  var onScroll = function () {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- mobile nav toggle ---- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- scroll reveal ---- */
  var revealTargets = document.querySelectorAll(
    '.story-grid, .feature-copy, .feature-media--wide, .eco-inner, .bed-card, .included h2, .included-grid, .inquire-panel'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(function (el) { io.observe(el); });

  /* ---- floor plan tabs ---- */
  var tabs = document.querySelectorAll('.layout-tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var targetId = tab.getAttribute('data-target');
      document.querySelectorAll('.layout-tab').forEach(function (t) {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.layout-panel').forEach(function (p) {
        p.classList.remove('is-active');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      document.getElementById(targetId).classList.add('is-active');
    });
  });

  /* ---- lightbox gallery ---- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var closeBtn = document.getElementById('lightboxClose');
  var prevBtn = document.getElementById('lightboxPrev');
  var nextBtn = document.getElementById('lightboxNext');

  var currentGroup = [];
  var currentIndex = 0;

  function collectGroup(name) {
    return Array.prototype.slice.call(
      document.querySelectorAll('.js-lightbox[data-group="' + name + '"]')
    );
  }

  function openLightbox(imgEl) {
    var group = imgEl.getAttribute('data-group');
    currentGroup = collectGroup(group);
    currentIndex = currentGroup.indexOf(imgEl);
    showCurrent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function showCurrent() {
    var el = currentGroup[currentIndex];
    lightboxImg.src = el.src;
    lightboxImg.alt = el.alt || '';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.js-lightbox').forEach(function (img) {
    img.addEventListener('click', function () { openLightbox(img); });
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  prevBtn.addEventListener('click', function () {
    if (!currentGroup.length) return;
    currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
    showCurrent();
  });
  nextBtn.addEventListener('click', function () {
    if (!currentGroup.length) return;
    currentIndex = (currentIndex + 1) % currentGroup.length;
    showCurrent();
  });
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  });

});
