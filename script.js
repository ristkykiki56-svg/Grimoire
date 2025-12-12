// ==========================================
// 0. SYSTEM CONFIG (Jalan Paling Awal)
// ==========================================

// A. Hapus Tanda Pagar (#) di URL (Anti-Loncat)
if (window.location.hash) {
    history.replaceState(null, null, ' '); 
}

// B. Paksa Scroll ke Paling Atas (Reset Posisi)
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

// ==========================================
// KODE UTAMA (Setelah HTML Siap)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    // 1. INISIALISASI AOS (ANIMASI SCROLL)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000, 
            once: true,     
            offset: 50,     
            easing: 'ease-out-cubic' 
        });
    }

    // 2. LOGIC PRELOADER (ANTI-STUCK)
    const preloader = document.getElementById('preloader');
    
    const hidePreloader = () => {
        if (preloader && preloader.style.display !== 'none') {
            window.scrollTo(0, 0); // Pastikan posisi di atas
            
            preloader.style.transition = 'opacity 0.6s ease';
            preloader.style.opacity = '0';
            
            setTimeout(() => {
                preloader.style.display = 'none';
                // Refresh animasi AOS setelah loading kelar
                if (typeof AOS !== 'undefined') {
                    AOS.refresh(); 
                }
            }, 600);
        }
    };

    // Trigger saat loading selesai sempurna
    window.addEventListener('load', hidePreloader);
    
    // Trigger saat tombol Back ditekan (Cache Memory)
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) hidePreloader();
    });

    // Backup timer (jika koneksi lambat sekali)
    setTimeout(hidePreloader, 3000);


    // 3. LOGIC HAMBURGER MENU (MOBILE)
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            mobileMenu.classList.toggle('hidden');
            
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                if (!mobileMenu.classList.contains('hidden')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Tutup menu saat link diklik
        const mobileLinks = document.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileBtn.querySelector('i');
                if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
            });
        });

        // Tutup menu jika klik di luar
        document.addEventListener('click', (e) => {
            if (!mobileBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileBtn.querySelector('i');
                    if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
                }
            }
        });
    }


    // 4. LOGIC MODAL POPUP (SAFE MODE)
    const triggers = document.querySelectorAll('.trigger-modal');
    
    // Cek apakah ada modal di halaman ini? (Supaya tidak error di halaman lain)
    if (triggers.length > 0) {
        const closers = document.querySelectorAll('.close-modal');
        const modals = document.querySelectorAll('.modal');
      
        triggers.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = btn.getAttribute('data-target');
                const targetModal = document.getElementById(targetId);
                
                if (targetModal) {
                    targetModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; 
                }
            });
        });
      
        closers.forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto'; 
                }
            });
        });
      
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });
    }

});
