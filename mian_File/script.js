
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
    menuBtn.classList.toggle('open');

    // Animate hamburger to X
    menuBtn.querySelectorAll('span').forEach((span, index) => {
      if(menuBtn.classList.contains('open')) {
        if(index === 0) span.style.transform = 'rotate(45deg) translateY(8px)';
        if(index === 1) span.style.opacity = '0';
        if(index === 2) span.style.transform = 'rotate(-45deg) translateY(-8px)';
      } else {
        span.style.transform = 'rotate(0) translateY(0)';
        span.style.opacity = '1';
      }
    });
  });
  
    // ===== Theme toggle =====
    (function(){
      const root = document.documentElement;
      const btn = document.getElementById('themeToggle');
      const saved = localStorage.getItem('theme-choice') || 'auto';
      setTheme(saved);

      btn.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        setTheme(next);
      });

      function setTheme(mode){
        root.setAttribute('data-theme', mode);
        localStorage.setItem('theme-choice', mode);
      }
    })();

    // ===== Minimal Particle background =====
    (function(){
      const canvas = document.getElementById('particles');
      const ctx = canvas.getContext('2d');
      let width = window.innerWidth, height = window.innerHeight;
      canvas.width = width; canvas.height = height;

      const particles = Array.from({length: 100}, () => ({
        x: Math.random()*width,
        y: Math.random()*height,
        vx: (Math.random()-0.5)*0.6,
        vy: (Math.random()-0.5)*0.6,
        r: 1+Math.random()*2
      }));

      function draw(){
        ctx.clearRect(0,0,width,height);
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--p1').trim();
        for(const p of particles){
          p.x += p.vx; p.y += p.vy;
          if(p.x<0||p.x>width) p.vx*=-1;
          if(p.y<0||p.y>height) p.vy*=-1;
          ctx.beginPath();
          ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
          ctx.fill();
        }
        requestAnimationFrame(draw);
      }
      draw();

      window.addEventListener('resize', ()=>{
        width = window.innerWidth; height = window.innerHeight;
        canvas.width = width; canvas.height = height;
      });
    })();
  


// asghdagjsdgaddgjhgdsajgjdsh



  // JS to duplicate marquee items dynamically for seamless looping
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("marquee-track");
  const clone = track.innerHTML;
  track.innerHTML += clone; // duplicate content

  // Adjust animation speed based on content width
  const totalWidth = track.scrollWidth / 2; // one set width
  const speed = 40; // px per second
  const duration = totalWidth / speed; // seconds

  track.style.animationDuration = `${duration}s`;
});



    (function () {
      const canvas = document.getElementById('particle-canvas');
      const ctx = canvas.getContext('2d');
      let w = canvas.width = innerWidth * devicePixelRatio;
      let h = canvas.height = innerHeight * devicePixelRatio;
      canvas.style.width = innerWidth + 'px';
      canvas.style.height = innerHeight + 'px';
      ctx.scale(devicePixelRatio, devicePixelRatio);

      // Responsive resize
      function resize() {
        w = canvas.width = innerWidth * devicePixelRatio;
        h = canvas.height = innerHeight * devicePixelRatio;
        canvas.style.width = innerWidth + 'px';
        canvas.style.height = innerHeight + 'px';
        ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      }
      addEventListener('resize', resize);

      // particles
      const PARTICLE_COUNT = Math.round(Math.max(24, innerWidth / 40));
      const particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * innerWidth,
          y: Math.random() * innerHeight,
          r: 0.6 + Math.random() * 2.6,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.12,
          alpha: 0.03 + Math.random() * 0.06
        });
      }

      let last = performance.now();
      const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

      function tick(now) {
        const dt = (now - last) / 1000;
        last = now;

        // clear with subtle fade to create trailing glows
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (const p of particles) {
          p.x += p.vx * (60 * dt);
          p.y += p.vy * (60 * dt);

          // wrap edges
          if (p.x < -20) p.x = innerWidth + 20;
          if (p.x > innerWidth + 20) p.x = -20;
          if (p.y < -20) p.y = innerHeight + 20;
          if (p.y > innerHeight + 20) p.y = -20;

          // draw
          ctx.beginPath();
          ctx.fillStyle = 'rgba(255,255,255,' + p.alpha + ')';
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }

        if (!prefersReducedMotion) requestAnimationFrame(tick);
      }

      if (!prefersReducedMotion) requestAnimationFrame(tick);


      /* Animated CSS variable shift for gradient hue cycling.
         This creates the "insane" shifting sheen without heavy paints.
      */
      (function gradientPulse() {
        if (prefersReducedMotion) return;
        const g = document.querySelector('.layer-gradients');
        let angle = 0;
        function frame() {
          angle = (angle + 0.03) % 360;
          g.style.transform = `rotate(${angle}deg) scale(1.02)`;
          requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      })();

      // Small interaction: subtle parallax based on pointer (non-intrusive)
      (function pointerParallax() {
        if (prefersReducedMotion) return;
        const layers = document.querySelectorAll('.layer-gradients, .layer-shimmer');
        window.addEventListener('pointermove', (e) => {
          const px = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
          const py = (e.clientY / innerHeight - 0.5) * 2;
          layers.forEach((el, i) => {
            const depth = (i === 0) ? 12 : 6;
            el.style.transform = `translate3d(${px * depth}px, ${py * depth}px, 0) rotate(${parseFloat(el.style.rotate || 0)}deg)`;
          });
        });
      })();

    })();
  