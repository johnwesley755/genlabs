import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const frames = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop"
];

const ProductSequence = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: "+=2000",
                }
            });

            // Transition between frames
            frames.forEach((_, i) => {
                if(i === 0) return;
                tl.fromTo(`.sequence-img-${i}`, 
                    { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
                    { opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1 }
                );
            });
            
            // Text animations
            tl.fromTo('.sequence-text', { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, 0.5);

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="h-screen bg-black relative overflow-hidden flex items-center justify-center">
            <div ref={wrapperRef} className="relative w-full h-full">
                {frames.map((src, i) => (
                    <img 
                        key={i}
                        src={src}
                        alt={`Sequence ${i}`}
                        className={`sequence-img-${i} absolute inset-0 w-full h-full object-cover z-${i * 10}`}
                        style={{ zIndex: i }}
                    />
                ))}
            </div>
            
            <div className="absolute inset-0 bg-black/40 z-50 flex items-center justify-center">
                 <div className="text-center sequence-text opacity-0">
                     <span className="text-genGreen font-mono text-xl mb-4 block">ARCHITECTURE</span>
                     <h2 className="text-8xl font-bold text-white tracking-tighter mb-8">BUILT FOR THE FUTURE</h2>
                     <p className="text-neutral-300 max-w-xl mx-auto text-lg">
                         Our bio-digital interface adapts to your workflow, creating a seamless connection between human intent and machine execution.
                     </p>
                 </div>
            </div>
        </section>
    );
};

export default ProductSequence;
