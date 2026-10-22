/**
 * ALIVIA INTERNATIONAL HOSPITAL — MOTION 3D & INTERACTIVE DEPTH
 * 
 * Implements:
 * 1. Restrained 3D Perspective Hover (Tilt + Specular Glare) for Doctor & Specialty Cards
 * 2. Subtle Scroll-Based Image Depth & Layered Parallax
 * 3. Interactive Patient Journey Progression (4-Step Care Journey)
 * 4. Accessibility compliance: prefers-reduced-motion & touch-friendly checks
 */

export function initMotion3D() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  initScrollRevealObserver(prefersReducedMotion);
  initPatientJourneyProgression(prefersReducedMotion);

  if (isFinePointer && !prefersReducedMotion) {
    init3DPerspectiveHover();
    initScrollImageDepth();
  }
}

/* --------------------------------------------------------------------------
   1. RESTRAINED 3D PERSPECTIVE HOVER
   -------------------------------------------------------------------------- */
function init3DPerspectiveHover() {
  const tiltElements = document.querySelectorAll(
    '.doctor-profile-card, .center-spotlight-card, .spec-item, .featured-story-card'
  );

  tiltElements.forEach(card => {
    // Add 3D container class
    card.classList.add('perspective-3d-active');

    let isHovered = false;
    let rafId = null;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;

    function updateTransform() {
      if (!isHovered && Math.abs(currentRotateX) < 0.05 && Math.abs(currentRotateY) < 0.05) {
        card.style.transform = '';
        return;
      }

      currentRotateX += (targetRotateX - currentRotateX) * 0.12;
      currentRotateY += (targetRotateY - currentRotateY) * 0.12;

      card.style.transform = `perspective(1000px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) translateY(-2px)`;

      rafId = requestAnimationFrame(updateTransform);
    }

    card.addEventListener('pointerenter', () => {
      isHovered = true;
      if (!rafId) {
        rafId = requestAnimationFrame(updateTransform);
      }
    });

    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Restrained tilt angles: maximum ±4.5 degrees
      targetRotateX = ((centerY - y) / centerY) * 4.0;
      targetRotateY = ((x - centerX) / centerX) * 4.5;

      // Update dynamic glare reflection coordinates
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      card.style.setProperty('--glare-x', `${glareX}%`);
      card.style.setProperty('--glare-y', `${glareY}%`);
    });

    card.addEventListener('pointerleave', () => {
      isHovered = false;
      targetRotateX = 0;
      targetRotateY = 0;
    });
  });
}

/* --------------------------------------------------------------------------
   2. SCROLL-BASED IMAGE DEPTH (PARALLAX)
   -------------------------------------------------------------------------- */
function initScrollImageDepth() {
  const parallaxTargets = document.querySelectorAll('.facility-photo, .story-photo, .author-mini-img');
  if (parallaxTargets.length === 0) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const windowHeight = window.innerHeight;

        parallaxTargets.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < windowHeight && rect.bottom > 0) {
            // Calculate progress through viewport (-1 to 1)
            const progress = ((rect.top + rect.height / 2) - windowHeight / 2) / (windowHeight / 2);
            // Gentle offset: max ±8px
            const offset = progress * -8;
            el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
          }
        });

        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* --------------------------------------------------------------------------
   3. SCROLL REVEAL OBSERVER (CONTROLLED OPACITY & DEPTH)
   -------------------------------------------------------------------------- */
function initScrollRevealObserver(prefersReducedMotion) {
  if (prefersReducedMotion) return;

  const revealElements = document.querySelectorAll(
    '.center-spotlight-card, .specialties-directory-grid, .doctors-editorial-grid, .care-journey-flow, .packages-editorial-grid, .health-stories-grid'
  );

  revealElements.forEach(el => {
    el.classList.add('reveal-on-scroll');
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   4. PATIENT JOURNEY INTERACTION (4-STEP PROGRESSION)
   -------------------------------------------------------------------------- */
function initPatientJourneyProgression(prefersReducedMotion) {
  const journeySection = document.getElementById('hanh-trinh');
  if (!journeySection) return;

  const nodes = journeySection.querySelectorAll('.journey-node');
  if (nodes.length === 0) return;

  let activeIndex = 0;
  let autoplayTimer = null;
  let userInteracted = false;

  function setActiveStep(index, fromUser = false) {
    if (fromUser) userInteracted = true;

    activeIndex = index;

    nodes.forEach((node, idx) => {
      const isCurrent = idx === index;
      const isPast = idx < index;

      node.classList.toggle('active-step', isCurrent);
      node.classList.toggle('completed-step', isPast);

      // Accessibility states
      node.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
      node.setAttribute('tabindex', '0');

      const card = node.querySelector('.node-card');
      if (card) {
        if (isCurrent) {
          card.setAttribute('aria-current', 'step');
        } else {
          card.removeAttribute('aria-current');
        }
      }
    });

    // Update progress tracker line width
    const progressTrack = document.getElementById('journeyProgressTrack');
    if (progressTrack) {
      const percentage = (index / (nodes.length - 1)) * 100;
      progressTrack.style.width = `${percentage}%`;
    }
  }

  // Set initial active state to step 0
  setActiveStep(0);

  // Click & Keyboard navigation on each node
  nodes.forEach((node, idx) => {
    node.style.cursor = 'pointer';
    node.setAttribute('role', 'tab');

    node.addEventListener('click', () => {
      setActiveStep(idx, true);
    });

    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActiveStep(idx, true);
      } else if (e.key === 'ArrowRight' && idx < nodes.length - 1) {
        e.preventDefault();
        setActiveStep(idx + 1, true);
        nodes[idx + 1].focus();
      } else if (e.key === 'ArrowLeft' && idx > 0) {
        e.preventDefault();
        setActiveStep(idx - 1, true);
        nodes[idx - 1].focus();
      }
    });
  });

  // Scroll into view trigger: gently highlight progression when scrolled into view
  const journeyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !userInteracted && !prefersReducedMotion) {
        // Start subtle automated demonstration through steps if user hasn't clicked
        let step = 0;
        clearInterval(autoplayTimer);
        autoplayTimer = setInterval(() => {
          if (userInteracted) {
            clearInterval(autoplayTimer);
            return;
          }
          step = (step + 1) % nodes.length;
          setActiveStep(step, false);
          if (step === nodes.length - 1) {
            clearInterval(autoplayTimer); // Stop after one full tour
          }
        }, 3200);
      } else {
        clearInterval(autoplayTimer);
      }
    });
  }, { threshold: 0.25 });

  journeyObserver.observe(journeySection);
}
