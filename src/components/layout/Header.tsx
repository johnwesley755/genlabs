import { useState } from 'react';
import { Menu } from 'lucide-react';

import Logo from '../ui/Logo';
import MagneticButton from '../ui/MagneticButton';
import Sheet from '../ui/Sheet';
import { useLenis } from '@studio-freight/react-lenis';
import { twMerge } from 'tailwind-merge';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    useLenis(({ scroll }) => {
        setIsScrolled(scroll > 100);
    });

    const scrollToSection = (id: string) => {
        const element = document.querySelector(`#${id}`) as HTMLElement;
        if (element) {
            import('@studio-freight/react-lenis').then(module => {
                // Determine offset based on layout (optional)
                 const offset = 0;
                 // Native scrollIntoView as fallback or use lenis instance if accessible
                 element.scrollIntoView({ behavior: 'smooth' });
            });
        }
    };

    return (
        <header 
            className={twMerge(
                "fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-500",
                isScrolled ? "py-4" : "py-6"
            )}
        >
            <div 
                className={twMerge(
                    "flex justify-between items-center transition-all duration-500 ease-in-out border",
                    isScrolled 
                        ? "w-[90%] md:w-[60%] bg-white/70 backdrop-blur-xl border-white/20 shadow-lg rounded-full px-6 py-3" 
                        : "w-[95%] bg-transparent border-transparent px-8 py-4"
                )}
            >
                <Logo className={isScrolled ? "scale-90" : ""} />

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-2">
                    {['events', 'about', 'mentorship'].map((item) => (
                        <MagneticButton key={item} strength={0.3} scaleOnHover={1.05}>
                            <button 
                                onClick={() => scrollToSection(item)}
                                className={twMerge(
                                    "px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 relative group overflow-hidden",
                                    isScrolled ? "hover:bg-black/5" : "hover:bg-white/40"
                                )}
                            >
                                <span className="relative z-10 font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                                    {item === 'join' ? 'JOIN' : item}
                                </span>
                            </button>
                        </MagneticButton>
                    ))}
                    
                    <div className="w-[1px] h-4 bg-black/10 mx-2" />

                    <MagneticButton strength={0.5} scaleOnHover={1.1}>
                        <button className="relative group overflow-hidden bg-black text-white px-6 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
                            <span className="relative z-10 group-hover:text-black transition-colors duration-300">Get_Started</span>
                             <div className="absolute inset-0 bg-genGreen translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        </button>
                    </MagneticButton>
                </nav>

                {/* Mobile Nav Toggle */}
                <button 
                    className="md:hidden relative z-50 p-2 hover:bg-black/5 rounded-full transition-colors"
                    onClick={() => setIsMenuOpen(true)}
                    aria-label="Open Menu"
                >
                    <Menu className="w-6 h-6 text-black" />
                </button>

                {/* Mobile Sheet */}
                <Sheet isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                    <div className="flex flex-col items-start justify-center h-full gap-8">
                        {['events', 'about', 'mentorship'].map((item) => (
                            <button 
                                key={item}
                                onClick={() => {
                                    scrollToSection(item);
                                    setIsMenuOpen(false);
                                }}
                                className="text-4xl font-bold uppercase tracking-tighter hover:text-genGreen transition-colors text-left"
                            >
                                {item}
                            </button>
                        ))}
                        <div className="w-full h-[1px] bg-black/10 my-4" />
                        <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-mono uppercase hover:bg-genGreen hover:text-black transition-colors w-full">
                            GET_STARTED
                        </button>
                    </div>
                </Sheet>
            </div>
        </header>
    );
};

export default Header;
