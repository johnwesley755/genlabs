import { eventsPageContent } from '../../../data/content';
import { MapPin, Clock, Ticket } from 'lucide-react';
import EventCard3D from '../../ui/EventCard3D';

const EventInfo = () => {
    const { upcoming } = eventsPageContent;

    return (
        <section className="py-20 container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                <div>
                     <span className="text-genGreen font-mono text-sm tracking-widest uppercase mb-6 block">
                        /// THIS_MONTHS_TOPIC
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.9]">
                        {upcoming.topic}
                    </h2>
                    <p className="text-xl leading-relaxed text-black/70 font-light">
                        {upcoming.description}
                    </p>
                </div>
                
                <EventCard3D className="bg-gray-50 border-black/5 text-black">
                    <div className="space-y-8">
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="block text-sm font-mono text-black/40 uppercase tracking-widest mb-1">When?</span>
                                <span className="text-xl font-bold">{upcoming.date}</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="block text-sm font-mono text-black/40 uppercase tracking-widest mb-1">Where?</span>
                                <span className="text-xl font-bold">{upcoming.location}</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                                <Ticket className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="block text-sm font-mono text-black/40 uppercase tracking-widest mb-1">Book Your Seat</span>
                                <span className="text-xl font-bold block mb-1">{upcoming.fee}</span>
                                <span className="text-sm text-black/60">{upcoming.perks}</span>
                            </div>
                        </div>
                        
                        <div className="pt-4 border-t border-black/10">
                            <p className="text-genGreen font-bold uppercase tracking-wider text-sm text-center animate-pulse">
                                {upcoming.limit}
                            </p>
                        </div>
                    </div>
                </EventCard3D>
            </div>
        </section>
    );
};

export default EventInfo;
