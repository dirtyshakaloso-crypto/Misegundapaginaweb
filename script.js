// Utilidades UI: navegación móvil, carrusel, validación simple y tema

// Año dinámico en el footer
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Toggle menú móvil
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('primary-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', String(!expanded));
    navToggle.setAttribute('aria-expanded', String(!expanded));
  });
  // Cerrar nav al navegar
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Alternar tema (solo demo, se mantiene en localStorage)
const themeBtn = document.querySelector('.theme-toggle');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const STORAGE_KEY = 'portfolio-theme';
const applyTheme = (mode) => {
  document.documentElement.dataset.theme = mode;
  const icon = mode === 'dark' ? '☾' : '☀';
  const iconEl = themeBtn?.querySelector('.theme-icon');
  if (iconEl) iconEl.textContent = icon;
};
const saved = localStorage.getItem(STORAGE_KEY);
let theme = saved || (prefersDark ? 'dark' : 'dark'); // por defecto oscuro
applyTheme(theme);
if (themeBtn) themeBtn.addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
});

// Carruseles simples
function initCarousel(root){
  const slides = root.querySelector('.slides');
  const items = Array.from(root.querySelectorAll('.slide'));
  const prev = root.querySelector('[data-prev]');
  const next = root.querySelector('[data-next]');
  const dots = root.querySelector('.dots');
  let i = 0;
  const go = (idx)=>{
    i = (idx + items.length) % items.length;
    slides.style.transform = `translateX(${i * -100}%)`;
    if (dots) Array.from(dots.children).forEach((d, di)=> d.setAttribute('aria-current', String(di===i)));
  };
  if (dots) {
    dots.innerHTML = items.map((_ , di)=> `<button aria-label="Ir a la diapositiva ${di+1}"></button>`).join('');
    Array.from(dots.children).forEach((d, di)=> d.addEventListener('click', ()=> go(di)));
  }
  prev?.addEventListener('click', ()=> go(i-1));
  next?.addEventListener('click', ()=> go(i+1));
  // auto-play suave
  let t = setInterval(()=> go(i+1), 4500);
  root.addEventListener('mouseenter', ()=> clearInterval(t));
  root.addEventListener('mouseleave', ()=> t = setInterval(()=> go(i+1), 4500));
  go(0);
}

document.querySelectorAll('[data-carousel]').forEach(initCarousel);

// Validación form básica (sólo UI, no envía datos)
const form = document.querySelector('.contact-form');
if (form) {
  const status = form.querySelector('.form-status');
  const fields = ['nombre','correo','asunto','mensaje'];

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let ok = true;
    fields.forEach(n=>{
      const input = form.querySelector(`[name="${n}"]`);
      const error = input?.parentElement.querySelector('.error');
      if (input && error) {
        if (!input.value.trim() || (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value))) {
          error.textContent = 'Completa este campo correctamente.';
          input.setAttribute('aria-invalid', 'true');
          ok = false;
        } else {
          error.textContent = '';
          input.removeAttribute('aria-invalid');
        }
      }
    });
    if (!ok) {
      if (status) status.textContent = 'Revisa los campos marcados.';
      return;
    }
    if (status) {
      status.textContent = 'Enviando… (demo)';
      setTimeout(()=> status.textContent = 'Mensaje enviado (simulado). ¡Gracias!', 800);
    }
    form.reset();
  });
}
