document.addEventListener("DOMContentLoaded", () => {
  // --- FUNCION REUSABLE PARA MOSTRAR PANELES ---
  const inicioGrid = document.querySelector(".inicio-grid");
  const carouselServicios = document.querySelector(".carousel-servicios");
  const funcionalidadesGrid = document.querySelector(".funcionalidades-grid");
  function mostrarPanel(target) {
    const panelMap = {
      inicio: inicioGrid,
      servicios: carouselServicios,
      funcionalidades: funcionalidadesGrid,
    };
    [inicioGrid, carouselServicios, funcionalidadesGrid].forEach(grid => {
      if (grid) grid.style.display = "none";
    });
    if (panelMap[target]) panelMap[target].style.display = "grid";
  }

  const navLinks = document.querySelectorAll(".nav-link");
  const panels = {
    inicio: document.getElementById("panelInicio"),
    servicios: document.getElementById("panelServicios"),
    funcionalidades: document.getElementById("panelFuncionalidades")
  };

  if (inicioGrid) inicioGrid.style.display = "grid";
  if (carouselServicios) carouselServicios.style.display = "none";
  if (funcionalidadesGrid) funcionalidadesGrid.style.display = "none";

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      // Mover aquí el indicador activo en navegación
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      const target = link.getAttribute("href").replace("#", "");
      if (target === "contacto") {
        const contactoSection = document.getElementById("contacto");
        if (contactoSection) {
          contactoSection.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }
      const currentPanel = document.querySelector(".dynamic-content.active");
      if (currentPanel) {
        currentPanel.classList.add("fade-out");
        setTimeout(() => {
          currentPanel.classList.remove("active");
          currentPanel.classList.remove("fade-out");

          panels[target].classList.add("active");
          panels[target].classList.add("fade-in");
          const transparentBoxes = document.querySelectorAll('.hero-caja-transparente');
          transparentBoxes.forEach(box => box.scrollTop = 0);
          // Nueva animación de inicio-opciones
          if (target === "inicio") {
            const inicioOpciones = panels[target].querySelector(".inicio-grid");
            if (inicioOpciones) {
              inicioOpciones.classList.remove("fade-in");
              void inicioOpciones.offsetWidth;
              inicioOpciones.classList.add("fade-in");
            }
          }
          setTimeout(() => {
            panels[target].classList.remove("fade-in");
          }, 600);
        }, 400);
      } else {
        panels[target].classList.add("active");
        panels[target].classList.add("fade-in");
        const transparentBoxes = document.querySelectorAll('.hero-caja-transparente');
        transparentBoxes.forEach(box => box.scrollTop = 0);
        // Nueva animación de inicio-opciones
        if (target === "inicio") {
          const inicioOpciones = panels[target].querySelector(".inicio-grid");
          if (inicioOpciones) {
            inicioOpciones.classList.remove("fade-in");
            void inicioOpciones.offsetWidth;
            inicioOpciones.classList.add("fade-in");
          }
        }
        setTimeout(() => {
          panels[target].classList.remove("fade-in");
        }, 600);
      }
      const infoContenedorGris = document.querySelector('.info-contenedor-gris');
      if (infoContenedorGris && window.scrollY > 20) {
        infoContenedorGris.classList.add('desvanecer-fondo');
        setTimeout(() => {
          infoContenedorGris.classList.remove('desvanecer-fondo');
        }, 500);
      }

      // USAR FUNCION REUSABLE PARA MOSTRAR EL GRID CORRECTO
      mostrarPanel(target);
      // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  });

  // Botón flotante "Volver arriba"
  const btnArriba = document.getElementById("btn-arriba");
  window.addEventListener("scroll", () => {
    btnArriba.style.display = window.scrollY > 300 ? "block" : "none";
  });
  btnArriba.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ---- INICIO BLOQUE DE SEGUNDO DOMContentLoaded (fusionado aquí) ----
  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = form.querySelector("input[type='text']").value.trim();
    const correo = form.querySelector("input[type='email']").value.trim();
    const mensaje = form.querySelector("textarea").value.trim();
    const feedback = document.getElementById("form-feedback");

    if (!nombre || !correo || !mensaje) {
      feedback.textContent = "Por favor, completa todos los campos.";
      feedback.classList.remove("hidden");
      feedback.classList.add("feedback-show");
      setTimeout(() => {
        feedback.classList.remove("feedback-show");
        feedback.classList.add("hidden");
      }, 4000);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      feedback.textContent = "Por favor, ingresa un correo válido.";
      feedback.classList.remove("hidden");
      feedback.classList.add("feedback-show");
      setTimeout(() => {
        feedback.classList.remove("feedback-show");
        feedback.classList.add("hidden");
      }, 4000);
      return;
    }

    feedback.textContent = "Gracias por tu mensaje. ¡Te responderemos pronto!";
    feedback.classList.remove("hidden");
    feedback.classList.add("feedback-show");
    form.reset();
    setTimeout(() => {
      feedback.classList.remove("feedback-show");
      feedback.classList.add("hidden");
    }, 4000);
  });

  // Agrega clase para disparar animación una vez cargado
  const stonksImg = document.querySelector(".stonks-img");
  const cerditoImg = document.querySelector(".cerdito-img");
  const robotImg = document.querySelector(".robot-img");
  const plantaImg = document.querySelector(".planta-img");

  // Removed immediate opacity and transform settings for robotImg and plantaImg to allow scroll-based logic

  const heroText = document.querySelector(".hero-text");
  if (heroText) {
    heroText.classList.add("hero-text-anim");
  }

  // Eliminado: animación automática de robotImg y plantaImg al cargar la página

  const encuestaImg = document.querySelector(".encuesta-img");
  if (encuestaImg) {
    stonksImg.classList.add("fade-in-start");
    cerditoImg.classList.add("fade-in-start");
    encuestaImg.classList.add("fade-in-slide-up");
    // Store original transform values after animations complete
    stonksImg.dataset.initialTransform = window.getComputedStyle(stonksImg).transform;
    cerditoImg.dataset.initialTransform = window.getComputedStyle(cerditoImg).transform;
    encuestaImg.dataset.initialTransform = window.getComputedStyle(encuestaImg).transform;
  }

  // Store original transform values for robotImg and plantaImg
  if (robotImg && plantaImg) {
    robotImg.dataset.initialTransform = window.getComputedStyle(robotImg).transform;
    plantaImg.dataset.initialTransform = window.getComputedStyle(plantaImg).transform;
    // Ensure no fade-in-start class is present on load
    robotImg.classList.remove("fade-in-start");
    plantaImg.classList.remove("fade-in-start");
    // Removed adding initial-hidden class here to prevent flicker; handled in observer instead
  }

  const panelServicios = document.getElementById("panelServicios");
  // Removed MutationObserver and related logic for panelServicios and robotImg/plantaImg

  const scrollAnimatedElements = document.querySelectorAll("[data-animate='scroll']");

  const infoContenedorGris = document.querySelector(".info-contenedor-gris");

  window.addEventListener("scroll", () => {
    if (infoContenedorGris) {
      const scrollY = window.scrollY;
      if (scrollY > 20) {
        infoContenedorGris.classList.add("scroll-color");
      } else {
        infoContenedorGris.classList.remove("scroll-color");
      }
    }
  });

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const cerdito = document.querySelector(".cerdito-img");
    const stonks = document.querySelector(".stonks-img");
    const encuesta = document.querySelector(".encuesta-img");
    const robot = document.querySelector(".robot-img");
    const planta = document.querySelector(".planta-img");

    if (cerdito && stonks) {
      const offset = Math.min(scrollY * 0.1, 60);
      const opacity = Math.max(1 - scrollY / 600, 0.4);

      cerdito.style.transform = `translate(${offset}px, ${offset * 0.5}px)`;
      stonks.style.transform = `translate(-${offset}px, ${offset * 0.5}px)`;

      cerdito.style.opacity = opacity;
      stonks.style.opacity = opacity;

      cerdito.classList.remove("fade-in-start");
      stonks.classList.remove("fade-in-start");
    }

    if (panelServicios.classList.contains("active")) {
      if (robot && planta) {
        const offset = Math.min(scrollY * 0.1, 60);
        const opacity = Math.max(1 - scrollY / 600, 0.4);

        robot.style.transition = "transform 0.4s ease, opacity 0.4s ease";
        planta.style.transition = "transform 0.4s ease, opacity 0.4s ease";

        robot.style.transform = `translate(-${offset * 0.5}px, ${offset * 0.5}px)`;
        planta.style.transform = `translate(${offset * 0.5}px, ${offset * 0.5}px)`;

        robot.style.opacity = opacity;
        planta.style.opacity = opacity;
      }
    }

    const panelFuncionalidades = document.getElementById("panelFuncionalidades");

    if (panelFuncionalidades.classList.contains("active")) {
      const cerditoHappy = document.querySelector(".cerdito-happy-img");
      const robotHappy = document.querySelector(".robot-happy-img");

      if (cerditoHappy && robotHappy) {
        const offset = Math.min(scrollY * 0.1, 60);
        const opacity = Math.max(1 - scrollY / 600, 0.4);

        cerditoHappy.style.transition = "transform 0.4s ease, opacity 0.4s ease";
        robotHappy.style.transition = "transform 0.4s ease, opacity 0.4s ease";

        cerditoHappy.style.transform = `translate(${offset}px, ${offset * 0.5}px)`;
        robotHappy.style.transform = `translate(-${offset}px, ${offset * 0.5}px)`;

        cerditoHappy.style.opacity = opacity;
        robotHappy.style.opacity = opacity;
      }
    }

    // Removed previous standalone if (robot && planta) block to avoid duplication

    if (encuesta) {
      const encuestaOffset = Math.min(scrollY * 0.08, 50);
      const encuestaOpacity = Math.max(1 - scrollY / 700, 0.5);
      if (scrollY > 5) {
        encuesta.style.transform = `translateY(${encuestaOffset}px)`;
      } else {
        encuesta.style.transform = encuesta.dataset.initialTransform;
      }
      encuesta.style.opacity = encuestaOpacity;
    }
  });

  function handleScrollAnimation() {
    if (!encuestaImg) return;
    const rect = encuestaImg.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    // Removed block that adds fade-in-slide-up class on scroll
  }

  // Removed window.addEventListener("scroll", handleScrollAnimation);
  // Removed handleScrollAnimation();
  // ---- FIN BLOQUE SEGUNDO DOMContentLoaded ----
});
// script.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = form.querySelector("input[type='text']").value.trim();
    const correo = form.querySelector("input[type='email']").value.trim();
    const mensaje = form.querySelector("textarea").value.trim();

    if (!nombre || !correo || !mensaje) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      alert("Por favor, ingresa un correo válido.");
      return;
    }

    alert("Gracias por tu mensaje. Te responderemos pronto 😊");
    form.reset();
  });

  // Agrega clase para disparar animación una vez cargado
  const stonksImg = document.querySelector(".stonks-img");
  const cerditoImg = document.querySelector(".cerdito-img");
  const robotImg = document.querySelector(".robot-img");
  const plantaImg = document.querySelector(".planta-img");

  // Removed immediate opacity and transform settings for robotImg and plantaImg to allow scroll-based logic

  const heroText = document.querySelector(".hero-text");
  if (heroText) {
    heroText.classList.add("hero-text-anim");
  }

  // Eliminado: animación automática de robotImg y plantaImg al cargar la página

  const encuestaImg = document.querySelector(".encuesta-img");
  if (encuestaImg) {
    stonksImg.classList.add("fade-in-start");
    cerditoImg.classList.add("fade-in-start");
    encuestaImg.classList.add("fade-in-slide-up");
    // Store original transform values after animations complete
    stonksImg.dataset.initialTransform = window.getComputedStyle(stonksImg).transform;
    cerditoImg.dataset.initialTransform = window.getComputedStyle(cerditoImg).transform;
    encuestaImg.dataset.initialTransform = window.getComputedStyle(encuestaImg).transform;
  }

  // Store original transform values for robotImg and plantaImg
  if (robotImg && plantaImg) {
    robotImg.dataset.initialTransform = window.getComputedStyle(robotImg).transform;
    plantaImg.dataset.initialTransform = window.getComputedStyle(plantaImg).transform;
    // Ensure no fade-in-start class is present on load
    robotImg.classList.remove("fade-in-start");
    plantaImg.classList.remove("fade-in-start");
    // Removed adding initial-hidden class here to prevent flicker; handled in observer instead
  }

  const panelServicios = document.getElementById("panelServicios");
  // Removed MutationObserver and related logic for panelServicios and robotImg/plantaImg

  const scrollAnimatedElements = document.querySelectorAll("[data-animate='scroll']");

  const infoContenedorGris = document.querySelector(".info-contenedor-gris");

  window.addEventListener("scroll", () => {
    if (infoContenedorGris) {
      const scrollY = window.scrollY;
      if (scrollY > 20) {
        infoContenedorGris.classList.add("scroll-color");
      } else {
        infoContenedorGris.classList.remove("scroll-color");
      }
    }
  });

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const cerdito = document.querySelector(".cerdito-img");
    const stonks = document.querySelector(".stonks-img");
    const encuesta = document.querySelector(".encuesta-img");
    const robot = document.querySelector(".robot-img");
    const planta = document.querySelector(".planta-img");

    if (cerdito && stonks) {
      const offset = Math.min(scrollY * 0.1, 60);
      const opacity = Math.max(1 - scrollY / 600, 0.4);

      cerdito.style.transform = `translate(${offset}px, ${offset * 0.5}px)`;
      stonks.style.transform = `translate(-${offset}px, ${offset * 0.5}px)`;

      cerdito.style.opacity = opacity;
      stonks.style.opacity = opacity;

      cerdito.classList.remove("fade-in-start");
      stonks.classList.remove("fade-in-start");
    }

    if (panelServicios.classList.contains("active")) {
      if (robot && planta) {
        const offset = Math.min(scrollY * 0.1, 60);
        const opacity = Math.max(1 - scrollY / 600, 0.4);

        robot.style.transition = "transform 0.4s ease, opacity 0.4s ease";
        planta.style.transition = "transform 0.4s ease, opacity 0.4s ease";

        robot.style.transform = `translate(-${offset * 0.5}px, ${offset * 0.5}px)`;
        planta.style.transform = `translate(${offset * 0.5}px, ${offset * 0.5}px)`;

        robot.style.opacity = opacity;
        planta.style.opacity = opacity;
      }
    }

    const panelFuncionalidades = document.getElementById("panelFuncionalidades");

    if (panelFuncionalidades.classList.contains("active")) {
      const cerditoHappy = document.querySelector(".cerdito-happy-img");
      const robotHappy = document.querySelector(".robot-happy-img");

      if (cerditoHappy && robotHappy) {
        const offset = Math.min(scrollY * 0.1, 60);
        const opacity = Math.max(1 - scrollY / 600, 0.4);

        cerditoHappy.style.transition = "transform 0.4s ease, opacity 0.4s ease";
        robotHappy.style.transition = "transform 0.4s ease, opacity 0.4s ease";

        cerditoHappy.style.transform = `translate(${offset}px, ${offset * 0.5}px)`;
        robotHappy.style.transform = `translate(-${offset}px, ${offset * 0.5}px)`;

        cerditoHappy.style.opacity = opacity;
        robotHappy.style.opacity = opacity;
      }
    }

    // Removed previous standalone if (robot && planta) block to avoid duplication

    if (encuesta) {
      const encuestaOffset = Math.min(scrollY * 0.08, 50);
      const encuestaOpacity = Math.max(1 - scrollY / 700, 0.5);
      if (scrollY > 5) {
        encuesta.style.transform = `translateY(${encuestaOffset}px)`;
      } else {
        encuesta.style.transform = encuesta.dataset.initialTransform;
      }
      encuesta.style.opacity = encuestaOpacity;
    }
  });

  function handleScrollAnimation() {
    if (!encuestaImg) return;
    const rect = encuestaImg.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    // Removed block that adds fade-in-slide-up class on scroll
  }

  // Removed window.addEventListener("scroll", handleScrollAnimation);
  // Removed handleScrollAnimation();
});
// Footer reveal animation on scroll
window.addEventListener("scroll", () => {
  const footer = document.querySelector(".footer-reveal");
  if (footer && window.scrollY > 300) {
    footer.style.animationPlayState = "running";
  }
});
// Cambio de idioma en el selector del footer
document.addEventListener("DOMContentLoaded", () => {
  const idiomaSelector = document.getElementById("idioma-selector");
  if (idiomaSelector) {
    // Leer el idioma guardado en localStorage y aplicarlo si existe
    const idiomaGuardado = localStorage.getItem("idiomaSeleccionado");
    if (idiomaGuardado) {
      idiomaSelector.value = idiomaGuardado;
      idiomaSelector.dispatchEvent(new Event("change"));
    }
    idiomaSelector.addEventListener("change", (e) => {
      const idioma = e.target.value;
      localStorage.setItem("idiomaSeleccionado", idioma);

      // Traducciones ampliadas
      const traducciones = {
        es: {
          // Footer y accesos
          blog: "Blog",
          terminos: "Términos de uso",
          privacidad: "Política de privacidad",
          idioma: "Idioma",
          footerSocial: "Redes Sociales",
          footerAccess: "Accesos",
          facebook: "Facebook",
          instagram: "Instagram",
          whatsapp: "WhatsApp",
          youtube: "YouTube",
          // Contacto
          contacto: "Contáctanos",
          mensaje: "¿Tienes dudas, sugerencias o deseas colaborar? Escríbenos:",
          enviar: "Enviar mensaje",
          contactoNombre: "Tu nombre",
          contactoCorreo: "Tu correo electrónico",
          contactoTexto: "Escribe tu mensaje aquí...",
          // Navegación
          navInicio: "Inicio",
          navServicios: "Servicios",
          navFuncionalidades: "Funcionalidades",
          navContacto: "Contacto",
          navPrecios: "Precios",
          navBlog: "Blog",
          // Inicio grid
          seccion1: "Los mejores Servicios",
          seccion1Desc: "Disfruta de una plataforma financiera con funcionalidades líderes en su categoría.",
          seccion2: "Funcionalidades atractivas",
          seccion2Desc: "Explora herramientas visuales, amigables y pensadas para una experiencia moderna.",
          seccion3: "Precios accesibles",
          seccion3Desc: "Accede a funciones premium sin afectar tu presupuesto.",
          // Servicios
          servicio1: "Metas y hábitos de ahorro",
          servicio1Desc: "Define objetivos personalizados y recibe alertas automáticas para construir un hábito financiero saludable.",
          servicio2: "Registro automático IoT",
          servicio2Desc: "Conecta dispositivos como relojes o apps bancarias para registrar ingresos y gastos sin esfuerzo.",
          servicio3: "Planes financieros con IA",
          servicio3Desc: "Simula escenarios, analiza tus patrones de consumo y planifica con ayuda de nuestra IA generativa.",
          // Funcionalidades
          funcionalidad1: "Herramientas interactivas a tu alcance",
          funcionalidad1Desc: "Gestiona tus finanzas desde un dashboard amigable lleno de funciones útiles.",
          funcionalidad2: "Nuestro sistema intuitivo facilita el aprendizaje",
          funcionalidad2Desc: "Aprende finanzas de forma sencilla con nuestro sistema intuitivo guiado paso a paso.",
          funcionalidad3: "Sistema y gráficos visualmente atractivos",
          funcionalidad3Desc: "Analiza tu información a través de gráficos claros, bonitos y personalizables.",

          // Inicio panel
          tituloPrincipal: "FinanZen: Tecnología inteligente para tu salud financiera",
          parrafoPrincipal: "Nuestra plataforma combina IoT e inteligencia artificial para ayudarte a controlar tus gastos, cumplir metas de ahorro y aprender sobre finanzas con recomendaciones personalizadas.",
          caracteristica1: "📊 Monitorea tus ingresos y egresos automáticamente",
          caracteristica2: "🎯 Crea metas financieras y recíbelas en recordatorios inteligentes",
          caracteristica3: "🧠 Aprende con sugerencias generadas por IA adaptadas a ti",

          // Servicios panel
          tituloServicios: "Servicios de FinanZen: IoT, IA, Planes financieros y mucho más",
          parrafoServicios: "Explora nuestros servicios de Dashboard con gráficos interactivos, asistente IA, tecnología IOT, control de tus gastos y planes de gasto, ahorro e inversión.",
          caracteristicaServ1: "🚘 Ponte una meta como el auto de tus sueños",
          caracteristicaServ2: "🏦 Registra tus inversiones con plazos como TREA, TEA",
          caracteristicaServ3: "🤖 Recibe recomendaciones de ahorros",

          // Funcionalidades panel
          tituloFuncionalidades: "Funcionalidades de FinanZen: Intuitivo, Dinámico y Suave.",
          parrafoFuncionalidades: "Nuestro sitio web ofrece un estilo artístico suave y colorido en los gráficos, mapas, textos y herramientas. FinanZen es práctico y utilitario, porque nos preocupamos por tu productividad.",
          caracteristicaFunc1: "👀 Visualmente atractivo",
          caracteristicaFunc2: "🔥 Herramientas al alcance de un click",
          caracteristicaFunc3: "🧠 Aprendes usándolo",

          // Encuesta
          prioridadesTexto: "¿Qué tipo de usuario eres?",
          prioridadesBoton: "Comenzar encuesta",
        },
        en: {
          // Footer and access
          blog: "Blog",
          terminos: "Terms of Use",
          privacidad: "Privacy Policy",
          idioma: "Language",
          footerSocial: "Social Media",
          footerAccess: "Access",
          facebook: "Facebook",
          instagram: "Instagram",
          whatsapp: "WhatsApp",
          youtube: "YouTube",
          // Contact
          contacto: "Contact Us",
          mensaje: "Do you have questions, suggestions, or want to collaborate? Write to us:",
          enviar: "Send Message",
          contactoNombre: "Your name",
          contactoCorreo: "Your email address",
          contactoTexto: "Write your message here...",
          // Navigation
          navInicio: "Home",
          navServicios: "Services",
          navFuncionalidades: "Features",
          navContacto: "Contact",
          navPrecios: "Pricing",
          navBlog: "Blog",
          // Inicio grid
          seccion1: "Top Services",
          seccion1Desc: "Enjoy a financial platform with leading features in its category.",
          seccion2: "Attractive Features",
          seccion2Desc: "Explore visual, user-friendly tools designed for a modern experience.",
          seccion3: "Affordable Prices",
          seccion3Desc: "Access premium features without hurting your budget.",
          // Services
          servicio1: "Saving goals and habits",
          servicio1Desc: "Set personalized goals and get automatic alerts to build healthy financial habits.",
          servicio2: "IoT automatic tracking",
          servicio2Desc: "Connect devices like watches or banking apps to record income and expenses effortlessly.",
          servicio3: "AI-based financial plans",
          servicio3Desc: "Simulate scenarios, analyze your spending patterns, and plan with the help of our generative AI.",
          // Features
          funcionalidad1: "Interactive tools at your fingertips",
          funcionalidad1Desc: "Manage your finances from a friendly dashboard full of useful features.",
          funcionalidad2: "Our intuitive system makes learning easier",
          funcionalidad2Desc: "Learn finance easily with our step-by-step guided intuitive system.",
          funcionalidad3: "Visually attractive system and graphics",
          funcionalidad3Desc: "Analyze your information with clear, beautiful, and customizable charts.",

          // Home panel
          tituloPrincipal: "FinanZen: Smart technology for your financial health",
          parrafoPrincipal: "Our platform combines IoT and AI to help you control spending, reach savings goals, and learn about finance with personalized recommendations.",
          caracteristica1: "📊 Automatically track your income and expenses",
          caracteristica2: "🎯 Set financial goals and get smart reminders",
          caracteristica3: "🧠 Learn with AI-generated suggestions tailored to you",

          // Servicios panel
          tituloServicios: "FinanZen Services: IoT, AI, Financial Plans and More",
          parrafoServicios: "Explore our services: interactive dashboards, AI assistant, IoT technology, expense control and savings/investment plans.",
          caracteristicaServ1: "🚘 Set a goal like your dream car",
          caracteristicaServ2: "🏦 Track your investments with terms like APR, APY",
          caracteristicaServ3: "🤖 Get savings recommendations",

          // Funcionalidades panel
          tituloFuncionalidades: "FinanZen Features: Intuitive, Dynamic and Smooth.",
          parrafoFuncionalidades: "Our website offers a soft and colorful artistic style in graphics, maps, text, and tools. FinanZen is practical and useful, because we care about your productivity.",
          caracteristicaFunc1: "👀 Visually attractive",
          caracteristicaFunc2: "🔥 Tools at your fingertips",
          caracteristicaFunc3: "🧠 Learn by using it",

          // Encuesta
          prioridadesTexto: "What type of user are you?",
          prioridadesBoton: "Start survey",
        }
      };

      const t = traducciones[idioma];

      // Footer
      document.getElementById("blog-link").textContent = t.blog;
      document.getElementById("terminos-link").textContent = t.terminos;
      document.getElementById("privacidad-link").textContent = t.privacidad;
      document.getElementById("idioma-label").textContent = t.idioma;
      document.getElementById("footer-social-title").textContent = t.footerSocial;
      document.getElementById("footer-access-title").textContent = t.footerAccess;
      document.getElementById("footer-facebook").textContent = t.facebook;
      document.getElementById("footer-instagram").textContent = t.instagram;
      document.getElementById("footer-whatsapp").textContent = t.whatsapp;
      document.getElementById("footer-youtube").textContent = t.youtube;

      // Contacto section
      document.getElementById("titulo-contacto").textContent = t.contacto;
      document.getElementById("contacto-mensaje").textContent = t.mensaje;
      document.getElementById("contacto-enviar").textContent = t.enviar;
      document.getElementById("contacto-nombre").setAttribute("placeholder", t.contactoNombre);
      document.getElementById("contacto-correo").setAttribute("placeholder", t.contactoCorreo);
      document.getElementById("contacto-texto").setAttribute("placeholder", t.contactoTexto);

      // Navegación
      document.getElementById("nav-inicio").textContent = t.navInicio;
      document.getElementById("nav-servicios").textContent = t.navServicios;
      document.getElementById("nav-funcionalidades").textContent = t.navFuncionalidades;
      document.getElementById("nav-contacto").textContent = t.navContacto;
      document.getElementById("nav-precios").textContent = t.navPrecios;
      document.getElementById("nav-blog").textContent = t.navBlog;

      // Inicio grid
      document.getElementById("inicio1").textContent = t.seccion1;
      document.getElementById("inicio1-desc").textContent = t.seccion1Desc;
      document.getElementById("inicio2").textContent = t.seccion2;
      document.getElementById("inicio2-desc").textContent = t.seccion2Desc;
      document.getElementById("inicio3").textContent = t.seccion3;
      document.getElementById("inicio3-desc").textContent = t.seccion3Desc;

      // Servicios
      document.getElementById("servicio1").textContent = t.servicio1;
      document.getElementById("servicio1-desc").textContent = t.servicio1Desc;
      document.getElementById("servicio2").textContent = t.servicio2;
      document.getElementById("servicio2-desc").textContent = t.servicio2Desc;
      document.getElementById("servicio3").textContent = t.servicio3;
      document.getElementById("servicio3-desc").textContent = t.servicio3Desc;

      // Funcionalidades
      document.getElementById("funcionalidad1").textContent = t.funcionalidad1;
      document.getElementById("funcionalidad1-desc").textContent = t.funcionalidad1Desc;
      document.getElementById("funcionalidad2").textContent = t.funcionalidad2;
      document.getElementById("funcionalidad2-desc").textContent = t.funcionalidad2Desc;
      document.getElementById("funcionalidad3").textContent = t.funcionalidad3;
      document.getElementById("funcionalidad3-desc").textContent = t.funcionalidad3Desc;

      // Panel Servicios
      document.getElementById("titulo-servicios").textContent = t.tituloServicios;
      document.getElementById("parrafo-servicios").textContent = t.parrafoServicios;
      document.getElementById("caracteristica-serv1").textContent = t.caracteristicaServ1;
      document.getElementById("caracteristica-serv2").textContent = t.caracteristicaServ2;
      document.getElementById("caracteristica-serv3").textContent = t.caracteristicaServ3;

      // Panel Funcionalidades
      document.getElementById("titulo-funcionalidades").textContent = t.tituloFuncionalidades;
      document.getElementById("parrafo-funcionalidades").textContent = t.parrafoFuncionalidades;
      document.getElementById("caracteristica-func1").textContent = t.caracteristicaFunc1;
      document.getElementById("caracteristica-func2").textContent = t.caracteristicaFunc2;
      document.getElementById("caracteristica-func3").textContent = t.caracteristicaFunc3;

      // Encuesta
      document.getElementById("prioridades-texto").textContent = t.prioridadesTexto;
      document.getElementById("prioridades-boton").textContent = t.prioridadesBoton;

      // Panel Inicio
      document.getElementById("titulo-principal").textContent = t.tituloPrincipal;
      document.getElementById("parrafo-principal").textContent = t.parrafoPrincipal;
      document.getElementById("caracteristica1").textContent = t.caracteristica1;
      document.getElementById("caracteristica2").textContent = t.caracteristica2;
      document.getElementById("caracteristica3").textContent = t.caracteristica3;
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const userButton = document.getElementById("userButton");
  const dropdownMenu = document.getElementById("dropdownMenu");

  if (userButton && dropdownMenu) {
    userButton.addEventListener("click", function (e) {
      e.stopPropagation(); // Para que no se cierre inmediatamente
      dropdownMenu.classList.toggle("hidden");
    });

    window.addEventListener("click", function (e) {
      if (!e.target.closest(".user-menu")) {
        dropdownMenu.classList.add("hidden");
      }
    });
  }
});
