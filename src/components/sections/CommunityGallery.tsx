import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop",
     "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
];

const CommunityGallery = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            
            // Horizontal Scroll
            gsap.to(sliderRef.current, {
                xPercent: -50, // Move halfway
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.5
                }
            });

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-genMain overflow-hidden border-b border-black/5">
            <div className="mb-12 px-8 max-w-[1800px] mx-auto">
                <h3 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">LIFE_AT_GENLAB</h3>
                <p className="text-black/60 text-lg md:text-xl max-w-xl">Workshops, hackathons, and late-night pizza runs. It’s not just work.</p>
            </div>

            <div ref={sliderRef} className="flex gap-8 pl-8 w-fit">
                {/* Double the array for longer scroll illusion */}
                {images.concat(images).map((src, i) => (
                    <div key={i} className="w-[300px] h-[400px] md:w-[400px] md:h-[500px] flex-shrink-0 rounded-[2rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105 cursor-none">
                        <img src={src} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CommunityGallery;
