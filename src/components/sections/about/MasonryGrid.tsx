import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImageReveal from '../../ui/ImageReveal';

gsap.registerPlugin(ScrollTrigger);

const images = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop", // Team
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop", // Workshop
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop", // Meeting
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop", // Coding
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop", // Friends
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop", // Conference
];

const MasonryGrid = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const col1Ref = useRef<HTMLDivElement>(null);
    const col2Ref = useRef<HTMLDivElement>(null);
    const col3Ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Effect: Odd columns move Up, Even columns move Down
            gsap.to(col1Ref.current, {
                y: -100,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                }
            });
            
            gsap.to(col2Ref.current, {
                y: 100,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            gsap.to(col3Ref.current, {
                y: -50,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-32 px-4 bg-genMain overflow-hidden">
             <div className="container mx-auto mb-20 text-center">
                <span className="text-genGreen font-mono text-sm tracking-widest uppercase mb-4 block">
                    /// LIFE_AT_GENLAB
                </span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                    Capturing the Moment
                </h2>
            </div>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 h-[120vh] overflow-hidden">
                {/* Column 1 */}
                <div ref={col1Ref} className="flex flex-col gap-8 transform translate-y-20">
                     <ImageReveal src={images[0]} className="aspect-[3/4] rounded-2xl grayscale hover:grayscale-0 transition-all duration-500" />
                     <ImageReveal src={images[1]} className="aspect-[4/3] rounded-2xl grayscale hover:grayscale-0 transition-all duration-500" />
                </div>

                {/* Column 2 */}
                <div ref={col2Ref} className="flex flex-col gap-8 transform -translate-y-20 pt-20">
                    <div className="bg-black text-white p-8 rounded-2xl aspect-square flex flex-col justify-center items-center text-center">
                        <span className="text-4xl font-bold mb-2">50+</span>
                        <span className="text-sm font-mono text-genGreen uppercase">Active Projects</span>
                    </div>
                    <ImageReveal src={images[2]} className="aspect-[3/5] rounded-2xl grayscale hover:grayscale-0 transition-all duration-500" />
                </div>

                {/* Column 3 */}
                <div ref={col3Ref} className="flex flex-col gap-8 transform translate-y-10">
                     <ImageReveal src={images[3]} className="aspect-square rounded-2xl grayscale hover:grayscale-0 transition-all duration-500" />
                     <ImageReveal src={images[4]} className="aspect-[3/4] rounded-2xl grayscale hover:grayscale-0 transition-all duration-500" />
                     <div className="bg-genGreen text-black p-8 rounded-2xl aspect-video flex flex-col justify-center">
                        <span className="text-2xl font-bold leading-tight">"Where code meets creativity."</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MasonryGrid;
