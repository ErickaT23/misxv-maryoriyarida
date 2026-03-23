// Función para abrir la invitación (sobre) y reproducir la música
function abrirInvitacion() {
  const envelope = document.getElementById('envelope');
  const invitacion = document.getElementById('invitacion');
  const musica = document.getElementById('musica');

  if (musica) {
    musica.play().catch(error => {
      console.warn("El navegador bloqueó la reproducción automática:", error);
    });
  }

  envelope.classList.add('open');

  setTimeout(() => {
    document.getElementById('envelope').style.display = 'none';
    document.getElementById('envelope-top').style.display = 'none';
    document.getElementById('envelope-bottom').style.display = 'none';
    document.getElementById('invitacion').style.display = 'block';
    document.getElementById('musica').play();

    // ✅ Iniciar el contador justo después de mostrar la invitación
    iniciarContador();
  }, 1000);
}



// Asignar el evento de clic al sello para abrir el sobre
document.addEventListener('DOMContentLoaded', function() {
    const seal = document.getElementById('seal');
    if (seal) {
        seal.addEventListener('click', abrirInvitacion);
    }

    document.addEventListener("DOMContentLoaded", () => {
      const params = new URLSearchParams(window.location.search);
      const id = parseInt(params.get("id"), 10);
    
      if (!window.invitados || !Array.isArray(window.invitados)) {
        console.error("No existe window.invitados");
        return;
      }
    
      const invitado = window.invitados.find(inv => inv.id === id);
    
      if (invitado) {
        document.getElementById("nombre-invitado").textContent = invitado.nombre;
    
        const textoPases = `${invitado.pases} pase${invitado.pases > 1 ? "s" : ""} con mucho cariño`;
        document.getElementById("num-pases").textContent = textoPases;
    
        const textoPresencia = invitado.pases > 1
          ? "Este momento no estaría completo sin ustedes."
          : "Este momento no estaría completo sin usted.";
    
        const textoReserva = invitado.pases > 1
          ? "Hemos reservado para ustedes"
          : "Hemos reservado para usted";
    
        const parrafoPresencia = document.querySelector(".section-invitados p");
        if (parrafoPresencia) parrafoPresencia.textContent = textoPresencia;
    
        const parrafoReserva = document.querySelector(".pases p");
        if (parrafoReserva) parrafoReserva.textContent = textoReserva;
    
        // Crear mensaje dinámico para WhatsApp
        const numeroTelefono = "50251645914";
        const mensaje = `Hola, soy ${invitado.nombre} y confirmo mi asistencia al fabuloso cumpleaños de Maryori. Tengo ${invitado.pases} pase${invitado.pases > 1 ? "s" : ""} reservado${invitado.pases > 1 ? "s" : ""}.`;
    
        const enlaceWhatsapp = `https://api.whatsapp.com/send?phone=${numeroTelefono}&text=${encodeURIComponent(mensaje)}`;
    
        const linkConfirmacion = document.getElementById("link-confirmacion");
        if (linkConfirmacion) {
          linkConfirmacion.href = enlaceWhatsapp;
        }
    
      } else {
        document.getElementById("nombre-invitado").textContent = "Invitado Especial";
        document.getElementById("num-pases").textContent = "Pases reservados con mucho cariño";
    
        const linkConfirmacion = document.getElementById("link-confirmacion");
        if (linkConfirmacion) {
          linkConfirmacion.href = `https://api.whatsapp.com/send?phone=50251645914&text=${encodeURIComponent("Hola, deseo confirmar mi asistencia al fabuloso cumpleaños de Maryori.")}`;
        }
      }
    });
    
});


