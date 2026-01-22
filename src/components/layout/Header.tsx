import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import Logo from '../ui/Logo';
import MagneticButton from '../ui/MagneticButton';
import Sheet from '../ui/Sheet';
import { useLenis } from '@studio-freight/react-lenis';
import { twMerge } from 'tailwind-merge';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    
    useLenis(({ scroll }) => {
        setIsScrolled(scroll > 50);
    });

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Events', path: '/events' },
        { label: 'About', path: '/about' }
    ];

    return (
        <header 
            className={twMerge(
                "fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-300",
                isScrolled ? "py-4" : "py-6"
            )}
        >
            <div 
                className={twMerge(
                    "transition-all duration-500 ease-in-out border flex justify-between items-center",
                    isScrolled 
                        ? "w-[90%] md:w-[60%] bg-white/90 backdrop-blur-xl border-black/5 shadow-sm rounded-full px-6 py-3" 
                        : "w-[95%] bg-white/80 backdrop-blur-md border-white/20 px-8 py-4 rounded-full mt-4"
                )}
            >
                <div className="w-full flex justify-between items-center text-black">
                    <Link to="/">
                        <Logo className={isScrolled ? "scale-90" : ""} />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-2">
                        {navItems.map((item) => (
                            <MagneticButton key={item.label} strength={0.3} scaleOnHover={1.05}>
                                <Link 
                                    to={item.path}
                                    className={twMerge(
                                        "px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 relative group overflow-hidden block",
                                        "hover:bg-black/5",
                                        location.pathname === item.path ? "bg-black/5 font-bold" : ""
                                    )}
                                >
                                    <span className={twMerge(
                                        "relative z-10 font-bold transition-opacity text-black",
                                        location.pathname === item.path ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                                    )}>
                                        {item.label}
                                    </span>
                                </Link>
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
                </div>

                {/* Mobile Sheet */}
                <Sheet isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                    <div className="flex flex-col items-start justify-center h-full gap-8">
                        {navItems.map((item) => (
                            <Link 
                                key={item.label}
                                to={item.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={twMerge(
                                    "text-4xl font-bold uppercase tracking-tighter hover:text-genGreen transition-colors text-left text-black",
                                    location.pathname === item.path ? "text-genGreen" : "text-black"
                                )}
                            >
                                {item.label}
                            </Link>
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
