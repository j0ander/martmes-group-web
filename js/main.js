// ============================================
// FUNCIONES PRINCIPALES – main.js
// ============================================

document.addEventListener('DOMContentLoaded', function() {

  // ---------- SCROLL REVEAL ----------
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


  // ---------- NAVBAR SCROLL EFFECT ----------
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg', 'py-2');
        navbar.classList.remove('py-4');
      } else {
        navbar.classList.remove('shadow-lg', 'py-2');
        navbar.classList.add('py-4');
      }
    });
  }


  // ---------- MOBILE MENU (SIMULACIÓN) ----------
  const mobileBtn = document.getElementById('mobile-menu-btn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      alert('El menú móvil se expande aquí con opciones laterales.');
    });
  }


  // ---------- TOGGLE SUAVE PARA DETALLES DE SERVICIOS (GIROS DE NEGOCIO) ----------
  document.querySelectorAll('.servicio-detalle').forEach(function(container) {
    const toggle = container.querySelector('.detalle-toggle');
    const content = container.querySelector('.detalle-contenido');
    const icon = toggle.querySelector('.material-symbols-outlined');

    toggle.addEventListener('click', function() {
      const isOpen = content.style.maxHeight !== '0px' && content.style.maxHeight !== '';

      if (isOpen) {
        // Cerrar
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
        icon.style.transform = 'rotate(0deg)';
      } else {
        // Abrir
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';
        icon.style.transform = 'rotate(180deg)';
      }
    });
  });

});


// ============================================
// ANIMACIÓN DE ENTRADA PARA TARJETAS DE SERVICIOS (SLIDE)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide-left, .slide-right');

  const observerSlides = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-visible');
        // Opcional: dejar de observar una vez activada
        // observerSlides.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  slides.forEach(el => observerSlides.observe(el));
});