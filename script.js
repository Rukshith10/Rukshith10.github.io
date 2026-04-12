/* ═══════════════════════════════════════════════════════
   PORTFOLIO SCRIPT — Sai Rukshith Kalaganuri
═══════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {

  /* ─────────────────────────────────────────
     1. SCROLL PROGRESS BAR
  ───────────────────────────────────────── */
  const progressBar = document.getElementById("progress-bar");
  function updateProgress() {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar && h > 0) progressBar.style.width = (window.scrollY / h * 100) + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });

  /* ─────────────────────────────────────────
     2. SCROLL REVEAL
     Step 1: Add .will-animate to all containers
             so CSS opacity:0 kicks in.
     Step 2: Immediately activate any container
             already visible on load.
     Step 3: Activate the rest on scroll.
     
     This way content is NEVER invisible —
     if JS fails to mark .will-animate in time,
     containers are visible by default.
  ───────────────────────────────────────── */
  const containers = document.querySelectorAll(".container");

  /* Mark all containers for animation */
  containers.forEach(c => c.classList.add("will-animate"));

  function activate(c) {
    if (!c.classList.contains("active")) {
      c.classList.add("active");
    }
  }

  function checkVisible() {
    /* Trigger at 110% — activates section slightly before it scrolls into view */
    const trigger = window.innerHeight * 1.1;
    containers.forEach(c => {
      const r = c.getBoundingClientRect();
      if (r.top < trigger && r.bottom > 0) activate(c);
    });
  }

  /* Use IntersectionObserver as primary */
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) activate(e.target); });
    }, { threshold: 0.01, rootMargin: "0px 0px 100px 0px" });
    containers.forEach(c => io.observe(c));
  }

  /* Always run manual check — handles local files */
  checkVisible();
  window.addEventListener("scroll", checkVisible, { passive: true });
  /* Also fire after a short delay in case fonts/images shift layout */
  setTimeout(checkVisible, 300);
  setTimeout(checkVisible, 800);

  /* ─────────────────────────────────────────
     SLIDESHOW FACTORY
  ───────────────────────────────────────── */
  function buildSlideshow(slideSelector, dotsId, prevId, nextId, ms) {
    const slides = document.querySelectorAll(slideSelector);
    const dotsEl = document.getElementById(dotsId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    if (!slides.length || !dotsEl) return;

    let cur = 0, timer = null;

    slides.forEach((_, i) => {
      const d = document.createElement("span");
      d.classList.add("dot");
      if (i === 0) d.classList.add("active");
      d.addEventListener("click", () => { go(i); reset(); });
      dotsEl.appendChild(d);
    });

    const dots = dotsEl.querySelectorAll(".dot");

    function go(idx) {
      slides[cur].classList.remove("active");
      dots[cur].classList.remove("active");
      cur = (idx + slides.length) % slides.length;
      slides[cur].classList.add("active");
      dots[cur].classList.add("active");
    }

    if (prevBtn) prevBtn.addEventListener("click", () => { go(cur - 1); reset(); });
    if (nextBtn) nextBtn.addEventListener("click", () => { go(cur + 1); reset(); });

    function reset() {
      clearInterval(timer);
      timer = setInterval(() => go(cur + 1), ms);
    }
    reset();
  }

  buildSlideshow("#achievements .ach-slide", "ach-dots",  "ach-prev",  "ach-next",  6000);
  buildSlideshow("#certificates .cert-slide","cert-dots", "cert-prev", "cert-next", 7000);
  buildSlideshow("#interests .slide",         "slide-dots","slide-prev","slide-next",7000);

});
