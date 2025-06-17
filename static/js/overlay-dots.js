// Floating Menu Button & Overlay Navigation Control
document.addEventListener('DOMContentLoaded', function() {
  // Get existing elements
  const floatingMenuBtn = document.querySelector('.floating-menu-btn');
  const overlayNav = document.querySelector('.overlay-nav');
  const overlayLinks = document.querySelectorAll('.overlay-link');
  
  // Toggle function for overlay
  function toggleOverlay() {
      if (overlayNav.classList.contains('active')) {
          // Close overlay
          overlayNav.classList.remove('active');
          floatingMenuBtn.setAttribute('aria-expanded', 'false');
          overlayNav.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = ''; // Re-enable scrolling
          
          // Change SVG to three dots
          floatingMenuBtn.innerHTML = `
              <svg viewBox="0 0 24 24" width="24" height="24">
                  <circle cx="5" cy="12" r="2" fill="currentColor" />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                  <circle cx="19" cy="12" r="2" fill="currentColor" />
              </svg>
          `;
      } else {
          // Open overlay
          overlayNav.classList.add('active');
          floatingMenuBtn.setAttribute('aria-expanded', 'true');
          overlayNav.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
          
          // Change SVG to X
          floatingMenuBtn.innerHTML = `
              <svg viewBox="0 0 24 24" width="24" height="24">
                  <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
          `;
      }
  }
  
  // Add event listener to floating menu button
  floatingMenuBtn.addEventListener('click', toggleOverlay);
  
  // Add event listeners to overlay links to close overlay when clicked
  overlayLinks.forEach(link => {
      link.addEventListener('click', function() {
          // Close overlay when link clicked
          toggleOverlay();
      });
  });
  
  // Close overlay on escape key
  document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlayNav.classList.contains('active')) {
          toggleOverlay();
      }
  });

  // Close overlay when clicking outside the menu
  overlayNav.addEventListener('click', function(e) {
      // Only close if clicking the background (not the menu items)
      if (e.target === overlayNav) {
          toggleOverlay();
      }
  });
});