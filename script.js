/* ═══════════════════════════════════════════════════════
   PORTFOLIO SCRIPT — Sai Rukshith Kalaganuri
═══════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {

  /* ─────────────────────────────────────────
     1. SCROLL REVEAL
  ───────────────────────────────────────── */
  const containers = document.querySelectorAll(".container");

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.1 });

  containers.forEach(c => revealObserver.observe(c));

  /* ─────────────────────────────────────────
     2. CAROUSEL FACTORY (Achievements)
  ───────────────────────────────────────── */
  // Simplified for a seamless retro feel
  function buildCarousel(sectionId, autoMs = 5000) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const track  = section.querySelector(".carousel-track");
    const slides = section.querySelectorAll(".carousel-slide");
    
    if (!track || slides.length <= 1) return; // No carousel needed if 1 item

    let current = 0;
    let timer   = null;

    function goTo(idx) {
      if (idx >= slides.length) idx = 0;
      current = idx;
      track.style.transform = `translateX(-${current * 100}%)`;
      track.style.transition = "transform 0.4s ease-in-out";
    }

    function startTimer() {
      timer = setInterval(() => goTo(current + 1), autoMs);
    }
    
    startTimer();

    // Pause on hover
    track.addEventListener("mouseenter", () => clearInterval(timer));
    track.addEventListener("mouseleave", startTimer);
  }

  buildCarousel("achievements", 6000);

  /* ─────────────────────────────────────────
     3. INTERESTS SLIDESHOW
  ───────────────────────────────────────── */
  (function initSlideshow() {
    const slides   = document.querySelectorAll(".slide");
    const dotsEl   = document.getElementById("slide-dots");
    const prevBtn  = document.getElementById("slide-prev");
    const nextBtn  = document.getElementById("slide-next");

    if (!slides.length) return;

    let current = 0;
    let timer = null;

    // Build dots dynamically
    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        showSlide(i);
        resetTimer();
      });
      dotsEl.appendChild(dot);
    });

    const dots = dotsEl.querySelectorAll(".dot");

    function showSlide(idx) {
      slides[current].classList.remove("active");
      dots[current].classList.remove("active");
      
      current = (idx + slides.length) % slides.length;
      
      slides[current].classList.add("active");
      dots[current].classList.add("active");
    }

    prevBtn && prevBtn.addEventListener("click", () => { showSlide(current - 1); resetTimer(); });
    nextBtn && nextBtn.addEventListener("click", () => { showSlide(current + 1); resetTimer(); });

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(() => showSlide(current + 1), 7000);
    }
    
    resetTimer(); // Start auto-slide
  })();

});
