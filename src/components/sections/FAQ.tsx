import { useState } from 'react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const questions = [
        { q: "What is GenLab IB?", a: "GenLab IB is a GenZ-first community and ed-tech platform designed to bridge the gap between academic learning and industry reality through mentorship and live projects." },
        { q: "Who can join GenLab IB?", a: "Students, graduates, and early career professionals looking to upgrade their skills in Design, Tech, or Entrepreneurship are welcome to join." },
        { q: "Is there a membership fee?", a: "We have both free community access and premium mentorship programs. Our Discord community is free to join, while structured courses start at ₹5,999/month." },
        { q: "How can I get involved in events?", a: "We host monthly meetups and workshops. You can register for upcoming events directly on our website or through our community channels." }
    ];

    return (
        <section className="py-24 px-4 bg-genMain border-t border-black/5">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-6xl font-bold tracking-tighter mb-16 text-center">GOT QUESTIONS?</h2>
                
                <div className="space-y-4">
                    {questions.map((item, i) => (
                        <div 
                            key={i} 
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="border border-black/10 rounded-2xl bg-white overflow-hidden cursor-pointer hover:border-black/30 transition-colors"
                        >
                            <div className="p-6 md:p-8 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-black">{item.q}</h3>
                                <span className={`text-2xl transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
                            </div>
                            
                            <div className={`px-6 md:px-8 overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-48 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-lg text-black/60 leading-relaxed">{item.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
