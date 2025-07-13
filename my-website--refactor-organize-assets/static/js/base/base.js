// Global helper functions will be added here if any are identified.
// For now, this can include any shared utility functions.

document.addEventListener('DOMContentLoaded', function() {
    // Example: Smooth scrolling for all anchor links (if not already in animations.js)
    // This is a common global functionality.
    // const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //   anchor.addEventListener('click', function(e) {
    //     const href = this.getAttribute('href');
    //     if (href === '#' || href === 'javascript:void(0)') return;
    //     e.preventDefault();
    //     const targetId = href.substring(1);
    //     const targetElement = document.getElementById(targetId);
    //     if (targetElement) {
    //       const headerHeight = document.querySelector('header')?.offsetHeight || 0;
    //       const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
    //       window.scrollTo({
    //         top: targetPosition,
    //         behavior: prefersReducedMotion ? 'auto' : 'smooth'
    //       });
    //     }
    //   });
    // });

    // Add other global initializations here
    console.log("Base JavaScript Initialized");
});
