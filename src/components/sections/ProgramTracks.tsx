import { useLayoutEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProgramTracks = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Title Animation
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse"
                },
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power4.out"
            });

            // Cards Stagger
            const cards = gsap.utils.toArray('.track-card');
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top bottom-=50",
                },
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="tracks" className="bg-genMain py-24 px-4 border-b border-black/5">
             <div className="max-w-[1800px] mx-auto">
                 <div ref={titleRef} className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                     <div>
                         <h2 className="text-7xl font-bold tracking-tighter leading-[0.9] mb-6">
                             CHOOSE YOUR <br/>
                             <span className="text-genGreen">PATH</span>
                         </h2>
                         <p className="text-2xl font-light text-black/60 max-w-xl">
                             Master what the industry requires in just 6 months. Learn by doing, build with purpose.
                         </p>
                     </div>
                     <div className="flex gap-4 lg:justify-end">
                         {['Design', 'Product', 'Soft Skills'].map((tag) => (
                             <span key={tag} className="px-6 py-3 rounded-full border border-black/10 font-mono text-sm hover:bg-black hover:text-white transition-colors cursor-pointer">
                                 {tag}
                             </span>
                         ))}
                     </div>
                 </div>

                 <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     {/* Track 1 - Modern Green Chair (Abstract/Interior) */}
                     <TrackCard 
                        title="Design Foundation"
                        desc="Unlearn the fluff. Relearn what matters. Build a rock-solid foundation in design thinking."
                        tags={['Principles', 'History', 'Systems']}
                        image="https://images.unsplash.com/photo-1596162955779-9c897f2b704c?q=80&w=600&auto=format&fit=crop" 
                     />
                     {/* Track 2 - Meeting Room/Sunset */}
                     <TrackCard 
                        title="UI/UX Mastery"
                        desc="Design real, for real. Master empathy, solve user problems, and build interfaces that truly click."
                        tags={['Figma', 'Prototyping', 'User Research']}
                        image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop"
                     />
                     {/* Track 3 */}
                     <TrackCard 
                        title="Internship @GenLab"
                        desc="Bring your learning to life! Work on live projects with expert mentors and build your portfolio."
                        tags={['Live Projects', 'Mentorship', 'Career']}
                        image="https://plus.unsplash.com/premium_photo-1661775756810-82dbd209fc95?q=80&w=600&auto=format&fit=crop"
                        isHighlight
                     />
                 </div>

                 {/* Pricing Block */}
                 <div className="track-card mt-24 p-12 bg-black text-white rounded-[3rem] text-center relative overflow-hidden">
                     <div className="relative z-10">
                         <h3 className="text-4xl font-bold mb-4">Get the basics right</h3>
                         <div className="flex justify-center items-baseline gap-2 mb-8">
                             <span className="text-xl text-white/60">Starts at</span>
                             <span className="text-7xl font-bold text-genGreen">₹5,999</span>
                             <span className="text-xl text-white/60">per Month</span>
                         </div>
                         <button className="bg-white text-black px-12 py-4 rounded-full font-bold hover:bg-genGreen transition-colors">
                             GET STARTED
                         </button>
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-r from-genGreen/20 to-transparent opacity-20" />
                 </div>
             </div>
        </section>
    );
};

const TrackCard = ({ title, desc, tags, image, isHighlight = false }: any) => (
    <div className={`track-card p-8 rounded-3xl border ${isHighlight ? 'bg-genGreen border-genGreen' : 'bg-white border-black/10'} flex flex-col justify-between h-full min-h-[500px] group transition-all duration-300 hover:-translate-y-2`}>
        <div>
            <div className="h-48 rounded-2xl overflow-hidden mb-8 relative">
                <img src={image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                {isHighlight && (
                     <div className="absolute top-4 right-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                         Career Ready
                     </div>
                )}
            </div>
            <h3 className={`text-3xl font-bold mb-4 ${isHighlight ? 'text-black' : 'text-black'}`}>{title}</h3>
            <p className={`text-lg mb-8 ${isHighlight ? 'text-black/80' : 'text-black/60'}`}>{desc}</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
            {tags.map((tag: string) => (
                <span key={tag} className={`text-xs font-mono uppercase px-3 py-1 rounded-full border ${isHighlight ? 'border-black/20 text-black' : 'border-black/10 text-black/40'}`}>
                    {tag}
                </span>
            ))}
        </div>
    </div>
);

export default ProgramTracks;
