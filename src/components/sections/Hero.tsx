import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../ui/SplitText';
import { ArrowRight } from 'lucide-react';

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
      
      {/* Optimized Background - Cinematic Lighting */}
      <div className="absolute inset-0 z-0 bg-genMain pointer-events-none">
          {/* Top Spotlight */}
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[80%] rounded-full bg-genGreen/20 blur-[120px]" />
          {/* Bottom Accent */}
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[100px]" />
          {/* Noise Texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 brightness-100 contrast-150 mix-blend-overlay" />
      </div>

      <div ref={textRef} className="relative z-30 text-center flex flex-col items-center px-4 w-full max-w-[90vw]">
         <div className="mb-8 flex items-center gap-4 animate-fade-in-up delay-100">
             <span className="px-6 py-2 rounded-full border border-black/5 bg-white/40 backdrop-blur-lg text-sm font-mono uppercase tracking-[0.2em] shadow-sm">
                 GenZ Community
             </span>
         </div>
         
         <div className="relative">
             <SplitText className="text-black text-[15vw] md:text-[14vw] font-bold tracking-tighter leading-[0.8] mix-blend-hard-light select-none">
                GENLAB
             </SplitText>
             {/* Decorative Stroke Effect */}
             <h1 className="absolute inset-0 text-[15vw] md:text-[14vw] font-bold tracking-tighter leading-[0.8] text-transparent stroke-text select-none opacity-20 pointer-events-none">
                 GENLAB
             </h1>
         </div>
         
         <p className="text-xl md:text-2xl font-mono tracking-widest mt-12 uppercase text-black/60 animate-fade-in-up delay-300">
             Connect • Create • Elevate
         </p>

         <button className="mt-12 group relative px-8 py-4 bg-black text-white rounded-full font-mono uppercase tracking-widest overflow-hidden hover:scale-105 transition-transform duration-300 animate-fade-in-up delay-500">
             <span className="relative z-10 flex items-center gap-2">
                 Join_The_Waitlist <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </span>
             <div className="absolute inset-0 bg-genGreen translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
             <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                 Join_The_Waitlist <ArrowRight className="w-4 h-4" />
             </span>
         </button>
      </div>

      {/* Floating Elements - Glassmorphism UI Cards */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0 block">
          
          {/* Top Right - Mentor Card - HIDDEN ON MOBILE to show only 2 cards total */}
          <div className="hidden md:block absolute top-[15%] -right-[10%] scale-[0.6] md:top-[25%] md:right-[15%] md:scale-100 w-72 p-6 bg-white/60 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] border border-white/50 rotate-6 transition-transform duration-500 origin-center hover:rotate-0 hover:scale-110 animate-float z-10">
               <div className="flex gap-4 items-center mb-4">
                   <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden ring-2 ring-genGreen/50 p-0.5">
                       <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-full h-full object-cover rounded-full"/>
                   </div>
                   <div>
                       <p className="font-bold text-sm text-black">Sarah_Design</p>
                       <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-genGreen animate-pulse" />
                            <p className="text-[10px] text-black/60 font-mono uppercase">Online</p>
                       </div>
                   </div>
               </div>
               <p className="text-xs text-black/70 font-medium leading-relaxed">"The mentorship program completely changed my career trajectory. 🚀"</p>
          </div>

          {/* Bottom Left - Live Session */}
          <div className="absolute bottom-[8%] -left-[5%] scale-[0.6] md:bottom-[15%] md:left-[10%] md:scale-100 w-80 bg-black/90 text-white p-1 rounded-[2rem] shadow-2xl -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 origin-center animate-float-delayed z-20">
               <div className="relative h-48 rounded-[1.7rem] overflow-hidden mb-4">
                    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-red-500/90 backdrop-blur-sm rounded-full flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold tracking-wider">LIVE</span>
                    </div>
               </div>
               <div className="px-5 pb-6">
                   <p className="text-xs text-white/50 font-mono mb-2">UPCOMING_EVENT</p>
                   <p className="text-lg font-bold leading-tight mb-4">AI Design Systems: From Concept to Code</p>
                   <div className="flex -space-x-2">
                       {[1,2,3].map(i => (
                           <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-800" />
                       ))}
                       <div className="w-8 h-8 rounded-full border-2 border-black bg-genGreen flex items-center justify-center text-black text-[10px] font-bold">
                           +42
                       </div>
                   </div>
               </div>
          </div>

          {/* Bottom Right - New Card - Visible on Mobile */}
          <div className="absolute bottom-[10%] -right-[5%] scale-[0.6] md:bottom-[15%] md:right-[5%] md:scale-100 w-64 p-6 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 rotate-6 transition-transform duration-500 origin-center hover:rotate-0 hover:scale-110 animate-float z-10">
               <div className="mb-4 flex justify-between items-start">
                   <div>
                       <p className="text-[10px] font-mono uppercase text-black/50 mb-1">WEEKLY_GROWTH</p>
                       <p className="text-3xl font-bold text-black">+127%</p>
                   </div>
                   <div className="w-8 h-8 rounded-full bg-genGreen flex items-center justify-center">
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                           <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                           <polyline points="17 6 23 6 23 12"></polyline>
                       </svg>
                   </div>
               </div>
               <div className="h-16 flex items-end gap-1 mb-2">
                   {[40, 70, 45, 90, 60, 80, 100].map((h, i) => (
                       <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-black/10 rounded-sm hover:bg-genGreen transition-colors duration-300" />
                   ))}
               </div>
               <p className="text-xs text-black/60 font-medium">New creators joined this week</p>
          </div>
      </div>
    </section>
  );
};

export default Hero;
