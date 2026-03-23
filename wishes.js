import './database.js';

// Cuando se hace clic en enviar
document.getElementById('submit-wish').addEventListener('click', async () => {
  const nombre = document.getElementById('wish-name').value.trim();
  const mensaje = document.getElementById('wish-message').value.trim();

  if (!nombre || !mensaje) {
    alert("Por favor escribe tu nombre y mensaje 💌");
    return;
  }

  try {
    await window.guardarDeseo(nombre, mensaje);
    alert("¡Gracias por tu mensaje! 💖");

    // Limpiar inputs
    document.getElementById('wish-name').value = "";
    document.getElementById('wish-message').value = "";

    // Forzar recarga de deseos al volver a abrir
    document.getElementById('wishes-container').dataset.loaded = 'false';
  } catch (error) {
    console.error("Error al guardar deseo:", error);
    alert("Ocurrió un error, intenta de nuevo.");
  }
});

// Toggle para ver deseos
document.getElementById('toggle-wishes-btn').addEventListener('click', () => {
  window.toggleWishes();
});
