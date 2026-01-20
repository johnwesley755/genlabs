import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { impactMetrics } from '../../data/content';

gsap.registerPlugin(ScrollTrigger);

const ImpactMetrics = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".metric-item", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-black text-white py-24 px-4 overflow-hidden">
            <div className="max-w-[1800px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {impactMetrics.map((metric, index) => (
                        <div key={index} className="metric-item border-l border-white/20 pl-8 relative group cursor-default">
                             <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-genGreen scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                             <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-2 group-hover:text-genGreen transition-colors duration-300">
                                 {metric.value}
                             </h3>
                             <p className="text-sm font-mono text-white/40 uppercase tracking-widest mb-1">
                                 {metric.label}
                             </p>
                             <p className="text-xs text-white/30">
                                 {metric.suffix}
                             </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactMetrics;
