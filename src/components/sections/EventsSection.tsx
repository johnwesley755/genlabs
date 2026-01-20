import { useState } from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { events } from '../../data/content';

const EventsSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeEvent = events[activeIndex];

    return (
        <section id="events" className="relative py-24 md:py-32 bg-black text-white overflow-hidden min-h-screen flex flex-col justify-center">
             
             {/* Background Image Transition Layer */}
             <div className="absolute inset-0 z-0 opacity-30 md:opacity-50 transition-all duration-700 ease-in-out">
                 {events.map((event, index) => (
                     <div 
                        key={event.id}
                        className={twMerge(
                            "absolute inset-0 transition-opacity duration-700 ease-in-out",
                            activeIndex === index ? "opacity-100 scale-105" : "opacity-0 scale-100"
                        )}
                     >
                         <img src={event.image} alt="" className="w-full h-full object-cover grayscale md:grayscale-0 contrast-125" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
                     </div>
                 ))}
             </div>

             <div className="relative z-10 max-w-[1800px] w-full mx-auto px-4 md:px-8">
                 <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end">
                     <div>
                        <span className="text-genGreen font-mono text-sm tracking-widest uppercase mb-4 block">/// CONNECT_WITH_US</span>
                        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">
                            UPCOMING<br/>EVENTS
                        </h2>
                     </div>
                 </div>

                 <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
                     {/* LEFT: LIST */}
                     <div className="flex-1 flex flex-col">
                         {events.map((event, index) => (
                             <div 
                                key={event.id}
                                onMouseEnter={() => setActiveIndex(index)}
                                className={twMerge(
                                    "group relative border-t border-white/10 py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:bg-white/5 transition-all duration-300",
                                    activeIndex === index ? "border-white/40 bg-white/5" : ""
                                )}
                             >
                                 {/* Date & Category */}
                                 <div className="flex items-start md:items-center gap-8 md:w-2/3">
                                     <div className={twMerge("text-xs md:text-sm uppercase tracking-widest min-w-[80px] font-mono", activeIndex === index ? "text-genGreen" : "text-white/40")}>
                                         {event.date}
                                     </div>
                                     <div>
                                         <h3 className="text-2xl md:text-4xl font-bold tracking-tight group-hover:translate-x-4 transition-transform duration-300 mb-2">
                                             {event.title}
                                         </h3>
                                          <div className="flex items-center gap-3 text-sm text-white/50">
                                             <span className="bg-white/10 px-2 py-0.5 rounded textxs font-mono">{event.category}</span>
                                             <span>{event.location}</span>
                                          </div>
                                     </div>
                                 </div>

                                 {/* Action */}
                                 <div className="flex items-center justify-between md:justify-end md:w-1/3">
                                     <div className={twMerge(
                                         "w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 transform group-hover:rotate-45",
                                         activeIndex === index ? "bg-genGreen text-black border-genGreen scale-110" : "border-white/20 text-white"
                                     )}>
                                         <ArrowUpRight className="w-5 h-5" />
                                     </div>
                                 </div>
                             </div>
                         ))}
                         <div className="border-t border-white/10" />
                     </div>

                     {/* RIGHT: STICKY COUNTER & DETAILS (Desktop) */}
                     <div className="hidden lg:block w-[400px] h-fit sticky top-32 perspective-1000">
                        <div key={activeEvent.id} className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl animate-fade-in-up">
                            <div className="mb-8">
                                <p className="text-genGreen text-xs font-mono uppercase tracking-widest mb-2">SELECTED_EVENT</p>
                                <h4 className="text-2xl font-bold leading-tight">{activeEvent.title}</h4>
                            </div>

                            {/* TIMER */}
                            <div className="bg-black/40 rounded-2xl p-6 mb-8 border border-white/5">
                                <div className="flex items-center gap-2 mb-4 text-white/40 text-xs font-mono uppercase">
                                    <Clock className="w-3 h-3" /> Starts In
                                </div>
                                <div className="flex justify-between items-end text-center">
                                     <div>
                                         <span className="text-4xl font-bold tracking-tighter block leading-none">04</span>
                                         <span className="text-[10px] text-white/30 font-mono uppercase">Days</span>
                                     </div>
                                     <span className="text-2xl text-white/20 pb-2">:</span>
                                     <div>
                                         <span className="text-4xl font-bold tracking-tighter block leading-none">12</span>
                                         <span className="text-[10px] text-white/30 font-mono uppercase">Hrs</span>
                                     </div>
                                     <span className="text-2xl text-white/20 pb-2">:</span>
                                     <div>
                                         <span className="text-4xl font-bold tracking-tighter block leading-none">38</span>
                                         <span className="text-[10px] text-white/30 font-mono uppercase">Mins</span>
                                     </div>
                                </div>
                            </div>

                            <p className="text-white/60 text-sm leading-relaxed mb-8">
                                {activeEvent.description}
                                <br/><br/>
                                Limited seats available for this session. Reserve your spot now to get access to exclusive resources.
                            </p>

                            <button className="w-full py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:bg-genGreen transition-colors duration-300">
                                Register_Now
                            </button>
                        </div>
                     </div>
                 </div>
             </div>
        </section>
    );
};

export default EventsSection;
