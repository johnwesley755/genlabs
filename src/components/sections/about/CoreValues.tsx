import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutPageContent } from '../../../data/content';

gsap.registerPlugin(ScrollTrigger);

const CoreValues = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card) => {
                if (!card) return;
                
                ScrollTrigger.create({
                    trigger: card,
                    start: "top top",
                    end: "bottom top", 
                    pin: true, 
                    pinSpacing: false,
                    scrub: true,
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className="bg-black py-24 pb-48">
            <div className="container mx-auto px-4 mb-24 text-center">
                <span className="text-genGreen font-mono text-sm tracking-widest uppercase mb-4 block">/// OUR_DNA</span>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                    Built Different.
                </h2>
            </div>

            <div ref={containerRef} className="w-full space-y-0 relative pb-[50vh]">
                {aboutPageContent.values.map((val, i) => (
                    <div 
                        key={val.id}
                        ref={el => cardsRef.current[i] = el}
                        className="sticky top-8 w-full max-w-7xl mx-auto h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden border border-white/10 shadow-2xl relative rounded-[3rem]"
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0">
                            <img 
                                src={val.image || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2600&auto=format&fit=crop"} 
                                alt={val.title}
                                className="w-full h-full object-cover scale-105"
                            />
                            {/* Clearer Overlay - Removed Blur */}
                            <div className="absolute inset-0 bg-black/40" /> 
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
                        </div>

                        <div className="relative z-10 max-w-7xl px-6">
                            <div className="text-genGreen font-mono text-sm uppercase tracking-[0.5em] mb-8 opacity-80">
                                Value_0{i+1}
                            </div>
                            <h3 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 text-white leading-[0.9]">
                                {val.title}
                            </h3>
                            <p className="text-xl md:text-4xl text-white/90 font-light leading-relaxed max-w-4xl mx-auto">
                                {val.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CoreValues;
