import React, { useState, useEffect } from 'react';

const CustomCursor: React.FC = () => {
  // START OF CURSOR LOGIC AND STATE
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHidden, setIsHidden] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Effect for tracking mouse movement and state
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Effect for detecting hover over interactive elements
  useEffect(() => {
    const updateHoverState = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, .cursor-pointer, [onclick], [data-clickable]'
      );

      const handleElementEnter = () => setIsHovering(true);
      const handleElementLeave = () => setIsHovering(false);

      // Remove existing listeners first
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementEnter);
        el.removeEventListener('mouseleave', handleElementLeave);
      });

      // Add new listeners
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleElementEnter);
        el.addEventListener('mouseleave', handleElementLeave);
      });

      return () => {
        interactiveElements.forEach((el) => {
          el.removeEventListener('mouseenter', handleElementEnter);
          el.removeEventListener('mouseleave', handleElementLeave);
        });
      };
    };

    // Initial setup
    const cleanup = updateHoverState();

    // Re-run when DOM changes (for dynamically added elements)
    const observer = new MutationObserver(updateHoverState);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'onclick', 'data-clickable']
    });

    return () => {
      cleanup();
      observer.disconnect();
    };
  }, []);

  const cursorClasses = [
    'cursor-container',
    isHidden ? 'opacity-0' : 'opacity-100',
    isHovering ? 'is-hovering' : '',
    isClicking ? 'is-clicking' : '',
  ].join(' ');
  // END OF CURSOR LOGIC

  return (
    <>
      {/* START OF CURSOR STYLES */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes shockwave {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(3.5);
            opacity: 0;
          }
        }

        .cursor-container {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
          pointer-events: none;
          transition: opacity 0.3s ease, transform 0.15s ease-out;
          will-change: transform;
        }
        
        .cursor-core {
          position: absolute;
          top: -4px;
          left: -4px;
          width: 8px;
          height: 8px;
          background-color: #34d399; /* emerald-400 */
          border-radius: 50%;
          transform-origin: center center;
          transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s ease;
          box-shadow: 0 0 5px #34d399, 0 0 8px #34d399 inset;
        }

        .cursor-orbiters {
          position: absolute;
          top: 0;
          left: 0;
          width: 1px;
          height: 1px;
          animation: spin 4s linear infinite;
          transition: opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1), transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }
        
        .orbiter {
          position: absolute;
          top: -2.5px;
          left: -2.5px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .orbiter-1 {
          background-color: #67e8f9; /* cyan-300 */
          transform: translateY(-20px);
        }

        .orbiter-2 {
          background-color: #f472b6; /* pink-400 */
          transform: translateY(20px);
        }

        .click-ring {
          position: absolute;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          border: 2px solid #34d399;
          border-radius: 50%;
          opacity: 0;
          transform: translate(-50%, -50%) scale(0);
        }
        
        /* Hover State - Single Dot for Clickable Elements */
        .is-hovering .cursor-core {
          transform: scale(1.5);
          box-shadow: 0 0 8px #34d399;
          background-color: #10b981; /* emerald-500 */
        }
        .is-hovering .cursor-orbiters {
          opacity: 0;
          transform: scale(0);
        }
        .is-hovering .orbiter {
          transform: scale(0);
        }

        /* Click State */
        .is-clicking .cursor-core {
          transform: scale(1.6);
          transition-duration: 0.1s;
        }
        .is-clicking .click-ring {
          animation: shockwave 0.4s ease-out;
        }
      `}</style>
      {/* END OF CURSOR STYLES */}
      
      {/* START OF CURSOR JSX */}
      <div 
        className={cursorClasses}
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      >
        <div className="click-ring"></div>
        <div className="cursor-orbiters">
          <div className="orbiter orbiter-1"></div>
          <div className="orbiter orbiter-2"></div>
        </div>
        <div className="cursor-core"></div>
      </div>
      {/* END OF CURSOR JSX */}
    </>
  );
};

export default CustomCursor;