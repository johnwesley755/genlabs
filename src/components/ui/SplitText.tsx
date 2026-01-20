import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
}

const SplitText: React.FC<SplitTextProps> = ({ children, className, delay = 0 }) => {
  const elRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        if(!elRef.current) return;
        
        const chars = elRef.current.querySelectorAll('.char');
        
        gsap.from(chars, {
            scrollTrigger: {
                trigger: elRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 100,
            opacity: 0,
            rotate: 10,
            duration: 0.8,
            stagger: 0.02,
            delay: delay,
            ease: "power4.out"
        });

    }, elRef);
    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={elRef} className={`${className} overflow-hidden inline-block`}>
      {children.split('').map((char, i) => (
        <span key={i} className="char inline-block" style={{ whiteSpace: 'pre' }}>
          {char}
        </span>
      ))}
    </div>
  );
};

export default SplitText;
