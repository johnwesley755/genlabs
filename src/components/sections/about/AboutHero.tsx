import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutPageContent } from '../../../data/content';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutHero = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "+=3000", // Length of scroll
                    scrub: 1,
                    pin: true,
                }
            });

            // Horizontal Scroll
            tl.to(sectionRef.current, {
                x: "-200vw", // Move 2 sections left
                ease: "none",
            });

            // Blob Animation
             gsap.to(".hero-blob", {
                x: "random(-50, 50)",
                y: "random(-30, 30)",
                scale: "random(0.9, 1.1)",
                duration: "random(5, 10)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

        }, triggerRef);
        return () => ctx.revert();
    }, []);

    const { hero } = aboutPageContent;
    const titleWords = hero.title.split(" ");

    return (
        <section ref={triggerRef} className="overflow-hidden relative">
            <div ref={sectionRef} className="flex w-[300vw] h-screen relative will-change-transform">
                
                {/* --- PANEL 1: INTRO (White Theme) --- */}
                <div className="w-screen h-full flex flex-col justify-center px-4 md:px-20 bg-white text-black relative overflow-hidden">
                     
                     {/* Animated Background Blobs (Adjusted for Light Mode) */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="hero-blob absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-genGreen/30 rounded-full blur-[120px] mix-blend-multiply opacity-50" />
                        <div className="hero-blob absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-500/20 rounded-full blur-[150px] mix-blend-multiply opacity-40" />
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay" />
                    </div>

                    <div className="relative z-10 max-w-5xl">
                         <span className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-black/10 bg-black/5 backdrop-blur-md text-xs font-mono text-black uppercase tracking-widest mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-genGreen animate-pulse" />
                            /// 01_THE_VISION
                        </span>
                        
                        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-12 leading-[0.9]">
                            {titleWords.map((word, i) => (
                                <span key={i} className="inline-block mr-[0.2em] relative">
                                    {word}
                                    {/* Underline for emphasis */}
                                    {i === 1 && <div className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-1 md:h-2 bg-genGreen/50 skew-x-12" />}
                                </span>
                            ))}
                        </h1>
                        
                        <p className="text-xl md:text-3xl leading-relaxed text-black/70 font-light max-w-3xl border-l-2 border-black/20 pl-8">
                            "Every meaningful journey begins with a simple question."
                        </p>

                        <div className="mt-20 flex items-center gap-4 text-black/40 font-mono text-xs uppercase animate-pulse">
                            Scroll to explore <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                    </div>
                </div>

                {/* --- PANEL 2: MISSION (Black Theme) --- */}
                <div className="w-screen h-full flex items-center bg-black text-white px-4 md:px-20 relative overflow-hidden border-l border-white/10">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay" />
                    <div className="hero-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-genGreen/10 rounded-full blur-[100px]" />
                    
                    <div className="relative z-10 max-w-5xl">
                        <span className="text-genGreen font-mono text-sm tracking-widest uppercase mb-6 block">
                            /// 02_THE_MISSION
                        </span>
                        <p className="text-4xl md:text-7xl font-bold leading-[1.1] mb-8">
                            To unite <span className="text-transparent bg-clip-text bg-gradient-to-r from-genGreen to-emerald-400">1% of India's GenZ</span> and create <span className="underline decoration-genGreen/30 underline-offset-8">1,000+ jobs</span> every year.
                        </p>
                        <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
                            We are bridging the gap between ambition and reality for the next generation of builders, creators, and innovators.
                        </p>
                    </div>
                </div>

                {/* --- PANEL 3: IMPACT (White Theme) --- */}
                <div className="w-screen h-full flex flex-col justify-center items-center text-center px-4 bg-white text-black relative">
                     <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />
                     
                     <div className="relative z-10">
                        <span className="inline-block px-4 py-1 rounded-full bg-black text-white text-xs font-mono tracking-widest uppercase mb-8">
                                /// 03_THE_IMPACT
                        </span>
                        <h2 className="text-7xl md:text-9xl font-bold tracking-tighter mb-6 relative">
                            Redefining <br/> 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-black to-black/50">Reality</span>
                            <Sparkles className="absolute -top-8 -right-12 w-16 h-16 text-genGreen animate-spin-slow" />
                        </h2>
                        <p className="text-xl md:text-2xl text-black/60 mb-12 max-w-2xl mx-auto font-medium">
                            From skill-building to career acceleration, we empower you to level up with AI and emerging tech.
                        </p>
                        <button className="group relative px-8 py-4 bg-black text-white rounded-full font-mono uppercase overflow-hidden transition-all hover:scale-105 active:scale-95">
                            <span className="relative z-10 flex items-center gap-2">Join The Movement <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/></span>
                            <div className="absolute inset-0 bg-genGreen transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out -z-0" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 bg-genGreen" />
                        </button>
                     </div>
                </div>

            </div>
        </section>
    );
};

export default AboutHero;
