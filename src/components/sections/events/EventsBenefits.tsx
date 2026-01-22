import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Shield, Zap, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
    {
        title: "Exclusive Access",
        description: "Get early access to workshops, tools, and resources before anyone else.",
        icon: <Star className="w-8 h-8 text-black" />,
        color: "bg-[#B8FF21]" // genGreen
    },
    {
        title: "Mentorship",
        description: "Direct 1:1 sessions with industry leaders from top tech companies.",
        icon: <Users className="w-8 h-8 text-black" />,
        color: "bg-white"
    },
    {
        title: "Career Fast-Track",
        description: "Skip the queue. Our partners prioritize applications from community members.",
        icon: <Zap className="w-8 h-8 text-black" />,
        color: "bg-[#B8FF21]"
    },
    {
        title: "Certified Badges",
        description: "Earn verified credentials for your portfolio on every event completion.",
        icon: <Shield className="w-8 h-8 text-black" />,
        color: "bg-white"
    }
];

const EventsBenefits = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const revealRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            
            // Horizontal pinned scroll for benefits
            const sections = gsap.utils.toArray('.benefit-card');
            
            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (sections.length - 1),
                    end: "+=3000"
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 bg-black overflow-hidden flex flex-col justify-center h-screen relative">
            <div className="absolute top-12 left-8 md:top-24 md:left-24 z-10 mix-blend-difference text-white">
                <span className="font-mono text-sm tracking-widest uppercase mb-4 block">/// WHY_JOIN</span>
                <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
                    MEMBER <br/> PERKS
                </h2>
            </div>

            <div className="flex w-[400%] h-[70vh] items-center">
                {benefits.map((benefit, i) => (
                    <div key={i} className="benefit-card w-screen h-full flex items-center justify-center px-4 md:px-24">
                        <div className={`w-full max-w-4xl h-[60vh] ${benefit.color} rounded-[3rem] p-12 md:p-24 flex flex-col justify-between relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500`}>
                            
                            <div className="relative z-10">
                                <div className="w-20 h-20 rounded-full border border-black/10 flex items-center justify-center mb-8 bg-white/20 backdrop-blur-sm">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-5xl md:text-8xl font-bold tracking-tighter text-black mb-6 leading-[0.9]">
                                    {benefit.title}
                                </h3>
                            </div>
                            
                            <div className="relative z-10 max-w-xl">
                                <div className="h-[2px] w-full bg-black/10 mb-8" />
                                <p className="text-2xl md:text-3xl text-black/70 font-light leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>

                            {/* Decorative Big Number */}
                            <div className="absolute -bottom-10 -right-10 text-[20rem] font-bold text-black/5 leading-none select-none font-sans">
                                0{i+1}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default EventsBenefits;
