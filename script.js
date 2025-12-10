document.addEventListener('DOMContentLoaded', () => {
  
  // Ambil semua tombol pembuka modal
  const triggers = document.querySelectorAll('.trigger-modal');
  
  // Ambil semua tombol penutup (X)
  const closers = document.querySelectorAll('.close-modal');
  
  // Ambil semua background modal
  const modals = document.querySelectorAll('.modal');
  
  // Logic Buka
  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = btn.getAttribute('data-target');
      const targetModal = document.getElementById(targetId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Kunci scroll
      }
    });
  });
  
  // Logic Tutup (Tombol X)
  closers.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      modal.classList.remove('active');
      document.body.style.overflow = 'auto'; // Buka kunci scroll
    });
  });
  
  // Logic Tutup (Klik Background Gelap)
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });
  
});

// === LOGIC HAMBURGER MENU ===
document.addEventListener('DOMContentLoaded', () => {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const icon = mobileBtn.querySelector('i');
  
  // Toggle Menu saat tombol diklik
  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    // Ubah icon dari Baris (Bars) ke Silang (Times)
    if (mobileMenu.classList.contains('hidden')) {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    } else {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    }
  });
  
  // Tutup menu otomatis saat salah satu link diklik
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });
});

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  // Hilangkan preloader setelah website selesai loading sepenuhnya
  preloader.style.opacity = '0';
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 700);
});