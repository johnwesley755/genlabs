import { useRef, useState, useLayoutEffect } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/content';

gsap.registerPlugin(ScrollTrigger);

const ProjectSpotlight = () => {
    const componentRef = useRef<HTMLDivElement>(null);
    const [activeProject, setActiveProject] = useState(0);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: componentRef.current,
                start: "top top",
                end: "bottom bottom",
                onUpdate: (self) => {
                    // Map scroll progress (0-1) to project index (0-3)
                    const idx = Math.min(
                        projects.length - 1,
                        Math.floor(self.progress * projects.length)
                    );
                    setActiveProject(idx);
                }
            });
        }, componentRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={componentRef} className="bg-black text-white relative" style={{ height: `${projects.length * 100}vh` }}>
            <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row h-full">
                
                {/* STICKY LEFT COLUMN - DETAILS */}
                <div className="hidden md:flex w-1/2 h-screen sticky top-0 flex-col justify-center px-12 lg:px-24">
                    <div className="absolute top-12 left-12 lg:left-24">
                        <span className="text-genGreen font-mono text-sm tracking-widest">/// PROJECT_SHOWCASE</span>
                    </div>

                    <div key={activeProject} className="animate-fade-in">
                        <p className="text-genGreen font-mono text-xl mb-4">
                            {projects[activeProject].category}
                        </p>
                        
                        <h2 className="text-6xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
                            {projects[activeProject].title}
                        </h2>
                        
                        <p className="text-xl text-white/60 mb-8 max-w-md">
                            {projects[activeProject].description}
                        </p>

                        <div className="flex gap-3 mb-12">
                            {projects[activeProject].stats.map((tag, i) => (
                                <span key={i} className="px-4 py-1 rounded-full border border-white/20 text-sm font-mono text-white/80">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <button className="group flex items-center gap-4 text-genGreen font-bold tracking-widest uppercase hover:opacity-80 transition-opacity w-fit">
                        View Case Study <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>

                {/* SCROLLABLE RIGHT COLUMN - IMAGES */}
                <div className="w-full md:w-1/2 flex flex-col">
                    {projects.map((project, i) => (
                        <div key={i} className="min-h-screen project-section flex flex-col justify-center p-4 md:p-12 border-l border-white/10">
                            {/* Mobile Only Title (Since Left col is hidden on mobile) */}
                            <div className="md:hidden mb-8">
                                <span className="text-genGreen font-mono text-xs">{project.category}</span>
                                <h3 className="text-4xl font-bold mt-2 mb-4">{project.title}</h3>
                                <p className="text-white/60 text-sm">{project.description}</p>
                            </div>

                            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden group cursor-none">
                                <img 
                                    src={project.image} 
                                    alt={project.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                
                                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ExternalLink className="text-white w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ProjectSpotlight;
