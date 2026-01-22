import { useLayoutEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(ScrollTrigger);

interface ImageRevealProps {
    src: string;
    alt?: string;
    className?: string;
    wrapperClassName?: string;
}

const ImageReveal = ({ src, alt = "", className, wrapperClassName }: ImageRevealProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const coverRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                }
            });

            // Reveal Animation
            tl.to(coverRef.current, {
                scaleY: 0,
                transformOrigin: "top",
                duration: 1.2,
                ease: "power4.inOut"
            })
            .from(imgRef.current, {
                scale: 1.2,
                duration: 1.5,
                ease: "power2.out"
            }, "-=1.2");

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={twMerge("relative overflow-hidden", wrapperClassName)}>
            <div 
                ref={coverRef} 
                className="absolute inset-0 bg-black z-10 pointer-events-none"
            />
            <img 
                ref={imgRef}
                src={src} 
                alt={alt} 
                className={twMerge("w-full h-full object-cover", className)} 
            />
        </div>
    );
};

export default ImageReveal;
