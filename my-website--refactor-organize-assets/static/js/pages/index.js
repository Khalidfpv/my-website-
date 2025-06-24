document.addEventListener('DOMContentLoaded', function() {
    // Portfolio filter functionality (originally from index.html)
    // This script is specific to pages that have the portfolio filter buttons and cards.
    // If this filter is ONLY on index.html, it belongs here.
    // If it's on portfolio.html, it should be in portfolio.js or a shared component script.
    // For now, assuming it's for an index page feature.

    const filterButtons = document.querySelectorAll('.filters button'); // Make sure '.filters button' is specific enough
    const portfolioCards = document.querySelectorAll('.projects-grid .project-card'); // Assuming these are the cards to filter

    if (filterButtons.length > 0 && portfolioCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.onclick = () => {
                document.querySelector('.filters .active')?.classList.remove('active');
                btn.classList.add('active');
                const category = btn.dataset.cat; // Ensure buttons have data-cat="CategoryName"

                portfolioCards.forEach(card => {
                    // Ensure cards have data-cat="CategoryName" or data-cat="All"
                    const cardCategory = card.dataset.cat;
                    if (category === 'All' || cardCategory === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            };
        });
    } else {
        if (filterButtons.length === 0) {
            console.log("Index.js: No filter buttons found with selector '.filters button'.");
        }
        if (portfolioCards.length === 0) {
            console.log("Index.js: No portfolio cards found with selector '.projects-grid .project-card'.");
        }
    }

    // Add other index-specific JavaScript here if any.
    console.log("Index page JavaScript initialized.");
});
