import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Mail, Phone, ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const RegistrationForm = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(formRef.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-32 overflow-hidden bg-black text-white">
             {/* Background Effects */}
             <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-genGreen/10 rounded-full blur-[120px] opacity-30" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
                        <span className="w-2 h-2 rounded-full bg-genGreen animate-pulse" />
                        <span className="text-xs font-mono text-genGreen uppercase tracking-widest">
                            /// JOIN_THE_MOVEMENT
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                        Be Part of Something <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">Bigger</span>
                    </h2>
                    <p className="text-lg text-white/50 max-w-lg mx-auto leading-relaxed">
                        Reserve your spot for the next big event and join a community of builders, creators, and innovators.
                    </p>
                </div>

                <div ref={formRef} className="max-w-2xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative group hover:border-white/20 transition-colors duration-500">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <form className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-white/40 ml-4">Full Name</label>
                            <div className="relative group/input">
                                <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within/input:text-genGreen transition-colors" />
                                <input 
                                    type="text" 
                                    className="w-full bg-black/20 border border-white/5 rounded-2xl px-6 py-5 pl-14 focus:outline-none focus:border-genGreen/50 focus:bg-white/5 text-white placeholder:text-white/20 transition-all duration-300"
                                    placeholder="Enter your full name" 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-white/40 ml-4">Email Address</label>
                            <div className="relative group/input">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within/input:text-genGreen transition-colors" />
                                <input 
                                    type="email" 
                                    className="w-full bg-black/20 border border-white/5 rounded-2xl px-6 py-5 pl-14 focus:outline-none focus:border-genGreen/50 focus:bg-white/5 text-white placeholder:text-white/20 transition-all duration-300"
                                    placeholder="Enter your email address" 
                                />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-[100px_1fr] gap-4">
                             <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest text-white/40 ml-2">Code</label>
                                <div className="w-full bg-black/20 border border-white/5 rounded-2xl px-4 py-5 flex items-center justify-center gap-2 group hover:border-white/20 transition-colors">
                                    <img src="https://flagcdn.com/w40/in.png" alt="India" className="w-6 rounded-sm opacity-80 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-sm font-mono text-white/60 group-hover:text-white transition-colors">+91</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest text-white/40 ml-4">WhatsApp</label>
                                <div className="relative group/input">
                                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within/input:text-genGreen transition-colors" />
                                    <input 
                                        type="tel" 
                                        className="w-full bg-black/20 border border-white/5 rounded-2xl px-6 py-5 pl-14 focus:outline-none focus:border-genGreen/50 focus:bg-white/5 text-white placeholder:text-white/20 transition-all duration-300"
                                        placeholder="98765 43210" 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button className="group relative w-full py-5 bg-white text-black rounded-2xl font-mono uppercase overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-green-500/20">
                                <span className="relative z-10 flex items-center justify-center gap-3 font-bold text-lg tracking-wider">
                                    Reserve_Seat <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                                </span>
                                <div className="absolute inset-0 bg-genGreen transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out z-0" />
                            </button>
                        </div>

                        <p className="text-xs text-white/30 text-center leading-relaxed font-mono">
                            By continuing, you agree to our <a href="#" className="text-white/50 hover:text-genGreen underline decoration-from-font underline-offset-4 transition-colors">Terms of Service</a> & <a href="#" className="text-white/50 hover:text-genGreen underline decoration-from-font underline-offset-4 transition-colors">Privacy Policy</a>
                        </p>
                    </form>
                    
                    <Sparkles className="absolute -top-6 -right-6 w-12 h-12 text-white/5 animate-spin-slow pointer-events-none" />
                    <Sparkles className="absolute -bottom-6 -left-6 w-8 h-8 text-genGreen/20 animate-spin-reverse-slow pointer-events-none" />
                </div>
            </div>
        </section>
    );
};

export default RegistrationForm;
