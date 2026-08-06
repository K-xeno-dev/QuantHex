document.addEventListener('DOMContentLoaded', () => {
    
    // --- MOBILE HAMBURGER MENU LOGIC ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if(menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // --- NAVIGATION SWITCHING LOGIC ---
    const navTools = document.getElementById('nav-tools');
    const navStrategies = document.getElementById('nav-strategies');
    const exploreBtn = document.getElementById('explore-btn');
    const dynamicWrapper = document.getElementById('dynamic-content-wrapper');
    const heroSection = document.querySelector('.hero');
    const tickerContainer = document.querySelector('.ticker-container');

    function updateLayout(isHome) {
        if (heroSection) heroSection.style.display = isHome ? 'flex' : 'none';
        if (tickerContainer) tickerContainer.style.display = isHome ? 'flex' : 'none';
    }

    // Function to fetch and render tools dynamically anywhere
    function renderToolsSection(containerId, title, subtitle) {
        dynamicWrapper.innerHTML = `
            <section class="tools-showcase" style="padding-top: 100px;">
                <div class="section-header">
                    <h3>${title}</h3>
                    <p>${subtitle}</p>
                </div>
                <div class="glass-grid" id="${containerId}">
                    <!-- Dynamic tools will load here -->
                </div>
            </section>
        `;

        fetch('tools/manifest.json')
            .then(response => response.json())
            .then(data => {
                const grid = document.getElementById(containerId);
                if(!grid) return;
                grid.innerHTML = "";
                
                data.tools.forEach(tool => {
                    const card = document.createElement('div');
                    card.className = 'glass-card tool-card';
                    card.style.cursor = 'pointer';
                    card.onclick = () => { window.location.href = tool.url; };
                    
                    card.innerHTML = `
                        <div class="card-icon cyan-glow">${tool.icon || '⚡'}</div>
                        <h4>${tool.name}</h4>
                        <p>${tool.description}</p>
                    `;
                    grid.appendChild(card);
                });
            })
            .catch(err => console.log('Manifest load error:', err));
    }

    // Tools Click Event in Navbar (Now fully automated from manifest.json)
    if(navTools) {
        navTools.addEventListener('click', (e) => {
            e.preventDefault();
            updateLayout(false);
            renderToolsSection('all-tools-grid', 'All QuantHex Tools', 'Complete suite of professional trading calculators and analyzers.');
            if(navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    // Strategies Click Event
    if(navStrategies) {
        navStrategies.addEventListener('click', (e) => {
            e.preventDefault();
            updateLayout(false);
            dynamicWrapper.innerHTML = `
                <section class="tools-showcase" style="padding-top: 100px;">
                    <div class="section-header">
                        <h3>Trading Strategies & Pine Scripts</h3>
                        <p>Advanced algorithmic strategies and indicators for TradingView.</p>
                    </div>
                    <div class="glass-grid">
                        <div class="glass-card tool-card">
                            <div class="card-icon cyan-glow">📈</div>
                            <h4>Nifty Intraday Scalper v1</h4>
                            <p>Custom Pine Script strategy optimized for 3-minute Nifty momentum trades.</p>
                        </div>
                        <div class="glass-card tool-card">
                            <div class="card-icon purple-glow">⚡</div>
                            <h4>Volume Profile Breakout</h4>
                            <p>Institutional volume node indicator with automated entry alerts.</p>
                        </div>
                    </div>
                </section>
            `;
            if(navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    // Explore Tools Button on Hero
    if(exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            if(navTools) navTools.click();
        });
    }

    // --- GLASS SHATTER EFFECT ---
    const primaryBtns = document.querySelectorAll('.primary-btn');
    primaryBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            for(let i = 0; i < 10; i++) {
                let particle = document.createElement('span');
                particle.className = 'glass-particle';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                
                let angle = Math.random() * Math.PI * 2;
                let velocity = 40 + Math.random() * 60;
                let tx = Math.cos(angle) * velocity;
                let ty = Math.sin(angle) * velocity;
                
                particle.style.setProperty('--tx', `${tx}px`);
                particle.style.setProperty('--ty', `${ty}px`);
                
                this.appendChild(particle);
                setTimeout(() => particle.remove(), 600);
            }
        });
    });
});
