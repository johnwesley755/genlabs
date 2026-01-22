import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutContent } from '../../../data/content';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(contentRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        end: "top 30%",
                        scrub: 1
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className="min-h-[60vh] flex flex-col items-center justify-center py-24 bg-genMain relative">
            
            <div ref={contentRef} className="w-full max-w-4xl px-6 md:px-12 text-center">
                 <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-black/5 bg-white/50 backdrop-blur-sm">
                     <span className="w-1.5 h-1.5 rounded-full bg-genGreen animate-pulse" />
                     <span className="text-xs font-mono uppercase tracking-widest opacity-60">
                        {aboutContent.badge}
                     </span>
                 </div>
                 
                 <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.15] mb-8 text-black">
                     {aboutContent.title}
                 </h2>

                 <p className="text-lg md:text-2xl text-black/60 leading-relaxed font-medium max-w-2xl mx-auto">
                     {aboutContent.description}
                 </p>
            </div>
        </section>
    );
};

export default AboutSection;
