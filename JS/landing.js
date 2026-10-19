(() => {
    const revealItems = document.querySelectorAll(".landing-reveal");

    if (!revealItems.length || !("IntersectionObserver" in window)) {
        return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    document.body.classList.add("landing-reveal-ready");

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                currentObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.14,
        rootMargin: "0px 0px -32px 0px"
    });

    revealItems.forEach((item) => observer.observe(item));
})();
