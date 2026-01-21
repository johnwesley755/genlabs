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
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {impactMetrics.map((metric, index) => (
                        <div key={index} className="metric-item relative group cursor-default flex flex-col items-center text-center">
                             <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-2 group-hover:text-genGreen transition-colors duration-300">
                                 {metric.value}
                             </h3>
                             <p className="text-sm font-mono text-white/40 uppercase tracking-widest mb-1">
                                 {metric.label}
                             </p>
                             <p className="text-xs text-white/30 mb-6">
                                 {metric.suffix}
                             </p>
                             {/* Hover Line */}
                             <div className="w-12 h-1 bg-genGreen rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactMetrics;
