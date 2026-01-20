import { useRef, useLayoutEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        // Magnetic Button Effect
        const magnets = document.querySelectorAll('.magnetic-btn');
        magnets.forEach((magnet) => {
            const mag = magnet as HTMLElement;
            mag.addEventListener('mousemove', (e: MouseEvent) => {
                const rect = mag.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(mag, { x: x * 0.2, y: y * 0.2, duration: 0.3 });
            });
            mag.addEventListener('mouseleave', () => {
                gsap.to(mag, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            });
        });

        // Marquee Animation
        if (marqueeRef.current) {
            gsap.to(marqueeRef.current, {
                xPercent: -50,
                repeat: -1,
                duration: 20,
                ease: "linear",
            });
        }

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" ref={containerRef} className="bg-black text-white py-20 px-8 min-h-screen flex flex-col justify-between relative overflow-hidden">
      {/* Noise Texture for Footer */}
      <div className="absolute inset-0 opacity-20 pointer-events-none noise-bg mix-blend-overlay"></div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
        <div>
            <h3 className="text-xs font-mono text-white/40 mb-8 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full inline-block">Contact</h3>
            <ul className="space-y-4 text-sm font-medium">
                <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-genGreen rounded-full block animate-pulse"></span>
                    info@genlabib.in
                </li>
                <li>+91 999 464 6733</li>
                <li className="text-white/40 pt-4">Nagercoil & Hyderabad</li>
                <li>© 2025 GenLab IB.</li>
            </ul>
        </div>
        <div className="flex gap-4 flex-wrap">
            {['INSTAGRAM', 'TWITTER', 'LINKEDIN'].map(social => (
                <a key={social} href="#" className="magnetic-btn px-6 py-3 rounded-full border border-white/20 font-mono text-xs hover:bg-white hover:text-black transition-colors">
                    {social}
                </a>
            ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow group cursor-pointer relative z-10">
        <p className="text-genGreen font-mono text-sm mb-4 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
            START YOUR JOURNEY
        </p>
        <h2 className="relative text-[15vw] font-bold leading-none tracking-tighter select-none">
            <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>
                GENLAB IB
            </span>
            <span 
                className="absolute inset-0 text-genGreen overflow-hidden transition-all duration-700 ease-out"
                style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}
            >
                GENLAB IB
            </span>
            <span className="absolute inset-0 text-genGreen overflow-hidden transition-all duration-700 ease-out group-hover:!clip-path-full"
                  style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 0)' }} 
                  aria-hidden="true">
                GENLAB IB
            </span>
        </h2>
        <style dangerouslySetInnerHTML={{__html: `
            .group:hover span[aria-hidden="true"] {
                clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 0) !important;
            }
            span[aria-hidden="true"] {
                clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%) !important;
            }
        `}} />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end gap-12 relative z-10">
        <a href="mailto:hello@genlab.hq" className="magnetic-btn text-2xl md:text-5xl font-bold hover:text-genGreen transition-colors flex items-center gap-4 group">
            join_us@genlabib.in
             <ArrowUpRight className="w-12 h-12 transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2" />
        </a>
      </div>

      {/* Bottom Marquee */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden py-4 border-t border-white/10 bg-black/50 backdrop-blur-sm">
          <div ref={marqueeRef} className="flex whitespace-nowrap gap-8 text-white/20 font-mono text-xs tracking-widest uppercase">
              {Array(10).fill("GENLAB IB • CONNECT • CREATE • ELEVATE • ").map((text, i) => (
                  <span key={i}>{text}</span>
              ))}
          </div>
      </div>
    </footer>
  );
};

export default Footer;
