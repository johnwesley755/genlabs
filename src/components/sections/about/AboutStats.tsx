import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutPageContent } from '../../../data/content';

gsap.registerPlugin(ScrollTrigger);

const AboutStats = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.stat-item', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-20 border-y border-black/10 bg-black/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
                    {aboutPageContent.stats.map((stat, index) => (
                        <div key={index} className="stat-item flex flex-col items-center text-center">
                            <span className="text-5xl md:text-7xl font-bold tracking-tighter mb-2 block">
                                {stat.value}
                            </span>
                            <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-black/50">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutStats;
