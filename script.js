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

/* =========================================
   5. SECURITY: ULTIMATE CONTENT PROTECTION (PC & MOBILE)
   ========================================= */

// 1. Matikan Klik Kanan & Tahan Lama (Mobile Long Press)
// Menggunakan { capture: true } agar lebih agresif menangkap event sebelum browser
const disableContext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
};

window.addEventListener('contextmenu', disableContext, { capture: true });

// 2. Matikan Shortcut Developer Tools & Save (Keyboard)
document.addEventListener('keydown', function(e) {
    if (
        e.key === 'F12' || 
        (e.ctrlKey && e.key === 'u') || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 's') // Matikan Ctrl+S (Save Page)
    ) {
        e.preventDefault();
    }
});

// 3. Matikan Drag & Drop Gambar (Agar gambar tidak bisa diseret ke tab baru)
window.addEventListener('dragstart', (e) => {
    e.preventDefault();
});
