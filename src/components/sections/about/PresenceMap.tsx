import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { aboutPageContent } from '../../../data/content';

gsap.registerPlugin(ScrollTrigger);

const PresenceMap = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        // Animation removed to ensure visibility
    }, []);

    const { presence } = aboutPageContent;

    interface PresenceLocation {
        city: string;
        address: string;
        mapLink: string;
        image: string;
        color: string;
    }

    return (
        // FIX 1: Changed pt-0 to py-16/py-24 for balanced top and bottom spacing
        <section ref={containerRef} className="py-16 md:py-24 lg:py-32 bg-white text-black">
            <div className="container mx-auto px-4 md:px-6">
                
                {/* FIX 2: Increased margin-bottom to separate header from cards clearly */}
                <div className="mb-12 md:mb-20 max-w-4xl">
                     <span className="block text-xl md:text-2xl font-medium text-black/60 mb-3 md:mb-4">
                        Where Innovation Thrives
                     </span>
                     <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
                        Our Presence
                     </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
                    {presence.map((loc: PresenceLocation, index: number) => (
                        <a 
                            key={index}
                            href={loc.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            // FIX 3: Adjusted height slightly for better aspect ratio on mobile vs desktop
                            className={`reveal-card group relative h-[450px] md:h-[550px] w-full rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 hover:shadow-3xl hover:-translate-y-2 block`}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
                                <img 
                                    src={loc.image} 
                                    alt={loc.city} 
                                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                />
                            </div>
                            
                            {/* Gradient Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                            
                            {/* Colored Glow on Hover */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-tr ${index === 0 ? 'from-purple-900 via-purple-900/20 to-transparent' : 'from-orange-900 via-orange-900/20 to-transparent'}`} />

                            {/* Arrow Icon */}
                            <div className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-110 shadow-lg z-10">
                                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col justify-end h-full pointer-events-none z-10">
                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tighter shadow-black drop-shadow-lg">
                                    {loc.city}
                                </h3>
                                <p className="text-base md:text-lg text-white/90 font-light max-w-md leading-relaxed border-l-2 border-white/30 pl-4 backdrop-blur-sm">
                                    {loc.address}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PresenceMap;