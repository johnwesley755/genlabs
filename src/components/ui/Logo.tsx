import { twMerge } from 'tailwind-merge';

interface LogoProps {
    className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={twMerge("font-bold text-2xl tracking-tighter flex items-center gap-1 select-none", className)}>
        <div className="w-6 h-6 bg-genGreen rounded-full" />
        <span className="font-sans">GENLAB</span>
    </div>
  );
};

export default Logo;
