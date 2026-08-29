// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const iconSun = document.getElementById('iconSun');
const iconMoon = document.getElementById('iconMoon');
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  if (theme === 'light') {
    iconSun.style.display = 'none';
    iconMoon.style.display = 'block';
  } else {
    iconSun.style.display = 'block';
    iconMoon.style.display = 'none';
  }
}

const savedTheme = localStorage.getItem('portfolio-theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
applyTheme(savedTheme || (prefersLight ? 'light' : 'dark'));

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ===== Nav scroll state =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ===== Mobile menu =====
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('mobile-open');
  hamburger.classList.toggle('open');
});
document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('mobile-open');
    hamburger.classList.remove('open');
  });
});

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

// ===== Contact form -> mailto =====
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const message = document.getElementById('cf-message').value.trim();

  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

  window.location.href = `mailto:hafizmuhammadahmad901@gmail.com?subject=${subject}&body=${body}`;
});
