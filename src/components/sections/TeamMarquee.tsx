import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

const TeamMarquee = () => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const firstTrackRef = useRef<HTMLDivElement>(null);
    const secondTrackRef = useRef<HTMLDivElement>(null);
    
    // Using GSAP for seamless marquee
    useLayoutEffect(() => {
        let xPercent = 0;
        let direction = -1; // Move left
        const speed = 0.05;

        const animate = () => {
            if(xPercent <= -100){
                xPercent = 0;
            }
            if(xPercent > 0){
                xPercent = -100;
            }
            
            if (firstTrackRef.current && secondTrackRef.current) {
                gsap.set(firstTrackRef.current, { xPercent: xPercent });
                gsap.set(secondTrackRef.current, { xPercent: xPercent });
            }
            
            xPercent += speed * direction;
            requestAnimationFrame(animate);
        }

        const animId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animId);
        }
    }, []);

    return (
        <section className="py-32 bg-genMain overflow-hidden whitespace-nowrap border-y border-black/5 flex flex-col justify-center">
            
            <div className="mb-12 px-8">
                <h3 className="font-mono text-sm tracking-widest text-black/40 uppercase">Global_Partners_Network</h3>
            </div>

            <div className="flex w-full overflow-hidden">
                <div className="flex flex-nowrap min-w-full" ref={firstTrackRef}>
                    <div className="flex gap-20 items-center px-10 flex-shrink-0">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <MarqueeItem key={`t1-${i}`} index={i} />
                        ))}
                    </div>
                </div>
                
                <div className="flex flex-nowrap min-w-full" ref={secondTrackRef}>
                    <div className="flex gap-20 items-center px-10 flex-shrink-0">
                        {Array.from({ length: 8 }).map((_, i) => (
                        <MarqueeItem key={`t2-${i}`} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const MarqueeItem = ({ index }: { index: number }) => (
    <div className="flex items-center gap-6 group cursor-pointer">
        <div className="relative overflow-hidden rounded-full w-24 h-24 border border-black/10 group-hover:scale-110 transition-transform duration-500">
            <img 
                src={`https://randomuser.me/api/portraits/men/${index + 30}.jpg`} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                alt="Partner" 
            />
        </div>
        <div>
            <span className="text-5xl font-bold tracking-tighter text-black/80 group-hover:text-genGreen transition-colors duration-300">
                GENLAB_IB_CONNECT
            </span>
            <p className="font-mono text-xs text-black/40 mt-1">YOUR_SPACE_TO_GROW</p>
        </div>
    </div>
);

export default TeamMarquee;
