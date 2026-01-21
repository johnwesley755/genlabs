import { twMerge } from 'tailwind-merge';

interface LogoProps {
    className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={twMerge("font-bold text-2xl tracking-tighter flex items-center gap-2 select-none group", className)}>
        <div className="relative w-8 h-8 flex items-center justify-center">
            {/* Geometric Hexagon Logo */}
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-black group-hover:text-genGreen transition-colors duration-300">
                <path d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" fill="currentColor" fillOpacity="0.1" />
                <path d="M50 20L76 35V65L50 80L24 65V35L50 20Z" className="fill-genGreen" />
                <path d="M50 42V58M42 50H58" stroke="black" strokeWidth="4" strokeLinecap="round"/>
            </svg>
        </div>
        <span className="font-sans font-black tracking-[-0.05em] text-xl">GENLAB</span>
    </div>
  );
};

export default Logo;
