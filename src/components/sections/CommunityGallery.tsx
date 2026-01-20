import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { communityImages } from '../../data/content';

gsap.registerPlugin(ScrollTrigger);

const CommunityGallery = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const rowRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(rowRef.current, {
                xPercent: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center",
                    end: "bottom top",
                    scrub: 1
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Duplicate images for infinite scroll loop effect
    const gallery = [...communityImages, ...communityImages];

    return (
        <section ref={sectionRef} className="py-24 overflow-hidden bg-genMain">
            <div className="mb-12 text-center">
                 <span className="text-xs font-mono font-bold text-genGreen tracking-widest uppercase mb-4 block">/// COMMUNITY</span>
                 <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Makers, Builders & Dreamers</h2>
            </div>
            
            <div className="flex overflow-hidden">
                <div ref={rowRef} className="flex gap-4 md:gap-8 px-4 w-max">
                    {gallery.map((src, i) => (
                        <div key={i} className="w-[300px] h-[400px] md:w-[400px] md:h-[500px] flex-shrink-0 rounded-2xl overflow-hidden relative group">
                            <img src={src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CommunityGallery;
