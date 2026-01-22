import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [isComplete, setIsComplete] = useState(false);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => setIsComplete(true)
            });

            // Text Reveal
            tl.to(textRef.current?.children || [], {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            })
            // Wait
            .to({}, { duration: 0.5 })
            // Text Exit
            .to(textRef.current?.children || [], {
                y: -50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: "power3.in"
            })
            // Panel Exit
            .to(containerRef.current, {
                height: 0,
                duration: 1.5,
                ease: "expo.inOut"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    if (isComplete) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
            <div ref={textRef} className="flex gap-2 md:gap-4 overflow-hidden">
                {['GENLAB', 'IB', '•', 'BUILD', 'THE', 'FUTURE'].map((word, i) => (
                    <span key={i} className="text-white font-bold text-2xl md:text-6xl tracking-tighter opacity-0 translate-y-20 block">
                        {word}
                    </span>
                ))}
            </div>
            {/* Grain Overlay */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat pointer-events-none" />
        </div>
    );
};

export default Preloader;
