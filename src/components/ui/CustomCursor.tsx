import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Center the cursor
    const xSet = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3" });
    const ySet = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xSet(e.clientX);
      ySet(e.clientY);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);

    // Add event listeners to hoverable elements
    const hoverables = document.querySelectorAll('a, button, input, textarea, .hover-trigger');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    // Observer for dynamic elements
    const observer = new MutationObserver(() => {
        const hoverables = document.querySelectorAll('a, button, input, textarea, .hover-trigger');
        hoverables.forEach(el => {
            el.removeEventListener('mouseenter', handleHoverStart);
            el.removeEventListener('mouseleave', handleHoverEnd);
            el.addEventListener('mouseenter', handleHoverStart);
            el.addEventListener('mouseleave', handleHoverEnd);
        });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (isHovering) {
        gsap.to(cursor, {
            width: 60,
            height: 60,
            backgroundColor: 'transparent',
            border: '2px solid #BCF000', // genGreen
            mixBlendMode: 'difference',
            duration: 0.3
        });
    } else {
        gsap.to(cursor, {
            width: 12,
            height: 12,
            backgroundColor: '#fff',
            border: 'none',
            mixBlendMode: 'difference',
            duration: 0.3
        });
    }
  }, [isHovering]);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2`}
      style={{ width: 12, height: 12, backgroundColor: '#fff', mixBlendMode: 'difference' }}
    />
  );
};

export default CustomCursor;
