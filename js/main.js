/* ==========================================================================
   HockeyRules — navigation, scroll behaviour, video facades
   ========================================================================== */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- header */
  var header = document.getElementById('siteHeader');
  var progress = document.getElementById('scrollProgress');

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;

    if (header) {
      header.classList.toggle('is-stuck', y > 24);
    }

    if (progress) {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (y / max) * 100 : 0;
      progress.style.width = Math.min(100, Math.max(0, pct)) + '%';
    }
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) { return; }
    ticking = true;
    window.requestAnimationFrame(function () {
      onScroll();
      ticking = false;
    });
  }, { passive: true });
  onScroll();

  /* ------------------------------------------------------------ mobile nav */
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('primaryNav');

  function closeNav() {
    if (!nav || !navToggle) { return; }
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (link) { closeNav(); }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeNav(); }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) { closeNav(); }
    });
  }

  /* ---------------------------------------------- scroll spy + offset links */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.primary-nav a[href^="#"]')
  );
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      return el ? { link: link, el: el } : null;
    })
    .filter(Boolean);

  function headerOffset() {
    return header ? header.offsetHeight : 72;
  }

  function spy() {
    if (!sections.length) { return; }
    var pos = (window.pageYOffset || 0) + headerOffset() + 90;
    var active = sections[0];

    sections.forEach(function (s) {
      if (s.el.offsetTop <= pos) { active = s; }
    });

    // bottom of page: force the last section active
    if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 4) {
      active = sections[sections.length - 1];
    }

    navLinks.forEach(function (l) { l.classList.remove('is-active'); });
    if (active) { active.link.classList.add('is-active'); }
  }

  window.addEventListener('scroll', function () {
    window.requestAnimationFrame(spy);
  }, { passive: true });
  spy();

  // offset anchor jumps so the fixed header never covers a heading
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) { return; }
    var id = a.getAttribute('href');
    if (!id || id === '#' || id.length < 2) { return; }
    var target = document.getElementById(id.slice(1));
    if (!target) { return; }

    e.preventDefault();
    var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset() + 1;
    window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
    if (history.replaceState) { history.replaceState(null, '', id); }
  });

  /* -------------------------------------------------------- reveal on scroll */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 6, 5) * 55 + 'ms';
      io.observe(el);
    });
  }

  /* ---------------------------------------------------- video click-to-load */
  function loadVideo(frame) {
    var id = frame.getAttribute('data-video');
    if (!id || frame.querySelector('iframe')) { return; }

    var title = frame.getAttribute('data-title') ||
      (frame.closest('.video-card') ? frame.closest('.video-card').querySelector('h4').textContent : 'Rule video');

    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + id +
      '?autoplay=1&rel=0&modestbranding=1';
    iframe.title = title.trim();
    iframe.loading = 'lazy';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');

    frame.innerHTML = '';
    frame.appendChild(iframe);
  }

  document.addEventListener('click', function (e) {
    var play = e.target.closest('.video-play');
    if (!play) { return; }
    var frame = play.closest('.video-frame');
    if (!frame) { return; }
    e.preventDefault();
    loadVideo(frame);
  });

  /* ------------------------------------------- keyboard: alt/return on card */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') { return; }
    var frame = e.target.closest && e.target.closest('.video-frame');
    if (!frame || e.target.closest('.video-play')) { return; }
    if (e.target === frame) {
      e.preventDefault();
      loadVideo(frame);
    }
  });

  /* -------------------------------------------- hero rink parallax (subtle) */
  var heroFigure = document.querySelector('.hero-figure');
  if (heroFigure && !reduceMotion && window.matchMedia('(min-width: 1001px)').matches) {
    var raf = false;
    window.addEventListener('scroll', function () {
      if (raf) { return; }
      raf = true;
      window.requestAnimationFrame(function () {
        var y = window.pageYOffset || 0;
        if (y < 900) {
          heroFigure.style.transform = 'translateY(' + (y * 0.055) + 'px)';
        }
        raf = false;
      });
    }, { passive: true });
  }

  /* ---------------------------------------------- deep link on first paint */
  if (location.hash && location.hash.length > 1) {
    var first = document.getElementById(location.hash.slice(1));
    if (first) {
      window.setTimeout(function () {
        var top = first.getBoundingClientRect().top + window.pageYOffset - headerOffset() + 1;
        window.scrollTo({ top: top, behavior: 'auto' });
      }, 60);
    }
  }
})();
