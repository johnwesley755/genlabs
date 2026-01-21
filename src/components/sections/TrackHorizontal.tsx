import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { tracks as tracksData } from '../../data/content';

gsap.registerPlugin(ScrollTrigger);

const TrackHorizontal = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {});
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
             ctx = gsap.context(() => {
                const container = containerRef.current;
                const section = sectionRef.current;
                
                if (!container || !section) return;

                // Horizontal Scroll
                const totalWidth = container.scrollWidth;
                const sectionWidth = section.offsetWidth;
                const amountToScroll = totalWidth - sectionWidth + 100; // Extra buffer

                gsap.to(container, {
                    x: -amountToScroll,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "+=3000", // Drag length
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });

                // Internal Parallax for Cards
                const cards = gsap.utils.toArray('.track-card') as HTMLDivElement[];
                cards.forEach((card) => {
                    // Parallax the image inside
                    const img = card.querySelector('img');
                    if (img) {
                        gsap.fromTo(img, 
                            { x: -50 },
                            { 
                                x: 50,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: card,
                                    containerAnimation: gsap.getById("h-scroll"), // Optional if horizontal scroll uses ID
                                    start: "left right",
                                    end: "right left",
                                    scrub: true
                                }
                            }
                        );
                    }
                });

            }, sectionRef);
        });

        // Mobile Animations
        mm.add("(max-width: 767px)", () => {
             ctx = gsap.context(() => {
                const mobileCards = gsap.utils.toArray('.mobile-track-card');
                mobileCards.forEach((card: any) => {
                    gsap.from(card, {
                        y: 100,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    });
                });
             }, sectionRef);
        });

        return () => {
             ctx.revert();
             mm.revert();
        }
    }, []);

    // Explicitly define track interface to fix ANY type error
    interface Track {
        id: string;
        title: string;
        description: string;
        image: string;
    }

    const extendedTracks: Track[] = tracksData.map(t => ({
        ...t,
        description: t.description || "",
    }));

    return (
        <section ref={sectionRef} className="relative bg-genMain overflow-hidden" id="tracks">
             {/* Background Grid & Ambient Light providing depth */}
             <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
                 <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-genGreen/5 rounded-full blur-[120px] mix-blend-multiply" />
                 <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] mix-blend-multiply" />
             </div>

             {/* Mobile / Tablet Vertical Layout */}
             <div className="md:hidden py-24 px-4 relative z-10">
                 <div className="mb-12">
                     <span className="text-genGreen font-mono text-sm tracking-widest uppercase mb-4 block">/// LEARNING_PATHS</span>
                     <h2 className="text-5xl font-bold tracking-tighter leading-[0.9] text-black">
                         CHOOSE<br/>
                         YOUR <span className="text-genGreen">PATH</span>
                     </h2>
                 </div>
                 <div className="space-y-6">
                     {extendedTracks.map((track, i) => (
                         <div key={i} className="mobile-track-card bg-black text-white rounded-[2rem] p-8 relative overflow-hidden group min-h-[50vh] flex flex-col justify-end">
                             {/* Background Image with Overlay */}
                             <div className="absolute inset-0 z-0">
                                 <img 
                                    src={track.image} 
                                    alt={track.title} 
                                    className="w-full h-full object-cover opacity-50"
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20" />
                             </div>

                             <div className="relative z-10">
                                 <div className="flex justify-between items-start mb-4">
                                     <span className="text-genGreen font-mono text-xl block">0{i+1}</span>
                                     <span className="px-3 py-1 rounded-full border border-white/20 text-xs font-mono text-genGreen bg-black/40 backdrop-blur-md">
                                         6 MONTHS
                                     </span>
                                 </div>
                                 
                                 <h3 className="text-4xl font-bold mb-4 leading-none">{track.title}</h3>
                                 <p className="text-white/70 mb-8 max-w-sm text-sm leading-relaxed">{track.description}</p>
                                 <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-genGreen transition-colors bg-white/10 px-6 py-3 rounded-full w-fit backdrop-blur-sm border border-white/10">
                                     View Curriculum <ArrowUpRight className="w-4 h-4" />
                                 </button>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>

             {/* Desktop Horizontal Scroll Layout */}
             <div ref={containerRef} className="hidden md:flex h-screen items-center pl-40 pr-12 gap-12 w-fit will-change-transform">
                 
                 {/* Intro Card */}
                 <div className="w-[60vw] shrink-0 pr-12">
                     <span className="text-genGreen font-mono text-sm tracking-widest uppercase mb-6 block">/// LEARNING_PATHS</span>
                     <h2 className="text-[11.5vw] font-bold tracking-tighter leading-[0.85] text-black">
                         CHOOSE<br/>
                         YOUR <span className="text-genGreen">PATH</span>
                     </h2>
                     <p className="text-2xl mt-12 max-w-md text-black/60 font-light">
                         Master the skills that industry actually needs. Built by engineers, for engineers.
                     </p>
                 </div>

                 {/* Cards */}
                 {extendedTracks.map((track, i) => (
                     <div 
                        key={i} 
                        className="track-card w-[55vw] h-[75vh] shrink-0 bg-black text-white rounded-[3rem] p-12 flex flex-col justify-between relative overflow-hidden group hover:scale-[1.01] transition-transform duration-500 border border-white/5"
                     >
                         {/* Background Image with Overlay */}
                         <div className="absolute inset-0 z-0">
                             <img 
                                src={track.image} 
                                alt={track.title} 
                                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
                             />
                             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
                         </div>

                         {/* Large Background Number */}
                         <div className="absolute -top-12 -right-12 text-[15rem] font-bold text-white/10 font-mono select-none pointer-events-none leading-none z-0">
                             0{i+1}
                         </div>

                         {/* Content Top */}
                         <div className="relative z-10 w-full flex justify-between items-start">
                             <span className="px-4 py-1 rounded-full border border-white/20 text-sm font-mono text-genGreen bg-black/40 backdrop-blur-md">
                                 6 MONTHS
                             </span>
                             <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-genGreen group-hover:text-black group-hover:scale-110 transition-all cursor-pointer bg-black/20 backdrop-blur-sm">
                                 <ArrowUpRight className="w-6 h-6" />
                             </div>
                         </div>

                         {/* Content Bottom */}
                         <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                             <h3 className="text-6xl md:text-7xl font-bold mb-6 tracking-tighter max-w-2xl leading-[0.9] text-shadow-sm">
                                 {track.title}
                             </h3>
                             <p className="text-xl text-white/80 mb-10 max-w-xl font-light leading-relaxed">
                                 {track.description}
                             </p>
                             <div className="h-[1px] w-full bg-white/20 mb-8" />
                             <div className="flex gap-8">
                                 <span className="text-sm font-mono text-white/60 uppercase tracking-widest">Next Cohort: Feb 01</span>
                                 <span className="text-sm font-mono text-white/60 uppercase tracking-widest">Spots: Limited</span>
                             </div>
                         </div>
                     </div>
                 ))}

                 {/* End Spacer */}
                 <div className="w-[10vw] shrink-0" />
             </div>
        </section>
    );
};

export default TrackHorizontal;
