// Enhanced Navigation with top-only header visibility
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  const mainNavLinks = document.querySelectorAll('.main-nav ul li a');
  const sections = document.querySelectorAll('section[id]');
  const scrollThreshold = 20; // Low threshold for faster response
  
  // Detect if we're on the home page - comprehensive detection
  const path = window.location.pathname;
  const isHomePage = path === '/' || 
                     path === '/index.html' || 
                     path.endsWith('/index.html') ||
                     path === '/index' || 
                     path.endsWith('/home') || 
                     path === '' || 
                     path.endsWith('/') ||
                     path.includes('index.html');
  
  // Add home class to body if on home page
  if (isHomePage) {
    document.body.classList.add('home');
    
    // Make sure home link is active on the home page
    mainNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href.includes('index') || href === '/' || href === '') {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  } else {
    document.body.classList.remove('home');
    
    // For non-home pages, find the matching link based on current URL
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();
    
    // First remove all active classes
    mainNavLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    // Then set active class for the current page link
    mainNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      if (currentPage.includes(href) || 
          href.includes(currentPage.split('.')[0]) ||
          (currentPage === '' && href.includes('index.html'))) {
        link.classList.add('active');
      }
    });
  }
  
  // UPDATED: Function to handle scroll behavior - TOP ONLY visibility
  function handleScroll() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // MODIFIED: Only show header at the very top of the page
    if (currentScrollTop <= scrollThreshold) {
      // At the very top - show header and remove scrolled class
      header.classList.remove('hidden');
      header.classList.remove('scrolled');
    } else {
      // Not at the top - hide header and add scrolled class
      header.classList.add('hidden');
      header.classList.add('scrolled');
      
      // Apply a slight delay to the hide animation for smoother transition
      if (!header.classList.contains('animating')) {
        header.classList.add('animating');
        setTimeout(() => {
          header.classList.remove('animating');
        }, 300); // Match this with your CSS transition duration
      }
    }
  }
  
  // Set up IntersectionObserver for section visibility (for single-page sites)
  if (sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentSectionId = entry.target.getAttribute('id');
          
          // Update navigation active state for section links
          mainNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href.includes('#') && href.split('#')[1] === currentSectionId) {
              mainNavLinks.forEach(l => l.classList.remove('active'));
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);
    
    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }
  
  // Smooth scrolling for hash links
  mainNavLinks.forEach(link => {
    if (link.getAttribute('href').includes('#')) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').split('#')[1];
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const headerHeight = header.offsetHeight;
          const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    }
  });
  
  // Adjust body padding based on actual header height
  function adjustBodyPadding() {
    if (!isHomePage) {
      const headerHeight = header.offsetHeight;
      document.body.style.paddingTop = headerHeight + 'px';
    } else {
      document.body.style.paddingTop = '0';
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
  
  // Add floating return-to-top button for better UX
  if (!document.querySelector('.return-to-top')) {
    const returnToTopBtn = document.createElement('button');
    returnToTopBtn.className = 'return-to-top';
    returnToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    returnToTopBtn.setAttribute('aria-label', 'Return to top');
    document.body.appendChild(returnToTopBtn);
    
    // Hide button initially
    returnToTopBtn.style.opacity = '0';
    returnToTopBtn.style.pointerEvents = 'none';
    
    // Show button when scrolled down
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        returnToTopBtn.style.opacity = '1';
        returnToTopBtn.style.pointerEvents = 'auto';
      } else {
        returnToTopBtn.style.opacity = '0';
        returnToTopBtn.style.pointerEvents = 'none';
      }
    });
    
    // Scroll to top when clicked
    returnToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Ensure consistent button styling across all pages
  const getStartedButtons = document.querySelectorAll('.cta-buttons .btn-primary');
  getStartedButtons.forEach(button => {
    // Apply consistent styling directly with JavaScript for cross-browser consistency
    button.style.padding = '0.75rem 1.5rem';
    button.style.minWidth = '160px';
    button.style.fontSize = '1rem';
    button.style.lineHeight = '1.3';
    button.style.textAlign = 'center';
    button.style.fontWeight = '700';
    button.style.letterSpacing = '1px';
    button.style.textTransform = 'uppercase';
  });
});