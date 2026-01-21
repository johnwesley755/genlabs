import { useState, useRef, useLayoutEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { advantages } from '../../data/content';

gsap.registerPlugin(ScrollTrigger);

const AdvantageAccordion = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Image Parallax Effect
            const images = gsap.utils.toArray('.advantage-img') as HTMLImageElement[];
            
            images.forEach((img) => {
                gsap.to(img, {
                    y: "20%", // Move image down slightly as we scroll
                    ease: "none",
                    scrollTrigger: {
                        trigger: img.parentElement, // Trigger on the image wrapper
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="bg-genMain py-32 px-4 overflow-hidden" id="advantage">
            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* Header - Sticky Left Column */}
                    <div className="lg:col-span-5 self-start lg:sticky lg:top-32 relative">
                        <span className="text-genGreen font-mono text-xs tracking-widest uppercase mb-6 block">/// WHY_GENLAB</span>
                        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.85] text-black w-full break-words hyphens-auto">
                            ADVANTAGE<br className="hidden md:block"/> ENGINE
                        </h2>
                        <p className="text-black/60 text-xl leading-relaxed max-w-md font-light">
                            We don't just teach code. We install the operating system for high-velocity career growth.
                        </p>
                    </div>

                    {/* Accordion List - Right Column */}
                    <div className="lg:col-span-7">
                        {advantages.map((item, index) => (
                            <div 
                                key={item.id}
                                className="border-b border-black/10 group first:border-t"
                            >
                                <button
                                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                    className="w-full py-6 md:py-10 flex items-start justify-between text-left relative z-20 group hover:bg-white/40 transition-colors duration-300 px-4 -mx-4 rounded-xl"
                                >
                                    <div className="flex items-center gap-4 md:gap-12">
                                        <span className="font-mono text-sm text-black/30 w-8 shrink-0">0{index + 1}</span>
                                        <h3 className="text-2xl md:text-5xl font-bold tracking-tight text-black">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${activeIndex === index ? 'bg-black text-white rotate-0' : 'bg-transparent border border-black/10 text-black hover:border-black'}`}>
                                        {activeIndex === index ? <Minus className="w-4 h-4 md:w-5 md:h-5" /> : <Plus className="w-4 h-4 md:w-5 md:h-5" />}
                                    </div>
                                </button>
                                
                                <div 
                                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${activeIndex === index ? 'max-h-[1000px] opacity-100 pb-8 md:pb-12' : 'max-h-0 opacity-0 pb-0'}`}
                                >
                                    <div className="pl-0 md:pl-[4.5rem] flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                                        <div className="flex-1">
                                            <p className="text-lg md:text-xl leading-relaxed text-black/70 font-light">
                                                {item.description}
                                            </p>
                                        </div>
                                        <div className="w-full md:w-72 h-48 rounded-2xl overflow-hidden bg-black/5 relative shrink-0 shadow-xl shadow-black/5">
                                            <img 
                                                src={item.image} 
                                                alt="" 
                                                className="advantage-img w-full h-[120%] object-cover grayscale transition-all duration-700 hover:scale-105 hover:grayscale-0 -mt-[10%]" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdvantageAccordion;
