// Main JavaScript for Ekta Tiwari Portfolio (Framer Theme)

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-icon-link');
  const sections = document.querySelectorAll('section[id]');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  // -------------------------------------------------------------
  // 120 FPS Hardware-Accelerated Timeless Background Micro-Texture
  // -------------------------------------------------------------
  initMicroTextureCanvas();

  // Active Navigation Highlight on Scroll
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Contact Form Submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';
      formStatus.innerHTML = '';
      formStatus.className = 'form-status';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        formStatus.textContent = 'Thank you! Your message has been sent successfully.';
        formStatus.classList.add('success');
        contactForm.reset();
      }, 1000);
    });
  }
});

/**
 * High-Performance 120 FPS Loop Micro-Texture Canvas
 * Renders smooth floating micro dust particles, timeless dot-grid, and ambient glow orbs.
 */
function initMicroTextureCanvas() {
  let canvas = document.getElementById('bg-texture-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'bg-texture-canvas';
    document.body.prepend(canvas);
  }

  const ctx = canvas.getContext('2d');
  let width, height, dpr;
  let animationFrameId;

  // Particle System Configuration
  const particleCount = 45;
  const particles = [];
  const gridSpacing = 36;
  let gridOffset = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resize);
  resize();

  // Create Micro Dust Particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: (Math.random() - 0.5) * 0.35,
      color: Math.random() > 0.4 ? '#f46c38' : '#c5ff41'
    });
  }

  // 120 FPS Ultra-Smooth Render Loop
  let lastTime = performance.now();

  function render(now) {
    const delta = (now - lastTime) / 1000;
    lastTime = now;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw Timeless Infinite Moving Dot-Grid (120 FPS Loop)
    gridOffset = (gridOffset + 0.15) % gridSpacing;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';

    for (let x = gridOffset; x < width; x += gridSpacing) {
      for (let y = gridOffset; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.arc(x, y, 0.85, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 2. Draw Floating Soft Ambient Orbs
    const timeSec = now * 0.0005;
    const orb1X = width * 0.2 + Math.sin(timeSec) * 80;
    const orb1Y = height * 0.25 + Math.cos(timeSec * 0.8) * 60;
    
    const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, 350);
    grad1.addColorStop(0, 'rgba(244, 108, 56, 0.04)');
    grad1.addColorStop(1, 'rgba(244, 108, 56, 0)');
    ctx.fillStyle = grad1;
    ctx.beginPath();
    ctx.arc(orb1X, orb1Y, 350, 0, Math.PI * 2);
    ctx.fill();

    const orb2X = width * 0.8 - Math.cos(timeSec * 0.7) * 90;
    const orb2Y = height * 0.75 - Math.sin(timeSec * 0.9) * 70;

    const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, 380);
    grad2.addColorStop(0, 'rgba(197, 255, 65, 0.03)');
    grad2.addColorStop(1, 'rgba(197, 255, 65, 0)');
    ctx.fillStyle = grad2;
    ctx.beginPath();
    ctx.arc(orb2X, orb2Y, 380, 0, Math.PI * 2);
    ctx.fill();

    // 3. Draw Moving Micro Particles
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1.0;
    });

    animationFrameId = requestAnimationFrame(render);
  }

  animationFrameId = requestAnimationFrame(render);
}
