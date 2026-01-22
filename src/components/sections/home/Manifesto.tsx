import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { manifestoContent } from '../../../data/content';

gsap.registerPlugin(ScrollTrigger);

const Manifesto = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            
            const words = textRef.current?.querySelectorAll('.word');

            if (!words) return;
            
            gsap.fromTo(words, 
                { opacity: 0.2, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "bottom 80%",
                        scrub: 1
                    }
                }
            );

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const words = manifestoContent.split(" ");

    return (
        <section ref={sectionRef} className="py-32 px-4 bg-black text-white overflow-hidden min-h-[50vh] flex items-center justify-center">
            <div className="max-w-[1800px] mx-auto text-center">
                <h2 ref={textRef} className="text-4xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-[0.9] flex flex-wrap justify-center gap-x-6 gap-y-2">
                    {words.map((word, i) => (
                        <span key={i} className="word inline-block opacity-20">{word}</span>
                    ))}
                </h2>
            </div>
        </section>
    );
};

export default Manifesto;