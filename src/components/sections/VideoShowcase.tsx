import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoShowcase = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(videoRef.current, 
                { scale: 0.8, borderRadius: "2rem" },
                {
                    scale: 1,
                    borderRadius: "0rem",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "top top",
                        scrub: 1,
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="h-screen bg-black relative overflow-hidden flex items-center justify-center">
            <div ref={videoRef} className="w-full h-full relative overflow-hidden">
                 <div className="absolute top-10 left-10 z-20 mix-blend-difference">
                     <h3 className="text-white text-xl font-mono tracking-widest">
                         FUTURE_SIGHT
                     </h3>
                     <p className="text-genGreen text-xs mt-2">EST. 2024</p>
                 </div>

                 <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover"
                 >
                    <source src="/video.mp4" type="video/mp4" />
                 </video>
                 <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
            </div>
        </section>
    );
};

export default VideoShowcase;