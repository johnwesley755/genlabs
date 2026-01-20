
const MentorsGrid = () => {
    // Using randomuser.me for high-quality headshots as placeholders for "Our Mentors"
    const mentors = [
        "https://randomuser.me/api/portraits/women/44.jpg",
        "https://randomuser.me/api/portraits/men/32.jpg",
        "https://randomuser.me/api/portraits/women/68.jpg",
        "https://randomuser.me/api/portraits/men/86.jpg",
        "https://randomuser.me/api/portraits/women/24.jpg",
        "https://randomuser.me/api/portraits/men/11.jpg",
        "https://randomuser.me/api/portraits/women/33.jpg",
        "https://randomuser.me/api/portraits/men/45.jpg"
    ];

    return (
        <section className="bg-genMain py-24 px-4 border-y border-black/5 bg-grid-pattern">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                     <h2 className="text-6xl font-bold tracking-tighter text-genText">OUR_MENTORS</h2>
                     <p className="font-mono text-sm text-black/40 max-w-md text-right">
                         Learn from industry experts who have walked the path.
                     </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {mentors.map((img, i) => (
                        <div key={i} className="group relative">
                             <div className="aspect-square rounded-full overflow-hidden border border-black/5 grayscale group-hover:grayscale-0 transition-all duration-500">
                                 <img src={img} className="w-full h-full object-cover" />
                             </div>
                             <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                 <span className="bg-black text-white px-4 py-1 rounded-full text-xs font-mono uppercase whitespace-nowrap">
                                     Mentor_{i+1}
                                 </span>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MentorsGrid;
