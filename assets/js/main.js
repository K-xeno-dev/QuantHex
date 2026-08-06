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

    const navTools = document.getElementById('nav-tools');
    const navBlogs = document.getElementById('nav-blogs');
    const exploreBtn = document.getElementById('explore-btn');
    const footerTools = document.getElementById('footer-tools-link');
    const footerBlogs = document.getElementById('footer-blogs-link');
    const dynamicWrapper = document.getElementById('dynamic-content-wrapper');
    const heroSection = document.querySelector('.hero');
    const tickerContainer = document.querySelector('.ticker-container');

    function updateLayout(isHome) {
        if (heroSection) heroSection.style.display = isHome ? 'flex' : 'none';
        if (tickerContainer) tickerContainer.style.display = isHome ? 'flex' : 'none';
    }

    // Render Tools View
    function loadToolsPage() {
        updateLayout(false);
        dynamicWrapper.innerHTML = `
            <section class="tools-showcase" style="padding-top: 100px;">
                <div class="section-header">
                    <h3>All QuantHex Tools</h3>
                    <p>Complete suite of professional trading calculators and analyzers.</p>
                </div>
                <div class="glass-grid" id="all-tools-grid"></div>
            </section>
        `;

        fetch('tools/manifest.json')
            .then(res => res.json())
            .then(data => {
                const grid = document.getElementById('all-tools-grid');
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
            });
    }

    // Render Blogs & Strategies View (SEO Optimized & Auto-Loading)
    function loadBlogsPage() {
        updateLayout(false);
        dynamicWrapper.innerHTML = `
            <section class="tools-showcase" style="padding-top: 100px;">
                <div class="section-header">
                    <h3>Trading Blogs & Strategies</h3>
                    <p>Expert insights, algorithmic trading setups, and market guides.</p>
                </div>
                <div class="glass-grid" id="all-blogs-grid"></div>
            </section>
        `;

        fetch('blogs/manifest.json')
            .then(res => res.json())
            .then(data => {
                const grid = document.getElementById('all-blogs-grid');
                if(!grid) return;
                grid.innerHTML = "";
                data.blogs.forEach(blog => {
                    const card = document.createElement('div');
                    card.className = 'glass-card tool-card';
                    card.style.cursor = 'pointer';
                    card.onclick = () => { window.location.href = blog.url; };
                    card.innerHTML = `
                        <div class="card-icon purple-glow">📝</div>
                        <div style="font-size: 12px; color: var(--cyan); margin-bottom: 5px;">${blog.date} • ${blog.readTime}</div>
                        <h4>${blog.title}</h4>
                        <p>${blog.description}</p>
                    `;
                    grid.appendChild(card);
                });
            })
            .catch(() => {
                const grid = document.getElementById('all-blogs-grid');
                if(grid) grid.innerHTML = `<p style="color:var(--text-muted); text-align:center; grid-column:1/-1;">No blogs published yet. Stay tuned!</p>`;
            });
    }

    if(navTools) navTools.addEventListener('click', (e) => { e.preventDefault(); loadToolsPage(); if(navLinks.classList.contains('active')) { navLinks.classList.remove('active'); menuToggle.classList.remove('active'); } });
    if(footerTools) footerTools.addEventListener('click', (e) => { e.preventDefault(); loadToolsPage(); window.scrollTo({top:0, behavior:'smooth'}); });
    
    if(navBlogs) navBlogs.addEventListener('click', (e) => { e.preventDefault(); loadBlogsPage(); if(navLinks.classList.contains('active')) { navLinks.classList.remove('active'); menuToggle.classList.remove('active'); } });
    if(footerBlogs) footerBlogs.addEventListener('click', (e) => { e.preventDefault(); loadBlogsPage(); window.scrollTo({top:0, behavior:'smooth'}); });

    if(exploreBtn) exploreBtn.addEventListener('click', () => { loadToolsPage(); });
});
