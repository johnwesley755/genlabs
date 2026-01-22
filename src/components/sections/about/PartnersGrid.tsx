import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutPageContent } from '../../../data/content';

gsap.registerPlugin(ScrollTrigger);

const PartnersGrid = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const col1Ref = useRef<HTMLDivElement>(null);
    const col2Ref = useRef<HTMLDivElement>(null);
    const col3Ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Columns - Different Speeds
            gsap.to(col1Ref.current, {
                y: "-15%",
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });

            gsap.to(col2Ref.current, {
                y: "10%", // Moves opposite or slower
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5
                }
            });

            gsap.to(col3Ref.current, {
                y: "-25%", // Fastest
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.8
                }
            });

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Split partners into 3 columns for masonry feel
    const col1 = [aboutPageContent.partners[0], aboutPageContent.partners[3], aboutPageContent.partners[6]].filter(Boolean);
    const col2 = [aboutPageContent.partners[1], aboutPageContent.partners[4], aboutPageContent.partners[7]].filter(Boolean);
    const col3 = [aboutPageContent.partners[2], aboutPageContent.partners[5]].filter(Boolean);

    const renderCard = (partner: any, idx: number) => (
        <div key={idx} className="w-full aspect-[3/4] md:aspect-[4/5] bg-white/5 rounded-3xl overflow-hidden relative group border border-white/10 hover:border-genGreen/50 transition-colors duration-500 mb-8 md:mb-12">
            <div className="absolute inset-0">
                <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-60" />
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-12 h-1 bg-genGreen mb-4 w-0 group-hover:w-12 transition-all duration-500" />
                <h3 className="text-2xl font-bold text-white mb-2">{partner.name}</h3>
                <p className="text-sm text-white/60 font-mono uppercase tracking-widest">{partner.description}</p>
            </div>
        </div>
    );

    return (
        <section ref={sectionRef} className="py-24 bg-black text-white relative overflow-hidden min-h-screen flex items-center">
             {/* Background Noise */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
             
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-24 items-end">
                    <div className="md:w-1/2">
                         <span className="text-genGreen font-mono text-sm tracking-widest uppercase mb-4 block">
                            /// OUR_ALLIES
                        </span>
                        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
                            BUILDING <br/> TOGETHER
                        </h2>
                    </div>
                     <div className="md:w-1/2">
                        <p className="text-xl text-white/60 max-w-md leading-relaxed">
                            We collaborate with the most forward-thinking companies to provide our community with world-class opportunities.
                        </p>
                    </div>
                </div>

                {/* Parallax Masonry Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    <div ref={col1Ref} className="flex flex-col pt-0">{col1.map(renderCard)}</div>
                    <div ref={col2Ref} className="flex flex-col pt-24 md:pt-48">{col2.map(renderCard)}</div>
                    <div ref={col3Ref} className="flex flex-col pt-12 md:pt-24">{col3.map(renderCard)}</div>
                </div>
            </div>
        </section>
    );
};

export default PartnersGrid;
