import { useLayoutEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EventsSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const timeRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center",
                    toggleActions: "play none none reverse"
                }
            });

            tl.from(cardRef.current, {
                x: -100,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            })
            .from(timeRef.current, {
                x: 100,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8");
            
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="events" className="bg-genMain py-24 px-4 border-b border-black/5">
             <div className="max-w-[1800px] mx-auto">
                <div className="flex items-end justify-between mb-16">
                     <h2 className="text-8xl font-bold tracking-tighter mix-blend-difference text-black/5">EVENTS</h2>
                     <div className="text-right">
                         <h3 className="text-2xl font-bold">Upcoming_Connect</h3>
                         <p className="font-mono text-black/40">Don't miss the vibe.</p>
                     </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     {/* Main Event Card */}
                     <div ref={cardRef} className="bg-black text-white p-12 rounded-[3rem] relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-8">
                            <ArrowIcon className="w-12 h-12 group-hover:rotate-45 transition-transform duration-500" />
                         </div>
                         
                         <div className="space-y-8 relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <span className="inline-block px-4 py-2 border border-white/20 rounded-full text-xs font-mono mb-6">
                                    EXCLUSIVE_MEETUP
                                </span>
                                <h3 className="text-5xl font-bold leading-tight mb-4">
                                    Friends of Design<br/>
                                    <span className="text-genGreen">Monthly Connect</span>
                                </h3>
                                <p className="text-white/60 max-w-md text-lg">
                                    This is not just another meetup – it’s a power-packed session designed for GenZ professionals.
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-8">
                                <div>
                                    <p className="text-xs text-genGreen font-mono uppercase mb-1">DATE</p>
                                    <p className="text-3xl font-bold">20 JAN</p>
                                </div>
                                <div>
                                    <p className="text-xs text-genGreen font-mono uppercase mb-1">TIME</p>
                                    <p className="text-3xl font-bold">10:00 AM</p>
                                </div>
                                <div>
                                    <p className="text-xs text-genGreen font-mono uppercase mb-1">LOCATION</p>
                                    <p className="text-xl font-bold leading-tight">GenLab IB Office<br/>Nagercoil</p>
                                </div>
                            </div>
                         </div>
                         
                         {/* Abstract BG */}
                         <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-genGreen/20 blur-[100px] rounded-full pointer-events-none" />
                     </div>

                     {/* Countdown / Secondary */}
                     <div ref={timeRef} className="space-y-8">
                         <div className="bg-white border border-black/5 p-12 rounded-[3rem] h-full flex flex-col items-center justify-center text-center shadow-sm">
                             <p className="font-mono text-sm uppercase tracking-widest text-black/40 mb-8">Event Starts In</p>
                             <div className="flex gap-4 md:gap-12 text-black">
                                 <div>
                                     <span className="text-6xl md:text-8xl font-bold tracking-tighter">12</span>
                                     <p className="text-xs font-mono mt-2">HOURS</p>
                                 </div>
                                 <span className="text-6xl md:text-8xl font-bold text-black/10">:</span>
                                 <div>
                                     <span className="text-6xl md:text-8xl font-bold tracking-tighter">57</span>
                                     <p className="text-xs font-mono mt-2">MINUTES</p>
                                 </div>
                                 <span className="text-6xl md:text-8xl font-bold text-black/10">:</span>
                                  <div>
                                     <span className="text-6xl md:text-8xl font-bold tracking-tighter">41</span>
                                     <p className="text-xs font-mono mt-2">SECONDS</p>
                                 </div>
                             </div>
                             <button className="mt-12 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-genGreen hover:text-black transition-colors w-full md:w-auto">
                                 RESERVE YOUR SEAT NOW
                             </button>
                         </div>
                     </div>
                </div>
             </div>
        </section>
    );
};

const ArrowIcon = ({ className }: { className?: string }) => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default EventsSection;
