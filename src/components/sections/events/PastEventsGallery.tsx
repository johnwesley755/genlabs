
import ImageReveal from '../../ui/ImageReveal';

const PastEventsGallery = () => {
    const events = [
        {
            title: "Neon Hackathon 2024",
            img: "https://cdn.prod.website-files.com/5b3dd54182ecae4d1602962f/609e33e18c5000af6211f094_HR%20Hackathon%20-%20Section%202.jpg",
            date: "MAR 2024"
        },
        {
            title: "Design Systems Workshop",
            img: "https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=800&auto=format&fit=crop",
            date: "FEB 2024"
        },
        {
            title: "Future of AI Meetup",
            img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800&auto=format&fit=crop",
            date: "JAN 2024"
        }
    ];

    return (
        <section className="py-24 bg-black text-white px-4">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                     <div>
                        <span className="text-genGreen font-mono text-sm tracking-widest uppercase mb-4 block">
                            /// REWIND
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                            Recently at GenLab
                        </h2>
                     </div>
                     <button className="text-white/60 hover:text-white underline underline-offset-4 decoration-1">
                         View Full Archive
                     </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {events.map((event, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className="relative overflow-hidden rounded-2xl mb-6">
                                <ImageReveal src={event.img} className="aspect-video transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono border border-white/20">
                                    {event.date}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-2 group-hover:text-genGreen transition-colors">{event.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PastEventsGallery;
