/* ============================================================
   THE UI/UX ARCHITECT - INTERACTIVITY & BEHAVIOR LOGIC
   Version: 2.0 (Optimized for Performance)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------------------------
       1. INITIALIZE AOS (ANIMATION ON SCROLL)
       Membuat elemen muncul perlahan saat discroll.
       ------------------------------------------------------------ */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,       // Durasi animasi 1 detik (Lebih lambat & elegan)
            once: true,           // Animasi hanya terjadi sekali (tidak berulang saat scroll naik)
            offset: 50,           // Memicu animasi sedikit lebih awal
            easing: 'ease-out-cubic', // Gerakan animasi yang halus (tidak kaku)
            mirror: false
        });
    }

    /* ------------------------------------------------------------
       2. MOBILE MENU LOGIC
       Mengatur tombol hamburger menu di HP.
       ------------------------------------------------------------ */
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        // Toggle Menu saat tombol diklik
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Mencegah event bubbling
            
            // Toggle visibility
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
            } else {
                mobileMenu.classList.add('hidden');
            }
            
            // Ubah Ikon (Garis 3 <-> Silang X)
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

        // Tutup menu jika user klik DI LUAR menu
        document.addEventListener('click', (e) => {
            if (!mobileBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    
                    // Reset ikon ke Garis 3
                    const icon = mobileBtn.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
            }
        });
    }

    /* ------------------------------------------------------------
       3. SMART SECURITY (PROTECTION)
       Melindungi aset tanpa merusak pengalaman pengguna (UX).
       ------------------------------------------------------------ */
    
    // A. Disable Klik Kanan pada GAMBAR saja (Mencegah save image mudah)
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault(); // Matikan menu klik kanan
            return false;
        });
        // Matikan fitur drag-and-drop gambar ke tab baru
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    });

    // B. Disable Shortcut Developer Tools (F12, Ctrl+Shift+I, dll)
    // Ini untuk menjaga 'mystique' website dari user awam
    document.addEventListener('keydown', (e) => {
        if (
            e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') || 
            (e.ctrlKey && e.shiftKey && e.key === 'J') || 
            (e.ctrlKey && e.key === 'u') // View Source
        ) {
            e.preventDefault();
        }
    });

});

/* ------------------------------------------------------------
   4. PRELOADER LOGIC (WINDOW LOAD)
   Dijalankan setelah semua gambar & aset selesai dimuat.
   ------------------------------------------------------------ */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    // Fungsi untuk menghilangkan preloader dengan mulus
    const removePreloader = () => {
        if (preloader) {
            preloader.style.transition = 'opacity 0.8s ease-out';
            preloader.style.opacity = '0';
            
            setTimeout(() => {
                preloader.style.display = 'none';
                
                // PENTING: Refresh AOS setelah preloader hilang
                // agar posisi animasi dihitung ulang dengan benar
                if (typeof AOS !== 'undefined') {
                    AOS.refresh(); 
                }
            }, 800);
        }
    };

    // Jalankan penghapusan preloader
    // Tambahkan sedikit delay (500ms) agar logo 1818 terlihat sejenak
    setTimeout(removePreloader, 500);
});

// FALLBACK PRELOADER: 
// Jika koneksi internet sangat lambat dan window.load macet,
// paksa preloader hilang setelah 5 detik agar user tetap bisa masuk.
setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader && preloader.style.display !== 'none') {
        preloader.style.opacity = '0';
        setTimeout(() => { preloader.style.display = 'none'; }, 800);
    }
}, 5000);
