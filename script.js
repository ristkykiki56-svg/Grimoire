// ==========================================
// 0. RESET POSISI (SCROLL KE ATAS)
// ==========================================
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// ==========================================
// KODE UTAMA
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. LOGIC PRELOADER (ANTI-STUCK / MACET)
    // ==========================================
    const preloader = document.getElementById('preloader');
    
    // Fungsi Penghilang Preloader
    const hidePreloader = () => {
        if (preloader && preloader.style.display !== 'none') {
            // Pastikan scroll dikunci ke atas saat preloader hilang
            window.scrollTo(0, 0);
            
            preloader.style.transition = 'opacity 0.5s ease';
            preloader.style.opacity = '0';
            
            setTimeout(() => {
                preloader.style.display = 'none';
                // Trigger ulang animasi AOS setelah loading selesai
                if (typeof AOS !== 'undefined') {
                    AOS.refresh(); 
                }
            }, 500); // Waktu dipercepat jadi 0.5 detik agar lebih responsif
        }
    };

    // A. Event saat loading normal selesai
    window.addEventListener('load', hidePreloader);

    // B. Event KHUSUS "Bolak-Balik" (Back/Forward Cache) - INI SOLUSINYA
    window.addEventListener('pageshow', (event) => {
        // Jika halaman diambil dari cache (memori HP), paksa hilangkan preloader
        if (event.persisted) {
            hidePreloader();
        }
        // Tetap jalankan hidePreloader setiap kali halaman tampil
        hidePreloader(); 
    });

    // C. Backup jika browser sangat lambat atau event load gagal
    // Cek jika halaman sebenarnya sudah ready tapi script telat jalan
    if (document.readyState === "complete" || document.readyState === "interactive") {
        hidePreloader();
    }
    
    // D. Backup terakhir (Timer)
    setTimeout(hidePreloader, 3000);


    // ==========================================
    // 2. INISIALISASI AOS (ANIMASI SCROLL)
    // ==========================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000, 
            once: true,     
            offset: 50,     
            easing: 'ease-out-cubic' 
        });
    }

    // ==========================================
    // 3. LOGIC HAMBURGER MENU (MOBILE)
    // ==========================================
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

        const mobileLinks = document.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileBtn.querySelector('i');
                if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
            });
        });

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

    // ==========================================
    // 4. LOGIC MODAL POPUP
    // ==========================================
    const triggers = document.querySelectorAll('.trigger-modal');
    
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
