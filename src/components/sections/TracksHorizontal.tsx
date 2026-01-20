import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TracksHorizontal = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {});
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            ctx = gsap.context(() => {
                const width = sectionRef.current?.offsetWidth || 0;
                const amountToScroll = width - window.innerWidth;

                gsap.to(sectionRef.current, {
                    x: -amountToScroll,
                    ease: "none",
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top top",
                        end: "+=3000",
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });

                // Scale effect for cards
                const cards = gsap.utils.toArray('.track-card') as HTMLElement[];
                cards.forEach((card) => {
                    gsap.to(card, {
                        scale: 1.05,
                        duration: 0.5,
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: gsap.getById("horizontal-scroll"), // Link to horiz scroll if using IDs
                            start: "left center",
                            toggleActions: "play reverse play reverse",
                        }
                    })
                });
            }, triggerRef);
        });

        return () => {
             ctx.revert();
             mm.revert();
        }
    }, []);

    const tracks = [
        {
            title: "Design Foundation",
            desc: "Unlearn the fluff. Relearn what matters.",
            colors: "bg-black text-white",
            img: "https://bootflow.academy/wp-content/uploads/2022/07/UI-UX-Design.jpeg"
        },
        {
            title: "UI/UX Mastery",
            desc: "Design real, for real. Master empathy.",
            colors: "bg-black text-white",
            img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Product Management",
            desc: "Lead the product vision from 0 to 1.",
            colors: "bg-black text-white",
            img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Internship @GenLab",
            desc: "Bring your learning to life with live projects.",
            colors: "bg-black text-white",
            img: "https://plus.unsplash.com/premium_photo-1661775756810-82dbd209fc95?q=80&w=800&auto=format&fit=crop"
        }
    ];



    return (
        <section ref={triggerRef} className="overflow-hidden">
             {/* Desktop Horizontal Scroll */}
             <div ref={sectionRef} className="hidden md:flex h-screen items-center p-24 w-[400vw] bg-genMain will-change-transform">
                 
                 <div className="w-[80vw] shrink-0 px-12">
                     <h2 className="text-[12vw] font-bold tracking-tighter leading-none">
                         CHOOSE <br/>
                         YOUR <span className="text-genGreen">PATH</span>
                     </h2>
                     <p className="text-2xl mt-8 max-w-xl">
                         Master what the industry requires in just 6 months.
                     </p>
                 </div>

                 {tracks.map((track, i) => (
                     <div key={i} className={`track-card w-[70vw] h-[70vh] shrink-0 mx-12 rounded-[3rem] overflow-hidden relative group transition-all duration-500 ${track.colors}`}>
                         <div className="absolute inset-0">
                             <img src={track.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         </div>
                         <div className="relative z-10 p-16 h-full flex flex-col justify-end">
                             <h3 className="text-6xl font-bold mb-4">{track.title}</h3>
                             <p className="text-2xl opacity-80">{track.desc}</p>
                             <button className="mt-8 px-8 py-3 bg-white text-black rounded-full w-fit font-bold hover:bg-genGreen transition-colors">
                                 View Curriculum
                             </button>
                         </div>
                     </div>
                 ))}
             </div>

             {/* Mobile Vertical View */}
             <MobileView tracks={tracks} />
        </section>
    );
};

const MobileView = ({ tracks }: { tracks: any[] }) => (
    <div className="md:hidden py-12 px-4 bg-genMain">
        <div className="mb-12">
             <h2 className="text-6xl font-bold tracking-tighter leading-none mb-4">
                 CHOOSE <br/>
                 YOUR <span className="text-genGreen">PATH</span>
             </h2>
             <p className="text-lg opacity-60">
                 Master what the industry requires in just 6 months.
             </p>
        </div>
        
        <div className="space-y-8">
            {tracks.map((track, i) => (
                <div key={i} className={`w-full rounded-[2rem] overflow-hidden ${track.colors}`}>
                     <div className="h-64 relative">
                         <img src={track.img} className="w-full h-full object-cover" />
                     </div>
                     <div className="p-8">
                         <h3 className="text-3xl font-bold mb-2">{track.title}</h3>
                         <p className="opacity-80 mb-6">{track.desc}</p>
                         <button className="px-6 py-2 bg-white text-black rounded-full font-bold text-sm w-full">
                             View Curriculum
                         </button>
                     </div>
                </div>
            ))}
        </div>
    </div>
);

export default TracksHorizontal;
