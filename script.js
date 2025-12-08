/* Membuka Modal - Mengubah style display menjadi flex dan opacity 1 */
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        document.body.style.overflow = 'hidden';
    }
}

/* Menutup Modal - Mengubah opacity 0 dulu, baru display none (untuk animasi) */
function closeModalBtn(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = 'auto';
    }
}

/* Tutup jika klik background gelap */
function closeModal(event, id) {
    if (event.target.id === id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
            document.body.style.overflow = 'auto';
        }
    }
}