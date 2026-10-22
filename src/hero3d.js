/**
 * ALIVIA INTERNATIONAL HOSPITAL — SIGNATURE 3D HERO EXPERIENCE
 * 
 * Creative Direction:
 * An elegant, abstract organic sculpture inspired by life, wellbeing, and the continuity of care.
 * Constructed with Three.js WebGL:
 * - Flowing parametric double ribbon sculpture (Warm Ivory #F5F1E8 & Sage #DCE5E0)
 * - Concentric core ring (Muted Brass #B68B62)
 * - Deep navy atmospheric environment (#142F43 / #0E1E2E)
 * - Studio lighting setup with realistic depth & soft specular reflections
 * - Subtle pointer-responsive parallax with smooth lerp damping
 * - Full lifecycle optimization: IntersectionObserver pausing when out of view
 * - Respects prefers-reduced-motion & automatic fallback to clinical photography
 */

import * as THREE from 'three';

export function initHero3D() {
  const container = document.getElementById('hero3dContainer');
  const canvas = document.getElementById('hero3dCanvas');
  const photoFallback = document.getElementById('heroPhotoFallback');
  const toggleBtn = document.getElementById('heroVisualToggle');

  if (!container || !canvas) return;

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Check WebGL availability
  if (!isWebGLAvailable()) {
    console.info('ALIVIA: WebGL not available or supported. Displaying clinical photo fallback.');
    container.classList.add('fallback-active');
    return;
  }

  let scene, camera, renderer, sculptureGroup;
  let mainRibbon, coreRing, outerHalo, particles;
  let animationFrameId = null;
  let isVisible = true;
  let isSceneReady = false;

  // Target and current rotation for smooth mouse tracking
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const baseRotation = { x: 0.2, y: 0.4 };

  try {
    // 1. Scene setup
    scene = new THREE.Scene();

    // 2. Camera setup
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;
    camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 3. Renderer setup
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 4. Studio Lighting Rig
    setupStudioLighting(scene);

    // 5. Construct Organic Sculpture
    sculptureGroup = new THREE.Group();
    sculptureGroup.position.set(0, 0, 0);

    // Primary Organic Ribbon (Continuity of Care Knot)
    const ribbonGeometry = new THREE.TorusKnotGeometry(1.45, 0.34, 180, 32, 2, 3);
    const ribbonMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xF5F1E8,          // Warm Ivory
      roughness: 0.26,
      metalness: 0.12,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12,
      sheen: 0.45,
      sheenColor: 0xDCE5E0,     // Sage Mist
      reflectivity: 0.7,
    });
    mainRibbon = new THREE.Mesh(ribbonGeometry, ribbonMaterial);
    mainRibbon.castShadow = true;
    mainRibbon.receiveShadow = true;
    sculptureGroup.add(mainRibbon);

    // Concentric Vital Core Ribbon (Muted Brass Metallic Ring)
    const coreGeometry = new THREE.TorusGeometry(1.2, 0.045, 24, 120);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xB68B62,          // Muted Brass
      metalness: 0.88,
      roughness: 0.22,
    });
    coreRing = new THREE.Mesh(coreGeometry, coreMaterial);
    coreRing.rotation.x = Math.PI / 3;
    coreRing.rotation.y = Math.PI / 6;
    sculptureGroup.add(coreRing);

    // Subtle Outer Orbit Ring (Continuity Halo)
    const haloGeometry = new THREE.TorusGeometry(2.1, 0.018, 16, 140);
    const haloMaterial = new THREE.MeshStandardMaterial({
      color: 0xDCE5E0,          // Sage Mist
      metalness: 0.5,
      roughness: 0.4,
      transparent: true,
      opacity: 0.65,
    });
    outerHalo = new THREE.Mesh(haloGeometry, haloMaterial);
    outerHalo.rotation.x = -Math.PI / 4;
    outerHalo.rotation.y = Math.PI / 5;
    sculptureGroup.add(outerHalo);

    // Subtle Vitality Particle Motes (Soft cellular life energy)
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 5.5;
      positions[i + 1] = (Math.random() - 0.5) * 5.0;
      positions[i + 2] = (Math.random() - 0.5) * 3.5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xB68B62,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    particles = new THREE.Points(particleGeo, particleMat);
    sculptureGroup.add(particles);

    scene.add(sculptureGroup);
    isSceneReady = true;

    // Remove loading placeholder
    container.classList.add('loaded');

  } catch (err) {
    console.warn('ALIVIA: Failed to initialize 3D sculpture, falling back to static photo.', err);
    container.classList.add('fallback-active');
    return;
  }

  // 6. Pointer Parallax Handler (Desktop fine pointers only)
  function onPointerMove(e) {
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    // Clamp normalized values
    mouse.targetX = Math.max(-1, Math.min(1, x)) * 0.45;
    mouse.targetY = Math.max(-1, Math.min(1, y)) * 0.35;
  }

  function onPointerLeave() {
    mouse.targetX = 0;
    mouse.targetY = 0;
  }

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    container.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerleave', onPointerLeave, { passive: true });
  }

  // Touch Drag Interaction for Mobile/Tablet
  let touchStartX = 0;
  let touchStartY = 0;
  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) {
      const deltaX = (e.touches[0].clientX - touchStartX) * 0.003;
      const deltaY = (e.touches[0].clientY - touchStartY) * 0.003;
      mouse.targetX = Math.max(-1, Math.min(1, deltaX));
      mouse.targetY = Math.max(-1, Math.min(1, deltaY));
    }
  }, { passive: true });

  // 7. Render Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    if (!isVisible) return;

    animationFrameId = requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    if (!prefersReducedMotion) {
      // Smooth lerp towards target mouse interaction
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Slow, poised organic rotation
      mainRibbon.rotation.x = baseRotation.x + Math.sin(elapsedTime * 0.35) * 0.12 + mouse.y * 0.5;
      mainRibbon.rotation.y = baseRotation.y + elapsedTime * 0.22 + mouse.x * 0.6;
      mainRibbon.position.y = Math.sin(elapsedTime * 0.6) * 0.08;

      // Concentric core ring counter-rotation
      coreRing.rotation.y = -elapsedTime * 0.3 + mouse.x * 0.4;
      coreRing.rotation.z = Math.sin(elapsedTime * 0.5) * 0.15;

      // Outer halo subtle precession
      outerHalo.rotation.z = elapsedTime * 0.12;

      // Particle motes floating
      if (particles) {
        particles.rotation.y = elapsedTime * 0.04;
      }
    }

    renderer.render(scene, camera);
  }

  // Start loop if not reduced motion, otherwise render single frame
  if (prefersReducedMotion) {
    mainRibbon.rotation.set(baseRotation.x, baseRotation.y, 0);
    renderer.render(scene, camera);
  } else {
    animate();
  }

  // 8. Lifecycle Optimization: IntersectionObserver
  // Pauses 3D render loop when hero is scrolled out of view (0% GPU/CPU overhead)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animationFrameId && !prefersReducedMotion) {
        clock.start();
        animate();
      } else if (!isVisible && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    });
  }, { threshold: 0.05 });

  observer.observe(container);

  // 9. Resize Handling
  function onWindowResize() {
    if (!container || !renderer || !camera) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w === 0 || h === 0) return;

    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    }
  }

  window.addEventListener('resize', onWindowResize, { passive: true });

  // 10. Interactive View Toggle (3D Sculpture <-> Clinical Photo)
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const is3DActive = container.classList.toggle('view-photo-mode');
      const isPhoto = container.classList.contains('view-photo-mode');
      
      toggleBtn.setAttribute('aria-pressed', isPhoto ? 'true' : 'false');
      const label = toggleBtn.querySelector('.toggle-label');
      if (label) {
        label.textContent = isPhoto ? 'Xem tác phẩm 3D' : 'Xem ảnh bệnh viện';
      }

      // If photo active, pause render loop to save power
      if (isPhoto && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      } else if (!isPhoto && !animationFrameId && !prefersReducedMotion) {
        animate();
      }
    });
  }
}

/**
 * Setup refined studio 3-point lighting matching ALIVIA's warm ivory & deep navy aesthetic
 */
function setupStudioLighting(scene) {
  // Ambient fill
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.85);
  scene.add(ambientLight);

  // Key Light: Warm Ivory / Gold
  const keyLight = new THREE.DirectionalLight(0xFFF6E8, 2.4);
  keyLight.position.set(5, 6, 6);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  keyLight.shadow.bias = -0.0001;
  scene.add(keyLight);

  // Fill Light: Soft Sage Mist
  const fillLight = new THREE.DirectionalLight(0xDCE5E0, 1.3);
  fillLight.position.set(-6, -2, 4);
  scene.add(fillLight);

  // Rim / Backlight: Muted Brass
  const rimLight = new THREE.DirectionalLight(0xB68B62, 2.8);
  rimLight.position.set(1, 6, -5);
  scene.add(rimLight);

  // Subtle ground bounce light
  const bounceLight = new THREE.PointLight(0x142F43, 1.2, 12);
  bounceLight.position.set(0, -4, 2);
  scene.add(bounceLight);
}

/**
 * Check if WebGL is supported
 */
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}
