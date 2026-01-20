import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { faqData } from '../../data/content';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="bg-genMain py-32 px-4 relative z-10 border-t border-black/5" id="faq">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row gap-12 md:gap-24">
                    {/* Header */}
                    <div className="md:w-1/3">
                        <h2 className="text-black text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] sticky top-32">
                            COMMON <br/>
                            <span className="text-genGreen">QUERIES</span>
                        </h2>
                        <p className="text-black/60 mt-8 text-lg max-w-xs">
                            Everything you need to know about the community, programs, and opportunities.
                        </p>
                    </div>

                    {/* Accordion List */}
                    <div className="md:w-2/3 space-y-0">
                        {faqData.map((item, i) => (
                            <div 
                                key={i} 
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="group border-b border-black/10 cursor-pointer overflow-hidden transition-all duration-500 hover:bg-black/5"
                            >
                                <div className="py-12 pr-8 flex items-start justify-between gap-8">
                                    <div className="flex gap-8">
                                        <span className="font-mono text-genGreen text-sm mt-2">0{i + 1}</span>
                                        <h3 className={`text-2xl md:text-4xl font-bold transition-colors duration-300 ${openIndex === i ? 'text-black' : 'text-black/70 group-hover:text-black'}`}>
                                            {item.question}
                                        </h3>
                                    </div>
                                    <div className={`w-8 h-8 flex items-center justify-center shrink-0 transition-all duration-500 ${openIndex === i ? 'rotate-180 text-genGreen' : 'rotate-0 text-black/40'}`}>
                                        {openIndex === i ? <Minus className="w-8 h-8" /> : <Plus className="w-8 h-8" />}
                                    </div>
                                </div>
                                
                                <div 
                                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${openIndex === i ? 'grid-rows-[1fr] opacity-100 pb-12' : 'grid-rows-[0fr] opacity-0 pb-0'}`}
                                >
                                    <div className="overflow-hidden pl-14 md:pl-[4.5rem] pr-8">
                                        <p className="text-xl leading-relaxed text-black/60 max-w-2xl">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
