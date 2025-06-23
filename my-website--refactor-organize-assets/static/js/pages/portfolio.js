document.addEventListener('DOMContentLoaded', function() {
    // Portfolio filter functionality (from portfolio.html)
    const filterButtons = document.querySelectorAll('.filter-btn'); // Selector from portfolio.html
    const portfolioCards = document.querySelectorAll('.portfolio-grid .project-card'); // Selector from portfolio.html

    if (filterButtons.length > 0 && portfolioCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() { // Changed to addEventListener for robustness
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const category = this.getAttribute('data-cat');

                portfolioCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-cat');
                    if (category === 'All' || cardCategory === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    } else {
        if (filterButtons.length === 0) {
            console.log("Portfolio.js: No filter buttons found with selector '.filter-btn'.");
        }
        if (portfolioCards.length === 0) {
            console.log("Portfolio.js: No portfolio cards found with selector '.portfolio-grid .project-card'.");
        }
    }
    console.log("Portfolio page JavaScript initialized with filter logic.");
});
