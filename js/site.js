/* ============================================================
   VERPTO — Shared site behaviors (all pages)
   Fade-up reveals · consolidated scroll handler · 3D tilt engine
   · animated counters. Every block guards its own elements, so
   pages only "activate" the features present in their markup.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const fine     = window.matchMedia('(hover: hover) and (pointer: fine)');
  const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ── Intersection Observer for .fade-up animations ──
  const fadeEls = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => observer.observe(el));

  // Stagger children within same parent
  document.querySelectorAll('.row .fade-up').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 0.10}s`;
  });

  // ── Single passive scroll handler: nav highlight, navbar shadow,
  //    business-card float + back-to-top visibility ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-verpto .nav-link');
  const navbar   = document.querySelector('.navbar-verpto');
  const bcFloat  = document.getElementById('bcFloat');
  const backTop  = document.getElementById('backTop');
  let scrollRaf = null;

  const onScroll = () => {
    scrollRaf = null;
    const y = window.scrollY;

    // Highlight only applies to pages with anchored sections (the homepage);
    // detail pages keep their hardcoded active link.
    if (sections.length) {
      let current = '';
      sections.forEach(sec => {
        if (y >= sec.offsetTop - 80) current = sec.id;
      });
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
      });
    }

    if (navbar) {
      navbar.style.boxShadow = y > 20
        ? '0 4px 30px rgba(26,37,48,0.12)'
        : '0 2px 20px rgba(26,37,48,0.06)';
    }

    if (bcFloat) bcFloat.classList.toggle('bc-float--visible', y > 300);
    if (backTop) backTop.classList.toggle('back-top--show', y > 600);
  };

  window.addEventListener('scroll', () => {
    if (!scrollRaf) scrollRaf = requestAnimationFrame(onScroll);
  }, { passive: true });
  onScroll();

  // ── 3D Tilt Engine ──
  // Drives --rx/--ry (rotation) and --mx/--my (cursor spotlight) on
  // [data-tilt] elements. Skipped entirely on touch devices and for
  // users who prefer reduced motion.
  if (fine.matches && !noMotion.matches) {
    document.querySelectorAll('[data-tilt]').forEach(panel => {
      const max = parseFloat(panel.dataset.tiltMax) || 7;
      let raf = null, px = 0.5, py = 0.5;

      const render = () => {
        raf = null;
        panel.style.setProperty('--rx', ((0.5 - py) * max * 2).toFixed(2) + 'deg');
        panel.style.setProperty('--ry', ((px - 0.5) * max * 2).toFixed(2) + 'deg');
        panel.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        panel.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      };

      panel.addEventListener('pointerenter', () => {
        panel.classList.remove('tilt-settle');
      });

      panel.addEventListener('pointermove', (e) => {
        const r = panel.getBoundingClientRect();
        px = (e.clientX - r.left) / r.width;
        py = (e.clientY - r.top) / r.height;
        if (!raf) raf = requestAnimationFrame(render);
      });

      panel.addEventListener('pointerleave', () => {
        if (raf) { cancelAnimationFrame(raf); raf = null; }
        panel.classList.add('tilt-settle');
        panel.style.setProperty('--rx', '0deg');
        panel.style.setProperty('--ry', '0deg');
      });
    });
  }

  // ── Project carousel: character-select style, native-scroll powered ──
  // Real scroll-snap drives the motion, so cards live in true flow layout
  // and can never visually cross or overlap mid-transition. The item set
  // is cloned before and after itself to fake an infinite loop: whenever
  // the scroll position drifts deep into a clone, scrollLeft silently
  // jumps by one full set-width — invisible, since the clone is pixel-
  // identical to the real card it's landing on. Distance-from-center is
  // recomputed every scroll frame to drive continuous scale/opacity/
  // saturation dimming, so arrow clicks, drag, trackpad, and touch swipe
  // all feed the exact same smooth visual system.
  const stage = document.getElementById('projStage');
  if (stage) {
    const prevBtn = document.getElementById('projPrev');
    const nextBtn = document.getElementById('projNext');
    const realItems = Array.from(stage.children);
    const n = realItems.length;

    if (n > 0) {
      const cloneSet = () => realItems.map(el => {
        const c = el.cloneNode(true);
        c.setAttribute('aria-hidden', 'true');
        c.querySelectorAll('a, button').forEach(f => { f.tabIndex = -1; });
        return c;
      });
      const before = cloneSet();
      const after  = cloneSet();

      stage.innerHTML = '';
      before.forEach(el => stage.appendChild(el));
      realItems.forEach(el => stage.appendChild(el));
      after.forEach(el => stage.appendChild(el));

      const allItems = Array.from(stage.children);

      const getStep = () => {
        const gapPx = parseFloat(getComputedStyle(stage).columnGap) || 24;
        return allItems[0].getBoundingClientRect().width + gapPx;
      };

      // Single source of truth for "centered": the scrollLeft that puts an
      // item's midpoint at the stage's visual midpoint, measured the same
      // way (offsetLeft, stage's own coordinate space) everywhere it's
      // used — initial placement, resize, and peek-click all agree with
      // what updateDim() considers distance 0, so nothing can drift out
      // of sync with what's actually being scaled/dimmed.
      const centerOf = (el) => el.offsetLeft + el.offsetWidth / 2 - stage.clientWidth / 2;

      // Continuous dimming: distance is measured in "steps" from the
      // stage's visual center. Within one step (the 3 active cards) scale
      // eases from 1 down to ~0.94; beyond that it keeps fading toward the
      // half-lit peek look, matching the reference "character select" feel.
      const updateDim = () => {
        const stageRect = stage.getBoundingClientRect();
        const centerX = stageRect.left + stageRect.width / 2;
        const step = getStep();
        allItems.forEach(el => {
          const r = el.getBoundingClientRect();
          const dist = Math.abs((r.left + r.width / 2) - centerX) / step;
          let scale, opacity, sat, bright;
          if (dist <= 1) {
            scale = 1 - 0.06 * dist;
            opacity = 1;
            sat = 1;
            bright = 1;
          } else {
            const d2 = Math.min(dist - 1, 2);
            scale = 0.94 - 0.1 * d2;
            opacity = Math.max(1 - 0.55 * d2, 0.18);
            sat = Math.max(1 - 0.4 * d2, 0.4);
            bright = Math.max(1 - 0.25 * d2, 0.55);
          }
          el.style.transform = `scale(${scale.toFixed(3)})`;
          el.style.opacity = opacity.toFixed(3);
          el.style.filter = `saturate(${sat.toFixed(2)}) brightness(${bright.toFixed(2)})`;
          el.style.zIndex = String(Math.max(50 - Math.round(dist * 10), 1));
        });
      };

      // Whichever item's midpoint is nearest the stage's current center —
      // used for arrow-key sibling targeting, wrap detection, and the
      // click-to-select "is this already centered" check. All exact
      // element positions, never an approximated step distance, so there's
      // no floating-point drift for scroll-snap to fight with.
      const nearestItem = () => {
        const mid = stage.scrollLeft + stage.clientWidth / 2;
        let closest = allItems[0], best = Infinity;
        allItems.forEach(el => {
          const d = Math.abs((el.offsetLeft + el.offsetWidth / 2) - mid);
          if (d < best) { best = d; closest = el; }
        });
        return closest;
      };

      // Once scroll settles, snap back into the middle copy if we've
      // drifted into a clone — always lands on pixel-identical content,
      // since setWidth is measured from real element positions.
      const checkWrap = () => {
        const setWidth = allItems[n].offsetLeft - allItems[0].offsetLeft;
        const maxScroll = stage.scrollWidth - stage.clientWidth;
        if (stage.scrollLeft < setWidth * 0.5) {
          stage.scrollLeft += setWidth;
        } else if (stage.scrollLeft > maxScroll - setWidth * 0.5) {
          stage.scrollLeft -= setWidth;
        }
      };

      let dimRaf = null;
      let settleTimer = null;
      stage.addEventListener('scroll', () => {
        if (!dimRaf) dimRaf = requestAnimationFrame(() => { dimRaf = null; updateDim(); });
        clearTimeout(settleTimer);
        settleTimer = setTimeout(checkWrap, 120);
      }, { passive: true });

      // Move exactly one card over from wherever we currently are, using
      // the real DOM sibling — guaranteed to land precisely on the next
      // scroll-snap point regardless of any sub-pixel rounding.
      const scrollByStep = (dir) => {
        const idx = allItems.indexOf(nearestItem());
        const target = allItems[idx + dir];
        if (target) stage.scrollTo({ left: centerOf(target), behavior: 'smooth' });
      };

      const pulse = (btn) => {
        btn.classList.remove('rail-btn--pulse');
        void btn.offsetWidth; // restart the animation even on rapid re-clicks
        btn.classList.add('rail-btn--pulse');
      };

      prevBtn.addEventListener('click', () => { scrollByStep(-1); pulse(prevBtn); });
      nextBtn.addEventListener('click', () => { scrollByStep(1); pulse(nextBtn); });

      // Clicking a dimmed peek brings it to center, like tapping a side
      // character in a select screen; clicking the already-centered card
      // behaves like a normal link/button.
      stage.addEventListener('click', (e) => {
        const item = e.target.closest('.project-carousel-item');
        if (!item) return;
        if (item !== nearestItem()) {
          e.preventDefault();
          stage.scrollTo({ left: centerOf(item), behavior: 'smooth' });
        }
      });

      // Land on the real (middle-copy) first item instantly on load, and
      // keep whichever item is currently nearest-center centered across
      // breakpoint changes that resize --pc-w.
      const recenterOnResize = () => {
        stage.scrollLeft = centerOf(nearestItem());
        updateDim();
      };

      requestAnimationFrame(() => {
        stage.scrollLeft = centerOf(realItems[0]);
        updateDim();
      });
      window.addEventListener('resize', recenterOnResize, { passive: true });
    }
  }

  // ── Animated stat counters ──
  // Counts each number up from 0 the first time it scrolls into view,
  // preserving any suffix ("+", "%"). Skipped for reduced-motion users.
  if (!noMotion.matches) {
    const counterEls = document.querySelectorAll('.stat-number, .hero-stat-num');
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        counterObs.unobserve(entry.target);

        const el = entry.target;
        const m  = el.textContent.trim().match(/^(\d+)(.*)$/);
        if (!m) return;

        const target = parseInt(m[1], 10);
        const suffix = m[2];
        const dur    = 1400;
        const t0     = performance.now();

        const tick = (now) => {
          const p     = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    counterEls.forEach(el => counterObs.observe(el));
  }

});
