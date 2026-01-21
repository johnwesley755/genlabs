import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { stackingCards } from '../../data/content';

gsap.registerPlugin(ScrollTrigger);

interface Card {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  color: string;
  num: string;
}

const StackingCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card || index === cardsRef.current.length - 1) return;

        const nextCard = cardsRef.current[index + 1];

        gsap.to(card, {
          scale: 0.95,
          opacity: 0.5,
          filter: "blur(10px)",
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top bottom", 
            end: "top top", 
            scrub: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-genMain px-4 py-24 md:px-8">
      
      {/* Section Header */}
      <div className="mb-24 md:mb-32 max-w-7xl mx-auto pl-4">
        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.8]">
             The <br className="hidden md:block"/> <span className="text-genGreen">Blueprint</span>
            </h2>
            <p className="max-w-md text-lg md:text-xl text-black/60 font-mono mb-2">
              {stackingCards.subtitle}
            </p>
        </div>
      </div>

      <div className="relative flex flex-col items-center gap-8 md:gap-12 pb-24">
        {stackingCards.cards.map((card: Card, index: number) => (
          <div
            key={card.id}
            ref={(el) => { cardsRef.current[index] = el/*; */}}
            className={`sticky top-24 md:top-32 w-full max-w-[95vw] h-[85vh] md:h-[80vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-black/5 origin-top transition-all duration-500 ${card.color}`}
          >
            <div className="grid md:grid-cols-2 h-full">
                
                {/* Content Side */}
                <div className={`p-6 md:p-16 flex flex-col justify-between h-full order-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'} overflow-y-auto`}>
                    <div>
                        <div className="flex justify-between items-center mb-6 md:mb-8">
                             <span className="text-xl font-mono opacity-60">Phase {card.num}</span>
                             <div className="p-3 rounded-full border border-current opacity-30">
                                <ArrowUpRight className="w-6 h-6" />
                             </div>
                        </div>
                        <h3 className="text-3xl md:text-6xl font-bold tracking-tighter mb-4 md:mb-6">{card.title}</h3>
                        <p className="text-base md:text-2xl opacity-80 leading-relaxed">{card.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 md:gap-3 mt-6 md:mt-0">
                        {card.tags.map(tag => (
                            <span key={tag} className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-current opacity-60 text-xs md:text-sm font-mono uppercase tracking-wider">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Image Side */}
                <div className={`relative h-[25vh] md:h-full order-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                    <img 
                        src={card.image} 
                        alt={card.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StackingCards;
