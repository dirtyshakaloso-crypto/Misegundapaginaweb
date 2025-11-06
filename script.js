// Menú móvil
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Año automático (opcional)
const year = new Date().getFullYear();
document.querySelector("footer p").innerHTML = `© ${year} Candido Avendaño — Todos los derechos reservados`;
