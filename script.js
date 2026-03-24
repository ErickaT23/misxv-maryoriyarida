// Función para abrir la invitación (sobre) y reproducir la música
function abrirInvitacion() {
  const envelope = document.getElementById("envelope");
  const musica = document.getElementById("musica");

  if (musica) {
    musica.play().catch(error => {
      console.warn("El navegador bloqueó la reproducción automática:", error);
    });
  }

  if (envelope) {
    envelope.classList.add("open");
  }

  setTimeout(() => {
    const envelopeEl = document.getElementById("envelope");
    const envelopeTop = document.getElementById("envelope-top");
    const envelopeBottom = document.getElementById("envelope-bottom");
    const invitacion = document.getElementById("invitacion");

    if (envelopeEl) envelopeEl.style.display = "none";
    if (envelopeTop) envelopeTop.style.display = "none";
    if (envelopeBottom) envelopeBottom.style.display = "none";
    if (invitacion) invitacion.style.display = "block";

    if (musica) {
      musica.play().catch(error => {
        console.warn("No se pudo reproducir la música:", error);
      });
    }

    iniciarContador();
  }, 1000);
}

// Función para iniciar el contador
function iniciarContador() {
  const eventoFecha = new Date("2026-04-25T00:00:00").getTime();
  const diasElem = document.getElementById("dias");
  const horasElem = document.getElementById("horas");
  const minutosElem = document.getElementById("minutos");
  const segundosElem = document.getElementById("segundos");
  const contador = document.getElementById("contador");

  if (!diasElem || !horasElem || !minutosElem || !segundosElem || !contador) return;

  function actualizarContador() {
    const ahora = new Date().getTime();
    const diferencia = eventoFecha - ahora;

    if (diferencia <= 0) {
      clearInterval(intervalo);
      contador.innerHTML = "<p>¡Ya llegó el gran día!</p>";
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

  actualizarContador();
  const intervalo = setInterval(actualizarContador, 1000);
}

// Función para confirmar asistencia por WhatsApp
function confirmarAsistencia() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);

  const numeroTelefono = "50251645914";
  let mensaje = "Hola, quiero confirmar mi asistencia a los Quince de Maryori. Somos __ y asistiremos __ personas. ¡Gracias por invitarnos!";

  if (window.invitados && Array.isArray(window.invitados)) {
    const invitado = window.invitados.find(inv => inv.id === id);

    if (invitado) {
      mensaje = `Hola, somos ${invitado.nombre} y confirmo mi asistencia al fabuloso cumpleaños de Maryori. Tengo ${invitado.pases} pase${invitado.pases > 1 ? "s" : ""} reservado${invitado.pases > 1 ? "s" : ""}.`;
    }
  }

  const enlaceWhatsapp = `https://api.whatsapp.com/send?phone=${numeroTelefono}&text=${encodeURIComponent(mensaje)}`;
  window.open(enlaceWhatsapp, "_blank");
}

// Inicialización general
document.addEventListener("DOMContentLoaded", function () {
  const seal = document.getElementById("seal");
  if (seal) {
    seal.addEventListener("click", abrirInvitacion);
  }

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);

  let invitado = null;
  if (window.invitados && Array.isArray(window.invitados)) {
    invitado = window.invitados.find(inv => inv.id === id);
  }

  const nombreInvitado = document.getElementById("nombre-invitado");
  const numPases = document.getElementById("num-pases");
  const parrafoPresencia = document.querySelector(".section-invitados p");
  const parrafoReserva = document.querySelector(".pases p");
  const linkConfirmacion = document.getElementById("link-confirmacion");

  if (invitado) {
    if (nombreInvitado) nombreInvitado.textContent = invitado.nombre;
    if (numPases) {
      numPases.textContent = `${invitado.pases} pase${invitado.pases > 1 ? "s" : ""} con mucho cariño`;
    }

    if (parrafoPresencia) {
      parrafoPresencia.textContent = invitado.pases > 1
        ? "Este momento no estaría completo sin ustedes."
        : "Este momento no estaría completo sin usted.";
    }

    if (parrafoReserva) {
      parrafoReserva.textContent = invitado.pases > 1
        ? "Hemos reservado para ustedes"
        : "Hemos reservado para usted";
    }
  } else {
    if (nombreInvitado) nombreInvitado.textContent = "Invitado Especial";
    if (numPases) numPases.textContent = "Pases reservados con mucho cariño";
  }

  if (linkConfirmacion) {
    linkConfirmacion.addEventListener("click", function (e) {
      e.preventDefault();
      confirmarAsistencia();
    });
  }
});

function changePhoto(element) {
  const mainPhotoModal = document.getElementById("main-photo-modal");
  if (mainPhotoModal) {
    mainPhotoModal.src = element.src;
  }
  openModal();
}

function openModal() {
  const modal = document.getElementById("photo-modal");
  if (modal) {
    modal.style.display = "flex";
  }
}

function closeModal(event) {
  if (event.target.id === "photo-modal" || event.target.classList.contains("close")) {
    const modal = document.getElementById("photo-modal");
    if (modal) {
      modal.style.display = "none";
    }
  }
}

// Función para abrir Waze o Maps
function elegirAplicacionOtraDireccion() {
  const enlaceGoogleMaps = "https://maps.app.goo.gl/YokAqLQi9DA7hXXs8";
  const enlaceWaze = "https://waze.com/ul?ll=14.558065,-90.729567&navigate=yes";

  window.open(enlaceGoogleMaps, "_blank");

  setTimeout(() => {
    window.open(enlaceWaze, "_blank");
  }, 1000);
}
