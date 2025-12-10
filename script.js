document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. INISIALISASI AOS (ANIMATE ON SCROLL)
    // ==========================================
    // Mengecek apakah library AOS sudah dimuat di HTML
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000, // Durasi animasi 1 detik
            once: true,     // Animasi hanya berjalan sekali (biar tidak pusing saat scroll naik turun)
            offset: 50,     // Mulai animasi sedikit lebih awal
            easing: 'ease-out-cubic' // Gerakan lebih natural
        });
    }

    // ==========================================
    // 2. LOGIC PRELOADER (LOADING SCREEN)
    // ==========================================
    const preloader = document.getElementById('preloader');
    
    const hidePreloader = () => {
        if (preloader) {
            preloader.style.transition = 'opacity 0.8s ease';
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                
                // Pemicu ulang animasi AOS setelah loading selesai
                if (typeof AOS !== 'undefined') {
                    AOS.refresh(); 
                }
            }, 800);
        }
    };

    // A. Hilang saat website selesai loading 100% (Gambar & Aset)
    window.addEventListener('load', hidePreloader);

    // B. Hilang paksa setelah 3 detik (Backup jika koneksi lambat)
    setTimeout(hidePreloader, 3000);


    // ==========================================
    // 3. LOGIC HAMBURGER MENU (MOBILE)
    // ==========================================
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileBtn && mobileMenu) {
        
        // Event saat tombol hamburger diklik
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Mencegah klik tembus
            mobileMenu.classList.toggle('hidden');
            
            // Ganti Ikon (Baris ke Silang)
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

        // Event: Tutup menu saat link diklik
        const mobileLinks = document.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileBtn.querySelector('i');
                if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
            });
        });

        // Event: Tutup menu jika klik sembarang tempat (bukan di menu)
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
    // 4. LOGIC MODAL POPUP (SAFE MODE)
    // ==========================================
    const triggers = document.querySelectorAll('.trigger-modal');
    
    // PENTING: Cek dulu apakah ada trigger modal di halaman ini?
    // Jika tidak ada (misal di halaman Reseller), kode di bawah tidak akan dijalankan (Mencegah Error)
    if (triggers.length > 0) {
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
                    document.body.style.overflow = 'hidden'; // Kunci scroll background
                }
            });
        });
      
        // Tutup Modal (Tombol X)
        closers.forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto'; // Aktifkan scroll lagi
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
    }

});
