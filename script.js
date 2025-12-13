document.addEventListener('DOMContentLoaded', () => {

    // 1. INITIALIZE AOS (Animation on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 50,
            easing: 'ease-out-cubic'
        });
    }

    // 2. PRELOADER LOGIC
    const preloader = document.getElementById('preloader');
    
    const hidePreloader = () => {
        if (preloader && preloader.style.opacity !== '0') {
            preloader.style.transition = 'opacity 0.8s ease';
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                if (typeof AOS !== 'undefined') AOS.refresh();
            }, 800);
        }
    };

    window.addEventListener('load', hidePreloader);
    setTimeout(hidePreloader, 4000); // Fallback

    // 3. MOBILE MENU TOGGLE
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileBtn.setAttribute('aria-expanded', 'true');
            } else {
                mobileMenu.classList.add('hidden');
                mobileBtn.setAttribute('aria-expanded', 'false');
            }
            
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        document.addEventListener('click', (e) => {
            if (!mobileBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileBtn.setAttribute('aria-expanded', 'false');
                const icon = mobileBtn.querySelector('i');
                if(icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }
});
