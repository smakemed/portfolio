// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== BURGER MENU =====
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Fermer le menu mobile au clic sur un lien
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => observer.observe(section));

// ===== TYPED EFFECT =====
const typedEl = document.querySelector('.typed-text');
const roles = [
  'Java EE Senior',
  'Expert Spring Boot',
  'Architecte API REST',
  'Auto-Entrepreneur IT-TALIKO',
  'Développeur Full Stack',
  'Expert Microservices',
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.slice(0, charIndex--);
  } else {
    typedEl.textContent = current.slice(0, charIndex++);
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex > current.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex < 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(type, speed);
}
type();

// ===== TABS (About) =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.add('hidden'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.remove('hidden');
  });
});

// ===== SKILL BARS ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

// ===== CONTACT FORM (Formspree) =====
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Envoi en cours...';
    btn.disabled = true;

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        btn.innerHTML = '<i class="fas fa-check mr-2"></i>Message envoyé !';
        btn.style.background = '#00b894';
        form.reset();
        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Envoyer le message';
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      } else {
        throw new Error('Erreur serveur');
      }
    } catch {
      btn.innerHTML = '<i class="fas fa-times mr-2"></i>Erreur, réessayez';
      btn.style.background = '#e74c3c';
      btn.disabled = false;
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Envoyer le message';
        btn.style.background = '';
      }, 3000);
    }
  });
}

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.service-card, .project-card, .skill-item, .timeline-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(30px)';
      setTimeout(() => {
        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));
