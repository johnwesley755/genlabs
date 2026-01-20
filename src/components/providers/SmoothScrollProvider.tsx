import { useLayoutEffect } from 'react';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
  children: any;
}

const LenisUpdater = () => {
    const lenis = useLenis();

    useLayoutEffect(() => {
        if (!lenis) return;

        // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
        lenis.on('scroll', ScrollTrigger.update);

        // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
        const update = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(update);

        // Disable lag smoothing in GSAP to prevent any delay in scroll animations
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
        };
    }, [lenis]);

    return null;
}

const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  const lenisOptions = {
    lerp: 0.1,
    duration: 1.5,
    smoothTouch: true,
    autoRaf: false, // We drive it with GSAP ticker
  };

  return (
    // @ts-ignore
    <ReactLenis root options={lenisOptions}>
      <LenisUpdater />
      {children}
    </ReactLenis>
  );
};

export default SmoothScrollProvider;
