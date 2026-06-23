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

});