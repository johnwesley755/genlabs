import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../ui/SplitText';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Grid
            const images = imagesRef.current?.querySelectorAll('img');
            if(images) {
                gsap.from(images, {
                    scrollTrigger: {
                        trigger: imagesRef.current,
                        start: "top bottom-=100",
                        scrub: 1,
                    },
                    y: 100,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 1
                })
            }
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="about" className="py-24 px-8 bg-genMain relative overflow-hidden">
            <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 relative z-10 items-center">
                <div className="space-y-8 md:space-y-12">
                     <div className="overflow-hidden">
                        <SplitText className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.85] text-black">
                            WE ARE
                        </SplitText>
                        <br/>
                        <SplitText className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.85] text-genGreen" delay={0.2}>
                            GENZ COMMUNITY
                        </SplitText>
                     </div>

                     <p className="text-lg md:text-2xl font-light leading-relaxed max-w-xl text-black/80">
                         A vibe space for designers, creators, and tech enthusiasts to connect, and level up! Meet your tribe, grow your network, and stay ahead in a world that never hits pause.
                     </p>
                     
                     <div className="grid grid-cols-2 gap-8 pt-8 border-t border-black/10">
                         <div>
                             <h4 className="font-mono text-xs md:text-sm text-black/50 mb-2">CHANGEMAKERS</h4>
                             <p className="text-3xl md:text-5xl font-bold tabular-nums">7,000+</p>
                         </div>
                         <div>
                             <h4 className="font-mono text-xs md:text-sm text-black/50 mb-2">GLOBAL MENTORS</h4>
                             <p className="text-3xl md:text-5xl font-bold tabular-nums">100+</p>
                         </div>
                     </div>
                </div>
                
                <div ref={imagesRef} className="grid grid-cols-2 gap-4 h-[80vh]">
                    <div className="space-y-4 pt-24 self-start">
                        <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop" className="w-full h-80 object-cover rounded-[2rem] hover:scale-95 transition-transform duration-700" />
                        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop" className="w-full h-64 object-cover rounded-[2rem] hover:scale-95 transition-transform duration-700" />
                    </div>
                    <div className="space-y-4 self-end">
                        <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop" className="w-full h-64 object-cover rounded-[2rem] hover:scale-95 transition-transform duration-700" />
                        <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop" className="w-full h-96 object-cover rounded-[2rem] hover:scale-95 transition-transform duration-700" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
