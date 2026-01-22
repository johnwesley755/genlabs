import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EventsHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Background
            gsap.to(".event-hero-bg", {
                y: "30%",
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Text Reveal
             gsap.from(textRef.current?.children || [], {
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.5
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="event-hero-bg absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center opacity-40 scale-110 grayscale" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div ref={textRef} className="relative z-10 text-center px-4 max-w-5xl">
                <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-sm font-mono text-genGreen uppercase tracking-widest mb-8">
                    /// LIVE_EXPERIENCES
                </span>
                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.9] mb-8">
                    UNFORGETTABLE <br/> <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">MOMENTS</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto">
                    Join the most vibrant tech community events. Workshops, hackathons, and networking that propels you forward.
                </p>
            </div>
        </section>
    );
};

export default EventsHero;
