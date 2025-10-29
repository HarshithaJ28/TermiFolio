import React, { useEffect } from 'react';

const PerformanceOptimizer: React.FC = () => {
  useEffect(() => {
    // Optimize animations for performance
    const optimizeAnimations = () => {
      // Reduce motion for users who prefer it
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
        document.documentElement.style.setProperty('--transition-duration', '0.1s');
      }

      // Enable hardware acceleration for key elements
      const elementsToAccelerate = document.querySelectorAll(
        '.gpu-accelerated, canvas, .matrix-rain, .particle-field'
      );
      
      elementsToAccelerate.forEach(element => {
        (element as HTMLElement).style.transform = 'translateZ(0)';
        (element as HTMLElement).style.backfaceVisibility = 'hidden';
        (element as HTMLElement).style.perspective = '1000px';
      });
    };

    // Debounce resize events
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Trigger any resize-dependent animations
        window.dispatchEvent(new CustomEvent('optimizedResize'));
      }, 250);
    };

    // Memory cleanup for animations
    const cleanupAnimations = () => {
      // Cancel any running animation frames
      const animationElements = document.querySelectorAll('[style*="animation"]');
      animationElements.forEach(element => {
        if (element.getBoundingClientRect().top > window.innerHeight + 200 ||
            element.getBoundingClientRect().bottom < -200) {
          (element as HTMLElement).style.animationPlayState = 'paused';
        } else {
          (element as HTMLElement).style.animationPlayState = 'running';
        }
      });
    };

    // Optimize scroll performance
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(cleanupAnimations, 100);
    };

    // Initialize optimizations
    optimizeAnimations();
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup interval for memory management
    const cleanupInterval = setInterval(cleanupAnimations, 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(cleanupInterval);
      clearTimeout(resizeTimeout);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceOptimizer;