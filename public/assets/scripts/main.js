// NAVBAR SCROLL
window.addEventListener('scroll', function () {
    const header = document.querySelector('.Header-Navbar');
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// CARGAS DINÁMICAS
document.addEventListener("DOMContentLoaded", () => {
    const includes = [
        { selector: "#header-placeholder", file: "header.html" },
        { selector: ".footer-placeholder", file: "Footer.html" },
        { selector: ".encuesta-placeholder", file: "encuesta.html" },
        { selector: ".contacto-placeholder", file: "contacto.html" },
        { selector: ".precios-placeholder", file: "precios.html" },
        { selector: ".modales-placeholder", file: "modales.html" },
    ];

    includes.forEach(({ selector, file }) => {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                document.querySelectorAll(selector).forEach(el => el.innerHTML = data);
            })
            .then(() => {
                if (file === "modales.html") {
                    inicializarModales();
                }
            });
    });
});

// VISTA PREVIA IMAGEN
function mostrarPreview(event) {
    const file = event.target.files[0];
    if (file) {
        const preview = document.getElementById('preview-foto');
        preview.src = URL.createObjectURL(file);
    }
}

// VALIDACIÓN Y FUNCIONALIDAD DE MODALES
function inicializarModales() {
    const input = document.getElementById("inputPerfil");
    if (input) input.addEventListener("change", mostrarPreview);

    // botón crear cuenta con redirección
    const botonRegistro = document.querySelector('#signUp button');
    if (botonRegistro) {
        botonRegistro.addEventListener('click', function (e) {
            e.preventDefault();
            const campos = document.querySelectorAll('#signUp input[required], #signUp select[required]');
            let todoCorrecto = true;

            campos.forEach(campo => {
                if (campo.value.trim() === "") {
                    campo.classList.add('error-input');
                    todoCorrecto = false;
                } else {
                    campo.classList.remove('error-input');
                }
            });

            if (!todoCorrecto) {
                alert("Por favor, completa todos los campos del formulario.");
            } else {
                alert("¡Cuenta creada con éxito!");
                window.location.href = 'cuenta.html';
            }
        });
    }

    // botón iniciar sesión con redirección
    const botonLogin = document.querySelector('#login button');
    if (botonLogin) {
        botonLogin.addEventListener('click', function (e) {
            e.preventDefault();
            const email = document.querySelector('#login input[type="email"]').value.trim();
            const password = document.querySelector('#login input[type="password"]').value.trim();

            if (!email || !password) {
                alert("Completa tu correo y contraseña para iniciar sesión.");
            } else {
                alert("¡Inicio de sesión exitoso!");
                window.location.href = 'cuenta.html';
            }
        });
    }

    // cerrar modal
    const cerrar = document.querySelectorAll('.close-modal');
    cerrar.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.closest('.modal-auth').style.display = 'none';
            window.location.hash = "";
        });
    });

    // mostrar modal según hash
    function actualizarModal() {
        document.getElementById("signUp").style.display = window.location.hash === "#signUp" ? "block" : "none";
        document.getElementById("login").style.display = window.location.hash === "#login" ? "block" : "none";
    }

    window.addEventListener("hashchange", actualizarModal);
    actualizarModal();
}

// Cambio de color al hacer scroll sobre contenedor-principal
document.addEventListener("DOMContentLoaded", function () {
    const contenedor = document.getElementById("contenedor-principal");

    function actualizarColorFondo() {
        const rect = contenedor.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const visibleAltura = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
        const porcentajeVisible = visibleAltura / rect.height;

        if (porcentajeVisible > 0.5) {
            contenedor.classList.add("activo");
        } else {
            contenedor.classList.remove("activo");
        }
    }

    window.addEventListener("scroll", actualizarColorFondo);
    window.addEventListener("resize", actualizarColorFondo);
    actualizarColorFondo();
});

