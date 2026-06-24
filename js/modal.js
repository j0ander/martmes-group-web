// ============================================
// MODAL DE ZOOM PARA EL EQUIPO
// ============================================
document.addEventListener('DOMContentLoaded', function () {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalGrid = document.getElementById('modal-grid');
  const modalClose = document.getElementById('modal-close');

  // Abrir modal al hacer clic en "Ver más"
  document.querySelectorAll('.ver-mas').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const card = this.closest('.team-card');
      const expandedData = card.querySelector('.card-expanded .expanded-data');
      if (!expandedData) return;

      const clone = expandedData.cloneNode(true);
      modalGrid.innerHTML = '';
      const img = clone.querySelector('img');
      const textDiv = clone.querySelector('div:not(:has(img))');
      if (img && textDiv) {
        modalGrid.appendChild(img);
        modalGrid.appendChild(textDiv);
      } else {
        modalGrid.appendChild(clone);
      }

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Cerrar modal
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === this) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
});