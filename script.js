/* ===== Smooth scrolling with navbar offset ===== */
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const burger = document.getElementById('burger');

function smoothScrollTo(targetSelector) {
  const el = document.querySelector(targetSelector);
  if (!el) return;
  const offset = (navbar ? navbar.offsetHeight : 0) + 12;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.length > 1) {
      e.preventDefault();
      smoothScrollTo(href);
      navLinks.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
});

/* ===== Mobile burger toggle ===== */
burger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  burger.classList.toggle('active', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));
});

/* ===== Sticky navbar scroll effect ===== */
function onScroll() {
  if (window.scrollY > 20) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ===== Dynamic project cards ===== */
const projects = [
  {
    title: 'ConnectTel Customer Churn Prediction System',
    description:
      'Built an end-to-end predictive Python pipeline using Scikit-Learn and XGBoost to model customer behavior and mitigate a 26.6% attrition rate, optimizing heavily for Recall.',
    tags: ['Python', 'Scikit-Learn', 'XGBoost', 'EDA', 'Feature Engineering'],
    github: 'https://github.com/Dorcasey/Customer-Churn-Analysis',
    demo: ''
  },
  {
    title: 'AI-Assisted E-Commerce Storefront',
    description:
      'Developed a fluid, responsive landing page using Cline, mastering iterative technical prompt engineering frameworks to generate clean structural layouts.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Cline AI', 'Prompt Engineering'],
    github: 'https://github.com/Dorcasey/gent-official-frontend-study',
    demo: ''
  }
];

const projectsGrid = document.getElementById('projectsGrid');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderProjects() {
  if (!projectsGrid) return;
  projectsGrid.innerHTML = projects
    .map(
      (p) => `
      <article class="project-card">
        <div class="project-header">
          <span class="project-badge">Featured</span>
          <div class="project-links">
            <a href="${escapeHtml(p.github)}" target="_blank" rel="noopener noreferrer" aria-label="GitHub source for ${escapeHtml(p.title)}">GitHub</a>
            ${
              p.demo
                ? `<a href="${escapeHtml(p.demo)}" target="_blank" rel="noopener noreferrer" aria-label="Live demo for ${escapeHtml(p.title)}">Live</a>`
                : ''
            }
          </div>
        </div>
        <h3 class="project-title">${escapeHtml(p.title)}</h3>
        <p class="project-desc">${escapeHtml(p.description)}</p>
        <div class="project-tags">
          ${p.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
        </div>
      </article>`
    )
    .join('');
}
renderProjects();

/* ===== Reveal on scroll ===== */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
revealEls.forEach((el) => observer.observe(el));

/* ===== Footer year ===== */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();