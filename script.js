// script.js

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevenir el envío real
  
      const nombre = form.querySelector("input[type='text']").value.trim();
      const correo = form.querySelector("input[type='email']").value.trim();
      const mensaje = form.querySelector("textarea").value.trim();
  
      if (!nombre || !correo || !mensaje) {
        alert("Por favor, completa todos los campos.");
        return;
      }
  
      if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(correo)) {
        alert("Por favor, ingresa un correo válido.");
        return;
      }
  
      alert("Gracias por tu mensaje. Te responderemos pronto 😊");
      form.reset();
    });
  });
  