// Tunggu sampai kerangka HTML selesai dimuat
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. LOGIC PRELOADER (DIPINDAHKAN DARI HTML)
    // ==========================================
    const preloader = document.getElementById('preloader');
    
    // Fungsi penghilang preloader
    const hidePreloader = () => {
        if (preloader) {
            preloader.style.transition = 'opacity 0.7s ease';
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 700);
        }
    };

    // A. Hilang saat website selesai loading 100% (Gambar & Video)
    window.addEventListener('load', hidePreloader);

    // B. Hilang paksa setelah 3.5 detik (Backup jika koneksi lambat)
    setTimeout(hidePreloader, 3500);


    // ==========================================
    // 2. LOGIC HAMBURGER MENU (MOBILE)
    // ==========================================
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Pastikan elemen ada sebelum dijalankan
    if (mobileBtn && mobileMenu) {
        
        // Event saat tombol hamburger diklik
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop klik tembus
            
            // Toggle Class Hidden (Buka/Tutup)
            mobileMenu.classList.toggle('hidden');
            
            // Logika Ganti Ikon
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                // Jika menu TERBUKA (tidak ada class hidden)
                if (!mobileMenu.classList.contains('hidden')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    // Jika menu TERTUTUP
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Event: Tutup menu saat salah satu link diklik
        const mobileLinks = document.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                // Reset ikon
                const icon = mobileBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });

        // Event: Tutup menu jika klik sembarang tempat (bukan di menu)
        document.addEventListener('click', (e) => {
            if (!mobileBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    }


    // ==========================================
    // 3. LOGIC MODAL POPUP (PRODUK)
    // ==========================================
    const triggers = document.querySelectorAll('.trigger-modal');
    const closers = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.modal');
  
    // Buka Modal
    triggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            const targetModal = document.getElementById(targetId);
            if (targetModal) {
                targetModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Kunci scroll
            }
        });
    });
  
    // Tutup Modal (Tombol X)
    closers.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
  
    // Tutup Modal (Klik Background Gelap)
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

});