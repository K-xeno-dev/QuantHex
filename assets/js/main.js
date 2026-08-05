document.addEventListener('DOMContentLoaded', () => {
    
    // SOUND SETUP (Placeholders)
    const hoverSound = new Audio('assets/sounds/hover.mp3');
    const clickSound = new Audio('assets/sounds/click.mp3');
    hoverSound.volume = 0.1;
    clickSound.volume = 0.4;

    const interactiveElements = document.querySelectorAll('.glass-btn, .glass-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // hoverSound.currentTime = 0;
            // hoverSound.play().catch(e => {}); 
        });
        
        el.addEventListener('click', () => {
            // clickSound.currentTime = 0;
            // clickSound.play().catch(e => {}); 
        });
    });

    // ==========================================
    // GLASS SHATTER EFFECT 
    // ==========================================
    const exploreBtn = document.querySelector('.primary-btn');
    
    if(exploreBtn) {
        exploreBtn.addEventListener('click', function(e) {
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            for(let i = 0; i < 10; i++) {
                let particle = document.createElement('span');
                particle.className = 'glass-particle';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                
                let angle = Math.random() * Math.PI * 2;
                let velocity = 60 + Math.random() * 60;
                let tx = Math.cos(angle) * velocity;
                let ty = Math.sin(angle) * velocity;
                
                particle.style.setProperty('--tx', `${tx}px`);
                particle.style.setProperty('--ty', `${ty}px`);
                
                this.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 600);
            }
        });
    }
});
