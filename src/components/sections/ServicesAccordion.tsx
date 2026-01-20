import { useState } from 'react';
import { services } from '../../data/content';
import { ArrowUpRight } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const ServicesAccordion = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-20 px-4 bg-genMain min-h-screen flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                <h2 className="text-4xl font-mono text-genText/50 mb-12">OUR_SERVICES</h2>
                <div className="flex flex-col">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                            className={twMerge(
                                "group border-b border-black/10 overflow-hidden transition-all duration-500 ease-out cursor-none",
                                activeIndex === index ? "h-[400px] bg-genText text-genMain" : "h-[100px] bg-transparent text-genText"
                            )}
                        >
                            <div className="p-8 h-full flex flex-col justify-between">
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-mono">0{service.id}</span>
                                    <h3 className="text-5xl font-bold uppercase tracking-tighter">{service.title}</h3>
                                    <ArrowUpRight 
                                        className={twMerge(
                                            "w-12 h-12 transition-transform duration-500",
                                            activeIndex === index ? "rotate-45 text-genGreen" : "rotate-0 text-white/20"
                                        )}
                                    />
                                </div>
                                
                                <div className={twMerge(
                                    "flex justify-between items-end opacity-0 translate-y-10 transition-all duration-500 delay-100",
                                    activeIndex === index && "opacity-100 translate-y-0"
                                )}>
                                    <p className="text-2xl max-w-lg font-light leading-tight">
                                        {service.desc}
                                    </p>
                                    <div className="flex gap-4">
                                        {service.list.map((item) => (
                                            <span 
                                                key={item} 
                                                className="px-4 py-2 border border-black/10 rounded-full text-sm font-mono uppercase tracking-wider hover:bg-genGreen hover:border-transparent transition-colors"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                    <button className="px-8 py-4 bg-genBlack text-genWhite rounded-full font-bold uppercase flex items-center gap-2 hover:bg-genGreen hover:text-black transition-colors">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesAccordion;
