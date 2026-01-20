import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-genMain text-genText py-20 px-8 min-h-screen flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>
            <h3 className="text-xs font-mono text-black/40 mb-8 uppercase tracking-widest">Contact</h3>
            <ul className="space-y-4 text-sm font-medium">
                <li>info@genlabib.in</li>
                <li>+91 99946 46733</li>
                <li className="text-black/40 pt-4">Nagercoil & Hyderabad</li>
                <li>© 2025 GenLab IB.</li>
            </ul>
        </div>
        <div className="flex gap-8">
            {['INSTAGRAM', 'TWITTER', 'LINKEDIN'].map(social => (
                <a key={social} href="#" className="font-mono hover:text-genGreen transition-colors">{social}</a>
            ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow group cursor-pointer overflow-hidden">
        {/* Massive Text with Fill Animation */}
        <h2 className="relative text-[15vw] font-bold leading-none tracking-tighter select-none">
            {/* Outline / Base Layer */}
            <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>
                LET'S BUILD
            </span>
            
            {/* Fill Layer (Absolute + Clipped) */}
            <span 
                className="absolute inset-0 text-genGreen overflow-hidden transition-all duration-700 ease-out"
                style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}
            >
                LET'S BUILD
            </span>
            
            {/* Hover Trigger (Pure CSS via Group) */}
            <span className="absolute inset-0 text-genGreen overflow-hidden transition-all duration-700 ease-out group-hover:!clip-path-full"
                  style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 0)' }} 
                  aria-hidden="true">
                LET'S BUILD
            </span>
        </h2>
        
        {/* Note: I'm using a simpler approach. 
            The previous style prop was messy. 
            Here, I'm using a simpler 2-layer approach: 
            Layer 1: Outlined Text. 
            Layer 2: Filled Text on top, clipped to 0 height initially, 100% on hover.
        */}
        <style dangerouslySetInnerHTML={{__html: `
            .group:hover span[aria-hidden="true"] {
                clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 0) !important;
            }
            /* Initial state for the hover layer - hidden at bottom */
            span[aria-hidden="true"] {
                clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%) !important;
            }
        `}} />
      </div>

      <div className="flex justify-between items-end">
        <a href="mailto:hello@genlab.hq" className="text-2xl md:text-4xl font-bold hover:text-genGreen transition-colors">
            join_us@genlabib.in
        </a>
        <ArrowUpRight className="w-12 h-12 md:w-24 md:h-24 text-genGreen animate-pulse-slow" />
      </div>
    </footer>
  );
};

export default Footer;
