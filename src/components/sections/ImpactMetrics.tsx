import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImpactMetrics = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".impact-stat", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center+=100",
                    toggleActions: "play none none reverse"
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const stats = [
        { label: "Community Members", value: "5,000+" },
        { label: "Projects Shipped", value: "120+" },
        { label: "Hiring Partners", value: "50+" },
        { label: "Countries Reached", value: "12" }
    ];

    return (
        <section ref={sectionRef} className="bg-genMain py-32 px-4 border-b border-black/5">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-24 text-center">
                     <p className="font-mono text-sm tracking-widest text-black/40 uppercase mb-4">Our Impact</p>
                     <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">
                        CHANGING THE <br/>
                        <span className="text-genGreen">NARRATIVE</span>
                     </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="impact-stat flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-black/5 shadow-sm hover:shadow-xl transition-shadow duration-300 group">
                            <span className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 group-hover:scale-110 transition-transform duration-300 ease-out text-black">
                                {stat.value}
                            </span>
                            <span className="font-mono text-sm uppercase tracking-wider text-black/60 group-hover:text-genGreen transition-colors">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactMetrics;
