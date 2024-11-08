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

