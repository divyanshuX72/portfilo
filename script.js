/* ═══════════════════════════════════════════════════════════
   DIVYANSHU KANOJIYA — PORTFOLIO SCRIPTS
   Three.js · Particles.js · AOS · Typewriter · Interactivity
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── AOS INIT ───
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        disable: 'mobile'
    });

    // ─── NAVBAR SCROLL ───
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    const sections = document.querySelectorAll('.section, .hero-section');
    const navLinks = document.querySelectorAll('.nav-link');

    function onScroll() {
        const scrollY = window.scrollY;
        navbar.classList.toggle('scrolled', scrollY > 60);
        backToTop.classList.toggle('visible', scrollY > 500);
        let current = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 120;
            if (scrollY >= top) current = sec.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ─── HAMBURGER MENU ───
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // ─── TYPEWRITER ───
    const typewriterEl = document.getElementById('typewriter');
    const phrases = [
        'Frontend Developer',
        'Full Stack Developer',
        'AI Project Builder',
        'Web Application Engineer',
        'Creative UI Designer'
    ];
    let phraseIdx = 0, charIdx = 0, isDeleting = false;

    function typewrite() {
        const current = phrases[phraseIdx];
        if (isDeleting) {
            typewriterEl.textContent = current.substring(0, charIdx--);
            if (charIdx < 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                setTimeout(typewrite, 400);
                return;
            }
            setTimeout(typewrite, 35);
        } else {
            typewriterEl.textContent = current.substring(0, charIdx++);
            if (charIdx > current.length) {
                isDeleting = true;
                setTimeout(typewrite, 2200);
                return;
            }
            setTimeout(typewrite, 75);
        }
    }
    typewrite();

    // ─── STAT COUNTER ───
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                animateCount(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCount(el, target) {
        const duration = 2000;
        const start = performance.now();
        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    // ─── SKILL BARS ───
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.getAttribute('data-width') + '%';
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });
    skillBars.forEach(bar => skillObserver.observe(bar));

    // ─── GITHUB PROJECTS LOADER ───
    const GITHUB_USERNAME = 'divyanshuX72';
    const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

    // Curated/highlighted projects (manually specified — may not yet be on GitHub)
    const CURATED_PROJECTS = [
        {
            name: 'Playwright-Web-Automation-Framework',
            displayName: 'Playwright Web Automation Framework',
            description: 'A robust end-to-end web automation testing framework built with Playwright. Supports cross-browser testing, CI/CD integration, and parallel test execution.',
            language: 'JavaScript',
            topics: ['automation', 'playwright', 'testing', 'web'],
            githubUrl: 'https://github.com/divyanshuX72/Playwright-Web-Automation-Framework',
            featured: true,
            icon: 'fas fa-robot',
            categories: ['automation', 'web']
        },
        {
            name: 'BlueHeaven-Guard',
            displayName: 'BlueHeaven Guard — Smart Branch Safety System',
            description: 'An intelligent smart branch safety & monitoring system with real-time alerts, sensor data analysis, and automated guardian protocols for branch protection.',
            language: 'Python',
            topics: ['python', 'iot', 'security', 'automation'],
            githubUrl: 'https://github.com/divyanshuX72',
            featured: true,
            icon: 'fas fa-shield-alt',
            categories: ['python', 'automation']
        },
        {
            name: 'Wavelength-Enterprise-Site',
            displayName: 'Wavelength Enterprise Site',
            description: 'A full-featured enterprise website for Wavelength — a luxury interior design firm. Features a dark luxury aesthetic, service showcase, and contact system.',
            language: 'HTML',
            topics: ['web', 'html', 'css', 'javascript'],
            githubUrl: 'https://github.com/divyanshuX72',
            featured: true,
            icon: 'fas fa-building',
            categories: ['web']
        },
        {
            name: 'Java-Banking-Application',
            displayName: 'Java Banking Application',
            description: 'A feature-rich Java banking application with OOP architecture, account management, secure transactions, and interest calculation using inheritance and polymorphism.',
            language: 'Java',
            topics: ['java', 'banking', 'oop'],
            githubUrl: 'https://github.com/divyanshuX72',
            featured: true,
            icon: 'fas fa-university',
            categories: ['java']
        },
        {
            name: 'C-Language-Banking-Management-System',
            displayName: 'C Language Banking Management System',
            description: 'Banking Management System in C language that manages customer accounts, deposits, withdrawals, balance inquiry, and transaction records using file handling.',
            language: 'C',
            topics: ['c', 'banking', 'file-handling'],
            githubUrl: 'https://github.com/divyanshuX72/C-Language-Banking-Management-System',
            featured: false,
            icon: 'fas fa-landmark',
            categories: ['web']  // map 'C' to general category
        }
    ];

    // Language/repo name -> filter category mapping
    function getCategories(repo) {
        const lang = (repo.language || '').toLowerCase();
        const name = (repo.name || '').toLowerCase();
        const topics = (repo.topics || []).map(t => t.toLowerCase());
        const cats = new Set();

        if (lang === 'java') cats.add('java');
        if (lang === 'python') cats.add('python');
        if (['html', 'css', 'javascript', 'typescript'].includes(lang)) cats.add('web');
        if (name.includes('playwright') || name.includes('automation') || name.includes('selenium') || topics.includes('automation')) cats.add('automation');
        if (name.includes('wavelength') || name.includes('portfolio') || name.includes('site') || topics.includes('web')) cats.add('web');
        if (topics.includes('python')) cats.add('python');
        if (topics.includes('java')) cats.add('java');

        if (cats.size === 0) cats.add('web'); // fallback
        return [...cats];
    }

    // Language icons / colors
    const LANG_META = {
        'JavaScript': { icon: 'fab fa-js-square', color: '#f7df1e' },
        'TypeScript': { icon: 'fab fa-js-square', color: '#3178c6' },
        'HTML': { icon: 'fab fa-html5', color: '#e44d26' },
        'CSS': { icon: 'fab fa-css3-alt', color: '#1572B6' },
        'Python': { icon: 'fab fa-python', color: '#3776AB' },
        'Java': { icon: 'fab fa-java', color: '#ED8B00' },
        'C': { icon: 'fas fa-code', color: '#A8B9CC' },
        'C++': { icon: 'fas fa-code', color: '#00599C' },
    };

    // Icon for unknown repos
    const REPO_ICONS = {
        'playwright': 'fas fa-robot',
        'banking': 'fas fa-university',
        'wavelength': 'fas fa-building',
        'portfolio': 'fas fa-briefcase',
        'blueheavenguard': 'fas fa-shield-alt',
        'guard': 'fas fa-shield-alt',
        'automation': 'fas fa-cogs',
        'web': 'fas fa-globe',
    };
    function getRepoIcon(name) {
        const lname = name.toLowerCase().replace(/[^a-z]/g, '');
        for (const [key, icon] of Object.entries(REPO_ICONS)) {
            if (lname.includes(key)) return icon;
        }
        return 'fas fa-code-branch';
    }

    function buildProjectCard(project, delay, isCurated = false) {
        const cats = isCurated ? (project.categories || ['web']) : getCategories(project);
        const lang = project.language || 'Code';
        const langMeta = LANG_META[lang] || { icon: 'fas fa-code', color: '#C8A96A' };
        const icon = isCurated ? project.icon : getRepoIcon(project.name);
        const name = isCurated ? project.displayName : project.name.replace(/-/g, ' ');
        const desc = project.description || 'A cool project on GitHub. Click to explore the source code.';
        const url = isCurated ? project.githubUrl : project.html_url;
        const featured = isCurated ? project.featured : false;

        const card = document.createElement('div');
        card.className = 'project-card' + (featured ? ' project-card--featured' : '');
        card.setAttribute('data-categories', cats.join(','));
        card.style.animationDelay = `${delay}ms`;

        card.innerHTML = `
            <div class="project-image">
                <div class="project-image-placeholder" style="--lang-color:${langMeta.color}">
                    <i class="${icon}"></i>
                    ${featured ? '<span class="featured-badge"><i class="fas fa-star"></i> Featured</span>' : ''}
                </div>
                <div class="project-overlay">
                    <a href="${url}" target="_blank" rel="noopener" class="project-link" aria-label="View on GitHub">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </div>
            <div class="project-info">
                <div class="project-meta">
                    <span class="project-lang" style="color:${langMeta.color}">
                        <i class="${langMeta.icon}"></i> ${lang}
                    </span>
                    ${featured ? '<span class="project-featured-tag">⭐ Highlighted</span>' : ''}
                </div>
                <h3 class="project-name">${name}</h3>
                <p class="project-desc">${desc.length > 140 ? desc.slice(0, 140) + '…' : desc}</p>
                <div class="project-footer">
                    <a href="${url}" target="_blank" rel="noopener" class="project-github-link">
                        <i class="fab fa-github"></i> View on GitHub <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `;
        return { card, cats };
    }

    function renderProjects(allProjects) {
        const grid = document.getElementById('projectsGrid');
        const loading = document.getElementById('projectsLoading');
        const cta = document.getElementById('projectsCta');
        const filterBtns = document.querySelectorAll('.filter-btn');

        grid.innerHTML = '';
        const allCards = [];

        allProjects.forEach((proj, i) => {
            const isCurated = proj._curated === true;
            const { card, cats } = buildProjectCard(proj, i * 80, isCurated);
            grid.appendChild(card);
            allCards.push({ card, cats });
        });

        loading.style.display = 'none';
        grid.style.display = 'grid';
        cta.style.display = 'flex';

        // Animate cards in
        setTimeout(() => {
            grid.querySelectorAll('.project-card').forEach((c, i) => {
                setTimeout(() => c.classList.add('card-visible'), i * 80);
            });
        }, 50);

        // ─── FILTER LOGIC ───
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');

                allCards.forEach(({ card, cats }) => {
                    const visible = filter === 'all' || cats.includes(filter);
                    if (visible) {
                        card.classList.remove('hidden');
                        card.style.animation = 'none';
                        card.offsetHeight; // reflow
                        card.style.animation = 'cardFadeInUp 0.45s ease forwards';
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    async function loadProjects() {
        const loading = document.getElementById('projectsLoading');
        const errorEl = document.getElementById('projectsError');

        try {
            const res = await fetch(GITHUB_API);
            if (!res.ok) throw new Error('GitHub API error');
            const githubRepos = await res.json();

            // Filter out forks, sort by updated
            const liveRepos = githubRepos
                .filter(r => !r.fork)
                .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

            // Names of curated projects we already have
            const curatedNames = new Set(CURATED_PROJECTS.map(c => c.name));

            // Mark non-duplicated live repos
            const extraRepos = liveRepos
                .filter(r => !curatedNames.has(r.name))
                .map(r => ({ ...r })); // plain GitHub objects

            // Combine: curated first (marked), then extra GitHub repos
            const curatedMarked = CURATED_PROJECTS.map(c => ({ ...c, _curated: true }));
            const allProjects = [...curatedMarked, ...extraRepos];

            renderProjects(allProjects);
        } catch (err) {
            // Fallback: render curated only
            console.warn('GitHub API failed, using curated projects:', err);
            const curatedMarked = CURATED_PROJECTS.map(c => ({ ...c, _curated: true }));
            try {
                renderProjects(curatedMarked);
            } catch (e) {
                loading.style.display = 'none';
                errorEl.style.display = 'block';
            }
        }
    }

    loadProjects();

    // ─── CONTACT FORM ───
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) {
            formStatus.textContent = 'Please fill in all fields.';
            formStatus.className = 'form-status error';
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            formStatus.textContent = 'Please enter a valid email.';
            formStatus.className = 'form-status error';
            return;
        }

        formStatus.textContent = 'Message sent successfully! ✨';
        formStatus.className = 'form-status success';
        form.reset();
        setTimeout(() => { formStatus.textContent = ''; }, 4000);
    });

    // ─── PARTICLES.JS ───
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 900 } },
                color: { value: ['#C8A96A', '#00FF9C', '#F5E6C8', '#ffffff'] },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true, anim: { enable: true, speed: 0.8, opacity_min: 0.05 } },
                size: { value: 2, random: true, anim: { enable: true, speed: 2, size_min: 0.3 } },
                line_linked: { enable: true, distance: 130, color: '#C8A96A', opacity: 0.1, width: 1 },
                move: { enable: true, speed: 0.8, direction: 'none', random: true, out_mode: 'out' }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 160, line_linked: { opacity: 0.4 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }

    // ─── THREE.JS — ADVANCED 3D HERO SCENE ───
    if (typeof THREE !== 'undefined') {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        // Get the right-panel container size
        const container = canvas.parentElement;
        const W = container.clientWidth || 600;
        const H = container.clientHeight || 520;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 1000);
        camera.position.z = 6;

        // ── LIGHTS ──
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xC8A96A, 2, 20); // Gold
        pointLight1.position.set(4, 4, 4);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x00FF9C, 1.5, 20); // Neon
        pointLight2.position.set(-4, -2, 3);
        scene.add(pointLight2);

        const pointLight3 = new THREE.PointLight(0x0B1F3A, 1, 15); // Navy
        pointLight3.position.set(0, -4, -2);
        scene.add(pointLight3);

        // ── HELPER: wireframe mesh ──
        function makeWire(geometry, color, opacity = 0.7) {
            return new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                color, wireframe: true, transparent: true, opacity
            }));
        }

        // ── HELPER: solid mesh ──
        function makeSolid(geometry, color, emissive = 0x000000) {
            return new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
                color,
                emissive,
                emissiveIntensity: 0.4,
                shininess: 90,
                transparent: true,
                opacity: 0.85
            }));
        }

        // ── OBJECTS ARRAY ──
        const objects = [];

        // 1. Central rotating icosahedron (wireframe gold)
        const icoGeo = new THREE.IcosahedronGeometry(1.4, 1);
        const icoMesh = makeWire(icoGeo, 0xC8A96A, 0.6);
        scene.add(icoMesh);
        objects.push({ mesh: icoMesh, rx: 0.004, ry: 0.006, orbit: false });

        // Inner icosahedron (wireframe neon, slower counter-spin)
        const innerIcoGeo = new THREE.IcosahedronGeometry(1.0, 0);
        const innerIco = makeWire(innerIcoGeo, 0x00FF9C, 0.35);
        scene.add(innerIco);
        objects.push({ mesh: innerIco, rx: -0.005, ry: -0.003, orbit: false });

        // 2. Floating torus (solid gold) — orbiting
        const torusGeo = new THREE.TorusGeometry(0.5, 0.18, 14, 40);
        const torusMesh = makeSolid(torusGeo, 0xC8A96A, 0xa88b4a);
        torusMesh.position.set(2.4, 1.0, 0);
        scene.add(torusMesh);
        objects.push({ mesh: torusMesh, rx: 0.02, ry: 0.01, orbit: true, orbitR: 2.6, orbitSpeed: 0.006, orbitAngle: 0.0, orbitY: 1.0 });

        // 3. Floating octahedron (wireframe neon) — orbiting
        const octGeo = new THREE.OctahedronGeometry(0.55, 0);
        const octMesh = makeWire(octGeo, 0x00FF9C, 0.8);
        octMesh.position.set(-2.4, -0.8, 0.5);
        scene.add(octMesh);
        objects.push({ mesh: octMesh, rx: 0.01, ry: 0.015, orbit: true, orbitR: 2.5, orbitSpeed: 0.008, orbitAngle: Math.PI, orbitY: -0.8 });

        // 4. Floating box (solid navy emissive) — orbiting
        const boxGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
        const boxMesh = makeSolid(boxGeo, 0x0B1F3A, 0x00FF9C);
        boxMesh.position.set(1.8, -1.6, 0.3);
        scene.add(boxMesh);
        objects.push({ mesh: boxMesh, rx: 0.012, ry: 0.018, orbit: true, orbitR: 2.2, orbitSpeed: 0.007, orbitAngle: Math.PI * 0.5, orbitY: -1.6 });

        // 5. Floating tetrahedron (wireframe gold) — orbiting
        const tetraGeo = new THREE.TetrahedronGeometry(0.6, 0);
        const tetraMesh = makeWire(tetraGeo, 0xdcc48e, 0.8);
        tetraMesh.position.set(-1.6, 1.8, -0.2);
        scene.add(tetraMesh);
        objects.push({ mesh: tetraMesh, rx: 0.014, ry: 0.010, orbit: true, orbitR: 2.4, orbitSpeed: 0.005, orbitAngle: Math.PI * 1.5, orbitY: 1.8 });

        // 6. Floating dodecahedron (solid neon dim) — orbiting
        const dodGeo = new THREE.DodecahedronGeometry(0.42, 0);
        const dodMesh = makeSolid(dodGeo, 0x003322, 0x00FF9C);
        dodMesh.position.set(-0.5, -2.2, 0.8);
        scene.add(dodMesh);
        objects.push({ mesh: dodMesh, rx: 0.016, ry: 0.012, orbit: true, orbitR: 2.3, orbitSpeed: 0.009, orbitAngle: Math.PI * 0.75, orbitY: -2.2 });

        // ── STAR FIELD (background floating dots) ──
        const starGeo = new THREE.BufferGeometry();
        const starCount = 280;
        const starPos = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount * 3; i++) {
            starPos[i] = (Math.random() - 0.5) * 14;
        }
        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        const starMat = new THREE.PointsMaterial({
            color: 0xC8A96A,
            size: 0.025,
            transparent: true,
            opacity: 0.7
        });
        const stars = new THREE.Points(starGeo, starMat);
        scene.add(stars);

        // ── MOUSE TRACKING ──
        let mouseX = 0, mouseY = 0;
        const heroSection = document.getElementById('hero');
        heroSection.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        // ── LIGHT ANIMATION VARS ──
        let lightAngle = 0;

        // ── ANIMATION LOOP ──
        function animate() {
            requestAnimationFrame(animate);

            const t = Date.now() * 0.001;

            // Orbiting light 1 (gold)
            lightAngle += 0.008;
            pointLight1.position.x = Math.cos(lightAngle) * 5;
            pointLight1.position.z = Math.sin(lightAngle) * 5;

            // Pulsing light 2 (neon)
            pointLight2.intensity = 1.5 + Math.sin(t * 1.5) * 0.5;

            // Animate each object
            objects.forEach(obj => {
                obj.mesh.rotation.x += obj.rx;
                obj.mesh.rotation.y += obj.ry;

                if (obj.orbit) {
                    obj.orbitAngle += obj.orbitSpeed;
                    obj.mesh.position.x = Math.cos(obj.orbitAngle) * obj.orbitR;
                    obj.mesh.position.z = Math.sin(obj.orbitAngle) * 0.8;
                    // Bob vertically
                    obj.mesh.position.y = obj.orbitY + Math.sin(t * 1.2 + obj.orbitAngle) * 0.3;
                }
            });

            stars.rotation.y += 0.0003;
            stars.rotation.x += 0.0001;

            // Subtle mouse parallax on the whole scene
            scene.rotation.x += (mouseY * 0.08 - scene.rotation.x) * 0.05;
            scene.rotation.y += (mouseX * 0.12 - scene.rotation.y) * 0.05;

            renderer.render(scene, camera);
        }
        animate();

        // ── RESIZE HANDLER ──
        window.addEventListener('resize', () => {
            const nW = container.clientWidth || window.innerWidth * 0.5;
            const nH = container.clientHeight || 520;
            camera.aspect = nW / nH;
            camera.updateProjectionMatrix();
            renderer.setSize(nW, nH);
        });
    }

    // ─── SMOOTH SCROLL FOR ALL ANCHORS ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
