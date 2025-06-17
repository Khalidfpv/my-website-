// Enhanced Navigation with strictly top-only visibility
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  const mainNavLinks = document.querySelectorAll('.main-nav ul li a');
  const sections = document.querySelectorAll('section[id]');
  const scrollThreshold = 20; // Lower threshold to hide quicker
  
  // Detect if we're on the home page
  const path = window.location.pathname;
  const isHomePage = path === '/' || 
                     path === '/index.html' || 
                     path === '/index' || 
                     path.endsWith('/home') || 
                     path === '' || 
                     path.endsWith('/');
  
  // Add home class to body if on home page
  if (isHomePage) {
    document.body.classList.add('home');
    
    // Make sure ONLY the home link is active on the home page
    mainNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href.includes('home') || href === '/' || href === '') {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  } else {
    // For non-home pages, find the matching link
    const currentPath = window.location.pathname;
    
    // First remove all active classes
    mainNavLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    // Then set active only for the current page
    mainNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Check if this link matches current page
      if (
        href === currentPath || 
        (href.includes(currentPath.split('/').pop().split('.')[0]))
      ) {
        // This is the active link
        link.classList.add('active');
      }
    });
  }
  
  // Function to handle scroll behavior
  function handleScroll() {
    const currentScroll = window.pageYOffset;
    
    // STRICT TOP-ONLY VISIBILITY:
    // Show header ONLY when at the very top, hide for any scroll
    if (currentScroll <= scrollThreshold) {
      // At the very top - show header
      header.classList.remove('hidden');
      header.classList.remove('scrolled');
    } else {
      // Not at the top - hide header and add scrolled class
      header.classList.add('hidden');
      header.classList.add('scrolled');
    }
  }
  
  // Set up IntersectionObserver for section visibility
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -80% 0px',
    threshold: 0
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // When a section enters the viewport
      if (entry.isIntersecting) {
        const currentSectionId = entry.target.getAttribute('id');
        
        // Update navigation active state for section links
        mainNavLinks.forEach(link => {
          // Extract the section ID from the href attribute
          const href = link.getAttribute('href');
          let linkSectionId;
          
          // Handle both direct IDs and Flask routes
          if (href.includes('#')) {
            linkSectionId = href.split('#')[1];
            
            // Compare with current section and set active state
            if (linkSectionId === currentSectionId) {
              // Remove active from all links first
              mainNavLinks.forEach(l => l.classList.remove('active'));
              // Add active to this link
              link.classList.add('active');
            }
          }
        });
        
        // Check if section is dark/light and adjust header accordingly (only on home page)
        if (isHomePage) {
          const isDarkSection = entry.target.classList.contains('dark-section') || 
                              entry.target.classList.contains('hero');
          
          if (isDarkSection) {
            header.classList.add('dark-mode');
            header.classList.remove('light-mode');
          } else {
            header.classList.add('light-mode');
            header.classList.remove('dark-mode');
          }
        }
      }
    });
  }, observerOptions);
  
  // Observe all sections
  if (sections.length > 0) {
    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }
  
  // Add smooth scrolling for navigation links
  mainNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only apply for hash links
      if (this.getAttribute('href').includes('#')) {
        e.preventDefault();
        const targetId = this.getAttribute('href').split('#')[1];
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          // Calculate offset for fixed header
          const headerHeight = header.offsetHeight;
          const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Adjust header padding based on actual header height
  function adjustBodyPadding() {
    if (!isHomePage) {
      const headerHeight = header.offsetHeight;
      document.body.style.paddingTop = headerHeight + 'px';
    }
  }
  
  // Call once on load
  adjustBodyPadding();
  
  // Recalculate on window resize
  window.addEventListener('resize', adjustBodyPadding);
  
  // Monitor scroll events
  window.addEventListener('scroll', handleScroll, {passive: true});
  
  // Initial call to set correct state on page load
  handleScroll();
});