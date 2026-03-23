import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js';
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyAp9W_ZvwuWSjEqbfiDY3UwehOUWdqenpc",
  authDomain: "misxc-paulavaleria.firebaseapp.com",
  databaseURL: "https://misxc-paulavaleria-default-rtdb.firebaseio.com",
  projectId: "misxc-paulavaleria",
  storageBucket: "misxc-paulavaleria.firebasestorage.app",
  messagingSenderId: "778580522358",
  appId: "1:778580522358:web:d2b5fe01909a62e0963657"
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Definir funciones globales
window.guardarDeseo = function(nombre, mensaje) {
  return push(ref(db, 'buenos-deseos/'), {
    nombre,
    mensaje,
    timestamp: new Date().toISOString()
  });
};

window.toggleWishes = function () {
  const wishesDiv = document.getElementById('wishes-container');
  const dbRef = ref(db, 'buenos-deseos/');

  // Si ya está visible, lo ocultamos
  if (wishesDiv.classList.contains('visible')) {
    wishesDiv.classList.remove('visible');
    wishesDiv.classList.add('hidden');
    return;
  }

  // Si ya fue cargado, solo mostrar
  if (wishesDiv.dataset.loaded === 'true') {
    wishesDiv.classList.remove('hidden');
    wishesDiv.classList.add('visible');
    return;
  }

  // Cargar desde Firebase
  onValue(dbRef, (snapshot) => {
    wishesDiv.innerHTML = ''; // Limpiar antes de agregar
    let count = 0;

    snapshot.forEach((childSnapshot) => {
      const wish = childSnapshot.val();
      if (!wish.nombre || !wish.mensaje) return;

      const p = document.createElement('p');
      p.innerHTML = `<strong>${wish.nombre}:</strong> ${wish.mensaje}`;
      wishesDiv.appendChild(p);
      count++;
    });

    if (count === 0) {
      wishesDiv.innerHTML = '<p style="text-align:center;">Aún no hay deseos enviados 💌</p>';
    }

    wishesDiv.dataset.loaded = 'true';
    wishesDiv.classList.remove('hidden');
    wishesDiv.classList.add('visible');
  }, { onlyOnce: true });
};

