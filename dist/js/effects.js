//
// Visual effects: scroll progress, reveal-on-scroll, typewriter,
// hero particle constellation, cursor glow, back-to-top
//

// Mark that JS is running so CSS can safely hide .reveal elements.
// (Without this class everything stays visible — content never depends on JS.)
document.documentElement.classList.add('js-reveal');

document.addEventListener('DOMContentLoaded', function () {

    //------------ Scroll progress bar + back-to-top ------------
    const progress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');

    function onScroll() {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progress) {
            progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
        }
        if (backToTop) {
            backToTop.classList.toggle('show', window.scrollY > 600);
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    //------------ Reveal-on-scroll ------------
    // Stagger children inside any [data-stagger] container
    document.querySelectorAll('[data-stagger]').forEach(function (container) {
        container.querySelectorAll('.reveal').forEach(function (el, i) {
            el.style.setProperty('--reveal-delay', (i * 0.08) + 's');
        });
    });

    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
        revealEls.forEach(function (el) { io.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('revealed'); });
    }

    //------------ Typewriter in the hero ------------
    const roles = [
        'Full-Stack Developer',
        'C# / .NET / SQL Server',
        'Embedded Systems',
        'Swarm Robotics Research'
    ];
    const tw = document.getElementById('typewriter');
    if (tw) {
        let roleIdx = 0;
        let chars = 0;
        let deleting = false;

        (function tick() {
            const word = roles[roleIdx];
            chars += deleting ? -1 : 1;
            tw.textContent = word.slice(0, chars);

            let delay = deleting ? 40 : 85;
            if (!deleting && chars === word.length) {
                delay = 1900;
                deleting = true;
            } else if (deleting && chars === 0) {
                deleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
                delay = 350;
            }
            setTimeout(tick, delay);
        })();
    }

    //------------ Cursor spotlight ------------
    const glow = document.getElementById('cursor-glow');
    if (glow && window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('mousemove', function (e) {
            glow.style.setProperty('--cx', e.clientX + 'px');
            glow.style.setProperty('--cy', e.clientY + 'px');
        }, { passive: true });
    }

    //------------ Hero particle constellation ------------
    const canvas = document.getElementById('hero-canvas');
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext('2d');
        const LINK_DIST = 130;
        const mouse = { x: -9999, y: -9999 };
        let width = 0;
        let height = 0;
        let particles = [];

        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = canvas.clientWidth;
            height = canvas.clientHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function spawn() {
            const count = Math.min(90, Math.floor((width * height) / 16000));
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.35,
                    vy: (Math.random() - 0.5) * 0.35,
                    r: Math.random() * 1.7 + 0.6,
                    color: Math.random() < 0.5 ? '139,92,246' : '34,211,238'
                });
            }
        }

        canvas.parentElement.addEventListener('mousemove', function (e) {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        }, { passive: true });
        canvas.parentElement.addEventListener('mouseleave', function () {
            mouse.x = -9999;
            mouse.y = -9999;
        });

        function frame() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Gentle pull toward the cursor
                const mdx = mouse.x - p.x;
                const mdy = mouse.y - p.y;
                const mdist = Math.hypot(mdx, mdy);
                if (mdist < 220 && mdist > 0.001) {
                    p.vx += (mdx / mdist) * 0.012;
                    p.vy += (mdy / mdist) * 0.012;
                }

                // Cap speed so cursor pull never runs away
                const speed = Math.hypot(p.vx, p.vy);
                if (speed > 0.8) {
                    p.vx = (p.vx / speed) * 0.8;
                    p.vy = (p.vy / speed) * 0.8;
                }

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) { p.vx *= -1; }
                if (p.y < 0 || p.y > height) { p.vy *= -1; }
                p.x = Math.max(0, Math.min(width, p.x));
                p.y = Math.max(0, Math.min(height, p.y));

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(' + p.color + ',0.6)';
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const q = particles[j];
                    const dx = p.x - q.x;
                    const dy = p.y - q.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < LINK_DIST) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.strokeStyle = 'rgba(' + p.color + ',' + (0.14 * (1 - dist / LINK_DIST)) + ')';
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(frame);
        }

        resize();
        spawn();
        window.addEventListener('resize', function () {
            resize();
            spawn();
        });
        requestAnimationFrame(frame);
    }
});
