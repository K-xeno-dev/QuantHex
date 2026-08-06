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

    // --- NAVIGATION SWITCHING LOGIC (Single Page App Feel) ---
    const navTools = document.getElementById('nav-tools');
    const navMarket = document.getElementById('nav-market');
    const navStrategies = document.getElementById('nav-strategies');
    const exploreBtn = document.getElementById('explore-btn');
    const dynamicWrapper = document.getElementById('dynamic-content-wrapper');
    const heroSection = document.querySelector('.hero');
    const tickerContainer = document.querySelector('.ticker-container');

    // Function to show/hide hero and ticker based on page view
    function updateLayout(isHome) {
        if (heroSection) heroSection.style.display = isHome ? 'flex' : 'none';
        if (tickerContainer) tickerContainer.style.display = isHome ? 'flex' : 'none';
    }

    // Tools Click Event
    if(navTools) {
        navTools.addEventListener('click', (e) => {
            e.preventDefault();
            updateLayout(false);
            dynamicWrapper.innerHTML = `
                <section class="tools-showcase" style="padding-top: 100px;">
                    <div class="section-header">
                        <h3>All QuantHex Tools</h3>
                        <p>Complete suite of professional trading calculators and analyzers.</p>
                    </div>
                    <div class="glass-grid">
                        <div class="glass-card tool-card" onclick="alert('Opening Pivot Calculator...')">
                            <div class="card-icon cyan-glow">🎯</div>
                            <h4>Pivot Point Calculator</h4>
                            <p>Calculate pivot points for smarter trades. Find perfect entry and exit zones.</p>
                        </div>
                        <div class="glass-card tool-card">
                            <div class="card-icon purple-glow">⚖️</div>
                            <h4>Position Size Calculator</h4>
                            <p>Calculate ideal position size for perfect risk management.</p>
                        </div>
                        <div class="glass-card tool-card">
                            <div class="card-icon cyan-glow">🔗</div>
                            <h4>Option Chain Analyzer</h4>
                            <p>Analyze option chain data in real-time to find hidden support.</p>
                        </div>
                        <div class="glass-card tool-card">
                            <div class="card-icon purple-glow">🧠</div>
                            <h4>Market Sentiment</h4>
                            <p>Analyze market sentiment using AI and institutional data flow.</p>
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

    // Strategies Click Event (Replaced Insights)
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

    // --- GLASS SHATTER EFFECT ON BUTTONS ---
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
