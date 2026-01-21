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
    const lenis = useLenis(({ scroll }) => {
        setIsScrolled(scroll > 50);
    });

    const scrollToSection = (id: string) => {
        const element = document.querySelector(`#${id}`);
        if (element && lenis) {
            lenis.scrollTo(element);
        }
    };

    return (
        <header 
            className={twMerge(
                "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-8 py-6 flex justify-between items-center group",
                isScrolled ? "bg-genMain/80 backdrop-blur-md py-4 border-b border-black/5" : "bg-transparent text-black"
            )}
        >
            <Logo />

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
                {['events', 'about', 'mentorship'].map((item) => (
                    <MagneticButton key={item} strength={0.3} scaleOnHover={1.05}>
                        <button 
                            onClick={() => scrollToSection(item)}
                            className="text-sm font-mono uppercase tracking-wider hover:text-genGreen transition-colors relative group block px-4 py-2"
                        >
                            <span className="relative z-10">
                                {item === 'join' ? 'JOIN WITH US!' : item}
                            </span>
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-genGreen group-hover:w-full transition-all duration-300" />
                        </button>
                    </MagneticButton>
                ))}
                <MagneticButton strength={0.5} scaleOnHover={1.1}>
                    <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-mono uppercase hover:bg-genGreen hover:text-black transition-colors">
                        GET_STARTED
                    </button>
                </MagneticButton>
            </nav>

            {/* Mobile Nav Toggle */}
            <button 
                className="md:hidden relative z-50 p-2 hover:bg-black/5 rounded-full transition-colors"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open Menu"
            >
                <Menu className="w-8 h-8 text-black" />
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
        </header>
    );
};

export default Header;
