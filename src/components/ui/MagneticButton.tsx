import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number; // How strong the pull is (default 0.5)
    scaleOnHover?: number; // Scale factor on hover (default 1.1)
    onClick?: () => void;
}

const MagneticButton = ({ 
    children, 
    className = "", 
    strength = 0.5, 
    onClick 
}: MagneticButtonProps) => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const button = buttonRef.current;
        const content = contentRef.current;
        if (!button || !content) return;

        const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
        
        // Optional: Animate content independently for parallax feel inside button
        const xToContent = gsap.quickTo(content, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yToContent = gsap.quickTo(content, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = button.getBoundingClientRect();
            
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            
            xTo(x * strength);
            yTo(y * strength);
            
            xToContent(x * (strength * 0.2));
            yToContent(y * (strength * 0.2));
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
            xToContent(0);
            yToContent(0);
        };

        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            button.removeEventListener("mousemove", handleMouseMove);
            button.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [strength]);

    return (
        <div ref={buttonRef} className={`relative inline-block cursor-pointer group ${className}`} onClick={onClick}>
             <div ref={contentRef} className="relative z-10 transition-transform duration-300 group-hover:scale-[1.05]">
                {children}
             </div>
        </div>
    );
};

export default MagneticButton;
