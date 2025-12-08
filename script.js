/* Gunakan const agar editor tidak komplain */
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeModalBtn(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
}

function closeModal(event, id) {
  /* Tutup jika klik di area gelap (luar kotak) */
  if (event.target.id === id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  }
}