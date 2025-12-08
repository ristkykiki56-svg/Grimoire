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