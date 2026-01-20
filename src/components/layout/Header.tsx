import { useState, useEffect } from 'react';
import Logo from '../ui/Logo';
import { useLenis } from '@studio-freight/react-lenis';
import { twMerge } from 'tailwind-merge';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const lenis = useLenis(({ scroll }) => {
        setIsScrolled(scroll > 50);
    });

    const scrollToSection = (id: string) => {
        const element = document.querySelector(id);
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

            <nav className="flex items-center gap-8">
                {['home', 'events', 'about', 'join'].map((item) => (
                    <button 
                        key={item}
                        onClick={() => scrollToSection(item)}
                        className="text-sm font-mono uppercase tracking-wider hover:text-genGreen transition-colors relative group"
                    >
                        <span className="relative z-10">
                            {item === 'join' ? 'JOIN WITH US!' : item}
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-genGreen group-hover:w-full transition-all duration-300" />
                    </button>
                ))}
                <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-mono uppercase hover:bg-genGreen hover:text-black transition-colors">
                    GET_STARTED
                </button>
            </nav>
        </header>
    );
};

export default Header;
