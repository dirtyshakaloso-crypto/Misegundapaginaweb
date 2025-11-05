// Desplazar suavemente a secciones
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Simular envío de formulario
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('✅ Tu mensaje ha sido enviado correctamente.');
  e.target.reset();
});