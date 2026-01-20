import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(ScrollTrigger);

const Manifesto = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
             const words = textRef.current?.querySelectorAll('.word');
             
             if(words) {
                 gsap.fromTo(words, 
                    { opacity: 0.1, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top center",
                            end: "bottom center",
                            scrub: 1
                        }
                    }
                 )
             }
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const content = "WE BELIEVE IN THE POWER OF CODE. WE BELIEVE IN THE ART OF DESIGN. WE ARE NOT JUST BUILDING APPS; WE ARE CRAFTING EXPERIENCES THAT DEFINE THE NEXT GENERATION.";

    return (
        <section ref={containerRef} className="min-h-screen bg-black text-white flex items-center justify-center py-24 px-4 overflow-hidden">
            <div ref={textRef} className="max-w-[1600px] text-center flex flex-wrap justify-center gap-x-4 md:gap-x-8 gap-y-2 md:gap-y-4">
                {content.split(' ').map((word, i) => (
                    <span key={i} className="word text-4xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.8] inline-block">{word}</span>
                ))}
            </div>
        </section>
    );
};

export default Manifesto;
