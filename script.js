document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. LOGIC HAMBURGER MENU (MOBILE)
    // ==========================================
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Cek apakah elemen ada di halaman ini (Mencegah error di console)
    if (mobileBtn && mobileMenu) {
        
        // Event saat tombol diklik
        mobileBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah tombol loncat/refresh
            e.stopPropagation(); // Mencegah klik tembus

            // Toggle Class Hidden (Buka/Tutup)
            mobileMenu.classList.toggle('hidden');
            
            // Ubah Ikon
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('hidden')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            }
        });

        // Event saat Link di dalam menu diklik (Tutup menu otomatis)
        const mobileLinks = document.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                // Reset ikon jadi garis 3
                const icon = mobileBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });

        // Event Klik di Luar Menu (Tutup otomatis)
        document.addEventListener('click', (e) => {
            // Jika yang diklik BUKAN tombol DAN BUKAN menu
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
    // 2. LOGIC MODAL POPUP (PRODUK)
    // ==========================================
    const triggers = document.querySelectorAll('.trigger-modal');
    const closers = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.modal');
  
    // Buka Modal
    triggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah scroll ke atas
            const targetId = btn.getAttribute('data-target');
            const targetModal = document.getElementById(targetId);
            if (targetModal) {
                targetModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Kunci scroll belakang
            }
        });
    });
  
    // Tutup Modal (Tombol X)
    closers.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto'; // Buka scroll
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

    // ==========================================
    // 3. LOGIC PRELOADER (SAFETY REMOVAL)
    // ==========================================
    // Cek jika preloader masih nyangkut, hapus paksa
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Hapus jika window sudah load
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 700);
        });
        
        // Hapus paksa setelah 3 detik (Backup)
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 700);
        }, 3000);
    }

});