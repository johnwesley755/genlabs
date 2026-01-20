import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolio } from '../../data/content';

gsap.registerPlugin(ScrollTrigger);

const FeaturedWork = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const track = trackRef.current;
      
      if (!container || !track) return;

    const cards = gsap.utils.toArray('.work-card') as HTMLElement[];
      
      const getTotalWidth = () => {
          return track.scrollWidth - window.innerWidth;
      };

      const scrollTween = gsap.to(track, {
        x: () => `-${getTotalWidth()}px`,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getTotalWidth()}`,
          invalidateOnRefresh: true, // Handle resize
        }
      });

      // Card scaling effect when in center
      cards.forEach((card) => {
        gsap.to(card, {
          scale: 1.05,
          filter: "brightness(1.2)",
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: "center center", 
            end: "center center", 
            toggleActions: "play reverse play reverse",
            scrub: true,
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-genMain relative overflow-hidden">
      <div className="h-screen flex items-center">
        <h2 className="absolute top-10 left-10 text-9xl font-bold text-black/5 z-0 pointer-events-none">SELECTED_WORK</h2>
        <div ref={trackRef} className="flex gap-[10vw] pl-[10vw] pr-[10vw]"> {/* Added pr-10vw for spacing at end */}
          {portfolio.slice(0, 4).map((project) => (
            <div 
              key={project.id} 
              className="work-card w-[80vw] h-[60vh] relative flex-shrink-0 bg-white rounded-3xl overflow-hidden group border border-black/5 shadow-2xl"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 p-12 w-full">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <span className="text-genGreen font-mono text-xl mb-2 block">{project.category}</span>
                    <h3 className="text-6xl font-bold text-white mb-4">{project.title}</h3>
                  </div>
                  <span className="text-8xl font-bold text-white/10 font-mono">{project.id}</span>
                </div>
                
                <p className="text-xl text-neutral-300 max-w-2xl mb-8">{project.description}</p>
                
                <div className="flex gap-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 border border-white/20 rounded-full text-sm text-neutral-400 font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
