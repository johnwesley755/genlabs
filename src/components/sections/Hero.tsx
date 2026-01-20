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
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
         <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
         >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-white-abstract-technology-network-196-large.mp4" type="video/mp4" />
         </video>
         <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]"></div>
      </div>

      <div ref={textRef} className="relative z-10 text-center flex flex-col items-center">
         <div className="mb-8 flex items-center gap-4">
             <span className="px-6 py-2 rounded-full border border-black/10 bg-white/50 backdrop-blur-md text-sm font-mono uppercase tracking-widest">
                 GenZ Community
             </span>
         </div>
         
         <h1 className="text-black text-[15vw] font-bold tracking-tighter leading-[0.8] mix-blend-hard-light select-none">
            GENLAB
         </h1>
         <p className="text-[2vw] font-mono tracking-widest mt-4 uppercase text-black/60">
             Connect • Create • Elevate
         </p>
      </div>

      {/* Floating Elements / Shapes - Use specific descriptions but Abstract visuals */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {/* Top Right - Mentor Card */}
          <div className="absolute top-[20%] right-[15%] w-64 p-6 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 rotate-12 hover:rotate-0 transition-transform duration-500">
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
          <div className="absolute bottom-[20%] left-[10%] w-72 h-80 bg-black rounded-3xl shadow-2xl -rotate-6 hover:rotate-0 transition-transform duration-500 overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
               <div className="absolute bottom-0 inset-x-0 p-6">
                   <span className="inline-block px-3 py-1 bg-genGreen text-black text-xs font-bold rounded-full mb-2 animate-pulse">LIVE</span>
                   <p className="text-white text-lg font-bold leading-tight">Masterclass: AI Design Systems</p>
               </div>
          </div>
      </div>
    </section>
  );
};

export default Hero;