// para cuenta.html
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes('cuenta.html')) {
        document.getElementById('foto-perfil').src = localStorage.getItem('fotoPerfil') || 'Imagenes/FotoPerfil.svg';
        document.getElementById('nombre-usuario').textContent = localStorage.getItem('nombreUsuario') || 'Usuario';
        document.getElementById('correo-usuario').textContent = localStorage.getItem('correoUsuario') || 'usuario@correo.com';

        document.getElementById('guardar-saldo').addEventListener('click', () => {
            const saldo = document.getElementById('saldo-bancario').value;
            localStorage.setItem('saldoBancario', saldo);
            document.getElementById('saldo-guardado').textContent = `Saldo guardado: S/${saldo}`;
        });

        document.getElementById('mostrar-predicciones').addEventListener('click', () => {
            const saldo = parseFloat(localStorage.getItem('saldoBancario') || 0);
            document.getElementById('predicciones-mes').textContent = `Ingresos estimados: S/${(saldo*1.1).toFixed(2)}, Gastos estimados: S/${(saldo*0.9).toFixed(2)}`;
        });

        document.getElementById('guardar-alertas').addEventListener('click', () => {
            const endeudamiento = document.getElementById('alerta-endeudamiento').checked;
            const presupuesto = document.getElementById('alerta-presupuesto').checked;
            localStorage.setItem('alertaEndeudamiento', endeudamiento);
            localStorage.setItem('alertaPresupuesto', presupuesto);
            alert('Alertas guardadas exitosamente.');
        });

        document.getElementById('conectar-dispositivo').addEventListener('click', () => {
            const dispositivo = prompt("Nombre del dispositivo:");
            if (dispositivo) {
                const lista = document.getElementById('lista-dispositivos');
                const item = document.createElement('li');
                item.textContent = dispositivo;
                lista.appendChild(item);
            }
        });

        document.getElementById('enviar-consulta').addEventListener('click', () => {
            const consulta = document.getElementById('consulta-ia').value;
            document.getElementById('respuesta-ia').textContent = `IA dice: "Esto es lo que debes saber sobre '${consulta}'."`;
        });

        document.getElementById('ver-reporte-semanal').addEventListener('click', () => {
            document.getElementById('reporte-resultados').textContent = "Tus gastos bajaron un 5% esta semana.";
        });

        document.getElementById('ver-recomendacion-mensual').addEventListener('click', () => {
            document.getElementById('reporte-resultados').textContent = "Presupuesto recomendado este mes: S/2000.";
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const preguntas = [
    { q: "¿Llevas un registro detallado de tus gastos?", opciones: ["Siempre", "A veces", "Nunca"], valores: [10, 5, 0] },
    { q: "¿Logras ahorrar al menos el 20% de tus ingresos mensuales?", opciones: ["Sí, siempre", "Algunas veces", "Casi nunca"], valores: [10, 5, 0] },
    { q: "¿Has tenido que recurrir al crédito para cubrir gastos básicos?", opciones: ["Nunca", "A veces", "Frecuentemente"], valores: [10, 5, 0] },
    { q: "¿Realizas un presupuesto mensual?", opciones: ["Sí, estricto", "Sí, flexible", "No lo hago"], valores: [10, 5, 0] },
        { q: "¿Cuentas con un fondo de emergencia?", opciones: ["Sí", "En proceso", "No"], valores: [10, 5, 0] },
        { q: "¿Tus gastos suelen ser mayores que tus ingresos?", opciones: ["Nunca", "A veces", "Frecuentemente"], valores: [10, 5, 0] },
        { q: "¿Tienes deudas sin control o difíciles de pagar?", opciones: ["No tengo", "Moderadas", "Altas"], valores: [10, 5, 0] },
        { q: "¿Utilizas herramientas digitales para gestionar tu dinero?", opciones: ["Sí, frecuentemente", "Rara vez", "Nunca"], valores: [10, 5, 0] },
        { q: "¿Te informas sobre educación financiera regularmente?", opciones: ["Sí, activamente", "Ocasionalmente", "Nunca"], valores: [10, 5, 0] },
        { q: "¿Planeas financieramente a largo plazo?", opciones: ["Sí", "Parcialmente", "No"], valores: [10, 5, 0] }
    ];

    let actual = 0, puntaje = 0;

    const pregunta = document.getElementById('pregunta');
    const opciones = document.getElementById('opciones');
    const siguiente = document.getElementById('siguiente');
    const resultado = document.getElementById('resultado');
    const mensajeResultado = document.getElementById('mensaje-resultado');
    const puntajeFinal = document.getElementById('puntaje');

    function mostrarPregunta(index) {
        const p = preguntas[index];
        pregunta.textContent = p.q;
        opciones.innerHTML = '';
        p.opciones.forEach((opcion, idx) => {
        const div = document.createElement('div');
        div.classList.add('opcion');
        div.textContent = opcion;
        div.addEventListener('click', () => {
            document.querySelectorAll('.opcion').forEach(op => op.classList.remove('seleccionado'));
            div.classList.add('seleccionado');
            siguiente.disabled = false;
            siguiente.onclick = () => {
            puntaje += p.valores[idx];
            siguientePregunta();
            };
        });
        opciones.appendChild(div);
        });
        siguiente.disabled = true;
    }

    function siguientePregunta() {
        actual++;
        if (actual < preguntas.length) {
        mostrarPregunta(actual);
        } else {
        finalizarCuestionario();
        }
        }

    function finalizarCuestionario() {
    document.getElementById('contenedor-preguntas').classList.add('oculto');
    resultado.classList.remove('oculto');
    puntajeFinal.textContent = puntaje;
    mensajeResultado.textContent =
        puntaje >= 80 ? "Excelente salud financiera, sigue así." :
        puntaje >= 50 ? "Buena salud financiera, pero puedes mejorar." :
        "Tu salud financiera es preocupante, debes actuar pronto.";
    }

    mostrarPregunta(actual);
});
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("grafico-gastos")) {
    const ctxGastos = document.getElementById('grafico-gastos').getContext('2d');
    const ctxIngresos = document.getElementById('grafico-ingresos').getContext('2d');
    const ctxBalance = document.getElementById('grafico-balance').getContext('2d');

    // Datos de ejemplo (puedes actualizar dinámicamente)
    const gastosMensuales = [120, 200, 180, 220, 160, 240];
    const ingresosMensuales = [300, 280, 290, 320, 310, 330];

    new Chart(ctxGastos, {
      type: 'bar',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
          label: 'Gastos (S/)',
          data: gastosMensuales,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Gastos Mensuales'
          }
        }
      }
    });

    new Chart(ctxIngresos, {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
          label: 'Ingresos (S/)',
          data: ingresosMensuales,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Ingresos Mensuales'
          }
        }
      }
    });

    const balance = ingresosMensuales.map((ingreso, i) => ingreso - gastosMensuales[i]);

    new Chart(ctxBalance, {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
          label: 'Balance (S/)',
          data: balance,
          backgroundColor: 'rgba(255, 206, 86, 0.6)',
          borderColor: 'rgba(255, 206, 86, 1)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Balance Mensual'
          }
        }
      }
    });
  }
});
