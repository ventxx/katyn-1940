
(() => {
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // Smooth reveal when sections enter the screen.
  const elements = document.querySelectorAll(
    '.reveal, .timeline-item'
  );

  if (reduceMotion) return;

  if ('IntersectionObserver' in window) {
    elements.forEach((element) => {
      element.classList.add('will-reveal');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));
  }

  // Smooth scrolling for links within this page.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(
        link.getAttribute('href')
      );

      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
})();
