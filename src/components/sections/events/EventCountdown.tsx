import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventsPageContent } from '../../../data/content';
import { Sparkles, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EventCountdown = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = +new Date(eventsPageContent.upcoming.timerTarget) - +new Date();
        let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    }

    useEffect(() => {
        const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearTimeout(timer);
    });

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Background Effect
            gsap.fromTo(bgRef.current, 
                { y: "-20%" },
                {
                    y: "20%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0
                    }
                }
            );

            // Card Reveal Scale
            gsap.fromTo(cardRef.current,
                { scale: 0.9, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        end: "center center",
                        scrub: 0.5
                    }
                }
            );

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const timeUnits = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
    ];

    return (
        <section ref={containerRef} className="py-24 px-4 overflow-hidden perspective-1000">
            <div 
                ref={cardRef} 
                className="group relative max-w-[90vw] mx-auto rounded-[3rem] overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.01] will-change-transform"
            >
                {/* --- Dynamic Background --- */}
                <div ref={bgRef} className="absolute inset-0 scale-125 pointer-events-none will-change-transform">
                     <img 
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2600&auto=format&fit=crop" 
                        alt="Event Background" 
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-black/80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
                </div>
                
                {/* --- Content --- */}
                <div className="relative z-10 px-8 py-20 md:p-32 text-center flex flex-col items-center transform will-change-transform">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-12 hover:bg-white/10 transition-colors">
                        <span className="w-2 h-2 rounded-full bg-genGreen notify-pulse" />
                        <span className="text-sm font-mono text-genGreen uppercase tracking-widest">
                            /// NEXT_EXPERIENCE
                        </span>
                    </div>

                    <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-white mb-12 relative inline-block leading-[0.9]">
                        {eventsPageContent.upcoming.topic || "Friends of Design"}
                        <Sparkles className="absolute -top-8 -right-12 text-genGreen w-16 h-16 animate-spin-slow opacity-80" />
                    </h2>
                    
                    <p className="max-w-2xl mx-auto text-xl md:text-2xl text-white/60 mb-20 font-light leading-relaxed">
                        Join the most innovative minds in the community. Secure your spot before the timer hits zero.
                    </p>

                    {/* Timer Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-16 w-full max-w-5xl mb-20">
                        {timeUnits.map((unit, index) => (
                            <div key={index} className="flex flex-col items-center p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-md transition-transform hover:-translate-y-2 duration-300">
                                <span className="text-5xl md:text-8xl font-black font-mono tracking-tighter text-white tabular-nums">
                                    {String(unit.value).padStart(2, '0')}
                                </span>
                                <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-genGreen mt-4">
                                    {unit.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <button className="group/btn relative px-12 py-6 bg-white text-black rounded-full font-mono text-lg uppercase overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                        <span className="relative z-10 flex items-center gap-3 font-bold group-hover/btn:text-black transition-colors">
                            Reserve_Seat <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform duration-300"/>
                        </span>
                        <div className="absolute inset-0 bg-genGreen transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-300 ease-out -z-0" />
                    </button>

                </div>
            </div>
        </section>
    );
};

export default EventCountdown;
