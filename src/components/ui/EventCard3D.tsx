import { useRef, type MouseEvent } from 'react';
import gsap from 'gsap';
import { twMerge } from 'tailwind-merge';

interface EventCard3DProps {
  children: React.ReactNode;
  className?: string;
}

const EventCard3D = ({ children, className }: EventCard3DProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glareRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(cardRef.current, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 1000,
        transformStyle: "preserve-3d"
    });

    // Glare movement
    gsap.to(glareRef.current, {
        x: x - rect.width, // Offset glare
        y: y - rect.height,
        duration: 0.4,
        opacity: 0.6
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !glareRef.current) return;
    
    gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)"
    });
    
    gsap.to(glareRef.current, {
        opacity: 0,
        duration: 0.5
    });
  };

  return (
    <div 
        className="perspective-1000" 
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave}
    >
        <div 
            ref={cardRef} 
            className={twMerge(
                "relative overflow-hidden bg-white/5 border border-white/10 rounded-3xl p-8 transition-shadow duration-300 shadow-xl",
                className
            )}
        >
            {/* Glare Effect */}
            <div 
                ref={glareRef} 
                className="absolute w-[200%] h-[200%] bg-white/10 blur-[50px] rounded-full pointer-events-none -translate-x-[50%] -translate-y-[50%] opacity-0 z-50"
            />
            
            <div className="relative z-10 transform-style-3d">
                {children}
            </div>
        </div>
    </div>
  );
};

export default EventCard3D;
