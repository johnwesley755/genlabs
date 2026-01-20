import { twMerge } from 'tailwind-merge';

const AboutSection = () => {
    return (
        <section id="about" className="py-20 px-4 bg-genMain bg-grid-pattern relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white/80 pointer-events-none" />
            <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
                <div className="space-y-12">
                     <h2 className="text-7xl font-bold tracking-tighter leading-[0.9]">
                         WE ARE <br/>
                         <span className="text-genGreen">GENZ COMMUNITY</span>
                     </h2>
                     <p className="text-2xl font-light leading-relaxed max-w-2xl">
                         A vibe space for designers, creators, and tech enthusiasts to connect, and level up! Meet your tribe, grow your network, and stay ahead in a world that never hits pause.
                     </p>
                     
                     <div className="grid grid-cols-2 gap-8 pt-8 border-t border-black/10">
                         <div>
                             <h4 className="font-mono text-sm text-black/50 mb-2">CHANGEMAKERS</h4>
                             <p className="text-3xl font-bold">7,000+</p>
                         </div>
                         <div>
                             <h4 className="font-mono text-sm text-black/50 mb-2">GLOBAL MENTORS</h4>
                             <p className="text-3xl font-bold">100+</p>
                         </div>
                     </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4 pt-12">
                        <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop" className="w-full aspect-[3/4] object-cover rounded-2xl" />
                        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop" className="w-full aspect-square object-cover rounded-2xl" />
                    </div>
                    <div className="space-y-4">
                        <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop" className="w-full aspect-square object-cover rounded-2xl" />
                        <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop" className="w-full aspect-[3/4] object-cover rounded-2xl" />
                        <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop" className="w-full aspect-video object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
