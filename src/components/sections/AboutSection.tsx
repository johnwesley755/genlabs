import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../ui/SplitText';
import { aboutContent } from '../../data/content';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Text Reveal
            gsap.fromTo(textRef.current, 
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "top 20%",
                        scrub: 1
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className="min-h-[50vh] flex items-center justify-center py-32 px-4 bg-genMain overflow-hidden">
            <div ref={textRef} className="max-w-4xl mx-auto text-center will-change-transform">
                 <span className="text-genGreen font-mono text-sm tracking-widest uppercase mb-6 block">/// {aboutContent.badge}</span>
                 <SplitText className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-8">
                     {aboutContent.title}
                 </SplitText>
                 <p className="text-lg md:text-xl text-black/60 leading-relaxed max-w-2xl mx-auto font-light">
                     {aboutContent.description}
                 </p>
            </div>
        </section>
    );
};

export default AboutSection;
