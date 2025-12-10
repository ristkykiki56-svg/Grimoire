document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. LOGIC HAMBURGER MENU ===
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const icon = mobileBtn ? mobileBtn.querySelector('i') : null; // Cek dulu apakah tombol ada
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Hanya jalankan jika tombol dan menu ditemukan di halaman tersebut
    if (mobileBtn && mobileMenu) {
        
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Mencegah klik tembus ke elemen lain
            mobileMenu.classList.toggle('hidden');
            
            // Ubah Ikon (Bars <-> Times) dengan aman
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

        // Tutup menu saat link diklik
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });

        // Tutup menu jika klik di LUAR menu (Area kosong)
        document.addEventListener('click', (e) => {
            if (!mobileBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // === 2. LOGIC MODAL POPUP (PRODUK) ===
    const triggers = document.querySelectorAll('.trigger-modal');
    const closers = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.modal');
  
    triggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
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
});