import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { communityImages } from '../../data/content';

gsap.registerPlugin(ScrollTrigger);

const CommunityGallery = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const row1Ref = useRef<HTMLDivElement>(null);
    const row2Ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            
            // Row 1: Left to Right (or natural scroll direction)
            gsap.to(row1Ref.current, {
                xPercent: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });

            // Row 2: Right to Left (Opposing)
            gsap.fromTo(row2Ref.current, 
                { xPercent: -30 }, // Start offset
                {
                    xPercent: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    }
                }
            );

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Create enough items for the scroll
    const galleryRow1 = [...communityImages, ...communityImages, ...communityImages];
    const galleryRow2 = [...communityImages].reverse().concat([...communityImages].reverse()); // Reverse for variety

    return (
        <section ref={sectionRef} className="py-24 overflow-hidden bg-genMain">
            <div className="mb-16 text-center px-4">
                 <span className="text-xs font-mono font-bold text-genGreen tracking-widest uppercase mb-4 block animate-pulse">
                    /// GLOBAL_NETWORK
                 </span>
                 <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase">
                    Makers & <br className="md:hidden" /> Dreamers
                 </h2>
            </div>
            
            <div className="flex flex-col gap-6 md:gap-8">
                {/* Row 1 */}
                <div ref={row1Ref} className="flex gap-4 md:gap-8 w-max pl-4">
                    {galleryRow1.map((src, i) => (
                        <div key={`r1-${i}`} className="w-[200px] h-[280px] md:w-[350px] md:h-[450px] flex-shrink-0 rounded-2xl overflow-hidden relative group grayscale hover:grayscale-0 transition-all duration-500">
                            <img src={src} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                        </div>
                    ))}
                </div>

                {/* Row 2 */}
                <div ref={row2Ref} className="flex gap-4 md:gap-8 w-max pl-4">
                    {galleryRow2.map((src, i) => (
                        <div key={`r2-${i}`} className="w-[200px] h-[280px] md:w-[350px] md:h-[450px] flex-shrink-0 rounded-2xl overflow-hidden relative group grayscale hover:grayscale-0 transition-all duration-500">
                            <img src={src} className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CommunityGallery;
