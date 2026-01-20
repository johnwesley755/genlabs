import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const text = textRef.current;
      const shapes = shapesRef.current;

      if (!container || !text || !shapes) return;

      // Mouse Move Parallax
      const xSetText = gsap.quickTo(text, "x", { duration: 0.5, ease: "power3" });
      const ySetText = gsap.quickTo(text, "y", { duration: 0.5, ease: "power3" });
      
      const xSetShapes = gsap.quickTo(shapes, "x", { duration: 0.5, ease: "power3" });
      const ySetShapes = gsap.quickTo(shapes, "y", { duration: 0.5, ease: "power3" });

      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        xSetText(-20 * x); // Text moves away
        ySetText(-20 * y);

        xSetShapes(50 * x); // Shapes move towards
        ySetShapes(50 * y);
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Scroll Animation - Text Sinks, Shapes Explode
      gsap.to(text, {
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 200,
        opacity: 0,
        scale: 0.8
      });

      gsap.to(shapes.children, {
          scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "bottom top",
              scrub: true,
          },
          scale: 1.5,
          x: (i) => (i - 1) * 300, // Explode outwards
          opacity: 0,
          stagger: 0.1
      });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-genMain">
      
      {/* Optimized Background - Static Gradient + Noise (No heavy animations) */}
      <div className="absolute inset-0 z-0 bg-genMain pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_#BCF00020_0%,_transparent_70%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,_#3B82F610_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
      </div>

      <div ref={textRef} className="relative z-30 text-center flex flex-col items-center px-4">
         <div className="mb-6 md:mb-8 flex items-center gap-4">
             <span className="px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-black/10 bg-white/50 backdrop-blur-md text-xs md:text-sm font-mono uppercase tracking-widest">
                 GenZ Community
             </span>
         </div>
         
         <h1 className="text-black text-[18vw] md:text-[15vw] font-bold tracking-tighter leading-[0.8] mix-blend-hard-light select-none">
            GENLAB IB
         </h1>
         <p className="text-[4vw] md:text-[2vw] font-mono tracking-widest mt-4 md:mt-8 uppercase text-black/60">
             Connect • Create • Elevate
         </p>
      </div>

      {/* Floating Elements - Visible on Mobile (Scaled) & Desktop */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0 block">
          
          {/* Simplified Blobs (No Blur/Mix-Blend) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
             <div className="absolute top-0 left-1/4 w-96 h-96 bg-genGreen/10 rounded-full" />
             <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full" />
          </div>

          {/* Top Right - Mentor Card */}
          {/* Mobile: Top-Right Edge | Desktop: Standard Position */}
          <div className="absolute top-[10%] -right-[15%] scale-[0.6] md:top-[20%] md:right-[15%] md:scale-100 w-64 p-6 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 rotate-12 transition-transform duration-500 origin-center">
               <div className="flex gap-4 items-center mb-4">
                   <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden ring-2 ring-genGreen">
                       <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-full h-full object-cover"/>
                   </div>
                   <div>
                       <p className="font-bold text-sm text-black">Sarah_Design</p>
                       <p className="text-xs text-genGreen font-mono uppercase">● Active Now</p>
                   </div>
               </div>
               <p className="text-xs text-black/60 font-medium leading-relaxed">"Just joined the UX Mastery track! The modules are insane. 🔥"</p>
          </div>

          {/* Bottom Left - Live Session */}
          {/* Mobile: Bottom-Left Edge | Desktop: Standard Position */}
          <div className="absolute bottom-[2%] -left-[10%] scale-[0.6] md:bottom-[20%] md:left-[10%] md:scale-100 w-72 h-80 bg-black rounded-3xl shadow-2xl -rotate-6 overflow-hidden transition-transform duration-500 origin-center">
               <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
               <div className="absolute bottom-0 inset-x-0 p-6">
                   <span className="inline-block px-3 py-1 bg-genGreen text-black text-xs font-bold rounded-full mb-2">LIVE</span>
                   <p className="text-white text-lg font-bold leading-tight">Masterclass: AI Design Systems</p>
               </div>
          </div>
      </div>
    </section>
  );
};

export default Hero;
