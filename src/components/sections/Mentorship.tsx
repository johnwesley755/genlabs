import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Mentorship = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            gsap.from(cardsRef.current?.children || [], {
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top bottom-=100",
                },
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-genMain py-24 px-4">
             <div className="max-w-7xl mx-auto">
                 <h2 ref={titleRef} className="text-center text-6xl font-bold tracking-tighter mb-20">
                     FIND YOUR PERFECT <br/>
                     <span className="text-genGreen">MENTORSHIP</span>
                 </h2>
                 
                 <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {/* One-to-One */}
                     <div className="bg-black text-white p-12 rounded-[3rem] hover:scale-[1.02] transition-transform duration-500">
                         <h3 className="text-3xl font-bold mb-2">Deep Dive</h3>
                         <h4 className="text-xl text-genGreen font-mono mb-8">One-to-One Mentorship</h4>
                         
                         <ul className="space-y-6 text-lg mb-12">
                             <li className="flex gap-4">
                                 <span className="text-genGreen">•</span>
                                 Work 1:1 with a mentor from global industry
                             </li>
                             <li className="flex gap-4">
                                 <span className="text-genGreen">•</span>
                                 Get a growth plan with real-world strategy
                             </li>
                             <li className="flex gap-4">
                                 <span className="text-genGreen">•</span>
                                 92% success in achieving career milestones
                             </li>
                         </ul>
                         
                         <button className="w-full py-4 border border-white/20 rounded-full font-bold hover:bg-white hover:text-black transition-colors">
                             GET STARTED
                         </button>
                     </div>

                     {/* Group */}
                     <div className="bg-white border border-black/10 p-12 rounded-[3rem] hover:scale-[1.02] transition-transform duration-500">
                         <h3 className="text-3xl font-bold mb-2">Learn & Grow</h3>
                         <h4 className="text-xl text-black/60 font-mono mb-8">Group Mentorship</h4>
                         
                         <ul className="space-y-6 text-lg mb-12 text-black/80">
                             <li className="flex gap-4">
                                 <span className="text-genGreen">•</span>
                                 Learn alongside 8 like-minded learners
                             </li>
                             <li className="flex gap-4">
                                 <span className="text-genGreen">•</span>
                                 73% success in achieving individual goals
                             </li>
                             <li className="flex gap-4">
                                 <span className="text-genGreen">•</span>
                                 64% network growth for career opportunities
                             </li>
                         </ul>
                         
                         <button className="w-full py-4 bg-black text-white rounded-full font-bold hover:bg-genGreen hover:text-black transition-colors">
                             GET STARTED
                         </button>
                     </div>
                 </div>
             </div>
        </section>
    );
};

export default Mentorship;
