// Professional Loading Screen Controller
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('pageLoader');
    const progressFill = document.getElementById('progressFill');
    const loadingText = document.querySelector('.loading-text');
    
    // Configuration
    const config = {
        minLoadTime: 2800,        // Minimum time to show loader (for UX)
        maxLoadTime: 4000,        // Maximum time before forcing hide
        progressSteps: [
            { percent: 15, text: "INITIALIZING FLIGHT SYSTEMS", delay: 300 },
            { percent: 35, text: "CALIBRATING SENSORS", delay: 600 },
            { percent: 55, text: "CONNECTING TO GROUND STATION", delay: 900 },
            { percent: 80, text: "PREPARING FOR TAKEOFF", delay: 1200 },
            { percent: 98, text: "READY FOR FLIGHT", delay: 1800 },
            { percent: 100, text: "LAUNCHING EXPERIENCE", delay: 2200 }
        ],
        fadeOutDuration: 500
    };
    
    // Track loading state
    let loadingState = {
        startTime: performance.now(),
        contentLoaded: false,
        animationComplete: false,
        currentStep: 0,
        forceHidden: false
    };
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Adjust timings for reduced motion
    if (prefersReducedMotion) {
        config.minLoadTime = 1500;
        config.progressSteps = config.progressSteps.map(step => ({
            ...step,
            delay: step.delay * 0.6
        }));
    }
    
    // Initialize loader if element exists
    if (!loader) {
        console.warn('Page loader element not found');
        return;
    }
    
    // Set initial state
    document.body.style.overflow = 'hidden';
    
    // Progress animation controller
    function animateProgress() {
        const step = config.progressSteps[loadingState.currentStep];
        
        if (!step || loadingState.forceHidden) {
            return;
        }
        
        // Update progress bar width
        if (progressFill) {
            progressFill.style.width = step.percent + '%';
        }
        
        // Update loading text
        if (loadingText) {
            loadingText.style.opacity = '0';
            setTimeout(() => {
                loadingText.textContent = step.text;
                loadingText.style.opacity = '1';
            }, 150);
        }
        
        // Schedule next step
        loadingState.currentStep++;
        if (loadingState.currentStep < config.progressSteps.length) {
            setTimeout(animateProgress, step.delay);
        } else {
            loadingState.animationComplete = true;
            checkReadyToHide();
        }
    }
    
    // Check if loader should be hidden
    function checkReadyToHide() {
        const elapsedTime = performance.now() - loadingState.startTime;
        const minTimeReached = elapsedTime >= config.minLoadTime;
        
        if (loadingState.contentLoaded && loadingState.animationComplete && minTimeReached && !loadingState.forceHidden) {
            hideLoader();
        }
    }
    
    // Hide loader with animation
    function hideLoader() {
        if (loadingState.forceHidden) return;
        
        loadingState.forceHidden = true;
        
        // Add fade out class
        loader.classList.add('fade-out');
        
        // Re-enable scrolling and mark loader as complete
        document.body.style.overflow = '';
        document.body.classList.add('loader-complete');
        
        // Remove loader from DOM after animation
        setTimeout(() => {
            if (loader && loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
            
            // Trigger any post-load animations
            triggerPageAnimations();
            
            // Fire custom event for other scripts
            window.dispatchEvent(new CustomEvent('loaderComplete', {
                detail: {
                    totalTime: performance.now() - loadingState.startTime
                }
            }));
            
        }, config.fadeOutDuration);
    }
    
    // Trigger page animations after loader is hidden
    function triggerPageAnimations() {
        // Add a small delay before triggering reveal animations
        setTimeout(() => {
            // Trigger any reveal animations that were waiting
            const revealElements = document.querySelectorAll('.reveal-initial, .reveal-left, .reveal-right, .reveal-scale');
            revealElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('revealed');
                }, index * 100);
            });
            
            // Trigger hero animations
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.classList.add('hero-loaded');
            }
        }, 200);
    }
    
    // Force hide loader after maximum time
    function forceHideLoader() {
        if (!loadingState.forceHidden) {
            console.warn('Loader forced to hide after maximum time');
            loadingState.contentLoaded = true;
            loadingState.animationComplete = true;
            hideLoader();
        }
    }
    
    // Handle window load event
    window.addEventListener('load', function() {
        loadingState.contentLoaded = true;
        checkReadyToHide();
    });
    
    // Handle document ready state changes
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            // Start progress animation shortly after DOM is ready
            setTimeout(animateProgress, 100);
        });
    } else {
        // DOM is already ready
        setTimeout(animateProgress, 100);
    }
    
    // Set maximum time failsafe
    setTimeout(forceHideLoader, config.maxLoadTime);
    
    // Handle edge cases and cleanup
    window.addEventListener('beforeunload', function() {
        if (loader) {
            loader.style.display = 'none';
        }
    });
    
    // Handle back/forward navigation
    window.addEventListener('pageshow', function(event) {
        if (event.persisted && loader) {
            // Page was loaded from cache, hide loader immediately
            hideLoader();
        }
    });
    
    // Handle visibility change (tab switching)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // User switched tabs, speed up the loading process
            if (!loadingState.forceHidden && loadingState.currentStep < config.progressSteps.length - 1) {
                loadingState.currentStep = config.progressSteps.length - 2;
                setTimeout(animateProgress, 300);
            }
        }
    });
    
    // Expose loader controller for debugging (development only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.loaderController = {
            hide: hideLoader,
            getState: () => loadingState,
            skipToEnd: () => {
                loadingState.currentStep = config.progressSteps.length - 1;
                loadingState.contentLoaded = true;
                animateProgress();
            }
        };
    }
    
    // Handle CSS animation events
    loader.addEventListener('animationend', function(event) {
        if (event.animationName === 'loader-fade-in') {
            // Loader intro animation complete
            loader.classList.add('intro-complete');
        }
    });
    
    // Keyboard accessibility - allow ESC to skip loader (for development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && !loadingState.forceHidden) {
                console.log('Loader skipped via ESC key');
                loadingState.contentLoaded = true;
                loadingState.animationComplete = true;
                hideLoader();
            }
        });
    }
    
    // Performance monitoring
    const performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
            if (entry.entryType === 'navigation') {
                // Log loading performance for optimization
                console.log(`Page load time: ${entry.loadEventEnd - entry.loadEventStart}ms`);
            }
        });
    });
    
    try {
        performanceObserver.observe({ entryTypes: ['navigation'] });
    } catch (e) {
        // Performance Observer not supported in older browsers
        console.warn('Performance Observer not supported');
    }
    
});