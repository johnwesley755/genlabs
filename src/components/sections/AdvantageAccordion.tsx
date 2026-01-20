


const AdvantageAccordion = () => {
    const list = [
        {
            id: "01",
            title: "Soft Skills",
            desc: "Master communication, public speaking, and teamwork to thrive in any professional setting.",
            tags: ["Public Speaking", "Leadership", "Empathy"],
            img: "https://images.unsplash.com/photo-1544168190-79c17527004f?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: "02",
            title: "Community",
            desc: "Connect with a vibrant network of learners, designers, and mentors to grow together.",
            tags: ["Networking", "Peer Learning", "Events"],
            img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: "03",
            title: "Live Projects",
            desc: "Work on real-world challenges, collaborate with experts, and gain hands-on experience.",
            tags: ["Real Clients", "Shippable Code", "Portfolio"],
            img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: "04",
            title: "Career",
            desc: "Unlock job and internship placements with top companies through our strong network.",
            tags: ["Placements", "Resume Review", "Interviews"],
            img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
        }
    ];

    return (
        <section className="bg-genMain py-32 px-4 overflow-hidden">
             <div className="max-w-[1800px] mx-auto">
                 <p className="font-mono text-black/40 mb-12 uppercase tracking-widest pl-4">The GenLab Advantage</p>
                 
                 <div className="flex flex-col">
                     {list.map((item) => (
                         <AccordionItem key={item.id} item={item} />
                     ))}
                 </div>
             </div>
        </section>
    );
};

interface AccordionItemProps {
    id: string;
    title: string;
    desc: string;
    tags: string[];
    img: string;
}

const AccordionItem = ({ item }: { item: AccordionItemProps }) => {
    return (
        <div className="group relative border-t border-black/10 last:border-b transition-all duration-500 hover:bg-black hover:text-white cursor-none overflow-hidden">
            {/* Background Image Reveal */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-all duration-700 ease-out pointer-events-none"
                 style={{ clipPath: 'inset(0 100% 0 0)' }}> {/* Default hidden */}
                 <img src={item.img} className="w-full h-full object-cover grayscale" />
            </div>
            {/* CSS to animate clip-path on hover */}
            <style dangerouslySetInnerHTML={{__html: `
                .group:hover .absolute[style*="clip-path"] {
                    clip-path: inset(0 0 0 0) !important;
                }
            `}} />

             <div className="relative z-10 p-6 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 h-auto md:h-[200px] group-hover:md:h-[400px] transition-all duration-500 ease-out">
                  <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                      <span className="font-mono text-black/30 group-hover:text-genGreen transition-colors text-xl">
                          {item.id}
                      </span>
                      <h3 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter uppercase break-words w-full">
                          {item.title}
                      </h3>
                  </div>

                  <div className="md:max-w-md opacity-100 md:opacity-0 group-hover:opacity-100 translate-y-0 md:translate-y-10 group-hover:md:translate-y-0 transition-all duration-500 delay-100">
                      <p className="text-sm md:text-lg leading-relaxed mb-6 text-black/80 md:text-white/80 dark-mode-text-override">
                          {item.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag: string) => (
                              <span key={tag} className="px-3 py-1 md:px-4 md:py-2 rounded-full border border-black/10 md:border-white/20 text-xs font-mono uppercase bg-white/5">
                                  {tag}
                              </span>
                          ))}
                      </div>
                  </div>

                 <button className="w-16 h-16 rounded-full border border-current flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:bg-genGreen group-hover:text-black group-hover:border-genGreen">
                     <Arrowdown className="w-6 h-6 -rotate-90" />
                 </button>
            </div>
        </div>
    )
}

const Arrowdown = ({ className }: {className?: string}) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export default AdvantageAccordion;
