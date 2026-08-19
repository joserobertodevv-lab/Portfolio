// ── Landing Pages — adicione novos sites aqui ──────────────────────────────
// Basta adicionar um novo objeto { name: "Nome do site", url: "https://..." }
const landingPages = [
  { name: "Nathália Pessoa · Psi", url: "https://nathaliapessoa-psi.vercel.app/" },
  { name: "7 Raios Sagrados de Aruanda", url: "https://7-raios-sagrados-de-aruanda-delta.vercel.app/" },
  // { name: "Próximo Projeto",  url: "https://exemplo.vercel.app/" },
];
// ─────────────────────────────────────────────────────────────────────────────

const buttons = document.querySelectorAll(".filters button");
const projects = document.querySelectorAll(".project");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;

    projects.forEach(project => {
      project.classList.toggle("hidden", filter !== "all" && project.dataset.category !== filter);
    });
  });
});

const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");
menu?.addEventListener("click", () => {
  const open = nav.style.display === "flex";
  nav.style.display = open ? "" : "flex";
  if (!open) {
    nav.style.position = "absolute";
    nav.style.top = "76px";
    nav.style.left = "0";
    nav.style.right = "0";
    nav.style.padding = "20px 24px";
    nav.style.background = "rgba(7,9,13,.97)";
    nav.style.flexDirection = "column";
    nav.style.gap = "18px";
    nav.style.borderBottom = "1px solid #202938";
  }
});

nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  if (window.innerWidth <= 850) nav.style.display = "";
}));

// ── Transições de entrada com Intersection Observer ──
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target); // anima só uma vez
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ── Cursor personalizado — removido ──

// ── Parallax sutil no orb do hero ──
(function () {
  const orb = document.querySelector(".orb");
  if (!orb) return;
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    orb.style.transform = `translate(${x}px, ${y}px)`;
  });
})();

// ── Indicador de seção ativa no header ──
(function () {
  const navLinks = document.querySelectorAll("nav a[href^='#']");
  const sections = [...navLinks].map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(a => {
        a.classList.toggle("nav-active", a.getAttribute("href") === "#" + id);
      });
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach(s => observer.observe(s));
})();

// ── Botão voltar ao topo ──
(function () {
  const btn = document.getElementById("back-top");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();

// ── Showcase de Landing Pages ──
(function () {
  const frame = document.getElementById("lp-frame");
  const urlDisplay = document.getElementById("lp-url-display");
  const openLink = document.getElementById("lp-open-link");
  const thumbsContainer = document.getElementById("lp-thumbs");

  if (!frame || !thumbsContainer || landingPages.length === 0) return;

  // Se só tiver um site, esconde a área de thumbs (não precisa de seletor)
  if (landingPages.length === 1) {
    thumbsContainer.style.display = "none";
  }

  function loadSite(index) {
    const site = landingPages[index];
    frame.src = site.url;
    urlDisplay.textContent = site.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    openLink.href = site.url;

    thumbsContainer.querySelectorAll(".lp-thumb").forEach((btn, i) => {
      btn.classList.toggle("active", i === index);
    });
  }

  // Cria os botões de seleção (thumbs)
  landingPages.forEach((site, i) => {
    const btn = document.createElement("button");
    btn.className = "lp-thumb" + (i === 0 ? " active" : "");
    btn.textContent = site.name;
    btn.addEventListener("click", () => loadSite(i));
    thumbsContainer.appendChild(btn);
  });

  // Carrega o primeiro por padrão
  loadSite(0);
})();
