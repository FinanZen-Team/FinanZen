 // <script src="Main.js"></script> 
//para el navbar
window.addEventListener('scroll', function () {
    const header = document.querySelector('.Header-Navbar');
    if (window.scrollY > 10) {
    header.classList.add('scrolled');
    } else {
    header.classList.remove('scrolled');
    }
});

//para el header
document.addEventListener("DOMContentLoaded", () => {
    fetch("header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header-placeholder").innerHTML = data;
    });
});
// para el footer
document.addEventListener("DOMContentLoaded", function () {
    fetch("Footer.html")
    .then(response => response.text())
    .then(data => {
        document.querySelectorAll('.footer-placeholder').forEach(placeholder => {
        placeholder.innerHTML = data;
        });
    });
});
// para encuesta
document.addEventListener("DOMContentLoaded", function () {
    fetch("encuesta.html")
    .then(response => response.text())
    .then(data => {
        document.querySelectorAll('.encuesta-placeholder').forEach(placeholder => {
        placeholder.innerHTML = data;
        });
    });
});
// para contacto
document.addEventListener("DOMContentLoaded", function () {
    fetch("contacto.html")
    .then(response => response.text())
    .then(data => {
        document.querySelectorAll('.contacto-placeholder').forEach(placeholder => {
        placeholder.innerHTML = data;
        });
    });
});
// para precios
document.addEventListener("DOMContentLoaded", function () {
    fetch("precios.html")
    .then(response => response.text())
    .then(data => {
        document.querySelectorAll('.precios-placeholder').forEach(placeholder => {
        placeholder.innerHTML = data;
        });
    });
});
//para animacion con scroll
window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY;

    // Imágenes impares: hero1, hero3, hero5 → izquierda
    document.querySelectorAll('.hero1-img, .hero3-img, .hero5-img')
        .forEach((img, index) => {
            const speed = 0.2 + index * 0.02; // velocidad progresiva
            img.style.transform = `translate(-${scrollTop * speed}px, ${scrollTop * 0.1}px)`;
        });

    // Imágenes pares: hero2, hero4, hero6 → derecha
    document.querySelectorAll('.hero2-img, .hero4-img, .hero6-img')
        .forEach((img, index) => {
            const speed = 0.2 + index * 0.02;
            img.style.transform = `translate(${scrollTop * speed}px, ${scrollTop * 0.1}px)`;
        });
});
// Para color del section
document.addEventListener("DOMContentLoaded", () => {
    const section = document.getElementById("contenedor-principal");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section.classList.add("activo");
            } else {
                section.classList.remove("activo");
            }
        });
    }, {
        threshold: 0.65 // 65%
    });

    if (section) observer.observe(section);
});

