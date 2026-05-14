/* =================================================================
   DRAGONFLY HEALTH — main.js
   - Mobile menu toggle (a11y: aria-expanded)
   - Header shadow on scroll
   - Smooth scroll for in-page anchors
   - Slick init left as no-op (sliders not active on this build)
   ================================================================= */

(function () {
    'use strict';

    /* ---------- Mobile menu toggle ---------- */
    var menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            var isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', String(!isOpen));
            document.body.classList.toggle('menu-open');
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
                menuToggle.focus();
            }
        });
    }

    /* ---------- Header shadow on scroll ---------- */
    var header = document.querySelector('.header-area');
    if (header) {
        var onScroll = function () {
            header.classList.toggle('is-scrolled', window.scrollY > 8);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ---------- Smooth scroll for in-page anchors ---------- */
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var id = link.getAttribute('href').slice(1);
            var target = document.getElementById(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }
        });
    });

})();
