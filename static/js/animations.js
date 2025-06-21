// Enhanced Animation and Interaction Effects
document.addEventListener('DOMContentLoaded', function() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // ====== Section Reveal Animations ======
  const initRevealAnimations = () => {
    // Select all elements with reveal classes
    const revealElements = document.querySelectorAll('.reveal, .reveal-initial, .reveal-left, .reveal-right, .reveal-scale');
    
    if (revealElements.length === 0) {
      // If no reveal elements found, add classes to common sections
      document.querySelectorAll('section > .container > h2, .section-heading, .service-card, .project-card, .testimonial').forEach(el => {
        el.classList.add('reveal-initial');
      });
    }
    
    // Set up the IntersectionObserver for reveal animations
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Optionally unobserve after animation is complete
          // revealObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    });
    
    // Get updated elements after potentially adding classes
    const allRevealElements = document.querySelectorAll('.reveal, .reveal-initial, .reveal-left, .reveal-right, .reveal-scale');
    
    // Apply observer to all reveal elements if motion is not reduced
    if (!prefersReducedMotion) {
      allRevealElements.forEach(element => {
        revealObserver.observe(element);
      });
    } else {
      // If reduced motion is preferred, just show all elements
      allRevealElements.forEach(element => {
        element.classList.add('revealed');
      });
    }
  };
  
  // Run the reveal animations setup
  initRevealAnimations();
  
  // ====== Portfolio Card Hover Effects ======
  const enhanceProjectCards = () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      // Only apply hover effects if motion is not reduced
      if (!prefersReducedMotion) {
        // If card doesn't have an overlay, add one
        if (!card.querySelector('.project-overlay')) {
          const projectImage = card.querySelector('.project-image');
          if (projectImage) {
            const overlay = document.createElement('div');
            overlay.className = 'project-overlay';
            
            const button = document.createElement('a');
            button.className = 'btn btn-outline';
            button.href = card.querySelector('a')?.href || '#';
            button.textContent = 'View Project';
            
            overlay.appendChild(button);
            projectImage.appendChild(overlay);
          }
        }
      } else {
        // For reduced motion, make overlay always visible
        const overlay = card.querySelector('.project-overlay');
        if (overlay) {
          overlay.style.opacity = '1';
          overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        }
      }
    });
  };
  
  enhanceProjectCards();
  
  // ====== Animated Counters ======
  const initCounters = () => {
    const counterElements = document.querySelectorAll('.counter');
    
    if (counterElements.length === 0) return;
    
    const startCounting = (el) => {
      const target = parseInt(el.getAttribute('data-target') || el.textContent);
      const duration = 2000; // 2 seconds
      const startTime = performance.now();
      const startValue = 0;
      
      // Save the target as a data attribute if it doesn't exist
      if (!el.getAttribute('data-target')) {
        el.setAttribute('data-target', target);
      }
      
      const updateCounter = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
          const progress = elapsedTime / duration;
          // Use easeOutQuad for smoother animation
          const easeProgress = 1 - (1 - progress) * (1 - progress);
          const currentValue = Math.floor(startValue + easeProgress * (target - startValue));
          el.textContent = currentValue;
          requestAnimationFrame(updateCounter);
        } else {
          el.textContent = target;
        }
      };
      
      requestAnimationFrame(updateCounter);
    };
    
    // Set up observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !prefersReducedMotion) {
          startCounting(entry.target);
          counterObserver.unobserve(entry.target);
        } else if (prefersReducedMotion) {
          // Just show the final value
          entry.target.textContent = entry.target.getAttribute('data-target') || entry.target.textContent;
        }
      });
    }, { threshold: 0.5 });
    
    // Apply observer to counters
    counterElements.forEach(counter => {
      counterObserver.observe(counter);
    });
  };
  
  initCounters();
  
  // ====== Hero Parallax Effect ======
  const initParallaxEffects = () => {
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroSection && heroContent && !prefersReducedMotion) {
      const handleScroll = () => {
        const scrollPosition = window.pageYOffset;
        const parallaxSpeed = 0.4;
        
        // Apply parallax effect to move content slower than scroll
        if (scrollPosition < heroSection.offsetHeight) {
          heroContent.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`;
        }
      };
      
      // Add scroll listener
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      // Initial call
      handleScroll();
    }
  };
  
  initParallaxEffects();
  
  // ====== Smooth Scrolling for all anchor links ======
  const initSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip empty links or javascript:void(0)
        if (href === '#' || href === 'javascript:void(0)') return;
        
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Calculate offset for fixed header
          const headerHeight = document.querySelector('header')?.offsetHeight || 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20; // Extra 20px padding
          
          window.scrollTo({
            top: targetPosition,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });
        }
      });
    });
  };
  
  initSmoothScrolling();
  
  // ====== Tab Functionality Enhancement ======
  const enhanceTabs = () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get the target tab content
        const target = button.getAttribute('data-target');
        const targetContent = document.getElementById(target);
        
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
    
    // Set the first tab as active by default if none are active
    if (!document.querySelector('.tab-btn.active') && tabButtons.length > 0) {
      tabButtons[0].click();
    }
  };
  
  enhanceTabs();
  
  // ====== Toast Notifications ======
  window.showToast = function(message, type = 'success', duration = 3000) {
    // Remove any existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    // Add to body
    document.body.appendChild(toast);
    
    // Show toast (delayed to create animation)
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Hide toast after duration
    setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, duration);
  };
  
  // ====== Form Submission Enhancement ======
  const enhanceForms = () => {
    const contactForms = document.querySelectorAll('form');
    
    contactForms.forEach(form => {
      // Add input focus effects
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        // Find the corresponding label
        const label = form.querySelector(`label[for="${input.id}"]`);
        
        if (label) {
          // Add floating label effect
          input.addEventListener('focus', () => {
            label.classList.add('floating');
          });
          
          input.addEventListener('blur', () => {
            if (!input.value) {
              label.classList.remove('floating');
            }
          });
          
          // Initialize state for inputs with values
          if (input.value) {
            label.classList.add('floating');
          }
        }
      });
      
      // Handle form submission with animation
      form.addEventListener('submit', function(e) {
        // If it's a contact form that should be handled by the backend
        if (this.getAttribute('action') && !this.classList.contains('newsletter-form')) {
          return; // Let the backend handle it
        }
        
        e.preventDefault();
        
        // Disable submit button and show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        if (submitButton) {
          const originalText = submitButton.textContent;
          submitButton.disabled = true;
          submitButton.innerHTML = '<span class="loading-spinner"></span> Sending...';
          
          // Simulate form processing
          setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            
            // Show success toast
            window.showToast('Message sent successfully!', 'success');
            
            // Reset form
            this.reset();
          }, 1500);
        }
      });
    });
  };
  
  enhanceForms();
  
  // ====== Image Loading Animation ======
  const enhanceImageLoading = () => {
    const images = document.querySelectorAll('img:not(.loaded)');
    
    images.forEach(img => {
      // Skip form elements and small images
      if (img.closest('.contact-form') || img.src.includes('.svg') || img.naturalWidth < 50) {
        img.classList.add('loaded');
        return;
      }
      
      // Create a wrapper for the image if it doesn't have one
      if (!img.parentElement.classList.contains('img-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'img-wrapper';
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        
        // Add loading skeleton
        const skeleton = document.createElement('div');
        skeleton.className = 'img-skeleton';
        wrapper.appendChild(skeleton);
      }
      
      // Set up intersection observer for lazy loading
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Set src attribute if it's data-src (for lazy loading)
            if (img.dataset.src && !img.src.includes(img.dataset.src)) {
              img.src = img.dataset.src;
            }
            
            // Remove skeleton when image is loaded
            img.onload = function() {
              img.classList.add('loaded');
              const skeleton = img.parentElement.querySelector('.img-skeleton');
              if (skeleton) {
                skeleton.style.opacity = '0';
                setTimeout(() => {
                  skeleton.remove();
                }, 500);
              }
            };
            
            imageObserver.unobserve(img);
          }
        });
      });
      
      imageObserver.observe(img);
    });
  };
  
  enhanceImageLoading();
  
  // ====== Video Background Enhancement ======
  const enhanceVideoBackgrounds = () => {
    const heroVideos = document.querySelectorAll('.hero video');
    
    heroVideos.forEach(video => {
      // Add poster if not already present
      if (!video.hasAttribute('poster')) {
        const firstSource = video.querySelector('source');
        if (firstSource) {
          const videoPath = firstSource.src;
          const posterPath = videoPath.substring(0, videoPath.lastIndexOf('.')) + '.jpg';
          video.setAttribute('poster', posterPath);
        }
      }
      
      // Make sure video is muted, autoplay, and loop
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      
      // Try to autoplay video if it's not already playing
      if (video.paused) {
        video.play().catch(err => {
          console.log('Auto-play was prevented:', err);
          
          // Add play button for manual interaction
          if (!document.querySelector('.video-play-btn')) {
            const playBtn = document.createElement('button');
            playBtn.className = 'video-play-btn';
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            playBtn.setAttribute('aria-label', 'Play background video');
            
            video.parentElement.appendChild(playBtn);
            
            playBtn.addEventListener('click', () => {
              video.play();
              playBtn.style.display = 'none';
            });
          }
        });
      }
    });
  };
  
  enhanceVideoBackgrounds();
  
  // ====== Mobile Navigation Enhancement ======
  const enhanceMobileNavigation = () => {
    const header = document.querySelector('header');
    
    // Skip if no header
    if (!header) return;
    
    // Create and add a scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    header.appendChild(progressBar);
    
    // Update progress bar width on scroll
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const width = (scrollTop / height) * 100;
      progressBar.style.width = width + '%';
    });
    
    // Double-tap to top functionality for mobile
    let lastTap = 0;
    header.addEventListener('touchend', (e) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      
      if (tapLength < 300 && tapLength > 0) {
        // Double tap detected
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
        e.preventDefault();
      }
      
      lastTap = currentTime;
    });
  };
  
  enhanceMobileNavigation();
  
  // ====== Dynamic Content Loading ======
  // This can be used for lazy-loading portfolio items or blog posts
  window.loadMoreContent = function(targetElement, contentType, page = 1) {
    const target = document.querySelector(targetElement);
    if (!target) return;
    
    // Show loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.innerHTML = '<div class="spinner"></div><p>Loading more content...</p>';
    target.appendChild(loadingIndicator);
    
    // Simulate AJAX request (in a real site, you'd fetch from your backend)
    setTimeout(() => {
      // Remove loading indicator
      loadingIndicator.remove();
      
      // This would normally be the response from your backend
      // Here we're just simulating new content
      const dummyContent = `
        <div class="project-card reveal-initial">
          <div class="project-image">
            <img src="/static/img/project${page + 3}.jpg" alt="New Project">
            <div class="project-overlay">
              <a href="#" class="btn btn-outline">View Project</a>
            </div>
          </div>
          <div class="project-content">
            <h3>Dynamically Loaded Project</h3>
            <p>This content was loaded dynamically to enhance performance.</p>
            <div class="project-category">DYNAMIC</div>
          </div>
        </div>
      `.repeat(3); // Add 3 new items
      
      // Append new content
      const container = document.createElement('div');
      container.className = 'dynamic-content';
      container.innerHTML = dummyContent;
      target.appendChild(container);
      
      // Initialize animations on new content
      initRevealAnimations();
      enhanceProjectCards();
      
      // Update the load more button
      const loadMoreBtn = document.querySelector('.load-more-btn');
      if (loadMoreBtn) {
        loadMoreBtn.setAttribute('data-page', page + 1);
        
        // Hide button after loading enough content (for demo purposes)
        if (page >= 2) {
          loadMoreBtn.style.display = 'none';
          
          // Show "No more content" message
          const noMoreMsg = document.createElement('p');
          noMoreMsg.className = 'no-more-content';
          noMoreMsg.textContent = 'You\'ve reached the end of the content';
          target.appendChild(noMoreMsg);
        }
      }
    }, 1500);
  };
  
  // Initialize load more buttons
  document.querySelectorAll('.load-more-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const target = this.getAttribute('data-target');
      const contentType = this.getAttribute('data-type');
      const page = parseInt(this.getAttribute('data-page') || '1');
      
      window.loadMoreContent(target, contentType, page);
    });
  });
  
  // ====== Interactive Service Cards ======
  const enhanceServiceCards = () => {
    const serviceCards = document.querySelectorAll('.service-card, .service-item');
    
    serviceCards.forEach(card => {
      // Add hover effect with mouse position tracking
      card.addEventListener('mousemove', (e) => {
        if (prefersReducedMotion) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top; // y position within the element
        
        // Calculate percentage position
        const xPercent = x / rect.width;
        const yPercent = y / rect.height;
        
        // Calculate the tilt amount (max 5 degrees)
        const tiltX = (0.5 - yPercent) * 5;
        const tiltY = (xPercent - 0.5) * 5;
        
        // Apply the 3D transform
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.01, 1.01, 1.01)`;
      });
      
      // Reset transform on mouse leave
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  };
  
  // Only apply 3D effects on larger screens
  if (window.innerWidth > 1024 && !prefersReducedMotion) {
    enhanceServiceCards();
  }
  // Fix contact form elements
