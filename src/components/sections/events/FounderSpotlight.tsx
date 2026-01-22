import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Sparkles } from 'lucide-react';
import { aboutPageContent } from '../../../data/content';

gsap.registerPlugin(ScrollTrigger);

const FounderSpotlight = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const { founder } = aboutPageContent;

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            
            // Image Parallax with Scale
            gsap.to(".founder-img", {
                yPercent: 15,
                scale: 1.1,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Unique Text Reveal - "Skew Up"
            const textElements = gsap.utils.toArray('.reveal-text');
            textElements.forEach((el: unknown) => {
                if (el instanceof HTMLElement) {
                gsap.fromTo(el, 
                    { y: 100, skewY: 10, opacity: 0 },
                    { 
                        y: 0, 
                        skewY: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
                }
            });

            // Decorative Circle functionality
            gsap.to(".decor-circle", {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: "linear"
            });

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 bg-white text-black px-4 relative overflow-hidden min-h-[90vh] flex items-center">
            
            {/* Background Texture - Light */}
            <div className="absolute inset-0 bg-[#FAFAFA]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 pointer-events-none mix-blend-multiply" />
            
            {/* Abstract Shapes */}
            <div className="absolute top-20 right-0 w-[40vw] h-[40vw] bg-genGreen/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="anchor-shape absolute bottom-20 left-20 text-black/5">
                <Sparkles className="w-64 h-64 opacity-20 decor-circle" />
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                    
                    {/* Left: Image with Unique Frame */}
                    <div className="lg:col-span-5 relative group perspective-1000 order-2 lg:order-1">
                         <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl skew-x-1 hover:skew-x-0 transition-transform duration-700 ease-out">
                             <img 
                                src={founder.image} 
                                alt={founder.name} 
                                className="founder-img w-full h-[120%] object-cover object-center -mt-[10%]"
                             />
                         </div>
                         {/* Offset Border */}
                         <div className="absolute top-4 left-4 w-full h-full border-2 border-black/10 rounded-[2rem] -z-10 skew-x-1 group-hover:skew-x-0 transition-transform duration-700" />
                    </div>

                    {/* Right: Content */}
                    <div ref={contentRef} className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
                        <div className="overflow-hidden mb-6">
                            <div className="reveal-text inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 text-xs font-mono tracking-widest uppercase mb-4 text-black/60">
                                <span className="w-2 h-2 rounded-full bg-genGreen" />
                                /// Founder_Stories
                            </div>
                        </div>

                        <div className="overflow-hidden mb-8">
                            <h2 className="reveal-text text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-black">
                                {founder.name.split(" ")[0]} <br/>
                                <span className="text-black/50">{founder.name.split(" ")[1]}</span>
                            </h2>
                        </div>

                        <div className="relative pl-8 md:pl-12 border-l-2 border-genGreen mb-12 max-w-2xl">
                            <Quote className="absolute -top-4 -left-3 w-8 h-8 bg-white text-genGreen fill-current p-1" />
                            <div className="overflow-hidden">
                                <p className="reveal-text text-xl md:text-3xl font-light leading-relaxed text-black/80">
                                    "{founder.description}"
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-8 md:gap-16 pt-8 mt-4 border-t border-black/10">
                            <div className="overflow-hidden">
                                <div className="reveal-text">
                                    <span className="block text-5xl font-bold text-black mb-1">10+</span>
                                    <span className="text-xs font-mono uppercase text-black/50 tracking-widest">Years Experience</span>
                                </div>
                            </div>
                            <div className="overflow-hidden">
                                <div className="reveal-text">
                                    <span className="block text-5xl font-bold text-black mb-1">25k+</span>
                                    <span className="text-xs font-mono uppercase text-black/50 tracking-widest">Lives Impacted</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FounderSpotlight;