// Función para iniciar el contador de la fecha del evento
function iniciarContador() {
  const eventoFecha = new Date("2026-04-25T00:00:00").getTime();
  const diasElem = document.getElementById("dias");
  const horasElem = document.getElementById("horas");
  const minutosElem = document.getElementById("minutos");
  const segundosElem = document.getElementById("segundos");

  function actualizarContador() {
    const ahora = new Date().getTime();
    const diferencia = eventoFecha - ahora;

    if (diferencia <= 0) {
      clearInterval(intervalo);
      document.getElementById("contador").innerHTML = "<p>¡Ya llegó el gran día!</p>";
      return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    diasElem.innerText = dias;
    horasElem.innerText = horas;
    minutosElem.innerText = minutos;
    segundosElem.innerText = segundos;
  }

  actualizarContador(); // Actualiza inmediatamente
  const intervalo = setInterval(actualizarContador, 1000);
}


// Ejecutar cuando la página esté lista
window.onload = iniciarContador;

function changePhoto(element) {
    const mainPhotoModal = document.getElementById('main-photo-modal');
    mainPhotoModal.src = element.src;
    openModal();
}

function openModal() {
    const modal = document.getElementById('photo-modal');
    modal.style.display = 'flex';
}

function closeModal(event) {
    if (event.target.id === 'photo-modal' || event.target.classList.contains('close')) {
        const modal = document.getElementById('photo-modal');
        modal.style.display = 'none';
    }
}

//Funcion para confirmar la asistencia 
function confirmarAsistencia() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);

  if (!window.invitados || !Array.isArray(window.invitados)) {
    console.error("No existe la lista de invitados.");
    return;
  }

  const invitado = window.invitados.find(inv => inv.id === id);

  const numeroTelefono = "50251645914";

  let mensaje = "Hola, deseo confirmar mi asistencia al fabuloso cumpleaños de Maryori.";

  if (invitado) {
    mensaje = `Hola, soy ${invitado.nombre} y confirmo mi asistencia al fabuloso cumpleaños de Maryori. Tengo ${invitado.pases} pase${invitado.pases > 1 ? "s" : ""} reservado${invitado.pases > 1 ? "s" : ""}.`;
  }

  const enlaceWhatsapp = `https://api.whatsapp.com/send?phone=${numeroTelefono}&text=${encodeURIComponent(mensaje)}`;
  window.open(enlaceWhatsapp, "_blank");
}
//Funcion para abrir waze o maps
//fiesta
function elegirAplicacionOtraDireccion() {
    const enlaceGoogleMaps = 'https://maps.app.goo.gl/YokAqLQi9DA7hXXs8';
    const enlaceWaze = 'https://waze.com/ul?ll=14.558065,-90.729567&navigate=yes';

    // Intentar abrir Google Maps primero
    window.open(enlaceGoogleMaps, '_blank');

    // Intentar abrir Waze (en caso de que Google Maps no esté disponible)
    setTimeout(() => {
        window.open(enlaceWaze, '_blank');
    }, 1000); // Retraso para permitir que el primer enlace se abra si está disponible
}

// script-invitados.js
document.addEventListener("DOMContentLoaded", () => {
  // Obtener id desde la URL (ejemplo: ?id=2)
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  // Buscar en el array global de invitados
  const invitado = window.invitados.find(inv => inv.id === id);

  // Si encontramos el invitado
  if (invitado) {
    // Mostrar nombre
    document.getElementById("nombre-invitado").textContent = invitado.nombre;

    // Mostrar número de pases
    const textoPases = `${invitado.pases} pase${invitado.pases > 1 ? "s" : ""} con mucho cariño`;
    document.getElementById("num-pases").textContent = textoPases;

    // Ajustar textos dinámicos
    const textoPresencia = invitado.pases > 1
      ? "Este momento no estaría completo sin ustedes."
      : "Este momento no estaría completo sin usted.";

    const textoReserva = invitado.pases > 1
      ? "Hemos reservado para ustedes"
      : "Hemos reservado para usted";

    // Aplicar textos al DOM
    const parrafoPresencia = document.querySelector(".section-invitados p");
    if (parrafoPresencia) parrafoPresencia.textContent = textoPresencia;

    const parrafoReserva = document.querySelector(".pases p");
    if (parrafoReserva) parrafoReserva.textContent = textoReserva;

  } else {
    // Si no se encontró al invitado
    document.getElementById("nombre-invitado").textContent = "Invitado Especial";
    document.getElementById("num-pases").textContent = "Pases reservados con mucho cariño";
  }
});

