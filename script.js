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

    function onScroll() {
        const scrollY = window.scrollY;
        navbar.classList.toggle('scrolled', scrollY > 60);
        backToTop.classList.toggle('visible', scrollY > 500);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ─── SIDEBAR NAVIGATION ───
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeLabel = document.querySelector('.theme-label');

    function openSidebar() {
        hamburger.classList.add('active');
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.classList.add('sidebar-open');
    }

    function closeSidebar() {
        hamburger.classList.remove('active');
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    }

    hamburger.addEventListener('click', () => {
        if (sidebar.classList.contains('active')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    sidebarClose.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    // Close sidebar on nav link click & smooth scroll
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeSidebar();
        });
    });

    // Close sidebar on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });

    // Update sidebar active link on scroll
    function updateSidebarActiveLink() {
        let current = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 120;
            if (window.scrollY >= top) current = sec.getAttribute('id');
        });
        sidebarLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }

    window.addEventListener('scroll', updateSidebarActiveLink, { passive: true });
    updateSidebarActiveLink();

    // ─── DARK/LIGHT THEME TOGGLE ───
    let isDarkMode = true;

    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        if (isDarkMode) {
            document.documentElement.style.setProperty('--bg', '#0a0a0a');
            document.documentElement.style.setProperty('--bg-card', '#111111');
            document.documentElement.style.setProperty('--text-primary', '#E8E8E8');
            document.documentElement.style.setProperty('--text-secondary', '#999999');
            document.documentElement.style.setProperty('--white', '#FFFFFF');
            themeIcon.className = 'fas fa-moon';
            themeLabel.textContent = 'Dark Mode';
        } else {
            document.documentElement.style.setProperty('--bg', '#f5f5f5');
            document.documentElement.style.setProperty('--bg-card', '#ffffff');
            document.documentElement.style.setProperty('--text-primary', '#1a1a1a');
            document.documentElement.style.setProperty('--text-secondary', '#555555');
            document.documentElement.style.setProperty('--white', '#1a1a1a');
            themeIcon.className = 'fas fa-sun';
            themeLabel.textContent = 'Light Mode';
        }
        // Trigger icon rotation animation
        themeIcon.style.transform = 'rotate(360deg)';
        setTimeout(() => { themeIcon.style.transform = 'rotate(0deg)'; }, 500);
    });

    // ─── TYPEWRITER ───
    const typewriterEl = document.getElementById('typewriter');
    const phrases = [
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

    // ─── HACKER SKILL BARS ───
    const hackerSkillFills = document.querySelectorAll('.skill-fill-hack');
    const hackerSkillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target.closest('.terminal-panel');
                if (container && !container.classList.contains('skills-animated')) {
                    container.classList.add('skills-animated');
                    const items = container.querySelectorAll('.hacker-skill-item');
                    items.forEach((item, idx) => {
                        setTimeout(() => {
                            const fill = item.querySelector('.skill-fill-hack');
                            const glow = item.querySelector('.skill-bar-glow');
                            const w = fill.getAttribute('data-width') + '%';
                            fill.style.setProperty('--fill-width', w);
                            fill.classList.add('active');
                            fill.style.width = w;
                            if (glow) glow.style.width = w;
                        }, idx * 300);
                    });
                }
                hackerSkillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    document.querySelectorAll('.terminal-panel').forEach(panel => hackerSkillObserver.observe(panel));

    // ─── SKILL CATEGORY FILTER TABS ───
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillPanels = document.querySelectorAll('.terminal-panel[data-skill-category]');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            skillTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.getAttribute('data-category');

            skillPanels.forEach(panel => {
                const panelCategory = panel.getAttribute('data-skill-category');

                if (category === 'all' || panelCategory === category) {
                    panel.classList.remove('skill-hidden');
                    panel.classList.add('skill-visible');

                    // Re-trigger progress bar animation for newly visible panels
                    if (!panel.classList.contains('skills-animated')) {
                        panel.classList.add('skills-animated');
                        const items = panel.querySelectorAll('.hacker-skill-item');
                        items.forEach((item, idx) => {
                            setTimeout(() => {
                                const fill = item.querySelector('.skill-fill-hack');
                                const glow = item.querySelector('.skill-bar-glow');
                                const w = fill.getAttribute('data-width') + '%';
                                fill.style.setProperty('--fill-width', w);
                                fill.classList.add('active');
                                fill.style.width = w;
                                if (glow) glow.style.width = w;
                            }, idx * 200);
                        });
                    }
                } else {
                    panel.classList.add('skill-hidden');
                    panel.classList.remove('skill-visible');
                }
            });
        });
    });

    // ─── MATRIX RAIN CANVAS ───
    const matrixCanvas = document.getElementById('matrixCanvas');
    if (matrixCanvas) {
        const mCtx = matrixCanvas.getContext('2d');
        const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`アイウエオカキクケコサシスセソタチツテトナニヌネノ';
        let matrixColumns;
        let matrixDrops;
        const matrixFontSize = 14;

        function initMatrix() {
            const section = matrixCanvas.closest('.hacker-skills');
            if (section) {
                matrixCanvas.width = section.offsetWidth;
                matrixCanvas.height = section.offsetHeight;
            } else {
                matrixCanvas.width = window.innerWidth;
                matrixCanvas.height = 800;
            }
            matrixColumns = Math.floor(matrixCanvas.width / matrixFontSize);
            matrixDrops = new Array(matrixColumns).fill(1).map(() => Math.random() * -100);
        }

        initMatrix();
        window.addEventListener('resize', initMatrix);

        let matrixRunning = false;

        function drawMatrix() {
            if (!matrixRunning) return;

            mCtx.fillStyle = 'rgba(5, 10, 14, 0.06)';
            mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

            for (let i = 0; i < matrixDrops.length; i++) {
                const charIdx = Math.floor(Math.random() * matrixChars.length);
                const char = matrixChars[charIdx];
                const x = i * matrixFontSize;
                const y = matrixDrops[i] * matrixFontSize;

                // Leading bright character
                mCtx.fillStyle = '#00ff9c';
                mCtx.globalAlpha = 0.9;
                mCtx.font = `${matrixFontSize}px 'JetBrains Mono', monospace`;
                mCtx.fillText(char, x, y);

                // Trailing faded character
                mCtx.fillStyle = '#003d2e';
                mCtx.globalAlpha = 0.4;
                mCtx.fillText(matrixChars[Math.floor(Math.random() * matrixChars.length)], x, y - matrixFontSize);

                mCtx.globalAlpha = 1;

                if (y > matrixCanvas.height && Math.random() > 0.975) {
                    matrixDrops[i] = 0;
                }
                matrixDrops[i] += 0.5;
            }

            requestAnimationFrame(drawMatrix);
        }

        // Only run the matrix when the section is visible
        const matrixSection = matrixCanvas.closest('.hacker-skills');
        if (matrixSection) {
            const matrixVisObserver = new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    if (e.isIntersecting && !matrixRunning) {
                        matrixRunning = true;
                        drawMatrix();
                    } else if (!e.isIntersecting) {
                        matrixRunning = false;
                    }
                });
            }, { threshold: 0.05 });
            matrixVisObserver.observe(matrixSection);
        }
    }

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
            language: 'PHP',
            topics: ['web', 'php', 'css', 'javascript'],
            githubUrl: 'https://github.com/divyanshuX72',
            featured: true,
            icon: 'fas fa-building',
            categories: ['web']
        },
        {
            name: 'MedSupplyAI',
            displayName: 'MedSupplyAI',
            description: 'An AI-powered pharmaceutical inventory system that predicts stock needs, automates orders, and optimizes medical supplies using advanced analytics.',
            language: 'JavaScript',
            topics: ['ai', 'medical', 'inventory', 'web'],
            githubUrl: 'https://github.com/divyanshuX72/MedSupplyAI',
            featured: true,
            icon: 'fas fa-heartbeat',
            categories: ['web']
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

    const LANG_META = {
        'JavaScript': { icon: 'fab fa-js-square', color: '#f7df1e' },
        'TypeScript': { icon: 'fab fa-js-square', color: '#3178c6' },
        'HTML': { icon: 'fab fa-html5', color: '#e44d26' },
        'CSS': { icon: 'fab fa-css3-alt', color: '#1572B6' },
        'Python': { icon: 'fab fa-python', color: '#3776AB' },
        'Java': { icon: 'fab fa-java', color: '#ED8B00' },
        'C': { icon: 'fas fa-code', color: '#A8B9CC' },
        'C++': { icon: 'fas fa-code', color: '#00599C' },
        'PHP': { icon: 'fab fa-php', color: '#777BB4' },
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

    // Mock preview content per project type
    function getMockPreview(icon, langColor, lang, name, featured) {
        const lname = (name || '').toLowerCase();
        const isWeb = ['html', 'css', 'javascript', 'typescript', 'php'].includes(lang.toLowerCase());
        const isJava = lang.toLowerCase() === 'java';
        const isPy = lang.toLowerCase() === 'python';
        const isC = ['c', 'c++'].includes(lang.toLowerCase());
        const isAuto = lname.includes('playwright') || lname.includes('automation') || lname.includes('selenium');

        // Decide which mock to show
        if (isAuto) return mockTerminal(langColor, icon);
        if (isWeb) return mockBrowser(langColor, icon);
        if (isJava) return mockCodeEditor(langColor, icon, 'Java');
        if (isPy) return mockCodeEditor(langColor, icon, 'Python');
        if (isC) return mockCodeEditor(langColor, icon, 'C');
        return mockCodeEditor(langColor, icon, lang);
    }

    function mockBrowser(color, icon) {
        return `
        <div class="mock-browser">
          <div class="mock-browser-bar">
            <span class="mock-dot red"></span>
            <span class="mock-dot yellow"></span>
            <span class="mock-dot green"></span>
            <div class="mock-url-bar"><i class="fas fa-lock"></i> github.com/divyanshuX72</div>
          </div>
          <div class="mock-browser-body">
            <div class="mock-body-glow" style="background:radial-gradient(circle at 40% 60%, ${color}22 0%, transparent 65%)"></div>
            <div class="mock-icon-wrap"><i class="${icon}"></i></div>
            <div class="mock-lines">
              <div class="mock-line ml-80 ml-c1"></div>
              <div class="mock-line ml-60 ml-c2"></div>
              <div class="mock-line ml-90 ml-c3"></div>
              <div class="mock-line ml-50 ml-c1"></div>
            </div>
          </div>
        </div>`;
    }

    function mockTerminal(color, icon) {
        return `
        <div class="mock-terminal">
          <div class="mock-terminal-bar">
            <span class="mock-dot red"></span>
            <span class="mock-dot yellow"></span>
            <span class="mock-dot green"></span>
            <span class="mock-terminal-title">bash &mdash; terminal</span>
          </div>
          <div class="mock-terminal-body">
            <div class="mock-body-glow" style="background:radial-gradient(circle at 30% 50%, ${color}18 0%, transparent 60%)"></div>
            <div class="mock-term-line"><span class="mock-prompt">$</span> npx playwright test</div>
            <div class="mock-term-line mock-term-pass"><i class="fas fa-check-circle"></i> 12 passed (3.2s)</div>
            <div class="mock-term-line"><span class="mock-prompt">$</span> running cross-browser...</div>
            <div class="mock-term-line mock-term-info">&#x2714; Chrome  &#x2714; Firefox  &#x2714; Safari</div>
            <div class="mock-terminal-cursor"></div>
          </div>
        </div>`;
    }

    function mockCodeEditor(color, icon, langLabel) {
        return `
        <div class="mock-editor">
          <div class="mock-editor-bar">
            <span class="mock-dot red"></span>
            <span class="mock-dot yellow"></span>
            <span class="mock-dot green"></span>
            <span class="mock-editor-tab">${langLabel} • main.${langLabel === 'Java' ? 'java' : langLabel === 'Python' ? 'py' : 'c'}</span>
          </div>
          <div class="mock-editor-body">
            <div class="mock-body-glow" style="background:radial-gradient(circle at 70% 40%, ${color}20 0%, transparent 60%)"></div>
            <div class="mock-code-lines">
              <div class="mc-line"><span class="mc-num">1</span><span class="mc-kw">class</span> <span class="mc-cls">Main</span> {</div>
              <div class="mc-line"><span class="mc-num">2</span>  <span class="mc-kw">public</span> <span class="mc-fn">run</span>() {</div>
              <div class="mc-line"><span class="mc-num">3</span>    <span class="mc-str">"Hello World"</span>;</div>
              <div class="mc-line"><span class="mc-num">4</span>  }</div>
              <div class="mc-line"><span class="mc-num">5</span>}</div>
            </div>
            <div class="mock-icon-small"><i class="${icon}"></i></div>
          </div>
        </div>`;
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

        const mockHTML = getMockPreview(icon, langMeta.color, lang, name, featured);

        const card = document.createElement('div');
        card.className = 'project-card' + (featured ? ' project-card--featured' : '');
        card.setAttribute('data-categories', cats.join(','));
        card.style.animationDelay = `${delay}ms`;

        card.innerHTML = `
            <div class="project-image" style="--lang-color:${langMeta.color}">
                ${mockHTML}
                ${featured ? '<span class="featured-badge"><i class="fas fa-star"></i> Featured</span>' : ''}
                <div class="project-overlay">
                    <a href="${url}" target="_blank" rel="noopener" class="btn-project btn-project-filled" aria-label="View Repo">
                        <i class="fab fa-github"></i> View Repo
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

            // Names of curated projects we already have (case-insensitive deduplication)
            const curatedNames = new Set(CURATED_PROJECTS.map(c => c.name.toLowerCase()));

            // Mark non-duplicated live repos
            const extraRepos = liveRepos
                .filter(r => !curatedNames.has(r.name.toLowerCase()))
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
        const isMobile = window.innerWidth < 768;
        particlesJS('particles-js', {
            particles: {
                number: { value: isMobile ? 30 : 80, density: { enable: true, value_area: 900 } },
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
                    onhover: { enable: !isMobile, mode: 'grab' },
                    onclick: { enable: !isMobile, mode: 'push' },
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
        const isMobile = window.innerWidth < 768;
        const canvas = document.getElementById('hero-canvas');

        if (canvas && !isMobile) {
            // Desktop only: set up the full 3D hero scene
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
        } else if (canvas) {
            // Mobile: hide the hero canvas, don't set up Three.js
            canvas.style.display = 'none';
        }
    }

    // ─── THREE.JS — GLOBAL FUTURISTIC BACKGROUND ───
    const globalCanvas = document.getElementById('global-3d-bg');
    const isMobileGlobal = window.innerWidth < 768;
    if (globalCanvas && typeof THREE !== 'undefined' && !isMobileGlobal) {
        const sceneBg = new THREE.Scene();
        const cameraBg = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        cameraBg.position.z = 30;

        const rendererBg = new THREE.WebGLRenderer({
            canvas: globalCanvas,
            alpha: true,
            antialias: false // Optimize for performance
        });
        rendererBg.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Lightweight rendering
        rendererBg.setSize(window.innerWidth, window.innerHeight);

        // 1. Animated Network Nodes (Optimized WebGL GL_LINES)
        const particleCount = 70;
        const particlesGeo = new THREE.BufferGeometry();
        const particlePos = new Float32Array(particleCount * 3);
        const particleVel = [];

        for (let i = 0; i < particleCount; i++) {
            particlePos[i * 3] = (Math.random() - 0.5) * 80;
            particlePos[i * 3 + 1] = (Math.random() - 0.5) * 80;
            particlePos[i * 3 + 2] = (Math.random() - 0.5) * 40;
            particleVel.push({
                x: (Math.random() - 0.5) * 0.04,
                y: (Math.random() - 0.5) * 0.04,
                z: (Math.random() - 0.5) * 0.04
            });
        }
        particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
        const particlesMat = new THREE.PointsMaterial({
            color: 0x00ff9c,
            size: 0.2,
            transparent: true,
            opacity: 0.5
        });
        const networkParticles = new THREE.Points(particlesGeo, particlesMat);
        sceneBg.add(networkParticles);

        // Network Lines (Pre-allocated Buffer)
        const lineMat = new THREE.LineBasicMaterial({
            color: 0x00ff9c,
            transparent: true,
            opacity: 0.12
        });
        const maxLines = (particleCount * (particleCount - 1)) / 2;
        const linesGeo = new THREE.BufferGeometry();
        const linePosArray = new Float32Array(maxLines * 6);
        linesGeo.setAttribute('position', new THREE.BufferAttribute(linePosArray, 3));
        const networkLines = new THREE.LineSegments(linesGeo, lineMat);
        sceneBg.add(networkLines);

        // 2. Rotating Developer Cubes
        const cubeGeo = new THREE.BoxGeometry(8, 8, 8);
        const cubeEdges = new THREE.EdgesGeometry(cubeGeo);
        const cubeMat = new THREE.LineBasicMaterial({ color: 0x00cc7a, transparent: true, opacity: 0.25 });

        const devCube1 = new THREE.LineSegments(cubeEdges, cubeMat);
        devCube1.position.set(20, -10, -15);
        sceneBg.add(devCube1);

        const devCube2 = new THREE.LineSegments(cubeEdges, cubeMat);
        devCube2.scale.set(0.6, 0.6, 0.6);
        devCube2.position.set(-25, 15, -20);
        sceneBg.add(devCube2);

        // 3. Floating Code Symbols
        const symbols = ['{ }', '</>', '[]', '()', 'JS', 'Ts', 'npm'];
        const symbolSprites = [];

        symbols.forEach((sym) => {
            const c = document.createElement('canvas');
            c.width = 128; c.height = 64;
            const ctx = c.getContext('2d');
            ctx.fillStyle = '#00ff9c';
            ctx.font = 'bold 28px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(sym, 64, 32);

            const tex = new THREE.CanvasTexture(c);
            const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.25 });

            // Create 2 instances of each symbol
            for (let j = 0; j < 2; j++) {
                const sprite = new THREE.Sprite(spriteMat);
                sprite.scale.set(5, 2.5, 1);
                sprite.position.set(
                    (Math.random() - 0.5) * 70,
                    (Math.random() - 0.5) * 70,
                    (Math.random() - 0.5) * 30
                );
                sceneBg.add(sprite);
                symbolSprites.push({
                    mesh: sprite,
                    speedY: Math.random() * 0.015 + 0.005,
                    speedX: (Math.random() - 0.5) * 0.01
                });
            }
        });

        // Background Fog
        sceneBg.fog = new THREE.FogExp2(0x050a0e, 0.02);

        const clockBg = new THREE.Clock();

        function animateGlobalBg() {
            requestAnimationFrame(animateGlobalBg);

            // Rotate Cubes
            devCube1.rotation.x += 0.002;
            devCube1.rotation.y += 0.003;
            devCube2.rotation.x -= 0.003;
            devCube2.rotation.z += 0.002;

            // Animate Symbols
            symbolSprites.forEach(s => {
                s.mesh.position.y += s.speedY;
                s.mesh.position.x += s.speedX;
                if (s.mesh.position.y > 40) {
                    s.mesh.position.y = -40;
                }
            });

            // Animate Network Nodes & Connections
            const pos = particlesGeo.attributes.position.array;
            let lineIdx = 0;

            for (let i = 0; i < particleCount; i++) {
                let px = pos[i * 3] + particleVel[i].x;
                let py = pos[i * 3 + 1] + particleVel[i].y;
                let pz = pos[i * 3 + 2] + particleVel[i].z;

                if (px > 40 || px < -40) particleVel[i].x *= -1;
                if (py > 40 || py < -40) particleVel[i].y *= -1;
                if (pz > 20 || pz < -20) particleVel[i].z *= -1;

                pos[i * 3] = px;
                pos[i * 3 + 1] = py;
                pos[i * 3 + 2] = pz;

                for (let j = i + 1; j < particleCount; j++) {
                    const px2 = pos[j * 3];
                    const py2 = pos[j * 3 + 1];
                    const pz2 = pos[j * 3 + 2];

                    const distSq = (px - px2) ** 2 + (py - py2) ** 2 + (pz - pz2) ** 2;

                    if (distSq < 150) {
                        linePosArray[lineIdx++] = px;
                        linePosArray[lineIdx++] = py;
                        linePosArray[lineIdx++] = pz;
                        linePosArray[lineIdx++] = px2;
                        linePosArray[lineIdx++] = py2;
                        linePosArray[lineIdx++] = pz2;
                    }
                }
            }

            particlesGeo.attributes.position.needsUpdate = true;
            linesGeo.setDrawRange(0, lineIdx / 3);
            linesGeo.attributes.position.needsUpdate = true;

            // Global Scene Rotation
            sceneBg.rotation.y = Math.sin(clockBg.getElapsedTime() * 0.1) * 0.15;
            sceneBg.rotation.x = Math.cos(clockBg.getElapsedTime() * 0.05) * 0.08;

            rendererBg.render(sceneBg, cameraBg);
        }
        animateGlobalBg();

        // Handle Resizing
        window.addEventListener('resize', () => {
            cameraBg.aspect = window.innerWidth / window.innerHeight;
            cameraBg.updateProjectionMatrix();
            rendererBg.setSize(window.innerWidth, window.innerHeight);
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

    // ─── SCROLL PROGRESS INDICATOR ───
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = progress + '%';
        }
    });

    // ─── THEME TOGGLE (handled in sidebar section above) ───

    // ─── PRELOADER ───
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 800); // Small delay to let the animation show
        });

        // Fallback in case load event already fired or takes too long
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 3000);
    }
});
