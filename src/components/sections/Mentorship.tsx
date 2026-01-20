import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Mentorship = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.mentor-card');
            
            // Stacking Effect
            gsap.to(cards, {
                y: 0,
                rotate: 0,
                opacity: 1,
                stagger: 0.5,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                }
            });

        }, triggerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={triggerRef} className="bg-genMain relative overflow-hidden">
             <div className="min-h-[200vh] relative">
                 <div className="sticky top-0 h-screen flex flex-col items-center justify-center p-8 overflow-hidden">
                     <h2 className="text-center text-[10vw] font-bold tracking-tighter mb-12 leading-none">
                         FIND YOUR <br/>
                         <span className="text-genGreen">MENTORSHIP</span>
                     </h2>
                     
                     <div ref={containerRef} className="relative w-full max-w-4xl h-[60vh]">
                         {/* Card 1 */}
                         <div className="mentor-card absolute inset-0 bg-black text-white p-12 rounded-[3rem] origin-bottom transform translate-y-[20%] rotate-6 opacity-0 shadow-2xl border border-white/10 z-10 flex flex-col justify-between">
                             <div>
                                <h3 className="text-5xl font-bold mb-4">Deep Dive</h3>
                                <h4 className="text-2xl text-genGreen font-mono">1:1 Mentorship</h4>
                             </div>
                             <ul className="text-xl space-y-4">
                                 <li>• 1:1 Industry Guidance</li>
                                 <li>• Real-world Growth Plan</li>
                                 <li>• 92% Success Rate</li>
                             </ul>
                             <button className="w-full py-4 bg-white text-black font-bold rounded-full hover:bg-genGreen transition-colors">START NOW</button>
                         </div>

                         {/* Card 2 */}
                         <div className="mentor-card absolute inset-0 bg-[#F5F5F5] text-black p-12 rounded-[3rem] origin-bottom transform translate-y-[100%] transition-transform -rotate-6 opacity-0 shadow-2xl border border-black/10 z-20 flex flex-col justify-between">
                             <div>
                                <h3 className="text-5xl font-bold mb-4">Group Grow</h3>
                                <h4 className="text-2xl text-genGreen font-mono">Cohort Mentorship</h4>
                             </div>
                             <ul className="text-xl space-y-4">
                                 <li>• Network with Peers</li>
                                 <li>• Collaborative Learning</li>
                                 <li>• 88% Network Growth</li>
                             </ul>
                             <button className="w-full py-4 bg-black text-white font-bold rounded-full hover:bg-genGreen hover:text-black transition-colors">JOIN COHORT</button>
                         </div>
                     </div>
                 </div>
             </div>
        </section>
    );
};

export default Mentorship;