const fixContactElements = () => {
  // Remove any problematic wrappers from form inputs
  document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea').forEach(el => {
    if (el.parentElement && el.parentElement.classList.contains('img-wrapper')) {
      const parent = el.parentElement;
      const grandparent = parent.parentElement;
      grandparent.insertBefore(el, parent);
      parent.remove();
    }
    
    // Ensure visibility
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.classList.remove('reveal-initial', 'reveal-left', 'reveal-right', 'reveal-scale');
    el.classList.add('revealed');
  });
  
  // Ensure form labels are visible
  document.querySelectorAll('.contact-form label, .form-label').forEach(label => {
    label.style.opacity = '1';
    label.style.transform = 'none';
  });
  
  // Fix submit button
  const submitBtn = document.querySelector('.contact-form button[type="submit"]');
  if (submitBtn) {
    submitBtn.style.opacity = '1';
    submitBtn.style.transform = 'none';
  }
};

// Run the contact form fix
fixContactElements();
});

/* === ABOUT PAGE COUNTER ANIMATION === */
document.addEventListener('DOMContentLoaded', () => {

  const counters = document.querySelectorAll('.count');
  const opts = { threshold: .6 };

  const runCounter = el => {
    const target = +el.dataset.target;
    let curr = 0;
    const step = Math.ceil(target / 40);  // ≈40 frames
    const tick = () => {
      curr += step;
      if (curr >= target) { el.textContent = target; return; }
      el.textContent = curr;
      requestAnimationFrame(tick);
    };
    tick();
  };

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        runCounter(e.target);
        io.unobserve(e.target);
      }
    });
  }, opts);

  counters.forEach(c => io.observe(c));

}); // end DOMContentLoaded
