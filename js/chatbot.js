// ============================================
// CHATBOT – chatbot.js (Versión final)
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  const chatToggle = document.getElementById('chat-toggle');
  const chatWindow = document.getElementById('chat-window');
  const chatClose = document.getElementById('chat-close');
  const chatMessages = document.getElementById('chat-messages');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const quickBtns = document.querySelectorAll('.quick-btn');

  let chatOpen = false;
  let step = 0; // 0: normal, 1: nombre, 2: apellido, 3: email, 4: teléfono, 5: confirmación
  let userData = {};

  // ---------- RESPUESTAS PREDEFINIDAS ----------
  function getResponse(pregunta) {
    const q = pregunta.toLowerCase().trim();
    if (q.includes('hola') || q.includes('buenos') || q.includes('saludo')) {
      return '¡Hola! ¿Cómo puedo ayudarte? Si quieres, podemos registrar tus datos para que un asesor te contacte. (Responde "Sí" para empezar)';
    }
    if (q.includes('servicio') || q.includes('qué ofrecen') || q.includes('hacen')) {
      return 'Ofrecemos tres líneas principales:<br><b>• Asesoría Jurídica:</b> derecho civil, familia, recuperación de cartera.<br><b>• Consultoría Empresarial:</b> constitución de empresas, marketing, protección de datos.<br><b>• Gestión Inmobiliaria:</b> corretaje, proyectos, construcción.<br>¿Quieres más detalles de alguno?';
    }
    if (q.includes('jurídica') || q.includes('legal') || q.includes('abogado')) {
      return 'Nuestra área jurídica abarca derecho civil (adjudicación de tierras, particiones, traspasos), recuperación de cartera, derecho de familia (divorcios, pensiones, tenencia) y defensa de derechos (acciones de protección).';
    }
    if (q.includes('empresarial') || q.includes('empresa') || q.includes('marca') || q.includes('constitución')) {
      return 'En consultoría empresarial realizamos constitución de empresas, registro de marcas, planificación estratégica, marketing digital y protección de datos personales.';
    }
    if (q.includes('inmobiliaria') || q.includes('propiedad') || q.includes('terreno') || q.includes('construcción')) {
      return 'Gestionamos y comercializamos propiedades, desarrollamos proyectos de lotización y urbanización, diseñamos y construimos viviendas, edificios, y ofrecemos consultorías técnicas (arquitectura, topografía, regularización).';
    }
    if (q.includes('dirección') || q.includes('ubicación') || q.includes('dónde') || q.includes('oficina') || q.includes('mapa')) {
      return 'Estamos en <b>Av. Pedro Fermin Cevallos y Juan León Mera, edificio Mutualista Ambato, 3er piso, Oficina 303, Ambato - Ecuador.</b> Puedes ver la ubicación en Google Maps desde nuestro sitio web.';
    }
    if (q.includes('contacto') || q.includes('teléfono') || q.includes('correo') || q.includes('email') || q.includes('whatsapp')) {
      return 'Puedes contactarnos por:<br><b>• Teléfono:</b> 0997392987<br><b>• WhatsApp:</b> +593 99 739 2987<br><b>• Correo:</b> info@martmes.com<br><b>• Facturación:</b> facturacion@martmes.com';
    }
    if (q.includes('equipo') || q.includes('directivo') || q.includes('miembro')) {
      return 'Nuestro equipo está conformado por:<br><b>• Ing. Edison Mesías, Mtr.</b> – Director de Marketing y Estrategia<br><b>• Abg. Karina Martínez Torres, Mtra.</b> – Asesor legal y Consultor<br><b>• Abg. Pablo Acurio, Mgtr.</b> – Asesor en Litigios y Derecho Civil';
    }
    if (q.includes('redes') || q.includes('instagram') || q.includes('facebook') || q.includes('tiktok')) {
      return 'Síguenos en:<br><b>• Instagram:</b> @martmesgroup<br><b>• Facebook:</b> MARTMES Group<br><b>• LinkedIn:</b> MARTMES Group<br><b>• TikTok:</b> @martmesgroup';
    }
    if (q.includes('misión') || q.includes('misión')) {
      return 'Nuestra misión es brindar asesoría integral y soluciones estratégicas que permitan a empresas, instituciones y personas tomar decisiones inteligentes, seguras y sostenibles.';
    }
    if (q.includes('visión') || q.includes('visión')) {
      return 'Ser una firma empresarial líder a nivel nacional, reconocida por su capacidad de integrar conocimiento, innovación y experiencia multidisciplinaria.';
    }
    if (q.includes('valor') || q.includes('principios') || q.includes('ética')) {
      return 'Nuestros valores son: <b>Honestidad y Transparencia, Compromiso, Orientación al Cliente, Confianza, Responsabilidad y Ética Profesional.</b>';
    }
    return 'Lo siento, no tengo información sobre eso. ¿Te gustaría registrar tus datos para que un asesor te contacte? (Responde "Sí" para empezar)';
  }

  // ---------- INICIAR CAPTURA ----------
  function iniciarConversacion() {
    chatMessages.innerHTML = '';
    document.getElementById('quick-buttons').style.display = 'none';
    userData = {};
    step = 1;

    addMessage('¡Hola! Soy el asesor virtual de MARTMES GROUP. ¿Me ayudas con algunos datos para conocerte mejor?', 'bot');
    setTimeout(() => {
      addMessage('Dime, ¿<b>cuál es tu nombre</b>?', 'bot');
    }, 800);
  }

  // ---------- ABRIR / CERRAR (con clase .open) ----------
  function openChat() {
    if (chatOpen) return;
    chatOpen = true;
    chatWindow.classList.add('open');
    // Si no hay mensajes, iniciar conversación
    if (chatMessages.children.length === 0) {
      iniciarConversacion();
    }
    setTimeout(() => chatInput.focus(), 400);
  }

  function closeChat() {
    if (!chatOpen) return;
    chatOpen = false;
    chatWindow.classList.remove('open');
    // Esperar a que termine la animación (0.4s) para reiniciar el contenido
    setTimeout(() => {
      chatMessages.innerHTML = '';
      step = 0;
      userData = {};
      document.getElementById('quick-buttons').style.display = 'flex';
    }, 450);
  }

  chatToggle.addEventListener('click', () => {
    if (chatOpen) {
      closeChat();
    } else {
      openChat();
    }
  });

  chatClose.addEventListener('click', closeChat);

  // ---------- AGREGAR MENSAJE CON ANIMACIÓN ----------
  function addMessage(text, tipo) {
    const div = document.createElement('div');
    div.className = `flex items-start gap-2 ${tipo === 'user' ? 'flex-row-reverse' : ''}`;

    const icon = document.createElement('div');
    icon.className = `w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${tipo === 'user' ? 'bg-secondary/20' : 'bg-primary/10'}`;
    icon.innerHTML = tipo === 'user'
      ? '<span class="material-symbols-outlined text-secondary text-sm">person</span>'
      : '<span class="material-symbols-outlined text-primary text-sm">smart_toy</span>';

    const bubble = document.createElement('div');
    bubble.className = `rounded-xl p-3 max-w-[85%] ${tipo === 'user' ? 'bg-secondary/10 text-on-surface' : 'bg-surface-container'} message-bubble`;
    bubble.innerHTML = text.replace(/\n/g, '<br>');

    div.appendChild(icon);
    div.appendChild(bubble);
    chatMessages.appendChild(div);

    setTimeout(() => {
      chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  }

  // ---------- ENVIAR DATOS A LA API ----------
  async function enviarDatos(data) {
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Error al enviar datos:', error);
      return { success: false, error: 'Error de conexión' };
    }
  }

  // ---------- PROCESAR RESPUESTA ----------
  async function handleUserInput(input) {
    const text = input.trim();
    if (!text) return;

    addMessage(text, 'user');

    if (step === 0) {
      const respuesta = getResponse(text);
      setTimeout(() => addMessage(respuesta, 'bot'), 400);
      if (text.toLowerCase() === 'sí' || text.toLowerCase() === 'si') {
        setTimeout(() => iniciarConversacion(), 600);
      }
      return;
    }

    document.getElementById('quick-buttons').style.display = 'none';

    switch (step) {
      case 1:
        if (text.length < 2) {
          addMessage('Por favor, ingresa un nombre válido (mínimo 2 caracteres):', 'bot');
          break;
        }
        userData.nombres = text;
        addMessage('Perfecto. ¿Y <b>cuáles son tus apellidos</b>?', 'bot');
        step = 2;
        break;

      case 2:
        if (text.length < 2) {
          addMessage('Ingresa tus apellidos completos, por favor:', 'bot');
          break;
        }
        userData.apellidos = text;
        addMessage('Gracias. Ahora, ¿<b>cuál es tu correo electrónico</b>?', 'bot');
        step = 3;
        break;

      case 3:
        if (!text.includes('@') || !text.includes('.')) {
          addMessage('El correo no parece válido. Por favor, ingrésalo nuevamente (ej. usuario@dominio.com):', 'bot');
          break;
        }
        userData.email = text;
        addMessage('Excelente. Por último, necesito tu <b>número de teléfono</b> (con código de país, ej. +593 99 999 9999):', 'bot');
        step = 4;
        break;

      case 4:
        const telefonoLimpio = text.replace(/[^0-9+]/g, '');
        if (telefonoLimpio.length < 10) {
          addMessage('El número parece incompleto. Por favor, ingrésalo nuevamente (ej. +593 99 999 9999):', 'bot');
          break;
        }
        userData.telefono = text;

        const resumen = `<b>Resumen de tus datos:</b><br><br>
                         <b>Nombre:</b> ${userData.nombres}<br>
                         <b>Apellidos:</b> ${userData.apellidos}<br>
                         <b>Email:</b> ${userData.email}<br>
                         <b>Teléfono:</b> ${userData.telefono}<br><br>
                         <i>He leído y acepto que mis datos serán tratados conforme a la <b>Política de Protección de Datos Personales</b> que se encuentra en nuestro sitio web.</i><br><br>
                         Escribe <b>"Acepto"</b> para confirmar y guardar tus datos, o <b>"No"</b> para corregir.`;
        addMessage(resumen, 'bot');
        step = 5;
        break;

      case 5:
        if (text.toLowerCase() === 'acepto') {
          addMessage('Guardando tus datos...', 'bot');
          const result = await enviarDatos({
            nombres: userData.nombres,
            apellidos: userData.apellidos,
            email: userData.email,
            telefono: userData.telefono
          });

          if (result.success) {
            addMessage('¡Listo! Tus datos han sido registrados. En breve un asesor se comunicará contigo.<br><br>Gracias por confiar en <b>MARTMES GROUP</b>.', 'bot');
          } else {
            addMessage('Hubo un error al guardar tus datos. Por favor, intenta nuevamente más tarde o contáctanos directamente por WhatsApp.', 'bot');
          }

          step = 0;
          userData = {};
          document.getElementById('quick-buttons').style.display = 'flex';

        } else if (text.toLowerCase() === 'no') {
          addMessage('De acuerdo, empecemos de nuevo. ¿Cuál es tu nombre?', 'bot');
          step = 1;
          userData = {};
        } else {
          addMessage('Por favor, responde con <b>"Acepto"</b> para guardar o <b>"No"</b> para corregir tus datos.', 'bot');
        }
        break;

      default:
        addMessage('Lo siento, no entendí. ¿Podrías repetirlo?', 'bot');
    }
  }

  // ---------- EVENTOS ----------
  chatForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const texto = chatInput.value.trim();
    if (texto) {
      handleUserInput(texto);
      chatInput.value = '';
    }
  });

  quickBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const texto = this.textContent.trim();
      if (step > 0) {
        addMessage('Por favor, completa el registro antes de consultar otras cosas.', 'bot');
        return;
      }
      handleUserInput(texto);
    });
  });
});