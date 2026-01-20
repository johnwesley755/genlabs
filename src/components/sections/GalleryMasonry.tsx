import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531297461136-82bf9cd753ea?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
];

const GalleryMasonry = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
       const items = gsap.utils.toArray('.gallery-item') as HTMLElement[];
       
       items.forEach((item, i) => {
           gsap.fromTo(item, 
               { y: 100, opacity: 0 },
               {
                   y: 0,
                   opacity: 1,
                   duration: 1,
                   scrollTrigger: {
                       trigger: item,
                       start: "top bottom-=100",
                       toggleActions: "play none none reverse"
                   }
               }
           )
       });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-4 bg-genMain">
        <h2 className="text-9xl font-bold mb-20 text-center tracking-tighter">EXPLORATION</h2>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 max-w-[1920px] mx-auto">
            {images.map((src, i) => (
                <div key={i} className="gallery-item break-inside-avoid relative group overflow-hidden rounded-2xl">
                    <img 
                        src={src} 
                        alt={`Gallery ${i}`} 
                        className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
            ))}
        </div>
    </section>
  );
};

export default GalleryMasonry;
