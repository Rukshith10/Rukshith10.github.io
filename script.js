document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".container");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.2 });

    containers.forEach(container => {
        observer.observe(container);
    });
});

let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');

  function moveSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  // Initialize slideshow
  slides[currentSlide].classList.add('active');

