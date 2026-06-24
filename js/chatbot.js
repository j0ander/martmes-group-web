// ============================================
// CHATBOT – chatbot.js
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const chatToggle = document.getElementById('chat-toggle');
  const chatWindow = document.getElementById('chat-window');
  const chatClose = document.getElementById('chat-close');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatForm = document.getElementById('chat-form');
  const quickBtns = document.querySelectorAll('.quick-btn');

  let chatOpen = false;

  // ---------- ABRIR/CERRAR CHAT ----------
  function openChat() {
    chatOpen = true;
    chatWindow.classList.remove('hidden');
    void chatWindow.offsetWidth;
    chatWindow.classList.remove('translate-y-4', 'opacity-0');
  }

  function closeChat() {
    chatOpen = false;
    chatWindow.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => {
      chatWindow.classList.add('hidden');
    }, 300);
  }

  chatToggle.addEventListener('click', () => {
    chatOpen ? closeChat() : openChat();
  });

  chatClose.addEventListener('click', closeChat);

  // ---------- BASE DE CONOCIMIENTO ----------
  const respuestas = {
    // Saludo
    'hola': '¡Hola! ¿Cómo puedo ayudarte?',
    'buenos días': '¡Buenos días! ¿En qué puedo asistirte?',
    'buenas tardes': '¡Buenas tardes! ¿Qué necesitas saber?',

    // Servicios
    'servicios': `Ofrecemos tres líneas principales de servicio:

    • Asesoría Jurídica: Derecho civil, sucesiones, recuperación de cartera, derecho de familia, defensa de derechos y litigio constitucional.
    • Consultoría Empresarial: Constitución de empresas, registro de marcas, protección de datos, planificación estratégica y marketing digital.
    • Gestión Inmobiliaria: Comercialización, desarrollo de proyectos, diseño y construcción, consultorías técnicas.

    ¿Te gustaría más detalle de alguno?`,

    'jurídica': 'Nuestra área jurídica abarca derecho civil (adjudicación de tierras, particiones, actualización catastral, traspasos), recuperación de cartera (cobro extrajudicial y judicial), derecho de familia (divorcios, pensiones, tenencia, adopciones) y defensa de derechos (acciones de protección, garantías jurisdiccionales).',

    'empresarial': 'En consultoría empresarial realizamos constitución y legalización de empresas, registro de marcas y propiedad intelectual, organización institucional, protección de datos personales, planificación estratégica y de marketing, desarrollo de productos y marketing digital.',

    'inmobiliaria': 'Gestionamos y comercializamos propiedades, desarrollamos proyectos de lotización y urbanización, diseñamos y construimos viviendas, edificios, clínicas, y ofrecemos consultorías técnicas como arquitectura, topografía, regularización de inmuebles y gestión de permisos.',

    // Contacto y dirección
    'dirección': 'Nuestra oficina está en Ambato: Av. Pedro Fermin Cevallos y Juan León Mera, edificio Mutualista Ambato, 3er piso, Oficina 303, Código postal 180101. Puedes ver la ubicación exacta en Google Maps haciendo clic en el mapa de nuestro sitio web.',

    'contacto': 'Puedes contactarnos por:\n• Teléfono: 0997392987\n• WhatsApp: https://wa.me/593997392987\n• Correo: info@martmes.com\n• Facturación: facturacion@martmes.com',

    'horarios': 'Nuestro horario de atención es de lunes a viernes de 8:00 a.m. a 6:00 p.m.',

    // Equipo
    'equipo': 'Nuestro equipo directivo está conformado por:\n• Ing. Edison Mesías, Mtr. – Director de Marketing y Estrategia (gerencia@martmes.com)\n• Av. Karina Martínez, Mtr. – Directora Legal y de Protección de Datos (legal@martmes.com)\n• Av. Pablo Acurio, Mgt. – Director de Litigios y Derecho Civil (legal@martmes.com)',

    // Redes
    'redes': 'Síguenos en nuestras redes sociales:\n• Instagram: @martmesgroup\n• Facebook: MARTMES Group\n• LinkedIn: MARTMES Group\n• TikTok: @martmesgroup',

    // Misión, Visión, Valores
    'misión': 'Nuestra misión es brindar asesoría integral y soluciones estratégicas que permitan a empresas, instituciones y personas tomar decisiones inteligentes, seguras y sostenibles, generando valor, confianza y crecimiento para nuestros clientes.',

    'visión': 'Ser una firma empresarial líder a nivel nacional, reconocida por su capacidad de integrar conocimiento, innovación y experiencia multidisciplinaria para ofrecer soluciones efectivas que impulsen el desarrollo organizacional, la seguridad jurídica y el crecimiento sostenible de nuestros clientes.',

    'valores': 'Nuestros valores son: Honestidad y Transparencia, Compromiso, Orientación al Cliente, Confianza, Responsabilidad y Ética Profesional.',

    // Respuesta por defecto
    'default': 'Lo siento, no tengo información sobre eso. Te recomiendo contactarnos directamente por teléfono o correo para más detalles.'
  };

  // ---------- FUNCIÓN PARA OBTENER RESPUESTA ----------
  function getResponse(pregunta) {
    const q = pregunta.toLowerCase().trim();

    // Buscar coincidencias por palabras clave
    if (q.includes('hola') || q.includes('buenos') || q.includes('saludo')) {
      return respuestas.hola;
    }
    if (q.includes('servicio') || q.includes('qué ofrecen') || q.includes('hacen')) {
      return respuestas.servicios;
    }
    if (q.includes('jurídica') || q.includes('legal') || q.includes('abogado')) {
      return respuestas.jurídica;
    }
    if (q.includes('empresarial') || q.includes('empresa') || q.includes('marca') || q.includes('constitución')) {
      return respuestas.empresarial;
    }
    if (q.includes('inmobiliaria') || q.includes('propiedad') || q.includes('terreno') || q.includes('construcción')) {
      return respuestas.inmobiliaria;
    }
    if (q.includes('dirección') || q.includes('ubicación') || q.includes('dónde') || q.includes('oficina') || q.includes('mapa')) {
      return respuestas.dirección;
    }
    if (q.includes('contacto') || q.includes('teléfono') || q.includes('correo') || q.includes('email') || q.includes('whatsapp')) {
      return respuestas.contacto;
    }
    if (q.includes('horario') || q.includes('atención')) {
      return respuestas.horarios;
    }
    if (q.includes('equipo') || q.includes('directivo') || q.includes('miembro')) {
      return respuestas.equipo;
    }
    if (q.includes('redes') || q.includes('instagram') || q.includes('facebook') || q.includes('tiktok')) {
      return respuestas.redes;
    }
    if (q.includes('misión') || q.includes('misión')) {
      return respuestas.misión;
    }
    if (q.includes('visión') || q.includes('visión')) {
      return respuestas.visión;
    }
    if (q.includes('valor') || q.includes('principios') || q.includes('ética')) {
      return respuestas.valores;
    }

    // Si no coincide con nada, respuesta por defecto
    return respuestas.default;
  }

  // ---------- AGREGAR MENSAJE AL CHAT ----------
  function addMessage(text, tipo) {
    const div = document.createElement('div');
    div.className = `flex items-start gap-2 ${tipo === 'user' ? 'flex-row-reverse' : ''}`;

    const icon = document.createElement('div');
    icon.className = `w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${tipo === 'user' ? 'bg-secondary/20' : 'bg-primary/10'}`;
    icon.innerHTML = tipo === 'user'
      ? '<span class="material-symbols-outlined text-secondary text-sm">person</span>'
      : '<span class="material-symbols-outlined text-primary text-sm">smart_toy</span>';

    const bubble = document.createElement('div');
    bubble.className = `rounded-xl p-3 max-w-[85%] ${tipo === 'user' ? 'bg-secondary/10 text-on-surface' : 'bg-surface-container'}`;
    // Reemplazar saltos de línea por <br>
    bubble.innerHTML = text.replace(/\n/g, '<br>');

    div.appendChild(icon);
    div.appendChild(bubble);
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // ---------- PROCESAR PREGUNTA ----------
  function handleQuestion(pregunta) {
    if (!pregunta.trim()) return;
    addMessage(pregunta, 'user');
    const respuesta = getResponse(pregunta);
    // Pequeño retraso para simular "escritura"
    setTimeout(() => {
      addMessage(respuesta, 'bot');
    }, 300);
  }

  // ---------- EVENTO ENVÍO DE FORMULARIO ----------
  chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const texto = chatInput.value.trim();
    if (texto) {
      handleQuestion(texto);
      chatInput.value = '';
    }
  });

  // ---------- EVENTO BOTONES RÁPIDOS ----------
  quickBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const texto = this.textContent.trim();
      handleQuestion(texto);
    });
  });

  // ---------- ABRIR CHAT CON ENFOQUE EN INPUT (opcional) ----------
  // Si quieres que al abrir el chat el input tenga foco, descomenta:
  // chatToggle.addEventListener('click', () => {
  //   if (chatOpen) setTimeout(() => chatInput.focus(), 400);
  // });
});