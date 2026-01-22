import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const [isComplete, setIsComplete] = useState(false);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => setIsComplete(true)
            });

            // Counter Animation
            const counter = { val: 0 };
            
            tl.to(counter, {
                val: 100,
                duration: 2.5,
                ease: "power2.inOut",
                onUpdate: () => {
                    if (counterRef.current) {
                        counterRef.current.innerText = Math.round(counter.val).toString();
                    }
                }
            })
            // Progress Bar Width
            .to(".loader-bar", {
                width: "100%",
                duration: 2.5,
                ease: "power2.inOut"
            }, "<")
            // Text Stagger Out
            .to(".loader-text", {
                y: -50,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "back.in(1.7)"
            })
            // Counter Exit
            .to(counterRef.current, {
                y: -50,
                opacity: 0,
                duration: 0.5
            }, "<")
            // Curtain Reveal (Slide Up)
            .to(containerRef.current, {
                yPercent: -100,
                duration: 1.2,
                ease: "power4.inOut"
            }, "+=0.2");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    if (isComplete) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[9999] bg-[#050505] text-white flex flex-col justify-between p-8 md:p-12 overflow-hidden">
            {/* Top Section */}
            <div className="flex justify-between items-start opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                <span className="font-mono text-xs md:text-sm text-white/50 tracking-widest uppercase">GenLab IB</span>
                <span className="font-mono text-xs md:text-sm text-white/50 tracking-widest uppercase">Est. 2024</span>
            </div>

            {/* Center Content */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
                <div className="overflow-hidden h-20 md:h-32 mb-4 flex justify-center items-center gap-4">
                    {['CONNECT', '•', 'CREATE', '•', 'ELEVATE'].map((word, i) => (
                        <span 
                            key={i} 
                            className="loader-text inline-block text-3xl md:text-6xl lg:text-8xl font-bold tracking-tighter"
                        >
                            {word}
                        </span>
                    ))}
                </div>
            </div>

            {/* Bottom Section */}
            <div className="w-full flex flex-col gap-4">
                <div className="flex justify-between items-end">
                    <span className="loader-text font-mono text-xs uppercase tracking-widest text-genGreen">Loading Experience...</span>
                    <div className="overflow-hidden">
                        <span ref={counterRef} className="text-6xl md:text-8xl font-bold tracking-tighter tabular-nums leading-none">
                            0
                        </span>
                    </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                    <div className="loader-bar w-0 h-full bg-genGreen" />
                </div>
            </div>

            {/* Grain Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat pointer-events-none mix-blend-overlay" />
        </div>
    );
};

export default Preloader;
