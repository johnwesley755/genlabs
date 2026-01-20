import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AdvantageSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

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

            gsap.from(".advantage-card", {
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top bottom-=100",
                },
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const features = [
        {
            title: "Essential Soft Skills",
            desc: "Master communication, public speaking, and teamwork to thrive in any professional setting.",
            img: "https://images.unsplash.com/photo-1544168190-79c17527004f?q=80&w=600&auto=format&fit=crop" // Woman speaking with microphone
        },
        {
            title: "Community at the Center",
            desc: "Connect with a vibrant network of learners, designers, and mentors to grow together.",
            img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=600&auto=format&fit=crop" // Group/Community
        },
        {
            title: "Learn by Doing",
            desc: "Work on real-world challenges, collaborate with experts, and gain hands-on experience.",
            img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop" // Collaboration
        },
        {
            title: "Career Opportunities",
            desc: "Unlock job and internship placements with top companies through our strong network.",
            img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" // Professional
        }
    ];

    return (
        <section ref={sectionRef} className="py-24 px-4 bg-white border-b border-black/5">
            <div className="max-w-7xl mx-auto">
                <div ref={titleRef} className="mb-20 text-center">
                    <p className="font-mono text-genGreen uppercase tracking-widest mb-4">Designed for Your Growth</p>
                    <h2 className="text-6xl font-bold tracking-tighter">
                        THE GENLAB IB <br/>
                        <span className="text-black/20">ADVANTAGE</span>
                    </h2>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((item, i) => (
                        <div key={i} className="advantage-card group cursor-pointer">
                            <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-6 relative">
                                <img 
                                    src={item.img} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-black/60 leading-relaxed text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AdvantageSection;
