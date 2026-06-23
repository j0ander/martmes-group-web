// ============================================
// CHATBOT – chatbot.js
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const chatToggle = document.getElementById('chat-toggle');
  const chatWindow = document.getElementById('chat-window');
  let chatOpen = false;

  if (chatToggle && chatWindow) {
    chatToggle.addEventListener('click', () => {
      chatOpen = !chatOpen;
      if (chatOpen) {
        chatWindow.classList.remove('hidden');
        // Forzar reflow para que la transición funcione
        void chatWindow.offsetWidth;
        chatWindow.classList.remove('translate-y-4', 'opacity-0');
      } else {
        chatWindow.classList.add('translate-y-4', 'opacity-0');
        setTimeout(() => {
          chatWindow.classList.add('hidden');
        }, 300);
      }
    });
  }
});